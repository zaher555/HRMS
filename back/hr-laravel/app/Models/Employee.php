<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'phone',
        'salary',
        'hire_date',
        'ssn',
        'address',
        'department_id',
        'gender',
        'doa',
        'check_in',
        'check_out'
    ];
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }
}
