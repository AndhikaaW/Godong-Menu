<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function register(request $req){
        $user = new User;
        $user->nama=$req->input('nama');
        $user->email=$req->input('email');
        $user->password=$req->input('password');
        $user->status=$req->input('status');
        $user->save();
        return $req;
    }
}
