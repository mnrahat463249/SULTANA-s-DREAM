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
        Schema::create('try_on_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_reference')->unique()->index(); // e.g. "TRY-8821"
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('client_name');
            $table->string('client_phone');
            $table->string('delivery_address');
            
            // Scheduling
            $table->date('fitting_date');
            $table->string('time_window'); // "14:00 - 15:30 EST"
            
            // Fleet Assignment
            $table->string('courier_name')->default('Julian R.');
            $table->string('vehicle_unit')->default('eVito Van #07');
            
            // Fitting Status
            // 'booked' -> 'dispatched' -> 'courier_arrived' -> 'in_consultation' -> 'completed' -> 'cancelled'
            $table->enum('status', [
                'booked',
                'dispatched',
                'courier_arrived',
                'in_consultation',
                'completed',
                'cancelled'
            ])->default('booked');

            // Outcome Telemetry
            $table->boolean('kept_garment')->nullable();
            $table->string('selected_size')->nullable(); // Final confirmed size (e.g. EU 40)
            $table->decimal('gratuity_amount', 8, 2)->default(0.00);
            $table->text('client_notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('try_on_bookings');
    }
};
