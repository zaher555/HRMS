<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalaryActionResource extends JsonResource
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
            'date'=> $this->date ,
            'type'=> $this->type ,
            'amount'=> $this->amount ,
            'hours'=> $this->hours ,
            'details'=> $this->details ,
            'attendance_id'=> $this->attendance_id ,
            'employee_id'=> $this->employee_id ,
            'created_at'=> $this->created_at ,
            'updated_at'=> $this->updated_at ,
        ];
    }
}
