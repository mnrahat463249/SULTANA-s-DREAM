import React, { useState } from 'react';
import {
  Diamond,
  LayoutDashboard,
  Truck,
  Package,
  Lock,
  Warehouse,
  Users,
  Settings,
  AlertTriangle,
  BookOpen,
  Terminal,
  Store,
  Radio,
  Plus,
  Bell,
  Sliders,
  Search,
  FilterX,
  Receipt,
  MessageSquare,
  Route,
  Thermometer,
  Droplets,
  PhoneCall,
  RotateCcw,
  Maximize2,
  CheckCircle2,
  FileSpreadsheet,
  Printer,
  Nfc,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function OrdersFulfillmentQueueView({
  onBackToStore,
  onGoToDispatch,
  onGoToVault,
  onGoToVip,
  onGoToTracking,
  onGoToCourier
}) {
  // Navigation active tab in sidebar
  const [activeNav, setActiveNav] = useState('orders');

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('#AUR-99210');
  const [activeTab, setActiveTab] = useState('staged'); // 'all' | 'staging' | 'nfc' | 'staged' | 'doorstep' | 'completed' | 'exceptions'
  const [fulfillmentFilter, setFulfillmentFilter] = useState('Doorstep Try-On');
  const [vipTierFilter, setVipTierFilter] = useState('Tier 01 Elite');
  const [hubFilter, setHubFilter] = useState('Hub: SoHo Vault #01');
  const [courierFilter, setCourierFilter] = useState('Courier: All Units');

  // Selected orders for bulk operations
  const [selectedOrderIds, setSelectedOrderIds] = useState(['AUR-99210', 'AUR-98402', 'AUR-98399']);
  
  // Active inspected order in the slide-out panel
  const [inspectedOrderId, setInspectedOrderId] = useState('AUR-99210');

  // Checklist state for inspected order
  const [checklist, setChecklist] = useState({
    seal: true,
    nfc: true,
    hanger: true,
    signature: false,
  });

  // Action toast state
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const initialOrders = [
    {
      id: 'AUR-99210',
      client: 'Elena Vasiliev',
      vipTier: 'Tier 01 Elite',
      location: 'SoHo Loft (54 Mercer)',
      urgency: 'VIP Urgent',
      urgencyColor: 'bg-red-500/10 text-red-600 border-red-500/30',
      garmentTitle: 'Structured Obsidian Wool Blazer',
      garmentSpecs: 'Sz 40 • Charcoal + Silk Scarf',
      sku: 'AUR-W-40-CHR-01',
      fulfillmentType: 'Doorstep Try-On',
      fulfillmentSub: '15m concierge window',
      courierUnit: 'Unit #07',
      courierName: 'Julian R. (On Route)',
      courierInitials: 'JR',
      status: 'Try-On Active',
      statusType: 'success',
      nfcHash: '0x69921...8F01',
      nfcReady: true,
      price: '$304.00'
    },
    {
      id: 'AUR-98402',
      client: 'Jonathan Thorne',
      vipTier: 'Tier 02 Privé',
      location: 'West Village (Bank St)',
      urgency: 'High',
      urgencyColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30',
      garmentTitle: 'Double-Breasted Cashmere Overcoat',
      garmentSpecs: 'Sz 42L • Vicuña Tan',
      sku: 'AUR-M-42L-VIC-09',
      fulfillmentType: 'White-Glove Courier',
      fulfillmentSub: 'Direct Delivery',
      courierUnit: 'Unit #05',
      courierName: 'Sarah K. (Staging Bay)',
      courierInitials: 'SK',
      status: 'Steaming & Seal',
      statusType: 'amber',
      nfcHash: '0x7732...109A',
      nfcReady: true,
      price: '$580.00'
    },
    {
      id: 'AUR-98399',
      client: 'Sophia Lorenzi',
      vipTier: 'Tier 01 Elite',
      location: 'Tribeca (North Moore)',
      urgency: 'Normal',
      urgencyColor: 'bg-neutral-100 text-neutral-700 border-neutral-300',
      garmentTitle: 'Sculpted Leather Handbag',
      garmentSpecs: 'One Size • Nero Matte',
      sku: 'AUR-ACC-HBG-03',
      fulfillmentType: 'Vault Custody & Courier',
      fulfillmentSub: 'Armored Case',
      courierUnit: 'Unassigned',
      courierName: 'Awaiting dispatch',
      courierInitials: '?',
      status: 'Awaiting NFC',
      statusType: 'secondary',
      nfcHash: 'Pending HSM',
      nfcReady: false,
      price: '$285.00'
    },
    {
      id: 'AUR-EX-99245',
      client: 'Vivienne Chen',
      vipTier: 'Tier 01 Elite',
      location: '98 Franklin St',
      urgency: 'Immediate Swap',
      urgencyColor: 'bg-red-600 text-white',
      garmentTitle: 'Silk Column Slip Dress (Sz 38)',
      garmentSpecs: 'Rapid Size Exchange Swap',
      sku: 'AUR-W-38-BLK-SLP',
      fulfillmentType: 'Rapid Swap Dispatch',
      fulfillmentSub: 'Doorstep Hand-to-Hand',
      courierUnit: 'Unit #02',
      courierName: 'Matteo S. (Transit)',
      courierInitials: 'MS',
      status: 'Transit • 4 min away',
      statusType: 'purple',
      nfcHash: '0x9924...AA21',
      nfcReady: true,
      price: '$220.00'
    },
    {
      id: 'AUR-98380',
      client: 'Alexandre Dumas',
      vipTier: 'Tier 02 Privé',
      location: 'Crosby St Penthouse',
      urgency: 'VIP Reserved',
      urgencyColor: 'bg-neutral-900 text-white',
      garmentTitle: 'Bespoke Tailored Trousers',
      garmentSpecs: 'Sz 32 • Midnight Navy Wool',
      sku: 'AUR-BES-TRS-32',
      fulfillmentType: 'In-Home Tailor Fitting',
      fulfillmentSub: 'Master Tailor Session',
      courierUnit: 'Mathilde B.',
      courierName: 'Master Tailor Concierge',
      courierInitials: 'MB',
      status: 'Fitting 16:00',
      statusType: 'teal',
      nfcHash: '0x1102...44CF',
      nfcReady: true,
      price: '$340.00'
    },
    {
      id: 'AUR-98375',
      client: 'Marcus Vance',
      vipTier: 'Atelier Member',
      location: 'Upper East Side (72nd)',
      urgency: 'Standard',
      urgencyColor: 'bg-neutral-100 text-neutral-600',
      garmentTitle: 'Cashmere Turtleneck Sweater',
      garmentSpecs: 'Sz L • Ivory Pure Mongolian',
      sku: 'AUR-U-L-IVR-CSH',
      fulfillmentType: 'White-Glove Express',
      fulfillmentSub: 'Dock Dispatch',
      courierUnit: 'Unit #03',
      courierName: 'Marcus V. (Dock 2)',
      courierInitials: 'MV',
      status: 'Staged Gate 2',
      statusType: 'slate',
      nfcHash: '0x5581...EE90',
      nfcReady: true,
      price: '$195.00'
    }
  ];

  const [orders] = useState(initialOrders);

  // Toggle single order selection
  const handleToggleSelectOrder = (id) => {
    setSelectedOrderIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Toggle all visible orders
  const handleToggleSelectAll = () => {
    if (selectedOrderIds.length === orders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(orders.map(o => o.id));
    }
  };

  // Active inspected item details
  const inspectedOrder = orders.find(o => o.id === inspectedOrderId) || orders[0];

  // Filtered orders count
  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="bg-[#FAF8FF] text-[#151B2D] min-h-screen flex selection:bg-[#E2DFFF] selection:text-[#4B41E1]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#151B2D] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-neutral-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIDEBAR: Command Center Navigation */}
      {/* ========================================================================= */}
      <aside className="fixed inset-y-0 left-0 w-64 z-40 bg-white border-r border-[#C6C6CD]/30 flex flex-col justify-between py-6 px-4 shadow-sm">
        <div className="flex flex-col gap-6">
          {/* Header / Brand Crest */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center font-bold shadow-sm">
                <Diamond className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-[#151B2D]">AURA Atelier Ops</span>
                <span className="text-[11px] text-[#76777D] font-medium tracking-wide">Command Center v2.4</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => { setActiveNav('overview'); showToast('Loaded Metropolitan Overview Dashboard'); }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-xs font-medium ${
                activeNav === 'overview' ? 'bg-neutral-100 text-black font-bold' : 'text-[#45464D] hover:bg-neutral-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => onGoToDispatch ? onGoToDispatch() : setActiveNav('dispatch')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-xs font-medium ${
                activeNav === 'dispatch' ? 'bg-neutral-100 text-black font-bold' : 'text-[#45464D] hover:bg-neutral-50'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Dispatch &amp; Fleet</span>
            </button>

            <button
              onClick={() => setActiveNav('orders')}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-black text-white font-semibold shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span className="text-xs">Orders &amp; Fulfillment</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#4B41E1] text-white tracking-widest uppercase">
                14 PENDING
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('doorstep');
                showToast('Filtered: In-Home Try-On Orders');
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[#45464D] hover:bg-neutral-50 text-xs font-medium transition-colors"
            >
              <Store className="w-4 h-4" />
              <span>In-Home Try-Ons</span>
            </button>

            <button
              onClick={() => onGoToVault ? onGoToVault() : setActiveNav('vault')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[#45464D] hover:bg-neutral-50 text-xs font-medium transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>Vault Minting &amp; Provenance</span>
            </button>

            <button
              onClick={() => showToast('Inventory Ledger: 248 items in SoHo vault')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[#45464D] hover:bg-neutral-50 text-xs font-medium transition-colors"
            >
              <Warehouse className="w-4 h-4" />
              <span>Inventory</span>
            </button>

            <button
              onClick={() => onGoToVip ? onGoToVip() : setActiveNav('vip')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[#45464D] hover:bg-neutral-50 text-xs font-medium transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>VIP Client CRM</span>
            </button>

            <button
              onClick={() => showToast('System Settings: HSM Node #01 Active')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[#45464D] hover:bg-neutral-50 text-xs font-medium transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>System Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Footers & Emergency Protocol CTA */}
        <div className="flex flex-col gap-4 border-t border-[#C6C6CD]/30 pt-5">
          <button
            onClick={() => showToast('Emergency Protocol: Priority Couriers Notified')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 text-xs font-bold transition-all active:scale-98"
          >
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="tracking-wider uppercase">Emergency Protocol</span>
          </button>

          <div className="flex flex-col gap-1 text-xs">
            <button
              onClick={() => showToast('Displaying SOP documentation')}
              className="flex items-center gap-2 px-2 py-1.5 text-[#76777D] hover:text-black transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Documentation</span>
            </button>
            <button
              onClick={() => showToast('Terminal log stream connected via WebSocket')}
              className="flex items-center gap-2 px-2 py-1.5 text-[#76777D] hover:text-black transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal Log</span>
            </button>
          </div>

          {/* Node Signal State */}
          <div className="flex items-center justify-between px-3 py-2 rounded-md bg-[#F2F3FF] text-[11px] text-[#45464D] border border-neutral-200">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Vault Node #01
            </span>
            <span className="text-[10px] tracking-wider text-[#76777D] font-mono">11ms • SYNC</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* TOPBAR: SoHo Flagship & Quick Actions */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col pl-64 min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-8 bg-white/90 backdrop-blur-md border-b border-[#C6C6CD]/30">
          {/* Left: Hub Identity & Quick Links */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5 border-r border-[#C6C6CD]/30 pr-6">
              <Store className="w-5 h-5 text-[#4B41E1]" />
              <span className="text-sm font-bold text-[#151B2D] tracking-tight">SoHo Flagship &amp; Vault #01 • NYC</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 tracking-wider">
                LIVE ACTIVE
              </span>
            </div>

            <div className="hidden xl:flex items-center gap-5 text-xs text-[#45464D]">
              <button onClick={() => showToast('Live Telemetry Stream Active')} className="hover:text-black flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-[#4B41E1]" />
                <span>Telemetry</span>
              </button>
              <button onClick={() => onGoToCourier ? onGoToCourier() : showToast('Courier Mesh Online')} className="hover:text-black flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#4B41E1]" />
                <span>Courier Mesh</span>
              </button>
              <button className="text-black font-bold border-b-2 border-black pb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Approvals Queue</span>
              </button>
            </div>
          </div>

          {/* Right: Actions & User Avatar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Batch handoff initialized for 3 orders')}
              className="h-9 px-3.5 rounded-full border border-[#C6C6CD]/70 text-[#151B2D] bg-white hover:bg-neutral-50 transition-colors text-xs font-semibold flex items-center gap-1.5 active:scale-95 shadow-sm"
            >
              <Nfc className="w-4 h-4 text-[#4B41E1]" />
              <span>Batch Handoff</span>
            </button>

            <button
              onClick={() => showToast('Opening New Atelier Order Form')}
              className="h-9 px-4 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Atelier Order</span>
            </button>

            <div className="h-6 w-px bg-neutral-200 mx-1"></div>

            <button
              onClick={() => showToast('Telemetry sensor readouts refreshed')}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-100 relative"
              title="Sensors Telemetry"
            >
              <Radio className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </button>

            <button
              onClick={() => showToast('Notifications: 2 pending try-on arrivals')}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-100 relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#4B41E1]"></span>
            </button>

            <button
              onClick={onBackToStore}
              className="px-3 py-1.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors"
              title="Back to Client Storefront"
            >
              Storefront ↗
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
                alt="Director of Operations"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-neutral-300"
              />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#151B2D] leading-tight">V. Sterling</span>
                <span className="text-[9px] text-[#76777D] tracking-wider uppercase font-semibold">Dir. Ops</span>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* MAIN WORKSPACE CONTENT */}
        {/* ========================================================================= */}
        <main className="p-8 flex flex-col gap-6 max-w-[1720px]">
          {/* 1. Header & Utility Actions */}
          <div className="flex flex-col gap-4">
            <nav className="flex items-center gap-2 text-xs text-[#76777D]">
              <span className="hover:text-black cursor-pointer">Atelier Infrastructure</span>
              <span className="font-mono text-neutral-400">/</span>
              <span className="hover:text-black cursor-pointer">Metropolitan Command</span>
              <span className="font-mono text-neutral-400">/</span>
              <span className="text-[#151B2D] font-bold">Orders &amp; Fulfillment Queue</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#151B2D] tracking-tight">
                  Orders &amp; White-Glove Fulfillment Queue
                </h1>
                <p className="text-xs text-[#76777D] mt-0.5">
                  Real-time dispatch pipeline, climate telemetry assurance, and cryptographic NFC hardware signing.
                </p>
              </div>

              <div className="flex items-center flex-wrap gap-2">
                <button
                  onClick={() => showToast('Batch NFC Pairing Sequence Started: 6 tags synchronized')}
                  className="h-9 px-3.5 rounded-full border border-neutral-300 text-[#151B2D] bg-white hover:bg-neutral-50 transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Nfc className="w-4 h-4 text-[#4B41E1]" />
                  <span>Batch NFC Pair</span>
                </button>

                <button
                  onClick={() => showToast('Exporting active manifest to CSV...')}
                  className="h-9 px-3.5 rounded-full border border-neutral-300 text-[#151B2D] bg-white hover:bg-neutral-50 transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Export Manifest CSV</span>
                </button>

                <button
                  onClick={() => showToast('Column view options updated')}
                  className="h-9 px-3.5 rounded-full border border-neutral-300 text-[#151B2D] bg-white hover:bg-neutral-50 transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filter Columns</span>
                </button>

                <button
                  onClick={() => showToast('Sent 14 courier barcode tags to Zebra thermal printer')}
                  className="h-9 px-3.5 rounded-full border border-neutral-300 text-[#151B2D] bg-white hover:bg-neutral-50 transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-4 h-4 text-neutral-700" />
                  <span>Print Courier Tags</span>
                </button>
              </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-b border-neutral-200">
              {[
                { id: 'all', label: 'All Orders', count: 42 },
                { id: 'staging', label: 'Staging & Steaming', count: 8 },
                { id: 'nfc', label: 'NFC Minting & Hardware Sign', count: 6 },
                { id: 'staged', label: 'Staged for Courier', count: 14 },
                { id: 'doorstep', label: 'Out for Doorstep Try-On', count: 9 },
                { id: 'completed', label: 'Completed Today', count: 38 },
                { id: 'exceptions', label: 'Exceptions / Holds', count: 2, error: true }
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      showToast(`Filtered by status: ${tab.label}`);
                    }}
                    className={`h-9 px-4 rounded-full text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
                      isActive
                        ? 'bg-black text-white shadow-sm'
                        : tab.error
                        ? 'bg-white border border-red-300 text-red-600 hover:bg-red-50'
                        : 'bg-white border border-neutral-200 text-[#45464D] hover:text-black hover:border-neutral-400'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-white/20 text-white' : tab.error ? 'bg-red-100 text-red-800' : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Operational Telemetry & KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* KPI 1 */}
            <div className="bg-white border border-[#C6C6CD]/30 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-[#76777D]">
                <span className="font-bold uppercase tracking-wider text-[11px]">Orders in Pipeline</span>
                <Package className="w-4 h-4 text-[#4B41E1]" />
              </div>
              <div className="my-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#151B2D]">37</span>
                  <span className="text-xs font-bold text-emerald-600">+4 from 1h ago</span>
                </div>
                <div className="text-xs text-[#76777D] mt-0.5 font-medium">$189,450 GMV pending fulfillment</div>
              </div>
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-black h-full rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white border border-[#C6C6CD]/30 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-[#76777D]">
                <span className="font-bold uppercase tracking-wider text-[11px]">Avg. Staging Latency</span>
                <RotateCcw className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="my-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#151B2D]">14.2</span>
                  <span className="text-xs font-bold text-neutral-500">min</span>
                  <span className="text-xs font-bold text-emerald-600">-2.8m vs SLA</span>
                </div>
                <div className="text-xs text-[#76777D] mt-0.5 font-medium">Order placement → climate seal</div>
              </div>
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '86%' }}></div>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white border border-[#C6C6CD]/30 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-[#76777D]">
                <span className="font-bold uppercase tracking-wider text-[11px]">Cryptographic Pairing</span>
                <ShieldCheck className="w-4 h-4 text-[#4B41E1]" />
              </div>
              <div className="my-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#151B2D]">100%</span>
                  <span className="text-xs font-bold text-emerald-600">28/28 verified</span>
                </div>
                <div className="text-xs text-[#76777D] mt-0.5 font-medium">Polygon zkEVM HSM chips intact</div>
              </div>
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#4B41E1] h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-white border border-[#C6C6CD]/30 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-[#76777D]">
                <span className="font-bold uppercase tracking-wider text-[11px]">Doorstep Try-On Ratio</span>
                <Store className="w-4 h-4 text-black" />
              </div>
              <div className="my-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#151B2D]">68%</span>
                  <span className="text-xs font-medium text-neutral-500">of today's volume</span>
                </div>
                <div className="text-xs text-[#76777D] mt-0.5 font-medium">VIP concierge fitting requested</div>
              </div>
              <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-black h-full rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>

          {/* 3. Interactive Multi-Filter & Batch Control Bar */}
          <div className="flex flex-col gap-3">
            <div className="bg-white border border-[#C6C6CD]/30 rounded-xl p-3 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 shadow-sm">
              {/* Search Input */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Order #, VIP, SKU, or Courier Unit..."
                  className="w-full h-10 pl-10 pr-4 rounded-full bg-[#F2F3FF] border-0 text-xs text-neutral-900 placeholder:text-neutral-500 focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              {/* Filter Dropdowns */}
              <div className="flex items-center flex-wrap gap-2.5 w-full lg:w-auto">
                {/* Fulfillment Type */}
                <select
                  value={fulfillmentFilter}
                  onChange={(e) => setFulfillmentFilter(e.target.value)}
                  className="h-9 px-3 rounded-lg bg-white border border-neutral-300 text-xs font-semibold text-neutral-800 outline-none cursor-pointer"
                >
                  <option>Fulfillment: All Types</option>
                  <option>Doorstep Try-On</option>
                  <option>White-Glove Courier</option>
                  <option>Vault Custody</option>
                </select>

                {/* VIP Tier */}
                <select
                  value={vipTierFilter}
                  onChange={(e) => setVipTierFilter(e.target.value)}
                  className="h-9 px-3 rounded-lg bg-white border border-neutral-300 text-xs font-semibold text-neutral-800 outline-none cursor-pointer"
                >
                  <option>VIP Tier: All Tiers</option>
                  <option>Tier 01 Elite</option>
                  <option>Tier 02 Privé</option>
                  <option>Atelier Member</option>
                </select>

                {/* Hub */}
                <select
                  value={hubFilter}
                  onChange={(e) => setHubFilter(e.target.value)}
                  className="h-9 px-3 rounded-lg bg-white border border-neutral-300 text-xs font-semibold text-neutral-800 outline-none cursor-pointer"
                >
                  <option>Hub: SoHo Vault #01</option>
                  <option>Hub: Madison Ave #02</option>
                  <option>Hub: Brooklyn Navy Yard Lab</option>
                </select>

                {/* Courier Assignment */}
                <select
                  value={courierFilter}
                  onChange={(e) => setCourierFilter(e.target.value)}
                  className="h-9 px-3 rounded-lg bg-white border border-neutral-300 text-xs font-semibold text-neutral-800 outline-none cursor-pointer"
                >
                  <option>Courier: All Units</option>
                  <option>Unit #07 (Julian R.)</option>
                  <option>Unit #02 (Matteo S.)</option>
                  <option>Unit #05 (Sarah K.)</option>
                  <option>Unassigned Only</option>
                </select>

                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFulfillmentFilter('Fulfillment: All Types');
                    setVipTierFilter('VIP Tier: All Tiers');
                    showToast('Filters reset');
                  }}
                  className="h-9 w-9 rounded-lg border border-neutral-300 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
                  title="Reset Filters"
                >
                  <FilterX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bulk Selection Banner */}
            {selectedOrderIds.length > 0 && (
              <div className="bg-[#2A3043] text-white px-4 py-2.5 rounded-lg flex items-center justify-between text-xs shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-[#4B41E1] flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">
                    <strong>{selectedOrderIds.length} orders selected</strong> — Ready for bulk dispatch operations
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => showToast(`Assigned ${selectedOrderIds.length} orders to Unit #07`)}
                    className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Assign Courier</span>
                  </button>
                  <button
                    onClick={() => showToast(`Climate bags sealed for ${selectedOrderIds.length} orders`)}
                    className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Batch Seal Bags</span>
                  </button>
                  <button
                    onClick={() => showToast(`Printing ${selectedOrderIds.length} holographic authentication tags`)}
                    className="px-3 py-1 rounded bg-[#4B41E1] text-white hover:bg-[#4B41E1]/90 transition-colors flex items-center gap-1.5 font-bold"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Print Holographic Tags</span>
                  </button>
                  <button
                    onClick={() => setSelectedOrderIds([])}
                    className="text-white/70 hover:text-white p-1"
                    title="Deselect All"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4 & 5. Master Order Queue Table + Slide-Out Inspector Panel Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Table Section (Takes 8 cols on xl screens) */}
            <div className="xl:col-span-8 bg-white border border-[#C6C6CD]/30 rounded-xl overflow-hidden shadow-sm">
              {/* Table Toolbar */}
              <div className="px-5 py-3.5 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#151B2D]">Queue Stream (Active {orders.length})</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[11px] text-[#76777D] font-mono">Updated 12s ago</span>
                </div>
                <button
                  onClick={() => showToast('Customized view modal opened')}
                  className="text-xs text-[#4B41E1] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Customize View</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-[#F2F3FF]/70 text-[10px] font-bold uppercase tracking-wider text-[#45464D]">
                      <th className="py-3 px-4 w-10">
                        <input
                          type="checkbox"
                          checked={selectedOrderIds.length === orders.length}
                          onChange={handleToggleSelectAll}
                          className="rounded border-neutral-300 text-black focus:ring-0 w-4 h-4 cursor-pointer"
                        />
                      </th>
                      <th className="py-3 px-3">Order Identifier &amp; Client</th>
                      <th className="py-3 px-3">Garment SKU &amp; Specs</th>
                      <th className="py-3 px-3">Fulfillment Type</th>
                      <th className="py-3 px-3">Courier Unit</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Cryptographic NFC</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 text-xs">
                    {orders.map((order) => {
                      const isSelected = selectedOrderIds.includes(order.id);
                      const isInspected = inspectedOrderId === order.id;

                      return (
                        <tr
                          key={order.id}
                          onClick={() => setInspectedOrderId(order.id)}
                          className={`transition-colors cursor-pointer ${
                            isInspected
                              ? 'bg-[#4B41E1]/5 ring-1 ring-[#4B41E1]/30'
                              : isSelected
                              ? 'bg-neutral-50'
                              : 'hover:bg-neutral-50/80'
                          }`}
                        >
                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleSelectOrder(order.id)}
                              className="rounded border-neutral-300 text-black focus:ring-0 w-4 h-4 cursor-pointer"
                            />
                          </td>

                          {/* Identifier & Client */}
                          <td className="py-3.5 px-3">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-[#151B2D]">#{order.id}</span>
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase ${order.urgencyColor}`}>
                                  {order.urgency}
                                </span>
                              </div>
                              <span className="font-bold text-[#151B2D] mt-0.5">{order.client}</span>
                              <span className="text-[10px] text-[#76777D]">{order.vipTier} • {order.location}</span>
                            </div>
                          </td>

                          {/* SKU & Specs */}
                          <td className="py-3.5 px-3">
                            <div className="flex flex-col">
                              <span className="font-bold text-[#151B2D] leading-tight">{order.garmentTitle}</span>
                              <span className="text-[10px] text-neutral-600 mt-0.5">{order.garmentSpecs}</span>
                              <span className="text-[9px] text-[#76777D] font-mono">SKU: {order.sku}</span>
                            </div>
                          </td>

                          {/* Fulfillment Type */}
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <Store className="w-4 h-4 text-[#4B41E1] shrink-0" />
                              <div className="flex flex-col">
                                <span className="font-semibold text-[#151B2D]">{order.fulfillmentType}</span>
                                <span className="text-[10px] text-[#76777D]">{order.fulfillmentSub}</span>
                              </div>
                            </div>
                          </td>

                          {/* Courier Unit */}
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-[10px] text-neutral-800">
                                {order.courierInitials}
                              </span>
                              <div className="flex flex-col">
                                <span className="font-semibold text-[#151B2D]">{order.courierUnit}</span>
                                <span className="text-[10px] text-emerald-700 font-medium">{order.courierName}</span>
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-3">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              {order.status}
                            </span>
                          </td>

                          {/* Cryptographic NFC */}
                          <td className="py-3.5 px-3">
                            {order.nfcReady ? (
                              <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-700 bg-neutral-100 px-2 py-1 rounded border border-neutral-300">
                                <Lock className="w-3 h-3 text-[#4B41E1]" />
                                <span>{order.nfcHash}</span>
                              </div>
                            ) : (
                              <span className="font-mono text-[10px] text-red-600 font-semibold flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3 text-red-500" />
                                Pending HSM
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => showToast(`Printing order slip for #${order.id}`)}
                                className="p-1 rounded hover:bg-neutral-200 text-neutral-600 hover:text-black"
                                title="View Order Slip"
                              >
                                <Receipt className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => showToast(`Opening direct channel to ${order.courierName}`)}
                                className="p-1 rounded hover:bg-neutral-200 text-neutral-600 hover:text-[#4B41E1]"
                                title="Direct Courier Channel"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onGoToTracking ? onGoToTracking() : showToast(`Tracking corridor opened for #${order.id}`)}
                                className="p-1 rounded hover:bg-neutral-200 text-neutral-600 hover:text-black"
                                title="Inspect Route"
                              >
                                <Route className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination Footer */}
              <div className="px-5 py-3 border-t border-neutral-200 flex items-center justify-between text-xs text-[#76777D] bg-white">
                <div className="flex items-center gap-2">
                  <span>Showing <strong>1-6</strong> of <strong>42</strong> atelier orders</span>
                  <span className="text-neutral-300 font-mono">|</span>
                  <span>Page Size:</span>
                  <select className="bg-transparent border-0 font-bold p-0 text-black cursor-pointer text-xs">
                    <option>10 per page</option>
                    <option defaultValue>25 per page</option>
                    <option>50 per page</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded flex items-center justify-center border border-neutral-200 text-neutral-400 disabled:opacity-40" disabled>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded flex items-center justify-center bg-black text-white font-bold text-xs">1</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center border border-neutral-200 hover:bg-neutral-100 text-xs">2</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center border border-neutral-200 hover:bg-neutral-100 text-xs">3</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center border border-neutral-200 text-neutral-600 hover:bg-neutral-100">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 5. Slide-Out / Docked Order Inspector Panel */}
            <div className="xl:col-span-4 flex flex-col gap-4">
              <div className="bg-white border border-[#C6C6CD]/40 rounded-xl overflow-hidden shadow-md">
                {/* Inspector Header */}
                <div className="p-5 border-b border-neutral-200 bg-[#F2F3FF]/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-[#76777D] uppercase">Active Order Inspector</span>
                      <div className="text-lg font-bold text-[#151B2D]">#{inspectedOrder.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${inspectedOrder.urgencyColor}`}>
                      {inspectedOrder.urgency}
                    </span>
                    <button
                      onClick={() => showToast(`Expanded full view for #${inspectedOrder.id}`)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-100"
                      title="Maximize Inspector"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* VIP Profile Badge */}
                <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#DCE1FB] flex items-center justify-center text-[#4B41E1] font-bold text-sm ring-2 ring-[#4B41E1]/20">
                      {inspectedOrder.client.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#151B2D]">{inspectedOrder.client}</span>
                      <span className="text-xs text-[#4B41E1] font-semibold">{inspectedOrder.vipTier} Member • 18 Past Orders</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#76777D] block">Delivery Hub</span>
                    <span className="text-xs font-bold text-[#151B2D]">{inspectedOrder.location}</span>
                  </div>
                </div>

                {/* Garment Visual & Real-Time Telemetry */}
                <div className="p-5 border-b border-neutral-200 flex flex-col gap-4">
                  <div className="text-[10px] font-bold text-[#76777D] uppercase tracking-wider">
                    Garment Staging &amp; Climate Bag Telemetry
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-24 h-28 rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shrink-0 relative">
                      <img
                        src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400"
                        alt={inspectedOrder.garmentTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/75 text-[8px] font-mono text-white">
                        #14 CEDAR
                      </div>
                    </div>

                    <div className="flex flex-col justify-between flex-1 py-0.5">
                      <div>
                        <h4 className="text-xs font-bold text-[#151B2D]">{inspectedOrder.garmentTitle}</h4>
                        <p className="text-[11px] text-[#76777D] mt-0.5">{inspectedOrder.garmentSpecs}</p>
                        <div className="text-[10px] font-mono text-neutral-500 mt-1">
                          NFC: {inspectedOrder.nfcHash} • Polygon zkEVM
                        </div>
                      </div>

                      {/* Climate Sensor Readouts */}
                      <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-neutral-200">
                        <div className="flex items-center gap-1.5">
                          <Thermometer className="w-4 h-4 text-[#4B41E1]" />
                          <div className="flex flex-col">
                            <span className="text-[9px] text-[#76777D] leading-none">Internal Temp</span>
                            <span className="text-xs font-bold font-mono text-[#151B2D]">
                              19.4°C <span className="text-emerald-600 font-sans text-[9px]">Optimal</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Droplets className="w-4 h-4 text-[#4B41E1]" />
                          <div className="flex flex-col">
                            <span className="text-[9px] text-[#76777D] leading-none">Humidity</span>
                            <span className="text-xs font-bold font-mono text-[#151B2D]">
                              47% RH <span className="text-emerald-600 font-sans text-[9px]">Stable</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bag Seal Status Banner */}
                  <div className="bg-[#F2F3FF] border border-[#C6C6CD]/30 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#4B41E1]" />
                      <span className="text-xs font-semibold text-[#151B2D]">Climate-Lock Cedar Garment Bag #09 Sealed</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold">14.2 min ago</span>
                  </div>
                </div>

                {/* White-Glove Handoff Checklist */}
                <div className="p-5 border-b border-neutral-200 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#76777D] uppercase tracking-wider">White-Glove Handoff Checklist</span>
                    <span className="text-xs font-bold font-mono text-[#151B2D]">{completedChecklistCount} of 4 Complete</span>
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklist.seal}
                        onChange={(e) => setChecklist(prev => ({ ...prev, seal: e.target.checked }))}
                        className="rounded border-neutral-300 text-black focus:ring-0 w-4 h-4"
                      />
                      <span>Holographic Anti-Tamper Seal applied to outer zip</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklist.nfc}
                        onChange={(e) => setChecklist(prev => ({ ...prev, nfc: e.target.checked }))}
                        className="rounded border-neutral-300 text-black focus:ring-0 w-4 h-4"
                      />
                      <span>NFC Micro-Tag programmed &amp; physical hardware scan verified</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checklist.hanger}
                        onChange={(e) => setChecklist(prev => ({ ...prev, hanger: e.target.checked }))}
                        className="rounded border-neutral-300 text-black focus:ring-0 w-4 h-4"
                      />
                      <span>Climate-lock cedar hanger bagged with silica freshness pod</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer bg-[#F2F3FF]/70 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={checklist.signature}
                        onChange={(e) => setChecklist(prev => ({ ...prev, signature: e.target.checked }))}
                        className="rounded border-neutral-300 text-black focus:ring-0 w-4 h-4"
                      />
                      <span className="font-semibold text-black">Doorstep biometric signature / client PIN confirmation</span>
                    </label>
                  </div>
                </div>

                {/* Assigned Courier Telemetry */}
                <div className="p-5 border-b border-neutral-200 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                      {inspectedOrder.courierInitials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#151B2D]">{inspectedOrder.courierUnit} • {inspectedOrder.courierName}</span>
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        In Transit • 0.4 miles away (Est. 3 min)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`Calling ${inspectedOrder.courierName}...`)}
                    className="h-8 px-3 rounded-full border border-neutral-300 text-xs font-semibold hover:bg-neutral-100 transition-colors flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Unit</span>
                  </button>
                </div>

                {/* Inspector Action Buttons */}
                <div className="p-5 flex flex-col gap-2.5 bg-[#F2F3FF]/40">
                  <button
                    onClick={() => onGoToVault ? onGoToVault() : showToast('Opening Cryptographic HSM Certificate on Polygon zkEVM')}
                    className="w-full h-10 rounded-full bg-black text-white hover:bg-neutral-800 transition-all text-xs font-bold flex items-center justify-center gap-2 active:scale-98 shadow-sm"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Open Cryptographic Vault Certificate</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onGoToTracking ? onGoToTracking() : showToast(`Inspecting route corridor for #${inspectedOrder.id}`)}
                      className="h-9 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 transition-colors text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Route className="w-4 h-4 text-[#4B41E1]" />
                      <span>Inspect Route</span>
                    </button>

                    <button
                      onClick={() => showToast(`Printing official tax invoice for ${inspectedOrder.client}`)}
                      className="h-9 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 transition-colors text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Receipt className="w-4 h-4" />
                      <span>Print Invoice</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Docked Mini-Card: Rapid Dispatch Alert */}
              <div className="bg-white border border-[#C6C6CD]/30 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E2DFFF] text-[#4B41E1] flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#151B2D] block">Upcoming Try-On Window</span>
                    <span className="text-[11px] text-[#76777D]">#AUR-EX-99245 swap ready in bay 4</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setInspectedOrderId('AUR-EX-99245');
                    showToast('Pre-staging swap order #AUR-EX-99245 in bay 4');
                  }}
                  className="text-xs text-[#4B41E1] font-bold hover:underline"
                >
                  Pre-Stage →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
