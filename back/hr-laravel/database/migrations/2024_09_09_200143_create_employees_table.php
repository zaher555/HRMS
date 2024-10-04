<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone');
            $table->decimal('salary', 10, 2);
            $table->date('hire_date');
            $table->string('ssn')->unique();
            $table->text('address');
            $table->unsignedBigInteger('department_id');
            $table->enum('gender', ['male', 'female']);
            $table->date('doa');
            $table->time('departure_time')->nullable();   
            $table->date('date_of_birth')->nullable();    
            $table->string('nationality', 100)->nullable(); 
            $table->time('arrival_time')->nullable(); 
            $table->timestamps();
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
        });
    }
    public function down()
    {
        Schema::dropIfExists('employees');
    }
};
