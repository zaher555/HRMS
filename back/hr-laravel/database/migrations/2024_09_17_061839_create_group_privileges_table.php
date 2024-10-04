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
        Schema::create('group_privileges', function (Blueprint $table) {
            $table->id();  
            $table->unsignedBigInteger('group_id');  
            $table->unsignedBigInteger('privileges_id');  
            $table->timestamps(); 
            $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
            $table->foreign('privileges_id')->references('id')->on('privileges')->onDelete('cascade');
            $table->unique(['group_id', 'privileges_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_privileges');
    }
};
