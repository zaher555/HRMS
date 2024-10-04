<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $fillable = [
        'id', 'employee_id','weekend_id','holiday_id','status','check_in','check_out', 'bonus_value','deduction_value', 'date','hours','general_settings_id'
     ];
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function salaryAction()
    {
        return $this->belongsTo(Salary_actions::class);
    }

    public function weekend()
    {
        return $this->belongsTo(Weekend::class);
    }

    public function holiday()
    {
        return $this->belongsTo(Holiday::class);
    }
    public function generalSetting()
    {
        return $this->belongsTo(GeneralSettings::class);
    }
}
