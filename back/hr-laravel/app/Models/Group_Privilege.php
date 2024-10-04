<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group_Privilege extends Model
{
    use HasFactory;
    protected $table = 'group_privileges';
    protected $fillable = [
        'privileges_id','group_id'
     ];
}
