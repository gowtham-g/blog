<?php

use Illuminate\Database\Seeder;
use App\Model\Permission;

class PermissionsTableDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::create(['name' => 'post-editor','display_name'=>'Post-Editor','description'=>'Post Editing, Previewing is possible in this permission' ])->role()->attach([1]);
        Permission::create(['name' => 'news-editor','display_name'=>'News-Editor','description'=>'News Editing, Previewing is possible in this permission'])->role()->attach([1]);
        Permission::create(['name' => 'forum-editor','display_name'=>'Forum-Editor','description'=>'Forum Editing, Previewing is possible in this permission'])->role()->attach([1]);
        Permission::create(['name' => 'post-admin','display_name'=>'Post-Admin','description'=>'Post Publish, Approve, Disapprove is possible in this permission'])->role()->attach([1]);
        Permission::create(['name' => 'news-admin','display_name'=>'News-Admin','description'=>'News Publish, Approve, Disapprove is possible in this permission'])->role()->attach([1]);
        Permission::create(['name' => 'forum-admin','display_name'=>'Forum-Admin','description'=>'Forum Publish, Approve, Disapprove is possible in this permission'])->role()->attach([1]);
        Permission::create(['name' => 'tag-editor','display_name'=>'Tag Editor','description'=>'Tag editing, Tag image updating, Tag Category moving is possible and deleting tags is impossible'])->role()->attach([1]);
        Permission::create(['name' => 'tag-admin','display_name'=>'Tag-Admin','description'=>'Tag Deleting is Possible'])->role()->attach([1]);
        Permission::create(['name' => 'user-admin','display_name'=>'User-Admin','description'=>'users can create, permission can set to the user, Users category viewing is possible'])->role()->attach([1]);
        Permission::create(['name' => 'admin','display_name'=>'Admin','description'=>'Master Access, who has full access'])->role()->attach([1]);
    }
}
