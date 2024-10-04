<?php

namespace App\Http\Controllers;

use App\Models\department;
use App\Models\employee;
use App\Models\Salary_actions;
use Carbon\Carbon;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(){
        $employees=employee::with('department')->get();
        return response()->json(['employee'=>$employees],200);
    }
    public function store(Request $request){
        $validated=$request->validate([
            'name'=>"required|min:3|string|max:255",
            'phone'=>"required|max:15",
            'salary'=>"required|numeric",
            'hire_date'=>"required|date_format:Y-m-d|after-or-equal:2008-01-01",
            'ssn'=>"required|min:14|unique:employees,ssn",
            'address'=>"required|string|max:255",
            'department_id'=>"required|numeric|exists:departments,id",
            'gender'=>"required|in:male,female",
            'doa'=>"required|date_format:Y-m-d|after-or-equal:2008-01-01",
            'check_in'=>"required|date_format:H:i",
            'check_out'=>"required|date_format:H:i",
        ]);
      

        $employee=employee::create([
            'name'=>$validated['name'],
            'phone'=>$validated['phone'],
            'salary'=>$validated['salary'],
            'hire_date'=>$validated['hire_date'],
            'ssn'=>$validated['ssn'],
            'address'=>$validated['address'],
            'department_id'=>$validated['department_id'],
            'gender'=>$validated['gender'],
            'doa'=>$validated['doa'],
            'check_in'=>$validated['check_in'],
            'check_out'=>$validated['check_out'],

        ]);

        return response()->json(['message' => 'employee added successfully',
        'employee' => $employee], 201);

    }

    public function show(String $id){
        $employee=employee::with('department')->find($id);
        return response()->json([
            'employee'=>$employee,
            'status'=>200
        ],200);
    }
    public function update(Request $request,string $id){
        $employee=Employee::with('department')->find($id);
        $validated=$request->validate([
            'name'=>"required|min:3|string|max:255",
            'phone'=>"required|max:15",
            'salary'=>"required|numeric",
            'hire_date'=>"required|date_format:Y-m-d|after-or-equal:2008-01-01",
            'ssn' => [
                'required',
                'numeric',
                function ($attribute, $value, $fail) use ($employee) {
                    if ($value !== $employee->ssn && Employee::where('ssn', $value)->exists()) {
                        
                            $fail('The ssn has already been taken.');
                        
                    }
                }
            ],
            'address'=>"required|string|max:255",
            'department_id'=>"required|numeric|exists:departments,id",
            'gender'=>"required|in:male,female",
            'doa'=>"required|date_format:Y-m-d|after-or-equal:2008-01-01",
            'check_in'=>"required|date_format:H:i",
            'check_out'=>"required|date_format:H:i",
        ]);
        //check for dept existance
         
    if (!$employee) {
        return response()->json(['error' => 'Employee not found'], 404);
    }

    $employee->update([
        'name'=>$validated['name'],
        'phone'=>$validated['phone'],
        'salary'=>$validated['salary'],
        'hire_date'=>$validated['hire_date'],
        'ssn'=>$validated['ssn'],
        'address'=>$validated['address'],
        'department_id'=>$validated['department_id'],
        'gender'=>$validated['gender'],
        'doa'=>$validated['doa'],
        'check_in'=>$validated['check_in'],
        'check_out'=>$validated['check_out'],
    ]);


        return response()->json([
            'message'=>"employee updated successfully",
            'employee'=>$employee
        ],201);
    }
    public function destroy( String $id){
        $employee=Employee::find($id);

    if (!$employee) {
        return response()->json(['error' => 'Employee not found'], 404);
    }

    $employee->delete();
      
        return response()->json([
           'message'=>"employee deleted successfully",
            'employee'=>$employee
        ],201);

    }

    public function netSalary($empId)
    {
        //get basic salary of employee
        $employee=employee::find($empId);
        $basicSalary=$employee->salary;
        //get total bonuses
        $totalBonuses = Salary_actions::where('employee_id', operator: $empId)
            ->where('type', 'bonus')
            ->sum(column: 'amount');
        // //get total deduction
        $totalDeductions = salary_actions::where('employee_id', $empId)
            ->where('type', 'deduction')
            ->sum('amount');
        $netSalary = $basicSalary + $totalBonuses - $totalDeductions;
        return $netSalary;
    }

    public function search(Request $request)
    {
        $employeeName = $request->input('name');
        $month = $request->input('month'); 
        $year = $request->input('year');   

        $startOfMonth = Carbon::create($year, $month, 1)->startOfMonth();
        $endOfMonth = Carbon::create($year, $month, 1)->endOfMonth();

        $employeeData = Employee::with(['department', 'attendances' => function($query) use ($startOfMonth, $endOfMonth) {
            
            $query->whereBetween('date', [$startOfMonth, $endOfMonth]);
        }])
        ->where('name', 'LIKE', '%' . $employeeName . '%') 
        ->get()
        ->map(function($employee) {
            return [
                'name' => $employee->name,
                'basic_salary' => $employee->salary,
                'department' => $employee->department->name,
                'total_attendances' => $employee->attendances->count()
            ];
        });

        return response()->json($employeeData);
    }
}
