<?php

namespace App\Http\Controllers;
use App\Models\Holiday;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HolidayController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 200,
            'holidays' => Holiday::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'holiday_date' => 'required|date_format:Y-m-d',
        ]);

        $holiday =Holiday::create($validated);
         return response()->json([
            'status' => 201,
            'holiday' => $holiday,
            'message' => 'Holiday added successfully.'
        ]);
    }

    public function show(String $id)
    {
        $holiday=Holiday::findOrFail($id);
        return response()->json(['holiday'=>$holiday],201);
    }
    public function update(Request $request, Holiday $holiday)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'holiday_date' => 'required|date_format:Y-m-d',
        ]);

        $holiday->update($validated);
        return $holiday;
    }

    public function destroy(Holiday $holiday)
    {
        $holiday->delete();
        return response()->json(['message' => 'Holiday deleted successfully']);
    }
}
