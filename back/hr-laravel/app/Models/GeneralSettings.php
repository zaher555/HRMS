<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralSettings extends Model
{
    use HasFactory;
    // protected $table='general_settings';
    protected $fillable = [
        'add_ons', 
        'discount',
    ];
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
