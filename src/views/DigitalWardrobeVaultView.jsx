import React, { useState } from 'react';
import { 
  ArrowLeft, Globe, Radio, ShoppingBag, ShieldCheck, 
  TrendingUp, Sparkles, Check, CheckCircle2, ChevronRight, 
  ArrowRight, Shield, Scissors, DollarSign, X, Layers,
  Lock, RefreshCw, Eye, Tag, AlertCircle, Heart, Search,
  Grid, User, SlidersHorizontal
} from 'lucide-react';

export default function DigitalWardrobeVaultView({
  onBackToStore,
  onGoToBag,
  onGoToCatalog,
  onGoToPdp,
  onGoToVault,
  onGoToFittings,
  onGoToFitConfirmation
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPassportModal, setShowPassportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [dismissBanner, setDismissBanner] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const pieces = [
    {
      id: 'p1',
      title: 'Double-Faced Cashmere Trench',
      season: "Fall '23",
      category: 'outerwear',
      size: 'EU 38',
      price: '$1,420 est.',
      condition: 'Mint',
      nfc: 'OK',
      inCare: false,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p2',
      title: 'Crepe Silk Column Slip',
      season: "Pre-Fall '24",
      category: 'silk',
      size: 'EU 36',
      price: '$890 est.',
      condition: 'Near Mint',
      nfc: 'OK',
      inCare: true,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p3',
      title: 'Sculpted Calfskin Tote',
      season: "Spring '24",
      category: 'leather',
      size: 'One Size',
      price: '$1,650 est.',
      condition: 'Vaulted',
      nfc: 'OK',
      inCare: false,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p4',
      title: 'Ribbed Merino Turtleneck',
      season: "Winter '23",
      category: 'silk',
      size: 'EU 38',
      price: '$520 est.',
      condition: 'Mint',
      nfc: 'OK',
      inCare: false,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredPieces = pieces.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'outerwear') return p.category === 'outerwear';
    if (activeCategory === 'silk') return p.category === 'silk';
    if (activeCategory === 'leather') return p.category === 'leather';
    if (activeCategory === 'care') return p.inCare;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-[#151B2D] font-sans antialiased flex flex-col pb-32 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-5 py-2.5 rounded-full text-xs font-mono shadow-2xl border border-neutral-700 flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cryptographic Passport Modal */}
      {showPassportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#4B41E1]" />
                <h3 className="font-bold text-sm text-neutral-900">zkEVM Digital Twin Certificate</h3>
              </div>
              <button 
                onClick={() => setShowPassportModal(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900 text-neutral-200 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Cert ID:</span>
                <span className="text-emerald-400 font-bold">#NFC-99210-OBS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Garment:</span>
                <span className="text-white">Obsidian Blazer (Sz 40)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Polygon zkEVM:</span>
                <span className="text-[#C3C0FF]">Block #19824102</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">HSM Enclave:</span>
                <span className="text-emerald-400">FIPS 140-3 Level 4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Owner Wallet:</span>
                <span className="text-neutral-300">0x8839...ELN4</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>NTAG424 DNA Sun Crypto physically bound to breast welt</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>LiDAR photogrammetry avatar matched with 0.00mm delta</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setShowPassportModal(false);
                if (onGoToVault) onGoToVault();
              }}
              className="w-full py-2.5 rounded-xl bg-black text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-neutral-800"
            >
              <span>Inspect on Provenance Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP APP BAR                                                               */}
      {/* ========================================================================= */}
      {/* Top Docked Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#FAF8FF]/90 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToStore}
              className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Return to Store"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-lg font-extrabold tracking-tighter text-black uppercase font-serif">
              AURA
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-mono tracking-widest text-neutral-900 uppercase font-bold">
              DIGITAL WARDROBE VAULT
            </span>
            <span className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase">
              CRYPTOGRAPHIC ARCHIVE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => triggerToast('NFC Scanner Ready. Hold phone near physical garment tag.')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Scan Physical NFC"
            >
              <Radio className="w-4 h-4" />
            </button>
            <button 
              onClick={onGoToBag}
              className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors relative"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-[#4B41E1] absolute top-2 right-2"></span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CANVAS                                                               */}
      {/* ========================================================================= */}
      <main className="pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 pb-24 lg:pb-16">
        {/* Screen Title & Vault Context */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">
              PRIVATE ARCHIVE &amp; VERIFIED ASSETS
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
              Elena's Digital Vault
            </h1>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-neutral-700">LIVE SYNC ACTIVE</span>
          </div>
        </div>

        {/* Elena VIP Portfolio Card & Valuation Stats */}
        <section className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0">
                EV
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-neutral-900">Elena Vasiliev</span>
                  <ShieldCheck className="w-4 h-4 text-[#4B41E1]" />
                </div>
                <span className="text-xs font-mono text-neutral-500 block">Atelier Elite #EV-8842</span>
                <span className="mt-1 inline-block text-[10px] font-mono font-bold bg-[#E2DFFF] text-[#3323CC] px-2.5 py-0.5 rounded-full tracking-wider">
                  TIER 01 PRIVÉ
                </span>
              </div>
            </div>

            <div className="bg-[#FAF8FF] rounded-2xl p-4 border border-neutral-100">
              <span className="text-xs text-neutral-500 block">Vault Valuation</span>
              <span className="text-2xl font-bold text-neutral-900 font-mono tracking-tight">$18,450</span>
              <span className="text-xs text-emerald-700 flex items-center gap-1 mt-0.5 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> +8.4% Provenance Yield
              </span>
            </div>

            <div className="bg-[#FAF8FF] rounded-2xl p-4 border border-neutral-100">
              <span className="text-xs text-neutral-500 block">Cryptographic Assets</span>
              <span className="text-2xl font-bold text-neutral-900 font-mono">14 Pieces</span>
              <span className="text-xs text-neutral-500 block mt-0.5">100% NFC Verified</span>
            </div>
          </div>
        </section>

        {/* Status Banner: Newly Minted Asset */}
        {!dismissBanner && (
          <section className="bg-neutral-900 text-white rounded-3xl p-5 flex items-start gap-4 relative overflow-hidden shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#4B41E1] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="pr-8 text-xs sm:text-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#C3C0FF] font-bold">
                  New Asset Minted Today
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                <strong className="text-white">Structured Obsidian Wool Blazer</strong> (Size 40 EU) securely bound to vault with Master Tailor Certificate <span className="font-mono text-xs text-emerald-300">#NFC-99210-OBS</span>.
              </p>
            </div>
            <button 
              onClick={() => setDismissBanner(true)}
              className="absolute top-3.5 right-3.5 text-neutral-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </section>
        )}

        {/* Vault Filter Pills */}
        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Pieces (14)' },
            { id: 'outerwear', label: 'Outerwear (5)' },
            { id: 'silk', label: 'Silk & Knitwear (4)' },
            { id: 'leather', label: 'Archival Leather (3)' },
            { id: 'care', label: 'In Care (2)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`h-9 px-4 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all active:scale-95 ${
                activeCategory === tab.id
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* 2-COLUMN RESPONSIVE LAYOUT FOR HERO & STYLING INTELLIGENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLS: Featured Hero Piece */}
          <div className="lg:col-span-7 space-y-6">
            <section className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xs">
              {/* Media Aspect with Badges */}
              <div className="relative aspect-4/3 sm:aspect-16/10 bg-neutral-100 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85" 
                  alt="Structured Obsidian Wool Blazer"
                  className="w-full h-full object-cover"
                />

                {/* NFC Live Chip Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-neutral-200 shadow-xs text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>NFC Active • #99210</span>
                </div>

                {/* Condition Pill */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-neutral-800 border border-neutral-200">
                  Condition: Mint
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-neutral-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">Acquired Today</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900">Inspected by Julian R. (Atelier Master)</span>
                  </div>
                  <span className="font-mono text-sm sm:text-base font-bold text-neutral-900">$2,450 USD</span>
                </div>
              </div>

              {/* Garment Metadata & Atelier Actions */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#4B41E1]">
                      Atelier Capsule No. 04
                    </span>
                    <span className="text-xs font-mono text-neutral-500">EU 40 / US 8</span>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 mt-1">
                    Structured Obsidian Wool Blazer
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                    Charcoal Obsidian • 100% Virgin Merino Wool • Hand-carved Horn Buttons • Canvassed Lapel.
                  </p>
                </div>

                {/* Quick Garment Interactive Rails */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button 
                    onClick={() => setShowPassportModal(true)}
                    className="h-12 flex items-center justify-center gap-2 px-4 rounded-full bg-black text-white text-xs font-bold active:scale-95 transition-transform hover:bg-neutral-800"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>Cryptographic Passport</span>
                  </button>

                  <button 
                    onClick={() => triggerToast('AI Outfit Intelligence: 6 Curated Look Formulas generated for Elena')}
                    className="h-12 flex items-center justify-center gap-2 px-4 rounded-full bg-white border border-neutral-200 text-neutral-800 text-xs font-bold hover:bg-neutral-50 active:scale-95 transition-transform"
                  >
                    <Sparkles className="w-4 h-4 text-[#4B41E1]" />
                    <span>Outfit Intelligence</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-neutral-500">
                  <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    30-Day Complimentary Tailoring Active
                  </span>
                  <button 
                    onClick={onGoToFitConfirmation || onGoToFittings}
                    className="text-[#4B41E1] font-bold hover:underline"
                  >
                    Book Fitting →
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT 5 COLS: AI Styling Intelligence & Lifetime Care */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* AI ATELIER STYLIST DRAWER / PAIRING SUGGESTIONS */}
            <section className="bg-neutral-50 border border-neutral-200 rounded-3xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#E2DFFF] text-[#4B41E1] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#4B41E1] uppercase tracking-widest block font-bold">
                      Daily Styling Intelligence
                    </span>
                    <h3 className="text-xs font-bold text-neutral-900">Curated Pairings for Elena</h3>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">Frieze Art Fair (Sat)</span>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-neutral-200 flex gap-3.5 items-center">
                <div className="w-16 h-20 rounded-xl bg-neutral-100 overflow-hidden shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=300&q=80" 
                    alt="Blazer + Midnight Silk Slip"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Formula #08 • Formal</span>
                  <h4 className="font-bold text-neutral-900 truncate mt-0.5">Obsidian Blazer + Midnight Silk Slip</h4>
                  <p className="text-neutral-500 mt-1 line-clamp-2 leading-tight text-[11px]">
                    Harmonizes structured architectural shoulders with fluid 19mm momme crepe silk column.
                  </p>
                </div>
                <button 
                  onClick={() => triggerToast('Styling formula loaded: Pair with 85mm stiletto and sculptural cuff')}
                  className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* ATELIER LIFETIME CARE & CIRCULARITY HUB */}
            <section className="bg-white border border-neutral-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#4B41E1] uppercase tracking-wider block font-bold">
                    CONCIERGE &amp; CIRCULARITY
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900">Atelier Lifetime Care</h3>
                </div>
                <Shield className="w-5 h-5 text-[#4B41E1]" />
              </div>

              {/* Service 1 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-800">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <h4 className="font-bold text-neutral-900">Seasonal Climate Vaulting</h4>
                  <p className="text-neutral-500 mt-0.5 text-[11px]">
                    Complimentary cedar-cured storage in Brooklyn Vault.
                  </p>
                  <button 
                    onClick={() => triggerToast('Courier Pickup scheduled for Brooklyn Climate Vault')}
                    className="text-[11px] text-[#4B41E1] font-bold mt-1 inline-block hover:underline"
                  >
                    Schedule Pickup →
                  </button>
                </div>
              </div>

              {/* Service 2 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-800">
                  <Scissors className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <h4 className="font-bold text-neutral-900">1-Tap Master Tailoring</h4>
                  <p className="text-neutral-500 mt-0.5 text-[11px]">
                    Active complimentary fitting for Obsidian Blazer.
                  </p>
                  <button 
                    onClick={onGoToFitConfirmation || onGoToFittings}
                    className="text-[11px] text-[#4B41E1] font-bold mt-1 inline-block hover:underline"
                  >
                    Book Home Visit →
                  </button>
                </div>
              </div>

              {/* Service 3: Guaranteed Buyback */}
              <div className="border-t border-neutral-100 pt-3">
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="text-neutral-700 font-semibold uppercase">Guaranteed Vault Buyback</span>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                    CIRCULAR
                  </span>
                </div>
                <div className="flex items-center justify-between bg-neutral-100 p-3 rounded-2xl text-xs mt-2">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Instant Cash Payout</span>
                    <span className="font-bold text-neutral-900 font-mono text-base">
                      $11,200 <span className="text-[10px] font-normal text-neutral-500">USD</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#4B41E1] font-semibold block">Or Atelier Credit</span>
                    <span className="font-bold text-[#4B41E1] font-mono text-base">
                      $13,500 <span className="text-[10px] font-normal text-[#4B41E1]">Credit</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* DIGITAL WARDROBE GALLERY / GRID */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">
                COLLECTION REPOSITORY
              </span>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                Archival Inventory ({filteredPieces.length})
              </h3>
            </div>
            <button 
              onClick={() => triggerToast('Filters reset to all seasons')}
              className="flex items-center gap-1.5 text-xs font-mono text-[#4B41E1] font-semibold hover:underline"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
            </button>
          </div>

          {/* Multi-Column Responsive Grid: 2 cols on mobile, 3 cols on sm, 4 cols on lg */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredPieces.map((piece) => (
              <article 
                key={piece.id}
                onClick={() => triggerToast(`Selected: ${piece.title} (${piece.season})`)}
                className="bg-white rounded-3xl border border-neutral-200 overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#4B41E1]/40 hover:shadow-md transition-all group"
              >
                <div className="relative aspect-3/4 bg-neutral-100 overflow-hidden">
                  <img 
                    src={piece.image} 
                    alt={piece.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Condition Badge */}
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono text-neutral-800 border border-neutral-200">
                    {piece.condition}
                  </div>

                  {/* In Care Badge */}
                  {piece.inCare && (
                    <div className="absolute top-2.5 left-2.5 bg-[#4B41E1] text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-xs">
                      <RefreshCw className="w-3 h-3" /> In Care
                    </div>
                  )}

                  {/* NFC Status */}
                  <div className="absolute bottom-2.5 left-2.5 bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded-full flex items-center gap-1 border border-neutral-200 text-[9px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>NFC: {piece.nfc}</span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block font-semibold">{piece.season}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">{piece.title}</h4>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                    <span className="text-neutral-500">{piece.size}</span>
                    <span className="font-mono font-bold text-neutral-900">{piece.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM NAVIGATION BAR (Mobile Only)                                       */}
      {/* ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-40 flex items-center justify-around px-4 h-14 bg-white/90 backdrop-blur-md border-t border-neutral-200 shadow-sm">
        <button 
          onClick={onBackToStore}
          className="flex flex-col items-center justify-center text-neutral-500 hover:text-black transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="text-[10px] font-mono uppercase tracking-wider mt-0.5">Home</span>
        </button>

        <button 
          onClick={onGoToCatalog}
          className="flex flex-col items-center justify-center text-neutral-500 hover:text-black transition-colors"
        >
          <Grid className="w-4 h-4" />
          <span className="text-[10px] font-mono uppercase tracking-wider mt-0.5">Shop</span>
        </button>

        <button 
          onClick={() => triggerToast('Search collection archive')}
          className="flex flex-col items-center justify-center text-neutral-500 hover:text-black transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px] font-mono uppercase tracking-wider mt-0.5">Search</span>
        </button>

        <button 
          onClick={() => triggerToast('Wishlist: 3 saved haute pieces')}
          className="flex flex-col items-center justify-center text-neutral-500 hover:text-black transition-colors"
        >
          <Heart className="w-4 h-4" />
          <span className="text-[10px] font-mono uppercase tracking-wider mt-0.5">Wishlist</span>
        </button>

        {/* ACTIVE: Account */}
        <button className="flex flex-col items-center justify-center text-[#4B41E1] font-bold">
          <User className="w-4 h-4 text-[#4B41E1]" />
          <span className="text-[10px] font-mono uppercase tracking-wider mt-0.5">Vault</span>
          <span className="w-1 h-1 rounded-full bg-[#4B41E1] mt-0.5"></span>
        </button>
      </nav>
    </div>
  );
}
