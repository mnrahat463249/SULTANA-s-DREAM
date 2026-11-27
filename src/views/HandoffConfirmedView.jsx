import React, { useState } from 'react';
import { 
  Check, Lock, QrCode, Truck, CreditCard, FileText, 
  ShieldCheck, Star, Leaf, ArrowRight, ArrowLeft, Download, X
} from 'lucide-react';

export default function HandoffConfirmedView({ onBackToStore, onBackToRoute }) {
  const [complimentGiven, setComplimentGiven] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center">
      {/* Mobile Frame */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-neutral-950 border-x border-neutral-800 shadow-2xl relative pb-36">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-xl px-4 h-14 flex items-center justify-between border-b border-neutral-800">
          <button
            onClick={onBackToRoute}
            className="p-1.5 -ml-1 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
            title="Back to Route"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-300 font-bold">
              AURA ATELIER • HANDOFF COMPLETED
            </span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 px-4 pt-6 space-y-6">
          {/* Celebratory Hero */}
          <section className="flex flex-col items-center text-center">
            {/* Animated Pulse Ring & Badge */}
            <div className="relative flex items-center justify-center w-20 h-20 mb-3">
              <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping opacity-40" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Check className="w-8 h-8 text-neutral-950 stroke-[3]" />
              </div>
              <div className="absolute -bottom-1 bg-neutral-900 border border-emerald-400/40 px-2 py-0.5 rounded-full shadow-md">
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  NFC VERIFIED
                </span>
              </div>
            </div>

            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
              SUCCESSFULLY HANDED OFF
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight font-serif">
              Handoff Confirmed &amp; Verified
            </h1>
            <p className="text-xs text-neutral-400 max-w-xs mt-1">
              Today, Oct 26 at 10:04 AM EDT • Doorstep Reception, 452 W Broadway
            </p>

            {/* Return Reference Chip */}
            <div className="w-full bg-neutral-900/80 border border-neutral-800 rounded-2xl p-3.5 mt-4 text-left space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-neutral-400 uppercase text-[10px]">Return Reference</span>
                <span className="font-mono font-bold text-amber-400 tracking-tight">#RMA-89241-EX</span>
              </div>
              <div className="h-px bg-neutral-800 w-full" />
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Scanned by Courier Marcus V. (Mercedes Van #04)</span>
              </div>
            </div>
          </section>

          {/* Automated Reactions */}
          <section className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase px-1">
              <span className="text-neutral-400">Automated Atelier Reactions</span>
              <span className="text-amber-400 font-semibold">2 Actions Executed</span>
            </div>

            {/* Reaction 1: Exchange Dispatch */}
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  IN FLIGHT TO YOU
                </span>
                <span className="text-[11px] text-neutral-400">Auto-Released</span>
              </div>

              <div className="flex gap-3.5 items-start">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=300&auto=format&fit=crop"
                  alt="Replacement Blazer"
                  className="w-16 h-20 rounded-xl object-cover bg-neutral-950 flex-shrink-0 border border-neutral-700"
                />
                <div className="flex-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Replacement Item
                  </span>
                  <h3 className="font-bold text-sm text-white mt-0.5">Structured Wool Blazer</h3>
                  <p className="text-xs text-neutral-400">Charcoal Obsidian • Size 40 EU</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-xs space-y-1">
                <div className="flex items-center justify-between text-neutral-200 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-400" />
                    <span>DHL Express Priority</span>
                  </div>
                  <span className="font-mono text-[11px] text-neutral-400">#AUR-EX-99210</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Dispatched from Brooklyn Fulfillment Atelier. Expected doorstep arrival: <strong className="text-white">Tomorrow by 1:00 PM</strong>.
                </p>
              </div>
            </div>

            {/* Reaction 2: Refund Settlement */}
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  FUNDS INITIATED
                </span>
                <span className="font-mono font-bold text-white text-base">$198.53 USD</span>
              </div>

              <div className="flex gap-3.5 items-start">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=300&auto=format&fit=crop"
                  alt="Returned Trousers"
                  className="w-16 h-20 rounded-xl object-cover bg-neutral-950 flex-shrink-0 border border-neutral-700"
                />
                <div className="flex-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Returned Item
                  </span>
                  <h3 className="font-bold text-sm text-white mt-0.5">Pleated Wide Trousers</h3>
                  <p className="text-xs text-neutral-400">Alabaster Ivory • Size 36</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-xs space-y-1">
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Refund Destination:</span>
                  <span className="flex items-center gap-1 font-medium text-white">
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                    Mastercard •••• 4821
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Instant settlement credited to card issuer. Expected availability: 1–2 business days.
                </p>
              </div>

              {/* Download Handover Receipt Button */}
              <button
                onClick={handleDownload}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase text-amber-400 hover:text-amber-300 border border-dashed border-amber-500/40 rounded-xl hover:bg-amber-500/10 active:scale-98 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Digital Handover Receipt (PDF)</span>
              </button>
            </div>
          </section>

          {/* Chain of Custody Card */}
          <section className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-sm text-white font-serif">Chain of Custody</h3>
                  <span className="text-[10px] text-neutral-400 font-mono">Atelier Vault Verification</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                TAMPER SEALED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left pt-1">
              <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-mono block">Vault Bag ID</span>
                <span className="font-mono text-xs font-bold text-white">#VB-0492</span>
              </div>
              <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                <span className="text-[10px] text-neutral-400 font-mono block">Custody Seal</span>
                <span className="font-mono text-xs font-bold text-white">#CCS-89241</span>
              </div>
            </div>

            <div className="border-l-2 border-amber-500 pl-3 py-1 text-xs italic text-neutral-300">
              “Garments verified unworn with atelier security tags intact. Pleasant day, Elena!”
              <span className="block not-italic text-[10px] text-neutral-500 mt-1 font-mono">
                — Marcus V., Senior Courier (Atelier Fleet)
              </span>
            </div>

            {/* Compliment Courier */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Rate Doorstep Scan Experience</span>
              <button
                onClick={() => setComplimentGiven(!complimentGiven)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                  complimentGiven
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${complimentGiven ? 'fill-neutral-950 text-neutral-950' : 'fill-amber-400 text-amber-400'}`} />
                <span>{complimentGiven ? 'Marcus Complimented!' : 'Compliment Marcus'}</span>
              </button>
            </div>
          </section>

          {/* Eco Circular Integrity */}
          <section className="p-3.5 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex items-center gap-3 text-xs">
            <div className="w-9 h-9 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">
                Carbon-Neutral Return Leg
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Zero single-use cardboard. The Reusable Vault System conserved 1.2kg carbon on this transaction.
              </p>
            </div>
          </section>
        </main>

        {/* Sticky Action Footer */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-md w-full z-40 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800 p-4 space-y-2">
          <button
            onClick={() => alert('Tracking DHL Express Priority shipment #AUR-EX-99210 in real-time...')}
            className="w-full h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-98 transition-all"
          >
            <span>Track Replacement Blazer</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onBackToStore}
            className="w-full h-10 rounded-full border border-neutral-800 hover:bg-neutral-900 text-neutral-300 font-semibold text-xs active:scale-98 transition-all"
          >
            Return to Storefront
          </button>
        </div>

        {/* Toast Feedback */}
        {downloadSuccess && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 border border-emerald-500/50 text-emerald-200 px-4 py-2 rounded-full text-xs font-semibold shadow-xl backdrop-blur-md flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Digital Receipt Downloaded</span>
          </div>
        )}
      </div>
    </div>
  );
}
