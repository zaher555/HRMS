<?php

namespace App\Http\Controllers;

use App\Models\GeneralSettings;
use Illuminate\Http\Request;

class GeneralSettingsController extends Controller
{
    public function index()
    {
        $generalSettings = GeneralSettings::all(); 
        return response()->json(['GeneralSettings' => $generalSettings]);
    }
    public function show($id) {
        $generalSettings = GeneralSettings::find($id);
        if (!$generalSettings) {
            return response()->json(['error' => 'Not Found'], 404);
        }

        return response()->json(['generalSettings' => $generalSettings]);
    }
    public function store(Request $request)
    {
      
        $generalSettings = $request->validate([
            'add_ons' => 'required|integer', 
            'discount' => 'required|integer',
        ]);

     
        GeneralSettings::create($generalSettings);

        return response()->json([
            'message' => 'General settings added successfully',
            'recently_added' => $generalSettings,
        ], 201); 
    }
    public function update(Request $request, $id)
    {
        $selectedone=GeneralSettings::find($id);
       
        $validatedData = $request->validate([
            'add_ons' => 'required|integer',
            'discount' => 'required|integer',
        ]);

      
        $selectedone->update($validatedData);

    
        return response()->json([
            'message' => 'General settings updated successfully',
            'recently_updated' => $selectedone,
        ], 200); 
    }

}
