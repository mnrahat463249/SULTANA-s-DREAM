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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique()->index(); // e.g. "AUR-89241"
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            
            // Client Contact Information
            $table->string('client_name');
            $table->string('client_email');
            $table->string('client_phone')->nullable();
            
            // Shipping Address
            $table->string('shipping_address');
            $table->string('shipping_city');
            $table->string('shipping_state')->nullable();
            $table->string('shipping_postal_code');
            $table->string('shipping_country')->default('United States');

            // Financial Breakdown
            $table->decimal('subtotal', 10, 2);
            $table->decimal('discount_total', 10, 2)->default(0.00);
            $table->decimal('tax_total', 10, 2)->default(0.00);
            $table->decimal('shipping_cost', 10, 2)->default(0.00);
            $table->decimal('grand_total', 10, 2);
            $table->string('currency', 3)->default('USD');

            // Payment Details
            $table->string('payment_method')->default('card'); // 'apple_pay', 'card', 'klarna', 'passkey_one_tap'
            $table->enum('payment_status', ['pending', 'authorized', 'paid', 'failed', 'refunded'])->default('pending');
            $table->string('payment_transaction_id')->nullable();

            // Order Lifecycle & Atelier Production Stage
            // 'pending' -> 'cnc_cut' -> 'hand_basted' -> 'vacuum_pressed' -> 'final_qc' -> 'bagged' -> 'dispatched' -> 'in_transit' -> 'delivered' -> 'completed'
            $table->enum('production_stage', [
                'order_received',
                'cnc_laser_cutting',
                'artisan_hand_basting',
                'vacuum_steam_pressing',
                'final_qc_ultrasonic',
                'hermetic_cedar_bagging',
                'dispatched_fleet',
                'transatlantic_transit',
                'out_for_delivery',
                'delivered',
                'returned'
            ])->default('order_received');

            // Cryptographic Digital Twin & NFC Chip Tracking
            $table->string('nfc_chip_uid')->nullable(); // e.g. "0x8921-zkNFC"
            $table->string('zkevm_token_id')->nullable(); // Polygon zkEVM Token ID
            $table->string('tracking_number')->nullable()->index(); // e.g. "AUR-TRK-77189"

            $table->text('atelier_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_variant_id')->nullable()->constrained()->nullOnDelete();
            $table->string('product_title');
            $table->string('sku');
            $table->string('size');
            $table->string('color');
            $table->unsignedInteger('quantity')->default(1);
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
    }
};
