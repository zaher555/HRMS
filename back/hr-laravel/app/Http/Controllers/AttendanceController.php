<?php

namespace App\Http\Controllers;
use App\Models\attendance;
use App\Models\department;
use App\Models\employee;
use App\Models\GeneralSettings;
use App\Models\Holiday;
use App\Models\weekend;
use Carbon\Carbon;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\Cast\String_;
use PhpParser\Node\Expr\FuncCall;

class AttendanceController extends Controller
{


    public function index(){
        $attendanceList=attendance::with('employee.department')->get();
        return response()->json(['attendance'=>$attendanceList],200);
    }

    public function store(Request $request)
    {
        $attendances=attendance::with('generalSetting','employee.department')->get();
           $starterDate=2008;
          
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            // 'employee_name' => 'required|exists:employees,name',
            'weekend_id' => 'nullable',
            'holiday_id' => 'nullable',
            'check_in' => 'required|date_format:H:i',
            'check_out' => 'required|date_format:H:i',
            'date' => 'required|date_format:Y-m-d|after-or-equal:2008-01-01',
            // 'general_settings_id' => 'required|numeric|exists:general_settings,id|in:1',
        ]);
        $existedAttendance=Attendance::where('employee_id',$validated['employee_id'])
        ->where('date',$validated['date'])
        ->first();
        if($existedAttendance){
            return response()->json(['message'=>'dublicate attendance record !']);
        }
        $validated = $request;
        
        $check_in = Carbon::parse($validated['check_in']);
        $check_out = Carbon::parse($validated['check_out']);
        
        $hours = $check_out->diffInHours($check_in);
        $status=$this->getStatus($hours);

        $validated['weekend_id']= $this->isweekend($validated['date']);
        $validated['holiday_id']= $this->isholiday($validated['date']);
       $generalSetting=GeneralSettings::first();
        foreach($attendances as $attendance)
        {
            if($attendance->generalSetting){
            $validated['general_settings_id']=$generalSetting->id;
            // $add_ons=$attendance->$generalSetting->adds_on;
        }
        else{
            $validated['general_settings_id']=null;
            // $add_ons=null;
       
        }}

        if ($validated['weekend_id']  ) {
            return response()->json([
                'message'=>'No attendance recorded on weekends.',200
           ]) ; 
        } elseif ($validated['holiday_id'] ) {
              return response()->json([
                'message'=>'No attendance recorded on Holidays.',200
             ]) ; 
        }
      
              $attendance = Attendance::create([
            'employee_id' => $validated['employee_id'],
            // 'employee_name' => $validated['employee_name'],
            'weekend_id' => $validated['weekend_id'],
            'holiday_id' => $validated['holiday_id'],
            'check_in' => $check_in,
            'check_out' => $check_out,
            'date' => $validated['date'],
            'general_settings_id'=>$generalSetting->id,
            'hours' => $hours,
            'status' => $status,
        ]);
        
      
      
        // dd($attendance->generalSetting);
             
        $add_ons=$generalSetting->add_ons;
        $discount=$generalSetting->discount;
        
        $empsalary = $attendance->employee->base_salary;
        $empCheck_in = Carbon::parse($attendance->employee->check_in); 
        $empCheck_out = Carbon::parse($attendance->employee->check_out);
    //    dd($empCheck_in);
        $diffInMinutesCheckIn = $check_in->diffInMinutes($empCheck_in);

        $diffInMinutesCheckOut = $check_out->diffInMinutes($empCheck_out);
        $shifthours=$empCheck_out->diffInHours($empCheck_in);
        if($shifthours > 0)
        {
            $min_salary=($empsalary/22)/$shifthours;
            $min_salary=$min_salary/60;
            
        }else{
            $min_salary=0;
        }
        
        $amounts=0;
      
        if($diffInMinutesCheckIn !=0){ 
            $amounts=$diffInMinutesCheckIn*($discount/60);
        
            $attendance->salaryAction()->create([
                'employee_id' => $validated['employee_id'],
                'attendance_id' => $attendance->id,
                'date' => $validated['date'],
                'type' =>'deduction' ,
                'amount' =>$amounts ,
                'hours' =>$diffInMinutesCheckIn/60 ,
                'details' =>'Deduction hours added' ,
                'created_at' => now(),
                'updated_at' => now(),
            ]);}


        if($diffInMinutesCheckOut !=0){ 
            $amounts=$diffInMinutesCheckOut*($add_ons/60);
            // $amounts=$amounts*$diffInMinutesCheckOut;
            // dd($amounts);
            $attendance->salaryAction()->create([
                'employee_id' => $validated['employee_id'],
                'attendance_id' => $attendance->id,
                'date' => $validated['date'],
                'type' =>'bonus',
                'amount' =>$amounts,
                'hours' =>$diffInMinutesCheckOut/60,
                'details' =>'Bouns hours added',
                'created_at' => now(),
                'updated_at' => now(),
            ]);}

            
            return response()->json([
                'message' => 'Attendance added successfully',
                'attendance' => $attendance,
                'hours' => $hours,
                'status' => $status,
            ], 201);
    
    }
    
    public function show($id){
        $attendance= attendance::with('employee.department')->find($id);
        if(!$attendance){
            return response()->json([
                'alert'=>'no record found'
            ],400);
        }
        return response()->json([
                'message'=>'attendance',
                'attendance'=>$attendance
            ],
            200);
        
    }

    public function update(Request $request,string $id){
        $attendance=attendance::with('employee.department')->find($id);
       
    
   
    $validated=$request->validate([
        'employee_id'=>'required|exists:employees,id',
        'weekend_id'=>'nullable',
        'holiday_id'=>'nullable',
        'check_in'=>'required|date_format:H:i',
        'check_out'=>'required|date_format:H:i', 
        'date' => 'required|date_format:Y-m-d|after-or-equal:2008-01-01',
        'general_settings_id' => 'required|numeric|exists:general_settings,id|in:1',

    ]);
    $existedAttendance=Attendance::where('employee_id',$validated['employee_id'])
    ->where('date',$validated['date'])
    ->first();
    if($existedAttendance){
        return response()->json(['message'=>'dublicate attendance record !']);
    }
    $validated = $request;
    $check_in = Carbon::parse($validated['check_in']);
    $check_out = Carbon::parse($validated['check_out']);
    
    
    $hours = $check_out->diffInHours($check_in);
    $status = $this->getStatus($hours);

    
    $validated['weekend_id'] = $this->isweekend($validated['date']);
    $validated['holiday_id'] = $this->isholiday($validated['date']);

    if ($validated['weekend_id']) {
        return response()->json([
            'message' => 'No attendance recorded on weekends.',
        ], 200);
    } elseif ($validated['holiday_id']) {
        return response()->json([
            'message' => 'No attendance recorded on holidays.',
        ], 200);
    }

    
    $attendance->update([
        'employee_id' => $validated['employee_id'],
        'weekend_id' => $validated['weekend_id'],
        'holiday_id' => $validated['holiday_id'],
        'check_in' => $check_in,
        'check_out' => $check_out,
        'date' => $validated['date'],
        'general_settings_id' => 1,
        'hours' => $hours,
        'status' => $status,
    ]);

    
    $add_ons = $attendance->generalSetting->add_ons;
    $discount = $attendance->generalSetting->discount;

    $empsalary = $attendance->employee->base_salary;
    $empCheck_in = Carbon::parse($attendance->employee->check_in); 
    $empCheck_out = Carbon::parse($attendance->employee->check_out);

    $diffInMinutesCheckIn = $check_in->diffInMinutes($empCheck_in);
    $diffInMinutesCheckOut = $check_out->diffInMinutes($empCheck_out);

    $shifthours = $empCheck_out->diffInHours($empCheck_in);

    $min_salary = ($empsalary / 22) / $shifthours;
    $min_salary = $min_salary / 60;
    $amounts = 0;

    
    if ($diffInMinutesCheckIn != 0) {
        $amounts = $diffInMinutesCheckIn * ($discount / 60);
        $attendance->salaryAction()->updateOrCreate(
            [
                'attendance_id' => $attendance->id,
                'type' => 'deduction',
            ],
            [
                'employee_id' => $validated['employee_id'],
                'date' => $validated['date'],
                'amount' => $amounts,
                'hours' => $diffInMinutesCheckIn / 60,
                'details' => 'Deduction hours updated',
                'updated_at' => now(),
            ]
        );
    }

    
    if ($diffInMinutesCheckOut != 0) {
        $amounts = $diffInMinutesCheckOut * ($add_ons / 60);
        $attendance->salaryAction()->updateOrCreate(
            [
                'attendance_id' => $attendance->id,
                'type' => 'bonus',
            ],
            [
                'employee_id' => $validated['employee_id'],
                'date' => $validated['date'],
                'amount' => $amounts,
                'hours' => $diffInMinutesCheckOut / 60,
                'details' => 'Bonus hours updated',
                'updated_at' => now(),
            ]
        );
    }

    
    return response()->json([
        'message' => 'Attendance updated successfully',
        'attendance' => $attendance,
        'hours' => $hours,
        'status' => $status,
    ], 200);

    }
    public function destroy(string $id){
        $attendance=attendance::findOrFail($id);
        $attendance->delete();
        return response()->json([
            'message'=>'attendance deleted successfully',
            'attendance'=>$attendance],
            
            201);
        

    }

    private function getStatus($hours){

        if($hours==0){
            return 'absent';
        }
        else{
                return 'present';
        }
    }

  

    public function getMonthlyReport($month = null , $year = null )
    {
        
        $month = $month ?: now()->month ;
        $year = $year ?: now()->year ;
        $report = DB::table('employees')
        ->join('attendances', 'attendances.employee_id', '=', 'employees.id')
        ->leftJoin('salary_actions', function ($join) {
            $join->on('salary_actions.attendance_id', '=', 'attendances.id');
        })
        ->join('departments', 'departments.id', '=', 'employees.department_id')
        ->select(
            'employees.name as employee_name',
            'departments.department_name as department_name',
            'employees.salary as basic_salary',
            DB::raw('COUNT(DISTINCT attendances.id) as total_attendance_days'),
            DB::raw('SUM(CASE WHEN salary_actions.type = "bonus" THEN salary_actions.hours ELSE 0 END) as additional_hours'),
            DB::raw('SUM(CASE WHEN salary_actions.type = "deduction" THEN salary_actions.hours ELSE 0 END) as discount_hours'),
            DB::raw('SUM(CASE WHEN salary_actions.type = "bonus" THEN salary_actions.amount ELSE 0 END) as total_addition'),
            DB::raw('SUM(CASE WHEN salary_actions.type = "deduction" THEN salary_actions.amount ELSE 0 END) as total_discount'),
            DB::raw('(employees.salary / 22) * COUNT(DISTINCT attendances.id) + SUM(CASE WHEN salary_actions.type = "bonus" THEN salary_actions.amount ELSE 0 END) - SUM(CASE WHEN salary_actions.type = "deduction" THEN salary_actions.amount ELSE 0 END) as net_salary'),
            DB::raw('SUM(CASE WHEN attendances.hours = 0 THEN 1 ELSE 0 END) as total_departure_days') 
        )
        ->whereMonth('attendances.date', $month)
        ->whereYear('attendances.date', $year)
        ->where('attendances.check_in', '!=', 0)
        ->groupBy('employees.id','employees.name','departments.department_name','employees.salary')
        ->get();

        
        return response()->json(['report'=>$report],201);
    }


    private Function isweekend  ($date){
        $dayOfWeek = Carbon::parse($date)->format('l'); 
        $weekend = weekend::where('name',$dayOfWeek)->first();     
            return $weekend ? $weekend->id : null;
          
    }
    private Function isholiday  ($date){
        $dayOfWeek = Carbon::parse($date)->format('l'); 
        $holiday = Holiday::where('holiday_date',$date)->first();     
           return $holiday ?$holiday->id :null;
          
    }
    public function searchByname($empName,$from,$to)
    {
        $employee = Employee::where('name', $empName)->first();

    if (!$employee) {
        return response()->json(['message' => 'Employee not found'], 404);
    }

    $empId = $employee->id; 

    $searchedAttendances = Attendance::with('employee.department')
    ->where('employee_id', $empId)
    ->whereBetween('date', [Carbon::parse($from)->startOfDay(), Carbon::parse($to)->endOfDay()])
    ->get();

    return response()->json($searchedAttendances);
    }
    
}