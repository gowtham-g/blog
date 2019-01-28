<?php

use Illuminate\Database\Seeder;
use App\Model\RoleUser;

class RoleUserTableDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RoleUser::insert([
            ['user_id' => 1,'role_id'=>1],
        ]);
    }
}
