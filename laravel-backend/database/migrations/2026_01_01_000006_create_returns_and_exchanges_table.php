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
        Schema::create('return_requests', function (Blueprint $table) {
            $table->id();
            $table->string('return_reference')->unique()->index(); // e.g. "RET-89241"
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            
            $table->string('reason');
            $table->enum('type', ['exchange_size', 'refund_card', 'store_credit_bonus'])->default('exchange_size');
            $table->string('requested_exchange_size')->nullable(); // e.g. "EU 42"
            
            // Drop-off QR & Boarding Pass Token
            $table->string('qr_pass_token')->unique();
            $table->string('carrier')->default('DHL Express Priority');
            $table->string('drop_off_point')->default('SoHo Hub — 452 Broadway');
            
            // Status
            $table->enum('status', ['requested', 'qr_issued', 'dropped_off', 'inspected', 'completed', 'rejected'])->default('requested');
            $table->decimal('refund_amount', 10, 2)->default(0.00);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('return_requests');
    }
};
