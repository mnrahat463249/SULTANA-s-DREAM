import React, { useState } from 'react';
import { 
  ArrowLeft, Share2, Heart, ShoppingBag, Star, 
  Ruler, Info, Check, ShieldCheck, ChevronDown, 
  Sparkles, Plus, Minus, Award, Clock, ChevronRight,
  Maximize2, Truck, RotateCcw, Zap, Layers, Feather, Sparkle
} from 'lucide-react';

const SULTANA_GALLERY = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1400&auto=format&fit=crop'
];

export default function ProductDetailPageView({ 
  onBack, 
  onAddToCart, 
  onGoToBag, 
  onBookTryOn,
  onNavigate 
}) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Obsidian Midnight');
  const [selectedSize, setSelectedSize] = useState('Standard Saree (6.5 Yards)');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('story'); // 'story' | 'craft' | 'specs' | 'shipping'

  const product = {
    id: 'prod_01',
    brand: "SULTANA'S DREAM",
    title: 'Nocturne Jamdani Pure Mulberry Silk Saree',
    subtitle: 'An heirloom masterpiece hand-woven by 4th-generation master weavers in Sonargaon.',
    sku: 'SD-JMD-001',
    price: 14500,
    original_price: 18500,
    discount_percent: 22,
    rating: 5.0,
    reviews_count: 128,
    category: 'Sarees',
    badge: 'Heritage Handloom',
    description: 'Woven on pit looms along the Shitalakshya riverbanks, every solitary floral motif is hand-threaded with fine bamboo sticks. Crafted from 100-count mulberry silk and dipped in pure 24-karat gold zari, this drape captures the serene moonlight of Bengal.',
    images: SULTANA_GALLERY
  };

  const colors = [
    { name: 'Obsidian Midnight', hex: '#1A1721' },
    { name: 'Crimson Royale', hex: '#7A3E5D' },
    { name: 'Ivory Gold', hex: '#EED8B3' }
  ];

  const sizes = [
    { label: 'Standard Saree (6.5 Yards)', sub: 'Includes Blouse Piece (1m)' },
    { label: 'Custom Stitched Blouse: S (36)', sub: 'Tailored to Measure' },
    { label: 'Custom Stitched Blouse: M (38)', sub: 'Tailored to Measure' },
    { label: 'Custom Stitched Blouse: L (40)', sub: 'Tailored to Measure' }
  ];

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(
        { ...product, price: product.price, images: SULTANA_GALLERY },
        selectedColor,
        selectedSize,
        quantity
      );
    }
    showToast(`Added ${quantity}× ${product.title} to your bag`);
  };

  const handleBuyNow = () => {
    handleAdd();
    if (onNavigate) {
      onNavigate('checkout');
    } else {
      window.location.hash = '#shop/checkout';
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F5] text-[#201B1D] font-sans antialiased selection:bg-[#7A3E5D]/20 selection:text-[#7A3E5D] pb-24 sm:pb-16">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#101010] text-white px-6 py-3 rounded-full text-xs font-sans shadow-2xl flex items-center gap-2.5 animate-blur-in">
          <Check className="w-4 h-4 text-[#2F7D5A]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Breadcrumb & Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-[#E8DFE2]">
        <div className="flex items-center gap-2 text-xs text-[#756B70]">
          <button onClick={onBack} className="hover:text-[#7A3E5D] flex items-center gap-1 font-bold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Catalog</span>
          </button>
          <span>/</span>
          <span className="hidden xs:inline">Sarees</span>
          <span className="hidden xs:inline">/</span>
          <span className="text-[#201B1D] font-semibold truncate max-w-[180px] sm:max-w-[280px]">{product.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              showToast('Link copied to clipboard');
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E8DFE2] text-[#756B70] hover:text-[#201B1D] hover:bg-white active:scale-95 transition-all"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E8DFE2] text-[#756B70] hover:text-[#C54B4B] hover:bg-white active:scale-95 transition-all"
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C54B4B] text-[#C54B4B]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main 2-Column Hero Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Cinematic Visual Stage (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Active Large Viewport */}
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-white border border-[#E8DFE2] shadow-sm group">
              <img
                src={SULTANA_GALLERY[activeImageIdx]}
                alt={product.title}
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-103"
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1 rounded-full bg-[#101010]/85 backdrop-blur-md text-[#FBF8F5] text-[11px] font-bold uppercase tracking-widest shadow-md">
                  {product.badge}
                </span>
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {SULTANA_GALLERY.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIdx === idx 
                      ? 'border-[#7A3E5D] ring-2 ring-[#7A3E5D]/20 scale-102' 
                      : 'border-[#E8DFE2] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Buy Box & Details (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFE2]/80 shadow-xs">
            
            {/* Brand & Reviews */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A3E5D] font-sans">
                {product.brand}
              </span>
              <h1 className="text-display-h2 font-serif font-bold text-[#201B1D] leading-tight">
                {product.title}
              </h1>
              <p className="text-xs text-[#756B70] leading-relaxed font-light">
                {product.subtitle}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center text-[#C88A2D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C88A2D]" />
                  ))}
                </div>
                <span className="text-xs text-[#756B70] font-sans font-medium">
                  5.0 ({product.reviews_count} verified patrons)
                </span>
              </div>
            </div>

            {/* Price & Discount (Taka Currency) */}
            <div className="p-4 rounded-2xl bg-[#FBF8F5] border border-[#E8DFE2] flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#201B1D] font-sans">
                    ৳{product.price.toLocaleString('en-US')}
                  </span>
                  <span className="text-xs sm:text-sm text-[#756B70] line-through font-sans">
                    ৳{product.original_price.toLocaleString('en-US')}
                  </span>
                </div>
                <span className="text-[11px] text-[#2F7D5A] font-bold">
                  Save ৳{(product.original_price - product.price).toLocaleString('en-US')} (22% off)
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#2F7D5A]/15 text-[#2F7D5A] text-xs font-bold">
                In Stock • Dhaka Atelier
              </span>
            </div>

            {/* Color Swatch Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#201B1D] block">
                Color Palette: <span className="text-[#7A3E5D] font-semibold">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                      selectedColor === col.name
                        ? 'border-[#7A3E5D] bg-[#7A3E5D]/10 text-[#7A3E5D] ring-1 ring-[#7A3E5D]'
                        : 'border-[#E8DFE2] text-[#756B70] hover:border-[#201B1D]'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: col.hex }} />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size & Length Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#201B1D]">
                  Size &amp; Tailoring Format
                </label>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs text-[#7A3E5D] hover:underline font-semibold flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="space-y-2">
                {sizes.map((sz) => (
                  <button
                    key={sz.label}
                    onClick={() => setSelectedSize(sz.label)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedSize === sz.label
                        ? 'border-[#7A3E5D] bg-[#7A3E5D]/5 text-[#7A3E5D] ring-1 ring-[#7A3E5D]'
                        : 'border-[#E8DFE2] text-[#201B1D] hover:border-neutral-400'
                    }`}
                  >
                    <span className="text-xs font-bold">{sz.label}</span>
                    <span className="text-[10px] text-[#756B70]">{sz.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#201B1D]">Quantity:</label>
              <div className="flex items-center border border-[#E8DFE2] rounded-full bg-[#FBF8F5] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-full bg-white text-[#201B1D] flex items-center justify-center hover:bg-neutral-100 active:scale-90 transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full bg-white text-[#201B1D] flex items-center justify-center hover:bg-neutral-100 active:scale-90 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Desktop Action Buttons: Add to Cart & Buy Now */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAdd}
                className="w-full h-13 rounded-full bg-[#101010] hover:bg-[#7A3E5D] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#D8A7B1]" />
                <span>Add to Bag — ৳{(product.price * quantity).toLocaleString('en-US')}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full h-12 rounded-full border border-[#7A3E5D] text-[#7A3E5D] hover:bg-[#7A3E5D]/10 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <Zap className="w-4 h-4 text-[#7A3E5D]" />
                <span>Instant Checkout</span>
              </button>
            </div>

            {/* White-Glove Guarantee Badges */}
            <div className="pt-3 border-t border-[#E8DFE2] space-y-2.5 text-xs text-[#756B70]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#7A3E5D] shrink-0" />
                <span>Complimentary Same-Day Courier in Dhaka (Eligible: Over ৳2,500)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#7A3E5D] shrink-0" />
                <span>7-Day Doorstep Exchange Guarantee with Free Courier Pickup</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= APPLE-STYLE STORYTELLING PROGRESSION ================= */}
        <div className="mt-20 space-y-16">
          
          {/* 1. Craftsmanship Highlights (Glass Cards Grid) */}
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A3E5D] font-sans block">
                Artisanal Lineage
              </span>
              <h2 className="text-display-h2 font-serif font-bold text-[#201B1D]">
                The Anatomy of Heirloom Jamdani
              </h2>
              <p className="text-xs sm:text-sm text-[#756B70] font-light">
                Every thread tells the centuries-old story of the Shitalakshya River and Bangladesh's UNESCO Intangible Cultural Heritage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E8DFE2] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF4F6] text-[#7A3E5D] flex items-center justify-center">
                  <Feather className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#201B1D]">100-Count Mulberry Silk</h3>
                <p className="text-xs text-[#756B70] leading-relaxed font-light">
                  Hand-spun gossamer silk yarn that drapes with extraordinary fluidity while allowing natural breathability across all seasons.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E8DFE2] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF4F6] text-[#7A3E5D] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#201B1D]">180 Loom Hours</h3>
                <p className="text-xs text-[#756B70] leading-relaxed font-light">
                  Two master artisans sit side-by-side at pit looms, passing fine bamboo needles through the warp to hand-knot each floral motif.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E8DFE2] shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF4F6] text-[#7A3E5D] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#201B1D]">Pure Gold-Dipped Zari</h3>
                <p className="text-xs text-[#756B70] leading-relaxed font-light">
                  Anti-tarnish electroplated gold metallic wire woven into the pallu, creating an ethereal glow under evening chandelier light.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Story Accordion / Tabs */}
          <section className="bg-white rounded-3xl border border-[#E8DFE2] p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-4 border-b border-[#E8DFE2] pb-4 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('story')}
                className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 shrink-0 ${
                  activeTab === 'story' ? 'border-[#7A3E5D] text-[#7A3E5D]' : 'border-transparent text-[#756B70] hover:text-[#201B1D]'
                }`}
              >
                Sonargaon Weaving Heritage
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 shrink-0 ${
                  activeTab === 'specs' ? 'border-[#7A3E5D] text-[#7A3E5D]' : 'border-transparent text-[#756B70] hover:text-[#201B1D]'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 shrink-0 ${
                  activeTab === 'shipping' ? 'border-[#7A3E5D] text-[#7A3E5D]' : 'border-transparent text-[#756B70] hover:text-[#201B1D]'
                }`}
              >
                Shipping &amp; 7-Day Exchange
              </button>
            </div>

            <div className="py-6 max-w-3xl text-xs sm:text-sm text-[#756B70] leading-relaxed space-y-4">
              {activeTab === 'story' && (
                <div className="space-y-3">
                  <p>
                    Jamdani weaving is a recognized UNESCO Intangible Cultural Heritage of Humanity originating in the historic capital of Sonargaon. 
                    Unlike modern machine jacquards, every solitary motif in this saree was meticulously passed through the warp threads by hand using bamboo needle sticks.
                  </p>
                  <p>
                    Each piece requires an average of <strong>180 hours of non-stop artisan craftsmanship</strong>, ensuring that no two sarees possess identical textures.
                  </p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-[#FBF8F5] rounded-2xl border border-[#E8DFE2]">
                    <span className="font-bold text-[#201B1D] block mb-1">Fabric Composition</span>
                    <span>100-Count Pure Mulberry Silk Warp &amp; Weft</span>
                  </div>
                  <div className="p-3.5 bg-[#FBF8F5] rounded-2xl border border-[#E8DFE2]">
                    <span className="font-bold text-[#201B1D] block mb-1">Zari Specification</span>
                    <span>Gold-Electroplated Anti-Tarnish Metal Wire</span>
                  </div>
                  <div className="p-3.5 bg-[#FBF8F5] rounded-2xl border border-[#E8DFE2]">
                    <span className="font-bold text-[#201B1D] block mb-1">Dimensions</span>
                    <span>Length: 6.5 Yards (Includes 1m Running Blouse Piece)</span>
                  </div>
                  <div className="p-3.5 bg-[#FBF8F5] rounded-2xl border border-[#E8DFE2]">
                    <span className="font-bold text-[#201B1D] block mb-1">Garment Care</span>
                    <span>Strict Dry Clean Only • Roll in Soft Muslin Cloth</span>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-3">
                  <p><strong>Dhaka City Delivery:</strong> Same-day or Next-day White Glove courier via Pathao/In-house fleet. Complimentary for orders over ৳2,500 (Otherwise ৳60 standard fee).</p>
                  <p><strong>Nationwide Delivery (Chattogram, Sylhet, Rajshahi, etc.):</strong> 2 to 4 business days via Steadfast Courier (৳120 delivery fee).</p>
                  <p><strong>Exchange Guarantee:</strong> If the drape doesn't suit your occasion, schedule a complimentary doorstep pickup within 7 days for an immediate exchange or refund.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* ================= STICKY MOBILE BOTTOM GLASS ACTION BAR ================= */}
      <aside 
        aria-label="Mobile quick purchase bar"
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/90 backdrop-blur-xl border-t border-[#E8DFE2] px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3"
      >
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-sans tracking-wider text-[#756B70]">Total Price</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-[#201B1D] font-sans leading-none">
              ৳{(product.price * quantity).toLocaleString('en-US')}
            </span>
            {product.original_price > product.price && (
              <span className="text-[11px] text-[#756B70] line-through font-sans">
                ৳{(product.original_price * quantity).toLocaleString('en-US')}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAdd}
            className="h-11 px-5 rounded-full bg-[#101010] hover:bg-[#7A3E5D] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D8A7B1]" />
            <span>Add to Bag</span>
          </button>

          <button
            onClick={handleBuyNow}
            className="h-11 px-4 rounded-full bg-[#7A3E5D] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Buy</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
