<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'brand',
        'title',
        'slug',
        'sku',
        'description',
        'tailoring_lineage',
        'materials_care',
        'price',
        'original_price',
        'currency',
        'sale_tag',
        'fabric_origin',
        'fabric_type',
        'construction_method',
        'nfc_chip_model',
        'polygon_contract_address',
        'rating',
        'reviews_count',
        'is_featured',
        'is_active',
        'images',
        'craftsmanship_hotspots'
    ];

    protected $casts = [
        'price'                  => 'decimal:2',
        'original_price'         => 'decimal:2',
        'rating'                 => 'decimal:2',
        'reviews_count'          => 'integer',
        'is_featured'            => 'boolean',
        'is_active'              => 'boolean',
        'images'                 => 'array',
        'craftsmanship_hotspots' => 'array'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
