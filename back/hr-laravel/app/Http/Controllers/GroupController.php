<?php

namespace App\Http\Controllers;
use App\Models\group;

use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index(){
        $groups=group::with('privileges')->get();
        return response()->json([
            'group'=>$groups],200);

    }
    public function store(Request $request){
        $validated=$request->validate([
            'name'=>'required|string|min:2|max:255',
            'privileges_id'=>'array|required',
            'privileges_id.*'=>'numeric|exists:privileges,id'
        ]);

       $group= group::create([
           'name'=>$validated['name']]);
       $group->privileges()->attach($validated['privileges_id']);

        return response()->json([
           'message'=>'Group created successfully',
            'group'=>$group->load('privileges')
        ],201);
    }
    public function show(string $id){
        $group=group::with('privileges')->find($id);
        if($group){
            return response()->json(['group'=>$group]);
        }
        return response()->json(['message'=>'Group not found'],404);

    }
    public function update(Request $request,Group $group ){
        $validated=$request->validate([
            'name'=>'required|string|min:2|max:255',
            'privileges_id'=>'array|required',
            'privileges_id.*'=>'numeric|exists:privileges,id'
        ]);

       $group->update([
           'name'=>$validated['name']]);
       $group->privileges()->sync($validated['privileges_id']);

        return response()->json([
           'message'=>'Group created successfully',
            'group'=>$group->load('privileges')
        ],201);
    }
    public function destroy(Group $group){
        $group->delete();
        return response()->json(['message'=>'Group deleted successfully'],201);

    }
    
}
