import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import MobileMenuDrawer from './components/MobileMenuDrawer';
import HeroBanner from './components/HeroBanner';
import CategoryBar from './components/CategoryBar';
import ProductFeed from './components/ProductFeed';
import FilterBottomSheet from './components/FilterBottomSheet';
import CartDrawer from './components/CartDrawer';
import EditorialStorefront from './components/EditorialStorefront';
const LockScreenLiveActivityView = lazy(() => import('./views/LockScreenLiveActivityView'));
const ShoppingBagView = lazy(() => import('./views/ShoppingBagView'));
const InHomeFittingsOpsView = lazy(() => import('./views/InHomeFittingsOpsView'));
const FitConfirmationView = lazy(() => import('./views/FitConfirmationView'));
const CourierRouteView = lazy(() => import('./views/CourierRouteView'));
const HandoffConfirmedView = lazy(() => import('./views/HandoffConfirmedView'));
const DispatchCommandView = lazy(() => import('./views/DispatchCommandView'));
const VipClientCrmView = lazy(() => import('./views/VipClientCrmView'));
const VaultMintingView = lazy(() => import('./views/VaultMintingView'));
const CncWorkstationView = lazy(() => import('./views/CncWorkstationView'));
const HandBastingWorkstationView = lazy(() => import('./views/HandBastingWorkstationView'));
const VacuumPressWorkstationView = lazy(() => import('./views/VacuumPressWorkstationView'));
const HermeticBaggingWorkstationView = lazy(() => import('./views/HermeticBaggingWorkstationView'));
const FinalQcWorkstationView = lazy(() => import('./views/FinalQcWorkstationView'));
const DoorstepNfcVerificationView = lazy(() => import('./views/DoorstepNfcVerificationView'));
const DigitalWardrobeVaultView = lazy(() => import('./views/DigitalWardrobeVaultView'));
const ClientAuthenticationView = lazy(() => import('./views/ClientAuthenticationView'));
const CustomerAccountPortalView = lazy(() => import('./views/CustomerAccountPortalView'));
const ReadyToWearCatalogView = lazy(() => import('./views/ReadyToWearCatalogView'));
const ReturnsExchangesView = lazy(() => import('./views/ReturnsExchangesView'));
const ProductDetailPageView = lazy(() => import('./views/ProductDetailPageView'));
const MobileDropOffPassView = lazy(() => import('./views/MobileDropOffPassView'));
const LiveTransitTrackingView = lazy(() => import('./views/LiveTransitTrackingView'));
const OrdersFulfillmentQueueView = lazy(() => import('./views/OrdersFulfillmentQueueView'));
const SecureCheckoutView = lazy(() => import('./views/SecureCheckoutView'));
const OrderConfirmationView = lazy(() => import('./views/OrderConfirmationView'));
const BackendControlCenterView = lazy(() => import('./views/BackendControlCenterView'));
const AdminPortalView = lazy(() => import('./views/AdminPortalView'));
const AdminLoginView = lazy(() => import('./views/AdminLoginView'));
import MobileBottomNav from './components/MobileBottomNav';
import { apiService } from './services/apiService';
import { fetchProductsWithCursor } from './data/mockProducts';
import { Check } from 'lucide-react';

