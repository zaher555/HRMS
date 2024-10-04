<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\group;
use App\Models\Privilege;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Privilege::factory()->count(5)->create();

        // Create some groups
        Group::factory()->count(3)->create();

        // Create some users
        User::factory()->count(10)->create();
    }
}
