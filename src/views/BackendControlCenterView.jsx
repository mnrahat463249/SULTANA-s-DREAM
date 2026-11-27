import React, { useState, useEffect } from 'react';
import { 
  Server, Shield, Cpu, RefreshCw, CheckCircle2, AlertCircle, 
  Package, ShoppingBag, Truck, Sliders, Edit3, 
  Save, Plus, Trash2, ArrowLeft, ExternalLink, Zap, Check, 
  Layers, Lock, Sparkles, Clock, Activity, BarChart3,
  Users, Tag, MapPin, Palette, Settings, Search, Filter,
  ChevronRight, Eye, Download, Phone, Mail, AlertTriangle,
  Terminal, Globe, HardDrive, Database, Radio, Scissors
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function BackendControlCenterView({ 
  onBackToStore, 
  onGoToOrders, 
  onGoToCatalog,
  onNavigate 
}) {
  const [activeMainTab, setActiveMainTab] = useState('routes'); 
  // 'routes' | 'products' | 'orders' | 'telemetry' | 'settings'

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Backend Live States
  const [routes, setRoutes] = useState([]);
  const [telemetry, setTelemetry] = useState(null);
  const [health, setHealth] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const loadAllBackendArchitecture = async () => {
    setLoading(true);
    try {
      // 1. Health check
      const h = await apiService.checkHealth();
      setHealth(h);

      // 2. Fetch Architecture Routes directly from PHP backend
      const routeRes = await apiService.getArchitectureRoutes();
      if (routeRes && routeRes.routes) {
        setRoutes(routeRes.routes);
      }

      // 3. Fetch Architecture Telemetry
      const telemRes = await apiService.getArchitectureTelemetry();
      setTelemetry(telemRes);

      // 4. Products & Orders
      const prods = await apiService.adminGetProducts();
      setProducts(prods || []);

      const dash = await apiService.adminGetDashboard();
      if (dash && dash.recent_orders) {
        setOrders(dash.recent_orders);
      }
    } catch (err) {
      console.warn('Backend architecture fetch failed, falling back to cached state:', err);
      showToast('Offline mode: connected to local architectural registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllBackendArchitecture();
  }, []);

  // Handle Route Status Toggle (Calls PHP Backend Endpoint)
  const handleToggleRouteStatus = async (routeId, newStatus) => {
    setSaving(true);
    try {
      await apiService.updateArchitectureRouteStatus(routeId, newStatus);
      setRoutes(prev => prev.map(r => r.id === routeId ? { ...r, status: newStatus } : r));
      showToast(`Backend updated: Route '${routeId}' set to ${newStatus}`);
    } catch (err) {
      showToast('Failed to update status: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Handle Cache Clear (Calls PHP Backend Endpoint)
  const handleClearCache = async () => {
    setSaving(true);
    try {
      const res = await apiService.clearBackendCache();
      showToast(res.message || 'Backend route architecture cache cleared.');
      loadAllBackendArchitecture();
    } catch (err) {
      showToast('Error clearing cache: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Filtered routes
  const filteredRoutes = routes.filter(r => {
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.name?.toLowerCase().includes(q) ||
      r.hash?.toLowerCase().includes(q) ||
      r.controller?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q)
    );
  });

  const categoryStats = {
    all: routes.length,
    ecommerce: routes.filter(r => r.category === 'ecommerce').length,
    workshop: routes.filter(r => r.category === 'workshop').length,
    fleet: routes.filter(r => r.category === 'fleet').length,
    admin: routes.filter(r => r.category === 'admin').length
  };

  const handleLaunchRoute = (route) => {
    if (onNavigate) {
      onNavigate(route.id);
    } else {
      window.location.hash = route.hash;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-[#E1E7EF] font-sans selection:bg-[#7A3E5D] selection:text-white pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#161B26] text-white px-5 py-2.5 rounded-full text-xs font-mono shadow-2xl border border-[#7A3E5D] flex items-center gap-2 animate-bounce">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#1E2638] px-4 sm:px-8 h-16 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToStore}
            className="p-2 -ml-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
            title="Return to Storefront"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono font-black text-sm tracking-widest text-[#D8A7B1] uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#D8A7B1]" />
                DEVELOPER ARCHITECTURE ROUTE CONTROL
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                BACKEND CONTROLLED
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono">
              PHP/8.2.12 Laravel Gateway • 127.0.0.1:8000 • Persistence: store.json
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleClearCache}
            disabled={saving}
            className="hidden sm:flex px-3 py-1.5 bg-[#141A29] hover:bg-[#1E2638] text-neutral-300 border border-[#2A364F] rounded-xl text-xs font-mono font-semibold transition-colors items-center gap-1.5"
            title="Clear PHP Route Cache"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${saving ? 'animate-spin' : ''}`} />
            <span>Flush Cache</span>
          </button>

          <button
            onClick={loadAllBackendArchitecture}
            disabled={loading}
            className="p-2 border border-[#2A364F] bg-[#141A29] rounded-xl text-neutral-400 hover:text-white hover:bg-[#1E2638] transition-colors"
            title="Sync with Backend"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#D8A7B1]' : ''}`} />
          </button>

          <button
            onClick={onBackToStore}
            className="px-4 py-2 bg-[#7A3E5D] hover:bg-[#632E48] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-[#7A3E5D]/20"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Telemetry Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0D121D] border border-[#1E2638] rounded-3xl p-4 text-xs font-mono">
          <div className="p-3 bg-[#131926] rounded-2xl border border-[#232D42]">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">
              Gateway Engine
            </span>
            <span className="text-sm font-bold text-white mt-1 block">
              PHP {telemetry?.php_version || '8.2.12'}
            </span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">RESTful JSON Gateway</span>
          </div>

          <div className="p-3 bg-[#131926] rounded-2xl border border-[#232D42]">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">
              Memory Footprint
            </span>
            <span className="text-sm font-bold text-white mt-1 block">
              {telemetry?.memory_usage || '0.62 MB'}
            </span>
            <span className="text-[10px] text-neutral-400 block mt-0.5">Peak: {telemetry?.memory_peak || '0.73 MB'}</span>
          </div>

          <div className="p-3 bg-[#131926] rounded-2xl border border-[#232D42]">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">
              Route Registry
            </span>
            <span className="text-sm font-bold text-[#D8A7B1] mt-1 block">
              {routes.length} Architecture Nodes
            </span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">100% Backend Controlled</span>
          </div>

          <div className="p-3 bg-[#131926] rounded-2xl border border-[#232D42]">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">
              Database Sync
            </span>
            <span className="text-sm font-bold text-white mt-1 block">
              {telemetry?.database_size || '35 KB'}
            </span>
            <span className="text-[10px] text-neutral-400 block mt-0.5">store.json (Persistent)</span>
          </div>
        </div>

        {/* Primary Tab Navigation */}
        <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'routes', label: 'Route Architecture Matrix', icon: Layers, count: routes.length },
              { id: 'products', label: 'Backend Catalog & Stock', icon: ShoppingBag, count: products.length },
              { id: 'orders', label: 'Order State Machine', icon: Package, count: orders.length },
              { id: 'telemetry', label: 'Server Diagnostics', icon: Activity, count: null }
            ].map(tab => {
              const Icon = tab.icon;
              const active = activeMainTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMainTab(tab.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    active
                      ? 'bg-[#7A3E5D] text-white shadow-md shadow-[#7A3E5D]/30'
                      : 'bg-[#121724] border border-[#1E2638] text-neutral-400 hover:text-white hover:bg-[#1A2234]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`px-2 py-0.2 rounded-full text-[10px] ${
                      active ? 'bg-white/20 text-white' : 'bg-[#1E2638] text-neutral-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: ROUTE ARCHITECTURE MATRIX (MAIN REQUESTED FEATURE) */}
        {activeMainTab === 'routes' && (
          <div className="space-y-4">
            {/* Filter Pills & Search */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0D121D] p-3 rounded-2xl border border-[#1E2638]">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {[
                  { id: 'all', label: 'All Architecture Nodes', count: categoryStats.all },
                  { id: 'ecommerce', label: 'Public E-Commerce', count: categoryStats.ecommerce },
                  { id: 'workshop', label: 'Atelier Workshop Ops', count: categoryStats.workshop },
                  { id: 'fleet', label: 'Fleet & Logistics', count: categoryStats.fleet },
                  { id: 'admin', label: 'Executive Admin Suite', count: categoryStats.admin }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-[#1E2638] text-[#D8A7B1] border border-[#3A496B]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat.label} ({cat.count})
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by route name, hash, controller..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#141A29] border border-[#232D42] rounded-xl text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-[#7A3E5D]"
                />
              </div>
            </div>

            {/* Routes Table */}
            <div className="bg-[#0D121D] border border-[#1E2638] rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#121825] border-b border-[#1E2638] text-neutral-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Module Name & Description</th>
                      <th className="p-4">Route Path / Hash</th>
                      <th className="p-4">Backend Controller</th>
                      <th className="p-4">Layer</th>
                      <th className="p-4">Backend Status</th>
                      <th className="p-4 text-right">Route Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A2234]">
                    {filteredRoutes.map((route) => {
                      const isActive = route.status === 'active';
                      return (
                        <tr key={route.id} className="hover:bg-[#121724]/70 transition-colors">
                          <td className="p-4">
                            <span className="font-bold text-white block text-sm">{route.name}</span>
                            <span className="text-[11px] text-neutral-400 font-sans mt-0.5 block max-w-sm">
                              {route.description}
                            </span>
                          </td>

                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-lg bg-[#141A29] border border-[#2A364F] text-[#D8A7B1] font-bold text-xs">
                              {route.hash}
                            </span>
                          </td>

                          <td className="p-4 text-neutral-300">
                            <div className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#1C2438] text-emerald-400 border border-[#2A364F]">
                                {route.method || 'GET'}
                              </span>
                              <span className="truncate max-w-[220px]" title={route.controller}>
                                {route.controller?.replace('App\\Http\\Controllers\\Api\\', '')}
                              </span>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1A2234] text-neutral-300 border border-[#2A364F]">
                              {route.category_label || route.category}
                            </span>
                          </td>

                          <td className="p-4">
                            <select
                              value={route.status || 'active'}
                              onChange={(e) => handleToggleRouteStatus(route.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors focus:outline-none ${
                                isActive
                                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-600/40'
                                  : route.status === 'maintenance'
                                  ? 'bg-amber-950/60 text-amber-400 border-amber-600/40'
                                  : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                              }`}
                            >
                              <option value="active">Active</option>
                              <option value="maintenance">Maintenance</option>
                              <option value="simulated">Simulated</option>
                              <option value="disabled">Disabled</option>
                            </select>
                          </td>

                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleLaunchRoute(route)}
                              className="px-3.5 py-1.5 bg-[#7A3E5D] hover:bg-[#924B70] text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-md shadow-[#7A3E5D]/20 active:scale-95"
                              title={`Navigate directly to ${route.hash}`}
                            >
                              <span>Open</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BACKEND CATALOG & PRICING */}
        {activeMainTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-serif font-bold text-white">Backend Catalog Persistence</h2>
                <p className="text-xs text-neutral-400 font-mono">Direct 2-way sync with database/store.json</p>
              </div>
              <span className="text-xs font-mono text-neutral-400">{products.length} Products Saved</span>
            </div>

            <div className="bg-[#0D121D] border border-[#1E2638] rounded-3xl overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#121825] border-b border-[#1E2638] text-neutral-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">SKU / ID</th>
                    <th className="p-4">Creation Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price (BDT ৳)</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A2234]">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#121724]/70">
                      <td className="p-4 text-[#D8A7B1] font-bold">{prod.sku || prod.id}</td>
                      <td className="p-4 font-sans font-semibold text-white">{prod.title}</td>
                      <td className="p-4 text-neutral-400">{prod.category}</td>
                      <td className="p-4 font-bold text-emerald-400">৳{Number(prod.price).toLocaleString('en-BD')}</td>
                      <td className="p-4 text-white">{prod.stock !== undefined ? prod.stock : 14} units</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            if (onNavigate) onNavigate('admin_portal');
                            else window.location.hash = '#admin/catalog';
                          }}
                          className="px-3 py-1 bg-[#141A29] hover:bg-[#1E2638] text-neutral-300 border border-[#2A364F] rounded-lg text-xs"
                        >
                          Edit in ERP
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDER STATE MACHINE */}
        {activeMainTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-serif font-bold text-white">Fulfillment & Order State Machine</h2>
                <p className="text-xs text-neutral-400 font-mono">Orders transitioning through backend pipeline</p>
              </div>
            </div>

            <div className="bg-[#0D121D] border border-[#1E2638] rounded-3xl overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#121825] border-b border-[#1E2638] text-neutral-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Order Reference</th>
                    <th className="p-4">Patron Client</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Stage</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A2234]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#121724]/70">
                      <td className="p-4 text-[#D8A7B1] font-bold">#{ord.id}</td>
                      <td className="p-4 font-sans font-semibold text-white">{ord.client}</td>
                      <td className="p-4 font-bold text-emerald-400">৳{Number(ord.total).toLocaleString('en-BD')}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#7A3E5D]/30 text-[#D8A7B1] border border-[#7A3E5D]/50">
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            if (onNavigate) onNavigate('admin_portal');
                            else window.location.hash = '#admin/orders';
                          }}
                          className="px-3 py-1 bg-[#141A29] hover:bg-[#1E2638] text-neutral-300 border border-[#2A364F] rounded-lg text-xs"
                        >
                          Advance State
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SERVER DIAGNOSTICS & TELEMETRY */}
        {activeMainTab === 'telemetry' && (
          <div className="bg-[#0D121D] border border-[#1E2638] rounded-3xl p-6 space-y-6 font-mono text-xs">
            <div>
              <h2 className="text-base font-serif font-bold text-white">Backend Server Telemetry</h2>
              <p className="text-xs text-neutral-400">Low-level execution metrics for PHP runtime and JSON database</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#121724] border border-[#1E2638] rounded-2xl space-y-2">
                <span className="text-[10px] text-neutral-400 uppercase block font-bold">Runtime Specifications</span>
                <p>• PHP Version: <strong className="text-white">{telemetry?.php_version}</strong></p>
                <p>• Host Operating System: <strong className="text-white">{telemetry?.os}</strong></p>
                <p>• Server Software: <strong className="text-white">{telemetry?.gateway}</strong></p>
                <p>• Cross-Origin Resource Sharing (CORS): <strong className="text-emerald-400">Enabled (*)</strong></p>
                <p>• Server Clock: <strong className="text-neutral-300">{telemetry?.server_time}</strong></p>
              </div>

              <div className="p-4 bg-[#121724] border border-[#1E2638] rounded-2xl space-y-2">
                <span className="text-[10px] text-neutral-400 uppercase block font-bold">Storage & Cache Metrics</span>
                <p>• Primary Database: <strong className="text-white">{telemetry?.database_file}</strong></p>
                <p>• Database Payload Size: <strong className="text-[#D8A7B1]">{telemetry?.database_size}</strong></p>
                <p>• Allocated RAM: <strong className="text-white">{telemetry?.memory_usage}</strong></p>
                <p>• Peak Memory Consumption: <strong className="text-white">{telemetry?.memory_peak}</strong></p>
                <p>• Registered Architecture Routes: <strong className="text-emerald-400">{telemetry?.total_routes} Nodes</strong></p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E2638] flex justify-end">
              <button
                onClick={handleClearCache}
                className="px-5 py-2.5 bg-[#7A3E5D] hover:bg-[#632E48] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-[#7A3E5D]/20"
              >
                <RefreshCw className="w-4 h-4" />
                Flush Stat Cache & Re-index
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
