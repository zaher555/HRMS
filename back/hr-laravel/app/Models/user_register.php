<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class user_register extends Model
{
    use HasFactory , HasApiTokens;
    protected $table='user_register';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
       'id','fullname', 'email', 'password', 'username', 'group_id'
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
