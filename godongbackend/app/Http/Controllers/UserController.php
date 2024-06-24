<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    function register(Request $req){
        $user = new User;
        $user ->nama=$req->input('nama');
        $user ->email=$req->input('email');
        $user ->password= Hash::make($req->input('password'));
        $user ->status=$req->input('status');
        $user->save();
        return $user;
    }
    function login(Request $req)
    {
        $user = User::where('email', $req->email)->first();
        
        if (!$user || !Hash::check($req->password, $user->password)) {
            return ["Error" => "Sorry, email or password doesn't match"];
        }
        return true;
    }
}
