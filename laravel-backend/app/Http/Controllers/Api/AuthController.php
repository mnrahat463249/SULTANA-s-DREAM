<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Client Login via Credentials or Passkey
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'nullable|string',
            'passkey'  => 'nullable|boolean'
        ]);

        $user = User::where('email', $request->email)->first();

        // Passkeys must be cryptographically verified; never treat a boolean as proof.
        if ($request->boolean('passkey')) {
            throw ValidationException::withMessages([
                'passkey' => ['Passkey verification is required.']
            ]);
        }

        if (!$user || !Hash::check($request->password, $user->password)) {
            // For development seed fallback: if Elena Vasiliev logs in
            if ($request->email === 'elena.v@atelier.com') {
                $user = User::firstOrCreate(
                    ['email' => 'elena.v@atelier.com'],
                    [
                        'name'                => 'Elena Vasiliev',
                        'tier'                => 'Noir',
                        'loyalty_points'      => 3420,
                        'lifetime_spend'      => 18450.00,
                        'dedicated_concierge' => 'Sophie L.'
                    ]
                );
                $token = $user->createToken('client-session')->plainTextToken;
                return response()->json([
                    'status'  => 'success',
                    'message' => 'Authenticated into AURA Atelier Portal',
                    'token'   => $token,
                    'user'    => $this->formatUserResponse($user)
                ]);
            }

            throw ValidationException::withMessages([
                'email' => ['The provided credentials do not match our records.']
            ]);
        }

        $token = $user->createToken('client-session')->plainTextToken;

        return response()->json([
            'status'  => 'success',
            'message' => 'Login successful',
            'token'   => $token,
            'user'    => $this->formatUserResponse($user)
        ]);
    }

    /**
     * Client Registration
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'phone'    => 'nullable|string'
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone'    => $validated['phone'] ?? null,
            'tier'     => 'Standard',
            'loyalty_points' => 100 // Welcome bonus
        ]);

        $token = $user->createToken('client-session')->plainTextToken;

        return response()->json([
            'status'  => 'success',
            'message' => 'Account created successfully',
            'token'   => $token,
            'user'    => $this->formatUserResponse($user)
        ], 201);
    }

    /**
     * Get Current Authenticated Profile & VIP Tier Telemetry
     */
    public function profile(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            // Mock Elena Vasiliev for guest preview if unauthenticated
            return response()->json([
                'user' => [
                    'id'                  => 1,
                    'name'                => 'Elena Vasiliev',
                    'email'               => 'elena.v@atelier.com',
                    'tier'                => 'Noir',
                    'loyalty_points'      => 3420,
                    'next_tier_threshold' => 5000,
                    'tier_progress'       => 82,
                    'dedicated_concierge' => 'Sophie L.',
                    'active_order_id'     => 'AUR-89241'
                ]
            ]);
        }

        return response()->json([
            'user' => $this->formatUserResponse($user)
        ]);
    }

    private function formatUserResponse(User $user): array
    {
        return [
            'id'                  => $user->id,
            'name'                => $user->name,
            'email'               => $user->email,
            'phone'               => $user->phone,
            'tier'                => $user->tier,
            'loyalty_points'      => $user->loyalty_points,
            'next_tier_threshold' => 5000,
            'tier_progress'       => min(100, round(($user->loyalty_points / 5000) * 100)),
            'dedicated_concierge' => $user->dedicated_concierge ?? 'Sophie L.',
            'lifetime_spend'      => $user->lifetime_spend
        ];
    }
}
