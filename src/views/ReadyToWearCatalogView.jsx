import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Search, Heart, ShoppingBag, SlidersHorizontal, 
  Grid, LayoutGrid, X, Check, Star, ChevronDown, Plus, Filter
} from 'lucide-react';
import { ALL_PRODUCTS } from '../data/mockProducts';

export default function ReadyToWearCatalogView({ 
  onBackToStore, 
  onSelectProduct,
  onAddToCart,
  wishlistIds = [],
  onToggleWishlist
}) {
  const [selectedCategory, setSelectedCategory] = useState('All Pieces');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localWishlist, setLocalWishlist] = useState(['prod_01', 'prod_03']);
  const [addedToast, setAddedToast] = useState(null);

  const categories = [
    'All Pieces', 
    'Sarees', 
    'Anarkalis', 
    'Co-ord Sets', 
    'Dupattas & Shawls', 
    'Kurtis', 
    'Jewelry'
  ];

  const formatTaka = (amount) => '৳' + Number(amount || 0).toLocaleString('en-BD');

  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (selectedCategory !== 'All Pieces') {
      result = result.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(p.category.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleToggleWish = (id, e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(id);
    } else {
      setLocalWishlist(prev => 
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
    }
  };

  const isItemWishlisted = (id) => {
    return wishlistIds.length > 0 ? wishlistIds.includes(id) : localWishlist.includes(id);
  };

  const handleQuickAdd = (p, e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(p, p.sizes ? p.sizes[0] : 'Standard', 1);
    }
    setAddedToast(`Added "${p.title}" to your shopping bag`);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F5] text-[#201B1D] selection:bg-[#7A3E5D] selection:text-white pb-28">
      {/* Toast */}
      {addedToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#201B1D] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl border border-[#7A3E5D]/40 flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-[#D8A7B1]" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#E8DFE2]/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToStore}
            className="w-10 h-10 -ml-2 flex items-center justify-center text-[#756B70] hover:text-[#201B1D] rounded-full hover:bg-black/5 active:scale-95 transition-all"
            title="Return to Storefront"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="font-serif font-extrabold text-base tracking-wider text-[#101010] uppercase block leading-none">
              Sultana's Dream
            </span>
            <span className="text-[9px] text-[#756B70] tracking-[0.22em] uppercase font-semibold">
              The Grand Atelier Catalog
            </span>
          </div>
        </div>

        {/* Search Input on Desktop (Floating Pill) */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-[#756B70] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Jamdani, Muslin, Silk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-full text-xs text-[#201B1D] placeholder-[#756B70] focus:outline-none focus:border-[#7A3E5D] focus:ring-2 focus:ring-[#7A3E5D]/15 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#756B70] font-sans hidden sm:inline">
            {filteredProducts.length} Creations
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Apple-Style Catalog Hero Title */}
        <div className="space-y-1.5 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A3E5D] font-sans block">
            All Products
          </span>
          <h1 className="text-display-h2 font-serif font-bold text-[#201B1D]">
            Everything you love, in one place.
          </h1>
          <p className="text-xs sm:text-sm text-[#756B70] font-light max-w-xl">
            Explore handcrafted heirloom Jamdani drapes, gossamer muslin kalidars, and royal velvet shawls.
          </p>
        </div>

        {/* Category Pills Scroller (Apple Horizontal Swipe) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[38px] px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-[#101010] text-white shadow-xs'
                  : 'bg-white border border-[#E8DFE2] text-[#756B70] hover:text-[#201B1D] hover:bg-[#FBF8F5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Search & Controls Bar */}
        <div className="flex items-center justify-between gap-2.5 md:hidden">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#756B70] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E8DFE2] rounded-full text-xs text-[#201B1D] focus:outline-none focus:border-[#7A3E5D]"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-2.5 bg-white border border-[#E8DFE2] rounded-full text-xs font-semibold text-[#201B1D] focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Desktop Sorting Bar */}
        <div className="hidden md:flex items-center justify-between pb-3 border-b border-[#E8DFE2]">
          <p className="text-xs text-[#756B70]">
            Showing <strong className="text-[#201B1D]">{filteredProducts.length}</strong> heirloom pieces
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#756B70]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-1.5 bg-white border border-[#E8DFE2] rounded-full text-xs font-semibold text-[#201B1D] focus:outline-none focus:border-[#7A3E5D]"
            >
              <option value="featured">Curated (Featured)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Patron Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8DFE2] p-8">
            <p className="text-sm font-semibold text-[#201B1D]">No pieces found matching your criteria</p>
            <p className="text-xs text-[#756B70] mt-1">Try resetting filters or searching with another term.</p>
            <button
              onClick={() => { setSelectedCategory('All Pieces'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const wishlisted = isItemWishlisted(product.id);
              return (
                <div
                  key={product.id}
                  onClick={onSelectProduct}
                  className="group bg-white rounded-3xl border border-[#E8DFE2] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-[3/4] bg-[#FAF4F6] overflow-hidden">
                      <img
                        src={product.images ? product.images[0] : product.image}
                        alt={product.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                        {product.badge && (
                          <span className="px-2.5 py-0.5 bg-white/95 backdrop-blur-sm text-[#7A3E5D] text-[10px] font-bold rounded-full shadow-xs">
                            {product.badge}
                          </span>
                        )}
                        {product.discount_percent && (
                          <span className="px-2 py-0.5 bg-[#7A3E5D] text-white text-[10px] font-bold rounded-full">
                            -{product.discount_percent}%
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => handleToggleWish(product.id, e)}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#756B70] hover:text-[#7A3E5D] transition-colors z-10 shadow-xs"
                      >
                        <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="p-3.5 sm:p-4 space-y-1">
                      <span className="text-[10px] font-bold text-[#7A3E5D] uppercase tracking-wider block">
                        {product.category}
                      </span>
                      <h3 className="text-xs sm:text-sm font-semibold text-[#201B1D] line-clamp-1 group-hover:text-[#7A3E5D] transition-colors">
                        {product.title}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-[11px] text-[#756B70]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-[#201B1D]">{product.rating || 4.9}</span>
                        <span>({product.reviews || 48})</span>
                      </div>

                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-sm font-bold text-[#7A3E5D]">
                          {formatTaka(product.price)}
                        </span>
                        {product.original_price && (
                          <span className="text-xs text-[#756B70] line-through">
                            {formatTaka(product.original_price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add to Bag CTA */}
                  <div className="p-3.5 sm:p-4 pt-0">
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="w-full py-2 bg-[#FBF8F5] hover:bg-[#7A3E5D] text-[#7A3E5D] hover:text-white border border-[#E8DFE2] hover:border-[#7A3E5D] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Bag
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
