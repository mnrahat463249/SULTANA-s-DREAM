import React, { useState } from 'react';
import { 
  ArrowLeft, Lock, Fingerprint, Zap, Thermometer, ShieldCheck, 
  QrCode, RefreshCw, CheckCircle2, ChevronRight, Filter, Search,
  Radio, Key, ExternalLink, Check, AlertCircle, Eye, ArrowUpRight
} from 'lucide-react';

const VAULT_TOKENS = [
  {
    id: '0x8921',
    title: 'Structured Obsidian Wool Blazer',
    spec: 'Sz 40 • Italian Virgin Wool • Box #A-04',
    client: 'Elena Vasiliev',
    tier: 'Tier 01 Elite',
    nfcUid: '04:A2:8F:19:B3:90',
    nfcType: 'NTAG 424 Cryptographic',
    zkTx: '0x6992...8F01',
    block: '#18,924,102',
    lifecycle: 'Minted & Client Held',
    lifecycleDetail: 'Doorstep NFC Confirmed 14:18 EST (Unit #07 Julian R.)',
    verified: true,
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400&auto=format&fit=crop',
    contract: '0x71C8...4E18',
    clientWallet: '0xElenaVasiliev...Vault',
    moisture: '14.2% Wool Equil.',
    timeline: [
      { time: '14:18 EST', title: 'Client Handoff Confirmed', desc: 'Mobile app biometric ECDSA sign on doorstep. Client accepted custody pass.', color: 'bg-[#4b41e1]' },
      { time: '13:45 EST', title: 'Climate Cedar Bag De-sealed', desc: 'Master Courier Julian R. (Unit #07) verified NFC tag prior to fitting.', color: 'bg-[#76777d]' },
      { time: '11:20 EST', title: 'HSM Hardware Key Signed', desc: 'SoHo Vault Hub #01 by Inspector Henri D. Polygon zkEVM proof anchored.', color: 'bg-[#76777d]' },
      { time: '10:05 EST', title: 'Moisture Equilibrium Verified', desc: 'Wool moisture content 14.2% in nitrogen-controlled staging locker.', color: 'bg-emerald-600' },
    ]
  },
  {
    id: '0x8922',
    title: 'Silk Column Slip Dress',
    spec: 'Sz 38 • 100% Mulberry Silk • Vault Box #C-19',
    client: 'Camille Laurent',
    tier: 'Tier 01 Elite',
    nfcUid: '04:C8:11:34:F1:8A',
    nfcType: 'Hardware Paired',
    zkTx: '0x3810...99FA',
    block: '#18,924,080',
    lifecycle: 'In Transit Swap',
    lifecycleDetail: 'Aboard Unit #02 Matteo S.',
    verified: true,
    img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400&auto=format&fit=crop',
    contract: '0x71C8...4E18',
    clientWallet: '0xCamilleLaurent...Vault',
    moisture: '11.8% Silk Equil.',
    timeline: [
      { time: '14:10 EST', title: 'Rendezvous Route Dispatched', desc: 'Unit #02 en route to 72 Mercer St for rapid size swap.', color: 'bg-[#4b41e1]' },
      { time: '12:00 EST', title: 'Quality Assessed', desc: 'Eco-ozone chamber sanitization passed.', color: 'bg-emerald-600' }
    ]
  },
  {
    id: '0x8923',
    title: 'Double-Breasted Cashmere Overcoat',
    spec: 'Sz 42L • Loro Piana Cashmere • Bench #01',
    client: 'Alexandre Dumas',
    tier: 'Tier 02 Privé',
    nfcUid: '04:55:EE:22:09:77',
    nfcType: 'Hardware Paired',
    zkTx: '0x9042...CC12',
    block: '#18,924,015',
    lifecycle: 'Alteration Staged',
    lifecycleDetail: 'Sleeve +1.5cm Adjustment (Mathilde B.)',
    verified: true,
    img: 'https://images.unsplash.com/photo-1539533018447-63fcce667883?q=80&w=400&auto=format&fit=crop',
    contract: '0x71C8...4E18',
    clientWallet: '0xAlexandreDumas...Vault',
    moisture: '13.5% Cashmere Equil.',
    timeline: [
      { time: '13:00 EST', title: 'Tailor Ticket #ALT-403 Issued', desc: 'Sleeve basting tack in progress by Master Fitter.', color: 'bg-[#4b41e1]' }
    ]
  },
  {
    id: '0x8924',
    title: 'Sculpted Leather Handbag',
    spec: 'One Size • Nero Matte • Chamber A-12',
    client: 'Sophia Lorenzi',
    tier: 'Tier 01 Elite',
    nfcUid: '04:99:AA:67:8B:10',
    nfcType: 'Awaiting Sign',
    zkTx: 'Pending HSM Batch',
    block: 'Pending...',
    lifecycle: 'Awaiting HSM Sign',
    lifecycleDetail: 'Ready for Director Key attestation',
    verified: false,
    img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop',
    contract: '0x71C8...4E18',
    clientWallet: '0xSophiaLorenzi...Vault',
    moisture: '45% Relative Humidity Locked',
    timeline: [
      { time: '10:30 EST', title: 'Laser Micro-Etch Applied', desc: 'Titanium micro-seal placed on internal lining clasp.', color: 'bg-[#76777d]' }
    ]
  }
];

