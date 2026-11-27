import React, { useState, useEffect } from 'react';
import { 
  Heart, ShoppingBag, Search, Star, ArrowRight, 
  Sparkles, Check, ChevronRight, ShieldCheck, 
  Truck, RotateCcw, Award, Mail, MessageCircle
} from 'lucide-react';
import HeroBanner from './HeroBanner';
import ProductCard from './ProductCard';
import { apiService } from '../services/apiService';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function EditorialStorefront({
  products = [],
  isLoading = false,
  isLoadingMore = false,
  hasMore = true,
  onLoadMore,
  cartItems = [],
  onOpenCart,
  onOpenFilters,
  onAddToCart,
  wishlistIds = [],
  onToggleWishlist,
  searchQuery = '',
  onSearchChange,
  selectedCategory = 'All Pieces',
  onSelectCategory,
  onNavigate
}) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [activeSections, setActiveSections] = useState(null);

  useEffect(() => {
    let isMounted = true;
    apiService.getHomepage().then(data => {
      if (isMounted && data && Array.isArray(data.sections) && data.sections.length > 0) {
        setActiveSections(data.sections);
      }
    }).catch(err => console.warn('Could not fetch homepage sections:', err));

    return () => { isMounted = false; };
  }, []);

  // South Asian Luxury Categories (Section 03)
  const categoryTiles = [
    {
      name: 'Sarees',
      tag: 'Heritage Jamdani & Silk',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Anarkalis',
      tag: 'Muslin & Gota Patti',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Co-ord Sets',
      tag: 'Chanderi Festive Sets',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Dupattas & Shawls',
      tag: 'Royale Velvet & Mukaish',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Fusion Tailoring',
      tag: 'Organza & Silk Suiting',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Jewelry',
      tag: 'Filigree & Polki',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop'
    }
  ];

  // Customer Reviews (Section 14)
  const customerReviews = [
    {
      id: 1,
      author: 'Farhana Samad',
      location: 'Banani, Dhaka',
      rating: 5,
      date: '2 days ago',
      title: 'Heirloom Jamdani of Breathtaking Quality',
      review: 'The Nocturne Jamdani saree was delivered in a scented cedar gift box within 4 hours. The drape is whisper-soft and the gold zari weave has an ethereal moonlight sheen.',
      verified: true,
      piece: 'Nocturne Jamdani Pure Mulberry Silk Saree'
    },
    {
      id: 2,
      author: 'Samira Khan Chowdhury',
      location: 'Nasirabad, Chattogram',
      rating: 5,
      date: '1 week ago',
      title: 'Flawless Fit & Royal Velvet Feel',
      review: 'Ordered the Royale Velvet Shawl for my sister’s wedding. The zardozi borders are so rich and heavy, yet comfortable to carry throughout the evening.',
      verified: true,
      piece: 'Zari Embroidered Royale Velvet Shawl'
    },
    {
      id: 3,
      author: 'Dr. Nusrat Jahan',
      location: 'Dhanmondi, Dhaka',
      rating: 5,
      date: '2 weeks ago',
      title: 'Finally, Authentic Muslin Made Contemporary',
      review: 'The Rosewater Anarkali has 24 kalis that flare like poetry. Extremely breathable and elegant for Dhaka’s festive weather. Will definitely be a repeat client.',
      verified: true,
      piece: 'Rosewater Muslin Kalidar Anarkali Set'
    }
  ];

  // Social Lookbook Gallery
  const socialGallery = [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop'
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setNewsletterEmail('');
    }, 4000);
  };

  const isSectionActive = (type) => {
    if (!activeSections) return true;
    const sec = activeSections.find(s => s.type === type);
    return sec ? sec.is_active !== false : true;
  };

  const getSectionData = (type) => activeSections?.find(s => s.type === type);
  const heroData = getSectionData('hero_section');
  const promoData = getSectionData('festive_promo_banner');
  const brandData = getSectionData('brand_story');
  const reviewsData = getSectionData('customer_reviews');
  const categoriesData = getSectionData('featured_categories');
  const productsData = getSectionData('featured_products');
  const lookbookData = getSectionData('instagram_lookbook');
  const newsletterData = getSectionData('newsletter');

  return (
    <div className="relative bg-[#FBF8F5] text-[#201B1D] font-sans antialiased selection:bg-[#7A3E5D]/20 selection:text-[#7A3E5D] min-h-screen pb-24 lg:pb-16 overflow-hidden">
      
      {/* ATMOSPHERIC RADIAL LIGHTING FIELDS (Spatial Ambiance) */}
      <div className="fixed top-1/4 -left-48 w-[650px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(216,167,177,0.14)_0%,transparent_70%)] filter blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-2/3 -right-48 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(244,229,232,0.18)_0%,transparent_70%)] filter blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(226,218,235,0.12)_0%,transparent_70%)] filter blur-3xl pointer-events-none -z-10" />

      {/* 1. HERO CAMPAIGN BANNER (Section 03) */}
      {isSectionActive('hero_section') && (
        <HeroBanner
          title={heroData?.title || "SULTANA'S DREAM"}
          subtitle={heroData?.subtitle || "Discover your everyday favorites. Modern South Asian elegance crafted in heirloom Jamdani silk, pure muslin, and regal velvet."}
          image={heroData?.image || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1800&auto=format&fit=crop"}
          buttonText={heroData?.button_text || "Shop Now"}
          onShopNow={() => onNavigate ? onNavigate('catalog') : window.location.hash = '#shop/catalog'}
          onExploreCollections={() => onNavigate ? onNavigate('catalog') : window.location.hash = '#shop/catalog'}
        />
      )}

      {/* 2. VALUE PROPOSITION RIBBON (Floating Liquid Glass Island) */}
      {isSectionActive('value_proposition') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 sm:-mt-9 relative z-20">
          <div className="liquid-glass bg-white/80 backdrop-blur-2xl border border-white/85 rounded-[32px] shadow-[0_20px_45px_-12px_rgba(32,27,29,0.08),inset_0_1px_1.5px_rgba(255,255,255,1)] py-4 sm:py-5 px-4 sm:px-7 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-center">
            <div className="flex items-center justify-center gap-3 p-2 text-left group">
              <div className="w-11 h-11 rounded-2xl liquid-glass-subtle border border-white/90 text-[#7A3E5D] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#201B1D] block leading-tight">Express White-Glove</span>
                <span className="text-[11px] text-[#756B70]">Free across Dhaka over ৳2,500</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-2 text-left group">
              <div className="w-11 h-11 rounded-2xl liquid-glass-subtle border border-white/90 text-[#7A3E5D] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-[#8E496D]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#201B1D] block leading-tight">Authentic Handloom</span>
                <span className="text-[11px] text-[#756B70]">Sonargaon pit-loom masters</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-2 text-left group">
              <div className="w-11 h-11 rounded-2xl liquid-glass-subtle border border-white/90 text-[#7A3E5D] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#201B1D] block leading-tight">Doorstep Exchange</span>
                <span className="text-[11px] text-[#756B70]">7-Day complimentary pickup</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 p-2 text-left group">
              <div className="w-11 h-11 rounded-2xl liquid-glass-subtle border border-white/90 text-[#7A3E5D] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-[#2F7D5A]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#201B1D] block leading-tight">Flexible Payment</span>
                <span className="text-[11px] text-[#756B70]">bKash, Cards &amp; Cash on Delivery</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. SHOP BY CATEGORY (Magazine-Style Editorial Taxonomy) */}
      {isSectionActive('featured_categories') && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A3E5D] font-sans block mb-1">
              {categoriesData?.subtitle || "Curated Taxonomy"}
            </span>
            <h2 className="text-display-h2 font-serif font-bold text-[#201B1D] tracking-tight">
              {categoriesData?.title || "Shop by Category"}
            </h2>
          </div>

          <button
            onClick={() => onNavigate ? onNavigate('catalog') : window.location.hash = '#shop/catalog'}
            className="text-xs font-bold uppercase tracking-wider text-[#7A3E5D] hover:text-[#201B1D] flex items-center gap-1.5 group transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Cards Grid (Spatial Liquid Glass Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categoryTiles.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (onSelectCategory) onSelectCategory(cat.name);
                if (onNavigate) onNavigate('catalog');
              }}
              className="group cursor-pointer flex flex-col rounded-[26px] overflow-hidden spatial-card bg-white/70 border border-white/80 hover:border-white shadow-[0_12px_30px_rgba(32,27,29,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.95)] hover:shadow-[0_22px_45px_rgba(122,62,93,0.14)] hover:-translate-y-1.5 transition-all duration-500 tap-bounce glossy-card"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#FBF8F5] relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <span className="text-[9px] font-sans tracking-[0.2em] uppercase opacity-85 block">
                    {cat.tag}
                  </span>
                  <span className="font-serif font-bold text-sm sm:text-base leading-tight block mt-0.5">
                    {cat.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* 4. FEATURED PRODUCTS GRID (Section 03 & 05) */}
      {isSectionActive('featured_products') && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#7A3E5D] font-sans block mb-1">
              {productsData?.subtitle || "Handcrafted Masterpieces"}
            </span>
            <h2 className="text-display-h2 font-serif font-bold text-[#201B1D] tracking-tight">
              {productsData?.title || "Featured Pieces"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#756B70] font-sans hidden sm:inline">
              Showing {products.length} Curated Styles
            </span>
            <button
              onClick={() => onNavigate ? onNavigate('catalog') : window.location.hash = '#shop/catalog'}
              className="px-4 py-2 rounded-full border border-[#E8DFE2] hover:bg-white text-xs font-bold text-[#201B1D] transition-colors"
            >
              Explore All
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 8).map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(prod.id)}
              onOpenPdp={() => onNavigate ? onNavigate('pdp') : window.location.hash = '#shop/pdp'}
            />
          ))}
        </div>

        {/* Load More Trigger */}
        {hasMore && (
          <div className="text-center pt-10">
            <button
              onClick={onLoadMore}
              disabled={isLoadingMore}
              className="h-12 px-9 rounded-full glossy-pill text-[#7A3E5D] hover:text-[#201B1D] text-xs font-bold uppercase tracking-[0.2em] transition-all disabled:opacity-50 shadow-sm"
            >
              {isLoadingMore ? 'Loading Heirloom Pieces...' : 'Load More Products'}
            </button>
          </div>
        )}
      </section>
      )}

      {/* 5. SPATIAL SIGNATURE MASTERPIECE SHOWCASE (Apple-Style Spotlight) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative rounded-[36px] sm:rounded-[48px] liquid-glass-dark text-white p-6 sm:p-12 lg:p-16 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.25)] border border-white/20 overflow-hidden group">
          {/* Ambient Lighting Field */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,rgba(216,167,177,0.25)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[radial-gradient(circle,rgba(122,62,93,0.3)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-dark text-[#D8A7B1] text-[10px] font-sans font-semibold tracking-[0.24em] uppercase border border-white/20 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#D8A7B1] animate-pulse" />
                <span>Atelier Spotlight 2026</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-[1.05] text-white">
                The Midnight Jamdani Zari Saree
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed font-sans max-w-xl">
                Woven on traditional Sonargaon pit-looms over 180 continuous hours. Infused with pure mulberry silk and electroplated gold zari floral motifs that shimmer subtly under evening candlelight.
              </p>

              {/* Spatial Spec Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="px-3 py-1.5 rounded-full liquid-glass-dark text-white text-[11px] font-sans font-medium border border-white/15 flex items-center gap-1.5 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D8A7B1]" />
                  100% Pure Sonargaon Silk
                </span>
                <span className="px-3 py-1.5 rounded-full liquid-glass-dark text-[#D8A7B1] text-[11px] font-sans font-medium border border-white/15 flex items-center gap-1.5 shadow-xs">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Cryptographic NFC Provenance
                </span>
              </div>

              {/* Pricing & CTA Button */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate ? onNavigate('catalog') : window.location.hash = '#shop/catalog'}
                  className="h-12 px-8 rounded-full glossy-button-primary text-white text-xs font-bold uppercase tracking-[0.18em] flex items-center gap-2.5 shadow-lg active:scale-95 transition-all"
                >
                  <span>Acquire Masterpiece</span>
                  <ArrowRight className="w-4 h-4 text-[#D8A7B1]" />
                </button>
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-sans font-medium">Atelier Price</span>
                  <span className="text-lg font-serif font-bold text-white font-tabular">৳14,500</span>
                </div>
              </div>
            </div>

            {/* Right Cinematic Media Box with Floor Shadow */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-[28px] sm:rounded-[36px] overflow-hidden product-floor-shadow border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop"
                  alt="Midnight Jamdani Saree Masterpiece"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-xs font-serif font-medium italic">
                  Sonargaon Handloom Archive No. 0824
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROMOTIONAL FESTIVE BANNER (Spatial Card with Rose Aura) */}
      {isSectionActive('festive_promo_banner') && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-br from-[#7A3E5D] via-[#68314D] to-[#4E2038] text-white p-8 sm:p-12 lg:p-16 shadow-[0_30px_70px_-15px_rgba(122,62,93,0.35),inset_0_1px_1.5px_rgba(255,255,255,0.35)] border border-white/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4 z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-[#D8A7B1] text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#D8A7B1] animate-pulse" />
              <span>Festive Season 2026</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black leading-tight">
              {promoData?.title || "The Autumn Wedding & Eid Soirée"}
            </h3>
            <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed font-sans">
              {promoData?.subtitle || "Indulge in royal zardozi velvets, luminous 100-count Sonargaon Jamdani silks, and bespoke muslin kalidars tailored for unforgettable celebratory evenings."}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate ? onNavigate('catalog') : window.location.hash = (promoData?.button_url || '#shop/catalog')}
                className="h-12 px-8 rounded-full bg-white text-[#7A3E5D] hover:bg-[#FBF8F5] text-xs font-bold uppercase tracking-[0.16em] shadow-lg active:scale-95 transition-all"
              >
                {promoData?.button_text || "Discover Collection"}
              </button>
              <span className="text-xs font-mono font-bold tracking-wider text-[#D8A7B1] bg-black/25 px-3 py-1.5 rounded-full border border-white/10">
                CODE: SULTANA20 (20% OFF)
              </span>
            </div>
          </div>

          <div className="w-full md:w-80 h-72 rounded-[28px] overflow-hidden border border-white/25 shadow-2xl shrink-0 product-floor-shadow">
            <img
              src={promoData?.image || "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop"}
              alt="Festive Silk Drape"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center filter contrast-105 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>
      )}

      {/* 7. EDITORIAL / BRAND STORY (Section 03) */}
      {isSectionActive('brand_story') && (
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#7A3E5D] font-sans block">
          {brandData?.subtitle || "Begum Rokeya's Legacy Reimagined"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#201B1D] tracking-tight max-w-2xl mx-auto leading-snug">
          "{brandData?.quote || "A world where women dream without boundaries, draped in the timeless grace of our heritage."}"
        </h2>
        <div className="w-16 h-0.5 bg-[#D8A7B1] mx-auto rounded-full" />
        <p className="text-sm sm:text-base text-[#756B70] leading-relaxed max-w-2xl mx-auto font-light font-sans">
          Inspired by Begum Rokeya Sakhawat Hossain's visionary feminist utopia published in 1905, 
          <strong> Sultana's Dream</strong> unites the centuries-old handloom genius of Bengal with contemporary, 
          effortlessly feminine silhouettes. Every thread is spun with dignity, pride, and poetic elegance.
        </p>
      </section>
      )}

      {/* 8. CUSTOMER REVIEWS (Spatial Glass Testimonial Cards) */}
      {isSectionActive('customer_reviews') && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#7A3E5D] font-sans block">
            {reviewsData?.subtitle || "Verified Experiences"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#201B1D]">
            {reviewsData?.title || "Loved by Connoisseurs"}
          </h2>
          <p className="text-xs text-[#756B70] font-sans">Over 1,840 verified five-star patrons across Bangladesh &amp; the Diaspora</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.map((rev) => (
            <div 
              key={rev.id} 
              className="p-6 rounded-[28px] spatial-card liquid-glass-subtle border border-white/85 shadow-[0_14px_30px_rgba(32,27,29,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.95)] hover:border-white space-y-4 flex flex-col justify-between tap-bounce glossy-card"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C88A2D]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C88A2D]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#756B70] font-sans font-medium">{rev.date}</span>
                </div>

                <h4 className="font-serif font-bold text-base text-[#201B1D]">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-[#756B70] leading-relaxed font-light font-sans">
                  {rev.review}
                </p>
              </div>

              <div className="pt-3 border-t border-white/80 flex items-center justify-between">
                <div>
                  <strong className="text-xs font-bold text-[#201B1D] block font-sans">{rev.author}</strong>
                  <span className="text-[10px] text-[#756B70] font-sans">{rev.location}</span>
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2F7D5A]/10 text-[#2F7D5A] text-[9px] font-bold border border-[#2F7D5A]/20">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Verified Purchase</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* 9. INSTAGRAM LOOKBOOK GALLERY (Section 03) */}
      {isSectionActive('instagram_lookbook') && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#7A3E5D] font-sans block">
              {lookbookData?.subtitle || "Follow Our Journey"}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#201B1D]">
              {lookbookData?.title || "@SultanasDreamAtelier"}
            </h3>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-[#7A3E5D] hover:underline uppercase tracking-wider"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>View Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {socialGallery.map((imgUrl, idx) => (
            <div key={idx} className="aspect-square rounded-[24px] overflow-hidden group relative bg-[#FBF8F5] spatial-card border border-white/80 shadow-xs">
              <img
                src={imgUrl}
                alt={`Instagram lookbook ${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#7A3E5D]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white backdrop-blur-[2px]">
                <InstagramIcon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* 10. NEWSLETTER SUBSCRIPTION (Floating Spatial Glass Capsule) */}
      {isSectionActive('newsletter') && (
      <section className="max-w-3xl mx-auto px-4 py-16 my-8">
        <div className="liquid-glass bg-white/80 backdrop-blur-2xl rounded-[36px] border border-white/85 p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(32,27,29,0.08),inset_0_1px_1.5px_rgba(255,255,255,1)] text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl liquid-glass-subtle text-[#7A3E5D] border border-white/90 flex items-center justify-center mx-auto shadow-xs">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#201B1D]">
            {newsletterData?.title || "Join the Sultana's Dream Circle"}
          </h3>
          <p className="text-xs sm:text-sm text-[#756B70] max-w-md mx-auto font-light leading-relaxed font-sans">
            {newsletterData?.subtitle || "Receive private invitations to handloom trunk shows, seasonal previews, and receive ৳1,000 off your first bespoke order."}
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex items-center gap-2 pt-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 h-12 px-5 rounded-full liquid-glass-subtle bg-white/90 border border-white/90 text-xs text-[#201B1D] placeholder:text-[#756B70] focus:outline-none focus:border-[#7A3E5D] shadow-xs"
            />
            <button
              type="submit"
              className="h-12 px-7 rounded-full glossy-button-primary text-white text-xs font-bold tracking-[0.16em] uppercase active:scale-95 transition-all shrink-0 shadow-md"
            >
              Join
            </button>
          </form>

          {newsletterSubmitted && (
            <p className="text-xs text-[#2F7D5A] font-bold animate-fade-in pt-1">
              ✓ Welcome to the circle. Check your inbox for your ৳1,000 gift voucher.
            </p>
          )}
        </div>
      </section>
      )}

      {/* 10. EDITORIAL FOOTER (Section 03) */}
      <footer className="border-t border-[#E8DFE2] bg-white text-[#201B1D] pt-14 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#7A3E5D] text-white flex items-center justify-center font-serif font-black text-base">
                S
              </div>
              <span className="font-serif font-bold text-lg uppercase tracking-wider text-[#201B1D]">
                SULTANA'S DREAM
              </span>
            </div>
            <p className="text-xs text-[#756B70] leading-relaxed max-w-sm font-light">
              Modern South Asian e-commerce brand celebrating feminine heritage, unstitched heirloom silks, and effortless contemporary silhouettes.
            </p>
            <div className="text-xs text-[#756B70] space-y-1">
              <p>Flagship Atelier: Road 11, Banani, Dhaka 1213</p>
              <p>Direct Concierge: +880 1712-345678</p>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3 text-xs">
            <strong className="font-bold uppercase tracking-wider text-[#7A3E5D] font-sans block">
              Boutique
            </strong>
            <ul className="space-y-2 text-[#756B70]">
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-[#7A3E5D]">Jamdani Sarees</button></li>
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-[#7A3E5D]">Muslin Anarkalis</button></li>
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-[#7A3E5D]">Velvet Shawls</button></li>
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-[#7A3E5D]">Chanderi Co-ord Sets</button></li>
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-[#7A3E5D]">Handmade Jewelry</button></li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="space-y-3 text-xs">
            <strong className="font-bold uppercase tracking-wider text-[#7A3E5D] font-sans block">
              Client Concierge
            </strong>
            <ul className="space-y-2 text-[#756B70]">
              <li><button onClick={() => onNavigate('tracking')} className="hover:text-[#7A3E5D]">Track Your Order</button></li>
              <li><button onClick={() => onNavigate('returns')} className="hover:text-[#7A3E5D]">7-Day Return Policy</button></li>
              <li><button onClick={() => onNavigate('account')} className="hover:text-[#7A3E5D]">My Account</button></li>
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-[#7A3E5D]">Shipping Zones (Dhaka &amp; Nationwide)</button></li>
              <li><button onClick={() => alert('Sultana’s Dream Size Guide: Saree = 6.5 Yards; Anarkali/Kurti: XS (34) S (36) M (38) L (40) XL (42)')} className="hover:text-[#7A3E5D]">Size Guide</button></li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div className="space-y-3 text-xs">
            <strong className="font-bold uppercase tracking-wider text-[#7A3E5D] font-sans block">
              Payment &amp; Trust
            </strong>
            <p className="text-[11px] text-[#756B70] leading-relaxed">
              100% Encrypted &amp; Verified. Supported payment gateways:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-1 bg-[#FBF8F5] border border-[#E8DFE2] rounded text-[10px] font-bold text-[#7A3E5D]">bKash</span>
              <span className="px-2 py-1 bg-[#FBF8F5] border border-[#E8DFE2] rounded text-[10px] font-bold text-[#C88A2D]">Nagad</span>
              <span className="px-2 py-1 bg-[#FBF8F5] border border-[#E8DFE2] rounded text-[10px] font-bold text-[#201B1D]">COD</span>
              <span className="px-2 py-1 bg-[#FBF8F5] border border-[#E8DFE2] rounded text-[10px] font-bold text-[#273A5C]">Visa</span>
              <span className="px-2 py-1 bg-[#FBF8F5] border border-[#E8DFE2] rounded text-[10px] font-bold text-[#C54B4B]">Mastercard</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-[#E8DFE2] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#756B70]">
          <p>© 2026 SULTANA'S DREAM. All Rights Reserved. Crafted with love for South Asian Haute Couture.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#admin" onClick={(e) => { e.preventDefault(); onNavigate ? onNavigate('admin_portal') : window.location.hash = '#admin'; }} className="hover:underline font-bold text-[#7A3E5D]">Admin Portal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
