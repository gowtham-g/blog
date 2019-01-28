<?php

use Illuminate\Database\Seeder;
use App\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'user_name' => 'johndennisgt',
            'full_name' => 'John Dennis G.T',
            'email' => 'gt.johndennis@gmail.com',
            'password' => '123456',
            'is_admin' => 1,
            'remember_token' => str_random(10),
        ]);
    }
}
