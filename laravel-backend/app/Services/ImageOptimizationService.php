<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;

/**
 * ImageOptimizationService (Intervention Image v3)
 *
 * Provides mobile-friendly image processing:
 * 1. Automatic conversion to .webp format (reducing payload by ~40-70% compared to JPG/PNG).
 * 2. Multi-resolution breakpoint generation (thumb 300px, catalog 600px, hero 1200px).
 * 3. EXIF metadata strip and 80% quality compression for ultra-fast mobile loading.
 */
class ImageOptimizationService
{
    protected ImageManager $manager;

    public function __construct()
    {
        // Use GD driver or Imagick driver:
        $this->manager = new ImageManager(new GdDriver());
    }

    /**
     * Upload, resize, and convert an image to WebP breakpoints.
     *
     * @param UploadedFile $file
     * @param string $folder Directory in storage (e.g. 'products')
     * @return array URLs for thumb, catalog, and hero
     */
    public function optimizeAndStore(UploadedFile $file, string $folder = 'products'): array
    {
        $filename = Str::uuid()->toString();
        $disk = Storage::disk('public');
        
        // Define mobile-optimized widths
        $sizes = [
            'thumb'   => 300,  // For mobile cart drawer & mini previews
            'catalog' => 600,  // For mobile 2-column product card feed
            'hero'    => 1200, // For full-width touch banner or zoom view
        ];

        $urls = [];

        foreach ($sizes as $label => $width) {
            // Read image into Intervention Image v3
            $image = $this->manager->read($file->getRealPath());

            // Scale proportionally down to target width (avoids upscaling smaller images)
            $image->scaleDown(width: $width);

            // Encode to modern .webp format at 80% quality
            $encoded = $image->toWebp(quality: 80);

            // Storage path
            $relativePath = "{$folder}/{$filename}_{$label}.webp";
            
            // Save to disk
            $disk->put($relativePath, (string) $encoded);

            // Generate accessible public URL
            $urls[$label] = $disk->url($relativePath);
        }

        return $urls;
    }

    /**
     * Delete all breakpoint variants for an image.
     */
    public function deleteImageVariants(string $filename, string $folder = 'products'): void
    {
        $disk = Storage::disk('public');
        foreach (['thumb', 'catalog', 'hero'] as $label) {
            $path = "{$folder}/{$filename}_{$label}.webp";
            if ($disk->exists($path)) {
                $disk->delete($path);
            }
        }
    }
}
