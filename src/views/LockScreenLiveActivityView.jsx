import React, { useState, useEffect } from 'react';
import { 
  Lock, QrCode, Phone, CheckCircle, Wallet, Truck, 
  Flashlight, Camera, ArrowLeft, ShieldCheck, MapPin, 
  Navigation, Car, Check, ChevronRight, Eye
} from 'lucide-react';

export default function LockScreenLiveActivityView({ 
  onBackToTracking, 
  onGoToPass, 
  onGoToStorefront 
}) {
  const [doorAuth, setDoorAuth] = useState(true);
  const [callInitiated, setCallInitiated] = useState(false);
  const [currentTime, setCurrentTime] = useState('9:42');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col items-center justify-center p-0 md:p-6 select-none font-sans relative">
      {/* Top Nav Control for Developer / User Convenience */}
      <div className="w-full max-w-[420px] mb-2 px-4 flex items-center justify-between z-50 text-xs">
        <button
          onClick={onBackToTracking}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 backdrop-blur-md border border-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Live Tracking</span>
        </button>
        <button
          onClick={onGoToStorefront}
          className="text-white/60 hover:text-white transition-colors"
        >
          Storefront
        </button>
      </div>

      {/* iPhone Frame Mockup Canvas */}
      <div className="relative w-full max-w-[420px] h-[896px] max-h-[884px] rounded-[52px] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-[8px] border-[#1e232f] flex flex-col justify-between">
        {/* Atmospheric Wallpaper Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1000&auto=format&fit=crop"
            alt="Atmospheric architecture wallpaper"
            className="w-full h-full object-cover filter brightness-[0.68] contrast-[1.1] scale-105 transform"
          />
          {/* Vignette and Dark Tint Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(75,65,225,0.15),transparent_70%)]" />
        </div>

        {/* LAYER 1: iOS Top System Status Bar */}
        <header className="relative z-30 pt-3.5 px-7 flex items-center justify-between text-white/95 text-[14px] font-semibold tracking-tight">
          <div className="w-16 flex items-center gap-1">
            <span className="text-white text-[15px] font-medium tracking-tight">{currentTime}</span>
          </div>

          {/* Dynamic Island Silhouette */}
          <div className="w-28 h-6 bg-black rounded-full flex items-center justify-center shadow-inner relative">
            <div className="absolute right-3 w-3 h-3 rounded-full bg-[#0a0f1d] border border-white/10 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#1b253b]" />
            </div>
          </div>

          {/* Telemetry Icons: Cellular, 5G, Battery */}
          <div className="w-16 flex items-center justify-end gap-1.5 text-white/90">
            <span className="text-[11px] font-bold tracking-tight">5G</span>
            <div className="flex items-center gap-0.5">
              <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-0.5 flex items-center">
                <div className="h-full bg-white rounded-[1.5px] w-[92%]" />
              </div>
              <div className="w-0.5 h-1 bg-white/80 rounded-r-xs" />
            </div>
          </div>
        </header>

        {/* LAYER 2: iOS Padlock, Date & Big Editorial Clock */}
        <div className="relative z-20 flex flex-col items-center pt-2 text-center text-white">
          <div className="mb-1.5 flex items-center justify-center opacity-85 text-white/90">
            <Lock className="w-4 h-4" />
          </div>
          <p className="text-[16px] text-white/80 tracking-wide font-medium">Saturday, October 26</p>
          <h1 className="text-[78px] leading-[80px] font-bold tracking-tighter text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)] mt-0.5 font-sans">
            {currentTime}
          </h1>
        </div>

        {/* LAYER 3: Live Activity Widget & Stacked Notifications */}
        <main className="relative z-20 px-3.5 flex flex-col gap-2.5 pb-2">
          {/* AURA CONCIERGE LIVE ACTIVITY WIDGET */}
          <article className="rounded-[28px] p-4 text-white transition-all duration-300 backdrop-blur-2xl bg-[#121622]/75 border border-white/15 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.18)]">
            {/* Header: Crest + Brand + Pulsing Live Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <span className="text-black font-extrabold text-[11px] tracking-tighter">A</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-white font-bold tracking-[0.12em] uppercase font-mono">
                    AURA CONCIERGE
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="text-[11px] text-white/60">#AUR-89241</span>
                </div>
              </div>

              {/* Pulsing Live Tag */}
              <div className="flex items-center gap-1.5 bg-[#4b41e1]/25 border border-[#4b41e1]/60 px-2.5 py-0.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#85f8c4] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#68dba9]" />
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#85f8c4]">
                  ARRIVING IN 14 MIN
                </span>
              </div>
            </div>

            {/* Main Body: Chauffeur Avatar & Service Telemetry */}
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                    alt="Marcus V."
                    className="w-11 h-11 rounded-full object-cover border border-white/20 shadow-md"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 bg-[#4b41e1] text-white rounded-full p-0.5 w-4 h-4 flex items-center justify-center border border-[#0b0e14]">
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-[15px] font-bold text-white tracking-tight">Marcus V.</h4>
                    <span className="text-white/40 text-[12px]">•</span>
                    <span className="text-[11px] text-white/80 font-medium">White Glove Courier</span>
                  </div>
                  <p className="text-[11px] text-white/60 flex items-center gap-1 mt-0.5">
                    <Car className="w-3.5 h-3.5 text-white/70" />
                    <span>Atelier Electric Van #04</span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/60">Climate Controlled</span>
                  </p>
                </div>
              </div>

              {/* Target ETA Window */}
              <div className="text-right pl-2 border-l border-white/10">
                <span className="text-[9px] uppercase tracking-wider text-white/50 block font-mono">WINDOW</span>
                <span className="text-[15px] font-bold text-white whitespace-nowrap font-mono">10:00–10:15</span>
                <span className="text-[10px] text-white/60 block">AM EST</span>
              </div>
            </div>

            {/* Telemetry Progress Bar */}
            <div className="mt-1 mb-2.5">
              <div className="flex items-center justify-between text-[10px] text-white/60 mb-1.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-white/70" />
                  SoHo Hub
                </span>
                <span className="text-white/90 font-medium">75% Complete</span>
                <span className="flex items-center gap-1 text-white/90 font-semibold">
                  <MapPin className="w-3 h-3 text-[#85f8c4]" />
                  452 W Broadway
                </span>
              </div>

              {/* Bar Track */}
              <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden relative">
                <div className="h-full bg-gradient-to-r from-white/70 via-[#85f8c4] to-[#e2dfff] rounded-full w-[75%] transition-all duration-500" />
              </div>

              {/* Route Mini Snippet */}
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-white/75 bg-white/5 px-2.5 py-1 rounded-lg">
                <Navigation className="w-3.5 h-3.5 text-[#c3c0ff]" />
                <span>Currently on <strong className="text-white font-semibold">Prince St</strong> turning onto <strong className="text-white font-semibold">W Broadway</strong></span>
              </div>
            </div>

            {/* Quick Action Interactive Chips & Notes */}
            <div className="pt-2 border-t border-white/10 flex items-center gap-2">
              {/* Present QR Pass Button */}
              <button
                onClick={onGoToPass}
                className="flex-1 bg-white text-[#0f172a] hover:bg-white/90 active:scale-[0.98] transition-transform duration-150 py-2 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-sm font-bold text-[12px] tracking-tight"
                type="button"
              >
                <QrCode className="w-4 h-4 text-black" />
                <span>Present QR Pass</span>
              </button>

              {/* Contact Courier */}
              <button
                onClick={() => {
                  setCallInitiated(true);
                  setTimeout(() => setCallInitiated(false), 3000);
                }}
                aria-label="Call Courier"
                className={`w-9 h-9 rounded-full border transition-all flex items-center justify-center ${
                  callInitiated 
                    ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse' 
                    : 'bg-white/10 hover:bg-white/20 active:scale-95 border-white/15 text-white'
                }`}
                type="button"
                title="Call Courier"
              >
                <Phone className="w-4 h-4" />
              </button>

              {/* Doorman Intercom Authorized Tag */}
              <button
                onClick={() => setDoorAuth(!doorAuth)}
                className={`border px-2.5 py-1.5 rounded-full flex items-center gap-1 transition-colors ${
                  doorAuth 
                    ? 'bg-white/10 border-white/15 text-white/90' 
                    : 'bg-red-500/20 border-red-400/40 text-red-200'
                }`}
              >
                <CheckCircle className={`w-3.5 h-3.5 ${doorAuth ? 'text-[#85f8c4]' : 'text-red-400'}`} />
                <span className="text-[10px] font-medium tracking-tight">Door #4021 Auth</span>
              </button>
            </div>
          </article>

          {/* STACKED LOCK SCREEN NOTIFICATIONS GROUP */}
          <div className="flex flex-col gap-2">
            {/* Notification 1: Apple Wallet Pass Ready */}
            <div 
              onClick={onGoToPass}
              className="rounded-2xl p-3 text-white active:scale-[0.99] transition-transform cursor-pointer backdrop-blur-xl bg-[#161a26]/65 border border-white/10 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1e2337] to-[#0f111c] border border-white/20 flex items-center justify-center shadow-inner flex-shrink-0 mt-0.5">
                  <Wallet className="w-4 h-4 text-[#dae2fd]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider font-mono">AURA PASSBOOK</span>
                    <span className="text-[10px] text-white/40">2m ago</span>
                  </div>
                  <h5 className="text-[13px] font-bold text-white mt-0.5 leading-tight">Return Pass Ready</h5>
                  <p className="text-[12px] text-white/75 leading-relaxed mt-0.5 line-clamp-2">
                    Tap to display RMA #RMA-89241-EX upon courier arrival. Garment vault bag is ready.
                  </p>
                </div>
              </div>
            </div>

            {/* Notification 2: Logistics Exchange Dispatch */}
            <div 
              onClick={onBackToTracking}
              className="rounded-2xl p-3 text-white opacity-90 active:scale-[0.99] transition-transform cursor-pointer backdrop-blur-xl bg-[#161a26]/65 border border-white/10 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#161f36] to-[#0e1424] border border-white/20 flex items-center justify-center shadow-inner flex-shrink-0 mt-0.5">
                  <Truck className="w-4 h-4 text-[#68dba9]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider font-mono">AURA LOGISTICS</span>
                    <span className="text-[10px] text-white/40">15m ago</span>
                  </div>
                  <h5 className="text-[13px] font-bold text-white mt-0.5 leading-tight">Exchange In Flight</h5>
                  <p className="text-[12px] text-white/75 leading-relaxed mt-0.5 line-clamp-2">
                    Structured Wool Blazer (Size 40) is staged for immediate priority dispatch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* LAYER 4: Bottom Quick Actions & Home Indicator */}
        <footer className="relative z-30 px-9 pb-3 pt-1 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3">
            <button
              aria-label="Flashlight"
              className="w-12 h-12 rounded-full bg-black/45 backdrop-blur-xl border border-white/15 text-white flex items-center justify-center active:bg-white active:text-black transition-colors duration-150 shadow-lg"
              type="button"
            >
              <Flashlight className="w-5 h-5" />
            </button>

            <span className="text-[11px] text-white/40 font-medium tracking-wide">
              Swipe up to unlock
            </span>

            <button
              aria-label="Camera"
              className="w-12 h-12 rounded-full bg-black/45 backdrop-blur-xl border border-white/15 text-white flex items-center justify-center active:bg-white active:text-black transition-colors duration-150 shadow-lg"
              type="button"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* iOS Home Bar Indicator */}
          <div 
            onClick={onBackToTracking} 
            className="w-36 h-1 bg-white/80 rounded-full cursor-pointer hover:bg-white transition-colors"
            title="Swipe up / Click to return"
          />
        </footer>
      </div>
    </div>
  );
}
