<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TryOnBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_reference',
        'user_id',
        'client_name',
        'client_phone',
        'delivery_address',
        'fitting_date',
        'time_window',
        'courier_name',
        'vehicle_unit',
        'status',
        'kept_garment',
        'selected_size',
        'gratuity_amount',
        'client_notes'
    ];

    protected $casts = [
        'fitting_date'    => 'date',
        'kept_garment'    => 'boolean',
        'gratuity_amount' => 'decimal:2'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
