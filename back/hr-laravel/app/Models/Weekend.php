<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weekend extends Model
{
    protected $fillable = [
        'name'
    ];
    use HasFactory;
    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }
}
