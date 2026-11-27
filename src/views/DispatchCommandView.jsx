import React, { useState } from 'react';
import { 
  Truck, Battery, Shield, Navigation, MapPin, Search, 
  Settings, AlertTriangle, CheckCircle2, ChevronRight,
  RefreshCw, Radio, Layers, Plus, Compass, Zap, Thermometer,
  Clock, ArrowUpRight, Check, Key, UserCheck, ArrowLeft
} from 'lucide-react';

const FLEET_VANS = [
  {
    id: '07',
    name: 'Julian R.',
    role: 'Master Courier',
    status: 'En Route to Mercer St',
    eta: '8 min',
    battery: 78,
    temp: '19.8°C',
    parcels: '4 aboard (2 sets)',
    priority: 'Tier 1 VIP',
    plate: 'NYC-EV-07',
    model: 'Mercedes eVito Luxury Custom',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    activeStop: '72 Mercer St, Apt 4B (Camille Laurent)',
    stops: [
      { addr: '452 W Broadway', client: 'Elena Vasiliev', status: 'Completed 13:58', done: true },
      { addr: '72 Mercer St', client: 'Camille Laurent', status: 'Next Stop • ETA 8m', urgent: true },
      { addr: '114 Greene St', client: 'David K.', status: 'En Route • ETA 15:10' }
    ]
  },
  {
    id: '03',
    name: 'Marcus V.',
    role: 'Senior Stylist Courier',
    status: 'Try-On in Progress (98 Franklin St)',
    eta: 'Fitting',
    battery: 84,
    temp: '20.1°C',
    parcels: '3 aboard',
    priority: 'Standard VIP',
    plate: 'NYC-EV-03',
    model: 'Mercedes eVito',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    activeStop: '98 Franklin St (Vivienne Chen)',
    stops: [
      { addr: '98 Franklin St', client: 'Vivienne Chen', status: 'Fitting 11/15m elapsed' }
    ]
  },
  {
    id: '02',
    name: 'Matteo S.',
    role: 'Rapid Swap Courier',
    status: 'Rapid Swap Dispatch (ETA 6m)',
    eta: '6 min',
    battery: 92,
    temp: '19.5°C',
    parcels: '1 swap piece',
    priority: 'Urgent Swap',
    plate: 'NYC-EV-02',
    model: 'Mercedes eVito',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    activeStop: '72 Mercer St Rendezvous',
    stops: [
      { addr: '72 Mercer St Rendezvous', client: 'Camille Laurent', status: 'Carrying Size 38 Silk Slip' }
    ]
  },
  {
    id: '05',
    name: 'Sarah K.',
    role: 'Atelier Technician',
    status: 'Dock Gate 2 • Staging & Steaming',
    eta: 'Dep 14:30',
    battery: 100,
    temp: '21.0°C',
    parcels: '6 garments loading',
    priority: 'Gala Run',
    plate: 'NYC-EV-05',
    model: 'Mercedes eVito Cargo',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    activeStop: 'Upper East Side Evening VIP Run',
    stops: [
      { addr: '820 5th Ave', client: 'Eleanor Vance', status: 'Departure 14:30' }
    ]
  }
];

