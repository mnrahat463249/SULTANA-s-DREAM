import React, { useState } from 'react';
import { 
  ArrowLeft, Headphones, Check, RotateCcw, Clock, 
  MapPin, CreditCard, ChevronDown, ShieldCheck, ArrowRight,
  Sparkles, RefreshCw, Box, Truck
} from 'lucide-react';

export default function ReturnsExchangesView({ onBackToStore, onConfirmReservation }) {
  // Item 1 State (Blazer)
  const [blazerIntent, setBlazerIntent] = useState('exchange'); // 'exchange' | 'return'
  const [selectedBlazerSize, setSelectedBlazerSize] = useState('40');

  // Item 2 State (Trousers)
  const [trousersIntent, setTrousersIntent] = useState('return'); // 'exchange' | 'return'
  const [trousersConditionChecked, setTrousersConditionChecked] = useState(true);

  // Item 3 State (Tote)
  const [toteSelected, setToteSelected] = useState(false);

  // Method State
  const [selectedMethod, setSelectedMethod] = useState('courier'); // 'courier' | 'boutique' | 'qr'

  // Refund Destination
  const [refundDestination, setRefundDestination] = useState('card'); // 'card' | 'credit'

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#151b2d] flex justify-center selection:bg-[#4b41e1]/20 selection:text-[#4b41e1] pb-24 lg:pb-16">
      <div className="w-full max-w-6xl mx-auto min-h-screen flex flex-col bg-white shadow-xl relative sm:border-x sm:border-[#c6c6cd]/30">
        {/* Task-Focused Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 sm:px-8 h-16 flex items-center justify-between border-b border-[#c6c6cd]/30">
          <button
            onClick={onBackToStore}
            className="p-2 -ml-2 text-[#45464d] hover:text-[#151b2d] hover:bg-neutral-100 rounded-full transition-colors"
            title="Back to Order"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center">
            <span className="font-extrabold text-xs sm:text-sm tracking-widest text-[#151b2d] uppercase font-serif">
              AURA ATELIER
            </span>
            <span className="text-[9px] tracking-wider text-[#45464d] uppercase font-mono font-bold">
              RETURNS &amp; EXCHANGES
            </span>
          </div>

          <button
            onClick={() => alert('Connected with AURA Atelier Concierge agent.')}
            className="p-2 -mr-2 text-[#151b2d] hover:text-[#4b41e1] hover:bg-neutral-100 rounded-full transition-colors relative"
            title="Contact Concierge"
          >
            <Headphones className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4b41e1]" />
          </button>
        </header>

        {/* Scrollable Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Order Header Context Card */}
          <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#c6c6cd]/40 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#c6c6cd]/20">
              <div>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-mono font-bold text-[#4b41e1]">Order #AUR-89241</span>
                  <span className="text-[#c6c6cd]">•</span>
                  <span className="text-[#45464d]">Delivered Oct 24</span>
                </div>
                <h1 className="text-base sm:text-lg font-bold text-[#151b2d] font-serif mt-0.5">Elena Vasiliev</h1>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                24 Days Left
              </span>
            </div>

            <p className="text-xs text-[#45464d] leading-relaxed">
              Complimentary carbon-neutral courier pickup or boutique drop-off. Exchanged items dispatch immediately with priority atelier reserve.
            </p>
          </section>

          {/* Stepper */}
          <div className="grid grid-cols-3 gap-3 text-center text-[10px] sm:text-xs font-mono uppercase font-bold">
            <div className="flex flex-col items-center">
              <div className="w-full h-1.5 bg-[#000000] rounded-full mb-1.5" />
              <span className="text-[#000000]">1. Select</span>
            </div>
            <div className="flex flex-col items-center opacity-40">
              <div className="w-full h-1.5 bg-[#c6c6cd] rounded-full mb-1.5" />
              <span className="text-[#45464d]">2. Method</span>
            </div>
            <div className="flex flex-col items-center opacity-40">
              <div className="w-full h-1.5 bg-[#c6c6cd] rounded-full mb-1.5" />
              <span className="text-[#45464d]">3. Confirm</span>
            </div>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            {/* LEFT 7 COLUMNS: Items selection & reason cards */}
            <div className="lg:col-span-7 space-y-4">
              {/* Items Header */}
              <div className="flex items-baseline justify-between text-xs sm:text-sm">
                <h2 className="font-bold text-[#151b2d]">Select Items</h2>
                <span className="text-[#45464d] font-mono">{toteSelected ? '3 of 3' : '2 of 3'} selected</span>
              </div>

              {/* ITEM 1: Structured Wool Blazer */}
              <article className="p-4 sm:p-5 rounded-3xl border-2 border-[#000000] bg-white space-y-3.5 shadow-xs">
                <div className="flex gap-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=300&auto=format&fit=crop"
                    alt="Blazer"
                    className="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono uppercase text-[#45464d] font-bold">Tailoring</span>
                    <h3 className="font-bold text-sm text-[#151b2d] truncate">Structured Wool Blazer</h3>
                    <p className="text-xs text-[#45464d]">Size 38 • Charcoal Obsidian</p>
                    <span className="font-mono text-xs font-bold text-[#151b2d] mt-1 block">$304.00</span>
                  </div>
                </div>

                {/* Exchange Options */}
                <div className="pt-2 border-t border-[#c6c6cd]/20 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#151b2d]">Resolution:</span>
                    <span className="text-emerald-700 font-bold">Instant Size Exchange</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/30 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-[#45464d] block">Replacement Selected:</span>
                      <strong className="text-[#151b2d]">Size 40 EU (In Stock • 3 Left)</strong>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#000000] text-white px-2 py-0.5 rounded">
                      Reserved
                    </span>
                  </div>
                </div>
              </article>

              {/* ITEM 2: Pleated Wide Trousers */}
              <article className="p-4 sm:p-5 rounded-3xl border-2 border-[#000000] bg-white space-y-3.5 shadow-xs">
                <div className="flex gap-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=300&auto=format&fit=crop"
                    alt="Trousers"
                    className="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono uppercase text-[#45464d] font-bold">Tailoring</span>
                    <h3 className="font-bold text-sm text-[#151b2d] truncate">Pleated Wide Trousers</h3>
                    <p className="text-xs text-[#45464d]">Size 36 • Alabaster Ivory</p>
                    <span className="font-mono text-xs font-bold text-[#151b2d] mt-1 block">$195.00</span>
                  </div>
                </div>

                {/* Return Details */}
                <div className="pt-2 border-t border-[#c6c6cd]/20 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#151b2d]">Resolution:</span>
                    <span className="text-[#4b41e1] font-bold">Full Refund</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-50 border border-[#c6c6cd]/30 text-xs">
                    <span className="text-[10px] text-[#45464d] block">Reason:</span>
                    <span className="text-[#151b2d]">Length exceeds preference (Too long)</span>
                  </div>
                </div>
              </article>

              {/* ITEM 3: Sculpted Calfskin Tote */}
              <article className="p-4 sm:p-5 rounded-3xl border border-[#c6c6cd]/40 bg-white flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=300&auto=format&fit=crop"
                    alt="Tote"
                    className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                  />
                  <div>
                    <span className="text-[9px] font-mono uppercase text-[#45464d] font-bold">Leather Goods</span>
                    <h4 className="font-bold text-sm text-[#151b2d]">Sculpted Calfskin Tote</h4>
                    <span className="text-xs text-[#45464d] font-mono">$285.00</span>
                  </div>
                </div>
                <button
                  onClick={() => setToteSelected(!toteSelected)}
                  className="text-xs font-semibold text-[#4b41e1] hover:underline"
                >
                  {toteSelected ? 'Remove from return' : 'Return piece'}
                </button>
              </article>
            </div>

            {/* RIGHT 5 COLUMNS: Return method, Settlement summary, Destination selector, and Desktop CTA */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
              {/* Method Selection */}
              <section className="space-y-2.5">
                <h3 className="font-bold text-xs sm:text-sm text-[#151b2d]">Return &amp; Exchange Method</h3>
                <div className="space-y-2">
                  <div
                    onClick={() => setSelectedMethod('courier')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedMethod === 'courier' ? 'border-2 border-[#000000] bg-[#f2f3ff]' : 'border-[#c6c6cd]/40 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full border-2 border-[#000000] flex items-center justify-center mt-0.5">
                          {selectedMethod === 'courier' && <div className="w-2 h-2 rounded-full bg-[#000000]" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#151b2d]">Home Courier Pickup</h4>
                          <p className="text-[11px] text-[#45464d]">DHL Carbon-Neutral • Scheduled 2-hour window</p>
                          <div className="mt-2 p-2 bg-white rounded-lg border border-[#c6c6cd]/30 text-[11px] font-mono">
                            Tomorrow, Oct 26 (10:00 AM – 12:00 PM) • 452 W Broadway
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-700">Free</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedMethod('boutique')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      selectedMethod === 'boutique' ? 'border-2 border-[#000000] bg-[#f2f3ff]' : 'border-[#c6c6cd]/40 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#151b2d]">Atelier Boutique Drop-Off</span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold">Free</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Settlement & Refund Summary */}
              <section className="bg-white rounded-3xl border border-[#c6c6cd]/40 p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-[#151b2d]">
                  <span>Refund &amp; Settlement</span>
                  <span className="font-mono text-[10px] text-[#45464d]">#AUR-89241</span>
                </div>

                <div className="space-y-1.5 text-xs text-[#45464d] font-mono border-b border-[#c6c6cd]/20 pb-3">
                  <div className="flex justify-between">
                    <span>Blazer Replacement (Size 40):</span>
                    <span className="text-[#151b2d] font-bold">Even Exchange ($0.00)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wide Trousers Return:</span>
                    <span className="text-[#151b2d]">$195.00</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Welcome Privilege Applied:</span>
                    <span>-$11.25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sales Tax Refund:</span>
                    <span className="text-[#151b2d]">+$14.78</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-[#151b2d] block">Estimated Net Refund</span>
                    <span className="text-[10px] text-[#45464d]">Dispatched upon courier scan confirmation</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-[#151b2d]">$198.53</span>
                </div>

                {/* Destination Selector */}
                <div className="pt-2 space-y-2 text-xs">
                  <label
                    onClick={() => setRefundDestination('card')}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer ${
                      refundDestination === 'card' ? 'border-2 border-[#000000] bg-[#f2f3ff]' : 'border-[#c6c6cd]/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-4 h-4 text-[#4b41e1]" />
                      <div>
                        <strong className="block text-[#151b2d]">Original Card (Mastercard •••• 4821)</strong>
                        <span className="text-[10px] text-[#45464d]">2–3 business days</span>
                      </div>
                    </div>
                    <span className="font-bold font-mono">$198.53</span>
                  </label>

                  <label
                    onClick={() => setRefundDestination('credit')}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer ${
                      refundDestination === 'credit' ? 'border-2 border-[#000000] bg-[#f2f3ff]' : 'border-[#c6c6cd]/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-[#151b2d]">Atelier Store Credit</strong>
                        <span className="px-1.5 py-0.2 rounded bg-[#4b41e1] text-white text-[9px] font-bold uppercase">
                          +10% Bonus
                        </span>
                      </div>
                      <span className="text-[10px] text-[#45464d]">Instant availability</span>
                    </div>
                    <span className="font-bold font-mono text-[#4b41e1]">$218.38</span>
                  </label>
                </div>

                {/* Desktop Review & Reserve Button */}
                <div className="hidden lg:block pt-3">
                  <button
                    onClick={onConfirmReservation}
                    className="w-full h-14 rounded-full bg-[#000000] text-white hover:bg-neutral-800 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-xl"
                  >
                    <span>Review &amp; Reserve ($198.53 Refund)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Mobile Sticky Action Rail */}
        <footer className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-[#c6c6cd]/40 p-4 shadow-lg">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-[#45464d] uppercase block">1 Exchange • 1 Return</span>
              <span className="text-lg font-bold font-mono text-[#151b2d]">$198.53 Refund</span>
            </div>

            <button
              onClick={onConfirmReservation}
              className="flex-1 max-w-[200px] h-12 rounded-full bg-[#000000] text-white hover:bg-[#131b2e] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
            >
              <span>Review &amp; Reserve</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
