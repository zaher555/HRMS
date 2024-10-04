<?php

namespace App\Http\Controllers;
use App\Models\Group;
use App\Models\Group_Privilege;
use App\Models\Privilege;

use Illuminate\Http\Request;

class PrivilegeController extends Controller
{
    public function storePervilege(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'groupName' => 'required|string',
            'permissions' => 'required|array',
        ]);

        // Create or retrieve the group
        $group = Group::firstOrCreate(['name' => $validatedData['groupName']]);

        // Iterate over permissions and process them
        foreach ($validatedData['permissions'] as $permission) {
            // Check if 'add' is true for this permission
            if ($permission['add'] === true) {
                // Find the privilege by page name
                $privilege = Privilege::where('name', 'add')->first();
                // return $privilege;
                // Check if privilege exists
                //     Create the relationship in the Group_Privilege table
                    Group_Privilege::create([
                        'privileges_id' => $privilege->id,
                        'group_id' => $group->id,
                        // If you want to save the actions (remove, update, show), you might need additional columns
                        // 'can_remove' => $permission['remove'] ?? false,
                        // 'can_update' => $permission['update'] ?? false,
                        // 'can_show' => $permission['show'] ?? false,
                    ]);
            }
            if ($permission['remove'] === true) {
                // Find the privilege by page name
                $privilege = Privilege::where('name', 'remove')->first();
                // return $privilege;
                // Check if privilege exists
                //     Create the relationship in the Group_Privilege table
                    Group_Privilege::create([
                        'privileges_id' => $privilege->id,
                        'group_id' => $group->id,
                        // If you want to save the actions (remove, update, show), you might need additional columns
                        // 'can_remove' => $permission['remove'] ?? false,
                        // 'can_update' => $permission['update'] ?? false,
                        // 'can_show' => $permission['show'] ?? false,
                    ]);
            }
            if ($permission['update'] === true) {
                // Find the privilege by page name
                $privilege = Privilege::where('name', 'update')->first();
                // return $privilege;
                // Check if privilege exists
                //     Create the relationship in the Group_Privilege table
                    Group_Privilege::create([
                        'privileges_id' => $privilege->id,
                        'group_id' => $group->id,
                        // If you want to save the actions (remove, update, show), you might need additional columns
                        // 'can_remove' => $permission['remove'] ?? false,
                        // 'can_update' => $permission['update'] ?? false,
                        // 'can_show' => $permission['show'] ?? false,
                    ]);
            }
            if ($permission['show'] === true) {
                // Find the privilege by page name
                $privilege = Privilege::where('name', 'show')->first();
                // return $privilege;
                // Check if privilege exists
                //     Create the relationship in the Group_Privilege table
                    Group_Privilege::create([
                        'privileges_id' => $privilege->id,
                        'group_id' => $group->id,
                        // If you want to save the actions (remove, update, show), you might need additional columns
                        // 'can_remove' => $permission['remove'] ?? false,
                        // 'can_update' => $permission['update'] ?? false,
                        // 'can_show' => $permission['show'] ?? false,
                    ]);
            }
        }

        return response()->json(data: ['message' => 'Privileges saved successfully']);
    }



    public function getPermissions()
    {
        $privileges=Privilege::all();
        return response()->json($privileges);
    }
}
