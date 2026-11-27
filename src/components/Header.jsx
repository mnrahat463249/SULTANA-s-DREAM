import React, { useState, useEffect } from 'react';
import { 
  Menu, ShoppingBag, Search, SlidersHorizontal, X, 
  Sparkles, Heart, User, Crown 
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function Header({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenMenu,
  onOpenFilters,
  searchQuery = '',
  onSearchChange,
  activeFilterCount = 0,
  onNavigate
}) {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navItems, setNavItems] = useState([
    { id: 'nav_home', label: 'Home', url: '#shop/storefront', is_active: true },
    { id: 'nav_shop', label: 'Shop', url: '#shop/catalog', is_active: true },
    { id: 'nav_new', label: 'New Arrivals', url: '#shop/catalog', is_active: true },
    { id: 'nav_bestsellers', label: 'Best Sellers', url: '#shop/catalog', is_active: true },
    { id: 'nav_collections', label: 'Collections', url: '#shop/catalog', is_active: true },
    { id: 'nav_offers', label: 'Offers', url: '#shop/catalog', is_active: true, highlight: true }
  ]);
  const [announcement, setAnnouncement] = useState("Complimentary White-Glove Delivery Across Dhaka Over ৳2,500 • Use Code: SULTANA20");

  const popularSearches = ['Nocturne Jamdani', 'Muslin Anarkali', 'Mulberry Silk', 'Festive Co-ord', 'Gold Zari Saree'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;
    apiService.getNavigation().then(res => {
      if (isMounted && res?.items && res.items.length > 0) {
        setNavItems(res.items.filter(it => it.is_active !== false));
      }
    }).catch(err => console.warn('Could not load nav from backend:', err));

    apiService.getSettings().then(st => {
      if (isMounted && st?.announcement_text) {
        setAnnouncement(st.announcement_text);
      }
    }).catch(err => console.warn('Could not load settings in header:', err));

    return () => { isMounted = false; };
  }, []);

  const handleNavClick = (url) => {
    if (url.startsWith('#shop/')) {
      const page = url.replace('#shop/', '');
      if (onNavigate) onNavigate(page);
      else window.location.hash = url;
    } else {
      window.location.hash = url;
    }
  };

  return (
    <>
      {/* 1. ANNOUNCEMENT BAR (Apple Minimalist Luxury Ribbon) */}
      <aside 
        aria-label="Announcement" 
        className="bg-[#101010] text-[#FBF8F5] text-center px-4 py-2 text-[11px] tracking-[0.2em] uppercase font-sans font-medium flex items-center justify-center gap-2 border-b border-white/10 relative z-50"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D8A7B1] animate-pulse shrink-0" />
        <span className="truncate">{announcement}</span>
      </aside>

      {/* 2. FLOATING SPATIAL LIQUID GLASS NAVIGATION */}
      <div className="sticky top-2 sm:top-3 z-40 px-3 sm:px-6 max-w-7xl mx-auto transition-all duration-500">
        <header 
          className={`rounded-full transition-all duration-500 ${
            isScrolled
              ? 'liquid-glass bg-white/85 py-2 sm:py-2.5 px-4 sm:px-6 shadow-[0_20px_45px_-12px_rgba(32,27,29,0.1),inset_0_1px_1.5px_rgba(255,255,255,1)] border border-white/85'
              : 'liquid-glass-subtle bg-white/70 py-2.5 sm:py-3 px-4 sm:px-6 shadow-[0_12px_30px_rgba(32,27,29,0.05),inset_0_1px_1.5px_rgba(255,255,255,0.9)] border border-white/75'
          } flex items-center justify-between gap-3 sm:gap-6`}
        >
          {/* Mobile Left: Touch Target Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenMenu}
              aria-label="Open navigation menu"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#201B1D] hover:bg-black/5 active:scale-95 transition-all glossy-pill"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => onNavigate ? onNavigate('storefront') : window.location.hash = '#shop/storefront'}
            className="flex items-center gap-2.5 text-left group shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8E496D] to-[#7A3E5D] text-white flex items-center justify-center font-serif font-black text-lg shadow-sm group-hover:scale-105 transition-transform border border-white/30">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-extrabold text-sm sm:text-base lg:text-lg tracking-wider uppercase text-[#201B1D] group-hover:text-[#7A3E5D] transition-colors leading-none">
                Sultana's Dream
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-[#756B70] font-sans font-medium mt-0.5">
                Atelier &amp; Living
              </span>
            </div>
          </button>

          {/* Desktop Center: Dynamic Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[12px] font-medium tracking-[0.14em] uppercase text-[#201B1D]">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.url)}
                className={`transition-colors py-1 relative group font-sans ${
                  item.highlight 
                    ? 'text-[#7A3E5D] font-bold' 
                    : 'text-[#201B1D]/85 hover:text-[#7A3E5D]'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7A3E5D] group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            ))}

            {/* Protected Admin Access (Only visible when admin is actively logged in) */}
            {apiService.isAdminAuthenticated() && (
              <button 
                onClick={() => {
                  if (onNavigate) onNavigate('admin_portal');
                  else window.location.hash = '#admin/dashboard';
                }}
                className="text-[#7A3E5D] font-bold transition-all py-1 px-3.5 rounded-full border border-[#D8A7B1]/70 bg-white/70 hover:bg-[#7A3E5D] hover:text-white hover:border-[#7A3E5D] flex items-center gap-1.5 shadow-xs text-[11px] glossy-pill"
                title="Enter Atelier Admin & ERP-Lite Portal"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Admin ERP</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            )}
          </nav>

          {/* Desktop Search Trigger (Glossy Spatial Capsule) */}
          <div 
            onClick={() => setShowSearchModal(true)}
            className="hidden md:flex flex-1 max-w-xs relative cursor-pointer group"
          >
            <div className="w-full pl-9 pr-4 py-2 text-xs bg-white/75 backdrop-blur-xl border border-white/80 rounded-full text-[#756B70] group-hover:text-[#201B1D] group-hover:border-[#D8A7B1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.02)] transition-all flex items-center justify-between">
              <span className="truncate">{searchQuery || 'Search jamdani, muslin, silk...'}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/5 text-[#756B70]">⌘K</span>
            </div>
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#756B70] group-hover:text-[#7A3E5D] transition-colors pointer-events-none" />
          </div>

          {/* Right Action Icons: Search, Filter, Wishlist, Account, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile Search Trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              aria-label="Open search"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-[#201B1D] hover:bg-black/5 active:scale-95 transition-all glossy-pill"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Filter Toggle */}
            <button
              onClick={onOpenFilters}
              aria-label="Open product filters"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#201B1D] hover:bg-black/5 active:scale-95 transition-all relative glossy-pill"
              title="Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeFilterCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#7A3E5D] text-white text-[8px] font-bold flex items-center justify-center shadow-xs">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Wishlist Heart */}
            <button
              onClick={() => onNavigate ? onNavigate('account') : window.location.hash = '#shop/account'}
              aria-label="View Wishlist"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#201B1D] hover:bg-black/5 active:scale-95 transition-all relative glossy-pill"
              title="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#7A3E5D] text-white text-[8px] font-bold flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account Profile */}
            <button
              onClick={() => onNavigate ? onNavigate('account') : window.location.hash = '#shop/account'}
              aria-label="Account profile"
              className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-[#201B1D] hover:bg-black/5 active:scale-95 transition-all glossy-pill"
              title="My Account"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Shopping Bag Button (Glossy Rose / Burgundy Pill) */}
            <button
              onClick={onOpenCart}
              aria-label="Open cart"
              className="glossy-button-primary relative flex items-center gap-2 h-9 pl-3.5 pr-4 rounded-full text-white text-xs font-bold active:scale-95 transition-all shadow-md group"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D8A7B1] group-hover:scale-110 transition-transform" />
              <span className="hidden xs:inline tracking-wider uppercase text-[11px] font-semibold">Bag</span>
              <span className="w-4.5 h-4.5 rounded-full bg-white text-[#7A3E5D] text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </button>
          </div>
        </header>
      </div>

      {/* 3. EXPANDABLE FLOATING LIQUID GLASS SEARCH MODAL */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl liquid-glass rounded-[32px] p-5 sm:p-7 border border-white/85 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            {/* Modal Search Input Header */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E8DFE2]/70">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-[#7A3E5D]" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search jamdani sarees, muslin anarkalis, silk shawls..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-transparent text-base sm:text-lg font-serif font-bold text-[#201B1D] placeholder:text-[#756B70] placeholder:font-sans placeholder:font-normal focus:outline-none"
                />
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#756B70] hover:text-[#201B1D] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Popular Searches Chips */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#756B70] block">
                Trending In Atelier
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onSearchChange(term);
                      setShowSearchModal(false);
                      if (onNavigate) onNavigate('catalog');
                    }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/70 hover:bg-[#7A3E5D] hover:text-white border border-[#E8DFE2] text-[#201B1D] transition-all glossy-pill"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Search Quick Action */}
            {searchQuery && (
              <div className="pt-2 border-t border-[#E8DFE2]/60 flex items-center justify-between">
                <span className="text-xs text-[#756B70]">
                  Pressing enter searches all <strong className="text-[#7A3E5D]">"{searchQuery}"</strong>
                </span>
                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    if (onNavigate) onNavigate('catalog');
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#7A3E5D] text-white text-xs font-bold hover:bg-[#8E496D] transition-all shadow-xs"
                >
                  View Catalog Results →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
