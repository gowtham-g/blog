<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AdminUserSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(RoleTableDataSeeder::class);
        $this->call(PermissionsTableDataSeeder::class);
        $this->call(RoleUserTableDataSeeder::class);
        $this->call(PointTableSeeder::class);
    }
}
