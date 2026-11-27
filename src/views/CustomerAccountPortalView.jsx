import React, { useState } from 'react';
import { 
  ShoppingBag, ShieldCheck, Scissors, Sparkles, Truck, 
  ChevronRight, Package, MapPin, CreditCard, Heart, Ruler, 
  MessageSquare, Calendar, Download, Check, ArrowRight,
  LogOut, Star, Clock, PhoneCall, Tag, User, Home
} from 'lucide-react';

export default function CustomerAccountPortalView({
  onGoToStorefront,
  onGoToCatalog,
  onGoToBag,
  onGoToTracking,
  onGoToWardrobe,
  onGoToFitConfirmation,
  onGoToFittings,
  onSignOut
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'wishlist' | 'addresses' | 'measurements' | 'coupons'
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const customer = {
    name: 'Ayesha Rahman',
    email: 'ayesha.rahman@gmail.com',
    phone: '+880 1712-345678',
    memberId: 'SD-PATRON-104',
    tier: 'Gold Guild Patron',
    points: '1,450 SD Points',
    joined: 'October 2024'
  };

  const orders = [
    {
      id: 'SD-10254',
      date: 'Sep 08, 2026',
      total: 11600,
      status: 'In Preparation',
      statusColor: 'bg-[#FAF4F6] text-[#7A3E5D] border-[#D8A7B1]',
      itemsCount: 1,
      paymentMethod: 'bKash Online Gateway',
      items: [
        {
          title: 'Nocturne Jamdani Pure Mulberry Silk Saree',
          size: 'Unstitched (6.5 Yards)',
          price: 14500,
          image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop'
        }
      ]
    },
    {
      id: 'SD-10189',
      date: 'Aug 14, 2026',
      total: 8950,
      status: 'Delivered',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      itemsCount: 1,
      paymentMethod: 'Cash on Delivery',
      items: [
        {
          title: 'Rosewater Muslin Kalidar Anarkali Set',
          size: 'M (Tailored)',
          price: 8950,
          image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop'
        }
      ]
    }
  ];

  const wishlistItems = [
    {
      id: 'prod_03',
      title: 'Zari Embroidered Royale Velvet Shawl',
      category: 'Dupattas & Shawls',
      price: 6800,
      original_price: 8500,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
      inStock: true
    },
    {
      id: 'prod_04',
      title: 'Chanderi Silk Flared Kurti & Trousers Co-ord',
      category: 'Co-ord Sets',
      price: 4850,
      original_price: 5800,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop',
      inStock: true
    }
  ];

  const formatTaka = (num) => '৳' + Number(num || 0).toLocaleString('en-BD');

  return (
    <div className="min-h-screen bg-[#FBF8F5] text-[#201B1D] font-sans antialiased flex flex-col justify-between pb-28 selection:bg-[#7A3E5D] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#201B1D] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl border border-[#7A3E5D]/50 flex items-center gap-2 animate-bounce">
          <ShieldCheck className="w-4 h-4 text-[#D8A7B1]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Linear Top App Header */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E8DFE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onGoToStorefront}
            className="flex items-center gap-2 text-[#756B70] hover:text-[#201B1D] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-xs font-semibold">Storefront</span>
          </button>

          {/* Centered Brand */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg font-serif font-black tracking-wide text-[#7A3E5D] uppercase">
              Sultana's Dream
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#756B70] font-semibold">
              Patron Portal
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={onGoToBag}
              aria-label="Shopping Bag" 
              className="w-9 h-9 flex items-center justify-center text-[#201B1D] hover:bg-[#FBF8F5] rounded-full active:scale-95 transition-transform relative"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#7A3E5D]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile Card & Quick Nav */}
          <div className="lg:col-span-4 space-y-6">
            {/* User Profile Card */}
            <div className="bg-white border border-[#E8DFE2] rounded-3xl p-6 shadow-xs relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-[#7A3E5D] text-white font-serif font-bold text-lg flex items-center justify-center shadow-md shadow-[#7A3E5D]/20">
                  AR
                </div>
                <div>
                  <h1 className="text-base font-bold text-[#201B1D]">{customer.name}</h1>
                  <p className="text-xs text-[#756B70]">{customer.email}</p>
                  <p className="text-xs text-[#756B70]">{customer.phone}</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF4F6] border border-[#D8A7B1] text-[11px] font-bold text-[#7A3E5D]">
                    <Sparkles className="w-3 h-3" />
                    {customer.tier}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DFE2] grid grid-cols-2 gap-3 text-center">
                <div className="p-2.5 bg-[#FBF8F5] rounded-2xl border border-[#E8DFE2]/60">
                  <span className="text-[10px] uppercase tracking-wider text-[#756B70] font-semibold">Rewards</span>
                  <p className="text-xs font-bold text-[#7A3E5D] mt-0.5">{customer.points}</p>
                </div>
                <div className="p-2.5 bg-[#FBF8F5] rounded-2xl border border-[#E8DFE2]/60">
                  <span className="text-[10px] uppercase tracking-wider text-[#756B70] font-semibold">Member Since</span>
                  <p className="text-xs font-bold text-[#201B1D] mt-0.5">{customer.joined}</p>
                </div>
              </div>
            </div>

            {/* Sidebar Navigation Tabs */}
            <nav className="bg-white border border-[#E8DFE2] rounded-3xl p-2 shadow-xs space-y-1">
              {[
                { id: 'orders', label: 'My Orders & Tracking', icon: Package, badge: orders.length },
                { id: 'wishlist', label: 'Wishlist & Saved Items', icon: Heart, badge: wishlistItems.length },
                { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
                { id: 'measurements', label: 'Bespoke Fit Profile', icon: Scissors },
                { id: 'coupons', label: 'Vouchers & Privileges', icon: Tag, badge: '1 Active' }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#7A3E5D] text-white shadow-sm'
                        : 'text-[#201B1D] hover:bg-[#FBF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#756B70]'}`} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#FAF4F6] text-[#7A3E5D]'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-2 mt-2 border-t border-[#E8DFE2]">
                <button
                  onClick={onSignOut || (() => triggerToast('Signed out of patron account.'))}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Right Column: Active Tab Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-serif font-bold text-[#201B1D]">Order History</h2>
                  <span className="text-xs text-[#756B70]">{orders.length} Orders Recorded</span>
                </div>

                {orders.map((order) => (
                  <div key={order.id} className="bg-white border border-[#E8DFE2] rounded-3xl p-6 shadow-xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8DFE2]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#7A3E5D]">#{order.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </div>
                        <span className="text-xs text-[#756B70] mt-0.5 block">Placed on {order.date}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-serif font-bold text-[#7A3E5D]">{formatTaka(order.total)}</span>
                        <span className="text-[11px] text-[#756B70] block">{order.paymentMethod}</span>
                      </div>
                    </div>

                    {/* Items in order */}
                    <div className="space-y-3">
                      {order.items.map((it, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <img
                            src={it.image}
                            alt={it.title}
                            className="w-14 h-16 object-cover rounded-xl border border-[#E8DFE2]"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-[#201B1D] truncate">{it.title}</h4>
                            <p className="text-[11px] text-[#756B70]">Size: {it.size}</p>
                            <p className="text-xs font-semibold text-[#7A3E5D]">{formatTaka(it.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Action Footer */}
                    <div className="pt-3 border-t border-[#E8DFE2] flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => triggerToast(`Downloading digital receipt for #${order.id}...`)}
                        className="text-xs font-semibold text-[#756B70] hover:text-[#201B1D] flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Receipt
                      </button>

                      <div className="flex items-center gap-2">
                        {order.status === 'In Preparation' && (
                          <button
                            onClick={onGoToTracking}
                            className="px-4 py-2 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E] transition-colors flex items-center gap-1.5"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            Live Tracking
                          </button>
                        )}
                        <button
                          onClick={() => triggerToast(`Added items from #${order.id} to cart!`)}
                          className="px-4 py-2 bg-[#FBF8F5] border border-[#E8DFE2] text-[#201B1D] rounded-xl text-xs font-semibold hover:bg-[#E8DFE2]/40 transition-colors"
                        >
                          Re-Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#201B1D]">My Curated Wishlist</h2>
                    <p className="text-xs text-[#756B70]">{wishlistItems.length} handcrafted pieces saved</p>
                  </div>
                  <button
                    onClick={() => triggerToast('All items added to shopping bag!')}
                    className="px-4 py-2 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E] transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add All to Cart
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="bg-white border border-[#E8DFE2] rounded-3xl p-4 shadow-xs flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#FAF4F6]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#7A3E5D] uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h3 className="text-xs font-bold text-[#201B1D] mt-0.5 line-clamp-1">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-[#7A3E5D]">{formatTaka(item.price)}</span>
                            {item.original_price && (
                              <span className="text-[11px] text-[#756B70] line-through">
                                {formatTaka(item.original_price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E8DFE2] flex items-center gap-2">
                        <button
                          onClick={() => triggerToast(`Added "${item.title}" to bag!`)}
                          className="flex-1 py-2 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E] transition-colors"
                        >
                          Add to Bag
                        </button>
                        <button
                          onClick={() => triggerToast('Removed from wishlist')}
                          className="p-2 border border-[#E8DFE2] rounded-xl text-[#756B70] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-serif font-bold text-[#201B1D]">Delivery Addresses</h2>
                  <button
                    onClick={() => triggerToast('New address form opened.')}
                    className="px-4 py-2 bg-[#FBF8F5] border border-[#E8DFE2] text-[#7A3E5D] rounded-xl text-xs font-bold hover:bg-[#E8DFE2]/40 transition-colors"
                  >
                    + Add New Address
                  </button>
                </div>

                <div className="bg-white border-2 border-[#7A3E5D] rounded-3xl p-6 shadow-xs relative">
                  <div className="absolute top-5 right-5">
                    <span className="px-2.5 py-1 bg-[#FAF4F6] border border-[#D8A7B1] text-[#7A3E5D] text-[10px] font-bold rounded-full uppercase">
                      Default Shipping Address
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#7A3E5D] uppercase tracking-wider block mb-1">
                    Residence (Banani)
                  </span>
                  <h3 className="text-sm font-bold text-[#201B1D]">Ayesha Rahman</h3>
                  <p className="text-xs text-[#756B70] mt-1 leading-relaxed">
                    House 42, Road 11, Block D<br />
                    Banani, Dhaka-1213<br />
                    Division: Dhaka, Bangladesh<br />
                    Phone: +880 1712-345678
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#E8DFE2] flex items-center gap-3 text-xs font-semibold text-[#7A3E5D]">
                    <button onClick={() => triggerToast('Address editor opened.')} className="hover:underline">
                      Edit Address
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bespoke Fit Profile Tab */}
            {activeTab === 'measurements' && (
              <div className="bg-white border border-[#E8DFE2] rounded-3xl p-6 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#201B1D] flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-[#7A3E5D]" />
                    Atelier Bespoke Fitting Profile
                  </h2>
                  <p className="text-xs text-[#756B70] mt-1">
                    Saved custom dimensions utilized automatically by master cut-and-sew artisans.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Blouse Bust', val: '36 in' },
                    { label: 'Underbust', val: '30 in' },
                    { label: 'Waist', val: '28 in' },
                    { label: 'Hip', val: '38 in' },
                    { label: 'Shoulder', val: '14.5 in' },
                    { label: 'Armhole', val: '15 in' },
                    { label: 'Blouse Length', val: '14 in' },
                    { label: 'Saree Fall & Pico', val: 'Complimentary' }
                  ].map((m, idx) => (
                    <div key={idx} className="p-3 bg-[#FBF8F5] rounded-2xl border border-[#E8DFE2]/60">
                      <span className="text-[10px] text-[#756B70] uppercase font-semibold block">{m.label}</span>
                      <span className="text-xs font-bold text-[#201B1D] mt-0.5 block">{m.val}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#FAF4F6] rounded-2xl border border-[#D8A7B1]/50 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#7A3E5D]">Master Tailor Video Consult</span>
                    <p className="text-[11px] text-[#756B70]">Book a 15-minute 1-on-1 virtual measurement session with our head couturier.</p>
                  </div>
                  <button
                    onClick={onGoToFittings}
                    className="px-4 py-2 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E] transition-colors flex-shrink-0"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            )}

            {/* Coupons & Privileges Tab */}
            {activeTab === 'coupons' && (
              <div className="space-y-4">
                <h2 className="text-lg font-serif font-bold text-[#201B1D]">Patron Privileges & Vouchers</h2>
                
                <div className="bg-gradient-to-br from-[#7A3E5D] to-[#4F253A] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#D8A7B1]">
                        Gold Guild Voucher
                      </span>
                      <h3 className="text-2xl font-serif font-bold mt-1">20% Off Festive Haul</h3>
                      <p className="text-xs text-white/80 mt-1">Valid across Jamdani, Muslin, and Couture Collections.</p>
                      <span className="inline-block font-mono text-xs font-bold bg-white/20 px-3 py-1 rounded-full mt-3 border border-white/30">
                        Code: SULTANA20
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('SULTANA20');
                        triggerToast('Coupon code "SULTANA20" copied!');
                      }}
                      className="px-5 py-2.5 bg-white text-[#7A3E5D] rounded-xl text-xs font-bold hover:bg-[#FBF8F5] transition-colors self-start sm:self-auto"
                    >
                      Copy Code
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
