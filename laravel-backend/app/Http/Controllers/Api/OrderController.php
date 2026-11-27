<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * List user orders with items and production statuses.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $orders = Order::where('user_id', $user->id)
                ->with('items')
                ->orderBy('created_at', 'desc')
                ->get();
            return response()->json(['orders' => $orders]);
        }

        return response()->json(['orders' => []]);
    }

    /**
     * Get details of a single order.
     */
    public function show(Request $request, $orderNumber)
    {
        $query = Order::where('order_number', $orderNumber)
            ->orWhere('tracking_number', $orderNumber)
            ->with('items');
        if ($request->user()) {
            $query->where('user_id', $request->user()->id);
        }
        $order = $query->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json(['order' => $order]);
    }

    /**
     * Get live telemetry and stage milestones for flight & courier transit.
     */
    public function track($trackingNumber)
    {
        return response()->json([
            'tracking_number'   => $trackingNumber,
            'current_stage'     => 'Final QC & Dispatch Loading Bay',
            'estimated_arrival' => 'Today at 16:45 EST',
            'carrier'           => 'AURA White-Glove Fleet Unit #07',
            'courier'           => [
                'name'    => 'Julian R.',
                'rating'  => '4.98 ★',
                'vehicle' => 'Mercedes eVito Cargo Van #07',
                'battery' => '84%'
            ],
            'flight_telemetry'  => [
                'flight_number' => 'DL-841 (Paris CDG → JFK New York)',
                'altitude'      => '34,000 ft',
                'airspeed'      => '542 kts',
                'temperature'   => '-52.4°C Ambient / 20.2°C Cabin'
            ],
            'milestones'        => [
                ['title' => 'Order Confirmed & Payment Verified', 'time' => '09:15 EST', 'completed' => true],
                ['title' => 'CNC Vacuum Laser Cutting & Basting', 'time' => '11:30 EST', 'completed' => true],
                ['title' => 'Vacuum Steam Press & Shoulder Shaping', 'time' => '13:00 EST', 'completed' => true],
                ['title' => 'Ultrasonic NFC Sealing & Final QC', 'time' => '14:45 EST', 'completed' => true],
                ['title' => 'Hermetic Cedar Bagging & Loading Bay 02', 'time' => '15:10 EST', 'completed' => true],
                ['title' => 'Lead Courier Out for Doorstep Delivery', 'time' => '16:00 EST', 'completed' => false],
                ['title' => 'In-Home Fit Consultation & Handoff', 'time' => '16:45 EST', 'completed' => false]
            ]
        ]);
    }
}
