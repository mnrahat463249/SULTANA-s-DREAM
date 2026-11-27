<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    /**
     * Process checkout and create a confirmed order.
     */
    public function process(Request $request)
    {
        $validated = $request->validate([
            'client_name'          => 'required|string',
            'client_email'         => 'required|email',
            'client_phone'         => 'nullable|string',
            'shipping_address'     => 'required|string',
            'shipping_city'        => 'required|string',
            'shipping_state'       => 'nullable|string',
            'shipping_postal_code' => 'required|string',
            'shipping_country'     => 'nullable|string',
            'payment_method'       => 'required|string', // 'apple_pay', 'card', 'klarna'
            'session_token'        => 'nullable|string',
            'payment_reference'    => 'required|string',
            'cart_items'           => 'prohibited'
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $user = $request->user();

            // Resolve subtotal and items
            $cart = null;
            if ($user) {
                $cart = Cart::where('user_id', $user->id)->first();
            } elseif (!empty($validated['session_token'])) {
                $cart = Cart::where('session_token', $validated['session_token'])
                    ->whereNull('user_id')
                    ->first();
            }

            $orderNumber = 'AUR-' . strtoupper(Str::random(5));
            $trackingNumber = 'AUR-TRK-' . rand(10000, 99999);

            $subtotal = 0.00;
            $itemsToCreate = [];

            if ($cart && $cart->items()->count() > 0) {
                foreach ($cart->items as $cartItem) {
                    $product = Product::find($cartItem->product_id);
                    if (!$product) {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'One or more cart items are no longer available.'
                        ], 422);
                    }
                    $serverPrice = (float) $product->price;
                    $itemTotal = $cartItem->quantity * $serverPrice;
                    $subtotal += $itemTotal;
                    $itemsToCreate[] = [
                        'product_id'    => $cartItem->product_id,
                        'product_title' => $product->title,
                        'sku'           => 'AUR-' . strtoupper(Str::random(4)),
                        'size'          => $cartItem->size,
                        'color'         => $cartItem->color,
                        'quantity'      => $cartItem->quantity,
                        'unit_price'    => $serverPrice,
                        'total_price'   => $itemTotal
                    ];
                }
                $discountTotal = $cart->discount_amount;
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'A valid shopping cart is required.'
                ], 422);
            }

            $shippingCost = $subtotal >= 150 ? 0.00 : 25.00;
            $taxTotal = round(($subtotal - $discountTotal) * 0.08875, 2); // NYC Sales Tax
            $grandTotal = max(0, ($subtotal - $discountTotal) + $taxTotal + $shippingCost);

            // Create Master Order
            $order = Order::create([
                'order_number'           => $orderNumber,
                'user_id'                => $user ? $user->id : null,
                'client_name'            => $validated['client_name'],
                'client_email'           => $validated['client_email'],
                'client_phone'           => $validated['client_phone'] ?? null,
                'shipping_address'       => $validated['shipping_address'],
                'shipping_city'          => $validated['shipping_city'],
                'shipping_state'         => $validated['shipping_state'] ?? 'NY',
                'shipping_postal_code'   => $validated['shipping_postal_code'],
                'shipping_country'       => $validated['shipping_country'] ?? 'United States',
                'subtotal'               => $subtotal,
                'discount_total'         => $discountTotal,
                'tax_total'              => $taxTotal,
                'shipping_cost'          => $shippingCost,
                'grand_total'            => $grandTotal,
                'currency'               => 'USD',
                'payment_method'         => $validated['payment_method'],
                'payment_status'         => 'pending_verification',
                'payment_transaction_id' => $validated['payment_reference'],
                'production_stage'       => 'order_received',
                'nfc_chip_uid'           => '0x' . substr(md5($orderNumber), 0, 8) . '-zkNFC',
                'tracking_number'        => $trackingNumber,
                'atelier_notes'          => 'Bespoke floating canvas. Hand basting allocated to Bench #02.'
            ]);

            // Save order items
            foreach ($itemsToCreate as $itemData) {
                $itemData['order_id'] = $order->id;
                OrderItem::create($itemData);
            }

            // Award loyalty points (1 point per $1 spent)
            if ($user) {
                $pointsEarned = (int) $grandTotal;
                $user->increment('loyalty_points', $pointsEarned);
                $user->increment('lifetime_spend', $grandTotal);
            }

            // Clear Cart if applicable
            if ($cart) {
                $cart->items()->delete();
                $cart->update(['coupon_code' => null, 'discount_amount' => 0.00]);
            }

            return response()->json([
                'status'  => 'success',
                'message' => 'Order placed successfully. Atelier production initiated.',
                'order'   => [
                    'orderId'         => $order->order_number,
                    'trackingNumber'  => $order->tracking_number,
                    'client'          => $order->client_name,
                    'email'           => $order->client_email,
                    'address'         => "{$order->shipping_address}, {$order->shipping_city}, {$order->shipping_postal_code}",
                    'subtotal'        => '$' . number_format($order->subtotal, 2),
                    'discount'        => '-$' . number_format($order->discount_total, 2),
                    'tax'             => '$' . number_format($order->tax_total, 2),
                    'shipping'        => $order->shipping_cost > 0 ? '$' . number_format($order->shipping_cost, 2) : 'COMPLIMENTARY',
                    'total'           => '$' . number_format($order->grand_total, 2),
                    'paymentMethod'   => strtoupper(str_replace('_', ' ', $order->payment_method)),
                    'productionStage' => $order->production_stage,
                    'nfcChipUid'      => $order->nfc_chip_uid,
                    'loyaltyEarned'   => '+' . (int)$grandTotal . ' Pts',
                    'items'           => $order->items
                ]
            ], 201);
        });
    }
}
