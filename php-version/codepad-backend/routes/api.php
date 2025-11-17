<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CodeController;

Route::post('/codes', [CodeController::class, 'store']);
Route::get('/codes', [CodeController::class, 'index']);
Route::get('/codes/{id}', [CodeController::class, 'show']);
Route::put('/codes/{id}', [CodeController::class, 'update']);
Route::delete('/codes/{id}', [CodeController::class, 'destroy']);
Route::get('/codes-grouped', [CodeController::class, 'grouped']);

