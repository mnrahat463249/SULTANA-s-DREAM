import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  X, ChevronRight, Sparkles, ShieldCheck, Truck, 
  RotateCcw, Heart, ShoppingBag, User, Crown, Compass 
} from 'lucide-react';
import { CATEGORIES } from '../data/mockProducts';
import { apiService } from '../services/apiService';

export default function MobileMenuDrawer({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  onNavigate
}) {
  const handleCategoryClick = (cat) => {
    if (onSelectCategory) onSelectCategory(cat);
    if (onNavigate) onNavigate('catalog');
    else window.location.hash = '#shop/catalog';
    onClose();
  };

  const handleLinkClick = (page) => {
    if (onNavigate) onNavigate(page);
    else window.location.hash = `#shop/${page}`;
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        {/* Backdrop Scrim */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-12">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xs sm:max-w-sm bg-[#FBF8F5]/98 backdrop-blur-2xl border-r border-[#E8DFE2] text-[#201B1D] flex flex-col justify-between h-full shadow-2xl">
                  {/* Top Header */}
                  <div className="p-5 border-b border-[#E8DFE2] flex items-center justify-between bg-white/70">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#7A3E5D] text-white flex items-center justify-center font-serif font-black text-sm shadow-xs">
                        S
                      </div>
                      <div>
                        <Dialog.Title className="text-base font-serif font-extrabold tracking-wider uppercase text-[#201B1D]">
                          SULTANA'S DREAM
                        </Dialog.Title>
                        <p className="text-[9px] uppercase tracking-[0.24em] text-[#756B70] font-sans font-medium">
                          Haute Atelier &amp; Living
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      aria-label="Close navigation menu"
                      className="w-10 h-10 flex items-center justify-center rounded-full text-[#756B70] hover:text-[#201B1D] hover:bg-black/5 active:scale-95 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Drawer Scrollable Content */}
                  <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                    {/* Atelier Highlight Banner */}
                    <div className="p-4 rounded-2xl bg-white/80 border border-[#D8A7B1]/60 shadow-xs space-y-1.5">
                      <div className="flex items-center gap-2 text-[#7A3E5D] text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-[#7A3E5D]" />
                        <span>Dhaka White-Glove Courier</span>
                      </div>
                      <p className="text-xs text-[#756B70] leading-relaxed">
                        Complimentary delivery on orders over ৳2,500. Same-day dispatch with 7-day doorstep exchanges.
                      </p>
                    </div>

                    {/* Curated Categories */}
                    <div>
                      <p className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#756B70] font-bold mb-2.5 px-1">
                        Curated Collections
                      </p>
                      <nav className="space-y-1">
                        {CATEGORIES.map((cat) => {
                          const isSelected = selectedCategory === cat;
                          return (
                            <button
                              key={cat}
                              onClick={() => handleCategoryClick(cat)}
                              className={`w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                                isSelected
                                  ? 'bg-[#7A3E5D] text-white shadow-xs'
                                  : 'text-[#201B1D] hover:bg-white/80 active:scale-98'
                              }`}
                            >
                              <span>{cat}</span>
                              <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#756B70]'}`} />
                            </button>
                          );
                        })}
                      </nav>
                    </div>

                    {/* Patron Quick Links */}
                    <div>
                      <p className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#756B70] font-bold mb-2.5 px-1">
                        Patron Services
                      </p>
                      <div className="space-y-1">
                        <button
                          onClick={() => handleLinkClick('account')}
                          className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#201B1D] hover:bg-white/80 active:scale-98 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <User className="w-4 h-4 text-[#7A3E5D]" />
                            <span>My Account &amp; Orders</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#756B70]" />
                        </button>

                        <button
                          onClick={() => handleLinkClick('account')}
                          className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#201B1D] hover:bg-white/80 active:scale-98 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <Heart className="w-4 h-4 text-[#C54B4B]" />
                            <span>Saved Wishlist Pieces</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#756B70]" />
                        </button>

                        <button
                          onClick={() => {
                            if (apiService.isAdminAuthenticated()) {
                              if (onNavigate) onNavigate('admin_portal');
                              else window.location.hash = '#admin/dashboard';
                            } else {
                              window.location.hash = '#admin/login';
                            }
                            onClose();
                          }}
                          className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#7A3E5D] bg-[#FAF4F6] border border-[#D8A7B1]/60 active:scale-98 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <Crown className="w-4 h-4 text-[#7A3E5D]" />
                            <span>Admin &amp; ERP Portal</span>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </button>
                      </div>
                    </div>

                    {/* Guarantees */}
                    <div className="p-3.5 rounded-2xl bg-white/60 border border-[#E8DFE2] space-y-2.5 text-[11px] text-[#756B70]">
                      <div className="flex items-center gap-2.5">
                        <Truck className="w-3.5 h-3.5 text-[#7A3E5D] shrink-0" />
                        <span>Nationwide delivery across all 64 districts</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <RotateCcw className="w-3.5 h-3.5 text-[#7A3E5D] shrink-0" />
                        <span>7-Day Doorstep Exchange Policy</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#7A3E5D] shrink-0" />
                        <span>100% Authentic Heirloom Handloom Guaranteed</span>
                      </div>
                    </div>
                  </div>

                  {/* Drawer Footer */}
                  <div className="p-4 border-t border-[#E8DFE2] bg-white/60">
                    <div className="flex items-center justify-between text-xs text-[#756B70]">
                      <span className="font-serif italic">Crafted with Heritage</span>
                      <span className="font-mono text-[#7A3E5D] font-bold">BDT (৳)</span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
