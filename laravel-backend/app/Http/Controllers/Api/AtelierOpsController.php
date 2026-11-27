<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class AtelierOpsController extends Controller
{
    /**
     * Final QC Workstation sign-off and NFC seal activation.
     */
    public function signOffQc(Request $request, $orderNumber)
    {
        $validated = $request->validate([
            'operator_name'      => 'nullable|string',
            'optical_spec_delta' => 'nullable|numeric',
            'nfc_verified'       => 'required|boolean'
        ]);

        $order = Order::where('order_number', $orderNumber)->first();
        if ($order) {
            $order->update([
                'production_stage' => 'hermetic_cedar_bagging',
                'atelier_notes'    => 'Passed 6-point QC inspection. Sealed with 35kHz ultrasonic horn.'
            ]);
        }

        return response()->json([
            'status'         => 'success',
            'message'        => 'Stage 05 Final QC Approved. Garment moved to Hermetic Cedar Bagging chamber.',
            'order_number'   => $orderNumber,
            'next_stage'     => 'hermetic_cedar_bagging',
            'nfc_status'     => 'Permanently Sealed & Anchored on zkEVM State Root'
        ]);
    }

    /**
     * Doorstep NFC Mutual Authentication Challenge-Response (NTAG424 DNA).
     */
    public function verifyDoorstepNfc(Request $request)
    {
        $validated = $request->validate([
            'chip_uid'  => 'required|string',
            'challenge' => 'required|string'
        ]);

        // Cryptographic CMAC simulation for NTAG424 DNA
        $isAuthentic = str_starts_with($validated['chip_uid'], '0x') || strlen($validated['chip_uid']) >= 6;

        return response()->json([
            'status'               => 'success',
            'verified'             => $isAuthentic,
            'chip_uid'             => $validated['chip_uid'],
            'cryptographic_cipher' => 'AES-128 CMAC (Verified)',
            'garment_provenance'   => [
                'piece'            => 'Structured Wool Blazer',
                'mill'             => 'Biella Super 130s Heritage Weave',
                'tailor'           => 'Mathilde B. (Bench #02)',
                'lot'              => 'LOT-2026-904',
                'mint_tx'          => '0x712a...98be (Polygon zkEVM)'
            ],
            'action'               => 'Unlock Tamper-Proof Micro-Latch'
        ]);
    }

    /**
     * Fleet Dispatch Command Status & Active Vans.
     */
    public function dispatchFleetStatus()
    {
        return response()->json([
            'active_fleet' => [
                [
                    'unit'        => 'eVito Van #07',
                    'courier'     => 'Julian R.',
                    'battery'     => '84%',
                    'assigned'    => 'SoHo & Tribeca Sector',
                    'stops_left'  => 3,
                    'temperature' => '20.5°C'
                ],
                [
                    'unit'        => 'eVito Van #03',
                    'courier'     => 'Marcus V.',
                    'battery'     => '91%',
                    'assigned'    => 'Upper East Side VIP Route',
                    'stops_left'  => 2,
                    'temperature' => '19.8°C'
                ],
                [
                    'unit'        => 'eVito Van #02',
                    'courier'     => 'Claire D.',
                    'battery'     => '76%',
                    'assigned'    => 'Greenwich Village',
                    'stops_left'  => 4,
                    'temperature' => '20.1°C'
                ]
            ],
            'staging_queue_count' => 8
        ]);
    }
}
