import React, { useState } from 'react';
import { 
  Navigation, Phone, MapPin, Key, CheckCircle2, 
  RotateCcw, Timer, QrCode, MessageSquare, ChevronRight,
  Shield, Check, ArrowLeft, Radio
} from 'lucide-react';


export default function CourierRouteView({ onConfirmHandoff, onBackToStore }) {
  const [activeTab, setActiveTab] = useState('manifest');
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(15 * 60);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-neutral-950 border-x border-neutral-800 shadow-2xl relative pb-36">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-neutral-950/85 backdrop-blur-xl px-4 h-14 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToStore}
              className="p-1.5 -ml-1 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
              title="Return to Storefront"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="font-bold text-xs tracking-widest uppercase text-white font-mono">
                AURA ATELIER OPS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-neutral-200">UNIT #07</span>
            </div>
            <button className="p-1.5 rounded-full text-neutral-400 hover:text-white">
              <Radio className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </header>

        {/* Scrollable Main Body */}
        <main className="flex-1 px-4 pt-3 space-y-4">
          {/* Driver & Telemetry Strip */}
          <section className="bg-neutral-900/80 border border-neutral-800/80 rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-sm">
                  JR
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-neutral-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-white">Julian R.</h2>
                  <span className="text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded">
                    Lead Courier
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">eVito Sprinter • 94% Batt • RTK Synced</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">Shift 17:00–20:30</span>
              <span className="text-xs font-semibold text-neutral-200">Stop 1 of 4 | 0.8 mi</span>
            </div>
          </section>

          {/* Turn-by-Turn Transit Directive Card */}
          <section className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-4 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Navigation className="w-6 h-6 rotate-[-45deg]" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  <span>Next Maneuver</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-neutral-400">Mercer St Corridor Clear</span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
                  Turn left onto Mercer St
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5">
                  In 450 ft • Direct alley docking at 142 Mercer Penthouse garage
                </p>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">
                Target Window: <strong className="text-white font-mono">17:00 – 17:30 EST</strong>
              </span>
              <div className="font-semibold text-amber-300 font-mono">
                ETA 17:18 EST <span className="text-neutral-400 font-normal">(12 min)</span>
              </div>
            </div>
          </section>

          {/* Active VIP Stop Card */}
          <section className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 space-y-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-mono font-bold tracking-wider">
                  STOP 01 ACTIVE
                </span>
                <span className="text-xs font-semibold text-amber-300">IN-HOME BESPOKE FITTING</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase">TIER 01 PRIVÉ</span>
            </div>

            {/* VIP Client Profile */}
            <div className="flex items-start justify-between border-b border-neutral-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-white font-serif">Elena Vasiliev</h1>
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  ID: VIP-ELN-88390 • Concierge Fitting (15-Min Reserved)
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-neutral-200">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>142 Mercer St, Penthouse B, SoHo, NY</span>
                </div>
              </div>

              <a
                href="tel:5550192831"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white active:scale-95 transition-all"
                title="Call Client"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Elevator & Building Protocol */}
            <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-300">
              <Key className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Building &amp; Elevator Protocol:</strong>
                Concierge George notified via Atelier Ops webhook. Key locked for PH-B cab. Absolute white-glove discretion requested.
              </div>
            </div>

            {/* Garment Cargo Manifest */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>GARMENT CARGO MANIFEST</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  NFC Integrity Sealed
                </span>
              </div>

              {/* Garment Item */}
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=300&auto=format&fit=crop"
                    alt="Obsidian Wool Blazer"
                    className="w-12 h-14 rounded-lg object-cover bg-neutral-800 border border-neutral-700"
                  />
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                      ALT-401 • CUT-8821 FINISH
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                      Structured Obsidian Wool Blazer
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-0.5">
                      <span>Sz 40 • Charcoal</span>
                      <span>•</span>
                      <span className="text-neutral-200">Rack #B-04 (Hgr #12)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-800 text-neutral-200">
                    Pod 4
                  </span>
                  <span className="block text-[10px] text-neutral-500 mt-1 font-mono">Hermetic N₂</span>
                </div>
              </div>

              {/* Reverse Logistics Return Item */}
              <div className="p-2.5 bg-neutral-950/40 border border-dashed border-neutral-700 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-neutral-200 font-semibold">White-Glove Return to Retrieve</p>
                    <p className="text-[11px] text-neutral-400">Prior Sz 38 Blazer (#AUR-RET-4091 in Apple Wallet)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase bg-neutral-800 px-2 py-1 rounded text-neutral-300">
                  BOX IN CAB
                </span>
              </div>
            </div>
          </section>

          {/* Upcoming Stops */}
          <section className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase text-neutral-400 px-1">
              <span>Upcoming Manifest Stops (3 Remaining)</span>
              <span className="text-amber-400">Sequence Locked</span>
            </div>

            <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center font-mono font-bold text-neutral-300">
                  02
                </div>
                <div>
                  <span className="font-semibold text-white">Camille Laurent</span>
                  <span className="text-neutral-500 ml-1.5">• 74 Grand St</span>
                  <p className="text-[11px] text-neutral-400">Silk Column Slip Dress #ALT-402</p>
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-neutral-200 font-semibold">17:45 EST</span>
                <span className="block text-[10px] text-neutral-500">Direct Delivery</span>
              </div>
            </div>
          </section>
        </main>

        {/* Dual Sticky Bottom Action Rail */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-md w-full z-40 bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800">
          {/* Action Row */}
          <div className="px-4 py-2.5 flex items-center gap-2">
            {/* Call Concierge */}
            <a
              href="tel:5550192831"
              className="h-11 px-3.5 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center text-neutral-200 hover:text-white text-xs font-bold active:scale-95 transition-all gap-1.5"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Concierge</span>
            </a>

            {/* Primary Action: Doorstep NFC Tap (Triggers Handoff Screen) */}
            <button
              onClick={onConfirmHandoff}
              className="flex-1 h-11 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>Doorstep &amp; Tap NFC</span>
            </button>

            {/* 15-Min Timer Button */}
            <button
              onClick={toggleTimer}
              className={`h-11 px-3 rounded-full border text-xs font-mono font-bold flex items-center justify-center gap-1 active:scale-95 transition-all ${
                timerRunning
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                  : 'border-neutral-700 bg-neutral-900 text-neutral-300'
              }`}
              title="15-Minute Try-On Timer"
            >
              <Timer className="w-4 h-4 text-amber-400" />
              <span>{timerRunning ? formatTimer(timerSeconds) : '15m'}</span>
            </button>
          </div>

          {/* Bottom Nav Bar */}
          <nav className="flex justify-around items-center h-14 border-t border-neutral-800/80 px-4 text-[10px] font-mono uppercase">
            <button
              onClick={() => setActiveTab('manifest')}
              className={`flex flex-col items-center gap-1 ${
                activeTab === 'manifest' ? 'text-amber-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>Manifest</span>
            </button>

            <button
              onClick={() => setActiveTab('route')}
              className={`flex flex-col items-center gap-1 ${
                activeTab === 'route' ? 'text-amber-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Route</span>
            </button>

            <button
              onClick={onConfirmHandoff}
              className="flex flex-col items-center gap-1 text-neutral-400 hover:text-amber-400"
            >
              <QrCode className="w-4 h-4" />
              <span>Scan NFC</span>
            </button>

            <button
              onClick={() => setActiveTab('comms')}
              className={`flex flex-col items-center gap-1 ${
                activeTab === 'comms' ? 'text-amber-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Comms</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
