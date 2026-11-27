/**
 * AURA Atelier & Sultana's Dream — Frontend Unified API Client
 * Connects the React application directly to the PHP / Laravel Backend API Gateway.
 * Automatically fails over to resilient local cache if server is temporarily unreachable.
 */

import { ALL_PRODUCTS, fetchProductsWithCursor as mockFetchWithCursor } from '../data/mockProducts';

const API_BASE = 'http://127.0.0.1:8000/api/v1';

// Helper for fetch with timeout
async function apiRequest(endpoint, options = {}, timeoutMs = 4000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const adminToken = localStorage.getItem('sd_admin_token');
  const authHeaders = adminToken ? { 'Authorization': `Bearer ${adminToken}` } : {};

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...authHeaders,
        ...(options.headers || {})
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.error || errBody.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export const apiService = {
  // 1. Health & Server Telemetry
  async checkHealth() {
    const start = performance.now();
    try {
      const data = await apiRequest('/health', { method: 'GET' }, 2500);
      const latencyMs = Math.round(performance.now() - start);
      return {
        online: true,
        server: data.server || '127.0.0.1:8000',
        engine: data.engine || 'PHP/Laravel API Gateway',
        database: data.database || 'store.json',
        latencyMs,
        timestamp: data.timestamp
      };
    } catch (err) {
      return {
        online: false,
        error: err.message,
        server: 'Offline (Local Fallback Engine Active)',
        engine: 'Simulated Client Engine',
        latencyMs: 0
      };
    }
  },

  // 2. Public Catalog
  async fetchProducts({ cursor = null, perPage = 4, category = 'All Pieces', search = '', sortBy = 'featured' } = {}) {
    try {
      const params = new URLSearchParams();
      if (cursor) params.append('cursor', cursor);
      if (perPage) params.append('per_page', perPage);
      if (category) params.append('category', category);
      if (search) params.append('search', search);
      if (sortBy) params.append('sort_by', sortBy);

      const res = await apiRequest(`/products?${params.toString()}`, { method: 'GET' });
      return {
        ...res,
        isLiveBackend: true
      };
    } catch (err) {
      console.warn('Backend unavailable, using local mock fallback:', err.message);
      const fallback = await mockFetchWithCursor({ cursor, perPage, category, search, sortBy });
      return {
        ...fallback,
        isLiveBackend: false
      };
    }
  },

  // 3. Single Product PDP
  async getProduct(idOrSlug) {
    try {
      const data = await apiRequest(`/products/${idOrSlug}`, { method: 'GET' });
      return { data, isLiveBackend: true };
    } catch (err) {
      const found = ALL_PRODUCTS.find(p => p.id === idOrSlug || p.slug === idOrSlug) || ALL_PRODUCTS[0];
      return { data: found, isLiveBackend: false };
    }
  },

  // 4. Categories
  async getCategories() {
    try {
      const res = await apiRequest('/categories', { method: 'GET' });
      return res.categories || [];
    } catch (err) {
      return [
        { id: 1, name: 'All Pieces' },
        { id: 2, name: 'Tailoring' },
        { id: 3, name: 'Dresses' },
        { id: 4, name: 'Outerwear' },
        { id: 5, name: 'Leather Goods' },
        { id: 6, name: 'Tops' },
        { id: 7, name: 'Knitwear' },
        { id: 8, name: 'Jewelry' }
      ];
    }
  },

  // 5. Cart Management
  async getCart() {
    try {
      return await apiRequest('/cart', { method: 'GET' });
    } catch (err) {
      return { items: [], coupon: null, subtotal: 0, tax: 0, shipping: 0, total: 0 };
    }
  },

  async addToCart({ productId, size, color, quantity = 1 }) {
    try {
      return await apiRequest('/cart/items', {
        method: 'POST',
        body: JSON.stringify({ product_id: productId, size, color, quantity })
      });
    } catch (err) {
      return { status: 'mock_success', message: 'Added to client bag cache.' };
    }
  },

  async verifyCoupon(code) {
    try {
      return await apiRequest('/cart/coupon', {
        method: 'POST',
        body: JSON.stringify({ code })
      });
    } catch (err) {
      if (code.toUpperCase() === 'NOIR20') {
        return {
          status: 'success',
          valid: true,
          code: 'NOIR20',
          discount_percent: 20,
          discount_amount: 60.80,
          message: 'VIP Cipher Verified: 20% Privilege Applied (Local Offline).'
        };
      }
      throw new Error('Invalid atelier cipher code.');
    }
  },

  // 6. Checkout
  async processCheckout(payload) {
    try {
      return await apiRequest('/checkout', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch (err) {
      const randomOrder = 'AUR-' + Math.floor(80000 + Math.random() * 19000);
      return {
        status: 'mock_success',
        order: {
          order_number: randomOrder,
          tracking_number: 'AUR-TRK-77189',
          production_stage: 'basting_bench_02',
          grand_total: payload.grand_total || 661.96,
          client_name: payload.client_name || 'Elena Vasiliev',
          created_at: new Date().toISOString()
        }
      };
    }
  },

  // 7. Orders & Telemetry
  async getOrders() {
    try {
      const res = await apiRequest('/orders', { method: 'GET' });
      return res.orders || [];
    } catch (err) {
      return [];
    }
  },

  async getOrder(orderNumber) {
    try {
      const res = await apiRequest(`/orders/${orderNumber}`, { method: 'GET' });
      return res.order;
    } catch (err) {
      return null;
    }
  },

  async trackShipment(trackingNumber) {
    try {
      return await apiRequest(`/orders/track/${trackingNumber}`, { method: 'GET' });
    } catch (err) {
      return {
        tracking_number: trackingNumber,
        current_stage: 'Final QC & Dispatch Loading Bay',
        estimated_arrival: 'Today at 16:45 EST',
        carrier: 'AURA White-Glove Fleet Unit #07'
      };
    }
  },

  // ==========================================
  // 8. BACKEND ADMIN & TOTAL CONTROL METHODS
  // ==========================================
  async adminGetDashboard() {
    return await apiRequest('/admin/dashboard', { method: 'GET' });
  },

  async adminGetProducts() {
    const res = await apiRequest('/admin/products', { method: 'GET' });
    return res.products || [];
  },

  async adminCreateProduct(productData) {
    return await apiRequest('/admin/products', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  },

  async adminUpdateProduct(id, updates) {
    return await apiRequest(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  async adminUpdateStock(id, size, stock) {
    return await apiRequest(`/admin/products/${id}/stock`, {
      method: 'PATCH',
      body: JSON.stringify({ size, stock })
    });
  },

  async adminUpdateOrderStatus(orderNumber, productionStage) {
    return await apiRequest(`/admin/orders/${orderNumber}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ production_stage: productionStage })
    });
  },

  async adminGetSettings() {
    const res = await apiRequest('/admin/settings', { method: 'GET' });
    return res.settings || {};
  },

  async adminUpdateSettings(settings) {
    return await apiRequest('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  },

  async adminResetDatabase() {
    return await apiRequest('/admin/reset', { method: 'POST' });
  },

  // 9. Developer Architecture Route Control & Telemetry (Backend Driven)
  async getArchitectureRoutes() {
    return await apiRequest('/admin/architecture/routes', { method: 'GET' });
  },

  async updateArchitectureRouteStatus(routeId, status) {
    return await apiRequest(`/admin/architecture/routes/${routeId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  async getArchitectureTelemetry() {
    return await apiRequest('/admin/architecture/telemetry', { method: 'GET' });
  },

  async clearBackendCache() {
    return await apiRequest('/admin/architecture/cache-clear', { method: 'POST' });
  },

  // 10. Dynamic Homepage CMS (Backend Authoritative)
  async getHomepage() {
    try {
      const res = await apiRequest('/homepage', { method: 'GET' });
      return res;
    } catch (err) {
      console.warn('Failed to load dynamic homepage from backend:', err.message);
      return { sections: [], all_sections: [] };
    }
  },

  async updateHomepageSection(sectionId, sectionData) {
    return await apiRequest(`/admin/homepage/sections/${sectionId}`, {
      method: 'PUT',
      body: JSON.stringify(sectionData)
    });
  },

  // 11. Dynamic Navigation & Footer (Backend Authoritative)
  async getNavigation() {
    try {
      const res = await apiRequest('/navigation', { method: 'GET' });
      return res;
    } catch (err) {
      console.warn('Failed to load navigation from backend:', err.message);
      return { items: [] };
    }
  },

  async updateNavigation(items) {
    return await apiRequest('/admin/navigation', {
      method: 'PUT',
      body: JSON.stringify({ items })
    });
  },

  // 12. Settings & Brand Appearance Tokens
  async getSettings() {
    try {
      const res = await apiRequest('/settings', { method: 'GET' });
      return res.settings || {};
    } catch (err) {
      console.warn('Failed to load settings from backend:', err.message);
      return {};
    }
  },

  // 13. Admin Authentication & Session
  async adminLogin(email, password) {
    const res = await apiRequest('/auth/admin-login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (res.token) {
      localStorage.setItem('sd_admin_token', res.token);
      localStorage.setItem('sd_admin_user', JSON.stringify(res.user));
    }
    return res;
  },

  adminLogout() {
    localStorage.removeItem('sd_admin_token');
    localStorage.removeItem('sd_admin_user');
  },

  getAdminUser() {
    try {
      const user = localStorage.getItem('sd_admin_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  isAdminAuthenticated() {
    return !!localStorage.getItem('sd_admin_token');
  },

  // 14. Server-Authoritative Cart & Checkout Calculation
  async calculateCart({ items = [], coupon_code = '', division = 'Dhaka' }) {
    try {
      return await apiRequest('/cart/calculate', {
        method: 'POST',
        body: JSON.stringify({ items, coupon_code, division })
      });
    } catch (err) {
      console.warn('Server cart calculation fallback:', err.message);
      // Fallback calculation in case of connection hiccup
      const subtotal = items.reduce((acc, it) => acc + ((it.price || 0) * (it.quantity || 1)), 0);
      const isDhaka = !division || division.toLowerCase() === 'dhaka';
      const shippingFee = subtotal >= 2500 ? 0 : (isDhaka ? 60 : 120);
      let discountAmount = 0;
      let couponApplied = false;
      if (coupon_code && coupon_code.toUpperCase() === 'SULTANA20' && subtotal >= 2000) {
        discountAmount = Math.round(subtotal * 0.20);
        couponApplied = true;
      }
      return {
        status: 'fallback',
        subtotal,
        discount_amount: discountAmount,
        shipping_fee: shippingFee,
        total: Math.max(0, subtotal - discountAmount + shippingFee),
        currency: 'BDT',
        currency_symbol: '৳',
        free_shipping_threshold: 2500,
        amount_to_free_shipping: Math.max(0, 2500 - subtotal),
        coupon_applied: couponApplied,
        coupon_code: couponApplied ? 'SULTANA20' : null,
        items
      };
    }
  },

  // 15. Inventory Ledger & Adjustments
  async getInventoryTransactions() {
    const res = await apiRequest('/admin/inventory/transactions', { method: 'GET' });
    return res.transactions || [];
  },

  async adjustInventory(productId, quantity, type = 'adjustment', note = 'Manual stock adjustment') {
    return await apiRequest('/admin/inventory/adjust', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity, type, note })
    });
  },

  // 16. Analytics & Media
  async getAnalyticsData() {
    return await apiRequest('/admin/analytics', { method: 'GET' });
  },

  async getMedia() {
    const res = await apiRequest('/admin/media', { method: 'GET' });
    return res.media || [];
  }
};
