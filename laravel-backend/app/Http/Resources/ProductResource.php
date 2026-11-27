<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array matching the mobile React frontend.
     */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'title'          => $this->title,
            'category'       => $this->category,
            'price'          => (float) $this->price,
            'original_price' => $this->original_price ? (float) $this->original_price : null,
            'badge'          => $this->badge,
            'rating'         => (float) ($this->rating ?? 5.0),
            'reviews'        => (int) ($this->reviews_count ?? 0),
            // Multi-image URLs generated via Intervention Image (WebP)
            'images'         => $this->images ?? [
                $this->image_url ?? asset('images/placeholder.webp')
            ],
            // Responsive WebP image srcset representation
            'image_variants' => [
                'thumb'   => $this->thumb_url,
                'catalog' => $this->catalog_url,
                'hero'    => $this->hero_url,
            ],
            'colors'         => $this->colors ?? ['#171717'],
            'sizes'          => $this->sizes ?? ['38', '40', '42'],
            'description'    => $this->description,
            'in_stock'       => (bool) ($this->stock > 0),
            'created_at'     => $this->created_at?->toIso8601String(),
        ];
    }
}
