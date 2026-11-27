import React, { useState } from 'react';
import { 
  Diamond, LayoutDashboard, Truck, Package, Shirt, Lock, 
  Warehouse, UserCheck, Settings, AlertTriangle, Search, 
  ChevronRight, ArrowRight, Check, CheckCircle2, ShieldCheck, 
  Wind, Droplets, Thermometer, Radio, Printer, QrCode, 
  Sparkles, Flame, Eye, RefreshCw, Zap, SlidersHorizontal
} from 'lucide-react';

export default function HermeticBaggingWorkstationView({ 
  onBackToStore, 
  onGoToPressing, 
  onGoToDispatch, 
  onGoToCourier, 
  onGoToFulfillment, 
  onGoToVault, 
  onGoToVip 
}) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [nitrogenSealed, setNitrogenSealed] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2600);
  };

  return (
    <div className="bg-[#faf8ff] text-[#151b2d] font-sans antialiased min-h-screen selection:bg-[#c3c0ff] selection:text-[#000000] flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 z-40 bg-white border-r border-[#c6c6cd]/30 hidden lg:flex flex-col justify-between py-6 px-4 shrink-0 fixed inset-y-0 left-0">
        <div>
          {/* Brand Crest */}
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#000000] text-white flex items-center justify-center shadow-xs">
              <Diamond className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-[#151b2d]">AURA Atelier Ops</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-[10px] text-[#45464d] font-mono">NY SoHo Hub #01 • HSM ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="mx-2 mb-4 p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#4b41e1]" />
              <span className="text-[11px] font-mono font-bold text-[#151b2d]">STAGE 06 PACKAGING</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 font-mono">
              LIVE
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            <button
              onClick={onBackToStore}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview &amp; Store</span>
            </button>

            <button
              onClick={onGoToPressing}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <Flame className="w-4 h-4 text-[#4b41e1]" />
              <span>Vacuum Press Buck</span>
            </button>

            {/* Hermetic Bagging (ACTIVE) */}
            <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#000000] text-white font-bold shadow-sm">
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-[#85f8c4]" />
                <span>Hermetic Cedar Bagging</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white animate-pulse">
                STAGE 06
              </span>
            </div>

            <button
              onClick={onGoToDispatch}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span>Dispatch &amp; Fleet</span>
            </button>

            <button
              onClick={onGoToFulfillment}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>Orders &amp; Fulfillment</span>
            </button>

            <button
              onClick={onGoToVault}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>Vault Minting</span>
            </button>

            <button
              onClick={onGoToVip}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>VIP Client CRM</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-[#c6c6cd]/20 space-y-3 text-xs font-mono">
          <div className="bg-[#f2f3ff] rounded-2xl p-3 border border-[#c6c6cd]/30 space-y-1.5">
            <div className="flex items-center justify-between font-bold">
              <span>FleetMesh</span>
              <span className="text-emerald-700">99.8% Online</span>
            </div>
            <div className="flex items-center justify-between text-[#45464d]">
              <span>HSM NFC Vault</span>
              <span className="font-bold text-[#151b2d]">AES-256 Intact</span>
            </div>
          </div>

          <button
            onClick={() => triggerToast('Emergency protocol initiated across packaging bay.')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 transition-colors text-[11px] font-bold uppercase"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency Protocol</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN WRAPPER ================= */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* TOP APP BAR */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-white/90 backdrop-blur-md border-b border-[#c6c6cd]/30">
          <div className="flex items-center gap-3 text-xs text-[#45464d] font-mono">
            <span>Atelier</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Floors</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-[#151b2d] flex items-center gap-1.5">
              Stage 06: Hermetic Cedar Bagging &amp; Courier Dispatch
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#eaedff] text-[#4b41e1] uppercase">
                Chamber #04
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => triggerToast('Emergency seal release override engaged.')}
              className="px-3 h-9 rounded-xl border border-[#c6c6cd]/60 text-xs font-semibold text-[#151b2d] bg-white hover:bg-[#f2f3ff] transition-all"
            >
              Seal Release
            </button>

            <button
              onClick={onGoToDispatch}
              className="px-4 h-9 rounded-xl bg-[#000000] text-white text-xs font-bold hover:bg-black/90 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Deploy Fleet</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE CANVAS */}
        <main className="p-4 md:p-8 flex-1 space-y-6">
          {/* CHRONOLOGICAL LINEAGE STEPPER */}
          <div className="bg-white border border-[#c6c6cd]/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 flex items-center gap-1 font-bold">
                <Check className="w-3 h-3" /> #CUT-8821
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 flex items-center gap-1 font-bold">
                <Check className="w-3 h-3" /> Basting Bench #02
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 flex items-center gap-1 font-bold">
                <Check className="w-3 h-3" /> Press Buck #01
              </span>
              <span>→</span>
              <span className="px-2.5 py-0.5 rounded bg-[#000000] text-white font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#85f8c4] animate-ping" />
                Stage 06: Hermetic Cedar Bagging
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#76777d]">
                Courier Unit #07 (Julian R.) • ETA 17:00
              </span>
            </div>
          </div>

          {/* SENSOR BENTO STRIP (5 CARDS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-center text-[#45464d] text-[11px] font-mono font-bold uppercase">
                <span>VACUUM PRESSURE</span>
                <Wind className="w-4 h-4 text-[#4b41e1]" />
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-2xl font-bold text-[#151b2d]">-45.0</span>
                  <span className="text-xs text-[#76777d]">kPa</span>
                </div>
                <p className="text-[11px] text-emerald-700 font-medium">O2 &lt; 0.1% Anti-Oxidation</p>
              </div>
              <div className="w-full bg-[#eaedff] rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-[92%]" />
              </div>
            </div>

            <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-center text-[#45464d] text-[11px] font-mono font-bold uppercase">
                <span>CEDAR INFUSION</span>
                <Sparkles className="w-4 h-4 text-[#4b41e1]" />
              </div>
              <div className="my-2">
                <span className="text-base font-bold text-[#151b2d] block">Aomori Hiba</span>
                <p className="text-[11px] text-[#45464d]">Micro-mist 18mg / garment</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded w-fit font-mono">
                Anti-Moth Active
              </span>
            </div>

            <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-center text-[#45464d] text-[11px] font-mono font-bold uppercase">
                <span>RFID CLASP</span>
                <Radio className="w-4 h-4 text-[#4b41e1]" />
              </div>
              <div className="my-2">
                <span className="text-base font-bold text-[#151b2d] font-mono block">#AUR-89210</span>
                <p className="text-[11px] text-[#45464d]">NFC + UHF Gen2 Loop</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded w-fit font-mono">
                Continuity: Intact
              </span>
            </div>

            <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-center text-[#45464d] text-[11px] font-mono font-bold uppercase">
                <span>ZK-ROLLUP STATE</span>
                <Lock className="w-4 h-4 text-[#4b41e1]" />
              </div>
              <div className="my-2">
                <span className="text-base font-bold text-[#151b2d] font-mono block">#8921-DISPATCH</span>
                <p className="text-[11px] text-[#45464d]">zkSync Era • Nonce 401</p>
              </div>
              <span className="text-[10px] font-bold text-[#4b41e1] bg-[#eaedff] px-2 py-0.5 rounded w-fit font-mono">
                Cryptographic Seal
              </span>
            </div>

            <div className="bg-[#000000] text-white rounded-3xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-wider text-[#85f8c4]">
                <span>GATE 06 STATUS</span>
                <span className="w-2 h-2 rounded-full bg-[#85f8c4] animate-ping" />
              </div>
              <div className="my-2 font-mono">
                <span className="text-base font-bold text-white block">HERMETIC READY</span>
                <p className="text-[11px] text-white/70">Heated Clamps @ 165°C</p>
              </div>
              <span className="text-[10px] font-bold text-black bg-[#85f8c4] px-2 py-0.5 rounded w-fit font-mono">
                Calibrated
              </span>
            </div>
          </div>

          {/* 2-COLUMN SPLIT (EASEL + INSPECTOR) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: EASEL (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-6 shadow-xs relative">
                <div className="flex justify-between items-center pb-3 border-b border-[#c6c6cd]/30">
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-[#151b2d]">
                      Hermetic Vacuum Suspension Easel
                    </h2>
                    <p className="text-xs text-[#45464d]">
                      Dual-jaw heated thermal welder with Japanese Aomori Cedar aerosol mist injection manifold.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#eaedff] text-xs font-mono font-bold text-[#4b41e1]">
                    Spec Ref #HERM-MOD-V2
                  </span>
                </div>

                {/* Blueprint Canvas */}
                <div className="relative w-full h-[460px] bg-[#f2f3ff]/60 rounded-2xl my-4 border border-[#c6c6cd]/30 flex items-center justify-center overflow-hidden select-none">
                  {/* Vault Bag Mock Container */}
                  <div className="relative z-10 w-72 h-96 bg-[#000000] text-white rounded-3xl shadow-2xl p-4 flex flex-col justify-between border border-white/20">
                    <div className="border-b border-white/20 pb-2 text-center">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#85f8c4]">
                        AURA MONOGRAM ATELIER
                      </span>
                      <p className="text-[9px] font-mono text-white/60">#ALT-401</p>
                    </div>

                    {/* Hotspot 1: Cedar Cassette */}
                    <div 
                      onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
                      className="absolute -top-3 -right-4 cursor-pointer z-20"
                    >
                      <div className="flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-full border border-[#4b41e1] shadow-lg text-xs font-bold font-mono">
                        <span className="w-2 h-2 rounded-full bg-[#4b41e1] animate-ping" />
                        <span>1. Aomori Hiba Cassette Loaded</span>
                      </div>
                    </div>

                    {/* Hotspot 3: E-Ink Passport */}
                    <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 space-y-1 my-auto">
                      <div className="flex justify-between text-[10px] font-mono text-white/80">
                        <span>E-INK CLIENT PASSPORT</span>
                        <Radio className="w-3 h-3 text-[#85f8c4]" />
                      </div>
                      <h4 className="font-bold text-sm text-white">Elena Vasiliev</h4>
                      <p className="text-[11px] text-white/70">Obsidian Wool Blazer • Sz 40</p>
                      <div className="pt-1 border-t border-white/20 flex justify-between text-[9px] font-mono text-[#85f8c4]">
                        <span>AES-256 OTP MATCH</span>
                        <span>AUTHENTICATED</span>
                      </div>
                    </div>

                    {/* Hotspot 2: Welded Zipper */}
                    <div 
                      onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
                      className="absolute bottom-16 -right-6 cursor-pointer z-20"
                    >
                      <div className="flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-full border border-[#c6c6cd] shadow-lg text-xs font-bold font-mono">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>2. Welded Zipper Terminus</span>
                      </div>
                    </div>

                    {/* Hotspot 4: Transducer Leakage */}
                    <div 
                      onClick={() => setActiveHotspot(activeHotspot === 4 ? null : 4)}
                      className="absolute -bottom-3 -left-4 cursor-pointer z-20"
                    >
                      <div className="flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-full border border-emerald-500 shadow-lg text-xs font-bold font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>4. Leakage Test: 0.00%</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/20 flex justify-between text-[10px] font-mono text-white/70">
                      <span>0.00 cc/min Leakage</span>
                      <span>N2 99.9%</span>
                    </div>
                  </div>
                </div>

                {/* Physical Action Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono font-bold">
                  <button
                    onClick={() => {
                      setNitrogenSealed(true);
                      triggerToast('Nitrogen flush & thermal weld complete (-45 kPa sealed).');
                    }}
                    className={`h-11 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                      nitrogenSealed ? 'bg-emerald-600 text-white' : 'bg-[#000000] text-white hover:bg-black/90'
                    }`}
                  >
                    <Wind className="w-3.5 h-3.5" />
                    <span>{nitrogenSealed ? 'Nitrogen Sealed' : 'Execute Nitrogen Seal'}</span>
                  </button>

                  <button
                    onClick={() => triggerToast('RFID tamper loop continuity verified (0 errors).')}
                    className="h-11 px-3 rounded-xl border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-[#151b2d] flex items-center justify-center gap-1.5"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Test RFID Loop</span>
                  </button>

                  <button
                    onClick={() => triggerToast('Aomori cedar aroma calibrated: 18mg micro-mist injected.')}
                    className="h-11 px-3 rounded-xl border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-[#151b2d] flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Aroma (18mg)</span>
                  </button>

                  <button
                    onClick={() => triggerToast('Thermal handoff pass printed for courier Julian R.')}
                    className="h-11 px-3 rounded-xl border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-[#151b2d] flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Pass</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: INSPECTOR DRAWER (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-6 shadow-xs space-y-5 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 space-y-2">
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-[10px] uppercase font-bold text-[#4b41e1]">Tier 01 Privé Elite</span>
                    <span className="font-bold text-[#151b2d]">#VIP-ELN-88390</span>
                  </div>
                  <h3 className="text-base font-bold text-[#151b2d]">Elena Vasiliev</h3>
                  <p className="text-[#45464d] text-[11px]">SoHo Penthouse Residence • Mercer St</p>
                  <div className="pt-2 border-t border-[#c6c6cd]/20 flex justify-between font-mono text-[11px]">
                    <span className="text-[#76777d]">Courier:</span>
                    <span className="font-bold text-[#4b41e1]">Julian R. (Unit #07)</span>
                  </div>
                </div>

                {/* 6 Verification Steps */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-[#151b2d]">Protocol Verification</h4>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      6 of 6 Confirmed
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {[
                      '1. Optical Lint & Fiber Micro-Sweep (Passed 16:02)',
                      '2. Aomori Cedar Chip in Collar (Verified 16:04)',
                      '3. Tailor Alteration Card Inserted (Verified 16:07)',
                      '4. Nitrogen Purge & Low-Vacuum (-45 kPa Active)',
                      '5. UHF RFID Tamper Wire Locked (Continuity OK)',
                      '6. White-Glove Van Rack #B-04 Staged'
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-[#f2f3ff]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="text-[#151b2d] text-[11px] font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dual Authorization */}
                <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono uppercase text-[#76777d] font-bold block">
                    Dual Workshop Authorization
                  </span>
                  <div className="flex justify-between items-center pt-1 font-mono">
                    <span className="font-semibold text-[#151b2d]">Mathilde B. (Packaging)</span>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold text-[#4b41e1]">Julian R. (Courier #07)</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => {
                    triggerToast('Bagging confirmed! Garment released to Courier Julian R. (Unit #07).');
                    setTimeout(() => {
                      if (onGoToCourier) onGoToCourier();
                    }, 500);
                  }}
                  className="w-full h-12 rounded-full bg-[#000000] text-white text-xs font-bold hover:bg-black/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Lock className="w-4 h-4 text-[#85f8c4]" />
                  <span>Release to Courier Unit #07</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/20 text-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#85f8c4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
