<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ReturnRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReturnController extends Controller
{
    /**
     * Submit a Return or Size Exchange request.
     */
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'order_number'            => 'required|string',
            'reason'                  => 'required|string',
            'type'                    => 'required|in:exchange_size,refund_card,store_credit_bonus',
            'requested_exchange_size' => 'nullable|string'
        ]);

        $order = Order::where('order_number', $validated['order_number'])->first();

        $returnRef = 'RET-' . rand(10000, 99999);
        $qrPassToken = 'PASS-' . strtoupper(Str::random(12));

        $return = ReturnRequest::create([
            'return_reference'        => $returnRef,
            'order_id'                => $order ? $order->id : 1,
            'user_id'                 => $request->user() ? $request->user()->id : null,
            'reason'                  => $validated['reason'],
            'type'                    => $validated['type'],
            'requested_exchange_size' => $validated['requested_exchange_size'] ?? null,
            'qr_pass_token'           => $qrPassToken,
            'carrier'                 => 'DHL Express Priority',
            'drop_off_point'          => 'SoHo Hub — 452 Broadway, New York',
            'status'                  => 'qr_issued',
            'refund_amount'           => $order ? $order->grand_total : 304.00
        ]);

        return response()->json([
            'status'           => 'success',
            'message'          => 'Return authorized. Digital drop-off pass generated.',
            'return_reference' => $return->return_reference,
            'qr_pass_token'    => $return->qr_pass_token,
            'pass_url'         => "/api/v1/returns/pass/{$return->qr_pass_token}"
        ], 201);
    }

    /**
     * Get digital drop-off boarding pass details.
     */
    public function getPass($qrToken)
    {
        return response()->json([
            'pass_token'       => $qrToken,
            'order_number'     => 'AUR-89241',
            'carrier'          => 'DHL Express Priority',
            'drop_off_hub'     => 'SoHo Hub — 452 Broadway, New York, NY 10012',
            'hub_hours'        => 'Open until 20:00 EST',
            'service_type'     => 'Complimentary White-Glove Pre-Inspected Return',
            'barcode'          => '4920 1849 2018 4812',
            'qr_payload'       => "https://aura.atelier/pass/{$qrToken}",
            'package_contents' => 'Structured Wool Blazer • EU 40 • Obsidian Melange',
            'next_steps'       => [
                'No repacking or printed label required',
                'Present this QR pass to the concierge agent at 452 Broadway',
                'Instant store credit (+10% bonus) will be released immediately upon scan'
            ]
        ]);
    }
}