export default function VaultMintingView({ onBackToStore, onGoToVip, onGoToDispatch }) {
  const [selectedTokenId, setSelectedTokenId] = useState('0x8921');
  const [filterQuery, setFilterQuery] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [verifyingProof, setVerifyingProof] = useState(false);
  const [verifiedToast, setVerifiedToast] = useState(false);

  const selectedToken = VAULT_TOKENS.find((t) => t.id === selectedTokenId) || VAULT_TOKENS[0];

  const handleVerifyProof = () => {
    setVerifyingProof(true);
    setTimeout(() => {
      setVerifyingProof(false);
      setVerifiedToast(true);
      setTimeout(() => setVerifiedToast(false), 2400);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#151b2d] flex flex-col selection:bg-[#4b41e1]/20 selection:text-[#4b41e1]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 lg:px-8 bg-white/90 backdrop-blur-md border-b border-[#c6c6cd]/30 shadow-xs">
        {/* Left: Hub Selector & Breadcrumbs */}
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
            Module: <strong className="text-[#151b2d]">Vault Minting &amp; zkEVM Provenance</strong>
          </span>
        </div>

        {/* Right: Quick Module Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onGoToVip}
            className="h-9 px-3.5 rounded-full border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-xs font-semibold text-[#151b2d] flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Fingerprint className="w-3.5 h-3.5 text-[#4b41e1]" />
            <span>VIP Client CRM</span>
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
        {/* Title Bar & Status Pill */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#151b2d] tracking-tight font-serif">
                Vault Minting &amp; Cryptographic Provenance
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#85f8c4] text-[#002114] border border-[#002114]/10 uppercase">
                FIPS 140-3 LEVEL 4
              </span>
            </div>
            <p className="text-xs text-[#45464d] mt-1 max-w-2xl leading-relaxed">
              Hardware security module (HSM) micro-tag pairing, zero-knowledge provenance verification, and climate-controlled physical vault custody.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Batch NFC Verification: All 42 hardware tags responded within 12ms.')}
              className="h-9 px-3.5 rounded-full border border-[#c6c6cd]/60 bg-white hover:bg-[#f2f3ff] text-xs font-semibold text-[#151b2d] flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Fingerprint className="w-3.5 h-3.5 text-[#4b41e1]" />
              <span>Verify NFC Tags</span>
            </button>
            <button
              onClick={() => alert('Exporting full zk-proof audit ledger (JSON/CSV)...')}
              className="h-9 px-4 rounded-full bg-[#000000] text-white hover:bg-[#131b2e] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>+ New Batch Mint</span>
            </button>
          </div>
        </div>

        {/* Security & Telemetry KPI Stat Cards (4 Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#c6c6cd]/40 space-y-2 shadow-xs">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono uppercase text-[#45464d] font-bold">Hardware NFC Signatures</span>
              <Fingerprint className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#151b2d]">42 / 42 Today</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% paired • 0 faults</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#c6c6cd]/40 space-y-2 shadow-xs">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono uppercase text-[#45464d] font-bold">zkEVM Gas &amp; Latency</span>
              <Zap className="w-4 h-4 text-[#4b41e1]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#151b2d]">14 Gwei <span className="text-xs text-[#45464d] font-normal">• 840ms</span></div>
            <div className="text-xs text-[#45464d]">
              Block Anchor: <strong className="text-[#4b41e1] font-mono">#18,924,102</strong>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#c6c6cd]/40 space-y-2 shadow-xs">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono uppercase text-[#45464d] font-bold">Physical Vault Climate</span>
              <Thermometer className="w-4 h-4 text-[#151b2d]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#151b2d]">18.8°C <span className="text-xs text-[#45464d] font-normal">• 46% RH</span></div>
            <div className="text-xs text-emerald-700 font-medium">Nitrogen inerting active • 128 Lockboxes</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#c6c6cd]/40 space-y-2 shadow-xs">
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-mono uppercase text-[#45464d] font-bold">Minted Wardrobe Value</span>
              <ShieldCheck className="w-4 h-4 text-[#4b41e1]" />
            </div>
            <div className="text-2xl font-bold font-mono text-[#151b2d]">$492,300 <span className="text-xs text-[#45464d] font-normal">USD</span></div>
            <div className="text-xs text-[#45464d]">38 circulating piece passes</div>
          </div>
        </div>

        {/* Active Minting Station Workflow Strip */}
        <section className="p-5 rounded-2xl bg-white border border-[#c6c6cd]/40 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#c6c6cd]/20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4b41e1] animate-pulse" />
              <h2 className="text-sm font-bold text-[#151b2d]">Active Hardware Station Minting Pipeline</h2>
            </div>
            <span className="text-xs font-mono text-[#45464d]">Bench: NY-SOHO-STATION-02 (v4.19-SEC)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border-2 border-[#4b41e1] bg-[#f2f3ff] relative">
              <span className="text-[9px] font-mono font-bold text-[#4b41e1] uppercase block">Step 01 • ACTIVE</span>
              <strong className="text-sm text-[#151b2d] block mt-1">Physical NFC Probe</strong>
              <p className="text-[11px] text-[#45464d] mt-0.5">HF 13.56MHz Probe Active on Bench #02. Signal: -28 dBm.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-[#c6c6cd]/40 bg-white">
              <span className="text-[9px] font-mono text-[#45464d] uppercase block">Step 02</span>
              <strong className="text-sm text-[#151b2d] block mt-1">ECDSA Attestation</strong>
              <p className="text-[11px] text-[#45464d] mt-0.5">zkEVM deterministic proof generation via HSM Secure Enclave.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-[#c6c6cd]/40 bg-white">
              <span className="text-[9px] font-mono text-[#45464d] uppercase block">Step 03</span>
              <strong className="text-sm text-[#151b2d] block mt-1">Laser Micro-Etching</strong>
              <p className="text-[11px] text-[#45464d] mt-0.5">Titanium seal and micro-QR hardware tag application.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-[#c6c6cd]/40 bg-white">
              <span className="text-[9px] font-mono text-[#45464d] uppercase block">Step 04</span>
              <strong className="text-sm text-[#151b2d] block mt-1">Physical Custody Seal</strong>
              <p className="text-[11px] text-[#45464d] mt-0.5">Hermetic climate container lock &amp; handover to Courier.</p>
            </div>
          </div>
        </section>

        {/* Split Grid: 8 Cols Ledger vs 4 Cols Token Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Provenance Ledger (8 Cols) */}
          <section className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-[#c6c6cd]/40 overflow-hidden shadow-xs">
              {/* Category Tabs */}
              <div className="p-4 border-b border-[#c6c6cd]/30 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-semibold">
                  {[
                    { id: 'all', label: 'All Assets', count: 42 },
                    { id: 'awaiting', label: 'Awaiting HSM Sign', count: 8 },
                    { id: 'paired', label: 'NFC Tag Paired', count: 16 },
                    { id: 'circulating', label: 'Circulating Wardrobe', count: 14 }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategoryTab(tab.id)}
                      className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        activeCategoryTab === tab.id
                          ? 'bg-[#000000] text-white shadow-xs'
                          : 'text-[#45464d] hover:text-[#151b2d] hover:bg-[#f2f3ff]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        activeCategoryTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#4b41e1]'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Filter Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#76777d]" />
                  <input
                    type="text"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder="Filter by token or NFC..."
                    className="w-48 pl-8 pr-3 py-1 text-xs bg-[#f2f3ff] border border-[#c6c6cd]/40 rounded-full focus:outline-none focus:border-[#4b41e1]"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#c6c6cd]/30 text-[10px] font-mono uppercase text-[#45464d] bg-[#f2f3ff]/50">
                      <th className="py-3 px-4 font-bold">Token &amp; Garment</th>
                      <th className="py-3 px-4 font-bold">Client</th>
                      <th className="py-3 px-4 font-bold">NFC UID</th>
                      <th className="py-3 px-4 font-bold">zkEVM Proof</th>
                      <th className="py-3 px-4 font-bold">Lifecycle State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c6c6cd]/20">
                    {VAULT_TOKENS.map((tk) => {
                      const isSelected = selectedTokenId === tk.id;
                      return (
                        <tr
                          key={tk.id}
                          onClick={() => setSelectedTokenId(tk.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#f2f3ff] border-l-4 border-[#4b41e1]' : 'hover:bg-[#f2f3ff]/40'
                          }`}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={tk.img}
                                alt={tk.title}
                                className="w-10 h-12 rounded-lg object-cover border border-[#c6c6cd]/40 shrink-0"
                              />
                              <div>
                                <span className="font-mono font-bold text-[#4b41e1] text-[11px]">{tk.id}</span>
                                <h4 className="font-bold text-[#151b2d] line-clamp-1">{tk.title}</h4>
                                <span className="text-[11px] text-[#45464d]">{tk.spec}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-semibold text-[#151b2d]">
                            {tk.client}
                            <span className="block text-[10px] font-mono text-[#4b41e1]">{tk.tier}</span>
                          </td>
                          <td className="py-3 px-4 font-mono">
                            <div className="font-bold text-[#151b2d]">{tk.nfcUid}</div>
                            <span className="text-[10px] text-emerald-700">{tk.nfcType}</span>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-[#45464d]">
                            <div>{tk.zkTx}</div>
                            <span className="text-[10px]">{tk.block}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono ${
                              tk.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${tk.verified ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                              {tk.lifecycle}
                            </span>
                            <span className="block text-[10px] text-[#45464d] mt-0.5">{tk.lifecycleDetail}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Token Inspector with Holographic Card (4 Cols) */}
          <section className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-[#c6c6cd]/40 p-5 space-y-5 shadow-sm sticky top-24">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#c6c6cd]/30">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#45464d] font-bold">Token Inspector</span>
                    <span className="font-mono font-bold text-[#4b41e1] text-sm">{selectedToken.id}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    zkEVM Verified &amp; Synced
                  </span>
                </div>
              </div>

              {/* Digital Holographic Certificate Card */}
              <div className="rounded-2xl border border-[#c6c6cd]/60 p-4 relative overflow-hidden holo-sheen shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#45464d] uppercase font-bold block">
                      AURA Cryptographic Wardrobe Pass
                    </span>
                    <h3 className="font-bold text-sm text-[#151b2d] mt-1 font-serif">{selectedToken.title}</h3>
                    <p className="text-[11px] text-[#45464d]">{selectedToken.spec}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white p-1.5 border border-[#c6c6cd]/40 flex items-center justify-center shrink-0 shadow-xs">
                    <QrCode className="w-9 h-9 text-[#000000]" />
                  </div>
                </div>

                <div className="pt-2 border-t border-black/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[#151b2d]">
                    <Radio className="w-4 h-4 text-[#4b41e1]" />
                    <span>NFC Tap Ready</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#45464d]">AES-128 DNA MIRROR</span>
                </div>
              </div>

              {/* Cryptographic Parameters */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-mono uppercase text-[#45464d] font-bold block">
                  Cryptographic Parameters
                </span>
                <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#c6c6cd]/30 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#45464d]">NFC UID:</span>
                    <strong className="text-[#151b2d]">{selectedToken.nfcUid}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#45464d]">zkEVM Contract:</span>
                    <span className="text-[#4b41e1] font-semibold">{selectedToken.contract}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#45464d]">Client Wallet:</span>
                    <span className="text-[#151b2d] truncate max-w-[140px]">{selectedToken.clientWallet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#45464d]">Climate Moisture:</span>
                    <span className="text-emerald-700 font-semibold">{selectedToken.moisture}</span>
                  </div>
                </div>
              </div>

              {/* Custody Timeline */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-mono uppercase text-[#45464d] font-bold block">
                  Custody &amp; Climate Timeline
                </span>
                <div className="space-y-3 pl-2 border-l-2 border-[#c6c6cd]/40 ml-1">
                  {selectedToken.timeline.map((item, idx) => (
                    <div key={idx} className="relative pl-3 space-y-0.5">
                      <span className={`absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <div className="font-semibold text-[#151b2d] text-[11px]">{item.time} — {item.title}</div>
                      <p className="text-[11px] text-[#45464d]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-[#c6c6cd]/20">
                <button
                  onClick={handleVerifyProof}
                  disabled={verifyingProof}
                  className="w-full h-10 rounded-full bg-[#000000] text-white hover:bg-[#131b2e] text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${verifyingProof ? 'animate-spin' : ''}`} />
                  <span>{verifyingProof ? 'Computing SNARK Proof...' : 'Re-verify zk-SNARK Proof'}</span>
                </button>

                <button
                  onClick={() => alert(`Locking physical NFC token ${selectedToken.id} into vault cold storage.`)}
                  className="w-full h-9 rounded-full border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-all"
                >
                  Lock Physical Token
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Verification Toast */}
        {verifiedToast && (
          <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 border border-emerald-500 text-emerald-200 px-5 py-2.5 rounded-full text-xs font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>zk-SNARK Proof Verified &amp; Anchored on Polygon zkEVM</span>
          </div>
        )}
      </main>
    </div>
  );
}