export default function DispatchCommandView({ onBackToStore, onSelectCourierApp }) {
  const [selectedVanId, setSelectedVanId] = useState('07');
  const [activeZone, setActiveZone] = useState('All Zones');
  const selectedVan = FLEET_VANS.find((v) => v.id === selectedVanId) || FLEET_VANS[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex selection:bg-amber-500 selection:text-neutral-950">
      {/* Left Navigation Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-5 flex flex-col justify-between hidden lg:flex flex-shrink-0">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-base shadow-md">
              A
            </div>
            <div>
              <h1 className="font-bold text-sm text-white tracking-tight font-serif">AURA Atelier Ops</h1>
              <p className="text-[10px] font-mono text-amber-400">Command Center v2.4</p>
            </div>
          </div>

          {/* Hub Status Pill */}
          <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-[9px] font-mono uppercase text-neutral-400 block">Active Node</span>
              <span className="font-semibold text-white">NY SoHo Hub #01</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20">
              HSM ACTIVE
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            <a href="#overview" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors">
              <Compass className="w-4 h-4" />
              <span>Overview</span>
            </a>
            <a href="#fleet" className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold shadow-md">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4" />
                <span>Dispatch &amp; Fleet</span>
              </div>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-neutral-950 text-white font-mono">6 Vans</span>
            </a>
            <a href="#orders" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors">
              <CheckCircle2 className="w-4 h-4" />
              <span>Orders &amp; Fulfillment</span>
            </a>
            <button
              onClick={onSelectCourierApp}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-amber-400 hover:bg-amber-500/10 border border-amber-500/30 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Courier Driver View</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onBackToStore}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors text-left"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Storefront</span>
            </button>
          </nav>
        </div>

        {/* Telemetry Status Footer */}
        <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs">
          <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Fleet Mesh</span>
              <span className="font-bold text-emerald-400 font-mono">99.8% Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">HSM NFC Vault</span>
              <span className="font-mono text-neutral-200">Hardware Locked</span>
            </div>
          </div>

          <button className="w-full py-2 px-3 rounded-xl border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Emergency Protocol</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-800 px-6 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            {/* Hub Selector */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-semibold text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>SoHo Flagship Vault #01 • NYC</span>
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search vehicle ID, courier, destination..."
                className="w-full pl-10 pr-4 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-full text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onSelectCourierApp}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold active:scale-95 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Test Driver App</span>
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold active:scale-95 transition-all shadow-md">
              <Plus className="w-3.5 h-3.5" />
              <span>Deploy eVito Van</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Executive KPI Bar */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Fleet Utilization</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-white font-mono">8 / 10</span>
                <span className="text-xs text-neutral-400">eVito Vans Active</span>
              </div>
              <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-amber-500 rounded-full" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Window Precision</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">99.6%</span>
                <span className="text-xs text-emerald-400 font-semibold">↑ 0.4% today</span>
              </div>
              <p className="text-[11px] text-neutral-400">&lt; 2.4 min avg route deviation</p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Garment Integrity</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-white font-mono">100%</span>
                <span className="text-xs text-neutral-400">Climate Lock</span>
              </div>
              <p className="text-[11px] text-neutral-400">Cedar Vault: 19.5°C • 48% RH</p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">In-Transit Value</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono">$248,600</span>
                <span className="text-xs text-neutral-400">USD</span>
              </div>
              <p className="text-[11px] text-neutral-400">34 Active Pieces • 8 Lockboxes</p>
            </div>
          </section>

          {/* GIS Telemetry Map & Active Roster Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* GIS Map & Unit Focus (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Map Container */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden relative shadow-lg">
                {/* Zone Filter Chips */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 p-1 rounded-full bg-neutral-900/90 backdrop-blur-md border border-neutral-800">
                  {['All Zones', 'Downtown SoHo', 'Midtown', 'Uptown UES'].map((zone) => (
                    <button
                      key={zone}
                      onClick={() => setActiveZone(zone)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        activeZone === zone ? 'bg-amber-500 text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {zone}
                    </button>
                  ))}
                </div>

                {/* SVG Cartography Vector */}
                <div className="relative h-[440px] w-full bg-[#0a0d14] overflow-hidden select-none flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="cmdGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f293d" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cmdGrid)" />
                    {/* Street corridors */}
                    <path d="M 60,0 L 260,200 L 220,440" fill="none" stroke="#1e293b" strokeWidth="12" />
                    <path d="M 0,260 L 700,240" fill="none" stroke="#172033" strokeWidth="8" />
                    <path d="M 0,160 L 700,140" fill="none" stroke="#172033" strokeWidth="8" />
                    <path d="M 120,0 Q 140,240 280,440" fill="none" stroke="#2a3854" strokeWidth="14" />
                    {/* Active Transit Path for Unit 07 */}
                    <path d="M 320,290 L 360,220 L 420,160" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6,4" className="animate-pulse" />
                  </svg>

                  {/* Flagship Base Pin */}
                  <div className="absolute top-[210px] left-[270px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-amber-400 flex items-center justify-center text-amber-400 font-bold text-xs shadow-xl">
                      A
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded bg-black/90 text-[9px] font-mono text-amber-300 border border-amber-500/30">
                      SoHo Hub #01
                    </span>
                  </div>

                  {/* Vehicle Nodes */}
                  {FLEET_VANS.map((van, idx) => {
                    const positions = [
                      { top: 220, left: 360 },
                      { top: 290, left: 210 },
                      { top: 340, left: 280 },
                      { top: 140, left: 420 }
                    ];
                    const pos = positions[idx] || { top: 200, left: 200 };
                    const isSelected = selectedVanId === van.id;

                    return (
                      <div
                        key={van.id}
                        onClick={() => setSelectedVanId(van.id)}
                        style={{ top: `${pos.top}px`, left: `${pos.left}px` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
                      >
                        <div className="relative">
                          {isSelected && <span className="absolute -inset-2 rounded-full bg-amber-400/30 animate-ping" />}
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-white border-2 shadow-xl transition-transform group-hover:scale-110 ${
                              isSelected ? 'bg-amber-500 border-white text-neutral-950' : 'bg-neutral-900 border-neutral-600'
                            }`}
                          >
                            <Truck className="w-4 h-4" />
                          </div>
                        </div>
                        <span
                          className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold whitespace-nowrap shadow-md ${
                            isSelected
                              ? 'bg-amber-500 text-neutral-950'
                              : 'bg-black/90 text-neutral-300 border border-neutral-800'
                          }`}
                        >
                          Unit #{van.id} ({van.name})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Unit Focus Card */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedVan.avatar}
                      alt={selectedVan.name}
                      className="w-12 h-12 rounded-xl object-cover border border-neutral-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-white">Unit #{selectedVan.id} • {selectedVan.name}</h3>
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                          {selectedVan.role}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {selectedVan.model} • Plate: <strong className="text-white font-mono">{selectedVan.plate}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-center font-mono">
                      <span className="text-[10px] text-neutral-500 block">Battery</span>
                      <span className="text-emerald-400 font-bold">{selectedVan.battery}%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-center font-mono">
                      <span className="text-[10px] text-neutral-500 block">Suit Rack</span>
                      <span className="text-amber-400 font-bold">{selectedVan.temp}</span>
                    </div>
                  </div>
                </div>

                {/* Stops Timeline */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                    Active Delivery Sequence
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    {selectedVan.stops.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className={`p-3 rounded-xl border ${
                          st.urgent
                            ? 'bg-amber-500/10 border-amber-500/40'
                            : st.done
                            ? 'bg-neutral-950/60 border-neutral-800'
                            : 'bg-neutral-950 border-neutral-800/80'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                          {st.status}
                        </span>
                        <h4 className="font-semibold text-white mt-1 line-clamp-1">{st.addr}</h4>
                        <p className="text-[11px] text-neutral-400">{st.client}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-neutral-800 text-xs">
                  <button
                    onClick={onSelectCourierApp}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold active:scale-95 transition-all shadow-md"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Launch Unit #{selectedVan.id} Driver Terminal</span>
                  </button>
                  <button className="px-4 py-2 rounded-full border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-semibold transition-all">
                    Reroute Corridor
                  </button>
                </div>
              </div>
            </div>

            {/* Active Roster List (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono uppercase text-neutral-400 px-1">
                <span>Active Courier Roster ({FLEET_VANS.length})</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live GPS
                </span>
              </div>

              <div className="space-y-3">
                {FLEET_VANS.map((van) => {
                  const isSelected = selectedVanId === van.id;
                  return (
                    <div
                      key={van.id}
                      onClick={() => setSelectedVanId(van.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-neutral-900 border-amber-500/80 shadow-lg shadow-amber-500/5'
                          : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={van.avatar}
                            alt={van.name}
                            className="w-11 h-11 rounded-xl object-cover border border-neutral-700"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-white">{van.name}</h4>
                              <span className="text-[10px] font-mono text-neutral-400">#{van.id}</span>
                            </div>
                            <span className="text-xs text-amber-400 font-medium line-clamp-1">
                              {van.status}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 border border-neutral-800">
                          {van.eta}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-neutral-800 text-[11px] font-mono text-neutral-400">
                        <div>Batt: <strong className="text-white">{van.battery}%</strong></div>
                        <div>Cargo: <strong className="text-white">{van.parcels.split(' ')[0]} pcs</strong></div>
                        <div className="text-right text-amber-400">{van.priority}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
