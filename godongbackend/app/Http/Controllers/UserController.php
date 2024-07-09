<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    function register(Request $req)
    {
        $user = new User;
        $user->nama = $req->input('nama');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));
        $user->phone = $req->input('phone');
        $user->address = $req->input('address');
        $user->status = $req->input('status');
        $user->save();
        return $user;
    }
   // UserController.php

public function login(Request $req)
{
    // Validate the request data
    $req->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    // Find the user by email
    $user = User::where('email', $req->email)->first();

    // Check if the user exists and the password is correct
    if (!$user || !Hash::check($req->password, $user->password)) {
        return response()->json(["Error" => "Sorry, email or password doesn't match"], 401);
    }

    // Return success response with user status
    return response()->json([
        'success' => true,
        'status' => $user->status,
        
    ], 200);
}
    
public function deleteUser($id)
{
    // Find the user by ID
    $user = User::find($id);

    // Check if the user exists
    if (!$user) {
        return response()->json(["Error" => "User not found"], 404);
    }

    // Delete the user
    $user->delete();

    // Return success response
    return response()->json(["Message" => "User deleted successfully"], 200);
}
    public function index()
    {
        // Fetch all users from the database
        $users = User::all();

        // Return users as JSON response
        return response()->json($users);
    }    
    public function getoneuser($email)
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(["Error" => "User not found"], 404);
        }

        return response()->json($user);
    }
}
