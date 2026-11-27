import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, RefreshCw, Share2, Copy, Check, Clock, 
  Plane, MapPin, ShieldCheck, Thermometer, UserCheck, 
  CheckCircle, MessageSquare, Phone, Bell, FileText, 
  Calendar, Edit3, Store, Radio, Smartphone, ExternalLink
} from 'lucide-react';

export default function LiveTransitTrackingView({ 
  onBackToPass, 
  onSelectCourierApp, 
  onOpenLockScreen 
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [smsSubscribed, setSmsSubscribed] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [hoursRemaining, setHoursRemaining] = useState(26);
  const [minutesRemaining, setMinutesRemaining] = useState(14);

  // Dynamic countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setMinutesRemaining((prevMin) => {
        if (prevMin <= 0) {
          setHoursRemaining((prevH) => (prevH > 0 ? prevH - 1 : 0));
          return 59;
        }
        return prevMin - 1;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(text);
    triggerToast(`Copied ${text} to clipboard`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    triggerToast('Syncing with DHL Satellite Relay & Oceanic Radar...');
    setTimeout(() => {
      setIsRefreshing(false);
      triggerToast('Shipment telemetry verified: Transatlantic Cargo en route.');
    }, 1200);
  };

  const toggleSms = () => {
    setSmsSubscribed(!smsSubscribed);
    triggerToast(
      !smsSubscribed 
        ? 'Subscribed to +1 (212) 555-0194 for live courier SMS alerts' 
        : 'SMS dispatch notifications paused'
    );
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#151b2d] antialiased selection:bg-[#4b41e1]/20 selection:text-[#4b41e1] pb-32">
      {/* ================= TOP APP BAR ================= */}
      <header className="sticky top-0 left-0 w-full z-40 bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#c6c6cd]/30 transition-all">
        <div className="max-w-4xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <button
            onClick={onBackToPass}
            className="p-1 -ml-1 text-[#45464d] hover:text-[#151b2d] rounded-full active:scale-95 transition-all"
            title="Go Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <span className="text-[10px] uppercase tracking-widest text-[#76777d] font-bold block font-mono">
              AURA LOGISTICS
            </span>
            <h1 className="text-sm font-bold text-[#151b2d] tracking-tight font-sans">
              TRACK ORDER
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-full text-[#45464d] hover:text-[#151b2d] hover:bg-[#eaedff] transition-all active:scale-90"
              title="Live Tracking Sync"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#4b41e1]' : ''}`} />
            </button>

            {onOpenLockScreen && (
              <button
                onClick={onOpenLockScreen}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#131b2e] text-white text-[11px] font-medium hover:bg-black transition-colors shadow-xs"
                title="Preview Lock Screen Widget"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#85f8c4]" />
                <span>Lock Screen</span>
              </button>
            )}

            <button
              onClick={() => triggerToast('Live tracking stream link generated.')}
              className="p-2 rounded-full text-[#45464d] hover:text-[#151b2d] hover:bg-[#eaedff] transition-all active:scale-90"
              title="Share Tracking Stream"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT CANVAS ================= */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 pt-4 space-y-6">
        {/* 1. ORDER SUMMARY & STATUS HERO CARD */}
        <section className="rounded-3xl bg-white p-5 md:p-7 shadow-[0_4px_24px_rgba(15,23,42,0.04)] border border-[#c6c6cd]/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4b41e1] via-[#645efb] to-[#131b2e]" />

          {/* Reference & Status Pill */}
          <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-2 pb-4 border-b border-[#c6c6cd]/30">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] uppercase font-bold text-[#76777d] tracking-wider font-mono">
                Order Reference
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f2f3ff] border border-[#c6c6cd]/40">
                <span className="font-mono text-xs font-bold text-[#151b2d]">#AUR-89241</span>
                <button
                  onClick={() => handleCopy('AUR-89241')}
                  className="text-[#45464d] hover:text-[#4b41e1] active:scale-90 transition-transform p-0.5"
                  title="Copy Order Reference"
                >
                  {copiedCode === 'AUR-89241' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e2dfff]/60 border border-[#4b41e1]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4b41e1] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4b41e1]" />
              </span>
              <span className="text-[11px] uppercase text-[#4b41e1] font-bold tracking-wider font-mono">
                In Transit • Transatlantic Cargo
              </span>
            </div>
          </div>

          {/* Delivery Hero Row */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-8 space-y-1.5">
              <div className="flex items-center gap-2 text-[#45464d]">
                <Clock className="w-4 h-4 text-[#4b41e1]" />
                <span className="text-xs font-medium">Estimated Arrival Window</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#151b2d]">
                Friday, Oct 24 <span className="font-normal text-[#45464d]">by</span> 4:00 PM
              </h2>
              <p className="text-xs text-[#76777d]">
                Shipment cleared Roissy Hub. On schedule for Manhattan White-Glove courier dispatch.
              </p>
            </div>

            {/* Delivery Countdown Card */}
            <div className="md:col-span-4 bg-[#f2f3ff]/70 rounded-2xl p-3.5 border border-[#c6c6cd]/30 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#76777d] uppercase tracking-wider block font-mono">
                  Est. Time Remaining
                </span>
                <span className="text-lg font-bold text-[#151b2d] font-mono">
                  {hoursRemaining}h {minutesRemaining}m
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4b41e1] border border-[#c6c6cd]/30 shadow-xs">
                <Plane className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Courier Partner Tabular Data Strip */}
          <div className="mt-6 pt-4 border-t border-[#c6c6cd]/30 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-[#76777d] uppercase block font-mono">Carrier</span>
              <span className="font-semibold text-[#151b2d] mt-0.5 block">
                DHL Express Carbon-Neutral
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#76777d] uppercase block font-mono">Waybill Number</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="font-mono text-[11px] font-medium text-[#151b2d]">
                  DHL-9924-8812-PAR
                </span>
                <button
                  onClick={() => handleCopy('DHL-9924-8812-PAR')}
                  className="text-[#76777d] hover:text-[#4b41e1] transition-colors"
                  title="Copy Waybill"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-[#76777d] uppercase block font-mono">Signature</span>
              <span className="font-semibold text-[#151b2d] mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Adult Signature Required
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#76777d] uppercase block font-mono">Package Care</span>
              <span className="font-semibold text-[#151b2d] mt-0.5 block">
                Atelier Climate Shield (20°C)
              </span>
            </div>
          </div>
        </section>

        {/* 2. INTERACTIVE VISUAL EDITORIAL CARTOGRAPHY MAP */}
        <section className="rounded-3xl bg-[#0c101c] text-white overflow-hidden border border-[#c6c6cd]/20 shadow-[0_8px_32px_rgba(15,23,42,0.08)] relative">
          <div className="relative w-full h-[320px] md:h-[380px] bg-[#0c101c] select-none overflow-hidden">
            {/* Architectural Grid Lines & Map Geometry */}
            <svg className="absolute inset-0 w-full h-full opacity-45" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="flight-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
                </pattern>
                <linearGradient id="flightGradAnimated" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4b41e1" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#85f8c4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#bec6e0" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#flight-grid)" />

              {/* Western Europe Silhouette */}
              <path d="M 680,80 Q 740,110 760,180 T 730,260 T 670,310 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              {/* Eastern North America Silhouette */}
              <path d="M 100,100 Q 180,140 190,210 T 170,290 T 110,340 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

              {/* Coordinates dashed lines */}
              <line x1="0" y1="190" x2="100%" y2="190" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 8" />
              <line x1="380" y1="0" x2="380" y2="100%" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 8" />

              {/* Transatlantic Flight Curve */}
              {/* Leg 1 Completed: Paris (690, 165) to Mid-Flight Atlantic (440, 145) */}
              <path d="M 690,165 Q 560,110 440,145" fill="none" stroke="#645efb" strokeWidth="3" strokeLinecap="round" />
              {/* Leg 2 In-Transit: Mid-Flight Atlantic (440, 145) to NYC JFK (180, 190) */}
              <path d="M 440,145 Q 310,180 180,190" fill="none" stroke="url(#flightGradAnimated)" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" />
            </svg>

            {/* Origin Pin: Paris Atelier */}
            <div className="absolute right-[14%] md:right-[18%] top-[40%] flex flex-col items-center z-10">
              <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#4b41e1] shadow-lg" />
              <div className="mt-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#d4d9f2] font-bold block font-mono">PARIS 75001</span>
                <span className="text-[8px] text-[#c6c6cd] block font-mono">Oct 22 • Departed</span>
              </div>
            </div>

            {/* Midpoint Plane Pin (DL-841) */}
            <div className="absolute left-[54%] top-[34%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-10 h-10 rounded-full bg-[#85f8c4]/30 animate-ping" />
                <div className="w-8 h-8 rounded-full bg-[#645efb] flex items-center justify-center text-white shadow-[0_0_20px_#645efb] border border-white/20">
                  <Plane className="w-4 h-4 transform -rotate-45" />
                </div>
              </div>
              <div className="mt-2 px-3 py-1 rounded-full bg-[#131b2e]/85 backdrop-blur-md border border-[#4b41e1]/50 text-center shadow-2xl flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#85f8c4] animate-ping" />
                <span className="text-[10px] font-mono text-white font-semibold tracking-wide">
                  Flight DL-841 • In Flight
                </span>
              </div>
            </div>

            {/* Destination Pin: Manhattan, NYC */}
            <div className="absolute left-[18%] md:left-[22%] top-[48%] flex flex-col items-center z-10">
              <div className="w-3.5 h-3.5 rounded-full bg-[#85f8c4] border-2 border-white shadow-[0_0_12px_rgba(133,248,196,0.6)]" />
              <div className="mt-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10 text-center">
                <span className="text-[9px] uppercase tracking-widest text-[#85f8c4] font-bold block font-mono">452 W BROADWAY</span>
                <span className="text-[8px] text-[#d4d9f2] block font-mono">NYC 10012 • Oct 24</span>
              </div>
            </div>

            {/* Floating Top Telemetry Bar */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-[#d4d9f2] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#85f8c4] animate-pulse" />
                  LIVE FLIGHT TELEMETRY
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white/80 font-mono">
                Route: CDG <span className="text-[#85f8c4]">→</span> JFK
              </span>
            </div>

            {/* Floating Diagnostics Bottom Strip */}
            <div className="absolute bottom-3 inset-x-3 grid grid-cols-3 gap-2 pointer-events-auto">
              <div className="bg-black/75 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <span className="text-[9px] text-[#c6c6cd] uppercase block font-mono">Current Altitude</span>
                <span className="text-xs md:text-sm font-semibold text-white font-mono">34,000 ft</span>
              </div>
              <div className="bg-black/75 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                <span className="text-[9px] text-[#c6c6cd] uppercase block font-mono">Ground Speed</span>
                <span className="text-xs md:text-sm font-semibold text-white font-mono">542 kts (Mach 0.82)</span>
              </div>
              <div className="bg-black/75 backdrop-blur-md rounded-xl p-2.5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-[#c6c6cd] uppercase block font-mono">Pod Ambient Temp</span>
                  <span className="text-xs md:text-sm font-semibold text-[#85f8c4] font-mono">20.2°C • Optimal</span>
                </div>
                <Thermometer className="w-4 h-4 text-[#85f8c4] hidden xs:block" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. MULTI-STAGE COURIER MILESTONE TIMELINE */}
        <section className="rounded-3xl bg-white p-6 md:p-8 border border-[#c6c6cd]/40 shadow-[0_4px_24px_rgba(15,23,42,0.03)] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#4b41e1] font-bold block font-mono">
                Live Courier Log
              </span>
              <h3 className="text-lg md:text-xl font-bold text-[#151b2d] tracking-tight mt-0.5">
                Journey Milestones
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-[#f2f3ff] text-[#45464d] border border-[#c6c6cd]/30 font-semibold">
              6 checkpoints
            </span>
          </div>

          <div className="relative pl-3 md:pl-5 space-y-7 border-l-2 border-[#eaedff] ml-3">
            {/* Stage 1: Order Confirmed */}
            <div className="relative pl-4 space-y-0.5">
              <div className="absolute -left-[23px] top-0.5 w-6 h-6 rounded-full bg-[#131b2e] text-white flex items-center justify-center text-[10px] shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h4 className="font-bold text-sm text-[#151b2d]">Order Confirmed &amp; Payment Secured</h4>
                <time className="text-[11px] text-[#76777d] font-mono">Oct 21, 14:32 CEST</time>
              </div>
              <p className="text-xs text-[#45464d]">AURA Paris Vendôme Flagship — Order vaulted into bespoke production allocation.</p>
            </div>

            {/* Stage 2: Handcrafted & Atelier QC Passed */}
            <div className="relative pl-4 space-y-0.5">
              <div className="absolute -left-[23px] top-0.5 w-6 h-6 rounded-full bg-[#131b2e] text-white flex items-center justify-center text-[10px] shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h4 className="font-bold text-sm text-[#151b2d]">Atelier Hand-Finishing &amp; Quality Certification</h4>
                <time className="text-[11px] text-[#76777d] font-mono">Oct 22, 09:15 CEST</time>
              </div>
              <p className="text-xs text-[#45464d]">Certified by Master Artisan Pierre L. Silk garment bags sealed in tamper-evident packaging.</p>
            </div>

            {/* Stage 3: Dispatched & Export Customs Cleared */}
            <div className="relative pl-4 space-y-0.5">
              <div className="absolute -left-[23px] top-0.5 w-6 h-6 rounded-full bg-[#131b2e] text-white flex items-center justify-center text-[10px] shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h4 className="font-bold text-sm text-[#151b2d]">Export Customs Cleared &amp; Transferred to CDG Hub</h4>
                <time className="text-[11px] text-[#76777d] font-mono">Oct 22, 17:40 CEST</time>
              </div>
              <p className="text-xs text-[#45464d]">Charles de Gaulle International (CDG) Airfreight Center. Pre-clearance approved by US Border Patrol.</p>
            </div>

            {/* Stage 4: Transatlantic Air Transit (ACTIVE) */}
            <div className="relative pl-4">
              <div className="absolute -left-[25px] top-2 w-7 h-7 rounded-full bg-[#4b41e1] text-white flex items-center justify-center shadow-md ring-4 ring-[#e2dfff]">
                <Plane className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#4b41e1]/30 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#4b41e1]">Transatlantic Air Transit In Progress</h4>
                    <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-[#4b41e1] text-white rounded-full font-mono">
                      ACTIVE
                    </span>
                  </div>
                  <time className="text-[11px] font-semibold text-[#4b41e1] font-mono">Oct 23, 08:30 GMT • Live</time>
                </div>
                <p className="text-xs text-[#151b2d] mt-1.5">
                  En route aboard flight DL-841 (Paris CDG <span className="text-[#4b41e1]">→</span> New York JFK). Estimated JFK touch down at 13:45 EDT.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-[#45464d] font-mono">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Flight Telemetry Connected
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Climate Seal Intact
                  </span>
                </div>
              </div>
            </div>

            {/* Stage 5: Out for White Glove Manhattan Courier (Upcoming) */}
            <div className="relative pl-4 space-y-0.5 opacity-70">
              <div className="absolute -left-[21px] top-1 w-5 h-5 rounded-full bg-[#d4d9f2] text-[#45464d] flex items-center justify-center text-[10px]">
                5
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h4 className="font-semibold text-sm text-[#151b2d]">Out for White Glove Manhattan Courier</h4>
                <time className="text-[11px] text-[#76777d] font-mono">Est. Oct 24, 09:00 EDT</time>
              </div>
              <p className="text-xs text-[#76777d]">Handover to dedicated AURA Private Chauffeur courier for direct Manhattan dispatch.</p>
            </div>

            {/* Stage 6: Delivered & Signed (Upcoming) */}
            <div className="relative pl-4 space-y-0.5 opacity-55">
              <div className="absolute -left-[21px] top-1 w-5 h-5 rounded-full bg-[#d4d9f2] text-[#45464d] flex items-center justify-center text-[10px]">
                6
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h4 className="font-semibold text-sm text-[#151b2d]">Delivered &amp; In-Person Signature</h4>
                <time className="text-[11px] text-[#76777d] font-mono">Est. Oct 24 by 16:00 EDT</time>
              </div>
              <p className="text-xs text-[#76777d]">Recipient: Elena Vasiliev. Photo ID verification and contactless encrypted signature capture.</p>
            </div>
          </div>
        </section>

        {/* 4. DELIVERY MANAGEMENT & PREFERENCES CARD */}
        <section className="rounded-3xl bg-white p-6 md:p-8 border border-[#c6c6cd]/40 shadow-[0_4px_24px_rgba(15,23,42,0.03)] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#76777d] font-bold block font-mono">
                Logistics Settings
              </span>
              <h3 className="text-lg md:text-xl font-bold text-[#151b2d] tracking-tight">
                Delivery Address &amp; Instructions
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff]/60 text-xs text-[#151b2d] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Locked for Security
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="p-4 rounded-2xl bg-[#f2f3ff]/60 border border-[#c6c6cd]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#76777d] uppercase tracking-wider font-mono">
                  Recipient &amp; Destination
                </span>
                <MapPin className="w-4 h-4 text-[#76777d]" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#151b2d]">Elena Vasiliev</p>
                <p className="text-[#45464d] mt-0.5">452 W Broadway, Apt 4B</p>
                <p className="text-[#45464d]">SoHo, New York, NY 10012</p>
                <p className="text-[#76777d] font-mono mt-1">+1 (212) 555-0194</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f2f3ff]/60 border border-[#c6c6cd]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#76777d] uppercase tracking-wider font-mono">
                  Active Courier Note
                </span>
                <UserCheck className="w-4 h-4 text-[#4b41e1]" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#151b2d]">Doorman Reception Authorized</p>
                <p className="text-[#45464d] mt-0.5 leading-relaxed">
                  "Leave with front lobby concierge / doorman (Call Intercom Ring #4021). Signature pre-authorized via resident key registry."
                </p>
              </div>
            </div>
          </div>

          {/* Action Toggles */}
          <div className="pt-2 border-t border-[#c6c6cd]/30 space-y-3">
            <span className="text-[10px] text-[#76777d] uppercase tracking-wider block font-mono font-bold">
              Modify Preferences
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <button
                onClick={() => triggerToast('Reschedule modal opened. Earliest alternate: Saturday Oct 25.')}
                className="h-11 px-4 rounded-xl border border-[#c6c6cd]/60 hover:border-[#151b2d] bg-white text-[#151b2d] hover:bg-[#f2f3ff] transition-all flex items-center justify-between group active:scale-98 font-medium"
              >
                <span>Reschedule Date</span>
                <Calendar className="w-4 h-4 text-[#76777d] group-hover:text-black" />
              </button>
              <button
                onClick={() => triggerToast('Signature waiver confirmed for concierge reception.')}
                className="h-11 px-4 rounded-xl border border-[#c6c6cd]/60 hover:border-[#151b2d] bg-white text-[#151b2d] hover:bg-[#f2f3ff] transition-all flex items-center justify-between group active:scale-98 font-medium"
              >
                <span>Signature Waiver</span>
                <Edit3 className="w-4 h-4 text-[#76777d] group-hover:text-black" />
              </button>
              <button
                onClick={() => triggerToast('Hold requested at AURA SoHo Flagship Atelier (452 W Broadway).')}
                className="h-11 px-4 rounded-xl border border-[#c6c6cd]/60 hover:border-[#151b2d] bg-white text-[#151b2d] hover:bg-[#f2f3ff] transition-all flex items-center justify-between group active:scale-98 font-medium"
              >
                <span>Hold at SoHo Atelier</span>
                <Store className="w-4 h-4 text-[#76777d] group-hover:text-black" />
              </button>
            </div>
          </div>
        </section>

        {/* 5. PACKAGE MANIFEST PREVIEW */}
        <section className="rounded-3xl bg-white p-6 md:p-8 border border-[#c6c6cd]/40 shadow-[0_4px_24px_rgba(15,23,42,0.03)] space-y-5">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-[#76777d] uppercase tracking-wider font-mono font-bold block">
                Manifest Breakdown
              </span>
              <h3 className="text-lg md:text-xl font-bold text-[#151b2d] tracking-tight">
                3 Items in Package
              </h3>
            </div>
            <span className="text-lg font-bold text-[#151b2d] font-mono">$798.12</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Item 1 */}
            <div className="flex gap-3.5 p-3 rounded-2xl bg-[#f2f3ff]/50 border border-[#c6c6cd]/30 items-center">
              <div className="w-16 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-[#c6c6cd]/30">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=300&auto=format&fit=crop"
                  alt="Structured Wool Blazer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5 overflow-hidden text-xs">
                <span className="text-[9px] uppercase font-mono text-[#76777d] font-bold block truncate">
                  AURA TAILORING
                </span>
                <h4 className="font-bold text-[#151b2d] truncate">Structured Wool Blazer</h4>
                <span className="text-[#45464d] text-[11px] block">Charcoal / EU 38</span>
                <span className="font-mono font-semibold text-[#151b2d] block pt-0.5">$390.00</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-3.5 p-3 rounded-2xl bg-[#f2f3ff]/50 border border-[#c6c6cd]/30 items-center">
              <div className="w-16 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-[#c6c6cd]/30">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=300&auto=format&fit=crop"
                  alt="Pleated Wide Trousers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5 overflow-hidden text-xs">
                <span className="text-[9px] uppercase font-mono text-[#76777d] font-bold block truncate">
                  AURA READY-TO-WEAR
                </span>
                <h4 className="font-bold text-[#151b2d] truncate">Pleated Wide Trousers</h4>
                <span className="text-[#45464d] text-[11px] block">Alabaster / EU 36</span>
                <span className="font-mono font-semibold text-[#151b2d] block pt-0.5">$218.00</span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-3.5 p-3 rounded-2xl bg-[#f2f3ff]/50 border border-[#c6c6cd]/30 items-center">
              <div className="w-16 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-[#c6c6cd]/30">
                <img
                  src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=300&auto=format&fit=crop"
                  alt="Sculpted Calfskin Tote"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5 overflow-hidden text-xs">
                <span className="text-[9px] uppercase font-mono text-[#76777d] font-bold block truncate">
                  AURA LEATHERGOODS
                </span>
                <h4 className="font-bold text-[#151b2d] truncate">Sculpted Calfskin Tote</h4>
                <span className="text-[#45464d] text-[11px] block">Midnight Noir / Med</span>
                <span className="font-mono font-semibold text-[#151b2d] block pt-0.5">$190.12</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CONCIERGE SUPPORT & ASSISTANCE */}
        <section className="rounded-3xl bg-[#f2f3ff] p-6 border border-[#c6c6cd]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#131b2e] text-white flex items-center justify-center shrink-0 shadow-sm">
              <MessageSquare className="w-5 h-5 text-[#85f8c4]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#151b2d]">Dedicated Atelier Concierge</h4>
              <p className="text-xs text-[#76777d]">Need special handling instructions or immediate route verification?</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => triggerToast('Connecting directly with AURA Paris Concierge...')}
              className="flex-1 sm:flex-initial h-11 px-5 rounded-full bg-[#131b2e] text-white text-xs font-semibold hover:bg-black transition-all active:scale-98 flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat Concierge</span>
            </button>
            <a
              href="tel:2125550194"
              className="h-11 w-11 rounded-full border border-[#c6c6cd]/60 bg-white text-[#151b2d] hover:bg-[#eaedff] transition-colors flex items-center justify-center active:scale-95"
              title="Call Courier Hotline"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      {/* ================= STICKY DOCKED BOTTOM UTILITY BAR ================= */}
      <aside className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-t border-[#c6c6cd]/30 shadow-[0_-4px_24px_rgba(15,23,42,0.06)]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#4b41e1]/10 flex items-center justify-center text-[#4b41e1] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold text-[#4b41e1] block font-mono">
                Estimated Oct 24
              </span>
              <span className="text-xs text-[#151b2d] truncate block font-medium">
                To: Elena Vasiliev (SoHo, NY)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenLockScreen && (
              <button
                onClick={onOpenLockScreen}
                className="h-11 px-3.5 rounded-full bg-[#f2f3ff] text-[#4b41e1] border border-[#4b41e1]/30 font-semibold text-xs transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Live Activity</span>
              </button>
            )}

            <button
              onClick={toggleSms}
              className={`h-11 px-3.5 rounded-full border text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5 ${
                smsSubscribed 
                  ? 'bg-[#e2dfff] text-[#4b41e1] border-[#4b41e1]' 
                  : 'border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-[#151b2d]'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">{smsSubscribed ? 'Subscribed' : 'SMS Updates'}</span>
            </button>

            <button
              onClick={() => setInvoiceModalOpen(true)}
              className="h-11 px-4 rounded-full bg-[#131b2e] text-white text-xs font-semibold hover:bg-black transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
            >
              <span>View Invoice</span>
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Invoice Modal */}
      {invoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-[#c6c6cd]/40">
            <div className="flex items-center justify-between pb-3 border-b border-[#c6c6cd]/30">
              <h3 className="font-bold text-base text-[#151b2d]">Tax Invoice &amp; Receipt</h3>
              <button
                onClick={() => setInvoiceModalOpen(false)}
                className="p-1 text-[#76777d] hover:text-black rounded-full"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#76777d]">Invoice ID:</span>
                <span className="font-bold">INV-AUR-2025-89241</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#76777d]">Date:</span>
                <span>Oct 21, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#76777d]">Billing Client:</span>
                <span>Elena Vasiliev</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#76777d]">Payment Method:</span>
                <span>Apple Pay (•••• 9021)</span>
              </div>
              <div className="pt-2 border-t border-[#c6c6cd]/30 flex justify-between font-bold text-sm">
                <span>Total Paid:</span>
                <span className="text-[#4b41e1]">$798.12 USD</span>
              </div>
            </div>
            <button
              onClick={() => {
                setInvoiceModalOpen(false);
                triggerToast('Official PDF receipt downloaded.');
              }}
              className="w-full h-11 rounded-full bg-[#131b2e] text-white text-xs font-bold hover:bg-black"
            >
              Download PDF Receipt
            </button>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-white/20 text-xs animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-[#85f8c4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
