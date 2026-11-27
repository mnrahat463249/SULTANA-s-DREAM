import React, { useState } from 'react';
import { 
  ArrowLeft, Check, QrCode, Download, Truck, Clock, 
  MapPin, Shield, RotateCcw, CreditCard, ChevronRight,
  Headphones, CheckCircle2, Leaf, ArrowRight, X
} from 'lucide-react';

export default function MobileDropOffPassView({ onBackToStore, onGoToTracking }) {
  const [downloadToast, setDownloadToast] = useState(false);

  const handleDownload = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 2400);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#151b2d] flex justify-center selection:bg-[#4b41e1]/20 selection:text-[#4b41e1]">
      <div className="w-full max-w-md min-h-screen flex flex-col bg-white border-x border-[#c6c6cd]/30 shadow-2xl relative pb-36">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 h-14 flex items-center justify-between border-b border-[#c6c6cd]/30">
          <button
            onClick={onBackToStore}
            className="p-1 -ml-1 text-[#45464d] hover:text-[#151b2d] rounded-full"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center">
            <span className="font-extrabold text-[11px] tracking-widest text-[#151b2d] uppercase font-mono">
              AURA ATELIER
            </span>
            <span className="text-[9px] tracking-wider text-[#45464d] uppercase">
              RETURN CONFIRMATION
            </span>
          </div>

          <button
            onClick={() => alert('Connected with AURA Atelier Concierge.')}
            className="p-1 -mr-1 text-[#151b2d] hover:text-[#4b41e1]"
            title="Concierge"
          >
            <Headphones className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Canvas */}
        <main className="flex-1 p-4 space-y-4">
          {/* Confirmation Hero */}
          <section className="text-center pt-2 pb-1 space-y-2">
            <div className="w-14 h-14 rounded-full bg-[#000000] text-white flex items-center justify-center mx-auto shadow-md ring-4 ring-[#4b41e1]/15">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div className="space-y-0.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#4b41e1] text-[10px] font-mono font-bold uppercase tracking-wider">
                PICKUP SCHEDULED &amp; EXCHANGE RESERVED
              </span>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-[#151b2d] tracking-tight pt-1">
                Return &amp; Exchange Authorized
              </h1>
              <p className="text-xs text-[#45464d]">
                RMA <strong className="text-[#151b2d] font-mono">#RMA-89241-EX</strong> • Dispatched to elena.v@atelier.com
              </p>
            </div>
          </section>

          {/* Digital Drop-Off Pass Card (Boarding-Pass Aesthetic) */}
          <section className="relative bg-white rounded-2xl border border-[#c6c6cd]/50 shadow-sm overflow-hidden">
            {/* Top Pass Segment */}
            <div className="p-4 bg-[#000000] text-white space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                <span className="text-amber-300 font-bold flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" />
                  DIGITAL ATELIER RETURN PASS
                </span>
                <span className="text-[#c6c6cd]">Valid through Nov 15</span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#c6c6cd] block">Client Name</span>
                  <strong className="text-sm font-serif">Elena Vasiliev</strong>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-[#c6c6cd] block">Order Token</span>
                  <span className="font-mono text-xs font-bold text-amber-300">#AUR-89241</span>
                </div>
              </div>
            </div>

            {/* Dotted Notch Line */}
            <div className="relative w-full h-3 bg-white flex items-center justify-center">
              <div className="w-full border-t border-dashed border-[#c6c6cd]/50 px-4" />
            </div>

            {/* Pass QR Body */}
            <div className="p-5 pt-1 flex flex-col items-center text-center space-y-3">
              <div className="p-4 rounded-xl bg-white shadow-inner border border-[#c6c6cd]/40 w-48 h-48 flex items-center justify-center relative">
                <div className="scan-indicator absolute inset-x-3 h-0.5 bg-[#4b41e1] shadow-xs rounded-full pointer-events-none" />
                <QrCode className="w-40 h-40 text-[#000000]" />
              </div>

              <div>
                <span className="tracking-[0.2em] font-mono text-xs font-bold text-[#151b2d] block">
                  AUR-RET-89241-NYC
                </span>
                <div className="flex items-center justify-center gap-[2px] h-4 mt-1 opacity-70">
                  {[...Array(24)].map((_, i) => (
                    <span key={i} className={`h-full bg-[#151b2d] ${i % 3 === 0 ? 'w-1' : 'w-0.5'}`} />
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#f2f3ff] text-left text-xs text-[#45464d] flex items-start gap-2">
                <Leaf className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong className="text-[#151b2d]">No box or printed label required.</strong> Simply show this QR pass to the courier upon arrival.
                </p>
              </div>

              {/* Pass Actions */}
              <div className="grid grid-cols-2 gap-2 w-full pt-1">
                <button
                  onClick={() => showPassAlert('Apple Wallet Pass added to device')}
                  className="h-10 rounded-xl bg-[#000000] text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
                >
                  <span className="text-sm"></span>
                  <span>Apple Wallet</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="h-10 rounded-xl bg-[#f2f3ff] text-[#151b2d] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-[#c6c6cd]/40"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save PDF Pass</span>
                </button>
              </div>
            </div>
          </section>

          {/* Scheduled Courier Pickup Details */}
          <section className="bg-white rounded-2xl p-4 border border-[#c6c6cd]/40 space-y-3 shadow-xs text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#151b2d]">
                  <Truck className="w-4 h-4 text-[#4b41e1]" />
                </div>
                <div>
                  <h2 className="font-bold text-[#151b2d]">DHL White Glove Pickup</h2>
                  <span className="text-[10px] text-emerald-700 font-semibold">100% Carbon-Neutral Route</span>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Confirmed
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#76777d] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#45464d] uppercase font-mono block">Pickup Window</span>
                  <strong className="text-[#151b2d]">Tomorrow, Oct 26 • 10:00 AM – 12:00 PM EDT</strong>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#76777d] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-[#45464d] uppercase font-mono block">Collection Address</span>
                  <span className="text-[#151b2d]">452 W Broadway, Apt 4B, New York, NY 10012</span>
                </div>
              </div>
            </div>
          </section>

          {/* Active Exchange Reserve Hold */}
          <section className="bg-white rounded-2xl p-4 border border-[#c6c6cd]/40 space-y-3 shadow-xs text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#4b41e1] font-bold uppercase">EXCHANGE IN PROGRESS</span>
                <h2 className="font-bold text-[#151b2d]">Priority Atelier Reserve Hold</h2>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=200&auto=format&fit=crop"
                alt="Exchange Blazer"
                className="w-14 h-16 rounded-lg object-cover border border-[#c6c6cd]/40 shrink-0"
              />
              <div className="flex-1">
                <span className="text-[9px] font-mono uppercase text-[#45464d] block">AURA Tailored Line</span>
                <strong className="text-xs text-[#151b2d] block">Structured Wool Blazer</strong>
                <span className="text-[11px] text-[#45464d]">Charcoal Obsidian • Size 40 (EU)</span>
                <div className="flex items-center justify-between mt-1 text-[11px] font-mono font-bold">
                  <span className="text-emerald-700">Even Exchange ($0.00)</span>
                  <span className="text-[#4b41e1]">Expedited 24h Air</span>
                </div>
              </div>
            </div>
          </section>

          {/* Settlement Breakdown */}
          <section className="bg-white rounded-2xl p-4 border border-[#c6c6cd]/40 space-y-2 shadow-xs text-xs font-mono">
            <div className="flex items-center justify-between font-bold text-[#151b2d]">
              <span>Return &amp; Refund Breakdown</span>
              <span className="text-[10px] text-[#45464d]">1 Item Returned</span>
            </div>
            <div className="flex justify-between border-b border-[#c6c6cd]/20 pb-2 text-[#45464d]">
              <span>Pleated Wide Trousers (Sz 36):</span>
              <strong className="text-[#151b2d]">$198.53 USD</strong>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-xs text-[#151b2d] font-sans">Mastercard •••• 4821</span>
              <span className="text-base font-bold text-[#151b2d]">$198.53 USD</span>
            </div>
          </section>

          {/* 3-Step Next Steps */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-[#c6c6cd]/40 space-y-1">
              <span className="text-[9px] font-mono text-[#4b41e1] font-bold block">STEP 01</span>
              <strong className="text-[11px] block">Keep Tags</strong>
              <span className="text-[9px] text-[#76777d]">Tags &amp; seal intact</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#c6c6cd]/40 space-y-1">
              <span className="text-[9px] font-mono text-[#4b41e1] font-bold block">STEP 02</span>
              <strong className="text-[11px] block">Present Pass</strong>
              <span className="text-[9px] text-[#76777d]">Courier scans QR</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#c6c6cd]/40 space-y-1">
              <span className="text-[9px] font-mono text-[#4b41e1] font-bold block">STEP 03</span>
              <strong className="text-[11px] block">Auto Release</strong>
              <span className="text-[9px] text-[#76777d]">Instant shipment</span>
            </div>
          </div>
        </main>

        {/* Sticky Action Footer */}
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-md w-full z-40 bg-white/95 backdrop-blur-xl border-t border-[#c6c6cd]/40 p-4 flex items-center gap-2.5 shadow-lg">
          <button
            onClick={onBackToStore}
            className="h-12 px-4 rounded-full border border-[#c6c6cd]/60 text-xs font-semibold text-[#151b2d] hover:bg-[#f2f3ff] transition-all"
          >
            Orders
          </button>

          <button
            onClick={onGoToTracking}
            className="flex-1 h-12 rounded-full bg-[#000000] text-white hover:bg-[#131b2e] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
          >
            <span>View Live Transit Status</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>

        {downloadToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl backdrop-blur-md flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Digital PDF Pass Saved</span>
          </div>
        )}
      </div>
    </div>
  );
}

function showPassAlert(msg) {
  alert(msg);
}
