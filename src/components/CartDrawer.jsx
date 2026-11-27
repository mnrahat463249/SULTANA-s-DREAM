import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 2500;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md liquid-glass bg-white/90 backdrop-blur-2xl border-l border-white/85 text-[#201B1D] flex flex-col justify-between h-full shadow-[0_25px_60px_-15px_rgba(32,27,29,0.2),inset_0_1px_1.5px_rgba(255,255,255,1)]">
                  
                  {/* Top Header - Spatial Capsule */}
                  <div className="p-5 border-b border-white/70 flex items-center justify-between bg-white/50 backdrop-blur-md">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8E496D] to-[#7A3E5D] text-white flex items-center justify-center shadow-md border border-white/30">
                        <ShoppingBag className="w-4 h-4 text-[#FBF8F5]" />
                      </div>
                      <div>
                        <Dialog.Title className="text-base sm:text-lg font-serif font-extrabold text-[#201B1D] leading-tight">
                          Haute Bag
                        </Dialog.Title>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-[#756B70] font-sans font-medium">
                          Selected Pieces
                        </span>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#7A3E5D]/10 text-[#7A3E5D] font-bold font-mono border border-[#7A3E5D]/20 ml-1">
                        {cartItems.length}
                      </span>
                    </div>
                    <button
                      onClick={onClose}
                      aria-label="Close cart"
                      className="w-9 h-9 flex items-center justify-center rounded-full text-[#756B70] hover:text-[#201B1D] hover:bg-black/5 active:scale-95 transition-all glossy-pill"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Free Shipping Progress Indicator (Glossy Meter) */}
                  <div className="px-5 py-3.5 bg-white/60 border-b border-white/60 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-xs text-[#201B1D] mb-2 font-sans">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-[#7A3E5D] shrink-0 animate-pulse" />
                        {isFreeShipping ? (
                          <span className="text-[#2F7D5A] font-bold">✓ Complimentary Dhaka Delivery Unlocked</span>
                        ) : (
                          <span>
                            Add <strong className="text-[#7A3E5D] font-bold">৳{(freeShippingThreshold - subtotal).toLocaleString('en-US')}</strong> for Complimentary Delivery
                          </span>
                        )}
                      </span>
                      <span className="text-[#756B70] text-[10px] font-bold font-mono">{Math.round(progressToFreeShipping)}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200/70 rounded-full overflow-hidden p-0.5 border border-white/60">
                      <div
                        className="h-full bg-gradient-to-r from-[#8E496D] to-[#D8A7B1] transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(216,167,177,0.7)]"
                        style={{ width: `${progressToFreeShipping}%` }}
                      />
                    </div>
                  </div>

                  {/* Cart Items List */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                        <div className="w-20 h-20 rounded-full liquid-glass flex items-center justify-center text-[#756B70] shadow-sm border border-white/80">
                          <ShoppingBag className="w-9 h-9 stroke-[1.2] text-[#7A3E5D]" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-base font-serif font-bold text-[#201B1D]">Your Bag is Empty</h4>
                          <p className="text-xs text-[#756B70] max-w-xs leading-relaxed font-light font-sans">
                            Explore our hand-woven Sonargaon Jamdani sarees, muslin anarkalis, and tested filigree pieces.
                          </p>
                        </div>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div
                          key={`${item.id}-${item.color}`}
                          className="flex gap-3.5 p-3 rounded-2xl liquid-glass-subtle border border-white/80 shadow-[0_8px_20px_-6px_rgba(32,27,29,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all hover:border-white"
                        >
                          <img
                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=300&auto=format&fit=crop'}
                            alt={item.title}
                            className="w-20 h-24 rounded-xl object-cover border border-white/60 flex-shrink-0 product-floor-shadow"
                          />

                          <div className="flex-1 flex flex-col justify-between py-0.5">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#201B1D] line-clamp-1">
                                  {item.title}
                                </h4>
                                <button
                                  onClick={() => onRemoveItem(item.id, item.color)}
                                  className="text-[#756B70] hover:text-[#C54B4B] p-1 rounded-full hover:bg-black/5 active:scale-90 transition-transform"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <span className="text-[11px] text-[#756B70] block mt-0.5 font-sans">
                                {item.color ? `${item.color} • ` : ''}{item.category || 'Haute Couture'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/60">
                              <span className="text-xs sm:text-sm font-bold text-[#201B1D] font-sans font-tabular">
                                ৳{Number(item.price * item.quantity).toLocaleString('en-US')}
                              </span>

                              <div className="flex items-center border border-white/80 rounded-full bg-white/80 shadow-xs p-0.5">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.color, item.quantity - 1)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#201B1D] hover:bg-neutral-100 active:scale-90 transition-all"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center text-xs font-bold font-sans font-tabular">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, item.color, item.quantity + 1)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#201B1D] hover:bg-neutral-100 active:scale-90 transition-all"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Bottom Checkout Actions (Floating Spatial Card Footer) */}
                  {cartItems.length > 0 && (
                    <div className="p-5 border-t border-white/80 bg-white/75 backdrop-blur-xl space-y-3 shadow-[0_-15px_30px_rgba(32,27,29,0.04),inset_0_1px_1.5px_rgba(255,255,255,1)]">
                      <div className="space-y-1.5 text-xs text-[#756B70] font-sans">
                        <div className="flex justify-between">
                          <span>Estimated Subtotal:</span>
                          <span className="font-bold text-[#201B1D] font-tabular">৳{subtotal.toLocaleString('en-US')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dhaka White-Glove Delivery:</span>
                          <span className="font-bold text-[#201B1D]">{isFreeShipping ? 'FREE' : '৳60'}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-[#201B1D] pt-2 border-t border-white/60">
                          <span>Grand Total:</span>
                          <span className="text-[#101010] font-serif font-black text-lg font-tabular">
                            ৳{(subtotal + (isFreeShipping ? 0 : 60)).toLocaleString('en-US')}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onCheckout();
                        }}
                        className="w-full h-12 rounded-full glossy-button-primary text-white text-xs font-bold uppercase tracking-[0.18em] flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                      >
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4 text-[#D8A7B1]" />
                      </button>

                      <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#756B70] text-center font-sans pt-1">
                        <ShieldCheck className="w-3 h-3 text-[#2F7D5A]" />
                        <span>Tamper-Evident Bagging • Cash on Delivery &amp; Cards</span>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