const HASH_TO_VIEW_MAP = {
  '#shop/storefront': 'storefront',
  '#shop': 'storefront',
  '#shop/catalog': 'catalog',
  '#shop/pdp': 'pdp',
  '#shop/bag': 'bag',
  '#shop/checkout': 'checkout',
  '#shop/confirmation': 'confirmation',
  '#shop/account': 'account',
  '#shop/auth': 'auth',
  '#shop/tracking': 'tracking',
  '#shop/returns': 'returns',
  '#shop/wardrobe': 'digital_wardrobe',
  
  '#admin/login': 'admin_login',
  '#admin': 'admin_portal',
  '#admin/dashboard': 'admin_portal',
  '#admin/catalog': 'admin_portal',
  '#admin/orders': 'admin_portal',
  '#admin/inventory': 'admin_portal',
  '#admin/customers': 'admin_portal',
  '#admin/marketing': 'admin_portal',
  '#admin/shipping': 'admin_portal',
  '#admin/cms': 'admin_portal',
  '#admin/settings': 'admin_portal',
  '#admin/portal': 'admin_portal',

  '#admin/backend-control': 'backend_control',
  '#admin/control': 'backend_control',
  '#admin/routes': 'backend_control',
  '#admin/architecture': 'backend_control',
  '#admin/qc': 'final_qc',
  '#admin/final_qc': 'final_qc',
  '#admin/basting': 'basting',
  '#admin/pressing': 'pressing',
  '#admin/bagging': 'bagging',
  '#admin/cnc': 'cnc',
  '#admin/fittings': 'fittings',
  '#admin/doorstep-nfc': 'doorstep_nfc',
  '#admin/doorstep_nfc': 'doorstep_nfc',
  '#admin/fit-review': 'fit_confirmation',
  '#admin/fit_confirmation': 'fit_confirmation',
  '#admin/queue': 'queue',
  '#admin/dispatch': 'dispatch',
  '#admin/courier': 'courier',
  '#admin/handoff': 'handoff',
  '#admin/vip': 'vip',
  '#admin/vault': 'vault',
  '#admin/pass': 'pass',
  '#admin/lockscreen': 'lockscreen'
};

const VIEW_TO_HASH_MAP = {
  storefront: '#shop/storefront',
  catalog: '#shop/catalog',
  pdp: '#shop/pdp',
  bag: '#shop/bag',
  checkout: '#shop/checkout',
  confirmation: '#shop/confirmation',
  account: '#shop/account',
  auth: '#shop/auth',
  tracking: '#shop/tracking',
  returns: '#shop/returns',
  digital_wardrobe: '#shop/wardrobe',
  
  admin_login: '#admin/login',
  admin_portal: '#admin/dashboard',
  backend_control: '#admin/backend-control',
  final_qc: '#admin/qc',
  basting: '#admin/basting',
  pressing: '#admin/pressing',
  bagging: '#admin/bagging',
  cnc: '#admin/cnc',
  fittings: '#admin/fittings',
  doorstep_nfc: '#admin/doorstep-nfc',
  fit_confirmation: '#admin/fit-review',
  queue: '#admin/queue',
  dispatch: '#admin/dispatch',
  courier: '#admin/courier',
  handoff: '#admin/handoff',
  vip: '#admin/vip',
  vault: '#admin/vault',
  pass: '#admin/pass',
  lockscreen: '#admin/lockscreen'
};

const ADMIN_PROTECTED_VIEWS = new Set([
  'admin_portal',
  'backend_control',
  'final_qc',
  'basting',
  'pressing',
  'bagging',
  'cnc',
  'fittings',
  'doorstep_nfc',
  'fit_confirmation',
  'queue',
  'dispatch',
  'courier',
  'handoff',
  'vip',
  'vault',
  'pass',
  'lockscreen'
]);

