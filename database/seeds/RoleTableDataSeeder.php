<?php

use Illuminate\Database\Seeder;
use App\Model\Role;

class RoleTableDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['name' => 'masteradmin','display_name'=>'Master Admin','description'=>'Master Access, who has the full access.']);
        Role::create(['name' => 'notificationusers','display_name'=>'NotificationUsers','description'=>'These Users will get notified on the User creation,comments and responses,new forums']);
    }
}
