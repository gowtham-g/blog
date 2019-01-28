<?php


 namespace App\Services;

class UserService
{
    public static function getToken()
    {
        return hash_hmac('sha256', str_random(40), config('app.key'));
    }


}