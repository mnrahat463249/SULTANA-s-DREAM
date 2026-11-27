<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'avatar_url',
        'tier',
        'loyalty_points',
        'lifetime_spend',
        'dedicated_concierge',
        'passkey_credential_id',
        'passkey_public_key'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'passkey_public_key'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'loyalty_points'    => 'integer',
        'lifetime_spend'    => 'decimal:2',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class)->orderBy('created_at', 'desc');
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function tryOnBookings()
    {
        return $this->hasMany(TryOnBooking::class);
    }

    public function returnRequests()
    {
        return $this->hasMany(ReturnRequest::class);
    }
}
