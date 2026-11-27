import React, { useState } from 'react';
import { 
  Navigation, Radio, Check, Lock, Unlock, ShieldCheck, 
  MapPin, CheckCircle2, User, Sparkles, AlertTriangle, 
  Phone, Key, QrCode, ArrowLeft, ArrowRight, ExternalLink,
  Zap, Package, Shield, RefreshCw
} from 'lucide-react';

export default function DoorstepNfcVerificationView({
  onBackToRoute,
  onProceedToFitConfirmation,
  onGoToDigitalWardrobe,
  onGoToStorefront
}) {
  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'authenticated'
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTriggerScan = () => {
    if (scanState === 'scanning') return;

    if (scanState === 'authenticated') {
      triggerToast('Garment micro-latch already released. Opening Fit Consultation...');
      setTimeout(() => {
        if (onProceedToFitConfirmation) onProceedToFitConfirmation();
      }, 800);
      return;
    }

    setScanState('scanning');
    triggerToast('Interrogating NTAG424 DNA cryptographic chip...');

    setTimeout(() => {
      setScanState('authenticated');
      triggerToast('Mutual NFC Verified. Clasp Unlocked!');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-[#151B2D] font-sans antialiased flex flex-col pb-28 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-5 py-2.5 rounded-full text-xs font-mono shadow-2xl border border-neutral-700 flex items-center gap-2 animate-bounce">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP APP BAR */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={onBackToRoute || onGoToStorefront}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors active:scale-95 text-neutral-800"
              title="Return to Route"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4B41E1] animate-pulse"></span>
              <span className="text-[10px] font-mono text-neutral-800 uppercase tracking-wider font-bold">
                UNIT #07 • JULIAN R.
              </span>
            </div>
          </div>

          {/* Brand Anchor */}
          <div className="text-center">
            <h1 className="text-xs font-bold tracking-widest uppercase text-neutral-900 font-mono">
              AURA ATELIER OPS
            </h1>
          </div>

          {/* Sensor Connection Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            <span>DOORSTEP NFC</span>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN SCREEN CANVAS                                                        */}
      {/* ========================================================================= */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-28 lg:pb-16 flex flex-col space-y-6">
        {/* Client & Stop Context Badge Bar */}
        <section className="mt-2 rounded-xl bg-white border border-neutral-200 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-black text-white rounded-full text-[10px] font-mono uppercase tracking-wider font-bold">
                STOP 01
              </span>
              <span className="text-xs font-mono text-[#4B41E1] font-bold tracking-wide uppercase">
                IN-HOME TRY-ON
              </span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#E2DFFF] text-[#0F0069] text-[10px] font-bold">
              <Sparkles className="w-3 h-3 text-[#4B41E1]" />
              <span>TIER 01 PRIVÉ</span>
            </div>
          </div>

          <div className="mt-3 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Elena Vasiliev</h2>
              <p className="text-xs text-neutral-500 flex items-center mt-0.5">
                <MapPin className="w-3.5 h-3.5 mr-1 text-neutral-400 shrink-0" />
                142 Mercer St, Penthouse B • SoHo, NYC
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-400 uppercase font-mono block">CLIENT ID</span>
              <span className="text-xs font-mono font-bold text-black">VIP-ELN-88390</span>
            </div>
          </div>
        </section>

        {/* Central Interactive NFC Tap Zone */}
        <section className="relative rounded-2xl bg-white border border-neutral-200 p-5 overflow-hidden shadow-xs flex flex-col items-center text-center">
          {/* Top Hardware Telemetry Badge */}
          <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-neutral-100">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${scanState === 'authenticated' ? 'bg-emerald-500' : 'bg-emerald-500 animate-ping'}`}></span>
              <span className="text-[10px] font-mono text-neutral-700 uppercase font-bold tracking-wider">
                13.56 MHz FIELD ACTIVE
              </span>
            </div>
            <div className="text-[10px] font-mono text-neutral-500">
              UID: 0x8921-zkNFC
            </div>
          </div>

          {/* High-Tech Radar Tap Interface */}
          <div 
            onClick={handleTriggerScan}
            className="relative my-3 w-52 h-52 flex items-center justify-center cursor-pointer group"
          >
            {/* Radar concentric ripple rings */}
            <div className={`absolute inset-0 rounded-full border border-[#4B41E1]/20 ${scanState === 'scanning' ? 'animate-ping' : ''}`}></div>
            <div className="absolute inset-3 rounded-full border border-neutral-200"></div>
            <div className="absolute inset-8 rounded-full border border-[#4B41E1]/30 bg-neutral-50/60"></div>

            {/* Rotating reticle sweep */}
            <div className="absolute inset-5 rounded-full border-t border-r border-[#4B41E1]/50 animate-spin pointer-events-none" style={{ animationDuration: '6s' }}></div>

            {/* Crosshairs */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#4B41E1] rounded-full"></div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-neutral-400 rounded-full"></div>
            <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-neutral-400 rounded-full"></div>
            <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-neutral-400 rounded-full"></div>

            {/* Central Core Transceiver Node */}
            <div className={`relative z-10 w-28 h-28 rounded-full text-white flex flex-col items-center justify-center shadow-lg border transition-all duration-300 group-active:scale-95 ${
              scanState === 'authenticated' 
                ? 'bg-emerald-900 border-emerald-500 shadow-emerald-500/20' 
                : 'bg-neutral-900 border-[#4B41E1]/50 shadow-black/30'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                scanState === 'authenticated' ? 'bg-emerald-800 text-emerald-300' : 'bg-[#4B41E1]/30 text-[#C3C0FF]'
              }`}>
                {scanState === 'authenticated' ? (
                  <Unlock className="w-5 h-5 text-emerald-300" />
                ) : (
                  <Radio className="w-5 h-5 text-[#C3C0FF]" />
                )}
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-neutral-300">
                {scanState === 'authenticated' ? 'CLASP OPEN' : 'NTAG424 DNA'}
              </span>
              <span className="text-[8px] font-mono text-neutral-400">Sun Crypto L3</span>
            </div>
          </div>

          {/* Action Prompt */}
          <div className="mt-2 space-y-1">
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">
              {scanState === 'authenticated' ? 'Tamper Clasp Successfully Unlocked' : 'Hold Courier Terminal to Cedar Clasp'}
            </h3>
            <p className="text-xs text-neutral-500 max-w-[260px] mx-auto">
              {scanState === 'authenticated' 
                ? 'Micro-latch released. Nitrogen pressure normalized for client Elena.'
                : 'Position device top-edge within 20mm of the coat welt smart seal for cryptographic handshake.'}
            </p>
          </div>

          {/* Dynamic Status Pill */}
          <div className={`mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
            scanState === 'authenticated' 
              ? 'bg-emerald-50 border-emerald-400 text-emerald-800' 
              : 'bg-neutral-100 border-[#4B41E1]/30 text-neutral-900'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              scanState === 'authenticated' ? 'bg-emerald-500' : 'bg-[#4B41E1] animate-pulse'
            }`}></span>
            <span className="font-mono text-[11px]">
              {scanState === 'idle' && 'Interrogating RFID/NFC Field...'}
              {scanState === 'scanning' && 'Authenticating zk-SNARK Clasp...'}
              {scanState === 'authenticated' && 'Cryptographic Seal Validated • 0x8921'}
            </span>
          </div>
        </section>

        {/* Bespoke Garment & Vault Security Manifest Card */}
        <section className="rounded-xl bg-white border border-neutral-200 p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-1.5">
              <Package className="w-4 h-4 text-black" />
              <span className="text-[11px] font-mono uppercase font-bold text-black tracking-wider">
                GARMENT & SEAL MANIFEST
              </span>
            </div>
            <span className="font-mono text-xs text-[#4B41E1] font-bold">TICKET #ALT-401</span>
          </div>

          {/* Garment Details */}
          <div className="mt-3 flex gap-3.5">
            <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80" 
                alt="Structured Obsidian Wool Blazer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white font-bold">
                SZ 40
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">AURA BESPOKE</span>
                  <span className="text-[10px] font-mono text-neutral-500">BOLT #LP-9982</span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 mt-0.5 leading-tight">
                  Structured Obsidian Wool Blazer
                </h4>
              </div>

              <div className="pt-1.5 space-y-1 text-xs">
                <div className="flex items-center text-neutral-600 text-[11px]">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
                  <span>Hermetic Cedar-Bagged Seal Intact</span>
                </div>
                <div className="flex items-center text-neutral-600 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-[#4B41E1] mr-1.5 shrink-0" />
                  <span>Nitrogen 99.9% • Aomori Cedar Infused</span>
                </div>
              </div>
            </div>
          </div>

          {/* Apple Wallet Client Pass Synchronization */}
          <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between bg-neutral-50 -mx-4 -mb-4 px-4 py-2.5 rounded-b-xl">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-neutral-800" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase font-bold text-neutral-900">
                  Elena's Apple Wallet Pass
                </span>
                <span className="text-[10px] font-mono text-neutral-500">PASS #AURA-WAL-99210</span>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
              SYNCED & WAITING
            </span>
          </div>
        </section>

        {/* Security Verification Protocol Tracker */}
        <section className="rounded-xl bg-white border border-neutral-200 p-4 shadow-xs">
          <h3 className="text-[11px] font-mono uppercase text-neutral-500 font-bold tracking-wider mb-3">
            SECURITY VERIFICATION PROTOCOL
          </h3>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">1. Courier Doorstep Proximity</span>
                  <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                    VERIFIED 17:14 EST
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  GPS + Ultra-Wideband (UWB) Beacon match at 142 Mercer St Penthouse B.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                scanState === 'authenticated' 
                  ? 'bg-emerald-500 text-white' 
                  : 'border-2 border-[#4B41E1] bg-white text-[#4B41E1] animate-pulse'
              }`}>
                {scanState === 'authenticated' ? <Check className="w-3.5 h-3.5" /> : <Radio className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${scanState === 'authenticated' ? 'text-neutral-900' : 'text-[#4B41E1]'}`}>
                    2. NFC Cryptographic Mutual Challenge
                  </span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    scanState === 'authenticated' ? 'bg-emerald-100 text-emerald-800' : 'bg-[#E2DFFF] text-[#4B41E1]'
                  }`}>
                    {scanState === 'authenticated' ? 'AUTHENTICATED' : 'PENDING TAP'}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Reading AES-128 cryptographic MAC from NTAG424 hardware tamper clasp.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`flex items-start gap-3 transition-opacity ${
              scanState === 'authenticated' ? 'opacity-100' : 'opacity-50'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                scanState === 'authenticated' ? 'bg-emerald-500 text-white' : 'border border-neutral-300 bg-neutral-100 text-neutral-400'
              }`}>
                {scanState === 'authenticated' ? <Check className="w-3.5 h-3.5" /> : <span className="text-[10px] font-bold">3</span>}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900">3. Vault Smart Seal Unlock Handshake</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    scanState === 'authenticated' ? 'bg-emerald-50 text-emerald-700' : 'text-neutral-400'
                  }`}>
                    {scanState === 'authenticated' ? 'UNLOCKED' : 'ARMED'}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Decentralized zk-SNARK attestation to release micro-latch on garment bag.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Primary & Fallback Actions */}
        <section className="pt-2 pb-6 space-y-2.5">
          {/* Primary Action Button */}
          <button 
            onClick={handleTriggerScan}
            className={`w-full h-13 rounded-full font-bold text-xs tracking-tight shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all ${
              scanState === 'authenticated'
                ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                : scanState === 'scanning'
                ? 'bg-[#4B41E1] text-white animate-pulse'
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            {scanState === 'authenticated' ? (
              <>
                <Unlock className="w-4 h-4 text-emerald-200" />
                <span>Cedar Bag Unlocked • Hand Over to Client</span>
              </>
            ) : scanState === 'scanning' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                <span>Authenticating zk-SNARK Clasp...</span>
              </>
            ) : (
              <>
                <Radio className="w-4 h-4 text-[#C3C0FF]" />
                <span>Tap to Interrogate NFC Smart Clasp</span>
              </>
            )}
          </button>

          {/* Quick Fallbacks Grid */}
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => triggerToast('Requesting Client One-Time Passcode (OTP)...')}
              className="h-11 px-2 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold flex flex-col items-center justify-center text-center transition-colors active:scale-95"
            >
              <Key className="w-3.5 h-3.5 text-neutral-700" />
              <span className="text-[10px] mt-0.5">Client OTP</span>
            </button>

            <button 
              onClick={() => triggerToast('Calling Concierge George (+1 212-555-0199)...')}
              className="h-11 px-2 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold flex flex-col items-center justify-center text-center transition-colors active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-700" />
              <span className="text-[10px] mt-0.5">Concierge</span>
            </button>

            <button 
              onClick={() => triggerToast('Tamper Flag Alert Logged for Operations Dispatch')}
              className="h-11 px-2 rounded-xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold flex flex-col items-center justify-center text-center transition-colors active:scale-95"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span className="text-[10px] mt-0.5">Flag Tamper</span>
            </button>
          </div>

          {/* Direct Handshake Link to Digital Wardrobe */}
          {scanState === 'authenticated' && (
            <button
              onClick={onGoToDigitalWardrobe}
              className="w-full py-2.5 rounded-xl bg-[#4B41E1]/10 border border-[#4B41E1]/30 text-[#4B41E1] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#4B41E1]/20 transition-colors"
            >
              <span>View Elena's Digital Wardrobe & Archival Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </section>
      </main>

      {/* GLOBAL OPERATIONAL BOTTOM NAVIGATION BAR (Mobile Only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 h-15 bg-white/90 backdrop-blur-lg border-t border-neutral-200 shadow-md">
        <button 
          onClick={onBackToRoute}
          className="flex flex-col items-center justify-center text-neutral-500 hover:text-black transition-colors min-w-14"
        >
          <Package className="w-5 h-5" />
          <span className="text-[10px] font-mono tracking-wider mt-0.5">Manifest</span>
        </button>

        <button 
          onClick={onBackToRoute}
          className="flex flex-col items-center justify-center text-neutral-500 hover:text-black transition-colors min-w-14"
        >
          <Navigation className="w-5 h-5" />
          <span className="text-[10px] font-mono tracking-wider mt-0.5">Route</span>
        </button>

        {/* ACTIVE: Scan NFC */}
        <button className="flex flex-col items-center justify-center text-[#4B41E1] font-bold min-w-14">
          <Radio className="w-5 h-5 text-[#4B41E1]" />
          <span className="text-[10px] font-mono tracking-wider mt-0.5">Scan NFC</span>
          <span className="w-1 h-1 bg-[#4B41E1] rounded-full mt-0.5"></span>
        </button>

        <button 
          onClick={() => triggerToast('Comms Channel: Connected to Julian R.')}
          className="flex flex-col items-center justify-center text-neutral-500 hover:text-black transition-colors min-w-14"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-mono tracking-wider mt-0.5">Comms</span>
        </button>
      </nav>
    </div>
  );
}
