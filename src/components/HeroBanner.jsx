import React from 'react';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Award } from 'lucide-react';

export default function HeroBanner({ 
  onShopNow, 
  onExploreCollections,
  title = "BEAUTY, REIMAGINED.",
  subtitle = "Discover everyday elegance and South Asian haute couture. Hand-woven heirloom Jamdani silk, ethereal pure muslin, and tested gold zari crafted for modern living.",
  badge = "Atelier Collection 2026",
  image = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop",
  buttonText = "Shop Collection"
}) {
  return (
    <section className="relative w-full overflow-hidden bg-[#0D0B0E] text-[#FBF8F5] pt-4 sm:pt-6 pb-12 sm:pb-20">
      {/* 1. ATMOSPHERIC LIQUID LIGHTING & RADIAL BACKDROPS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(216,167,177,0.18)_0%,rgba(122,62,93,0.1)_45%,transparent_70%)] filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(244,229,232,0.12)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(226,218,235,0.1)_0%,transparent_65%)] filter blur-3xl pointer-events-none" />

      {/* 2. SPATIAL CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-7 sm:space-y-9">
        
        {/* Top Floating Glass Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-dark text-[#D8A7B1] text-[11px] font-sans font-semibold tracking-[0.24em] uppercase shadow-lg border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-[#D8A7B1] animate-pulse shrink-0" />
          <span>{badge}</span>
        </div>

        {/* Brand Headline & Sub-brand */}
        <div className="space-y-2 max-w-4xl">
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#D8A7B1]/80 font-bold block">
            SULTANA'S DREAM • HAUTE ATELIER
          </span>
          <h1 className="text-display-hero font-serif font-black tracking-tight text-white leading-[0.98] drop-shadow-xl">
            {title}
          </h1>
          <p className="text-fluid-body text-[#FBF8F5]/85 font-light leading-relaxed max-w-2xl mx-auto pt-2 font-sans px-3">
            {subtitle}
          </p>
        </div>

        {/* 3. CINEMATIC FLOATING SPATIAL PRODUCT STAGE */}
        <div className="relative w-full max-w-3xl my-2 sm:my-4 group">
          {/* Ambient Glow behind floating product */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#7A3E5D]/30 via-[#D8A7B1]/15 to-transparent rounded-[44px] filter blur-2xl transform scale-95 pointer-events-none" />

          {/* Floating Spatial Glass Card Pedestal */}
          <div className="relative liquid-glass-dark rounded-[36px] sm:rounded-[48px] p-4 sm:p-7 border border-white/20 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.7),inset_0_1px_1.5px_rgba(255,255,255,0.3)] transition-all duration-700 hover:border-white/35">
            
            {/* Main Product Photography Window */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-neutral-900/60 border border-white/10 product-floor-shadow">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Floating Spatial Spec Badges (Level 2) */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full liquid-glass-dark text-white text-[10px] font-sans font-semibold tracking-wider uppercase border border-white/20 flex items-center gap-1.5 shadow-md">
                  <ShieldCheck className="w-3 h-3 text-[#D8A7B1]" />
                  Sonargaon Pure Mulberry Silk
                </span>
                <span className="hidden sm:inline-flex px-3 py-1 rounded-full liquid-glass-dark text-[#D8A7B1] text-[10px] font-sans font-semibold tracking-wider uppercase border border-white/20 items-center gap-1.5 shadow-md">
                  <Award className="w-3 h-3 text-amber-400" />
                  180 Weaving Hours
                </span>
              </div>

              {/* Product Spotlight Tag (Bottom Left) */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-left">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D8A7B1] block">
                  Signature Masterpiece
                </span>
                <h2 className="text-sm sm:text-lg font-serif font-bold text-white tracking-tight">
                  Nocturne Jamdani Zari Saree
                </h2>
                <span className="text-xs text-white/70 font-sans">
                  BDT ৳14,500 • Complimentary White-Glove Box
                </span>
              </div>
            </div>

            {/* Specular Ambient Light Reflection under Card */}
            <div className="product-ambient-reflection" />
          </div>
        </div>

        {/* 4. GLOSSY SPATIAL CALL TO ACTION BUTTONS */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onShopNow}
            className="glossy-button-primary w-full sm:w-auto h-13 px-8 rounded-full text-white text-xs font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all group"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4 text-[#D8A7B1] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreCollections}
            className="glossy-button-secondary w-full sm:w-auto h-13 px-7 rounded-full text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 active:scale-95 transition-all shadow-md"
          >
            <Compass className="w-4 h-4 text-[#7A3E5D]" />
            <span>Explore All Catalog</span>
          </button>
        </div>

      </div>

      {/* Bottom Soft Diffused Gradient Transition */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#FBF8F5] via-[#FBF8F5]/30 to-transparent pointer-events-none" />
    </section>
  );
}
