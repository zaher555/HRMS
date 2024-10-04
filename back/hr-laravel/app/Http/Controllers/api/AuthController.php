<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\admin;
use App\Models\User;
use App\Models\user_register;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Exception;

class AuthController extends Controller
{
    
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = user_register::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            // Generate a token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'token' => $token,
                'full_name' => $user->fullname
            ],200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid email or password'
            ], 401);
        }
    }

    public function logout(Request $request): JsonResponse
    {  
        if ($request->user()) {

            $request->user()->currentAccessToken()->delete();
    
            return response()->json(['message' => 'Logout successful'], 200);
        }
    
   
        return response()->json(['message' => 'Unauthenticated'], 401);
    }
    
}
