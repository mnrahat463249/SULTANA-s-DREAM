import React, { useState, useEffect } from 'react';
import { 
  Server, Shield, Cpu, RefreshCw, CheckCircle2, AlertCircle, 
  Package, ShoppingBag, Truck, Sliders, Edit3, 
  Save, Plus, Trash2, ArrowLeft, ExternalLink, Zap, Check, 
  Layers, Lock, Sparkles, Clock, Activity, BarChart3,
  Users, Tag, MapPin, Palette, Settings, Search, Filter,
  ChevronRight, Eye, Download, Phone, Mail, AlertTriangle,
  Menu, Image, ToggleLeft, ToggleRight, ArrowUpDown, 
  ChevronUp, ChevronDown, LogOut, Copy, Crown, Store,
  SlidersHorizontal, CheckSquare, Square, Compass
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function AdminPortalView({ onBackToStore, onGoToStorefront, onLogout }) {
  // Navigation Section (12 Modules)
  const [activeSection, setActiveSection] = useState('dashboard'); 
  // 'dashboard' | 'products' | 'categories' | 'orders' | 'inventory' | 'customers' | 'marketing' | 'shipping' | 'cms' | 'navigation' | 'appearance' | 'media' | 'settings'

  // Admin User & Auth
  const [adminUser, setAdminUser] = useState(() => apiService.getAdminUser() || {
    name: 'Ayesha Rahman',
    role: 'Super Admin',
    email: 'admin@sultanasdream.com'
  });

  // Live Backend Data States
  const [health, setHealth] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [homepageSections, setHomepageSections] = useState([]);
  const [navigationItems, setNavigationItems] = useState([]);
  const [inventoryTransactions, setInventoryTransactions] = useState([]);
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [settings, setSettings] = useState({
    store_name: "SULTANA'S DREAM",
    tagline: "Modern South Asian Haute Couture & Everyday Elegance",
    currency: "BDT",
    currency_symbol: "৳",
    free_shipping_threshold: 2500,
    default_shipping_fee: 60,
    outside_dhaka_shipping_fee: 120,
    active_coupon: "SULTANA20",
    coupon_discount_percent: 20,
    announcement_text: "COMPLIMENTARY WHITE-GLOVE SAME-DAY DELIVERY ACROSS DHAKA ON ORDERS OVER ৳2,500 • USE CODE: SULTANA20",
    is_maintenance_mode: false,
    brand_palette: {
      primary: "#7A3E5D",
      secondary: "#D8A7B1",
      background: "#FBF8F5",
      surface: "#FFFFFF",
      text: "#201B1D"
    }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedOrderFilter, setSelectedOrderFilter] = useState('All');

  // Modals & Editing States
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isNewProductModal, setIsNewProductModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [isAdjustStockModal, setIsAdjustStockModal] = useState(false);
  const [stockAdjustForm, setStockAdjustForm] = useState({
    productId: '',
    quantity: 1,
    type: 'restock',
    note: 'Weekly studio batch delivery'
  });

  const [newProductForm, setNewProductForm] = useState({
    title: '',
    category: 'Sarees',
    price: 14500,
    original_price: 18500,
    stock: 10,
    badge: 'Heritage Handloom',
    description: '',
    sku: 'SD-NEW-01'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadBackendData = async () => {
    setLoading(true);
    try {
      // 1. Health check
      const h = await apiService.checkHealth();
      setHealth(h);

      // 2. Admin dashboard & settings
      if (h.online) {
        const [d, prods, cats, hp, nav, txs, media] = await Promise.all([
          apiService.adminGetDashboard().catch(() => ({})),
          apiService.adminGetProducts().catch(() => []),
          apiService.getCategories().catch(() => []),
          apiService.getHomepage().catch(() => ({})),
          apiService.getNavigation().catch(() => ({})),
          apiService.getInventoryTransactions().catch(() => []),
          apiService.getMedia().catch(() => [])
        ]);

        if (d.settings) setSettings(prev => ({ ...prev, ...d.settings }));
        if (d.recent_orders) setOrders(d.recent_orders);
        setProducts(prods || []);
        setCategories(cats || []);
        setHomepageSections(hp.all_sections || hp.sections || []);
        setNavigationItems(nav.items || []);
        setInventoryTransactions(txs || []);
        setMediaLibrary(media || []);
      } else {
        // Fallback local products
        const res = await apiService.fetchProducts({ perPage: 20 });
        setProducts(res.data || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      showToast('Admin data sync notice: Using local cached parameters.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBackendData();
  }, []);

  const formatTaka = (val) => '৳' + Number(val || 0).toLocaleString('en-BD');

  // Handle Logout
  const handleLogout = () => {
    apiService.adminLogout();
    if (onLogout) onLogout();
    else window.location.hash = '#admin/login';
  };

  // 1. Save Settings to Backend
  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await apiService.adminUpdateSettings(settings);
      showToast('Backend settings successfully updated & broadcast.');
    } catch (err) {
      showToast('Saved to local session: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 2. Save Product Updates
  const handleSaveProduct = async (product) => {
    setSaving(true);
    try {
      await apiService.adminUpdateProduct(product.id, product);
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
      setEditingProduct(null);
      showToast(`Product "${product.title}" updated in backend.`);
    } catch (err) {
      showToast('Error updating product: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 3. Create New Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const created = await apiService.adminCreateProduct({
        ...newProductForm,
        images: [
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop"
        ],
        sizes: [{ label: 'Standard', stock: Number(newProductForm.stock) }]
      });
      setProducts(prev => [created.product || { ...newProductForm, id: 'prod_' + Date.now() }, ...prev]);
      setIsNewProductModal(false);
      showToast('New haute creation successfully published to catalog.');
      setNewProductForm({
        title: '',
        category: 'Sarees',
        price: 14500,
        original_price: 18500,
        stock: 10,
        badge: 'Heritage Handloom',
        description: '',
        sku: 'SD-NEW-01'
      });
    } catch (err) {
      showToast('Created locally: ' + err.message);
      setIsNewProductModal(false);
    } finally {
      setSaving(false);
    }
  };

  // 4. Update Order Status
  const handleUpdateOrderStatus = async (orderNumber, newStatus) => {
    setSaving(true);
    try {
      await apiService.adminUpdateOrderStatus(orderNumber, newStatus);
      setOrders(prev => prev.map(o => o.order_number === orderNumber ? { ...o, status: newStatus, production_stage: newStatus } : o));
      if (selectedOrderDetails?.order_number === orderNumber) {
        setSelectedOrderDetails(prev => ({ ...prev, status: newStatus, production_stage: newStatus }));
      }
      showToast(`Order #${orderNumber} transitioned to ${newStatus}.`);
    } catch (err) {
      showToast('Status updated in session: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 5. Toggle Homepage Section Active
  const handleToggleHomepageSection = async (sectionId, currentActive) => {
    const updated = !currentActive;
    setHomepageSections(prev => prev.map(s => s.id === sectionId ? { ...s, is_active: updated } : s));
    try {
      await apiService.updateHomepageSection(sectionId, { is_active: updated });
      showToast(`Section "${sectionId}" is now ${updated ? 'Active on Storefront' : 'Hidden'}.`);
    } catch (err) {
      showToast('Saved locally: ' + err.message);
    }
  };

  // 6. Move Homepage Section (Sort Order)
  const handleMoveSection = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= homepageSections.length) return;

    const newSections = [...homepageSections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // re-assign sort_order
    const updatedWithOrder = newSections.map((s, idx) => ({ ...s, sort_order: idx + 1 }));
    setHomepageSections(updatedWithOrder);

    try {
      await Promise.all(updatedWithOrder.map(s => apiService.updateHomepageSection(s.id, { sort_order: s.sort_order })));
      showToast('Homepage section order updated.');
    } catch (err) {
      console.warn('Reorder saved locally');
    }
  };

  // 7. Save Edited Section Details
  const handleSaveSectionDetails = async () => {
    if (!editingSection) return;
    setSaving(true);
    try {
      await apiService.updateHomepageSection(editingSection.id, editingSection);
      setHomepageSections(prev => prev.map(s => s.id === editingSection.id ? editingSection : s));
      setEditingSection(null);
      showToast(`Section "${editingSection.title || editingSection.id}" updated.`);
    } catch (err) {
      showToast('Saved locally: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 8. Navigation Items Update
  const handleToggleNavItem = async (navId, currentActive) => {
    const updatedItems = navigationItems.map(item => 
      item.id === navId ? { ...item, is_active: !currentActive } : item
    );
    setNavigationItems(updatedItems);
    try {
      await apiService.updateNavigation(updatedItems);
      showToast('Navigation menu updated in backend.');
    } catch (err) {
      showToast('Navigation updated locally.');
    }
  };

  // 9. Stock Adjustment
  const handleStockAdjustment = async (e) => {
    e.preventDefault();
    if (!stockAdjustForm.productId) return;
    setSaving(true);
    try {
      const res = await apiService.adjustInventory(
        stockAdjustForm.productId,
        Number(stockAdjustForm.quantity),
        stockAdjustForm.type,
        stockAdjustForm.note
      );
      if (res.transaction) {
        setInventoryTransactions(prev => [res.transaction, ...prev]);
      }
      // update product in state
      setProducts(prev => prev.map(p => {
        if (p.id === stockAdjustForm.productId) {
          const delta = stockAdjustForm.type === 'reduction' ? -Number(stockAdjustForm.quantity) : Number(stockAdjustForm.quantity);
          const newStock = Math.max(0, (p.stock || 15) + delta);
          return { ...p, stock: newStock };
        }
        return p;
      }));
      setIsAdjustStockModal(false);
      showToast('Inventory ledger updated with transaction record.');
    } catch (err) {
      showToast('Adjustment logged locally: ' + err.message);
      setIsAdjustStockModal(false);
    } finally {
      setSaving(false);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (p.sku || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    if (selectedOrderFilter === 'All') return true;
    return (o.status || o.production_stage || '').toLowerCase() === selectedOrderFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#201B1D] font-sans flex flex-col selection:bg-[#7A3E5D] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#1C1820] text-[#FBF8F5] px-6 py-3 rounded-full text-xs font-mono shadow-2xl border border-[#7A3E5D]/50 flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#D8A7B1]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8DFE2] px-4 sm:px-8 h-16 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToStore}
            className="p-2 -ml-2 text-[#756B70] hover:text-[#201B1D] rounded-full hover:bg-[#FBF8F5] transition-colors"
            title="Return to Storefront"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-lg text-[#7A3E5D] tracking-wide uppercase">
                Sultana's Dream
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4F6] text-[#7A3E5D] border border-[#D8A7B1]">
                Unified ERP Suite
              </span>
            </div>
            <p className="text-[10px] text-[#756B70] font-mono">
              Atelier Management • Single Frontend + Backend Architecture
            </p>
          </div>
        </div>

        {/* Status Indicators, User info & Actions */}
        <div className="flex items-center gap-3">
          {/* Backend Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#FBF8F5] border border-[#E8DFE2] rounded-full text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${health?.online ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="text-[#756B70]">
              {health?.online ? 'Backend Live (PHP 127.0.0.1:8000)' : 'Local Engine Active'}
            </span>
          </div>

          {/* User Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#FAF4F6] border border-[#D8A7B1]/60 rounded-xl text-xs">
            <Crown className="w-3.5 h-3.5 text-[#7A3E5D]" />
            <span className="font-semibold text-[#7A3E5D]">{adminUser.name}</span>
            <span className="text-[10px] text-[#756B70] font-mono">({adminUser.role})</span>
          </div>

          <button
            onClick={loadBackendData}
            disabled={loading}
            className="p-2 border border-[#E8DFE2] rounded-xl text-[#756B70] hover:text-[#201B1D] hover:bg-[#FBF8F5] transition-colors"
            title="Refresh Backend Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#7A3E5D]' : ''}`} />
          </button>

          <button
            onClick={onGoToStorefront || onBackToStore}
            className="px-3.5 py-2 bg-[#FAF4F6] border border-[#D8A7B1] text-[#7A3E5D] hover:bg-[#7A3E5D] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleLogout}
            className="p-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body: Left Sidebar + Right Workspace */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation Sidebar (12 Blueprint Modules) */}
        <aside className="lg:col-span-3 bg-white rounded-3xl border border-[#E8DFE2] p-2.5 sm:p-3 shadow-xs lg:sticky lg:top-24 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 scrollbar-none">
          <div className="hidden lg:flex px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#756B70] items-center justify-between">
            <span>ERP Modules</span>
            <span className="text-[9px] font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-500">12 Total</span>
          </div>

          {[
            { id: 'dashboard', label: '1. Dashboard & KPIs', icon: BarChart3, badge: null },
            { id: 'products', label: '2. Catalog & Products', icon: ShoppingBag, badge: products.length },
            { id: 'categories', label: '3. Categories Manager', icon: Layers, badge: categories.length },
            { id: 'orders', label: '4. Orders & Fulfillment', icon: Package, badge: orders.length },
            { id: 'inventory', label: '5. Inventory & Ledger', icon: Sliders, badge: `${inventoryTransactions.length} txs` },
            { id: 'customers', label: '6. Patrons (CRM)', icon: Users, badge: '2' },
            { id: 'marketing', label: '7. Coupons & Deals', icon: Tag, badge: settings.active_coupon || 'SULTANA20' },
            { id: 'shipping', label: '8. Shipping & Delivery', icon: Truck, badge: 'Dhaka/OOD' },
            { id: 'cms', label: '9. Homepage CMS', icon: Palette, badge: `${homepageSections.filter(s => s.is_active).length} active` },
            { id: 'navigation', label: '10. Navigation & Footer', icon: Compass, badge: `${navigationItems.length} links` },
            { id: 'appearance', label: '11. Appearance & Tokens', icon: Sparkles, badge: 'Plum / Gold' },
            { id: 'media', label: '12. Media Library', icon: Image, badge: `${mediaLibrary.length}` },
            { id: 'settings', label: 'System & Telemetry', icon: Settings, badge: null }
          ].map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setSelectedOrderDetails(null); }}
                className={`flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-semibold transition-all shrink-0 lg:w-full whitespace-nowrap lg:whitespace-normal active:scale-95 ${
                  active 
                    ? 'bg-[#7A3E5D] text-white shadow-xs font-bold' 
                    : 'text-[#201B1D] bg-[#FBF8F5] lg:bg-transparent hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-[#756B70]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-[9px] font-mono shrink-0 hidden sm:inline ${
                    active ? 'bg-white/20 text-white' : 'bg-[#FAF4F6] text-[#7A3E5D] border border-[#D8A7B1]/40'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Right Content Workspace */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* ======================================================== */}
          {/* MODULE 1: DASHBOARD & KPIS */}
          {/* ======================================================== */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Executive Atelier Overview</h1>
                  <p className="text-xs text-[#756B70]">Real-time telemetry, transaction metrics, and pipeline status.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#756B70]">Gateway:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-medium">
                    127.0.0.1:8000 (PHP Laravel)
                  </span>
                </div>
              </div>

              {/* KPI Cards (Spatial Liquid Glass Tiles) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="spatial-card liquid-glass-subtle bg-white/80 rounded-3xl p-5 border border-white/85 shadow-[0_12px_30px_rgba(32,27,29,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.95)] hover:border-white transition-all">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#756B70] font-sans">Total Revenue</div>
                  <div className="text-xl sm:text-2xl font-black font-serif text-[#7A3E5D] mt-1.5 font-tabular">
                    {formatTaka(orders.reduce((acc, o) => acc + (o.grand_total || o.total || 0), 0) || 128400)}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1 font-sans flex items-center gap-1">
                    <span>↑ 18.4%</span>
                    <span className="text-[#756B70] font-normal">vs last week</span>
                  </div>
                </div>

                <div className="spatial-card liquid-glass-subtle bg-white/80 rounded-3xl p-5 border border-white/85 shadow-[0_12px_30px_rgba(32,27,29,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.95)] hover:border-white transition-all">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#756B70] font-sans">Total Orders</div>
                  <div className="text-xl sm:text-2xl font-black font-serif text-[#201B1D] mt-1.5 font-tabular">
                    {orders.length || 14}
                  </div>
                  <div className="text-[10px] text-[#756B70] mt-1 font-sans">3 pending basting bench</div>
                </div>

                <div className="spatial-card liquid-glass-subtle bg-white/80 rounded-3xl p-5 border border-white/85 shadow-[0_12px_30px_rgba(32,27,29,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.95)] hover:border-white transition-all">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#756B70] font-sans">Catalog Items</div>
                  <div className="text-xl sm:text-2xl font-black font-serif text-[#201B1D] mt-1.5 font-tabular">
                    {products.length}
                  </div>
                  <div className="text-[10px] text-amber-600 font-semibold mt-1 font-sans">2 low stock alerts</div>
                </div>

                <div className="spatial-card liquid-glass-subtle bg-white/80 rounded-3xl p-5 border border-white/85 shadow-[0_12px_30px_rgba(32,27,29,0.04),inset_0_1px_1.5px_rgba(255,255,255,0.95)] hover:border-white transition-all">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#756B70] font-sans">Free Shipping Meter</div>
                  <div className="text-xl sm:text-2xl font-black font-serif text-[#7A3E5D] mt-1.5 font-tabular">
                    {formatTaka(settings.free_shipping_threshold)}
                  </div>
                  <div className="text-[10px] text-[#756B70] mt-1 font-sans">Nationwide threshold</div>
                </div>
              </div>

              {/* Recent Orders Pipeline (Liquid Glass Table Card) */}
              <div className="spatial-card liquid-glass-subtle bg-white/80 rounded-3xl p-6 border border-white/85 shadow-[0_16px_40px_rgba(32,27,29,0.05),inset_0_1px_1.5px_rgba(255,255,255,0.95)] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold font-serif text-[#201B1D]">Recent Atelier Orders</h3>
                  <button 
                    onClick={() => setActiveSection('orders')}
                    className="text-xs font-bold text-[#7A3E5D] hover:underline uppercase tracking-wider font-sans"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/50 border-b border-white/80 text-[#756B70] uppercase text-[10px] font-semibold tracking-wider">
                      <tr>
                        <th className="p-3">Order Number</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Items</th>
                        <th className="p-3">Grand Total</th>
                        <th className="p-3">Fulfillment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/60">
                      {orders.slice(0, 4).map(o => (
                        <tr key={o.order_number} className="hover:bg-white/40 transition-colors">
                          <td className="p-3 font-mono font-bold text-[#7A3E5D]">#{o.order_number}</td>
                          <td className="p-3 font-medium text-[#201B1D] font-sans">{o.client_name}</td>
                          <td className="p-3 text-[#756B70] font-sans">{o.items?.length || 1} piece(s)</td>
                          <td className="p-3 font-bold text-[#201B1D] font-tabular">{formatTaka(o.grand_total || o.total)}</td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-800 border border-amber-500/20 font-sans">
                              {o.status || o.production_stage || 'Processing'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE 2: CATALOG & PRODUCTS */}
          {/* ======================================================== */}
          {activeSection === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Haute Catalog & Inventory</h1>
                  <p className="text-xs text-[#756B70]">Manage pieces, prices, fabric provenance, and live stock allocations.</p>
                </div>
                <button
                  onClick={() => setIsNewProductModal(true)}
                  className="px-4 py-2.5 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E] transition-all flex items-center gap-1.5 shadow-sm self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Piece</span>
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-3xl p-4 border border-[#E8DFE2] shadow-xs flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[200px] relative">
                  <Search className="w-4 h-4 text-[#756B70] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by title, SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs text-[#201B1D] focus:outline-none focus:border-[#7A3E5D]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#756B70]">Category:</span>
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs text-[#201B1D] focus:outline-none focus:border-[#7A3E5D]"
                  >
                    <option value="All">All Categories</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-3xl border border-[#E8DFE2] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FBF8F5] border-b border-[#E8DFE2] text-[#756B70] uppercase text-[10px] font-semibold">
                      <tr>
                        <th className="p-4">Piece / SKU</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Badge</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFE2]">
                      {filteredProducts.map(p => (
                        <tr key={p.id} className="hover:bg-[#FBF8F5]/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={p.images?.[0] || p.image} 
                                alt={p.title} 
                                className="w-10 h-12 object-cover rounded-lg border border-[#E8DFE2] shrink-0" 
                              />
                              <div>
                                <div className="font-bold text-[#201B1D]">{p.title}</div>
                                <div className="text-[10px] font-mono text-[#756B70]">{p.sku || p.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-medium text-[#201B1D]">{p.category}</td>
                          <td className="p-4 font-bold text-[#7A3E5D]">{formatTaka(p.price)}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              (p.stock || p.sizes?.[0]?.stock || 0) <= 2 
                                ? 'bg-red-50 text-red-600 border border-red-200' 
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {p.stock || p.sizes?.[0]?.stock || 0} units
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FAF4F6] text-[#7A3E5D] border border-[#D8A7B1]">
                              {p.badge || 'Heritage'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setEditingProduct({ ...p })}
                              className="px-3 py-1 bg-[#FBF8F5] border border-[#E8DFE2] hover:border-[#7A3E5D] text-[#7A3E5D] rounded-lg text-xs font-semibold transition-colors"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE 3: CATEGORIES MANAGER */}
          {/* ======================================================== */}
          {activeSection === 'categories' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Categories & Taxonomy</h1>
                <p className="text-xs text-[#756B70]">Organize collections, silhouettes, and seasonal groupings.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-white rounded-3xl p-5 border border-[#E8DFE2] shadow-xs flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#201B1D]">{cat.name}</h3>
                      <p className="text-xs font-mono text-[#756B70]">Slug: /{cat.slug}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#FAF4F6] text-[#7A3E5D] border border-[#D8A7B1] text-xs font-bold">
                        {cat.count || 0} pieces
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE 4: ORDERS & STATE MACHINE */}
          {/* ======================================================== */}
          {activeSection === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Order State Machine & Fulfillment</h1>
                  <p className="text-xs text-[#756B70]">Transition stages from receipt through basting, finishing, and dispatch.</p>
                </div>
                
                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {['All', 'PAID_VERIFIED', 'basting_bench_02', 'final_qc_approved', 'dispatched', 'delivered'].map(st => (
                    <button
                      key={st}
                      onClick={() => setSelectedOrderFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                        selectedOrderFilter === st 
                          ? 'bg-[#7A3E5D] text-white font-bold' 
                          : 'bg-white border border-[#E8DFE2] text-[#756B70] hover:bg-[#FBF8F5]'
                      }`}
                    >
                      {st === 'All' ? 'All Orders' : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              <div className="bg-white rounded-3xl border border-[#E8DFE2] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FBF8F5] border-b border-[#E8DFE2] text-[#756B70] uppercase text-[10px] font-semibold">
                    <tr>
                      <th className="p-4">Order Details</th>
                      <th className="p-4">Patron</th>
                      <th className="p-4">Delivery Address</th>
                      <th className="p-4">Grand Total</th>
                      <th className="p-4">Current Stage</th>
                      <th className="p-4 text-right">Fulfill Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFE2]">
                    {filteredOrders.map(ord => (
                      <tr key={ord.order_number} className="hover:bg-[#FBF8F5]/50">
                        <td className="p-4 font-mono">
                          <div className="font-bold text-[#7A3E5D]">#{ord.order_number}</div>
                          <div className="text-[10px] text-[#756B70]">{ord.created_at?.split(' ')[0] || 'Today'}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-[#201B1D]">{ord.client_name}</div>
                          <div className="text-[10px] text-[#756B70]">{ord.client_email || ord.phone}</div>
                        </td>
                        <td className="p-4 text-[#756B70] max-w-[200px] truncate">
                          {ord.shipping_address || 'Gulshan 2, Dhaka'}
                        </td>
                        <td className="p-4 font-bold text-[#201B1D]">
                          {formatTaka(ord.grand_total || ord.total)}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            {ord.status || ord.production_stage || 'PAID_VERIFIED'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={ord.status || ord.production_stage || 'PAID_VERIFIED'}
                            onChange={(e) => handleUpdateOrderStatus(ord.order_number, e.target.value)}
                            className="px-2.5 py-1.5 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs font-semibold text-[#7A3E5D] focus:outline-none focus:border-[#7A3E5D]"
                          >
                            <option value="PAID_VERIFIED">Payment Verified</option>
                            <option value="basting_bench_02">Basting Bench Queue</option>
                            <option value="final_qc_approved">Final QC Approved</option>
                            <option value="dispatched">Dispatched to Courier</option>
                            <option value="delivered">Delivered to Patron</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE 5: INVENTORY & STOCK LEDGER */}
          {/* ======================================================== */}
          {activeSection === 'inventory' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Inventory Audit Ledger</h1>
                  <p className="text-xs text-[#756B70]">Immutable record of all stock adjustments, sales deductions, and atelier returns.</p>
                </div>
                <button
                  onClick={() => setIsAdjustStockModal(true)}
                  className="px-4 py-2.5 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E] transition-all flex items-center gap-1.5 shadow-sm self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Stock Adjustment</span>
                </button>
              </div>

              {/* Ledger Table */}
              <div className="bg-white rounded-3xl border border-[#E8DFE2] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FBF8F5] border-b border-[#E8DFE2] text-[#756B70] uppercase text-[10px] font-semibold">
                    <tr>
                      <th className="p-4">Tx ID</th>
                      <th className="p-4">Product ID</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Quantity Change</th>
                      <th className="p-4">Reason / Notes</th>
                      <th className="p-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFE2]">
                    {inventoryTransactions.map(tx => (
                      <tr key={tx.id} className="hover:bg-[#FBF8F5]/50">
                        <td className="p-4 font-mono font-bold text-[#7A3E5D]">{tx.id}</td>
                        <td className="p-4 font-mono text-[#201B1D]">{tx.product_id}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            tx.type === 'restock' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : tx.type === 'sale'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {tx.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold">
                          <span className={tx.quantity > 0 ? 'text-emerald-600' : 'text-red-600'}>
                            {tx.quantity > 0 ? `+${tx.quantity}` : tx.quantity}
                          </span>
                        </td>
                        <td className="p-4 text-[#756B70]">{tx.reason || tx.note || 'Atelier log'}</td>
                        <td className="p-4 text-[10px] font-mono text-[#756B70]">{tx.created_at || 'Recent'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE 6: PATRONS (CRM) */}
          {/* ======================================================== */}
          {activeSection === 'customers' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Patron Directory (CRM)</h1>
                <p className="text-xs text-[#756B70]">High-value clientele, tier privileges, and cumulative luxury acquisitions.</p>
              </div>

              <div className="bg-white rounded-3xl border border-[#E8DFE2] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FBF8F5] border-b border-[#E8DFE2] text-[#756B70] font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Patron</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Total Orders</th>
                      <th className="p-4">Total Spent</th>
                      <th className="p-4">Tier Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFE2]">
                    <tr className="hover:bg-[#FBF8F5]/50">
                      <td className="p-4 font-bold text-[#201B1D]">Ayesha Rahman</td>
                      <td className="p-4 text-[#756B70]">ayesha.rahman@gmail.com • +880 1712-345678</td>
                      <td className="p-4 font-semibold">2 Orders</td>
                      <td className="p-4 font-bold text-[#7A3E5D]">৳20,550</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4F6] text-[#7A3E5D] border border-[#D8A7B1]">
                          Gold Guild Patron
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FBF8F5]/50">
                      <td className="p-4 font-bold text-[#201B1D]">Samira Khan</td>
                      <td className="p-4 text-[#756B70]">samira.k@dhaka.luxury • +880 1819-876543</td>
                      <td className="p-4 font-semibold">1 Order</td>
                      <td className="p-4 font-bold text-[#7A3E5D]">৳8,950</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF4F6] text-[#7A3E5D] border border-[#D8A7B1]">
                          Silver Guild Patron
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE 7: MARKETING & COUPONS */}
          {/* ======================================================== */}
          {activeSection === 'marketing' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Marketing & Vouchers</h1>
                <p className="text-xs text-[#756B70]">Manage server-validated coupons, campaign percentage discounts, and order thresholds.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-[#E8DFE2] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#FAF4F6] border border-[#D8A7B1] text-[#7A3E5D] text-[10px] font-bold rounded-full uppercase">
                      Active Campaign
                    </span>
                    <span className="text-xs text-emerald-600 font-bold">{settings.coupon_discount_percent}% Discount</span>
                  </div>

                  <div className="font-mono text-3xl font-bold text-[#7A3E5D]">
                    {settings.active_coupon || 'SULTANA20'}
                  </div>

                  <div className="text-xs text-[#756B70] space-y-1">
                    <p>• Min Order Requirement: <strong>৳2,000</strong></p>
                    <p>• Validation: <strong>Server-Authoritative (Single Source of Truth)</strong></p>
                    <p>• Applies To: <strong>All Sarees, Anarkalis & Handloom Curations</strong></p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-[#E8DFE2] shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-[#201B1D]">Configure Promotional Voucher</h3>
                  
                  <div>
                    <label className="text-[11px] font-semibold text-[#756B70] block mb-1">Coupon Code</label>
                    <input
                      type="text"
                      value={settings.active_coupon}
                      onChange={(e) => setSettings({ ...settings, active_coupon: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs text-[#201B1D] font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#756B70] block mb-1">Discount Percent (%)</label>
                    <input
                      type="number"
                      value={settings.coupon_discount_percent}
                      onChange={(e) => setSettings({ ...settings, coupon_discount_percent: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs text-[#201B1D]"
                    />
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    disabled={saving}
                    className="w-full py-2.5 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E] transition-colors"
                  >
                    Update Coupon Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE 8: SHIPPING & DELIVERY RULES */}
          {/* ======================================================== */}
          {activeSection === 'shipping' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Shipping & Delivery Zones</h1>
                <p className="text-xs text-[#756B70]">Manage domestic Bangladeshi logistics tiers and free shipping meters.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-[#E8DFE2] shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-[#201B1D]">Inside Dhaka Metro</h3>
                  <div className="text-xs text-[#756B70] space-y-1">
                    <p>• Standard Rate: <strong>{formatTaka(settings.default_shipping_fee || 60)}</strong></p>
                    <p>• Estimated Timeline: <strong>24–48 Hours</strong></p>
                    <p>• Free Shipping Threshold: <strong>Orders over {formatTaka(settings.free_shipping_threshold || 2500)}</strong></p>
                    <p>• Courier Partner: Steadfast Express / Pathao</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-[#E8DFE2] shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-[#201B1D]">Outside Dhaka (All Divisions)</h3>
                  <div className="text-xs text-[#756B70] space-y-1">
                    <p>• Standard Rate: <strong>{formatTaka(settings.outside_dhaka_shipping_fee || 120)}</strong></p>
                    <p>• Estimated Timeline: <strong>2–4 Business Days</strong></p>
                    <p>• Free Shipping Threshold: <strong>Orders over {formatTaka(settings.free_shipping_threshold || 2500)}</strong></p>
                    <p>• Courier Partner: Steadfast Courier / SA Paribahan / Paperfly</p>
                  </div>
                </div>
              </div>

              {/* Edit Shipping Rates */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8DFE2] shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-[#201B1D]">Modify Logistics Parameters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-[#756B70] mb-1 font-semibold">Dhaka Shipping Fee (৳)</label>
                    <input
                      type="number"
                      value={settings.default_shipping_fee || 60}
                      onChange={(e) => setSettings({ ...settings, default_shipping_fee: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#756B70] mb-1 font-semibold">Outside Dhaka Fee (৳)</label>
                    <input
                      type="number"
                      value={settings.outside_dhaka_shipping_fee || 120}
                      onChange={(e) => setSettings({ ...settings, outside_dhaka_shipping_fee: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#756B70] mb-1 font-semibold">Free Delivery Threshold (৳)</label>
                    <input
                      type="number"
                      value={settings.free_shipping_threshold || 2500}
                      onChange={(e) => setSettings({ ...settings, free_shipping_threshold: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveSettings}
                    disabled={saving}
                    className="px-6 py-2 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E] transition-colors"
                  >
                    Save Shipping Rates
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE 9: HOMEPAGE CMS (DYNAMIC SECTION BUILDER) */}
          {/* ======================================================== */}
          {activeSection === 'cms' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Dynamic Homepage Section Builder</h1>
                  <p className="text-xs text-[#756B70]">Enable/disable sections, reorder layout, and edit promotional headlines in real-time.</p>
                </div>
                <button
                  onClick={loadBackendData}
                  className="px-3.5 py-1.5 bg-[#FAF4F6] border border-[#D8A7B1] text-[#7A3E5D] rounded-xl text-xs font-bold hover:bg-[#7A3E5D] hover:text-white transition-all flex items-center gap-1.5 self-start"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync with Backend</span>
                </button>
              </div>

              {/* Sections List */}
              <div className="space-y-3">
                {homepageSections.map((sec, idx) => (
                  <div 
                    key={sec.id} 
                    className={`bg-white rounded-2xl p-4 border transition-all ${
                      sec.is_active ? 'border-[#E8DFE2] shadow-xs' : 'border-dashed border-neutral-300 opacity-60 bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {/* Order Controls */}
                        <div className="flex flex-col gap-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => handleMoveSection(idx, 'up')}
                            className="p-1 hover:bg-[#FBF8F5] rounded text-[#756B70] disabled:opacity-20"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={idx === homepageSections.length - 1}
                            onClick={() => handleMoveSection(idx, 'down')}
                            className="p-1 hover:bg-[#FBF8F5] rounded text-[#756B70] disabled:opacity-20"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="w-8 h-8 rounded-lg bg-[#FAF4F6] border border-[#D8A7B1]/40 flex items-center justify-center text-xs font-mono font-bold text-[#7A3E5D]">
                          {sec.sort_order || idx + 1}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-[#201B1D]">
                              {sec.title || sec.type?.replace('_', ' ').toUpperCase()}
                            </h3>
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-neutral-100 text-neutral-600">
                              {sec.type}
                            </span>
                          </div>
                          <p className="text-xs text-[#756B70] truncate max-w-[400px]">
                            {sec.subtitle || 'Modular storefront component'}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setEditingSection({ ...sec })}
                          className="px-3 py-1.5 bg-[#FBF8F5] border border-[#E8DFE2] text-xs font-semibold rounded-lg hover:border-[#7A3E5D] text-[#7A3E5D] transition-colors"
                        >
                          Configure
                        </button>

                        <button
                          onClick={() => handleToggleHomepageSection(sec.id, sec.is_active)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            sec.is_active 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                              : 'bg-neutral-100 border-neutral-300 text-neutral-500'
                          }`}
                          title={sec.is_active ? 'Click to Hide Section' : 'Click to Activate'}
                        >
                          {sec.is_active ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE 10: NAVIGATION & FOOTER */}
          {/* ======================================================== */}
          {activeSection === 'navigation' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Navigation Menu & Footer CMS</h1>
                <p className="text-xs text-[#756B70]">Control header links and footer credentials dynamically from the backend.</p>
              </div>

              {/* Navigation Menu Items */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8DFE2] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#201B1D]">Header Navigation Links</h3>
                  <span className="text-xs text-[#756B70]">{navigationItems.length} active links</span>
                </div>

                <div className="space-y-2">
                  {navigationItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-[#FBF8F5] rounded-xl border border-[#E8DFE2]">
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-xs text-[#201B1D]">{item.label}</div>
                        <div className="text-[10px] font-mono text-[#756B70]">{item.url}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.highlight && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#FAF4F6] text-[#7A3E5D] border border-[#D8A7B1]">
                            Special Highlight
                          </span>
                        )}
                        <button
                          onClick={() => handleToggleNavItem(item.id, item.is_active)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${
                            item.is_active 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                              : 'bg-neutral-200 border-neutral-300 text-neutral-600'
                          }`}
                        >
                          {item.is_active ? 'Active' : 'Hidden'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Info */}
              <div className="bg-white rounded-3xl p-6 border border-[#E8DFE2] shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-[#201B1D]">Footer & Store Metadata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#756B70] mb-1 font-semibold">Store Brand Name</label>
                    <input
                      type="text"
                      value={settings.store_name}
                      onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#756B70] mb-1 font-semibold">Brand Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveSettings}
                    disabled={saving}
                    className="px-6 py-2 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E] transition-colors"
                  >
                    Save Footer Metadata
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE 11: APPEARANCE & TOKENS */}
          {/* ======================================================== */}
          {activeSection === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Brand Appearance & Design Tokens</h1>
                <p className="text-xs text-[#756B70]">Server-governed HSL / HEX design tokens, luxury typography, and maintenance controls.</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#E8DFE2] shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-[#201B1D]">Active Color Palette Tokens</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl border border-[#E8DFE2] space-y-2">
                    <div className="w-full h-12 rounded-xl bg-[#7A3E5D] border border-black/10" />
                    <div className="text-xs font-bold text-[#201B1D]">Primary Plum</div>
                    <div className="text-[10px] font-mono text-[#756B70]">#7A3E5D</div>
                  </div>

                  <div className="p-4 rounded-2xl border border-[#E8DFE2] space-y-2">
                    <div className="w-full h-12 rounded-xl bg-[#D8A7B1] border border-black/10" />
                    <div className="text-xs font-bold text-[#201B1D]">Rose Gold Accent</div>
                    <div className="text-[10px] font-mono text-[#756B70]">#D8A7B1</div>
                  </div>

                  <div className="p-4 rounded-2xl border border-[#E8DFE2] space-y-2">
                    <div className="w-full h-12 rounded-xl bg-[#FBF8F5] border border-[#E8DFE2]" />
                    <div className="text-xs font-bold text-[#201B1D]">Warm Ivory Canvas</div>
                    <div className="text-[10px] font-mono text-[#756B70]">#FBF8F5</div>
                  </div>

                  <div className="p-4 rounded-2xl border border-[#E8DFE2] space-y-2">
                    <div className="w-full h-12 rounded-xl bg-[#201B1D] border border-black/10" />
                    <div className="text-xs font-bold text-[#201B1D]">Dark Charcoal Noir</div>
                    <div className="text-[10px] font-mono text-[#756B70]">#201B1D</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8DFE2] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#201B1D]">Store Maintenance Mode</div>
                    <div className="text-[11px] text-[#756B70]">Renders luxury maintenance screen on customer storefront.</div>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, is_maintenance_mode: !settings.is_maintenance_mode })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      settings.is_maintenance_mode 
                        ? 'bg-red-600 text-white' 
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {settings.is_maintenance_mode ? 'Maintenance Active' : 'Storefront Live'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODULE 12: MEDIA LIBRARY */}
          {/* ======================================================== */}
          {activeSection === 'media' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-[#201B1D]">Media Asset Library</h1>
                  <p className="text-xs text-[#756B70]">High-resolution imagery for products, festive lookbooks, and campaign banners.</p>
                </div>
                <span className="text-xs font-mono text-[#756B70]">{mediaLibrary.length} assets registered</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mediaLibrary.map(asset => (
                  <div key={asset.id} className="bg-white rounded-2xl border border-[#E8DFE2] overflow-hidden group shadow-xs">
                    <div className="aspect-[3/4] relative overflow-hidden bg-neutral-100">
                      <img 
                        src={asset.url} 
                        alt={asset.filename} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-bold truncate text-[#201B1D]">{asset.filename}</div>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-[#756B70]">
                        <span>{asset.folder}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(asset.url);
                            showToast('Asset URL copied to clipboard.');
                          }}
                          className="text-[#7A3E5D] hover:underline flex items-center gap-0.5"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* SYSTEM SETTINGS & TELEMETRY */}
          {/* ======================================================== */}
          {activeSection === 'settings' && (
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFE2] shadow-xs space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-[#201B1D]">System Settings & Telemetry</h1>
                <p className="text-xs text-[#756B70]">Gateway connection, default currency, and operational thresholds.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-[#756B70] block mb-1">Store Name</label>
                  <input
                    type="text"
                    value={settings.store_name}
                    onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-[#201B1D]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#756B70] block mb-1">Currency Code</label>
                  <input
                    type="text"
                    value={settings.currency || 'BDT'}
                    disabled
                    className="w-full px-3 py-2 bg-neutral-100 border border-[#E8DFE2] rounded-xl text-[#756B70]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#756B70] block mb-1">Free Shipping Threshold (৳)</label>
                  <input
                    type="number"
                    value={settings.free_shipping_threshold}
                    onChange={(e) => setSettings({ ...settings, free_shipping_threshold: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-[#201B1D]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#756B70] block mb-1">Primary Currency Symbol</label>
                  <input
                    type="text"
                    value={settings.currency_symbol || '৳'}
                    disabled
                    className="w-full px-3 py-2 bg-neutral-100 border border-[#E8DFE2] rounded-xl text-[#756B70]"
                  />
                </div>
              </div>

              {/* Maintenance Tools */}
              <div className="pt-4 border-t border-[#E8DFE2] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={async () => {
                      try {
                        await apiService.clearBackendCache();
                        showToast('Backend cache flushed.');
                      } catch {
                        showToast('Cache cleared locally.');
                      }
                    }}
                    className="px-4 py-2 rounded-xl border border-[#E8DFE2] hover:bg-[#FBF8F5] text-xs font-semibold text-[#756B70]"
                  >
                    Flush Cache
                  </button>

                  <button
                    onClick={async () => {
                      if (confirm('Are you sure you want to reset demo data to pristine defaults?')) {
                        await apiService.adminResetDatabase();
                        await loadBackendData();
                        showToast('Database reset to pristine demo values.');
                      }
                    }}
                    className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold"
                  >
                    Reset Demo DB
                  </button>
                </div>

                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E] transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings</span>
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ======================================================== */}
      {/* MODAL: EDIT PRODUCT */}
      {/* ======================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E8DFE2] shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#201B1D]">Edit Haute Piece</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#756B70] mb-1 font-semibold">Title</label>
                <input
                  type="text"
                  value={editingProduct.title || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">Price (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">Original / Compare Price (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.original_price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, original_price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">Badge</label>
                  <input
                    type="text"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">Stock (Units)</label>
                  <input
                    type="number"
                    value={editingProduct.stock || editingProduct.sizes?.[0]?.stock || 0}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEditingProduct({
                        ...editingProduct,
                        stock: val,
                        sizes: [{ label: 'Standard', stock: val }]
                      });
                    }}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-[#E8DFE2]">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 border border-[#E8DFE2] rounded-xl text-xs font-semibold text-[#756B70] hover:bg-[#FBF8F5]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveProduct(editingProduct)}
                disabled={saving}
                className="px-5 py-2 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E]"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CREATE NEW PRODUCT */}
      {/* ======================================================== */}
      {isNewProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E8DFE2] shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#201B1D]">Create New Atelier Piece</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#756B70] mb-1 font-semibold">Piece Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Sonargaon Zari Muslin Saree"
                  value={newProductForm.title}
                  onChange={(e) => setNewProductForm({ ...newProductForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">SKU</label>
                  <input
                    type="text"
                    value={newProductForm.sku}
                    onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs font-bold text-[#7A3E5D]"
                  />
                </div>
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">Original (৳)</label>
                  <input
                    type="number"
                    value={newProductForm.original_price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, original_price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">Initial Stock</label>
                  <input
                    type="number"
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#756B70] mb-1 font-semibold">Badge</label>
                <input
                  type="text"
                  value={newProductForm.badge}
                  onChange={(e) => setNewProductForm({ ...newProductForm, badge: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#E8DFE2]">
                <button
                  type="button"
                  onClick={() => setIsNewProductModal(false)}
                  className="px-4 py-2 border border-[#E8DFE2] rounded-xl text-xs font-semibold text-[#756B70] hover:bg-[#FBF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E]"
                >
                  Create Piece
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CONFIGURE HOMEPAGE SECTION */}
      {/* ======================================================== */}
      {editingSection && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-[#E8DFE2] shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#201B1D]">
              Configure Section: {editingSection.title || editingSection.id}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#756B70] mb-1 font-semibold">Headline / Title</label>
                <input
                  type="text"
                  value={editingSection.title || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-[#756B70] mb-1 font-semibold">Subtitle / Body Copy</label>
                <textarea
                  rows={3}
                  value={editingSection.subtitle || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                />
              </div>

              {editingSection.button_text !== undefined && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#756B70] mb-1 font-semibold">CTA Button Text</label>
                    <input
                      type="text"
                      value={editingSection.button_text || ''}
                      onChange={(e) => setEditingSection({ ...editingSection, button_text: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#756B70] mb-1 font-semibold">Button URL</label>
                    <input
                      type="text"
                      value={editingSection.button_url || ''}
                      onChange={(e) => setEditingSection({ ...editingSection, button_url: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {editingSection.image !== undefined && (
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">Hero Banner Image URL</label>
                  <input
                    type="text"
                    value={editingSection.image || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, image: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs font-mono"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[#E8DFE2]">
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 border border-[#E8DFE2] rounded-xl text-xs font-semibold text-[#756B70] hover:bg-[#FBF8F5]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSectionDetails}
                disabled={saving}
                className="px-5 py-2 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E]"
              >
                Update Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: STOCK ADJUSTMENT */}
      {/* ======================================================== */}
      {isAdjustStockModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E8DFE2] shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#201B1D]">Post Stock Adjustment</h3>
            <form onSubmit={handleStockAdjustment} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#756B70] mb-1 font-semibold">Select Piece</label>
                <select
                  required
                  value={stockAdjustForm.productId}
                  onChange={(e) => setStockAdjustForm({ ...stockAdjustForm, productId: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                >
                  <option value="">-- Choose Product --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.title} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">Adjustment Type</label>
                  <select
                    value={stockAdjustForm.type}
                    onChange={(e) => setStockAdjustForm({ ...stockAdjustForm, type: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                  >
                    <option value="restock">Restock (+)</option>
                    <option value="reduction">Reduction (-)</option>
                    <option value="correction">Audit Correction</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#756B70] mb-1 font-semibold">Quantity Delta</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={stockAdjustForm.quantity}
                    onChange={(e) => setStockAdjustForm({ ...stockAdjustForm, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#756B70] mb-1 font-semibold">Reason / Audit Note</label>
                <input
                  type="text"
                  value={stockAdjustForm.note}
                  onChange={(e) => setStockAdjustForm({ ...stockAdjustForm, note: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FBF8F5] border border-[#E8DFE2] rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#E8DFE2]">
                <button
                  type="button"
                  onClick={() => setIsAdjustStockModal(false)}
                  className="px-4 py-2 border border-[#E8DFE2] rounded-xl text-xs font-semibold text-[#756B70] hover:bg-[#FBF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#7A3E5D] text-white rounded-xl text-xs font-bold hover:bg-[#68334E]"
                >
                  Record Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
