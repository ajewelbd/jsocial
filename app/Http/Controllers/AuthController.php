<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                "email" => "required|email",
                "password" => "required"
            ]);

            if ($validate->fails()) {
                return response()->json([
                    "status" => "failed",
                    "message" => $validate->errors()
                ], 401);
            }

            if (!Auth::attempt($request->only(["email", "password"]))) {
                return response()->json([
                    "status" => "failed",
                    "message" => "Invalid credentials"
                ], 401);
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
