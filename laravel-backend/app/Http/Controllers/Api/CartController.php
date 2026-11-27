<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CartController extends Controller
{
    /**
     * Get the active shopping cart by session token or user ID.
     */
    public function getCart(Request $request)
    {
        $cart = $this->resolveCart($request);

        return response()->json([
            'status'          => 'success',
            'cart_id'         => $cart->id,
            'session_token'   => $cart->session_token,
            'items'           => $cart->items()->with('product')->get(),
            'item_count'      => $cart->items()->sum('quantity'),
            'subtotal'        => $cart->subtotal,
            'discount_amount' => $cart->discount_amount,
            'coupon_code'     => $cart->coupon_code,
            'total'           => $cart->total,
            'free_shipping'   => $cart->total >= 150.00,
            'shipping_shortfall' => max(0, 150.00 - $cart->total)
        ]);
    }

    /**
     * Add an item to the shopping cart.
     */
    public function addItem(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'size'       => 'required|string',
            'color'      => 'required|string',
            'quantity'   => 'integer|min:1'
        ]);

        $cart = $this->resolveCart($request);
        $product = Product::find($validated['product_id']);

        $price = $product ? $product->price : 304.00;
        $title = $product ? $product->title : 'Structured Wool Blazer';

        // Check if item with same size and color already in cart
        $existingItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $validated['product_id'])
            ->where('size', $validated['size'])
            ->where('color', $validated['color'])
            ->first();

        if ($existingItem) {
            $existingItem->increment('quantity', $validated['quantity'] ?? 1);
        } else {
            CartItem::create([
                'cart_id'    => $cart->id,
                'product_id' => $validated['product_id'],
                'size'       => $validated['size'],
                'color'      => $validated['color'],
                'quantity'   => $validated['quantity'] ?? 1,
                'unit_price' => $price
            ]);
        }

        return response()->json([
            'status'  => 'success',
            'message' => "Added {$title} to Wardrobe",
            'cart'    => $this->getCartResponse($cart)
        ]);
    }

    /**
     * Update quantity of a cart item.
     */
    public function updateQuantity(Request $request, $itemId)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:0'
        ]);

        $cart = $this->resolveCart($request);
        $item = CartItem::where('cart_id', $cart->id)->findOrFail($itemId);

        if ($validated['quantity'] === 0) {
            $item->delete();
        } else {
            $item->update(['quantity' => $validated['quantity']]);
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Cart updated',
            'cart'    => $this->getCartResponse($cart)
        ]);
    }

    /**
     * Remove an item from the cart.
     */
    public function removeItem(Request $request, $itemId)
    {
        $cart = $this->resolveCart($request);
        $item = CartItem::where('cart_id', $cart->id)->find($itemId);
        if ($item) {
            $cart = $item->cart;
            $item->delete();
            return response()->json([
                'status'  => 'success',
                'message' => 'Item removed from bag',
                'cart'    => $this->getCartResponse($cart)
            ]);
        }

        return response()->json(['status' => 'success', 'message' => 'Item removed']);
    }

    /**
     * Apply promo discount code (e.g. AURA20, WELCOME15).
     */
    public function applyCoupon(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string'
        ]);

        $cart = $this->resolveCart($request);
        $code = strtoupper(trim($validated['code']));

        $discount = 0.00;
        if ($code === 'AURA20') {
            $discount = round($cart->subtotal * 0.20, 2);
        } elseif ($code === 'WELCOME15') {
            $discount = 45.00;
        } else {
            return response()->json([
                'status'  => 'error',
                'message' => 'Invalid promo code. Use AURA20 or WELCOME15.'
            ], 422);
        }

        $cart->update([
            'coupon_code'     => $code,
            'discount_amount' => $discount
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => "Promo code {$code} applied successfully",
            'cart'    => $this->getCartResponse($cart)
        ]);
    }

    private function resolveCart(Request $request): Cart
    {
        $user = $request->user();
        $sessionToken = $request->header('X-Cart-Session') ?? $request->input('session_token');

        if ($user) {
            return Cart::firstOrCreate(
                ['user_id' => $user->id],
                ['session_token' => $sessionToken ?? (string) Str::uuid()]
            );
        }

        if ($sessionToken) {
            return Cart::firstOrCreate(
                ['session_token' => $sessionToken]
            );
        }

        return Cart::create([
            'session_token' => (string) Str::uuid()
        ]);
    }

    private function getCartResponse(Cart $cart): array
    {
        return [
            'cart_id'         => $cart->id,
            'session_token'   => $cart->session_token,
            'items'           => $cart->items()->with('product')->get(),
            'item_count'      => $cart->items()->sum('quantity'),
            'subtotal'        => $cart->subtotal,
            'discount_amount' => $cart->discount_amount,
            'coupon_code'     => $cart->coupon_code,
            'total'           => $cart->total
        ];
    }
}