export default function App() {
  // Current Active Ecosystem View synced with URL hash
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return HASH_TO_VIEW_MAP[window.location.hash] || 'storefront';
    }
    return 'storefront';
  });

  // Active Confirmed Order State
  const [confirmedOrder, setConfirmedOrder] = useState({
    orderId: 'SD-10254',
    client: 'Ayesha Rahman',
    email: 'ayesha.rahman@gmail.com',
    phone: '+880 1712-345678',
    division: 'Dhaka',
    address: 'House 42, Road 11, Block D, Banani, Dhaka-1213',
    items: [
      {
        id: 'prod_01',
        title: 'Nocturne Jamdani Pure Mulberry Silk Saree',
        size: 'Unstitched (6.5 Yards)',
        price: 14500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop'
      }
    ],
    subtotal: 14500,
    shippingFee: 0,
    discountAmount: 2900,
    couponCode: 'SULTANA20',
    total: 11600,
    paymentMethod: 'bKash Online Gateway (TrxID: BK9X274LAQ)',
    orderStatus: 'Confirmed',
    createdAt: '2026-09-08T20:15:00Z',
    estimatedDelivery: 'Sep 10 – Sep 12, 2026 (2–4 Business Days)'
  });

  // Navigation & Drawer States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Pieces');
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [sortBy, setSortBy] = useState('featured');

  // Products & Cursor Pagination States
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // User Cart & Wishlist
  const [cartItems, setCartItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Unified Navigation Router Helper
  const navigateTo = useCallback((viewId) => {
    setCurrentView(viewId);
    const targetHash = VIEW_TO_HASH_MAP[viewId] || '#shop/storefront';
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  }, []);

  // Sync with browser URL hash navigation (back/forward, direct link)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && HASH_TO_VIEW_MAP[hash]) {
        setCurrentView(HASH_TO_VIEW_MAP[hash]);
      } else if (!hash) {
        window.location.hash = '#shop/storefront';
      }
    };

    if (!window.location.hash) {
      window.location.hash = '#shop/storefront';
    } else {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch initial batch (Cursor = null)
  const loadInitialProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiService.fetchProducts({
        cursor: null,
        perPage: 4,
        category: selectedCategory,
        search: searchQuery,
        sortBy
      });
      setProducts(response.data || []);
      setNextCursor(response.next_cursor);
      setHasMore(response.has_more);
    } catch (err) {
      console.error('Failed to load products from API:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery, sortBy]);

  useEffect(() => {
    loadInitialProducts();
  }, [loadInitialProducts]);

  // Load next batch via cursorPaginate
  const handleLoadMore = async () => {
    if (!nextCursor || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const response = await apiService.fetchProducts({
        cursor: nextCursor,
        perPage: 4,
        category: selectedCategory,
        search: searchQuery,
        sortBy
      });
      setProducts((prev) => [...prev, ...(response.data || [])]);
      setNextCursor(response.next_cursor);
      setHasMore(response.has_more);
    } catch (err) {
      console.error('Failed to load next cursor page from API:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Cart Management
  const handleAddToCart = (product, color) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.color === color);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, color, quantity: 1 }];
    });

    setToastMessage(`Added "${product.title}" to Wardrobe`);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const handleUpdateQuantity = (id, color, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id, color);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (id, color) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.color === color)));
  };

  const handleToggleWishlist = (id) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All Pieces');
    setSelectedSize('All Sizes');
    setSortBy('featured');
    setSearchQuery('');
  };

  // Centralized View Renderer with Protected Route Guard
  const renderCurrentView = () => {
    // 1. Admin Route Protection: Check if user is attempting to access any admin/workshop route without authorization
    if (ADMIN_PROTECTED_VIEWS.has(currentView) && !apiService.isAdminAuthenticated()) {
      return (
        <div className="min-h-screen bg-[#141216]">
          <AdminLoginView
            onLoginSuccess={() => navigateTo(currentView || 'admin_portal')}
            onReturnToStore={() => navigateTo('storefront')}
          />
        </div>
      );
    }

    if (currentView === 'admin_login') {
      return (
        <div className="min-h-screen bg-[#141216]">
          <AdminLoginView
            onLoginSuccess={() => navigateTo('admin_portal')}
            onReturnToStore={() => navigateTo('storefront')}
          />
        </div>
      );
    }

    if (currentView === 'admin_portal') {
      return (
        <div className="min-h-screen bg-[#FAF8F5]">
          <AdminPortalView
            onBackToStore={() => navigateTo('storefront')}
            onGoToStorefront={() => navigateTo('storefront')}
            onLogout={() => {
              apiService.adminLogout();
              navigateTo('admin_login');
            }}
          />
        </div>
      );
    }

    if (currentView === 'backend_control') {
      return (
        <div className="min-h-screen bg-[#07090E]">
          <BackendControlCenterView
            onBackToStore={() => navigateTo('storefront')}
            onGoToOrders={() => navigateTo('queue')}
            onGoToCatalog={() => navigateTo('catalog')}
            onNavigate={(v) => navigateTo(v)}
          />
        </div>
      );
    }

    if (currentView === 'bag') {
      return (
        <div className="min-h-screen bg-[#faf8ff] w-full">
          <ShoppingBagView
            onBackToStore={() => navigateTo('storefront')}
            onGoToCheckout={() => navigateTo('checkout')}
            onNavigate={(v) => navigateTo(v)}
          />
        </div>
      );
    }

    if (currentView === 'pdp') {
      return (
        <div className="min-h-screen bg-[#faf8ff] w-full">
          <ProductDetailPageView 
            onBack={() => navigateTo('catalog')} 
            onAddToCart={handleAddToCart}
            onGoToBag={() => navigateTo('bag')}
            onBookTryOn={() => navigateTo('fittings')}
            onNavigate={(v) => navigateTo(v)}
          />
        </div>
      );
    }

    if (currentView === 'checkout') {
      return (
        <div className="min-h-screen bg-[#faf8ff] w-full">
          <SecureCheckoutView
            onBackToCart={() => { navigateTo('storefront'); setIsCartOpen(true); }}
            onBackToStore={() => navigateTo('storefront')}
            onCompleteCheckout={(order) => {
              if (order) setConfirmedOrder(order);
              navigateTo('confirmation');
            }}
          />
        </div>
      );
    }

    if (currentView === 'confirmation') {
      return (
        <div className="min-h-screen bg-[#FBF8F5] w-full">
          <OrderConfirmationView
            orderData={confirmedOrder}
            onBackToStore={() => navigateTo('storefront')}
            onGoToTracking={() => navigateTo('tracking')}
            onGoToReturns={() => navigateTo('returns')}
            onExploreCatalog={() => navigateTo('catalog')}
          />
          <MobileBottomNav
            currentView={currentView}
            onNavigate={navigateTo}
            cartCount={cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}
            wishlistCount={wishlistIds.length || 2}
          />
        </div>
      );
    }

    if (currentView === 'catalog') {
      return (
        <div className="min-h-screen bg-[#FBF8F5] w-full">
          <ReadyToWearCatalogView 
            onBackToStore={() => navigateTo('storefront')} 
            onSelectProduct={() => navigateTo('pdp')}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
          <MobileBottomNav
            currentView={currentView}
            onNavigate={navigateTo}
            cartCount={cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}
            wishlistCount={wishlistIds.length || 2}
          />
        </div>
      );
    }

    if (currentView === 'returns') {
      return (
        <div className="min-h-screen bg-[#faf8ff] w-full">
          <ReturnsExchangesView
            onBackToStore={() => navigateTo('storefront')}
            onConfirmReservation={() => navigateTo('pass')}
          />
        </div>
      );
    }

    if (currentView === 'pass') {
      return (
        <div className="min-h-screen bg-[#faf8ff] w-full">
          <MobileDropOffPassView
            onBackToStore={() => navigateTo('storefront')}
            onGoToTracking={() => navigateTo('tracking')}
          />
        </div>
      );
    }

    if (currentView === 'tracking') {
      return (
        <div className="min-h-screen bg-[#faf8ff] w-full">
          <LiveTransitTrackingView
            onBackToPass={() => navigateTo('pass')}
            onSelectCourierApp={() => navigateTo('courier')}
            onOpenLockScreen={() => navigateTo('lockscreen')}
          />
        </div>
      );
    }

    if (currentView === 'lockscreen') {
      return (
        <div className="min-h-screen bg-[#0b0e14]">
          <LockScreenLiveActivityView
            onBackToTracking={() => navigateTo('tracking')}
            onGoToPass={() => navigateTo('pass')}
            onGoToStorefront={() => navigateTo('storefront')}
          />
        </div>
      );
    }

    if (currentView === 'fittings') {
      return (
        <div className="min-h-screen bg-[#faf8ff]">
          <InHomeFittingsOpsView
            onBackToStore={() => navigateTo('storefront')}
            onGoToDispatch={() => navigateTo('dispatch')}
            onGoToFulfillment={() => navigateTo('queue')}
            onGoToVault={() => navigateTo('vault')}
            onGoToVip={() => navigateTo('vip')}
            onGoToFitConfirmation={() => navigateTo('fit_confirmation')}
          />
        </div>
      );
    }

    if (currentView === 'fit_confirmation') {
      return (
        <div className="min-h-screen bg-[#faf8ff] w-full">
          <FitConfirmationView
            onBackToStore={() => navigateTo('storefront')}
            onGoToHandoff={() => navigateTo('handoff')}
            onGoToVault={() => navigateTo('vault')}
          />
        </div>
      );
    }

    if (currentView === 'courier') {
      return (
        <div className="min-h-screen bg-neutral-950 w-full">
          <CourierRouteView
            onConfirmHandoff={() => navigateTo('handoff')}
            onBackToStore={() => navigateTo('storefront')}
          />
        </div>
      );
    }

    if (currentView === 'handoff') {
      return (
        <div className="min-h-screen bg-neutral-950 w-full">
          <HandoffConfirmedView
            onBackToStore={() => navigateTo('storefront')}
            onBackToRoute={() => navigateTo('courier')}
          />
        </div>
      );
    }

    if (currentView === 'queue') {
      return (
        <div className="min-h-screen bg-[#faf8ff]">
          <OrdersFulfillmentQueueView
            onBackToStore={() => navigateTo('storefront')}
            onGoToDispatch={() => navigateTo('dispatch')}
            onGoToVault={() => navigateTo('vault')}
            onGoToVip={() => navigateTo('vip')}
            onGoToTracking={() => navigateTo('tracking')}
            onGoToCourier={() => navigateTo('courier')}
          />
        </div>
      );
    }

    if (currentView === 'dispatch') {
      return (
        <div className="min-h-screen bg-neutral-950">
          <DispatchCommandView
            onBackToStore={() => navigateTo('storefront')}
            onSelectCourierApp={() => navigateTo('courier')}
          />
        </div>
      );
    }

    if (currentView === 'cnc') {
      return (
        <div className="min-h-screen bg-[#faf8ff]">
          <CncWorkstationView
            onBackToStore={() => navigateTo('storefront')}
            onGoToDispatch={() => navigateTo('dispatch')}
            onGoToVault={() => navigateTo('vault')}
          />
        </div>
      );
    }

    if (currentView === 'basting') {
      return (
        <div className="min-h-screen bg-[#faf8ff]">
          <HandBastingWorkstationView
            onBackToStore={() => navigateTo('storefront')}
            onGoToPressing={() => navigateTo('pressing')}
            onGoToCnc={() => navigateTo('cnc')}
            onGoToDispatch={() => navigateTo('dispatch')}
            onGoToFulfillment={() => navigateTo('queue')}
            onGoToVault={() => navigateTo('vault')}
            onGoToVip={() => navigateTo('vip')}
          />
        </div>
      );
    }

    if (currentView === 'pressing') {
      return (
        <div className="min-h-screen bg-[#faf8ff]">
          <VacuumPressWorkstationView
            onBackToStore={() => navigateTo('storefront')}
            onGoToBasting={() => navigateTo('basting')}
            onGoToBagging={() => navigateTo('bagging')}
            onGoToDispatch={() => navigateTo('dispatch')}
            onGoToFulfillment={() => navigateTo('queue')}
            onGoToVault={() => navigateTo('vault')}
            onGoToVip={() => navigateTo('vip')}
          />
        </div>
      );
    }

    if (currentView === 'bagging') {
      return (
        <div className="min-h-screen bg-[#faf8ff]">
          <HermeticBaggingWorkstationView
            onBackToStore={() => navigateTo('storefront')}
            onGoToPressing={() => navigateTo('pressing')}
            onGoToDispatch={() => navigateTo('dispatch')}
            onGoToCourier={() => navigateTo('courier')}
            onGoToFulfillment={() => navigateTo('queue')}
            onGoToVault={() => navigateTo('vault')}
            onGoToVip={() => navigateTo('vip')}
          />
        </div>
      );
    }

    if (currentView === 'vip') {
      return (
        <div className="min-h-screen bg-[#faf8ff]">
          <VipClientCrmView
            onBackToStore={() => navigateTo('storefront')}
            onGoToVault={() => navigateTo('vault')}
            onGoToDispatch={() => navigateTo('dispatch')}
          />
        </div>
      );
    }

    if (currentView === 'vault') {
      return (
        <div className="min-h-screen bg-[#faf8ff]">
          <VaultMintingView
            onBackToStore={() => navigateTo('storefront')}
            onGoToVip={() => navigateTo('vip')}
            onGoToDispatch={() => navigateTo('dispatch')}
          />
        </div>
      );
    }

    if (currentView === 'final_qc') {
      return (
        <div className="min-h-screen bg-[#faf8ff]">
          <FinalQcWorkstationView
            onBackToStore={() => navigateTo('storefront')}
            onGoToDoorstepNfc={() => navigateTo('doorstep_nfc')}
            onGoToPressing={() => navigateTo('pressing')}
            onGoToBagging={() => navigateTo('bagging')}
            onGoToDispatch={() => navigateTo('dispatch')}
            onGoToVault={() => navigateTo('vault')}
            onGoToVip={() => navigateTo('vip')}
            onGoToFittings={() => navigateTo('fittings')}
          />
        </div>
      );
    }

    if (currentView === 'doorstep_nfc') {
      return (
        <div className="min-h-screen bg-[#FAF8FF] w-full">
          <DoorstepNfcVerificationView
            onBackToRoute={() => navigateTo('courier')}
            onProceedToFitConfirmation={() => navigateTo('fit_confirmation')}
            onGoToDigitalWardrobe={() => navigateTo('digital_wardrobe')}
            onGoToStorefront={() => navigateTo('storefront')}
          />
        </div>
      );
    }

    if (currentView === 'digital_wardrobe') {
      return (
        <div className="min-h-screen bg-[#FAF8FF] w-full">
          <DigitalWardrobeVaultView
            onBackToStore={() => navigateTo('storefront')}
            onGoToBag={() => navigateTo('bag')}
            onGoToCatalog={() => navigateTo('catalog')}
            onGoToPdp={() => navigateTo('pdp')}
            onGoToVault={() => navigateTo('vault')}
            onGoToFittings={() => navigateTo('fittings')}
            onGoToFitConfirmation={() => navigateTo('fit_confirmation')}
          />
        </div>
      );
    }

    if (currentView === 'auth') {
      return (
        <div className="min-h-screen bg-[#FAF8FF] w-full">
          <ClientAuthenticationView
            onClose={() => navigateTo('storefront')}
            onLoginSuccess={() => navigateTo('account')}
            onLookupGuestOrder={() => navigateTo('tracking')}
            onApplyMembership={() => navigateTo('vip')}
          />
        </div>
      );
    }

    if (currentView === 'account') {
      return (
        <div className="min-h-screen bg-[#FBF8F5] w-full">
          <CustomerAccountPortalView
            onGoToStorefront={() => navigateTo('storefront')}
            onGoToCatalog={() => navigateTo('catalog')}
            onGoToBag={() => navigateTo('bag')}
            onGoToTracking={() => navigateTo('tracking')}
            onGoToWardrobe={() => navigateTo('digital_wardrobe')}
            onGoToFitConfirmation={() => navigateTo('fit_confirmation')}
            onGoToFittings={() => navigateTo('fittings')}
            onSignOut={() => navigateTo('auth')}
          />
          <MobileBottomNav
            currentView={currentView}
            onNavigate={navigateTo}
            cartCount={cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}
            wishlistCount={wishlistIds.length || 2}
          />
        </div>
      );
    }

    // Default: Public Storefront View
    return (
      <div className="min-h-screen flex flex-col bg-[#FBF8F5] text-[#201B1D] selection:bg-[#7A3E5D] selection:text-white w-full">
        <EditorialStorefront
          products={products}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          cartItems={cartItems}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenFilters={() => setIsFilterOpen(true)}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onNavigate={(view) => navigateTo(view)}
        />

        {/* Mobile Menu Drawer (Headless UI) */}
        <MobileMenuDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Filter Bottom-Sheet (Headless UI) */}
        <FilterBottomSheet
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          onResetFilters={handleResetFilters}
        />

        {/* Cart Slide-Over Drawer (Headless UI) */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={() => {
            setIsCartOpen(false);
            navigateTo('checkout');
          }}
        />

        {/* Mobile Bottom Navigation (Always visible on mobile) */}
        <MobileBottomNav
          currentView={currentView}
          onNavigate={navigateTo}
          cartCount={cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}
          wishlistCount={wishlistIds.length || 2}
          onOpenSearch={() => navigateTo('catalog')}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#201B1D] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2 border border-[#7A3E5D]/40 animate-bounce">
            <Check className="w-4 h-4 text-[#D8A7B1]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Suspense fallback={<div className="min-h-screen bg-[#FBF8F5]" aria-label="Loading page" />}>
        {renderCurrentView()}
      </Suspense>
    </>
  );
}
