<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//Peticiones
Route::post('/peticiones/store', [\App\Http\Controllers\PeticionesController::class, 'store']);
Route::get('/peticiones/listado', [\App\Http\Controllers\PeticionesController::class, 'list']);
Route::get('/peticiones/firmar/{id}', [\App\Http\Controllers\PeticionesController::class, 'firmar']);
Route::put('/peticiones/estado/{id}', [\App\Http\Controllers\PeticionesController::class, 'cambiarEstado']);
Route::get('/mispeticiones/', [\App\Http\Controllers\PeticionesController::class, 'listMine']);
Route::get('/users/firmas', [\App\Http\Controllers\UsersController::class, 'peticionesFirmadas']);
Route::resource('peticiones', \App\Http\Controllers\PeticionesController::class);
//JWT
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');
});

