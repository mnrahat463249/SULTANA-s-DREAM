import React, { useState } from 'react';
import { 
  ArrowLeft, Phone, Gift, Calendar, MoreVertical, MapPin, 
  Key, Ruler, Palette, Filter, Plus, Check, ShieldCheck, 
  Sparkles, MessageSquare, Tag, Mic, Paperclip, ChevronRight,
  TrendingUp, Award, ExternalLink, Lock
} from 'lucide-react';


const INITIAL_WARDROBE = [
  {
    id: '0x8921',
    title: 'Structured Obsidian Wool Blazer',
    tag: 'Acquired Today • NFC Verified',
    details: 'Size 40 • Charcoal Melange • Ref #AUR-BLZ-09',
    tokenId: '#0x8921-zkNFC',
    custodyState: 'In Client Vault (Doorstep)',
    tailor: 'Mathilde B. (+0.5cm roll)',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400&auto=format&fit=crop',
    activeToday: true
  },
  {
    id: '0x8412',
    title: 'Silk Column Slip Dress',
    tag: 'Acquired 2 Weeks Ago',
    details: 'Size 38 • Noir Satin • Ref #AUR-SLP-44',
    tokenId: '#0x8412-zkNFC',
    custodyState: 'Cleaned & Stored in SoHo Vault',
    condition: 'Pristine • Eco-Ozone Treated',
    img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400&auto=format&fit=crop',
    activeToday: false
  },
  {
    id: '0x7982',
    title: 'Double-Breasted Cashmere Overcoat',
    tag: 'Acquired Winter 2023',
    details: 'Size 40 • Loro Piana Heather Camel • Ref #AUR-CT-102',
    tokenId: '#0x7982-zkNFC',
    custodyState: 'In Client Wardrobe',
    tailor: 'Mathilde B. (Custom Collar Pad)',
    img: 'https://images.unsplash.com/photo-1539533018447-63fcce667883?q=80&w=400&auto=format&fit=crop',
    activeToday: false
  },
  {
    id: '0x7619',
    title: 'Structured Tailored Trousers',
    tag: 'Acquired Spring 2024',
    details: 'Size 38 • Midnight Black • Ref #AUR-TRS-12',
    tokenId: '#0x7619-zkNFC',
    custodyState: 'In Client Wardrobe',
    inseam: '32.5 in (Bespoke Hem for 85mm heels)',
    img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop',
    activeToday: false
  }
];

