import React from 'react';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';

export default function MobileBottomNav({
  currentView,
  onNavigate,
  cartCount = 0,
  wishlistCount = 0,
  onOpenSearch
}) {
  const isHome = currentView === 'storefront';
  const isCatalog = currentView === 'catalog';
  const isBag = currentView === 'bag';
  const isAccount = currentView === 'account';

  return (
    <nav 
      aria-label="Mobile Bottom Navigation" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-xl border-t border-[#E8DFE2] px-3 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => onNavigate('storefront')}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-medium transition-colors ${
            isHome ? 'text-[#7A3E5D] font-bold' : 'text-[#756B70] hover:text-[#201B1D]'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${isHome ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span>Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => onNavigate('catalog')}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-medium transition-colors ${
            isCatalog ? 'text-[#7A3E5D] font-bold' : 'text-[#756B70] hover:text-[#201B1D]'
          }`}
        >
          <ShoppingBag className={`w-5 h-5 mb-0.5 ${isCatalog ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span>Shop</span>
        </button>

        {/* Search */}
        <button
          onClick={() => onOpenSearch ? onOpenSearch() : onNavigate('catalog')}
          className="flex flex-col items-center py-1 px-3 text-[10px] font-medium text-[#756B70] hover:text-[#201B1D] transition-colors"
        >
          <Search className="w-5 h-5 mb-0.5 stroke-2" />
          <span>Search</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => onNavigate('account')}
          className="flex flex-col items-center py-1 px-3 text-[10px] font-medium text-[#756B70] hover:text-[#201B1D] transition-colors relative"
        >
          <Heart className="w-5 h-5 mb-0.5 stroke-2" />
          <span>Wishlist</span>
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-2 w-3.5 h-3.5 rounded-full bg-[#7A3E5D] text-white text-[9px] font-black flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Account */}
        <button
          onClick={() => onNavigate('account')}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-medium transition-colors ${
            isAccount ? 'text-[#7A3E5D] font-bold' : 'text-[#756B70] hover:text-[#201B1D]'
          }`}
        >
          <User className={`w-5 h-5 mb-0.5 ${isAccount ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span>Account</span>
        </button>
      </div>
    </nav>
  );
}
