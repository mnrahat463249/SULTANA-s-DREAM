import React, { useState, useEffect } from 'react';
import { 
  Diamond, LayoutDashboard, Truck, Package, Shirt, Lock, 
  Warehouse, UserCheck, Settings, BookOpen, Terminal, 
  AlertTriangle, Search, ChevronDown, Radio, Bell, 
  SlidersHorizontal, ArrowLeftRight, Plus, Hourglass, CheckCircle, 
  Zap, DollarSign, Download, RefreshCw, MapPin, 
  Headphones, Navigation, Eye, Check, Scissors, 
  Calendar, Mic, MessageSquare, Shield, ShieldCheck
} from 'lucide-react';

export default function InHomeFittingsOpsView({ 
  onBackToStore, 
  onGoToDispatch, 
  onGoToFulfillment, 
  onGoToVault, 
  onGoToVip,
  onGoToFitConfirmation
}) {
  const [selectedSession, setSelectedSession] = useState('camille');
  const [timerSeconds, setTimerSeconds] = useState(12 * 60 + 45); // 12:45
  const [activeFilter, setActiveFilter] = useState('all');
  const [swapApproved, setSwapApproved] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [audioConnected, setAudioConnected] = useState(true);

  // Live timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev < 15 * 60 ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timeRemainingSeconds = Math.max(0, 15 * 60 - timerSeconds);
  const remainingMins = Math.floor(timeRemainingSeconds / 60);
  const remainingSecs = timeRemainingSeconds % 60;

  return (
    <div className="bg-[#faf8ff] text-[#151b2d] font-sans antialiased min-h-screen selection:bg-[#c3c0ff] selection:text-[#000000] flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 z-40 bg-white border-r border-[#c6c6cd]/30 hidden lg:flex flex-col justify-between py-6 px-4 shrink-0 fixed inset-y-0 left-0">
        <div>
          {/* Brand Crest & Hub Status */}
          <div className="px-2 pb-5 border-b border-[#c6c6cd]/20 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#000000] flex items-center justify-center text-white">
                  <Diamond className="w-3.5 h-3.5" />
                </div>
                <span className="text-base font-bold tracking-tight text-[#151b2d]">AURA Atelier Ops</span>
              </div>
              <div className="mt-1 text-[11px] text-[#45464d] flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>NY SoHo Hub #01 • HSM Active</span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#eaedff] text-[#45464d] border border-[#c6c6cd]/40 font-mono">
              v2.4
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
              onClick={onGoToDispatch}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4" />
                <span>Dispatch &amp; Fleet</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaedff] text-[#45464d] font-mono">
                6 Vans
              </span>
            </button>

            <button
              onClick={onGoToFulfillment}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Orders &amp; Fulfillment</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eaedff] text-[#45464d] font-mono">
                14
              </span>
            </button>

            {/* In-Home Try-Ons (ACTIVE) */}
            <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#000000] text-white font-bold shadow-sm">
              <div className="flex items-center gap-3">
                <Shirt className="w-4 h-4 text-[#85f8c4]" />
                <span>In-Home Try-Ons</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white animate-pulse">
                3 Live
              </span>
            </div>

            <button
              onClick={onGoToVault}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>Vault Minting &amp; Provenance</span>
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

        {/* Sidebar Bottom Telemetry */}
        <div className="pt-4 border-t border-[#c6c6cd]/20 space-y-3">
          <div className="bg-[#f2f3ff] rounded-2xl p-3 border border-[#c6c6cd]/30 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Fleet Mesh
              </span>
              <span>99.8% Online</span>
            </div>
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4b41e1]" />
                HSM NFC Vault
              </span>
              <span className="text-emerald-700">SECURE</span>
            </div>
          </div>

          <button
            onClick={() => triggerToast('Emergency protocol standby. All courier mesh locked to current positions.')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 transition-colors text-[11px] font-bold uppercase tracking-wider font-mono"
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
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-1.5 rounded-full border border-[#c6c6cd]/40">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-xs font-semibold text-[#151b2d]">SoHo Flagship &amp; Vault #01 • NYC</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#45464d]" />
            </div>

            <div className="relative flex-1 max-w-xs hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d]" />
              <input
                type="text"
                placeholder="Search sessions, couriers, #AUR..."
                className="w-full pl-9 pr-4 py-1.5 bg-[#f2f3ff] border border-[#c6c6cd]/40 rounded-full text-xs text-[#151b2d] placeholder:text-[#76777d] focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerToast('Courier mesh routing optimized.')}
              className="px-3.5 py-1.5 rounded-full border border-[#c6c6cd]/60 text-xs font-semibold text-[#151b2d] bg-white hover:bg-[#f2f3ff] transition-all active:scale-95 flex items-center gap-1.5"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Emergency Swap</span>
            </button>

            <button
              onClick={() => triggerToast('VIP In-Home consultation scheduler opened.')}
              className="px-4 py-1.5 rounded-full bg-[#000000] text-white text-xs font-semibold hover:bg-black/90 transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Book VIP Fitting</span>
            </button>
          </div>
        </header>

        {/* MAIN WORKSPACE CANVAS */}
        <main className="p-4 md:p-8 flex-1 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#c6c6cd]/30 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#45464d] mb-1 font-mono">
                <span>AURA Operations</span>
                <span>/</span>
                <span>Concierge Services</span>
                <span>/</span>
                <span className="text-[#151b2d] font-bold">Live In-Home Fittings</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#151b2d] tracking-tight">
                In-Home Try-Ons &amp; Concierge Fittings
              </h1>
              <p className="text-xs text-[#45464d] mt-1">
                High-velocity client staging, buffer inventory fleet routing, and active bespoke fitting telemetry.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-[#c6c6cd]/40 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <div className="text-right">
                <div className="text-[11px] font-mono font-bold text-[#151b2d]">DISPATCH MESH SYNCED</div>
                <div className="text-[10px] text-[#45464d] font-mono">Fleet Latency: 42ms • GPS Buffer: 100%</div>
              </div>
            </div>
          </div>

          {/* SECTION 1: 4 KPI CARDS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-5 border border-[#c6c6cd]/40 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#45464d]">
                  Active Fitting Sessions
                </span>
                <div className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#151b2d]">
                  <Hourglass className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#151b2d] font-mono">3 Live</span>
                  <span className="text-xs text-[#45464d]">/ 18 Today</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#45464d]">
                  <span>Avg Window: 14.8 min</span>
                  <span className="text-emerald-700 font-bold">98.6% SLA</span>
                </div>
              </div>
              <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#000000] h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-5 border border-[#c6c6cd]/40 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#45464d]">
                  Try-On Keep Rate
                </span>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#151b2d] font-mono">94.2%</span>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold">+2.4% vs 30d</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#45464d]">
                  <span>14 Kept • 2 Instant Swaps</span>
                  <span className="font-semibold text-[#151b2d]">0 Returns</span>
                </div>
              </div>
              <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-3 overflow-hidden flex">
                <div className="bg-emerald-600 h-full" style={{ width: '87.5%' }} />
                <div className="bg-[#645efb] h-full" style={{ width: '12.5%' }} />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-5 border border-[#c6c6cd]/40 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#45464d]">
                  Rapid Swap Velocity
                </span>
                <div className="w-8 h-8 rounded-full bg-[#e2dfff] text-[#4b41e1] flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#151b2d] font-mono">6.4 <span className="text-sm font-normal">min</span></span>
                  <span className="text-[11px] font-mono text-[#4b41e1] font-bold">Sub-8m Target</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#45464d]">
                  <span>Decision to Van Doorstep</span>
                  <span className="text-emerald-700 font-bold">-1.2 min</span>
                </div>
              </div>
              <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#4b41e1] h-full rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-5 border border-[#c6c6cd]/40 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#45464d]">
                  Retained Try-On GMV
                </span>
                <div className="w-8 h-8 rounded-full bg-[#f2f3ff] text-[#151b2d] flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#151b2d] font-mono">$78,400</span>
                  <span className="text-[11px] font-mono text-[#45464d]">USD</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-[#45464d]">
                  <span>Avg Order: $3,920</span>
                  <span className="text-emerald-700 font-bold">100% Minted</span>
                </div>
              </div>
              <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#000000] h-full rounded-full" style={{ width: '91%' }} />
              </div>
            </div>
          </section>

          {/* SECTION 2: FILTERS & TOOLBAR */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-[#c6c6cd]/30">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0 text-xs font-mono font-bold">
              {[
                { id: 'all', label: 'All Active (3)' },
                { id: 'progress', label: 'Fitting In-Progress (2)' },
                { id: 'swap', label: 'Rapid Swap En Route (1)', highlight: true },
                { id: 'scheduled', label: 'Scheduled Today (12)' },
                { id: 'completed', label: 'Completed (14)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                    activeFilter === f.id
                      ? 'bg-[#000000] text-white shadow-xs'
                      : 'bg-[#f2f3ff] text-[#45464d] hover:bg-[#eaedff]'
                  }`}
                >
                  {f.highlight && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4b41e1] animate-ping mr-1.5" />}
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerToast('Daily try-on log exported.')}
                className="p-2 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/40 text-[#151b2d] hover:bg-[#eaedff]"
                title="Export Log"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => triggerToast('Telemetry re-synced with Manhattan fleet.')}
                className="p-2 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/40 text-[#151b2d] hover:bg-[#eaedff]"
                title="Sync Telemetry"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SECTION 3: SPLIT VIEW (QUEUES & INSPECTOR) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: SESSIONS QUEUE (7 of 12) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-bold text-[#45464d] uppercase tracking-wider">
                  Priority In-Home Sessions
                </span>
                <span className="text-xs text-[#45464d] font-mono">Real-time GPS sync</span>
              </div>

              {/* SESSION 1: CAMILLE LAURENT (SELECTED) */}
              <div
                onClick={() => setSelectedSession('camille')}
                className={`bg-white rounded-3xl p-5 border-2 transition-all cursor-pointer relative overflow-hidden shadow-sm ${
                  selectedSession === 'camille' ? 'border-[#000000] shadow-md' : 'border-[#c6c6cd]/40 hover:border-black'
                }`}
              >
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#4b41e1] via-[#645efb] to-[#4b41e1]" />

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f2f3ff] flex items-center justify-center font-bold text-[#151b2d] text-sm border border-[#c6c6cd]/40">
                      CL
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-[#151b2d]">Camille Laurent</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#000000] text-white">
                          Tier 01 Elite
                        </span>
                      </div>
                      <div className="text-xs text-[#45464d] flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#4b41e1]" />
                        <span>72 Mercer St, Apt 4B • Order #AUR-88401</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#e2dfff] text-[#4b41e1]">
                      <span className="w-2 h-2 rounded-full bg-[#4b41e1] animate-ping" />
                      Rapid Swap Requested (Sz 38)
                    </span>
                    <div className="text-[11px] text-[#45464d] font-mono mt-1">
                      Timer: {minutes}:{String(seconds).padStart(2, '0')} / 15:00 min
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-[#f2f3ff] rounded-2xl border border-[#c6c6cd]/30 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#76777d] font-bold block">Current Garment</span>
                    <span className="font-bold text-[#151b2d] mt-0.5 block">Silk Column Slip Dress</span>
                    <span className="text-[#45464d] text-[11px]">Size 36 • Noir Satin • $2,850</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#76777d] font-bold block">Assigned Courier</span>
                    <span className="font-bold text-[#151b2d] mt-0.5 flex items-center gap-1">
                      Unit #03 Marcus V. <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    <span className="text-[#45464d] text-[11px]">Inside building lobby</span>
                  </div>
                </div>

                {/* Rapid Swap Callout */}
                <div className="mt-3 p-3 bg-[#e2dfff]/40 rounded-2xl border border-[#4b41e1]/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#4b41e1] text-white flex items-center justify-center shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-[#151b2d]">Unit #02 Matteo S. Dispatched with Buffer Stock</div>
                      <div className="text-[11px] text-[#45464d]">Carrying Size 38 Replacement • Broome &amp; Mercer (ETA 4 min)</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#4b41e1] bg-white px-2 py-1 rounded-lg border border-[#4b41e1]/20">
                    ETA 4m
                  </span>
                </div>

                <div className="mt-3 text-xs italic text-[#45464d] bg-[#faf8ff] p-2.5 rounded-xl border border-[#c6c6cd]/20">
                  “Bust line slightly snug across the bias cut. Client loves the drape; requested Size 38 immediately.” — Courier Marcus V.
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#c6c6cd]/20 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerToast('Direct comms channel opened with Marcus V.');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#151b2d] font-semibold flex items-center gap-1.5"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>Courier Comms</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerToast('Unit #02 priority route confirmed via Mercer St.');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#151b2d] font-semibold flex items-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Re-route Unit #02</span>
                    </button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerToast('Swap cancelled. Original order restored.');
                    }}
                    className="text-red-600 hover:underline font-semibold"
                  >
                    Cancel Swap
                  </button>
                </div>
              </div>

              {/* SESSION 2: ELENA VASILIEV (COMPLETED) */}
              <div
                onClick={() => {
                  setSelectedSession('elena');
                  if (onGoToFitConfirmation) onGoToFitConfirmation();
                }}
                className={`bg-white rounded-3xl p-5 border transition-all cursor-pointer shadow-xs ${
                  selectedSession === 'elena' ? 'border-black' : 'border-[#c6c6cd]/40 hover:border-black'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f2f3ff] flex items-center justify-center font-bold text-[#151b2d] text-sm border border-[#c6c6cd]/40">
                      EV
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-[#151b2d]">Elena Vasiliev</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#000000] text-white">
                          Tier 01 Elite
                        </span>
                      </div>
                      <div className="text-xs text-[#45464d] flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#4b41e1]" />
                        <span>54 Mercer St, SoHo • Order #AUR-88390</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Fitting Completed • 100% Kept
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-[#f2f3ff] rounded-2xl border border-[#c6c6cd]/30 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#76777d] font-bold block">Garment Kept</span>
                    <span className="font-bold text-[#151b2d] mt-0.5 block">Structured Obsidian Wool Blazer</span>
                    <span className="text-[#45464d] text-[11px]">Size 40 • Charcoal Melange • $3,400</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#76777d] font-bold block">Lead Courier</span>
                    <span className="font-bold text-[#151b2d] mt-0.5 block">Unit #07 Julian R.</span>
                    <span className="text-[#45464d] text-[11px]">Handshake confirmed at 14:18 EST</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#c6c6cd]/20 text-xs">
                  <span className="text-[#45464d] font-mono text-[11px]">
                    NFC Security Thread: <span className="font-bold text-[#151b2d]">#0x4F...89C2 (Unlocked)</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onGoToFitConfirmation) onGoToFitConfirmation();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#000000] text-white font-semibold flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Client Fit Review</span>
                  </button>
                </div>
              </div>

              {/* SESSION 3: ALEXANDRE DUMAS (TAILOR FIT) */}
              <div
                onClick={() => setSelectedSession('alexandre')}
                className={`bg-white rounded-3xl p-5 border transition-all cursor-pointer shadow-xs ${
                  selectedSession === 'alexandre' ? 'border-black' : 'border-[#c6c6cd]/40 hover:border-black'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f2f3ff] flex items-center justify-center font-bold text-[#151b2d] text-sm border border-[#c6c6cd]/40">
                      AD
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-[#151b2d]">Alexandre Dumas</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#4b41e1] text-white">
                          Tier 02 Privé
                        </span>
                      </div>
                      <div className="text-xs text-[#45464d] flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#4b41e1]" />
                        <span>Crosby St Penthouse, Loft 8 • Order #AUR-88374</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#eaedff] text-[#4b41e1]">
                    <Scissors className="w-3.5 h-3.5" />
                    Tailor Fitting Active (11/15 min)
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-[#f2f3ff] rounded-2xl border border-[#c6c6cd]/30 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#76777d] font-bold block">Garment Pinning</span>
                    <span className="font-bold text-[#151b2d] mt-0.5 block">Double-Breasted Cashmere Overcoat</span>
                    <span className="text-[#45464d] text-[11px]">Size 42L • Heather Camel • $4,800</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#76777d] font-bold block">Master Tailor</span>
                    <span className="font-bold text-[#151b2d] mt-0.5 block">Mathilde B.</span>
                    <span className="text-[#45464d] text-[11px]">Digital basting kit synced to SoHo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: LIVE FITTING INSPECTOR PANE (5 of 12) */}
            <div className="lg:col-span-5 space-y-4 sticky top-24">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-bold text-[#45464d] uppercase tracking-wider">
                  Live Fitting Inspector
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#e2dfff] text-[#4b41e1]">
                  INCIDENT #AUR-SWAP-99245
                </span>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#c6c6cd]/40 shadow-xs space-y-5">
                <div className="border-b border-[#c6c6cd]/20 pb-4">
                  <span className="text-xs text-[#45464d] font-mono block">Active Focus Session</span>
                  <h2 className="text-xl font-bold text-[#151b2d] mt-0.5">Camille Laurent</h2>

                  {/* Countdown Timer */}
                  <div className="mt-3 bg-[#f2f3ff] rounded-2xl p-3.5 border border-[#c6c6cd]/30">
                    <div className="flex items-center justify-between mb-1.5 text-xs font-mono font-bold">
                      <span className="text-[#151b2d]">SESSION TIMER WINDOW</span>
                      <span className="text-red-600">
                        {minutes}:{String(seconds).padStart(2, '0')} / 15:00 ({remainingMins}:{String(remainingSecs).padStart(2, '0')} left)
                      </span>
                    </div>
                    <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#000000] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (timerSeconds / (15 * 60)) * 100)}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-[#45464d]">
                      <span>Doorstep SLA: 15m</span>
                      <span className="text-emerald-700 font-bold">Overtime Grace Active</span>
                    </div>
                  </div>
                </div>

                {/* Garment Staging */}
                <div>
                  <span className="text-xs font-mono font-bold text-[#45464d] uppercase tracking-wider block mb-2">
                    Garment Staging &amp; Telemetry
                  </span>
                  <div className="space-y-2.5 text-xs">
                    {/* Size 36 */}
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30">
                      <div>
                        <div className="font-bold text-[#151b2d]">Silk Column Slip Dress</div>
                        <div className="text-[#45464d] text-[11px]">Size 36 (Bust: 84cm)</div>
                        <span className="text-[10px] font-mono text-[#76777d]">Awaiting Van Handback</span>
                      </div>
                      <div className="text-right font-mono">
                        <div className="font-bold text-[#151b2d]">$2,850</div>
                        <div className="text-[10px] text-[#76777d]">RFID #992-A</div>
                      </div>
                    </div>

                    <div className="text-center -my-1 text-[#4b41e1] font-bold">↓ SWAP EN ROUTE ↓</div>

                    {/* Size 38 */}
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-[#e2dfff]/30 border border-[#4b41e1]/30">
                      <div>
                        <div className="font-bold text-[#4b41e1] flex items-center gap-1.5">
                          <span>Silk Column Slip Dress</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#4b41e1] text-white font-mono">
                            SWAP
                          </span>
                        </div>
                        <div className="text-[#45464d] text-[11px]">Buffer Unit: Size 38 (Bust: 88cm)</div>
                        <span className="text-[10px] font-mono font-bold text-[#4b41e1]">
                          Aboard Unit #02 (Matteo S.) • 19.8°C Vault
                        </span>
                      </div>
                      <div className="text-right font-mono">
                        <div className="font-bold text-[#151b2d]">$2,850</div>
                        <div className="text-[10px] text-emerald-700 font-bold">GPS: 0.3 mi</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comms */}
                <div>
                  <span className="text-xs font-mono font-bold text-[#45464d] uppercase tracking-wider block mb-2">
                    Live Telemetry &amp; Comms
                  </span>
                  <div className="p-3 bg-[#f2f3ff] rounded-2xl border border-[#c6c6cd]/30 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#45464d]">Biometric Fit Score:</span>
                      <span className="font-mono font-bold text-[#151b2d]">91.4% (Size 38 Recommended)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#45464d]">Doorstep Audio Channel:</span>
                      <span className="flex items-center gap-1 text-emerald-700 font-bold font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Active 2-Way Link
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#c6c6cd]/20 flex items-center gap-2">
                      <button
                        onClick={() => triggerToast('Radio call connected to Courier Marcus V.')}
                        className="flex-1 py-1.5 rounded-xl bg-white text-[#151b2d] font-semibold border border-[#c6c6cd]/30 hover:bg-[#eaedff] flex items-center justify-center gap-1"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>Radio Call</span>
                      </button>
                      <button
                        onClick={() => triggerToast('VIP SMS dispatched to client Camille L.')}
                        className="flex-1 py-1.5 rounded-xl bg-white text-[#151b2d] font-semibold border border-[#c6c6cd]/30 hover:bg-[#eaedff] flex items-center justify-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>VIP SMS</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Resolution Controls */}
                <div className="space-y-2 pt-2 border-t border-[#c6c6cd]/20">
                  <button
                    onClick={() => {
                      setSwapApproved(true);
                      triggerToast('Instant Size Swap Approved. Unit #02 authorized for doorstep handoff.');
                    }}
                    className={`w-full py-3 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 ${
                      swapApproved ? 'bg-emerald-600 text-white' : 'bg-[#000000] text-white hover:bg-black/90'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{swapApproved ? 'Swap Approved & Released' : 'Approve Instant Size Swap'}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => triggerToast('Complimentary alteration voucher booked.')}
                      className="py-2 px-3 rounded-full border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-[#151b2d] font-semibold flex items-center justify-center gap-1"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      <span>Alteration</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onGoToFitConfirmation) onGoToFitConfirmation();
                      }}
                      className="py-2 px-3 rounded-full border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-[#151b2d] font-semibold flex items-center justify-center gap-1"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Client Fit Review</span>
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-[#76777d] text-center font-mono pt-1">
                  HSM Hardware Cryptographic Escrow locks garment release until courier NFC tap confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4: FLEET BUFFER HEATMAP */}
          <section className="bg-white rounded-3xl p-6 border border-[#c6c6cd]/40 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#c6c6cd]/20 gap-2">
              <div>
                <h3 className="font-bold text-base text-[#151b2d]">
                  Fleet Mobile Buffer Stock &amp; Mesh Distribution
                </h3>
                <p className="text-xs text-[#45464d]">
                  Real-time secondary size allocation across active Manhattan mobile atelier units.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold">
                <span className="px-2.5 py-1 rounded-full bg-[#f2f3ff] border border-[#c6c6cd]/30">6 Vans Active</span>
                <span className="px-2.5 py-1 rounded-full bg-[#f2f3ff] border border-[#c6c6cd]/30">48 Buffer Units</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800">0 Stockouts Today</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Unit #01 — West Village
                  </span>
                  <span className="font-mono text-[11px] text-[#76777d]">98% Batt</span>
                </div>
                <div className="text-[11px] text-[#45464d]">Courier: David L. • Sprinter Atelier 4x4</div>
                <div className="text-[11px] font-semibold text-[#151b2d] pt-1">
                  Buffer Stock: 8 Garments (Blazers 38/40, Silk Slips 34/38)
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#e2dfff]/40 border border-[#4b41e1]/30 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5 text-[#4b41e1]">
                    <span className="w-2 h-2 rounded-full bg-[#4b41e1] animate-pulse" />
                    Unit #02 — SoHo Core
                  </span>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#4b41e1]">SWAP ENGAGED</span>
                </div>
                <div className="text-[11px] text-[#45464d]">Courier: Matteo S. • En Route to 72 Mercer</div>
                <div className="text-[11px] font-semibold text-[#151b2d] pt-1">
                  Buffer Stock: 10 Garments (Silk Column Sz 38 active swap)
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Unit #03 — Tribeca Hub
                  </span>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#45464d]">LOBBY DOCKED</span>
                </div>
                <div className="text-[11px] text-[#45464d]">Courier: Marcus V. • Inside 72 Mercer Lobby</div>
                <div className="text-[11px] font-semibold text-[#151b2d] pt-1">
                  Buffer Stock: 6 Garments (Cashmere Overcoats 40/42)
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-white/20 text-xs animate-fadeIn">
          <Check className="w-4 h-4 text-[#85f8c4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
