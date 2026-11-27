<?php

use App\Http\Controllers\Api\AtelierOpsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReturnController;
use App\Http\Controllers\Api\TryOnController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| AURA Haute Atelier E-Commerce & Workshop API Routes (v1)
|--------------------------------------------------------------------------
| Fully structured RESTful API connecting the React Storefront,
| Customer VIP Portal, and Internal Atelier Workshop Modules.
*/

Route::prefix('v1')->group(function () {

    // ================= 1. CLIENT AUTHENTICATION & VIP IDENTITY =================
    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);
        Route::get('/profile', [AuthController::class, 'profile']);
    });

    // ================= 2. PUBLIC CATALOG & CURSOR PAGINATION =================
    Route::prefix('products')->group(function () {
        // Infinite scroll cursor paginated products: ?per_page=10&cursor=...&category=Tailoring
        Route::get('/', [ProductController::class, 'index']);
        // Product Detail Page (PDP) with variants, stock, and craftsmanship hotspots
        Route::get('/{idOrSlug}', [ProductController::class, 'show']);
    });
    Route::get('/categories', [ProductController::class, 'categories']);

    // ================= 3. SHOPPING BAG & CART SYSTEM =================
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'getCart']);
        Route::post('/items', [CartController::class, 'addItem']);
        Route::patch('/items/{id}', [CartController::class, 'updateQuantity']);
        Route::delete('/items/{id}', [CartController::class, 'removeItem']);
        Route::post('/coupon', [CartController::class, 'applyCoupon']);
    });

    // ================= 4. CHECKOUT & ATOMIC ORDER PLACEMENT =================
    Route::post('/checkout', [CheckoutController::class, 'process']);

    // ================= 5. ORDERS & TRANSATLANTIC LIVE TRACKING =================
    Route::prefix('orders')->group(function () {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/', [OrderController::class, 'index']);
            Route::get('/{orderNumber}', [OrderController::class, 'show']);
        });
        Route::get('/track/{trackingNumber}', [OrderController::class, 'track']);
    });

    // ================= 6. IN-HOME DOORSTEP TRY-ON (CONCIERGE) =================
    Route::prefix('try-on')->group(function () {
        Route::post('/book', [TryOnController::class, 'book']);
        Route::get('/slots', [TryOnController::class, 'slots']);
        Route::get('/active-sessions', [TryOnController::class, 'activeSessions']);
    });

    // ================= 7. RETURNS, EXCHANGES & DROP-OFF PASS =================
    Route::prefix('returns')->group(function () {
        Route::post('/submit', [ReturnController::class, 'submit']);
        Route::get('/pass/{token}', [ReturnController::class, 'getPass']);
    });

    // ================= 8. ATELIER OPS & WORKSHOP ENDPOINTS =================
    Route::prefix('ops')->group(function () {
        Route::middleware('auth:sanctum')->group(function () {
        Route::post('/qc/sign-off/{orderNumber}', [AtelierOpsController::class, 'signOffQc']);
        Route::post('/nfc/verify', [AtelierOpsController::class, 'verifyDoorstepNfc']);
        Route::get('/dispatch/fleet', [AtelierOpsController::class, 'dispatchFleetStatus']);
        });
    });

});
