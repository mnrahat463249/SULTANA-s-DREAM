import React, { useState } from 'react';
import { 
  Diamond, LayoutDashboard, Truck, Package, Shirt, Lock, 
  Warehouse, UserCheck, Settings, AlertTriangle, Search, 
  ChevronRight, ArrowRight, Check, Play, Pause, Mic, 
  RotateCw, ZoomIn, Eye, Sparkles, Thermometer, Ruler, 
  Timer, Layers, Flame, CheckCircle2, ShieldCheck, Download
} from 'lucide-react';

export default function HandBastingWorkstationView({ 
  onBackToStore, 
  onGoToPressing, 
  onGoToCnc, 
  onGoToDispatch, 
  onGoToFulfillment, 
  onGoToVault, 
  onGoToVip 
}) {
  const [activePin, setActivePin] = useState(null);
  const [layers, setLayers] = useState({
    horsehair: true,
    silkThread: true,
    staystitch: true
  });
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentDrapeView, setCurrentDrapeView] = useState('front');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2600);
  };

  const toggleLayer = (layer) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
    triggerToast(`Schematic layer toggled`);
  };

  return (
    <div className="bg-[#faf8ff] text-[#151b2d] font-sans antialiased min-h-screen selection:bg-[#c3c0ff] selection:text-[#000000] flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 z-40 bg-white border-r border-[#c6c6cd]/30 hidden lg:flex flex-col justify-between py-6 px-4 shrink-0 fixed inset-y-0 left-0">
        <div>
          {/* Brand Crest */}
          <div className="px-2 pb-5 border-b border-[#c6c6cd]/20 flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#000000] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                A
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-[#151b2d]">AURA Atelier Ops</h1>
                <p className="text-[10px] text-[#45464d] font-mono">Ops Command v2.4</p>
              </div>
            </div>
            <span className="text-[9px] font-mono uppercase bg-[#eaedff] text-[#4b41e1] font-bold px-2 py-0.5 rounded">
              BENCH 02
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1 text-xs">
            <button
              onClick={onBackToStore}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview &amp; Store</span>
            </button>

            <button
              onClick={onGoToCnc}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>CNC Laser Cutter</span>
            </button>

            {/* Basting Bench 02 (ACTIVE) */}
            <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#000000] text-white font-bold shadow-sm">
              <div className="flex items-center gap-3">
                <Shirt className="w-4 h-4 text-[#85f8c4]" />
                <span>Hand Basting Bench</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white animate-pulse">
                STAGE 02
              </span>
            </div>

            <button
              onClick={onGoToPressing}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <Flame className="w-4 h-4 text-[#4b41e1]" />
              <span>Vacuum Press Buck</span>
            </button>

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
        <div className="pt-4 border-t border-[#c6c6cd]/20 space-y-3 text-xs">
          <div className="bg-[#f2f3ff] rounded-2xl p-3 border border-[#c6c6cd]/30 space-y-1.5 font-mono">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Caliper Precision
              </span>
              <span>±0.2mm</span>
            </div>
            <div className="flex items-center justify-between text-[#45464d]">
              <span>Horsehair Canvas</span>
              <span className="font-bold text-[#151b2d]">4-Ply Pad</span>
            </div>
          </div>

          <button
            onClick={() => triggerToast('Emergency bench lock engaged.')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 transition-colors text-[11px] font-bold uppercase font-mono"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency Halt</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN WRAPPER ================= */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-white/90 backdrop-blur-md border-b border-[#c6c6cd]/30">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-72 sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d]" />
              <input
                type="text"
                readOnly
                value="#ALT-401 (Elena Vasiliev - Structured Blazer)"
                className="w-full pl-9 pr-4 py-1.5 bg-[#f2f3ff] border border-[#c6c6cd]/40 rounded-full text-xs font-mono text-[#151b2d] cursor-default"
              />
            </div>

            <div className="hidden xl:flex items-center gap-2 text-xs text-[#45464d] font-mono">
              <span>Atelier</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Workshop Floors</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-bold text-[#151b2d] bg-[#f2f3ff] px-2 py-0.5 rounded">Bench #02</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerToast('Master Tailor inspection protocol verified.')}
              className="px-3.5 py-1.5 rounded-full border border-[#c6c6cd]/60 text-xs font-semibold text-[#151b2d] bg-white hover:bg-[#f2f3ff] transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Peer Sign-off</span>
            </button>

            <button
              onClick={onGoToPressing}
              className="px-4 py-1.5 rounded-full bg-[#000000] text-white text-xs font-bold hover:bg-black/90 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Send to Vacuum Press</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* WORKSPACE CANVAS */}
        <main className="p-4 md:p-8 flex-1 space-y-6">
          {/* 1. BENCH STATUS & TELEMETRY BANNER */}
          <section className="bg-white rounded-3xl border border-[#c6c6cd]/40 p-5 md:p-6 shadow-xs">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-[#c6c6cd]/40 bg-[#f2f3ff] shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                    alt="Mathilde B."
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold text-[#151b2d]">
                      Bench #02 — Artisanal Hand Basting &amp; Canvas Padding
                    </h2>
                    <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
                      In-Progress • 62%
                    </span>
                  </div>
                  <p className="text-xs text-[#45464d] mt-1 flex flex-wrap items-center gap-2">
                    <span>Master Artisan: <strong className="text-[#151b2d]">Mathilde B.</strong> (Milano Guild Master Concierge)</span>
                    <span>•</span>
                    <span>Ticket: <strong className="text-[#4b41e1] font-mono font-bold">#ALT-401</strong></span>
                    <span>•</span>
                    <span>Client: <strong className="text-[#151b2d]">Elena Vasiliev</strong> (#VIP-ELN-88390)</span>
                  </p>
                </div>
              </div>

              {/* Telemetry Widgets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f2f3ff] p-3 rounded-2xl border border-[#c6c6cd]/30 text-xs font-mono">
                <div className="px-2">
                  <span className="text-[10px] text-[#76777d] uppercase tracking-wider block">Lighting Temp</span>
                  <span className="font-bold text-[#151b2d] mt-0.5 block">5000K <span className="text-[10px] text-[#45464d] font-normal">98 CRI</span></span>
                </div>
                <div className="px-2 border-l border-[#c6c6cd]/30">
                  <span className="text-[10px] text-[#76777d] uppercase tracking-wider block">Ultrasonic Steam</span>
                  <span className="font-bold text-[#151b2d] mt-0.5 block">1.2 bar <span className="text-[10px] text-emerald-700 font-bold">READY</span></span>
                </div>
                <div className="px-2 border-l border-[#c6c6cd]/30">
                  <span className="text-[10px] text-[#76777d] uppercase tracking-wider block">Sleeve Pitch Delta</span>
                  <span className="font-bold text-[#4b41e1] mt-0.5 block">+0.5cm <span className="text-[10px]">2.1° FWD</span></span>
                </div>
                <div className="px-2 border-l border-[#c6c6cd]/30">
                  <span className="text-[10px] text-[#76777d] uppercase tracking-wider block">Bench Cycle</span>
                  <span className="font-bold text-[#151b2d] mt-0.5 block">22m <span className="text-[10px] text-[#76777d] font-normal">/ 35m</span></span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. MAIN 2-COLUMN STAGE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: GARMENT BENCH VIEWER (7 cols) */}
            <section className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl border border-[#c6c6cd]/40 overflow-hidden shadow-xs">
                {/* Viewport Toolbar */}
                <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-[#c6c6cd]/30 bg-white">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#151b2d]">
                      Elena Vasiliev — Structured Obsidian Wool Blazer
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#eaedff] text-[#4b41e1]">
                      Sz 40 • Charcoal
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs">
                    {['front', 'sleeve', 'back'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setCurrentDrapeView(mode)}
                        className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-all ${
                          currentDrapeView === mode
                            ? 'bg-[#000000] text-white font-bold'
                            : 'text-[#45464d] hover:bg-[#f2f3ff]'
                        }`}
                      >
                        {mode === 'front' ? 'Front Drape' : mode === 'sleeve' ? 'Armhole & Sleeve' : 'Back Pitch'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layer Toggles */}
                <div className="flex items-center justify-between px-5 py-2.5 bg-[#f2f3ff] border-b border-[#c6c6cd]/20 flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#45464d] font-semibold">Schematic Layers:</span>
                    <button
                      onClick={() => toggleLayer('horsehair')}
                      className={`px-2.5 py-1 rounded-full border text-xs flex items-center gap-1.5 transition-colors ${
                        layers.horsehair ? 'bg-white border-black text-black font-semibold' : 'bg-transparent border-[#c6c6cd] text-[#76777d]'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>4-Ply Horsehair Pad</span>
                    </button>
                    <button
                      onClick={() => toggleLayer('silkThread')}
                      className={`px-2.5 py-1 rounded-full border text-xs flex items-center gap-1.5 transition-colors ${
                        layers.silkThread ? 'bg-white border-black text-black font-semibold' : 'bg-transparent border-[#c6c6cd] text-[#76777d]'
                      }`}
                    >
                      <span>Mulberry Silk Thread</span>
                    </button>
                  </div>

                  <span className="text-emerald-700 font-mono text-[11px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Caliper Synced (±0.2mm)
                  </span>
                </div>

                {/* Interactive Tailor Canvas Stage */}
                <div className="relative w-full h-[480px] bg-[#f2f3ff]/50 flex items-center justify-center p-6 select-none overflow-hidden">
                  <div className="relative w-full max-w-sm h-[420px] rounded-2xl overflow-hidden border border-[#c6c6cd]/40 shadow-sm bg-white flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
                      alt="Garment on tailor bench"
                      className="w-full h-full object-cover"
                    />

                    {/* Hotspot 1: Cuff & Inseam Roll */}
                    <div 
                      onClick={() => setActivePin(activePin === 1 ? null : 1)}
                      className="absolute bottom-16 right-12 z-20 cursor-pointer group"
                    >
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-8 h-8 rounded-full bg-[#4b41e1]/30 animate-ping" />
                        <div className="w-7 h-7 rounded-full bg-[#4b41e1] text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform">
                          01
                        </div>
                      </div>
                      {activePin === 1 && (
                        <div className="absolute bottom-full right-0 mb-2 w-60 p-3 rounded-2xl bg-white border border-[#c6c6cd]/60 shadow-xl z-30 text-xs">
                          <div className="flex justify-between font-bold text-[#4b41e1] pb-1 border-b border-[#c6c6cd]/20">
                            <span>Pin 01 • Cuff Roll</span>
                            <span>VERIFIED</span>
                          </div>
                          <p className="text-[#45464d] mt-1 text-[11px]">
                            <strong>+0.5cm sleeve roll</strong> basted with contrast silk thread to clear client's Cartier Tank watch stack.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Hotspot 2: Shoulder Pitch */}
                    <div 
                      onClick={() => setActivePin(activePin === 2 ? null : 2)}
                      className="absolute top-16 right-16 z-20 cursor-pointer group"
                    >
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-8 h-8 rounded-full bg-black/20 animate-ping" />
                        <div className="w-7 h-7 rounded-full bg-[#000000] text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform">
                          02
                        </div>
                      </div>
                      {activePin === 2 && (
                        <div className="absolute top-full right-0 mt-2 w-64 p-3 rounded-2xl bg-white border border-[#c6c6cd]/60 shadow-xl z-30 text-xs">
                          <div className="flex justify-between font-bold text-[#151b2d] pb-1 border-b border-[#c6c6cd]/20">
                            <span>Pin 02 • Shoulder Pitch</span>
                            <span className="text-[#4b41e1]">ACTIVE</span>
                          </div>
                          <p className="text-[#45464d] mt-1 text-[11px]">
                            <strong>2.1° forward rotation angle</strong> basted through floating horsehair canvas to correct posture line.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Hotspot 3: Waist Suppression */}
                    <div 
                      onClick={() => setActivePin(activePin === 3 ? null : 3)}
                      className="absolute top-56 left-12 z-20 cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-full bg-white text-[#151b2d] border border-[#c6c6cd] flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform">
                        03
                      </div>
                      {activePin === 3 && (
                        <div className="absolute bottom-full left-0 mb-2 w-60 p-3 rounded-2xl bg-white border border-[#c6c6cd]/60 shadow-xl z-30 text-xs">
                          <div className="flex justify-between font-bold text-[#151b2d] pb-1 border-b border-[#c6c6cd]/20">
                            <span>Pin 03 • Waist Suppression</span>
                            <span>LOCKED</span>
                          </div>
                          <p className="text-[#45464d] mt-1 text-[11px]">
                            <strong>-1.2cm architectural taper</strong> pinned along bilateral side-seams matching bespoke fitting ticket.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Hotspot 4: Lapel Pad Stitch */}
                    <div 
                      onClick={() => setActivePin(activePin === 4 ? null : 4)}
                      className="absolute top-24 left-24 z-20 cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#85f8c4] text-[#002114] flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform">
                        04
                      </div>
                      {activePin === 4 && (
                        <div className="absolute bottom-full left-0 mb-2 w-64 p-3 rounded-2xl bg-white border border-[#c6c6cd]/60 shadow-xl z-30 text-xs">
                          <div className="flex justify-between font-bold text-emerald-800 pb-1 border-b border-[#c6c6cd]/20">
                            <span>Pin 04 • Lapel Pad Stitch</span>
                            <span>48 CHEVRONS</span>
                          </div>
                          <p className="text-[#45464d] mt-1 text-[11px]">
                            <strong>48 chevron stitches</strong> per lapel roll line for permanent curvature memory and natural roll.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Stage Controls */}
                <div className="px-5 py-3 bg-white border-t border-[#c6c6cd]/30 flex items-center justify-between flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#45464d]">Basting Thread:</span>
                    <span className="font-semibold text-[#151b2d]">12 Stitches/Inch Mulberry Silk (White #01 Contrast)</span>
                    <span className="text-[#76777d]">|</span>
                    <span className="text-[#45464d]">Tension: <strong className="text-[#151b2d]">0.8N</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => triggerToast('Rotating 3D basting preview...')}
                      className="px-3 h-8 rounded-full border border-[#c6c6cd]/60 text-xs font-medium hover:bg-[#f2f3ff] flex items-center gap-1"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Rotate 360°</span>
                    </button>
                    <button 
                      onClick={() => triggerToast('Zoomed to micro-pad chevron stitches.')}
                      className="px-3 h-8 rounded-full border border-[#c6c6cd]/60 text-xs font-medium hover:bg-[#f2f3ff] flex items-center gap-1"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Zoom Micro-Pad</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Linked Job Continuity Bar */}
              <div className="bg-white rounded-2xl border border-[#c6c6cd]/30 p-4 shadow-xs flex items-center justify-between flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#4b41e1] font-bold">
                    ALT
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-bold text-[#151b2d]">
                      <span>Job #CUT-8821</span>
                      <ChevronRight className="w-3 h-3 text-[#76777d]" />
                      <span className="text-[#4b41e1]">Ticket #ALT-401 (Bench 02)</span>
                      <ChevronRight className="w-3 h-3 text-[#76777d]" />
                      <span>Press Station #01</span>
                    </div>
                    <p className="text-[#45464d] text-[11px] mt-0.5">
                      Loro Piana 130s Obsidian Charcoal Wool • NFC Tag UID: <code className="font-mono bg-[#f2f3ff] px-1 rounded">0x39af...e4b9</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#45464d]">Assigned Courier:</span>
                  <span className="px-2.5 py-1 rounded-full bg-[#f2f3ff] font-semibold text-[#151b2d] flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#4b41e1]" />
                    <span>Julian R. (Unit #07)</span>
                  </span>
                </div>
              </div>
            </section>

            {/* RIGHT: MASTER TAILOR INSPECTION LEDGER (5 cols) */}
            <section className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl border border-[#c6c6cd]/40 p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-[#c6c6cd]/20 pb-3 text-xs">
                  <div>
                    <h3 className="font-bold text-sm text-[#151b2d]">Master Tailor Inspection Ledger</h3>
                    <span className="text-[#45464d] text-[11px]">Ticket #ALT-401 • Mathilde B. Hand Execution</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#eaedff] text-[#4b41e1] font-mono font-bold text-[10px] uppercase">
                    Step 4 / 6 Active
                  </span>
                </div>

                {/* Step-by-Step Checklist */}
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-[#151b2d]">
                        <span className="line-through text-[#76777d]">1. Verify CNC laser micro-notches</span>
                        <span className="text-[10px] font-mono text-[#76777d]">14:45 Verified</span>
                      </div>
                      <p className="text-[11px] text-[#45464d] mt-0.5">Matched against Loro Piana 130s warp/weft grainlines.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-[#151b2d]">
                        <span className="line-through text-[#76777d]">2. Float 4-ply horsehair chest canvas</span>
                        <span className="text-[10px] font-mono text-[#76777d]">15:02 Completed</span>
                      </div>
                      <p className="text-[11px] text-[#45464d] mt-0.5">Canvas pinned with bias linen stay-tape along armhole apex.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between font-bold text-[#151b2d]">
                        <span className="line-through text-[#76777d]">3. Pad-stitch lapel roll with silk</span>
                        <span className="text-[10px] font-mono text-[#76777d]">15:18 Completed</span>
                      </div>
                      <p className="text-[11px] text-[#45464d] mt-0.5">48 chevron hand stitches applied for permanent roll curvature.</p>
                    </div>
                  </div>

                  {/* ACTIVE STEP 4 */}
                  <div className="p-3.5 rounded-2xl bg-white border-2 border-[#000000] shadow-sm space-y-2">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[#151b2d]">4. Pin &amp; baste sleeve head roll</span>
                      <span className="text-[#4b41e1] font-mono text-[10px] uppercase">80% In-Progress</span>
                    </div>
                    <p className="text-xs text-[#45464d] leading-relaxed">
                      Adjusting <strong>+0.5cm Cartier Tank reveal</strong> and setting <strong>2.1° forward rotation angle</strong>. Check seam allowances before final basting knot.
                    </p>
                    <div className="w-full bg-[#eaedff] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#4b41e1] h-full rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#f2f3ff]/40 border border-[#c6c6cd]/20 opacity-60">
                    <span className="font-medium text-[#151b2d]">5. Final steam block: 1.2 bar vacuum (Queued)</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#f2f3ff]/40 border border-[#c6c6cd]/20 opacity-40">
                    <span className="font-medium text-[#151b2d]">6. NFC tag cryptographic sealing (Queued)</span>
                  </div>
                </div>

                {/* Master Tailor Audio Dictation Memo Player */}
                <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-[#151b2d]">
                      <Mic className="w-4 h-4 text-[#4b41e1]" />
                      <span>Audio Dictation Memo • Mathilde B.</span>
                    </div>
                    <span className="text-[11px] text-[#45464d] font-mono">15:20 (0:42)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-8 h-8 rounded-full bg-[#000000] text-white flex items-center justify-center hover:bg-black/90 active:scale-90 transition-all shadow-xs"
                    >
                      {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                    <div className="flex-1 flex items-center gap-1">
                      {[12, 20, 8, 24, 16, 20, 8, 24, 12, 16, 8, 20, 4, 16, 8].map((h, i) => (
                        <span
                          key={i}
                          style={{ height: `${h}px` }}
                          className={`w-1 rounded-full transition-all ${
                            isPlayingAudio && i < 8 ? 'bg-[#4b41e1]' : 'bg-[#c6c6cd]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] italic text-[#45464d]">
                    "Sleeve pitch rotation verified against 3D LiDAR avatar; drape is exquisite. Clearing 0.5cm for wrist watch is flawless."
                  </p>
                </div>

                {/* Primary & Secondary Actions */}
                <div className="space-y-2 pt-2 border-t border-[#c6c6cd]/20">
                  <button
                    onClick={() => {
                      triggerToast('Basting verified! Transitioning to Vacuum Press (#PRESS-01)...');
                      setTimeout(() => {
                        if (onGoToPressing) onGoToPressing();
                      }, 500);
                    }}
                    className="w-full h-12 rounded-full bg-[#000000] text-white text-xs font-bold hover:bg-black/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#85f8c4]" />
                    <span>Complete Basting &amp; Send to Vacuum Press</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => triggerToast('Basting adjustments committed to digital wardrobe ledger.')}
                      className="py-2.5 rounded-xl border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-[#151b2d] font-semibold"
                    >
                      Export Log
                    </button>
                    <button
                      onClick={() => triggerToast('Fit anomaly flagged for head cutter review.')}
                      className="py-2.5 rounded-xl border border-red-300 bg-white hover:bg-red-50 text-red-700 font-semibold"
                    >
                      Flag Anomaly
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 3. BENCH STAGED QUEUE */}
          <section className="bg-white rounded-3xl border border-[#c6c6cd]/40 p-5 md:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-[#4b41e1]" />
                <h4 className="font-bold text-sm text-[#151b2d]">Bench #02 Staged Queued Garments</h4>
                <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-xs font-mono text-[#45464d] font-bold">
                  3 Waiting
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 flex items-center gap-3">
                <div className="w-12 h-14 rounded-xl bg-white overflow-hidden shrink-0 border border-[#c6c6cd]/30">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop"
                    alt="Camille"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between font-mono font-bold text-[#4b41e1]">
                    <span>#ALT-402</span>
                    <span className="text-[10px] uppercase text-[#76777d]">Priority 1</span>
                  </div>
                  <h5 className="font-bold text-[#151b2d] truncate">Camille Laurent</h5>
                  <p className="text-[#45464d] text-[11px] truncate">Silk Column Slip Dress • French hem</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 flex items-center gap-3">
                <div className="w-12 h-14 rounded-xl bg-white overflow-hidden shrink-0 border border-[#c6c6cd]/30">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
                    alt="Alexandre"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between font-mono font-bold text-[#4b41e1]">
                    <span>#ALT-403</span>
                    <span className="text-[10px] uppercase text-[#76777d]">Priority 2</span>
                  </div>
                  <h5 className="font-bold text-[#151b2d] truncate">Alexandre Dumas</h5>
                  <p className="text-[#45464d] text-[11px] truncate">Cashmere Overcoat • +1.5cm Sleeve</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 flex items-center gap-3">
                <div className="w-12 h-14 rounded-xl bg-white overflow-hidden shrink-0 border border-[#c6c6cd]/30">
                  <img
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=300&auto=format&fit=crop"
                    alt="Sophia"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between font-mono font-bold text-[#4b41e1]">
                    <span>#ALT-404</span>
                    <span className="text-[10px] uppercase text-[#76777d]">Standard</span>
                  </div>
                  <h5 className="font-bold text-[#151b2d] truncate">Sophia Lorenzi</h5>
                  <p className="text-[#45464d] text-[11px] truncate">Sculpted Leather Handbag Lining</p>
                </div>
              </div>
            </div>
          </section>
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
