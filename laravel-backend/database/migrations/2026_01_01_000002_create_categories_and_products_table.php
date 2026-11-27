<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->string('brand')->default('AURA ATELIER');
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('sku')->unique();
            $table->text('description');
            $table->text('tailoring_lineage')->nullable();
            $table->text('materials_care')->nullable();
            
            // Pricing & Currency
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->string('sale_tag')->nullable(); // "-20% Sale", "New In", "Sustainable"

            // Atelier Craftsmanship & NFC Digital Twin Spec
            $table->string('fabric_origin')->default('Biella, Piedmont, Italy');
            $table->string('fabric_type')->default('Super 130s Pure Virgin Wool');
            $table->string('construction_method')->default('Floating Full-Horsehair Canvas');
            $table->string('nfc_chip_model')->default('NTAG424 DNA Cryptographic Tag');
            $table->string('polygon_contract_address')->nullable();

            // Ratings & Editorial
            $table->decimal('rating', 3, 2)->default(4.90);
            $table->unsignedInteger('reviews_count')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);

            // Stored Responsive Image URLs (Intervention Image WebP JSON)
            $table->json('images')->nullable();
            $table->json('craftsmanship_hotspots')->nullable();

            $table->timestamps();
            
            // Index for high-speed cursorPaginate()
            $table->index(['is_active', 'created_at']);
            $table->index(['category_id', 'is_active']);
        });

        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('sku')->unique();
            $table->string('size'); // EU 36, EU 38, EU 40, EU 42, EU 44
            $table->string('color_name'); // Obsidian Melange, Camel Beige, Heather Grey
            $table->string('color_hex', 7); // #0F172A
            $table->decimal('price_modifier', 8, 2)->default(0.00);
            $table->unsignedInteger('stock_quantity')->default(10);
            $table->unsignedInteger('reserved_quantity')->default(0); // For active try-ons / checkout sessions
            $table->timestamps();

            $table->unique(['product_id', 'size', 'color_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variants');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
    }
};
