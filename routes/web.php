<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/','/dashboard');



Route::middleware(['auth','verified'])->group(function (){
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class,'index'])->name('dashboard');
    Route::resource('project', \App\Http\Controllers\ProjectController::class);
    Route::get('/task/my-task',[\App\Http\Controllers\TaskController::class,'myTask'])->name('task.myTasks');
    Route::resource('task',\App\Http\Controllers\TaskController::class);
    Route::resource('user',\App\Http\Controllers\UserController::class);
});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
