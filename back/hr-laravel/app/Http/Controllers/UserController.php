<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\user_register;

class UserController extends Controller
{
    public function index(){
        $admins=user_register::with('group.privileges')->get();
        return response()->json(['user'=>$admins],200);
    }
    public function store(Request $request)
    {   
        $validateData=$request->validate([
            'fullname' =>['required','string','regex:/^[\pL\s\-]+$/u'],
            'email'=>['required','string','email','unique:user_register,email'],
            'username'=>['required','min:5','string'],
            'password'=>['required','string','min:8'],
            'group_id'=>['required','exists:groups,id'],
        ]);
        $user = user_register::create([
            'fullname' => $validateData['fullname'],
            'email' => $validateData['email'],
            'password' =>bcrypt( $validateData['password']),
            'username' => $validateData['username'],
            'group_id' => $validateData['group_id'],

        ]);
        return response()->json([
            'message' => 'User added successfully!',
            'user'=>$user], 201);
        }
    public function show(String $id){
        $user=user_register::with('group.privileges')->find($id);
        return response()->json(['user'=>$user]);
    }
    public function update(Request $request,String $id)
    {  
        $user=user_register::with('group.privileges')->find($id);

        $validateData=$request->validate([
            'fullname' =>['required','string','regex:/^[\pL\s\-]+$/u'],
            'email'=>['required','string','email', function ($attribute,$value,$fail) use ($user){
                if($value !== $user->email && user_register::where('email',$value)->exists()){

                    $fail('user email already exists');
                }
            }],
            'username'=>['required','min:5','string'],
            'group_id'=>['required','exists:groups,id'],
        ]);
        $user->update([
            'fullname' => $validateData['fullname'],
            'email' => $validateData['email'],
            'username' => $validateData['username'],
            'group_id' => $validateData['group_id'],

        ]);
        return response()->json([
            'message' => 'User updated successfully!',
            'user'=>$user], 201);
        }
    public function destroy($id)
    {
        $user=user_register::find($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully!',
        'user' => $user], 201);
    }
}
