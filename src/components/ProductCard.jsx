import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted = false,
  onOpenPdp 
}) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? (typeof product.colors[0] === 'string' ? product.colors[0] : product.colors[0]?.hex || '#7A3E5D') : '#7A3E5D'
  );

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;
  const discountPercent = product.discount_percent || 
    (product.original_price > product.price 
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100) 
      : 0);

  return (
    <div className="group relative spatial-card rounded-[28px] border border-white/85 overflow-hidden flex flex-col justify-between tap-bounce glossy-card">
      
      {/* Top Image & Swiper with Spatial Floor Shadow & Reflection */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F8F3F0] to-[#F3ECE8] cursor-pointer p-2 sm:p-3" 
        onClick={() => onOpenPdp && onOpenPdp(product)}
      >
        <div className="relative w-full h-full rounded-[22px] overflow-hidden product-floor-shadow">
          {product.images && product.images.length > 1 ? (
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true, dynamicBullets: true }}
              loop={true}
              nested={true}
              className="w-full h-full"
            >
              {product.images.map((imgUrl, idx) => (
                <SwiperSlide key={idx} className="w-full h-full">
                  <img
                    src={imgUrl}
                    alt={`${product.title} view ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
            />
          )}

          {/* Ambient Reflection Glow inside frame */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#7A3E5D]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Floating Liquid Glass Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full liquid-glass-dark text-[#FBF8F5] text-[10px] font-sans font-semibold tracking-wider uppercase border border-white/20 shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7D5A] text-white text-[10px] font-bold tracking-tight shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {isLowStock && (
            <span className="px-2 py-0.5 rounded-full bg-[#C88A2D] text-white text-[9px] font-bold tracking-tight shadow-xs">
              Low Stock
            </span>
          )}
          {isOutOfStock && (
            <span className="px-2 py-0.5 rounded-full bg-[#C54B4B] text-white text-[9px] font-bold tracking-tight shadow-xs">
              Sold Out
            </span>
          )}
        </div>

        {/* Floating Wishlist Heart ♡ (Glossy Spatial Pill) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label="Add to wishlist"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glossy-pill text-[#756B70] hover:text-[#C54B4B] flex items-center justify-center active:scale-90 transition-all shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#C54B4B] text-[#C54B4B]' : 'text-[#756B70]'
            }`}
          />
        </button>
      </div>

      {/* Product Details Area (Semi-transparent with subtle inner border) */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-white/75 backdrop-blur-md">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#756B70] mb-1.5">
            <span className="font-sans font-bold tracking-[0.16em] text-[#7A3E5D] uppercase">
              {product.brand || "SULTANA'S DREAM"}
            </span>
            <div className="flex items-center gap-1 text-[#C88A2D] font-semibold">
              <Star className="w-3 h-3 fill-[#C88A2D]" />
              <span>{product.rating || '4.9'}</span>
              <span className="text-[#756B70] hidden sm:inline">({product.reviews || '28'})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onOpenPdp && onOpenPdp(product)}
            className="font-serif font-bold text-sm sm:text-base text-[#201B1D] tracking-tight line-clamp-1 group-hover:text-[#7A3E5D] transition-colors cursor-pointer"
          >
            {product.title}
          </h3>

          {/* Color Preview Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((colorItem, cIdx) => {
                const hexVal = typeof colorItem === 'string' ? colorItem : colorItem.hex;
                return (
                  <button
                    key={cIdx}
                    onClick={() => setSelectedColor(hexVal)}
                    style={{ backgroundColor: hexVal }}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      selectedColor === hexVal
                        ? 'ring-2 ring-[#7A3E5D] ring-offset-1 ring-offset-white border-white'
                        : 'border-[#E8DFE2] opacity-80'
                    }`}
                    title={typeof colorItem === 'object' ? colorItem.name : `Color ${cIdx + 1}`}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Price & Glossy Add to Bag Button */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E8DFE2]/70">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#201B1D] font-sans">
                ৳{Number(product.price).toLocaleString('en-US')}
              </span>
              {product.original_price > product.price && (
                <span className="text-xs text-[#756B70] line-through font-sans">
                  ৳{Number(product.original_price).toLocaleString('en-US')}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="text-[10px] font-bold text-[#2F7D5A] font-sans">
                Save ৳{Number(product.original_price - product.price).toLocaleString('en-US')}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product, selectedColor)}
            disabled={isOutOfStock}
            className={`inline-flex items-center gap-1.5 h-9 px-3.5 sm:px-4 rounded-full text-xs font-bold transition-all ${
              isOutOfStock
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'glossy-button-primary text-white shadow-md'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D8A7B1]" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
