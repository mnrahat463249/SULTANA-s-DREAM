<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TryOnBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TryOnController extends Controller
{
    /**
     * Book an In-Home Doorstep Try-On Session.
     */
    public function book(Request $request)
    {
        $validated = $request->validate([
            'client_name'      => 'required|string',
            'client_phone'     => 'required|string',
            'delivery_address' => 'required|string',
            'fitting_date'     => 'required|date',
            'time_window'      => 'required|string',
            'client_notes'     => 'nullable|string'
        ]);

        $bookingRef = 'TRY-' . rand(1000, 9999);

        $booking = TryOnBooking::create([
            'booking_reference' => $bookingRef,
            'user_id'           => $request->user() ? $request->user()->id : null,
            'client_name'       => $validated['client_name'],
            'client_phone'      => $validated['client_phone'],
            'delivery_address'  => $validated['delivery_address'],
            'fitting_date'      => $validated['fitting_date'],
            'time_window'       => $validated['time_window'],
            'courier_name'      => 'Julian R.',
            'vehicle_unit'      => 'eVito Van #07',
            'status'            => 'booked',
            'client_notes'      => $validated['client_notes'] ?? null
        ]);

        return response()->json([
            'status'            => 'success',
            'message'           => 'In-Home Doorstep Try-On confirmed. Julian R. dispatched with 3 calibrated buffer sizes.',
            'booking_reference' => $booking->booking_reference,
            'booking'           => $booking
        ], 201);
    }

    /**
     * Get available fitting slots.
     */
    public function slots()
    {
        return response()->json([
            'date'  => date('Y-m-d'),
            'slots' => [
                ['window' => '11:00 - 12:30 EST', 'available' => false],
                ['window' => '13:00 - 14:30 EST', 'available' => true, 'van' => 'Unit #03'],
                ['window' => '15:00 - 16:30 EST', 'available' => true, 'van' => 'Unit #07'],
                ['window' => '17:00 - 18:30 EST', 'available' => true, 'van' => 'Unit #02'],
                ['window' => '19:00 - 20:30 EST', 'available' => true, 'van' => 'Unit #05']
            ]
        ]);
    }

    /**
     * Active try-on sessions telemetry for Ops HQ.
     */
    public function activeSessions()
    {
        return response()->json([
            'kpis' => [
                'active_sessions' => 3,
                'keep_rate'       => '94.2%',
                'avg_duration'    => '6.4 min',
                'gmv_today'       => '$78,420'
            ],
            'sessions' => [
                [
                    'id'       => 'TRY-8821',
                    'client'   => 'Camille Laurent',
                    'address'  => '740 Park Ave, Penthouse A',
                    'courier'  => 'Marcus V. (Unit #03)',
                    'status'   => 'Active Fitting',
                    'timer'    => '08:42 remaining',
                    'type'     => 'Rapid Size Swap (38 ➔ 40)'
                ],
                [
                    'id'       => 'TRY-8924',
                    'client'   => 'Elena Vasiliev',
                    'address'  => '452 W Broadway, Apt 4B',
                    'courier'  => 'Julian R. (Unit #07)',
                    'status'   => 'Doorstep Verified',
                    'timer'    => '14:20 remaining',
                    'type'     => 'VIP Noir Consultation'
                ]
            ]
        ]);
    }
}
