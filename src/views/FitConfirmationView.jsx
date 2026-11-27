import React, { useState } from 'react';
import { 
  X, CheckCircle2, Wand2, Clock, Check, ChevronRight, 
  ShieldCheck, Star, Car, Heart, FileText, ArrowRight, 
  Radio, Sparkles, Scissors, RotateCcw, Download
} from 'lucide-react';

export default function FitConfirmationView({ 
  onBackToStore, 
  onGoToHandoff, 
  onGoToVault 
}) {
  const [selectedEvaluation, setSelectedEvaluation] = useState('flawless');
  const [selectedGratuity, setSelectedGratuity] = useState(15);
  const [selectedCompliments, setSelectedCompliments] = useState(['punctual', 'steamed']);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleCompliment = (key) => {
    setSelectedCompliments((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const evaluationOptions = [
    {
      id: 'flawless',
      title: 'Flawless Drape & Shoulders',
      description: 'Obsidian wool falls naturally; chest button closure sits flush',
      tag: 'Selected'
    },
    {
      id: 'sleeve',
      title: 'Slight Sleeve Hem Desired',
      description: 'Book complimentary in-home tailor visit within 30 days'
    },
    {
      id: 'size',
      title: 'Request Alternative Size',
      description: 'Fleet courier returns with Size 38 or 42 within 90 min'
    }
  ];

  return (
    <div className="bg-[#faf8ff] text-[#151b2d] antialiased min-h-screen flex justify-center selection:bg-[#4b41e1]/20 selection:text-[#4b41e1]">
      <div className="w-full max-w-[420px] bg-[#faf8ff] min-h-screen flex flex-col relative pb-[140px] shadow-[0_0_50px_rgba(15,23,42,0.06)]">
        {/* ================= 1. TASK FOCUSED TOP BAR ================= */}
        <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-md px-4 h-14 flex items-center justify-between border-b border-[#c6c6cd]/30">
          <button
            onClick={onBackToStore}
            aria-label="Dismiss consultation"
            className="w-10 h-10 flex items-center justify-start text-[#151b2d] active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[11px] font-mono tracking-[0.18em] uppercase font-bold text-[#151b2d]">
              AURA ATELIER
            </span>
            <span className="text-[10px] text-[#45464d] font-mono -mt-0.5">FIT CONSULTATION</span>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wider">TRY-ON COMPLETE</span>
          </div>
        </header>

        {/* ================= MAIN CONTENT CANVAS ================= */}
        <main className="flex-1 px-4 pt-4 space-y-5">
          {/* 2. Hero Confirmation Header */}
          <section className="flex flex-col items-center text-center pt-2 pb-1">
            <div className="relative mb-3">
              <div className="w-14 h-14 rounded-full bg-white border border-[#c6c6cd]/50 flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8 text-[#4b41e1]" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#000000] text-white flex items-center justify-center text-[12px] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#85f8c4]" />
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#151b2d]">
              The Perfect Fit, Confirmed
            </h1>
            <p className="text-xs text-[#45464d] mt-1 max-w-xs leading-relaxed">
              Exchange #AUR-EX-99210 • Handoff completed with Concierge Julian R.
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 text-[#45464d] text-[11px] bg-[#eaedff]/60 px-3 py-1 rounded-full font-mono">
              <Clock className="w-3.5 h-3.5 text-[#4b41e1]" />
              <span>Today, Oct 27 at 1:12 PM EDT • 452 W Broadway, NYC</span>
            </div>
          </section>

          {/* 3. Garment Fit Evaluation Selector */}
          <section className="bg-white rounded-3xl border border-[#c6c6cd]/40 p-4 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#c6c6cd]/20 text-xs">
              <span className="text-[10px] font-mono uppercase text-[#76777d] tracking-wider font-bold">
                DELIVERED REPLACEMENT
              </span>
              <span className="text-[10px] font-mono text-[#4b41e1] bg-[#e2dfff] px-2 py-0.5 rounded font-bold">
                VAULT #VB-1084
              </span>
            </div>

            {/* Garment Summary Card */}
            <div className="flex gap-3.5 items-center">
              <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-[#f2f3ff] shrink-0 border border-[#c6c6cd]/30">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400&auto=format&fit=crop"
                  alt="Structured Wool Blazer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1 bg-[#000000]/80 backdrop-blur-sm text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                  EU 40
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-mono text-[#76777d] uppercase tracking-wider font-bold">
                  AURA ATELIER COLLECTION
                </span>
                <h2 className="text-sm font-bold text-[#151b2d] mt-0.5">
                  Structured Obsidian Wool Blazer
                </h2>
                <p className="text-xs text-[#45464d] mt-0.5">Charcoal Obsidian • Roomier Cut</p>
                <div className="flex items-center gap-2 mt-1.5 font-mono text-xs">
                  <span className="font-bold text-[#151b2d]">$895.00</span>
                  <span className="text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-emerald-200">
                    Verified On-Body
                  </span>
                </div>
              </div>
            </div>

            {/* Evaluation State Selector */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#76777d] tracking-wider font-bold">
                <span>Client Fit Evaluation</span>
                <span className="text-[#4b41e1]">15-Min Try-on Approved</span>
              </div>

              {evaluationOptions.map((opt) => {
                const isSelected = selectedEvaluation === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedEvaluation(opt.id)}
                    className={`w-full rounded-2xl p-3 flex items-center justify-between border cursor-pointer active:scale-[0.99] transition-all ${
                      isSelected
                        ? 'bg-[#000000] text-white border-black shadow-xs'
                        : 'bg-[#f2f3ff]/70 hover:bg-[#eaedff] text-[#151b2d] border-[#c6c6cd]/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2
                        className={`w-4 h-4 ${isSelected ? 'text-[#85f8c4]' : 'text-[#76777d]'}`}
                      />
                      <div className="text-left">
                        <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#151b2d]'}`}>
                          {opt.title}
                        </div>
                        <div className={`text-[11px] ${isSelected ? 'text-white/70' : 'text-[#45464d]'}`}>
                          {opt.description}
                        </div>
                      </div>
                    </div>
                    {isSelected ? (
                      <span className="text-[10px] font-mono text-[#85f8c4] bg-white/10 px-2 py-0.5 rounded-full uppercase font-bold">
                        Selected
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#76777d]" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Atelier Fit Guarantee Badge */}
            <div className="bg-[#e2dfff]/40 border border-[#4b41e1]/30 rounded-2xl p-3 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#4b41e1] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-[#151b2d]">30-Day Atelier Complimentary Tailoring</h3>
                <p className="text-[11px] text-[#45464d] mt-0.5 leading-relaxed">
                  If sleeve length or waist contouring requires fine-tuning after daily wear, dispatch a master atelier tailor directly to your residence at no cost.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Courier & Concierge Service Review */}
          <section className="bg-white rounded-3xl border border-[#c6c6cd]/40 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-mono uppercase text-[#76777d] tracking-wider font-bold">
                CONCIERGE HANDOFF REVIEW
              </span>
              <span className="text-[11px] text-[#45464d] font-mono font-semibold">Electric Unit #07</span>
            </div>

            {/* Courier Info Row */}
            <div className="flex items-center justify-between bg-[#f2f3ff] p-3 rounded-2xl border border-[#c6c6cd]/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#c6c6cd]/50 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                    alt="Julian R."
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#151b2d]">Julian R.</span>
                    <span className="flex items-center text-[11px] font-bold text-amber-600 font-mono">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" /> 4.98
                    </span>
                  </div>
                  <p className="text-[11px] text-[#45464d]">Senior Fleet Concierge • 1,240+ Handoffs</p>
                </div>
              </div>
              <Car className="w-5 h-5 text-[#4b41e1]" />
            </div>

            <p className="text-xs text-[#45464d] italic px-1">
              “Julian steamed the lapels upon arrival and waited 14 minutes while you evaluated the shoulder seam alignment.”
            </p>

            {/* Quick Compliment Tags */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-[#45464d] font-semibold">Express Courier Compliments:</span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { id: 'punctual', label: 'Punctual & Courteous' },
                  { id: 'steamed', label: 'Garment Steamed Flawlessly' },
                  { id: 'discreet', label: 'Discreet & Professional' }
                ].map((tag) => {
                  const isChecked = selectedCompliments.includes(tag.id);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => toggleCompliment(tag.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 transition-all ${
                        isChecked
                          ? 'bg-[#000000] text-white border-black'
                          : 'bg-[#f2f3ff] text-[#151b2d] border-[#c6c6cd]/40 hover:bg-[#eaedff]'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{tag.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Concierge Gratuity Selector */}
            <div className="pt-2 border-t border-[#c6c6cd]/20">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="font-bold text-[#151b2d]">Atelier Fleet Gratuity</span>
                <span className="text-[11px] text-[#45464d]">100% directly to Julian</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[10, 15, 20, 0].map((amt) => {
                  const isSelected = selectedGratuity === amt;
                  return (
                    <button
                      key={amt}
                      onClick={() => {
                        setSelectedGratuity(amt);
                        triggerToast(amt > 0 ? `Gratuity of $${amt} selected` : 'Gratuity set to Custom');
                      }}
                      className={`h-9 rounded-xl border text-xs font-mono font-bold transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-[#000000] text-white border-black shadow-xs'
                          : 'bg-[#faf8ff] text-[#151b2d] border-[#c6c6cd]/40 hover:border-black'
                      }`}
                    >
                      {amt > 0 ? `$${amt}` : 'Other'}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 5. Final Settlement & Ownership Vault */}
          <section className="bg-white rounded-3xl border border-[#c6c6cd]/40 p-4 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
              <span className="text-[10px] font-mono uppercase text-[#76777d] tracking-wider font-bold">
                EXCHANGE ACCOUNTING
              </span>
              <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Zero Balance Settled
              </span>
            </div>

            <div className="space-y-1.5 font-mono">
              <div className="flex justify-between items-center text-[#151b2d]">
                <span>Replacement Wool Blazer (Sz 40)</span>
                <span>$895.00</span>
              </div>
              <div className="flex justify-between items-center text-[#45464d]">
                <span>Exchange Credit Applied (#AUR-89241)</span>
                <span className="text-emerald-700 font-bold">-$895.00</span>
              </div>
              <div className="flex justify-between items-center text-[#45464d] text-[11px]">
                <span>15-Min In-Home White Glove Try-On</span>
                <span className="text-[#4b41e1] font-bold uppercase">Complimentary</span>
              </div>

              {selectedGratuity > 0 && (
                <div className="flex justify-between items-center text-[#151b2d]">
                  <span>Courier Gratuity (Julian R.)</span>
                  <span>${selectedGratuity.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#c6c6cd]/20 flex justify-between items-baseline font-bold text-sm">
                <span>Net Due Today</span>
                <div className="text-right">
                  <span className="text-base text-[#151b2d]">${selectedGratuity.toFixed(2)}</span>
                  <span className="block text-[10px] text-[#76777d] font-normal">
                    Charged to Apple Pay (•••• 9012)
                  </span>
                </div>
              </div>
            </div>

            {/* Digital Wardrobe NFT & NFC Transfer Certificate */}
            <div className="bg-[#f2f3ff] p-3 rounded-2xl border border-[#c6c6cd]/30 flex items-start gap-2.5 mt-2">
              <div className="w-8 h-8 rounded-xl bg-white border border-[#c6c6cd]/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#4b41e1]" />
              </div>
              <div className="text-left flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#151b2d]">Elena's AURA Digital Vault</span>
                  <span className="text-[9px] bg-white px-1.5 py-0.5 rounded font-mono text-[#45464d] border border-[#c6c6cd]/30">
                    #NFC-99210-OBS
                  </span>
                </div>
                <p className="text-[11px] text-[#45464d] mt-0.5 leading-relaxed">
                  Cryptographic authenticity chip &amp; archival ownership pass will be transferred to your device upon completing handoff.
                </p>
              </div>
            </div>

            <div 
              onClick={() => triggerToast('Care guide opened: 100% Super 150s Merino wool steaming & cedar storage.')}
              className="pt-1 flex items-center justify-between text-xs text-[#45464d] hover:text-[#000000] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#4b41e1]" />
                <span>View Care &amp; Archival Storage Guide</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>
          </section>

          {/* Micro trust footer text */}
          <div className="text-center pb-2 text-[10px] text-[#76777d] font-mono">
            AURA Maison de Couture • 452 W Broadway, SoHo, New York • Concierge Dispatch #07
          </div>
        </main>

        {/* ================= 6. STICKY BOTTOM ACTION RAIL ================= */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-50 bg-white/95 backdrop-blur-md border-t border-[#c6c6cd]/30 px-4 pt-2.5 pb-safe-bottom-pad shadow-[0_-4px_24px_rgba(15,23,42,0.06)]">
          <button
            onClick={() => {
              triggerToast('Fit confirmed! Garment minted into digital wardrobe vault.');
              setTimeout(() => {
                if (onGoToHandoff) onGoToHandoff();
              }, 600);
            }}
            className="w-full h-12 rounded-full bg-[#000000] hover:bg-black/90 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-sm"
          >
            <span>Complete Handoff &amp; Add to Wardrobe</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center mt-2 mb-1">
            <button
              onClick={() => triggerToast('PDF settlement invoice and cryptographic ownership certificate downloaded.')}
              className="inline-flex items-center gap-1 text-[11px] text-[#45464d] hover:text-black transition-colors font-medium underline underline-offset-2"
            >
              <Download className="w-3 h-3" />
              <span>Download Settlement Invoice &amp; Certificate (PDF)</span>
            </button>
          </div>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/20 text-xs animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-[#85f8c4]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
