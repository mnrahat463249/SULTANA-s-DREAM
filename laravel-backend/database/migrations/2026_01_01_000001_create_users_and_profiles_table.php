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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable(); // Nullable for biometric / passkey users
            $table->string('phone')->nullable();
            $table->string('avatar_url')->nullable();
            
            // VIP & Loyalty Tiers
            $table->enum('tier', ['Standard', 'Gold', 'Noir'])->default('Standard');
            $table->unsignedInteger('loyalty_points')->default(0);
            $table->decimal('lifetime_spend', 12, 2)->default(0.00);
            $table->string('dedicated_concierge')->default('Sophie L.');

            // Biometric Passkey / WebAuthn Storage
            $table->text('passkey_credential_id')->nullable();
            $table->text('passkey_public_key')->nullable();

            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('label')->default('Home'); // Home, Atelier, Office
            $table->string('recipient_name');
            $table->string('phone');
            $table->string('street_address');
            $table->string('apartment_suite')->nullable();
            $table->string('city');
            $table->string('state')->nullable();
            $table->string('postal_code');
            $table->string('country')->default('United States');
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('users');
    }
};
