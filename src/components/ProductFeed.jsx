import React, { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { Loader2, ArrowDown, Database, CheckCircle2 } from 'lucide-react';

export default function ProductFeed({
  products,
  isLoading,
  isLoadingMore,
  hasMore,
  nextCursor,
  onLoadMore,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  selectedCategory
}) {
  const loadMoreRef = useRef(null);

  // Optional: IntersectionObserver for automatic infinite scrolling on mobile
  useEffect(() => {
    if (!hasMore || isLoadingMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, isLoading, onLoadMore]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Section Header with Category & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-neutral-800/80">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-serif">
            {selectedCategory === 'All Pieces' ? 'All Curated Pieces' : selectedCategory}
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Showing {products.length} hand-tailored garments &amp; bespoke accessories
          </p>
        </div>

        {/* Cursor Pagination Telemetry Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
            <Database className="w-3 h-3 text-amber-400" />
            <span>Laravel cursorPaginate()</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Initial Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mt-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl bg-neutral-900/40 border border-neutral-800 p-4 space-y-4 animate-pulse">
              <div className="aspect-[3/4] bg-neutral-800/50 rounded-xl" />
              <div className="h-4 bg-neutral-800 rounded w-3/4" />
              <div className="h-3 bg-neutral-800/60 rounded w-1/2" />
              <div className="h-8 bg-neutral-800/80 rounded-full" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <p className="text-base text-neutral-300 font-medium">No items match your active filters.</p>
          <p className="text-xs text-neutral-500">Try choosing a different collection or clearing search terms.</p>
        </div>
      ) : (
        <>
          {/* Responsive Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mt-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            ))}
          </div>

          {/* Infinite Scroll Sensor & Manual Fallback Button */}
          <div ref={loadMoreRef} className="mt-12 flex flex-col items-center justify-center space-y-4">
            {isLoadingMore && (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-semibold shadow-lg animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Streaming next cursor batch from Laravel API...</span>
              </div>
            )}

            {!isLoadingMore && hasMore && (
              <button
                onClick={onLoadMore}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500/60 text-xs font-bold tracking-wider uppercase text-neutral-200 active:scale-95 transition-all shadow-md"
              >
                <span>Load More Pieces</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            )}

            {!hasMore && products.length > 0 && (
              <div className="inline-flex items-center gap-2 text-xs text-neutral-500 py-4 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>You have viewed all available pieces in this collection</span>
              </div>
            )}

            {/* Micro Cursor Metadata Debug Pill */}
            {nextCursor && (
              <div className="text-[10px] font-mono text-neutral-600 bg-neutral-950 px-3 py-1 rounded border border-neutral-900 max-w-xs truncate">
                Cursor: {nextCursor}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
