<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'email' => 'required|max:255',
            'password' => 'required|max:255',
        ]);
        $input = $request->all();
        $user = new User($input);
        $user->password = bcrypt($input['password']);
        $user->save();

        return response(['Message' => 'Usuario Registrado', 'Data' => $user], 200);
    }

    public function index()
    {
        $users = User::all();
        return response(['Message' => 'Usuarios', 'Data' => $users], 200);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response(['Message' => 'Usuario ' . $id, 'Data' => $user], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate(
            [
                'email' => 'required|max:255',
                'password' => 'required|max:255',
            ]
        );
        if (Auth::attempt($request->only('email', 'password'))){
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('cookie_token', $token, 60 * 24);
            Auth::login($user);
            return response(["token"=> $token], 200)->withoutCookie($cookie);
        }else{
            return response('Login Erroneo', 401);
        }
    }

    public function logout(){
        $cookie = Cookie::forget('cookie_token');
        return response(["Message"=>"Logout"])->withCookie($cookie);
    }
    public function peticionesFirmadas(Request $request)
    {
        $id = Auth::id();
        $usuario = User::findOrFail($id);
        $peticiones = $usuario->firmas;
        return $peticiones;
    }

}
