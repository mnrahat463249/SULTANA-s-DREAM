import React, { useState } from 'react';
import { 
  Diamond, LayoutDashboard, Truck, Package, Shirt, Lock, 
  Warehouse, UserCheck, Settings, AlertTriangle, Search, 
  ChevronRight, ArrowRight, Check, Play, Pause, Mic, 
  RotateCw, ZoomIn, Eye, Sparkles, Thermometer, Ruler, 
  Timer, Layers, Flame, CheckCircle2, ShieldCheck, Download,
  Radio, Zap, Maximize2, SlidersHorizontal, Terminal, FileText,
  Fingerprint, CheckSquare, Square, QrCode, Flag, Bell, Sliders, Scissors
} from 'lucide-react';

export default function FinalQcWorkstationView({
  onBackToStore,
  onGoToDoorstepNfc,
  onGoToPressing,
  onGoToBagging,
  onGoToDispatch,
  onGoToVault,
  onGoToVip,
  onGoToFittings
}) {
  const [activeHotspot, setActiveHotspot] = useState(1);
  const [isHornPulsing, setIsHornPulsing] = useState(false);
  const [isWelded, setIsWelded] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([1, 2, 3]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTriggerHornPulse = () => {
    setIsHornPulsing(true);
    triggerToast('Ultrasonic Horn 35kHz / 800W Resonator Pulsing...');
    setTimeout(() => {
      setIsHornPulsing(false);
      triggerToast('Pneumatic Anvil 2.4 BAR Weld Completed (Energy: 420 Joules)');
    }, 1800);
  };

  const handleNfcReadWrite = () => {
    triggerToast('NFC NTAG424 DNA Sun Crypto Interrogated (-42 dBm) • UID: 0x8921-zkNFC');
  };

  const handleOpticalScan = () => {
    triggerToast('Optical Photogrammetry: 0.00mm delta across 24 mesh nodes');
  };

  const handleTensionProbe = () => {
    triggerToast('Tensile Test: 0.8N Mulberry Silk gorge confirmed');
  };

  const handleCompleteWeldAndCert = () => {
    setIsWelded(true);
    if (!completedSteps.includes(4)) {
      setCompletedSteps([...completedSteps, 4, 5]);
    }
    triggerToast('zkEVM Certificate AURA-CERT-ELN-88390-2025 Generated & Anchored to Block #19824102');
  };

  const hotspots = [
    {
      id: 1,
      title: 'HOTSPOT 01 • NFC ALIGNMENT',
      top: '38%',
      left: '28%',
      badge: '99.8% ACC',
      desc: 'Micro-cavity welt positioned 4.2cm below left lapel gorge. Signal strength -42 dBm (Excellent resonance).'
    },
    {
      id: 2,
      title: 'HOTSPOT 02 • ULTRASONIC HORN',
      top: '52%',
      left: '48%',
      badge: '2.4 BAR',
      desc: '2.4 bar pneumatic pressure with zero-needle stitchless seal (watertight hermetic seal, invisible exterior drape).'
    },
    {
      id: 3,
      title: 'HOTSPOT 03 • SLEEVE INSEAM',
      top: '74%',
      left: '20%',
      badge: 'PASSED',
      desc: '+0.5cm Cartier Tank watch reveal verified with digital optical calipers (Passed 0.0mm tol).'
    },
    {
      id: 4,
      title: 'HOTSPOT 04 • LAPEL ROLL MEMORY',
      top: '24%',
      left: '68%',
      badge: '0.4 BAR',
      desc: '48 chevron stitches settled, 0.4 bar vacuum memory set verified.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-[#151B2D] font-sans antialiased flex flex-col xl:flex-row pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-5 py-2.5 rounded-full text-xs font-mono tracking-wide shadow-2xl border border-neutral-700 flex items-center gap-2 animate-bounce">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIDE NAVIGATION BAR (AURA Atelier Ops)                                   */}
      {/* ========================================================================= */}
      <aside className="w-full xl:w-64 bg-white border-r border-neutral-200/80 p-5 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-bold text-lg tracking-tight shadow-sm">
              A
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-neutral-900 leading-none">
                AURA Atelier Ops
              </h1>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-neutral-500 font-mono tracking-wider">
                  NY SoHo Hub #01 • HSM ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            <button 
              onClick={onBackToStore}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors text-left"
            >
              <LayoutDashboard className="w-4 h-4 text-neutral-500" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">Storefront & Overview</span>
            </button>

            <button 
              onClick={onGoToDispatch}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors text-left"
            >
              <Truck className="w-4 h-4 text-neutral-500" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">Dispatch & Fleet</span>
            </button>

            {/* Orders & Fulfillment (Active Substation) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-black text-white font-semibold shadow-sm">
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold uppercase tracking-wider text-[11px]">Orders & Fulfillment</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div className="ml-6 mr-1 py-1.5 px-2.5 rounded-md bg-[#4B41E1]/10 border border-[#4B41E1]/20 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4B41E1] animate-ping"></span>
                  <span className="text-[10px] font-mono font-semibold text-[#4B41E1]">Final QC & NFC #01</span>
                </div>
                <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-[#4B41E1] text-white font-bold">LIVE</span>
              </div>
            </div>

            <button 
              onClick={onGoToFittings}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors text-left"
            >
              <Shirt className="w-4 h-4 text-neutral-500" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">In-Home Try-Ons</span>
            </button>

            <button 
              onClick={onGoToDoorstepNfc}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#4B41E1] bg-[#4B41E1]/5 border border-[#4B41E1]/15 hover:bg-[#4B41E1]/10 transition-colors text-left"
            >
              <Radio className="w-4 h-4 text-[#4B41E1]" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">Doorstep NFC App</span>
            </button>

            <button 
              onClick={onGoToVault}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors text-left"
            >
              <Lock className="w-4 h-4 text-neutral-500" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">Vault Mint & Provenance</span>
            </button>

            <button 
              onClick={onGoToVip}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors text-left"
            >
              <Diamond className="w-4 h-4 text-neutral-500" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">VIP Client CRM</span>
            </button>
          </nav>
        </div>

        {/* Drawer Footer Actions */}
        <div className="pt-4 border-t border-neutral-200 space-y-2">
          <button 
            onClick={() => triggerToast('Emergency protocol standby: Stations locked')}
            className="w-full py-2 px-3 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency Protocol</span>
          </button>
          <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1 pt-1 font-mono">
            <span className="flex items-center gap-1 cursor-pointer hover:text-black">
              <FileText className="w-3.5 h-3.5" /> Docs
            </span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-black">
              <Terminal className="w-3.5 h-3.5" /> Terminal
            </span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN WORKSPACE CANVAS                                                     */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top App Bar */}
        <header className="h-16 px-6 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-4 min-w-0">
            <div className="hidden md:flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <span className="font-semibold text-neutral-900">Atelier Ops</span>
              <span>/</span>
              <span>Workshop Floors</span>
              <span>/</span>
              <span className="text-black font-bold">Final QC & NFC Sealing Welt</span>
            </div>
            {/* Ticket Search Bar */}
            <div className="relative w-64 md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                readOnly 
                value="#ALT-401 (Elena Vasiliev - Structured Obsidian Wool Blazer Sz 40)"
                className="w-full h-8 pl-9 pr-3 text-[11px] font-mono bg-neutral-100/80 border border-neutral-200 rounded-full text-neutral-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-neutral-600">
              <span className="hover:text-black cursor-pointer">Telemetry</span>
              <span className="hover:text-black cursor-pointer">Courier Mesh</span>
              <span className="font-bold text-[#4B41E1] flex items-center gap-1">
                Approvals Queue <span className="px-1.5 py-0.5 rounded-full bg-[#4B41E1] text-white text-[10px]">4</span>
              </span>
            </div>
            <div className="h-4 w-px bg-neutral-200 hidden lg:block"></div>
            <button 
              onClick={() => triggerToast('Emergency Halt Activated')}
              className="h-8 px-3 rounded-full border border-rose-300 text-rose-700 bg-rose-50/60 text-xs font-semibold hover:bg-rose-100 transition-colors"
            >
              Emergency Halt
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
                MB
              </div>
              <div className="hidden 2xl:block text-left text-xs leading-tight">
                <p className="font-bold text-neutral-900">Mathilde B.</p>
                <p className="text-[10px] text-neutral-500 font-mono">Senior QA Lead</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-5 lg:p-6 space-y-5 flex-1">
          {/* LINEAGE BREADCRUMB HEADER STRIP */}
          <div className="bg-white border border-neutral-200 rounded-xl px-4 py-3 shadow-xs flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono py-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 text-neutral-600 whitespace-nowrap">
                <Scissors className="w-3.5 h-3.5" />
                <span>Job #CUT-8821</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              <button 
                onClick={onGoToPressing}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 text-neutral-600 hover:bg-neutral-200 whitespace-nowrap"
              >
                <Shirt className="w-3.5 h-3.5" />
                <span>Basting Bench #02</span>
              </button>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              <button 
                onClick={onGoToPressing}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 text-neutral-600 hover:bg-neutral-200 whitespace-nowrap"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Press Buck Station #01 (15:48)</span>
              </button>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#4B41E1] text-white font-semibold shadow-xs whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Final QC & NFC Sealing (Current)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              <button 
                onClick={onGoToDoorstepNfc}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 text-neutral-600 hover:bg-neutral-200 whitespace-nowrap"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Julian R. Unit #07</span>
              </button>
            </div>

            {/* Target Dispatch Badge */}
            <div className="flex items-center gap-2 bg-neutral-100/90 border border-neutral-200 px-3 py-1 rounded-lg text-xs">
              <Timer className="w-3.5 h-3.5 text-[#4B41E1]" />
              <span className="text-neutral-700">Target Dispatch: <strong className="font-mono text-black font-bold">17:00 EST</strong></span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                52m remaining
              </span>
            </div>
          </div>

          {/* 1. TOP TELEMETRY SENSOR STRIP */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Node 1: Optical LiDAR Spec */}
            <div className="bg-white border border-neutral-200 rounded-xl p-3.5 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="font-mono uppercase text-[10px] tracking-wider">Optical LiDAR Spec</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="my-1.5">
                <div className="text-xl font-bold text-neutral-900 tracking-tight font-mono">0.0 mm</div>
                <p className="text-[11px] text-neutral-500">24 photogrammetry nodes</p>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[10px] font-mono">
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">PASSED TOLERANCE</span>
                <span className="text-neutral-400">0.05mm max</span>
              </div>
            </div>

            {/* Node 2: Ultrasonic Horn Resonator */}
            <div className="bg-white border border-neutral-200 rounded-xl p-3.5 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="font-mono uppercase text-[10px] tracking-wider">Horn Resonator</span>
                <span className={`w-2 h-2 rounded-full ${isHornPulsing ? 'bg-amber-500 animate-ping' : 'bg-[#4B41E1]'}`}></span>
              </div>
              <div className="my-1.5">
                <div className="text-xl font-bold text-neutral-900 tracking-tight font-mono">35 kHz / 800W</div>
                <p className="text-[11px] text-neutral-500">Pneumatic Horn Ready</p>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[10px] font-mono">
                <span className="text-[#4B41E1] bg-[#4B41E1]/10 px-1.5 py-0.5 rounded font-bold">FREQ LOCKED</span>
                <span className="text-neutral-400">Instant Bond</span>
              </div>
            </div>

            {/* Node 3: NFC Microchip UID */}
            <div className="bg-white border border-neutral-200 rounded-xl p-3.5 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="font-mono uppercase text-[10px] tracking-wider">NFC Chip State</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <div className="my-1.5">
                <div className="text-lg font-mono font-bold text-neutral-900 tracking-tight">0x8921-zkNFC</div>
                <p className="text-[11px] text-neutral-500">NTAG424 DNA Sun Crypto</p>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[10px] font-mono">
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">DETECTED (-42dBm)</span>
                <span className="text-neutral-400">Slot #A4</span>
              </div>
            </div>

            {/* Node 4: zkEVM State Anchor */}
            <div className="bg-white border border-neutral-200 rounded-xl p-3.5 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="font-mono uppercase text-[10px] tracking-wider">zkEVM State Anchor</span>
                <span className="w-2 h-2 rounded-full bg-[#4B41E1]"></span>
              </div>
              <div className="my-1.5">
                <div className="text-lg font-mono font-bold text-neutral-900 tracking-tight">#19824102</div>
                <p className="text-[11px] text-neutral-500">Polygon zkEVM Rollup</p>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[10px] font-mono">
                <span className="text-[#4B41E1] bg-[#4B41E1]/10 px-1.5 py-0.5 rounded font-bold">SYNCED</span>
                <span className="text-neutral-400">Gas: 14 Gwei</span>
              </div>
            </div>

            {/* Node 5: Stage Progress Indicator */}
            <div className="bg-white border-2 border-[#4B41E1]/30 rounded-xl p-3.5 flex flex-col justify-between shadow-xs bg-gradient-to-br from-white to-[#FAF8FF]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono uppercase text-[#4B41E1] text-[10px] tracking-wider font-bold">Gate Inspection</span>
                <span className="px-1.5 py-0.5 rounded bg-[#4B41E1] text-white font-mono text-[9px] font-bold">
                  {isWelded ? 'STAGE 6 OF 6' : 'STAGE 5 OF 6'}
                </span>
              </div>
              <div className="my-1.5">
                <div className="text-base font-bold text-neutral-900 leading-tight">
                  {isWelded ? 'SEAL VERIFIED' : 'ULTRASONIC WELT'}
                </div>
                <p className="text-[11px] text-neutral-500">
                  {isWelded ? 'Ready for Hermetic Bagging' : 'Pulse Cycle: Ready to Bond'}
                </p>
              </div>
              <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#4B41E1] h-full rounded-full transition-all duration-500" 
                  style={{ width: isWelded ? '100%' : '83%' }}
                ></div>
              </div>
            </div>
          </section>

          {/* 2 & 3. MAIN WORKSTATION GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* CENTRAL INSPECTION CANVAS & HORN CONTROLS (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs relative">
                {/* Canvas Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-neutral-900">Interactive Optical Welt Easel</h2>
                      <span className="px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-mono text-neutral-600">
                        Macro Optical 12x Lens
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Obsidian Wool Tailored Blazer • Breast Pocket Interior Facing Silk Welt
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-mono border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Optical Alignment: Lock
                    </span>
                    <button 
                      onClick={() => triggerToast('12x Macro Zoom View toggled')}
                      className="h-8 px-2.5 rounded-lg border border-neutral-200 text-xs font-mono text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center gap-1"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Zoom</span>
                    </button>
                  </div>
                </div>

                {/* MACRO INSPECTION VIEWPORT WITH INTERACTIVE HOTSPOTS */}
                <div className="relative mt-4 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-900 aspect-16/9 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=85" 
                    alt="Artisanal obsidian wool suit jacket interior facing with silk breast welt pocket"
                    className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
                  />

                  {/* Reticle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

                  {/* Center Optical Caliper HUD Reticle */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 rounded-full border border-[#4B41E1]/40 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full border border-dashed border-[#4B41E1]/60 animate-spin" style={{ animationDuration: '28s' }}></div>
                    </div>
                    <div className="absolute w-px h-56 bg-[#4B41E1]/30"></div>
                    <div className="absolute h-px w-56 bg-[#4B41E1]/30"></div>
                  </div>

                  {/* HOTSPOTS */}
                  {hotspots.map((h) => {
                    const isCurrent = activeHotspot === h.id;
                    return (
                      <div 
                        key={h.id}
                        onClick={() => setActiveHotspot(h.id)}
                        style={{ top: h.top, left: h.left }}
                        className="absolute group cursor-pointer -translate-x-1/2 -translate-y-1/2 z-20"
                      >
                        <div className="relative flex items-center justify-center">
                          {isCurrent && <div className="w-7 h-7 rounded-full bg-[#4B41E1]/40 animate-ping absolute"></div>}
                          <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-lg transition-transform ${
                            isCurrent ? 'bg-[#4B41E1] text-white scale-110' : 'bg-black/80 text-white hover:scale-105'
                          }`}>
                            {h.id}
                          </div>
                        </div>

                        {/* Hover/Active Tooltip */}
                        <div className={`absolute left-7 top-1/2 -translate-y-1/2 w-64 bg-white/95 backdrop-blur-md p-3 rounded-lg border border-neutral-200 shadow-xl z-30 transition-all ${
                          isCurrent ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100'
                        }`}>
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#4B41E1] font-bold mb-1">
                            <span>{h.title}</span>
                            <span className="text-emerald-700">{h.badge}</span>
                          </div>
                          <p className="text-xs text-neutral-800 leading-snug font-sans">
                            {h.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Caliper Readout Badge Bottom-Right */}
                  <div className="absolute bottom-3 right-3 bg-neutral-900/90 backdrop-blur-md text-white px-3 py-2 rounded-lg border border-[#4B41E1]/30 text-xs font-mono space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 text-[10px]">PNEUMATIC ANCHOR:</span>
                      <span className="text-emerald-400 font-bold text-[10px]">ENGAGED</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 text-[10px]">CHIP ENCAPSULATION:</span>
                      <span className="text-neutral-200 text-[10px]">SILK WEFT 100D</span>
                    </div>
                  </div>
                </div>

                {/* ULTRASONIC HORN TOOLHEAD CONTROLS & TELEMETRY */}
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-[#4B41E1]" />
                      <span className="text-xs font-mono font-bold uppercase text-neutral-900">
                        Horn Toolhead Trigger & Calibration
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                      <span>Resonance: <strong className="text-neutral-900">99.4%</strong></span>
                      <span>Anvil Gap: <strong className="text-neutral-900">0.42mm</strong></span>
                    </div>
                  </div>

                  {/* Weld Parameter Metrics Strip */}
                  <div className="grid grid-cols-5 gap-2 bg-neutral-50 rounded-xl p-3 border border-neutral-200 text-center font-mono mb-4 text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-500 block">FREQUENCY</span>
                      <span className="font-bold text-neutral-900">35.0 kHz</span>
                    </div>
                    <div className="border-l border-neutral-200">
                      <span className="text-[10px] text-neutral-500 block">WELD TIME</span>
                      <span className="font-bold text-neutral-900">0.65 s</span>
                    </div>
                    <div className="border-l border-neutral-200">
                      <span className="text-[10px] text-neutral-500 block">HOLD TIME</span>
                      <span className="font-bold text-neutral-900">1.20 s</span>
                    </div>
                    <div className="border-l border-neutral-200">
                      <span className="text-[10px] text-neutral-500 block">ENERGY</span>
                      <span className="font-bold text-[#4B41E1]">420 Joules</span>
                    </div>
                    <div className="border-l border-neutral-200">
                      <span className="text-[10px] text-neutral-500 block">AMPLITUDE</span>
                      <span className="font-bold text-emerald-700">100%</span>
                    </div>
                  </div>

                  {/* Action Controls Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    <button 
                      onClick={handleTriggerHornPulse}
                      disabled={isHornPulsing}
                      className={`h-11 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm ${
                        isHornPulsing 
                          ? 'bg-[#4B41E1] text-white animate-pulse' 
                          : 'bg-black text-white hover:bg-neutral-800'
                      }`}
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>{isHornPulsing ? 'Pulsing Horn...' : 'Trigger Horn Pulse'}</span>
                    </button>

                    <button 
                      onClick={handleNfcReadWrite}
                      className="h-11 px-3 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 active:scale-98 transition-colors"
                    >
                      <Radio className="w-4 h-4 text-[#4B41E1]" />
                      <span>NFC Read/Write Test</span>
                    </button>

                    <button 
                      onClick={handleOpticalScan}
                      className="h-11 px-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-neutral-50 active:scale-98 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-neutral-600" />
                      <span>Optical Grain Scan</span>
                    </button>

                    <button 
                      onClick={handleTensionProbe}
                      className="h-11 px-3 rounded-xl bg-white border border-neutral-200 text-neutral-900 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-neutral-50 active:scale-98 transition-colors"
                    >
                      <Ruler className="w-4 h-4 text-neutral-600" />
                      <span>Tension Probe (0.8N)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT RAIL: MASTER INSPECTOR LEDGER & CRYPTOGRAPHIC PROVENANCE (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Ticket Information Card */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#4B41E1]" />
                    <span className="text-base font-bold text-neutral-900">Ticket #ALT-401</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#4B41E1]/10 text-[#4B41E1] text-[11px] font-mono font-bold border border-[#4B41E1]/20">
                    Tier 01 Privé Elite
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Client:</span>
                    <strong className="text-neutral-900">Elena Vasiliev</strong>
                  </div>
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-neutral-500">Vault ID:</span>
                    <span className="text-[#4B41E1] font-bold">#VIP-ELN-88390</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Garment:</span>
                    <span className="text-neutral-900 text-right font-medium">Structured Obsidian Wool Blazer (Sz 40)</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-neutral-200 text-[11px]">
                    <span className="text-neutral-500">Assigned Inspectors:</span>
                    <span className="text-neutral-900 font-semibold">Mathilde B. & Julian R.</span>
                  </div>
                </div>

                {/* QC Inspection Checklist */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase text-neutral-700 font-bold">
                    <span>QC Inspection Protocol</span>
                    <span className="text-[#4B41E1]">{completedSteps.length} / 6 COMPLETE</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* Step 1 */}
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-neutral-50 border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center text-neutral-900 font-semibold">
                          <span>1. Optical LiDAR biometric delta</span>
                          <span className="font-mono text-[10px] text-emerald-700">15:50</span>
                        </div>
                        <p className="text-[11px] text-neutral-500">0.0mm variance against 3D fitting avatar</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-neutral-50 border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center text-neutral-900 font-semibold">
                          <span>2. Seam tensile strength & thread tension</span>
                          <span className="font-mono text-[10px] text-emerald-700">15:52</span>
                        </div>
                        <p className="text-[11px] text-neutral-500">0.8N mulberry silk confirmed across all gorges</p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-neutral-50 border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center text-neutral-900 font-semibold">
                          <span>3. Surface sheen & zero-glaze optical check</span>
                          <span className="font-mono text-[10px] text-emerald-700">15:55</span>
                        </div>
                        <p className="text-[11px] text-neutral-500">Pure matte Obsidian Melange under 5000K light</p>
                      </div>
                    </div>

                    {/* Step 4 (ACTIVE / Completed) */}
                    <div className={`flex items-start gap-2.5 p-2.5 rounded-lg border-2 transition-all ${
                      completedSteps.includes(4) 
                        ? 'bg-emerald-50/50 border-emerald-500/30' 
                        : 'bg-[#4B41E1]/5 border-[#4B41E1]/40 shadow-xs'
                    }`}>
                      {completedSteps.includes(4) ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Radio className="w-4 h-4 text-[#4B41E1] shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '4s' }} />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-center font-bold">
                          <span className={completedSteps.includes(4) ? 'text-emerald-900' : 'text-[#4B41E1]'}>
                            4. Ultrasonic weld & NFC anchoring
                          </span>
                          <span className={`font-mono text-[10px] px-1.5 rounded ${
                            completedSteps.includes(4) ? 'bg-emerald-100 text-emerald-800' : 'bg-[#4B41E1] text-white'
                          }`}>
                            {completedSteps.includes(4) ? 'SEALED' : 'ACTIVE'}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-700 mt-0.5">
                          Chip UID 0x8921-zkNFC loaded in horn clamp
                        </p>
                      </div>
                    </div>

                    {/* Step 5 */}
                    <div className={`flex items-start gap-2.5 p-2 rounded-lg border ${
                      completedSteps.includes(5) 
                        ? 'bg-emerald-50/50 border-emerald-500/30' 
                        : 'bg-white border-neutral-200 opacity-60'
                    }`}>
                      {completedSteps.includes(5) ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <span className="text-neutral-900 font-medium">5. Digital Twin Mint & zk-SNARK attestation</span>
                        <p className="text-[10px] text-neutral-500">Transfer proof to client vault wallet</p>
                      </div>
                    </div>

                    {/* Step 6 */}
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-neutral-200 opacity-60">
                      <Square className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="text-neutral-900 font-medium">6. Hermetic garment bag cedar seal</span>
                        <p className="text-[10px] text-neutral-500">Tamper-proof RFID courier dispatch tag</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cryptographic Proof Signing Box */}
                <div className="p-3.5 rounded-xl bg-neutral-900 text-neutral-300 space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-emerald-400">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="font-bold text-[11px]">PROVENANCE HSM ENCLAVE</span>
                    </div>
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800">ONLINE</span>
                  </div>
                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span className="opacity-70">Hardware Key:</span>
                      <span className="text-white font-semibold">HSM-SoHo-01 Locked</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Alteration Hash:</span>
                      <span className="text-emerald-400">0x39af...e4b9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Digital Certificate:</span>
                      <span className="text-white">AURA-CERT-ELN-88390-2025</span>
                    </div>
                  </div>
                </div>

                {/* Primary & Secondary Action Trigger Cluster */}
                <div className="space-y-2 pt-1">
                  <button 
                    onClick={handleCompleteWeldAndCert}
                    className="w-full h-12 rounded-xl bg-black text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-98 transition-transform shadow-md"
                  >
                    <Fingerprint className="w-5 h-5 text-emerald-400" />
                    <span>{isWelded ? 'zkEVM Certificate Synced • Proceed' : 'Weld NFC Tag & Generate zkEVM Certificate'}</span>
                  </button>

                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                    <button 
                      onClick={() => triggerToast('Artisan Voice Dictation Logged (12s)')}
                      className="py-2 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Voice Log</span>
                    </button>
                    <button 
                      onClick={() => triggerToast('QR Verification Pass Printed for Unit #07')}
                      className="py-2 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-800 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Print QR</span>
                    </button>
                    <button 
                      onClick={() => triggerToast('Quality Defect Flagged: Staged for Tailor Review')}
                      className="py-2 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>Flag Defect</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. BOTTOM QUEUE: STAGED FOR FINAL QC & DISPATCH BAY */}
          <section className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#4B41E1]" />
                <h3 className="text-sm font-bold text-neutral-900">
                  Press Station #01 Outfeed → Staged For Final QC
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-xs font-mono font-bold text-neutral-600">
                  3 Queued
                </span>
              </div>

              {/* Courier Dispatch Bay Status Widget */}
              <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 px-3.5 py-1.5 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-neutral-900">Courier Dispatch Bay:</span>
                  <span className="font-mono text-[#4B41E1] font-bold">Julian R. • Unit #07 (Electric Sprinter)</span>
                </div>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500 font-mono text-[11px]">Dock Ready • 17:00 EST Departure • 4 Stops</span>
              </div>
            </div>

            {/* Horizontal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {/* Queue Item 1 */}
              <div className="p-3 rounded-xl border border-neutral-200 bg-[#FAF8FF] hover:border-[#4B41E1]/40 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-neutral-200 flex items-center justify-center font-mono text-xs font-bold text-[#4B41E1]">
                    #402
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Camille Laurent</div>
                    <p className="text-[11px] text-neutral-500">Silk Column Slip Dress (Sz 38 Repl.)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold block">
                    NFC WELT READY
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">Next in Line</span>
                </div>
              </div>

              {/* Queue Item 2 */}
              <div className="p-3 rounded-xl border border-neutral-200 bg-[#FAF8FF] hover:border-[#4B41E1]/40 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-neutral-200 flex items-center justify-center font-mono text-xs font-bold text-neutral-700">
                    #403
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Alexandre Dumas</div>
                    <p className="text-[11px] text-neutral-500">Double-Breasted Cashmere Coat (42L)</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono font-bold block">
                    PRESS COOLING
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">Est 16:15</span>
                </div>
              </div>

              {/* Queue Item 3 */}
              <div className="p-3 rounded-xl border border-neutral-200 bg-[#FAF8FF] hover:border-[#4B41E1]/40 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-neutral-200 flex items-center justify-center font-mono text-xs font-bold text-neutral-700">
                    #404
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Sophia Lorenzi</div>
                    <p className="text-[11px] text-neutral-500">Sculpted Leather Handbag Interior Lining</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-neutral-200/60 text-neutral-600 border border-neutral-300 text-[10px] font-mono font-bold block">
                    AWAITING WELT
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">Est 16:30</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
