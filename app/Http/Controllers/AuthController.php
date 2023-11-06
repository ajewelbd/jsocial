<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                "email" => "required|email",
                "password" => "required"
            ]);


            if (!Auth::attempt($request->only(["email", "password"]))) {
                throw ValidationException::withMessages([
                    "status" => "failed",
                    "message" => "Invalid credentials"
                ]);
            }

            $user = User::where("email", $request->email)->first();
            return response()->json([
                "status" => "success",
                "message" => "Login successfull",
                "token" => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "status" => "failed",
                "message" => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            return response()->json([
                "status" => "success",
                "message" => "Logout successfull"
            ]);
        } catch (Exception $e) {
            return response()->json([
                "status" => "failed",
                "message" => $e->getMessage()
            ], 500);
        }
    }
}
