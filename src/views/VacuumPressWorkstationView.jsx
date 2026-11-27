import React, { useState, useEffect } from 'react';
import { 
  Diamond, LayoutDashboard, Truck, Package, Shirt, Lock, 
  Warehouse, UserCheck, Settings, AlertTriangle, Search, 
  ChevronRight, ArrowRight, Check, Flame, Wind, Droplets, 
  Thermometer, CheckCircle2, RotateCw, Play, Pause, 
  ShieldCheck, RefreshCw, Layers, Shield
} from 'lucide-react';

export default function VacuumPressWorkstationView({ 
  onBackToStore, 
  onGoToBasting, 
  onGoToBagging, 
  onGoToDispatch, 
  onGoToFulfillment, 
  onGoToVault, 
  onGoToVip 
}) {
  const [activePedal, setActivePedal] = useState('vacuum'); // 'steam' | 'vacuum' | 'cushion' | 'standby'
  const [activeZone, setActiveZone] = useState(null);
  const [pressCycleProgress, setPressCycleProgress] = useState(85);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPressCycleProgress((prev) => (prev < 100 ? prev + 1 : 85));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

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
              PRESS #01
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
              onClick={onGoToBasting}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <Shirt className="w-4 h-4" />
              <span>Hand Basting Bench</span>
            </button>

            {/* Vacuum Press (ACTIVE) */}
            <div className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#000000] text-white font-bold shadow-sm">
              <div className="flex items-center gap-3">
                <Flame className="w-4 h-4 text-[#85f8c4]" />
                <span>Vacuum Press Buck</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white animate-pulse">
                STAGE 03
              </span>
            </div>

            <button
              onClick={onGoToBagging}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#45464d] hover:bg-[#f2f3ff] transition-colors"
            >
              <Package className="w-4 h-4 text-[#4b41e1]" />
              <span>Hermetic Bagging</span>
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
        <div className="pt-4 border-t border-[#c6c6cd]/20 space-y-3 text-xs font-mono">
          <div className="bg-[#f2f3ff] rounded-2xl p-3 border border-[#c6c6cd]/30 space-y-1.5">
            <div className="flex items-center justify-between font-bold">
              <span>Veit 8326 Buck #01</span>
              <span className="text-emerald-700">154°C Steam</span>
            </div>
            <div className="w-full bg-[#eaedff] rounded-full h-1 overflow-hidden">
              <div className="bg-[#4b41e1] h-full rounded-full w-[85%]" />
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#76777d]">
              <span>Chamber Locked</span>
              <span className="font-bold text-[#151b2d]">4.8 BAR</span>
            </div>
          </div>

          <button
            onClick={() => triggerToast('Emergency vent triggered. Boiler chamber pressure released.')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 transition-colors text-[11px] font-bold uppercase"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency Vent</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN WRAPPER ================= */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-white/90 backdrop-blur-md border-b border-[#c6c6cd]/30">
          <div className="flex items-center gap-3 text-xs text-[#45464d] font-mono">
            <span>Atelier Ops</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Workshop</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-[#151b2d] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4b41e1]" />
              Press Station #01 (Vacuum Block &amp; Wool Relax)
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => triggerToast('Boiler chamber purged. Dry steam cycle primed.')}
              className="px-3 h-9 rounded-xl border border-[#c6c6cd]/60 text-xs font-semibold text-[#151b2d] bg-white hover:bg-[#f2f3ff] transition-all flex items-center gap-1.5"
            >
              <Droplets className="w-3.5 h-3.5 text-[#4b41e1]" />
              <span>Purge Boiler</span>
            </button>

            <button
              onClick={onGoToBagging}
              className="px-4 h-9 rounded-xl bg-[#000000] text-white text-xs font-bold hover:bg-black/90 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Proceed to Cedar Bagging</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* WORKSPACE CANVAS */}
        <main className="p-4 md:p-8 flex-1 space-y-6">
          {/* SECTION 1: LINEAGE STEPPER BAR */}
          <div className="bg-white border border-[#c6c6cd]/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase text-[#76777d] font-bold">Lineage:</span>
              <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#151b2d]">#CUT-8821</span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#151b2d]">Bench #02 (#ALT-401)</span>
              <span>→</span>
              <span className="px-2.5 py-0.5 rounded bg-[#000000] text-white font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#85f8c4] animate-ping" />
                Press Buck #01 (Current)
              </span>
              <span>→</span>
              <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#76777d]">Courier Unit #07</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4b41e1]" />
              <span className="text-[#151b2d] font-bold">Target Dispatch: 17:00 EST</span>
              <span className="text-[#76777d]">|</span>
              <span className="text-[#4b41e1] font-bold">1h 14m remaining</span>
            </div>
          </div>

          {/* SECTION 2: 5 TELEMETRY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-center text-[#45464d] text-[11px] font-mono font-bold uppercase">
                <span>BOILER STEAM</span>
                <Droplets className="w-4 h-4 text-[#4b41e1]" />
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-2xl font-bold text-[#151b2d]">4.8</span>
                  <span className="text-xs text-[#76777d]">BAR</span>
                </div>
                <p className="text-[11px] text-emerald-700 font-medium">Dry Steam 154°C</p>
              </div>
              <div className="w-full bg-[#eaedff] rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-[80%]" />
              </div>
            </div>

            <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-center text-[#45464d] text-[11px] font-mono font-bold uppercase">
                <span>VACUUM SUCTION</span>
                <Wind className="w-4 h-4 text-[#4b41e1]" />
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-2xl font-bold text-[#151b2d]">-62</span>
                  <span className="text-xs text-[#76777d]">kPa</span>
                </div>
                <p className="text-[11px] text-[#4b41e1] font-medium">Fiber Chill &amp; Memory</p>
              </div>
              <div className="w-full bg-[#eaedff] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#4b41e1] h-full rounded-full w-[92%]" />
              </div>
            </div>

            <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-center text-[#45464d] text-[11px] font-mono font-bold uppercase">
                <span>BUCK TEMP</span>
                <Thermometer className="w-4 h-4 text-[#4b41e1]" />
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-2xl font-bold text-[#151b2d]">138</span>
                  <span className="text-xs text-[#76777d]">°C</span>
                </div>
                <p className="text-[11px] text-[#45464d] font-medium">Loro Piana 130s Wool</p>
              </div>
              <div className="w-full bg-[#eaedff] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#151b2d] h-full rounded-full w-[74%]" />
              </div>
            </div>

            <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-center text-[#45464d] text-[11px] font-mono font-bold uppercase">
                <span>EXTRACTION</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-2xl font-bold text-[#151b2d]">99.4</span>
                  <span className="text-xs text-[#76777d]">% DRY</span>
                </div>
                <p className="text-[11px] text-emerald-700 font-medium">Residual &lt;0.6%</p>
              </div>
              <div className="w-full bg-[#eaedff] rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-[99%]" />
              </div>
            </div>

            <div className="bg-[#000000] text-white rounded-3xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-wider text-[#85f8c4]">
                <span>CYCLE STATUS</span>
                <span className="w-2 h-2 rounded-full bg-[#85f8c4] animate-ping" />
              </div>
              <div className="my-1 font-mono">
                <span className="text-[10px] text-white/60 block">PHASE 3 OF 4</span>
                <span className="text-base font-bold text-white block">Vacuum Shock Cool</span>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-white/70">00:45 Left</span>
                  <span className="text-[#85f8c4] font-bold">{pressCycleProgress}%</span>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#85f8c4] h-full rounded-full" style={{ width: `${pressCycleProgress}%` }} />
              </div>
            </div>
          </div>

          {/* SECTION 3 & 4: 2-COLUMN SPLIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT: PRESS BUCK VISUALIZER (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-6 shadow-xs relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#c6c6cd]/30 gap-2">
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-[#151b2d]">
                      Veit 8326 Industrial Vacuum Press &amp; Dry Steam Buck
                    </h2>
                    <p className="text-xs text-[#45464d]">
                      Multi-zone negative pressure memory formation for structured suiting.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#f2f3ff] text-xs font-mono font-bold text-[#4b41e1]">
                    STATION #01
                  </span>
                </div>

                {/* Technical Canvas */}
                <div className="relative w-full h-[480px] bg-[#f2f3ff]/60 rounded-2xl my-4 border border-[#c6c6cd]/30 flex items-center justify-center overflow-hidden select-none">
                  <div className="relative w-full max-w-sm h-full flex items-center justify-center p-4">
                    <img
                      src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
                      alt="Jacket on pressing buck"
                      className="max-h-full object-contain filter drop-shadow-md rounded-2xl"
                    />

                    {/* Zone 1: Lapel Roll */}
                    <div 
                      onClick={() => setActiveZone(activeZone === 1 ? null : 1)}
                      className="absolute top-16 left-16 z-20 cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#000000] text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform">
                        1
                      </div>
                      {activeZone === 1 && (
                        <div className="absolute left-8 -top-6 w-56 bg-white p-3 rounded-2xl border border-[#c6c6cd]/60 shadow-xl z-30 text-xs">
                          <div className="flex justify-between font-bold pb-1 border-b border-[#c6c6cd]/20">
                            <span>ZONE 1: LAPEL ROLL</span>
                            <span className="text-emerald-700">LOCKED</span>
                          </div>
                          <p className="text-[11px] text-[#45464d] mt-1">
                            Curved roll line memory • 0.4 bar soft steam pulse • 12s vacuum lock
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Zone 2: Shoulder Pitch */}
                    <div 
                      onClick={() => setActiveZone(activeZone === 2 ? null : 2)}
                      className="absolute top-12 right-16 z-20 cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#000000] text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform">
                        2
                      </div>
                      {activeZone === 2 && (
                        <div className="absolute right-8 -top-4 w-56 bg-white p-3 rounded-2xl border border-[#c6c6cd]/60 shadow-xl z-30 text-xs">
                          <div className="flex justify-between font-bold pb-1 border-b border-[#c6c6cd]/20">
                            <span>ZONE 2: SHOULDER</span>
                            <span className="text-[#4b41e1]">2.1° ROT</span>
                          </div>
                          <p className="text-[11px] text-[#45464d] mt-1">
                            2.1° forward rotation lock • Contoured aluminum puck support
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Zone 3: Waist Suppression */}
                    <div 
                      onClick={() => setActiveZone(activeZone === 3 ? null : 3)}
                      className="absolute bottom-28 left-20 z-20 cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#000000] text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform">
                        3
                      </div>
                      {activeZone === 3 && (
                        <div className="absolute left-8 -top-4 w-56 bg-white p-3 rounded-2xl border border-[#c6c6cd]/60 shadow-xl z-30 text-xs">
                          <div className="flex justify-between font-bold pb-1 border-b border-[#c6c6cd]/20">
                            <span>ZONE 3: WAIST</span>
                            <span>-1.2 CM</span>
                          </div>
                          <p className="text-[11px] text-[#45464d] mt-1">
                            Bilateral vacuum cinch • Eliminates side seam buckling
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Zone 4: Cuff Bespoke Roll */}
                    <div 
                      onClick={() => setActiveZone(activeZone === 4 ? null : 4)}
                      className="absolute bottom-16 right-12 z-20 cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#000000] text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform">
                        4
                      </div>
                      {activeZone === 4 && (
                        <div className="absolute right-8 -top-4 w-56 bg-white p-3 rounded-2xl border border-[#c6c6cd]/60 shadow-xl z-30 text-xs">
                          <div className="flex justify-between font-bold pb-1 border-b border-[#c6c6cd]/20">
                            <span>ZONE 4: CUFF ROLL</span>
                            <span className="text-emerald-700">+0.5 CM</span>
                          </div>
                          <p className="text-[11px] text-[#45464d] mt-1">
                            Cartier timepiece clearance • Hand-iron creaseless cuff interior
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Foot Pedal Simulator */}
                  <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between gap-2 bg-white/95 backdrop-blur p-2 rounded-2xl border border-[#c6c6cd]/40 shadow-xs text-xs font-mono">
                    <span className="text-[10px] text-[#76777d] font-bold pl-2 hidden sm:inline">
                      BUCK PEDAL CONTROLS:
                    </span>
                    <div className="flex items-center gap-1.5 flex-1 justify-end">
                      <button
                        onClick={() => {
                          setActivePedal('steam');
                          triggerToast('Steam injection pedal activated (154°C superheated pulse).');
                        }}
                        className={`px-3 py-1.5 rounded-xl border transition-all ${
                          activePedal === 'steam' ? 'bg-[#000000] text-white border-black' : 'bg-[#f2f3ff] text-[#151b2d] border-[#c6c6cd]/40'
                        }`}
                      >
                        Steam [Pedal L]
                      </button>

                      <button
                        onClick={() => {
                          setActivePedal('vacuum');
                          triggerToast('Vacuum suction pedal active (-62 kPa chill set).');
                        }}
                        className={`px-3 py-1.5 rounded-xl border flex items-center gap-1 transition-all ${
                          activePedal === 'vacuum' ? 'bg-[#4b41e1] text-white border-[#4b41e1]' : 'bg-[#f2f3ff] text-[#151b2d] border-[#c6c6cd]/40'
                        }`}
                      >
                        <span>Vacuum [Pedal R]</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#85f8c4] animate-ping" />
                      </button>

                      <button
                        onClick={() => {
                          setActivePedal('cushion');
                          triggerToast('Air cushion float engaged.');
                        }}
                        className={`px-3 py-1.5 rounded-xl border transition-all ${
                          activePedal === 'cushion' ? 'bg-[#000000] text-white border-black' : 'bg-[#f2f3ff] text-[#151b2d] border-[#c6c6cd]/40'
                        }`}
                      >
                        Air Cushion
                      </button>
                    </div>
                  </div>
                </div>

                {/* Micro Tuning Strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/30">
                    <span className="text-[10px] text-[#76777d] block">Steam Pulse</span>
                    <span className="font-bold text-[#151b2d] block mt-0.5">3 Pulses / 4.0s</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/30">
                    <span className="text-[10px] text-[#76777d] block">Teflon Shoe Heat</span>
                    <span className="font-bold text-[#151b2d] block mt-0.5">142°C (Constant)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/30">
                    <span className="text-[10px] text-[#76777d] block">Shoulder Cant</span>
                    <span className="font-bold text-[#4b41e1] block mt-0.5">+2.1° Locked</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/30">
                    <span className="text-[10px] text-[#76777d] block">Air Deflector</span>
                    <span className="font-bold text-emerald-700 block mt-0.5">18 m³/h Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: OPERATION LEDGER (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-[#c6c6cd]/40 rounded-3xl p-6 shadow-xs space-y-5 text-xs">
                <div className="border-b border-[#c6c6cd]/20 pb-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#eaedff] text-[#4b41e1]">
                      VIP BESPOKE ALTERATION
                    </span>
                    <span className="font-mono text-[#76777d]">#ALT-401</span>
                  </div>
                  <h3 className="text-base font-bold text-[#151b2d] mt-1">Elena Vasiliev</h3>
                  <p className="text-[#45464d] text-[11px]">Client ID: #VIP-ELN-88390 • Lifetime Tier I</p>
                </div>

                {/* Fabric Recipe */}
                <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#c6c6cd]/30 space-y-1.5 font-mono">
                  <div className="flex justify-between font-bold">
                    <span>FABRIC RECIPE</span>
                    <span className="text-[#4b41e1]">#LP-130S</span>
                  </div>
                  <p className="text-[#151b2d] font-semibold text-[11px]">
                    Loro Piana 130s Pure Wool (Obsidian Melange)
                  </p>
                  <div className="grid grid-cols-2 gap-1 text-[10px] text-[#45464d] pt-1 border-t border-[#c6c6cd]/20">
                    <div>Max Steam: 158°C</div>
                    <div>Teflon Head: Active</div>
                    <div>Chill Time: 45s</div>
                    <div className="text-emerald-700 font-bold">Residual: &lt;0.8%</div>
                  </div>
                </div>

                {/* Station Stepper */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#76777d] block">
                    STATION PROTOCOL STEPPER
                  </span>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f2f3ff]">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="line-through text-[#76777d]">1. Ultrasonic de-linting</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f2f3ff]">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="line-through text-[#76777d]">2. Canvas interlining fusion</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f2f3ff]">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="line-through text-[#76777d]">3. Dynamic steam pulse</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border-2 border-black font-bold">
                      <span className="text-[#151b2d]">4. High-vacuum freeze-set</span>
                      <span className="text-[#4b41e1] font-mono">{pressCycleProgress}%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#f2f3ff]/40 text-[#76777d] opacity-70">
                      5. Cryptographic NFC tag welt sealing (Queued)
                    </div>
                    <div className="p-2 rounded-xl bg-[#f2f3ff]/40 text-[#76777d] opacity-50">
                      6. Hermetic garment bag cedar seal (Stage 07)
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2 border-t border-[#c6c6cd]/20">
                  <button
                    onClick={() => {
                      triggerToast('Press cycle confirmed! Advancing to Cedar Bagging Station...');
                      setTimeout(() => {
                        if (onGoToBagging) onGoToBagging();
                      }, 500);
                    }}
                    className="w-full h-12 rounded-full bg-[#000000] text-white text-xs font-bold hover:bg-black/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#85f8c4]" />
                    <span>Seal Press Cycle &amp; Send to Cedar Bagging</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => triggerToast('Dry steam re-pulse initiated (4s dwell).')}
                      className="py-2.5 rounded-xl border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-[#151b2d] font-semibold"
                    >
                      Re-steam
                    </button>
                    <button
                      onClick={() => triggerToast('Thermal IR scan verified: 0 cold spots.')}
                      className="py-2.5 rounded-xl border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-[#151b2d] font-semibold"
                    >
                      Thermal IR
                    </button>
                  </div>
                </div>
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