export default function VipClientCrmView({ onBackToStore, onGoToVault, onGoToDispatch }) {
  const [activeTab, setActiveTab] = useState('circulating');
  const [notes, setNotes] = useState([
    {
      id: 1,
      author: 'Julian R.',
      role: 'Master Courier',
      time: 'Today 14:20 EST',
      content: 'Client delighted with shoulder fit on Size 40 Obsidian Blazer. Praised rapid 15-min doorstep swap. Requested early private preview for upcoming Autumn Cashmere drop before Paris Fashion Week departure on Sept 14th.',
      tags: ['Doorstep Fitting', 'Autumn Drop', 'Paris Travel']
    },
    {
      id: 2,
      author: 'Mathilde B.',
      role: 'Master Tailor',
      time: '3 days ago • Aug 21, 10:45 EST',
      content: 'Client prefers 0.5cm higher sleeve roll on blazer cuffs to reveal bracelet stack. Updated 3D fitting avatar parameters and notified Milano cutting room for upcoming bespoke orders.',
      tags: ['3D Biometrics', 'Sleeve Roll']
    }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const newEntry = {
      id: Date.now(),
      author: 'Julian R.',
      role: 'Ops Lead',
      time: 'Just now',
      content: newNoteText.trim(),
      tags: ['Internal Memo']
    };
    setNotes([newEntry, ...notes]);
    setNewNoteText('');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#151b2d] flex flex-col selection:bg-[#4b41e1]/20 selection:text-[#4b41e1]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 lg:px-8 bg-white/90 backdrop-blur-md border-b border-[#c6c6cd]/30 shadow-xs">
        {/* Left: Hub Switcher & Breadcrumbs */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToStore}
            className="p-2 -ml-2 rounded-full text-[#45464d] hover:text-[#151b2d] hover:bg-[#f2f3ff] transition-all"
            title="Return to Storefront"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f2f3ff] border border-[#c6c6cd]/40 text-xs font-semibold text-[#151b2d]">
            <span className="w-2 h-2 rounded-full bg-[#4b41e1] animate-pulse" />
            <span>SoHo Flagship &amp; Vault #01 • NYC</span>
          </div>

          <span className="text-[#c6c6cd] hidden sm:inline">|</span>

          <span className="text-xs font-mono text-[#45464d] hidden sm:inline">
            VIP CRM Dossier: <strong className="text-[#151b2d]">Elena Vasiliev</strong>
          </span>
        </div>

        {/* Right: Quick Module Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onGoToVault}
            className="h-9 px-3.5 rounded-full border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-xs font-semibold text-[#151b2d] flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Lock className="w-3.5 h-3.5 text-[#4b41e1]" />
            <span>Vault Minting</span>
          </button>

          <button
            onClick={onGoToDispatch}
            className="h-9 px-4 rounded-full bg-[#000000] text-white hover:bg-[#131b2e] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span>Dispatch Command</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Client Master Title Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#000000] text-white flex items-center justify-center font-bold text-xl font-serif shadow-md border-2 border-white">
              EV
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#151b2d] tracking-tight font-serif">
                  Elena Vasiliev
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#000000] text-white text-[10px] font-mono tracking-wider uppercase font-bold">
                  <Award className="w-3 h-3 text-amber-300" />
                  Tier 01 Privé Elite
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  NFC Sync Active
                </span>
              </div>
              <p className="text-xs text-[#45464d] mt-0.5 font-mono">
                Client ID: <strong className="text-[#151b2d]">VIP-ELN-88390</strong> • Joined Oct 2021 • Currency: USD
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="tel:5550198"
              className="h-10 px-4 rounded-full border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-xs font-semibold text-[#151b2d] flex items-center gap-2 transition-all shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#4b41e1]" />
              <span>Direct Call</span>
            </a>
            <button
              onClick={() => alert('Atelier Private Preview invitation sent to Elena Vasiliev via encrypted signal.')}
              className="h-10 px-4 rounded-full border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-xs font-semibold text-[#151b2d] flex items-center gap-2 transition-all shadow-xs"
            >
              <Gift className="w-3.5 h-3.5 text-[#4b41e1]" />
              <span>Gift Preview</span>
            </button>
            <button
              onClick={() => alert('Doorstep Fitting window booked: Tomorrow 11:00 AM – 1:00 PM.')}
              className="h-10 px-5 rounded-full bg-[#000000] text-white hover:bg-[#131b2e] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-98"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Fitting</span>
            </button>
          </div>
        </div>

        {/* Metric Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-white rounded-2xl border border-[#c6c6cd]/40 shadow-xs">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#45464d] font-bold">Lifetime Value (LTV)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-2xl font-bold text-[#151b2d] font-mono">$142,600</span>
              <span className="text-[10px] text-[#45464d] font-mono">USD</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-medium mt-0.5">Top 0.4% Cohort</span>
          </div>

          <div className="flex flex-col border-l border-[#c6c6cd]/20 pl-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#45464d] font-bold">Wardrobe Asset Value</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-2xl font-bold text-[#151b2d] font-mono">$68,400</span>
              <span className="text-[10px] text-[#45464d] font-mono">USD</span>
            </div>
            <span className="text-[11px] text-[#45464d] mt-0.5">12 Minted NFTs</span>
          </div>

          <div className="flex flex-col border-l border-[#c6c6cd]/20 pl-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#45464d] font-bold">Retention Rate</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl sm:text-2xl font-bold text-[#151b2d] font-mono">96.8%</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <span className="text-[11px] text-[#45464d] mt-0.5">18 of 19 Kept</span>
          </div>

          <div className="flex flex-col border-l border-[#c6c6cd]/20 pl-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#45464d] font-bold">Dedicated Concierge</span>
            <div className="mt-1 text-xs font-semibold text-[#151b2d]">
              <div>Julian R. <span className="text-[10px] text-[#45464d] font-normal">(Courier Lead)</span></div>
              <div>Mathilde B. <span className="text-[10px] text-[#45464d] font-normal">(Master Tailor)</span></div>
            </div>
          </div>

          <div className="flex flex-col border-l border-[#c6c6cd]/20 pl-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#45464d] font-bold">Preferred Hub</span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-xs text-[#151b2d]">
              <MapPin className="w-3.5 h-3.5 text-[#4b41e1]" />
              <span>SoHo Loft, NYC</span>
            </div>
            <span className="text-[11px] text-[#45464d] mt-0.5">12-Min Corridor</span>
          </div>
        </div>

        {/* Live Session Status Banner */}
        <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#4b41e1]/30 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4b41e1]" />
          <div className="flex items-center gap-3.5 pl-2">
            <div className="w-10 h-10 rounded-full bg-[#4b41e1] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="px-2 py-0.5 rounded bg-[#645efb] text-white text-[10px] font-mono font-bold uppercase">
                  Active Try-On Delivered Today
                </span>
                <span className="font-mono text-[#45464d]">Order #AUR-EX-99210</span>
                <span className="text-emerald-700 font-semibold">• Doorstep Verified 14:18 EST</span>
              </div>
              <p className="text-xs sm:text-sm text-[#151b2d] mt-1 leading-relaxed">
                <strong className="font-bold">Structured Obsidian Wool Blazer (Size 40)</strong> retained and verified via doorstep NFC scan by <strong className="font-bold">Julian R.</strong> (Master Courier). +$15 Gratuity paid. zkEVM Proof Anchored.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center shrink-0 text-xs">
            <span className="font-mono text-[11px] text-[#45464d] bg-white px-2.5 py-1 rounded border border-[#c6c6cd]/40">
              Tx: 0x89f4…21c0
            </span>
            <button
              onClick={() => alert('Polygon zkEVM Explorer: Transaction 0x89f4...21c0 verified.')}
              className="h-8 px-3 rounded-full bg-white border border-[#c6c6cd]/60 hover:bg-[#eaedff] text-xs font-semibold text-[#151b2d] transition-all"
            >
              Block Explorer
            </button>
          </div>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* LEFT: Residence, Biometrics, Style DNA (4 Cols) */}
          <div className="xl:col-span-4 space-y-6">
            {/* Residence & Access Protocol */}
            <div className="p-5 bg-white rounded-2xl border border-[#c6c6cd]/40 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#4b41e1]" />
                  <h2 className="font-bold text-sm text-[#151b2d]">Residence &amp; Access Protocol</h2>
                </div>
                <span className="text-[10px] font-mono text-[#4b41e1] font-bold">Priority Dispatch</span>
              </div>

              <div>
                <span className="text-[11px] text-[#45464d]">Primary Address</span>
                <p className="text-xs sm:text-sm font-semibold text-[#151b2d]">
                  54 Mercer St, Penthouse B<br />
                  SoHo, New York, NY 10013
                </p>
              </div>

              <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#c6c6cd]/20 text-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className="flex items-center gap-1 text-[#151b2d]">
                    <Key className="w-3.5 h-3.5 text-[#4b41e1]" />
                    Doorman &amp; Elevator Protocol
                  </span>
                  <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded text-[9px]">AUTHENTICATED</span>
                </div>
                <p className="text-[11px] text-[#45464d] leading-relaxed">
                  24/7 Doorman (Gene &amp; Hector). Keycard on file at concierge desk #04. Freight elevator booking not required for garments under 5 racks.
                </p>
              </div>
            </div>

            {/* Biometrics Matrix */}
            <div className="p-5 bg-white rounded-2xl border border-[#c6c6cd]/40 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#4b41e1]" />
                  <h2 className="font-bold text-sm text-[#151b2d]">Biometric Measurements</h2>
                </div>
                <span className="text-[10px] font-mono text-[#45464d]">3D Scan: 08/24</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/20">
                  <span className="text-[10px] text-[#45464d] block">Bust</span>
                  <strong className="text-base font-bold font-mono text-[#151b2d]">88 cm</strong>
                  <span className="text-[10px] text-[#45464d] block">Standard EU 38–40</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/20">
                  <span className="text-[10px] text-[#45464d] block">Waist</span>
                  <strong className="text-base font-bold font-mono text-[#151b2d]">68 cm</strong>
                  <span className="text-[10px] text-[#45464d] block">High-waist contour</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/20">
                  <span className="text-[10px] text-[#45464d] block">Hips</span>
                  <strong className="text-base font-bold font-mono text-[#151b2d]">94 cm</strong>
                  <span className="text-[10px] text-[#45464d] block">Low drape drop</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/20">
                  <span className="text-[10px] text-[#45464d] block">Sleeve Alteration</span>
                  <strong className="text-base font-bold font-mono text-[#4b41e1]">+0.5 cm</strong>
                  <span className="text-[10px] text-[#4b41e1] block font-semibold">Bespoke Roll Req</span>
                </div>
              </div>

              <div className="p-3 bg-[#f2f3ff]/60 rounded-xl text-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#45464d] font-bold">Preferred Silhouette</span>
                <p className="font-semibold text-[#151b2d]">Sharp architectural shoulders with fluid, relaxed drape.</p>
                <p className="text-[11px] text-[#45464d]">Always pre-hem trousers to 32.5 in inseam for 85mm heels.</p>
              </div>
            </div>

            {/* Style DNA */}
            <div className="p-5 bg-white rounded-2xl border border-[#c6c6cd]/40 space-y-3 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#4b41e1]" />
                  <h2 className="font-bold text-sm text-[#151b2d]">Style DNA &amp; Affinities</h2>
                </div>
                <span className="text-[10px] font-mono text-[#4b41e1] font-bold">99.2% Vector Alignment</span>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] text-[#45464d] font-semibold">Textile &amp; Fiber Affinities</span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['Italian Virgin Wool', 'Loro Piana Cashmere', 'Heavy Silk Satin', 'Japanese Cupro'].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-[#eaedff] text-[#151b2d] font-medium text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#c6c6cd]/20 space-y-2">
                <span className="text-[11px] text-[#45464d] font-semibold">Signature Color Palette</span>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-[#f2f3ff] flex flex-col items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-neutral-900 shadow-sm" />
                    <span className="text-[10px] font-bold">Obsidian</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#f2f3ff] flex flex-col items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 border border-neutral-300 shadow-sm" />
                    <span className="text-[10px] font-bold">Chalk</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#f2f3ff] flex flex-col items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-slate-900 shadow-sm" />
                    <span className="text-[10px] font-bold">Midnight</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#f2f3ff] flex flex-col items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-[#C19A6B] shadow-sm" />
                    <span className="text-[10px] font-bold">Camel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Digital Wardrobe & Notes Timeline (8 Cols) */}
          <div className="xl:col-span-8 space-y-6">
            {/* Digital Wardrobe Card Grid */}
            <div className="bg-white rounded-2xl border border-[#c6c6cd]/40 overflow-hidden shadow-xs">
              {/* Header & Tabs */}
              <div className="p-5 pb-0 border-b border-[#c6c6cd]/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-[#151b2d] font-serif">
                      Client Digital Wardrobe &amp; Token Vault
                    </h2>
                    <p className="text-xs text-[#45464d]">
                      Decentralized NFC-linked custody records with real-time biometric provenance.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="h-8 px-3 rounded-full border border-[#c6c6cd]/60 hover:bg-[#f2f3ff] text-xs font-semibold text-[#151b2d] flex items-center gap-1.5 transition-all">
                      <Filter className="w-3.5 h-3.5" />
                      <span>Filter</span>
                    </button>
                    <button
                      onClick={() => alert('New physical bespoke garment allocation initialized.')}
                      className="h-8 px-3 rounded-full bg-[#000000] text-white hover:bg-[#131b2e] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Assign Garment</span>
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-6 text-xs font-semibold overflow-x-auto no-scrollbar">
                  {[
                    { id: 'circulating', label: 'Circulating Wardrobe', count: 12 },
                    { id: 'history', label: 'Fitting History', count: 18 },
                    { id: 'alterations', label: 'Bespoke Alterations', count: 4 },
                    { id: 'notes', label: 'Notes & Preferences' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-3 flex items-center gap-1.5 transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'text-[#4b41e1] border-b-2 border-[#4b41e1]'
                          : 'text-[#45464d] hover:text-[#151b2d]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {tab.count !== undefined && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#eaedff] text-[#4b41e1] font-mono font-bold">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wardrobe Items Grid */}
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {INITIAL_WARDROBE.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-[#c6c6cd]/40 bg-white hover:border-[#4b41e1]/60 transition-all flex flex-col justify-between shadow-xs group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono uppercase font-bold text-[#4b41e1]">
                            {item.tag}
                          </span>
                          <h3 className="font-bold text-sm text-[#151b2d] mt-0.5">{item.title}</h3>
                          <span className="text-[11px] text-[#45464d]">{item.details}</span>
                        </div>
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-12 h-14 rounded-lg object-cover bg-neutral-100 border border-[#c6c6cd]/40 shrink-0"
                        />
                      </div>

                      <div className="mt-3 p-3 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/20 text-xs font-mono space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[#45464d]">Token ID:</span>
                          <span className="text-[#151b2d] font-bold">{item.tokenId}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#45464d]">Custody:</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {item.custodyState}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-[#c6c6cd]/20 flex items-center justify-between text-xs">
                      <button
                        onClick={onGoToVault}
                        className="font-semibold text-[#4b41e1] hover:underline flex items-center gap-1"
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>View Token Pass</span>
                      </button>
                      <button
                        onClick={() => alert(`Requested white-glove pickup for ${item.title}.`)}
                        className="h-7 px-3 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[11px] font-semibold text-[#151b2d] transition-colors"
                      >
                        Request Care
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interaction Timeline & Concierge Memo Logger */}
            <div className="p-5 bg-white rounded-2xl border border-[#c6c6cd]/40 space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#4b41e1]" />
                  <h2 className="font-bold text-sm text-[#151b2d]">Concierge Interaction Timeline</h2>
                </div>
                <span className="text-[11px] text-[#45464d]">Direct synchronized feed with Master Tailors</span>
              </div>

              {/* Timeline Feed */}
              <div className="space-y-4 pl-3 border-l-2 border-[#eaedff] ml-2">
                {notes.map((note) => (
                  <div key={note.id} className="relative pl-5 space-y-1">
                    <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[#4b41e1] border-2 border-white" />
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <strong className="text-[#151b2d]">{note.author}</strong>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#eaedff] text-[#4b41e1] font-bold uppercase">
                        {note.role}
                      </span>
                      <span className="text-[#45464d] text-[11px] font-mono">{note.time}</span>
                    </div>
                    <p className="text-xs text-[#151b2d] bg-[#f2f3ff] p-3 rounded-xl border border-[#c6c6cd]/20 leading-relaxed">
                      "{note.content}"
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      {note.tags.map((tg) => (
                        <span key={tg} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-[#c6c6cd]/40 text-[#45464d]">
                          #{tg}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Memo Box */}
              <div className="pt-3 border-t border-[#c6c6cd]/20 space-y-2">
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add concierge memo, fitting adjustment notes, or VIP travel dates..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl bg-[#f2f3ff] border border-[#c6c6cd]/40 focus:outline-none focus:border-[#4b41e1] focus:bg-white transition-all text-[#151b2d]"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#45464d]">
                    <button className="p-1.5 rounded-lg hover:bg-[#f2f3ff]" title="Add Tag"><Tag className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-[#f2f3ff]" title="Dictate Voice"><Mic className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-[#f2f3ff]" title="Attach File"><Paperclip className="w-3.5 h-3.5" /></button>
                  </div>
                  <button
                    onClick={handleAddNote}
                    className="h-8 px-4 rounded-full bg-[#000000] text-white hover:bg-[#131b2e] text-xs font-semibold active:scale-95 transition-all shadow-xs"
                  >
                    Log Internal Memo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
