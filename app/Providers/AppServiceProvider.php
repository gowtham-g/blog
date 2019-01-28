<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use App\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        Validator::extend('fake_check', function ($attribute, $value, $parameters, $validator) {
            $fake = fake_list();
            $result = array_search($value, $fake);
            if ($result == false) {
                return true;
            } else {
                return false;
            }
        });

        Validator::extend('validation_password', function ($attribute, $value, $parameters, $validator) {
            if (Auth::attempt(['id' => Auth::id(), 'password' => $value])) {
                return true;
            } else {
                return false;
            }
        });

        Validator::extend('user_detail', function ($attribute, $value, $parameters, $validator) {
            $input = Input::all();
            $user = User::find(auth()->id());
            if($input['designation'] == $user->designation && $input['workspace'] == $user->workspace) {
                return true;
            } elseif ($input['designation'] != $user->designation && $input['workspace'] != $user->workspace) {
                return true;
            } else {
                return false;
            }
        });

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
