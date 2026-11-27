import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, HelpCircle, Truck, X, Minus, Plus, 
  Bookmark, Tag, CheckCircle2, Shield, Lock, 
  ArrowRight, Smartphone, Wallet, Info, Sparkles
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function ShoppingBagView({ 
  onBackToStore, 
  onGoToCheckout, 
  onNavigate 
}) {
  // State for Sultana's Dream bag items
  const [items, setItems] = useState([
    {
      id: 'bag-1',
      product_id: 'prod_01',
      title: 'Nocturne Jamdani Pure Mulberry Silk Saree',
      collection: "SULTANA'S DREAM",
      size: 'Unstitched (6.5 Yards)',
      color: 'Obsidian Midnight',
      price: 14500,
      originalPrice: 18500,
      badge: 'Heritage Piece',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
      quantity: 1,
      saved: false
    },
    {
      id: 'bag-2',
      product_id: 'prod_02',
      title: 'Rosewater Muslin Kalidar Anarkali Set',
      collection: 'FESTIVE COLLECTION',
      size: 'M',
      color: 'Rosewater Blush',
      price: 8950,
      originalPrice: 11200,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop',
      quantity: 1,
      saved: false
    }
  ]);

  const [promoCode, setPromoCode] = useState('SULTANA20');
  const [promoApplied, setPromoApplied] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [calcData, setCalcData] = useState({
    subtotal: 23450,
    discount_amount: 4690,
    shipping_fee: 0,
    total: 18760,
    free_shipping_threshold: 2500,
    amount_to_free_shipping: 0,
    coupon_applied: true
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Re-calculate cart via backend server
  useEffect(() => {
    let isMounted = true;
    const active = items.filter(it => !it.saved);
    apiService.calculateCart({
      items: active.map(it => ({ id: it.product_id || it.id, price: it.price, quantity: it.quantity, title: it.title })),
      coupon_code: promoApplied ? promoCode : '',
      division: 'Dhaka'
    }).then(res => {
      if (isMounted && res) {
        setCalcData(res);
      }
    }).catch(err => console.warn('Server cart calculation fallback:', err));

    return () => { isMounted = false; };
  }, [items, promoApplied, promoCode]);

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id, title) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    triggerToast(`Removed "${title}" from bag`);
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    const active = items.filter(it => !it.saved);
    try {
      const res = await apiService.calculateCart({
        items: active.map(it => ({ id: it.product_id || it.id, price: it.price, quantity: it.quantity })),
        coupon_code: cleanCode,
        division: 'Dhaka'
      });
      if (res.coupon_applied) {
        setPromoApplied(true);
        setCalcData(res);
        triggerToast(res.coupon_message || `Code ${cleanCode} verified: 20% discount applied!`);
      } else {
        triggerToast(res.coupon_message || 'Invalid promotional voucher.');
      }
    } catch {
      if (cleanCode === 'SULTANA20') {
        setPromoApplied(true);
        triggerToast('Code SULTANA20 applied: 20% discount unlocked!');
      } else {
        triggerToast('Invalid promotional code. Try SULTANA20.');
      }
    }
  };

  // Cross-Sell Recommendations (Section 08)
  const addOns = [
    {
      id: 'addon-1',
      title: 'Scalloped Mukaish Work Organza Dupatta',
      category: 'ACCESSORY',
      price: 2400,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: 'addon-2',
      title: 'Handcrafted Filigree Polki Choker',
      category: 'JEWELRY',
      price: 5400,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop'
    }
  ];

  const handleAddOn = (addon) => {
    setItems((prev) => [
      ...prev,
      {
        id: `bag-addon-${Date.now()}`,
        product_id: addon.id,
        title: addon.title,
        collection: addon.category,
        size: 'Standard',
        color: 'Artisan Finish',
        price: addon.price,
        image: addon.image,
        quantity: 1,
        saved: false
      }
    ]);
    triggerToast(`Added ${addon.title} to your bag`);
  };

  const activeItems = items.filter((item) => !item.saved);
  const subtotal = calcData.subtotal || activeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = calcData.discount_amount || (promoApplied ? Math.round(subtotal * 0.20) : 0);
  const shippingThreshold = calcData.free_shipping_threshold || 2500;
  const isFreeShipping = (calcData.shipping_fee === 0) || (subtotal >= shippingThreshold) || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : (calcData.shipping_fee || 60);
  const tax = subtotal > 0 ? Math.round((subtotal - discount) * 0.05) : 0;
  const grandTotal = calcData.total ? (calcData.total + tax) : Math.max(0, subtotal - discount + shippingFee + tax);

  return (
    <div className="min-h-screen bg-[#FBF8F5] text-[#201B1D] font-sans antialiased selection:bg-[#7A3E5D]/20 selection:text-[#7A3E5D]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#201B1D] text-white px-5 py-2.5 rounded-full text-xs font-sans shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#2F7D5A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FBF8F5]/95 backdrop-blur-md border-b border-[#E8DFE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-2 text-xs font-bold text-[#756B70] hover:text-[#201B1D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>

          <div className="flex flex-col items-center">
            <span className="font-serif font-extrabold text-base tracking-wide uppercase text-[#201B1D]">
              SULTANA'S DREAM
            </span>
            <span className="text-[10px] text-[#756B70] font-sans font-semibold">
              Shopping Bag ({activeItems.length} Pieces)
            </span>
          </div>

          <button
            onClick={() => alert('Direct Concierge: +880 1712-345678 (Available 24/7)')}
            className="text-xs text-[#7A3E5D] font-bold hover:underline"
          >
            Need Help?
          </button>
        </div>
      </header>

      {/* Main 2-Column Responsive Layout (Section 08) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Items List & Free Shipping Meter (8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Free Shipping Progress Indicator (Section 08) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8DFE2] shadow-sm space-y-2.5">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="flex items-center gap-2 font-bold text-[#201B1D]">
                  <Truck className="w-4 h-4 text-[#7A3E5D]" />
                  {isFreeShipping 
                    ? "✓ Complimentary White-Glove Delivery in Dhaka Unlocked!"
                    : `Add ৳${(shippingThreshold - subtotal).toLocaleString('en-US')} more to unlock Free Delivery in Dhaka`}
                </span>
                <span className="font-bold text-[#7A3E5D]">
                  ৳{subtotal.toLocaleString('en-US')} / ৳{shippingThreshold.toLocaleString('en-US')}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E8DFE2] overflow-hidden">
                <div 
                  className="h-full bg-[#7A3E5D] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                />
              </div>
            </div>

            {/* Bag Item Rows */}
            <div className="space-y-4">
              {activeItems.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 rounded-2xl bg-white border border-[#E8DFE2] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl object-cover border border-[#E8DFE2] shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#7A3E5D]">
                        {item.collection}
                      </span>
                      <h3 className="font-serif font-bold text-base text-[#201B1D] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#756B70]">
                        Format: <strong className="text-[#201B1D]">{item.size}</strong> • {item.color}
                      </p>
                      <div className="flex items-baseline gap-2 pt-1 font-sans">
                        <span className="text-base font-bold text-[#201B1D]">
                          ৳{(item.price * item.quantity).toLocaleString('en-US')}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-xs text-[#756B70]">
                            (৳{item.price.toLocaleString('en-US')} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8DFE2]">
                    <div className="flex items-center border border-[#E8DFE2] rounded-full bg-[#FBF8F5] p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-full bg-white text-[#201B1D] hover:bg-neutral-100 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold font-sans">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-full bg-white text-[#201B1D] hover:bg-neutral-100 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id, item.title)}
                      className="text-xs text-[#C54B4B] hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {activeItems.length === 0 && (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#E8DFE2] space-y-4">
                  <p className="text-sm text-[#756B70]">Your shopping bag is currently empty.</p>
                  <button
                    onClick={onBackToStore}
                    className="h-11 px-6 rounded-full bg-[#7A3E5D] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Explore Handloom Catalog
                  </button>
                </div>
              )}
            </div>

            {/* Cross-Sell Recommendations (Section 08) */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8DFE2] shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7A3E5D] font-sans block">
                Complete Your Ensemble
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addOns.map((add) => (
                  <div key={add.id} className="flex items-center justify-between p-3 rounded-xl bg-[#FBF8F5] border border-[#E8DFE2]">
                    <div className="flex items-center gap-3">
                      <img src={add.image} alt={add.title} className="w-14 h-14 object-cover rounded-lg" />
                      <div>
                        <h4 className="font-serif font-bold text-xs text-[#201B1D]">{add.title}</h4>
                        <span className="text-xs text-[#7A3E5D] font-bold font-sans">৳{add.price.toLocaleString('en-US')}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddOn(add)}
                      className="px-3 py-1.5 rounded-full bg-[#7A3E5D] hover:bg-[#632E48] text-white text-xs font-bold"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Card (4 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFE2] shadow-sm space-y-6">
              <h2 className="font-serif font-bold text-lg text-[#201B1D]">Order Summary</h2>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. SULTANA20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="flex-1 h-11 px-3.5 rounded-xl bg-[#FBF8F5] border border-[#E8DFE2] text-xs font-sans uppercase font-bold text-[#201B1D] focus:outline-none focus:border-[#7A3E5D]"
                />
                <button
                  type="submit"
                  className="h-11 px-4 rounded-xl bg-[#7A3E5D] hover:bg-[#632E48] text-white text-xs font-bold"
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <div className="p-2.5 rounded-xl bg-[#2F7D5A]/10 border border-[#2F7D5A]/30 text-[#2F7D5A] text-xs flex items-center justify-between font-medium">
                  <span>✓ 20% Privilege Discount Applied</span>
                  <button onClick={() => setPromoApplied(false)} className="text-[10px] underline">Remove</button>
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-2.5 text-xs text-[#756B70] border-t border-[#E8DFE2] pt-4 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#201B1D]">৳{subtotal.toLocaleString('en-US')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2F7D5A]">
                    <span>Privilege Promo (20%):</span>
                    <span className="font-bold">-৳{discount.toLocaleString('en-US')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Dhaka Delivery:</span>
                  <span className="font-bold text-[#201B1D]">
                    {isFreeShipping ? 'FREE (Over ৳2,500)' : `৳${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated VAT (5%):</span>
                  <span className="font-bold text-[#201B1D]">৳{tax.toLocaleString('en-US')}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#201B1D] pt-3 border-t border-[#E8DFE2]">
                  <span>Total Amount:</span>
                  <span className="text-[#7A3E5D] font-serif font-black text-xl">৳{grandTotal.toLocaleString('en-US')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onGoToCheckout}
                disabled={activeItems.length === 0}
                className="w-full h-13 rounded-full bg-[#7A3E5D] hover:bg-[#632E48] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#7A3E5D]/25 active:scale-98 transition-all disabled:opacity-50"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Indicators */}
              <div className="pt-2 text-[11px] text-[#756B70] space-y-1.5 text-center">
                <p>✓ Supported: Cash on Delivery, bKash, Nagad, Visa &amp; Mastercard</p>
                <p>✓ Guaranteed 7-Day Doorstep Exchange Policy</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
