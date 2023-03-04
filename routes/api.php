<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('localization')->group(function(){
    Route::prefix('v1')->group(function() {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);

        Route::middleware('auth:sanctum')->group( function(){
            Route::post('me', [AuthController::class, 'me']);
            Route::post('logout', [AuthController::class, 'logout']);
        });
    });
});

Route::get('/localizations', function(){
    return response()->json([
        "code" => Response::HTTP_OK,
        "message" => _t("All Languages has been retreived."),
        "status" => "success",
        "data" => [
            'langs' => config('translations')
        ] 
    ], Response::HTTP_OK);
});
