<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->id ,
            'employee_id'=> $this->employee_id ,
            'weekend_id'=> $this->weekend_id ,
            'holiday_id'=> $this->holiday_id ,
            'status'=> $this->status ,
            'check_in'=> $this->check_in ,
            'check_out'=> $this->check_out ,
            'bonus_value'=> $this->bonus_value ,
            'deduction_value'=> $this->deduction_value ,
            'date'=> $this->date ,
            'hours'=> $this->hours ,
            'created_at'=> $this->created_at ,
            'updated_at'=> $this->updated_at ,
        ];
    }
}
