<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'client_name',
        'client_email',
        'client_phone',
        'shipping_address',
        'shipping_city',
        'shipping_state',
        'shipping_postal_code',
        'shipping_country',
        'subtotal',
        'discount_total',
        'tax_total',
        'shipping_cost',
        'grand_total',
        'currency',
        'payment_method',
        'payment_status',
        'payment_transaction_id',
        'production_stage',
        'nfc_chip_uid',
        'zkevm_token_id',
        'tracking_number',
        'atelier_notes'
    ];

    protected $casts = [
        'subtotal'       => 'decimal:2',
        'discount_total' => 'decimal:2',
        'tax_total'      => 'decimal:2',
        'shipping_cost'  => 'decimal:2',
        'grand_total'    => 'decimal:2'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function returnRequests()
    {
        return $this->hasMany(ReturnRequest::class);
    }
}
