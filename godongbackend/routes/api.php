<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register',[UserController::class,'register']);
Route::post('login', [UserController::class, 'login']);
Route::get('getUser', [UserController::class, 'index']);
Route::get('/user/{email}', [UserController::class, 'getoneuser']);
Route::delete('deleteuser/{id}',[UserController::class,'deleteuser']);

Route::get('categories', [CategoryController::class, 'index']);
Route::post('categoriesAdd', [CategoryController::class, 'store']);
// Route::post('categories', [CategoryController::class, 'store']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
Route::post('/editcategories', [CategoryController::class, 'update']);

// Endpoint baru untuk mendapatkan kategori beserta menu items
Route::get('/categories/{id}/menu-items', [CategoryController::class, 'getMenuItemsByCategory']);

// Route::get('getCategory', [UserController::class, 'getCategory']);
Route::post('contact',[ContactController::class, 'contact']);
Route::get('contact', [ContactController::class, 'index']);
// Route::get('contactcol', [ContactController::class, 'getColumns']);
Route::delete('/contact/{id}', [ContactController::class, 'destroy']);

Route::post('/menu-items', [MenuController::class, 'store']);
Route::get('/menu-items', [MenuController::class, 'index']);
Route::delete('/menu-items/{id}', [MenuController::class, 'destroy']);
Route::post('/editmenu', [MenuController::class, 'update']);
Route::post('/upload-profile-picture', [UserController::class, 'uploadProfilePicture']);
