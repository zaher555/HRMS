<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\dashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GeneralSettingsController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\HolidayController;
use App\Http\Controllers\PrivilegeController;
use App\Http\Controllers\Salary_actionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeekendController;
use Illuminate\Http\Request;
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

Route::get('/' , function(){
    return 'Hello';}
    ) ;
    
Route::post('/login', [AuthController::class, 'login'])->name('login');
// Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


// Route::middleware('auth:sanctum')->group(function () {
//     Route::apiResource('holidays',HolidayController::class);
// });


Route::apiResource('attendances',AttendanceController::class);

Route::apiResource('salaryActions',Salary_actionController::class);

Route::get('holidays/month/{month}', [HolidayController::class, 'searchByMonth']);

Route::resource('users', UserController::class);
Route::resource('employees', EmployeeController::class);
Route::delete('employees/{id}/delemployee',[EmployeeController::class,'destroy']);
Route::resource('department', DepartmentController::class);
Route::resource('group', GroupController::class);
Route::resource('weekend', WeekendController::class);
Route::resource('attendance', AttendanceController::class);
Route::get('attendance/searchByname/{empName}/{from}/{to}',[AttendanceController::class,'searchByname']);
Route::resource('salaryaction', Salary_actionController::class);
Route::get('/dash',[dashboardController::class,'getCounts']);

Route::resource('holidays',HolidayController::class);
Route::resource('general-settings', GeneralSettingsController::class);
Route::get('/employee-netsalay/{id}',[EmployeeController::class,'netSalary']);
Route::get('/employee-search/search', [EmployeeController::class, 'search']);

Route::get('/reports', [AttendanceController::class, 'getMonthlyReport']);
Route::get('/reports/{month}/{year}', [AttendanceController::class, 'getMonthlyReport']);

Route::post('privilege',[PrivilegeController::class,'storePervilege']);
Route::get('privilege',[PrivilegeController::class,'getPermissions']);