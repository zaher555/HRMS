<?php

namespace App\Http\Controllers;
use App\Models\department;

use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index(){
        $departments=department::get();
        return response()->json(['department'=>$departments]);
    }
   
     public function store(Request $request){
        $department= $request->validate([
            'department_name'=>'required|string|max:255'
        ]);
   
        department::create($request->all());
        return response()->json([
            'message' => 'department added successfully',
            'department'=>$department],201
            );
    }
    public function show(department $department){
     
        $department=department::find($department);
        return response()->json(['department'=>$department]);
    }

     public function update(Request $request,department $department){
        $request->validate([
            'department_name'=>'required|string|max:255'
        ]);
   
        $department->update($request->all());
        return response()->json([
            'message' => 'department updated successfully',
            'department'=>$department],201
            );
    }
     public function destroy(department $department){
        $department->delete();
        return response()->json([
            'message'=>'department deleted successfully',
            'department'=>$department
        ],201);
    
     }
}
