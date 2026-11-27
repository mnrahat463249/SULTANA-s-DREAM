<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'sku',
        'size',
        'color_name',
        'color_hex',
        'price_modifier',
        'stock_quantity',
        'reserved_quantity'
    ];

    protected $casts = [
        'price_modifier'    => 'decimal:2',
        'stock_quantity'    => 'integer',
        'reserved_quantity' => 'integer'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function getAvailableStockAttribute(): int
    {
        return max(0, $this->stock_quantity - $this->reserved_quantity);
    }
}
