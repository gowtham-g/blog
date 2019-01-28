<?php

use Illuminate\Database\Seeder;
use App\Model\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'type' => 'Tutorials',
            'slug' => 'tutorials',
        ]);
        Category::create([
            'type' => 'Forum',
            'slug' => 'forum',
        ]);
        Category::create([
            'type' => 'News',
            'slug' => 'news',
        ]);
    }
}
