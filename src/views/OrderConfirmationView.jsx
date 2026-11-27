import React, { useState } from 'react';
import {
  X,
  Check,
  Copy,
  Truck,
  CheckCircle2,
  ExternalLink,
  Calendar,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Download,
  RotateCcw,
  MessageSquare,
  PhoneCall,
  ArrowRight,
  MapPin,
  ChevronRight,
  Package,
  Clock,
  Heart
} from 'lucide-react';

export default function OrderConfirmationView({
  orderData = {
    orderId: 'SD-10254',
    client: 'Ayesha Rahman',
    email: 'ayesha.rahman@gmail.com',
    phone: '+880 1712-345678',
    division: 'Dhaka',
    address: 'House 42, Road 11, Block D, Banani, Dhaka-1213',
    items: [
      {
        id: 'prod_01',
        title: 'Nocturne Jamdani Pure Mulberry Silk Saree',
        size: 'Unstitched (6.5 Yards)',
        price: 14500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop'
      }
    ],
    subtotal: 14500,
    shippingFee: 0,
    discountAmount: 2900,
    couponCode: 'SULTANA20',
    total: 11600,
    paymentMethod: 'bKash Online Gateway (TrxID: BK9X274LAQ)',
    orderStatus: 'Confirmed',
    createdAt: '2026-09-08T20:15:00Z',
    estimatedDelivery: 'Sep 10 – Sep 12, 2026 (2–4 Business Days)'
  },
  onBackToStore,
  onGoToTracking,
  onGoToReturns,
  onExploreCatalog
}) {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`#${orderData.orderId || 'SD-10254'}`);
    setCopied(true);
    showToast(`Order #${orderData.orderId || 'SD-10254'} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadInvoice = () => {
    showToast(`Downloading official Tax Invoice for #${orderData.orderId || 'SD-10254'}...`);
  };

  const formatTaka = (amount) => {
    return '৳' + Number(amount || 0).toLocaleString('en-BD');
  };

  const items = orderData.items || [
    {
      id: 'prod_01',
      title: 'Nocturne Jamdani Pure Mulberry Silk Saree',
      size: 'Unstitched (6.5 Yards)',
      price: 14500,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div className="bg-[#FBF8F5] text-[#201B1D] min-h-screen pb-28 selection:bg-[#7A3E5D] selection:text-white">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#201B1D] text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-[#7A3E5D]/40 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#D8A7B1]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E8DFE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBackToStore}
            aria-label="Return to Storefront"
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#756B70] hover:text-[#201B1D] hover:bg-[#FBF8F5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-lg tracking-wide text-[#7A3E5D] uppercase font-serif font-black">
              Sultana's Dream
            </span>
          </div>

          <button
            onClick={() => showToast('Opening VIP WhatsApp Helpline (+880 1712-345678)...')}
            className="h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-semibold text-[#7A3E5D] bg-[#FBF8F5] border border-[#E8DFE2] hover:bg-[#E8DFE2]/40 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#7A3E5D]" />
            <span className="hidden sm:inline">Concierge</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
        {/* Hero Confirmation Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFE2] shadow-sm text-center flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7A3E5D] via-[#D8A7B1] to-[#7A3E5D]" />

          {/* Animated Success Badge */}
          <div className="w-16 h-16 rounded-full bg-[#7A3E5D] text-white flex items-center justify-center shadow-lg shadow-[#7A3E5D]/20 mb-4 animate-bounce">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#7A3E5D] mb-1">
            Order Confirmed & Payment Verified
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#201B1D] tracking-tight">
            Thank you, {orderData.client || 'Valued Patron'}!
          </h1>
          <p className="text-sm text-[#756B70] mt-2 max-w-lg mx-auto">
            Your haute couture order has been placed successfully. A confirmation message and digital receipt have been dispatched to <strong className="text-[#201B1D]">{orderData.email || 'your email'}</strong>.
          </p>

          {/* Order ID Pill */}
          <div className="mt-5 inline-flex items-center gap-2.5 px-4 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-full">
            <span className="text-xs font-medium text-[#756B70]">Order Reference:</span>
            <span className="font-mono text-sm font-bold text-[#7A3E5D]">#{orderData.orderId || 'SD-10254'}</span>
            <button
              onClick={handleCopy}
              className="p-1 text-[#756B70] hover:text-[#7A3E5D] transition-colors"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-8 pt-6 border-t border-[#E8DFE2]">
            <div className="p-3.5 bg-[#FBF8F5] rounded-2xl text-left border border-[#E8DFE2]/60">
              <span className="text-[11px] uppercase tracking-wider text-[#756B70] font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#7A3E5D]" /> Estimated Delivery
              </span>
              <p className="text-sm font-bold text-[#201B1D] mt-1">
                {orderData.estimatedDelivery || 'Sep 10 – Sep 12 (2–4 Days)'}
              </p>
            </div>

            <div className="p-3.5 bg-[#FBF8F5] rounded-2xl text-left border border-[#E8DFE2]/60">
              <span className="text-[11px] uppercase tracking-wider text-[#756B70] font-semibold flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#7A3E5D]" /> Payment Method
              </span>
              <p className="text-sm font-bold text-[#201B1D] mt-1 truncate">
                {orderData.paymentMethod || 'Cash on Delivery'}
              </p>
            </div>

            <div className="p-3.5 bg-[#FBF8F5] rounded-2xl text-left border border-[#E8DFE2]/60">
              <span className="text-[11px] uppercase tracking-wider text-[#756B70] font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7A3E5D]" /> Total Amount
              </span>
              <p className="text-sm font-bold text-[#7A3E5D] mt-1">
                {formatTaka(orderData.total || 11600)}
              </p>
            </div>
          </div>
        </section>

        {/* 5-Step Craftsmanship & Delivery Timeline */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFE2] shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8DFE2]">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#201B1D] flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#7A3E5D]" />
                Live Order Journey
              </h2>
              <p className="text-xs text-[#756B70] mt-0.5">
                Tracked via Steadfast Courier & Sultana's Dream Atelier Dispatch
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
              On Schedule
            </span>
          </div>

          <div className="relative pl-6 space-y-7 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8DFE2]">
            {/* Step 1: Order Placed */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#7A3E5D] text-white flex items-center justify-center ring-4 ring-[#FBF8F5]">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#201B1D]">Order Placed & Verified</h3>
                <p className="text-xs text-[#756B70] mt-0.5">Order confirmed into the Sultana's Dream ERP system.</p>
                <span className="text-[10px] text-[#756B70] font-mono mt-1 inline-block">Today, 20:15 BST</span>
              </div>
            </div>

            {/* Step 2: Quality Inspection */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#7A3E5D] text-white flex items-center justify-center ring-4 ring-[#FBF8F5]">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#201B1D]">Master Artisan Verification</h3>
                <p className="text-xs text-[#756B70] mt-0.5">Zari count & Mulberry silk weave inspected under Atelier studio lights.</p>
                <span className="text-[10px] text-[#756B70] font-mono mt-1 inline-block">Today, 20:25 BST</span>
              </div>
            </div>

            {/* Step 3: Bespoke Packaging */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#D8A7B1] text-[#7A3E5D] flex items-center justify-center ring-4 ring-[#FBF8F5] animate-pulse">
                <Sparkles className="w-3 h-3" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#7A3E5D]">Signature Satin-Lined Gift Box Packaging</h3>
                <p className="text-xs text-[#756B70] mt-0.5">Garment folded with acid-free tissue in our custom mulberry luxury box.</p>
                <span className="text-[10px] text-[#7A3E5D] font-semibold mt-1 inline-block">Current Stage — In Progress</span>
              </div>
            </div>

            {/* Step 4: Shipped */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-neutral-200 text-neutral-400 flex items-center justify-center ring-4 ring-[#FBF8F5]">
                <Truck className="w-3 h-3" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#756B70]">Courier Dispatch (Steadfast Express)</h3>
                <p className="text-xs text-[#756B70] mt-0.5">Consignment handed to delivery agent for priority dispatch to Banani, Dhaka.</p>
                <span className="text-[10px] text-[#756B70] mt-1 inline-block">Expected Sep 09</span>
              </div>
            </div>

            {/* Step 5: Delivered */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-neutral-200 text-neutral-400 flex items-center justify-center ring-4 ring-[#FBF8F5]">
                <ShieldCheck className="w-3 h-3" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#756B70]">Doorstep Delivery</h3>
                <p className="text-xs text-[#756B70] mt-0.5">White-glove handover to customer with fitting guarantee.</p>
                <span className="text-[10px] text-[#756B70] mt-1 inline-block">Expected Sep 10–12</span>
              </div>
            </div>
          </div>
        </section>

        {/* Order Items & Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Order Items */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFE2] shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#201B1D] pb-3 border-b border-[#E8DFE2]">
              Purchased Creations ({items.length})
            </h2>

            <div className="divide-y divide-[#E8DFE2]">
              {items.map((item, idx) => (
                <div key={idx} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded-xl border border-[#E8DFE2] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A3E5D] font-bold">
                      SULTANA'S DREAM COUTURE
                    </span>
                    <h3 className="text-sm font-semibold text-[#201B1D] truncate">{item.title}</h3>
                    <p className="text-xs text-[#756B70] mt-0.5">
                      Size: <span className="text-[#201B1D] font-medium">{item.size || 'Standard'}</span> • Qty: {item.quantity || 1}
                    </p>
                    <p className="text-xs font-bold text-[#7A3E5D] mt-1">
                      {formatTaka(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address & Contact Block */}
            <div className="pt-4 border-t border-[#E8DFE2] space-y-2">
              <span className="text-xs font-bold text-[#201B1D] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#7A3E5D]" /> Delivery Destination
              </span>
              <p className="text-xs text-[#756B70] leading-relaxed">
                <strong className="text-[#201B1D]">{orderData.client}</strong><br />
                {orderData.address}<br />
                Division: {orderData.division || 'Dhaka'}, Bangladesh<br />
                Contact: {orderData.phone || '+880 1712-345678'}
              </p>
            </div>
          </div>

          {/* Pricing & Actions Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFE2] shadow-sm space-y-3">
              <h2 className="text-base font-serif font-bold text-[#201B1D] pb-2 border-b border-[#E8DFE2]">
                Order Ledger
              </h2>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#756B70]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#201B1D]">{formatTaka(orderData.subtotal || 14500)}</span>
                </div>
                {orderData.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Voucher ({orderData.couponCode || 'SULTANA20'})</span>
                    <span className="font-semibold">-{formatTaka(orderData.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#756B70]">
                  <span>Standard Shipping</span>
                  <span className="font-medium text-[#201B1D]">
                    {orderData.shippingFee === 0 ? (
                      <span className="text-emerald-600 font-semibold uppercase text-[10px]">Complimentary</span>
                    ) : (
                      formatTaka(orderData.shippingFee)
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8DFE2] flex justify-between text-sm font-bold">
                  <span className="text-[#201B1D]">Total Billed</span>
                  <span className="text-[#7A3E5D]">{formatTaka(orderData.total || 11600)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <button
                  onClick={handleDownloadInvoice}
                  className="w-full py-3 bg-[#FBF8F5] text-[#7A3E5D] border border-[#E8DFE2] rounded-2xl text-xs font-bold hover:bg-[#E8DFE2]/40 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF Invoice
                </button>

                <button
                  onClick={onExploreCatalog || onBackToStore}
                  className="w-full py-3 bg-[#7A3E5D] text-white rounded-2xl text-xs font-bold hover:bg-[#68334E] transition-colors shadow-md shadow-[#7A3E5D]/20 flex items-center justify-center gap-2"
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Helpline Card */}
            <div className="bg-[#FAF4F6] rounded-3xl p-5 border border-[#D8A7B1]/40 text-xs text-[#756B70] space-y-2">
              <span className="font-bold text-[#7A3E5D] flex items-center gap-1.5 text-xs">
                <MessageSquare className="w-4 h-4" /> Need assistance with this order?
              </span>
              <p className="leading-relaxed">
                Our bespoke styling team is on standby. Reach out anytime with your reference number <strong className="text-[#201B1D]">#{orderData.orderId || 'SD-10254'}</strong>.
              </p>
              <div className="pt-1 flex items-center gap-3 text-[#7A3E5D] font-bold">
                <a href="tel:+8801712345678" className="hover:underline flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" /> +880 1712-345678
                </a>
                <span>•</span>
                <a href="mailto:care@sultanasdream.com" className="hover:underline">
                  care@sultanasdream.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
