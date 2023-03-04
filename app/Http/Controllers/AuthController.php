<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{   
    
    /**
     * Return Array data of error messages set
     * @return array 
     */

    protected function loginErrors(): array
    {
        return [
            "email.required" => _t("Email cannot be empty!"),
            "email.email" => _t( "The email field must be a valid email address."),
            "password.required" => _t("The Password is required")
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function login( Request $request ): JsonResponse
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ], $this->loginErrors() );

        if( $validator->fails() ) {
            return response()->json([
                "code" => Response::HTTP_UNAUTHORIZED,
                'status' => 'failed', 
                'message' =>  _t("Invalid email or password"), 
                "errors" => $validator->errors(),
                'data' => []
            ], Response::HTTP_UNAUTHORIZED);
        }
        $credentials = $request->only('email', 'password');

        if(auth()->attempt($credentials, $request->filled('remember'))) {
            $user = User::where(['email' => $request->email ] )->first();
            $user->token = $user->createToken(env("APP_TOKEN", ''))->plainTextToken;
            return response()->json([
                'code' => Response::HTTP_OK,
                'status' => "success", 
                "data" => $user,
                "message" => _t("User has been logged successfully.")
            ],Response::HTTP_OK);
        }
        
        return response()->json([
            "code" => Response::HTTP_UNAUTHORIZED,
            "status" => "failed",
            "data" => [
                "user" => [],
            ],
            "message" => _t("Invalid email or password")
        ], Response::HTTP_UNAUTHORIZED);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function register( Request $request ): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'alpha_num', 'min:8'],
            'confirmPassword' => ['required', 'min:8', 'same:password'],
        ]);

        if($validator->fails()) {
            return response()->json([
                "code" => Response::HTTP_UNAUTHORIZED,
                'status' => "failed", 
                'message' => _t("There is an error while registering user"), 
                'errors' => $validator->errors(),
                "data" => []
            ], Response::HTTP_UNAUTHORIZED);
        }
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'email_verified_at' => now()
        ]);
        $user->assignRole('Admin');
        $user->token = $user->createToken(env("APP_TOKEN", ''))->plainTextToken;


        return response()->json([
            'status' => "success", 
            'data' => $user,
            "message" => _t("User has been created successfully" ),
            "code" => Response::HTTP_CREATED
        ], Response::HTTP_CREATED);
    }

    public function me():JsonResponse 
    {
        return response()->json([
            "code" => Response::HTTP_OK,
            "status" => 'success',
            "data" => [
                "user" => Auth::user()
            ],
            "message" => _t("User profile has successfully retreived")
        ], Response::HTTP_OK);
    } 

    public function logout( Request $request ):JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "message" => _t( "User logged out successfully."),
            "code" => Response::HTTP_OK,
            "status" => "success"
        ]);
    }

}
