<?php

use Illuminate\Database\Seeder;
use App\Model\Point;

class PointTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Point::create(['type' => 'Like','slug'=>'like','points'=>'5']);
        Point::create(['type' => 'Collection','slug'=>'collection','points'=>'10']);
        Point::create(['type' => 'Subscribe','slug'=>'subscribe','points'=>'10']);
        Point::create(['type' => 'Follow user','slug'=>'follow-user','points'=>'15']);
        Point::create(['type' => 'Update Detail','slug'=>'user-detail','points'=>'20']);
        Point::create(['type' => 'Post Comment','slug'=>'post-comment','points'=>'15']);
        Point::create(['type' => 'Ask Question','slug'=>'ask-question','points'=>'20']);
        Point::create(['type' => 'Post response','slug'=>'post-response','points'=>'50']);
        Point::create(['type' => 'Accept Answer','slug'=>'accept-answer','points'=>'100']);
        Point::create(['type' => 'Upvote','slug'=>'upvote','points'=>'5']);
        Point::create(['type' => 'Downvote','slug'=>'downvote','points'=>'5']);
        Point::create(['type' => 'Response Comment','slug'=>'response-comment','points'=>'15']);
    }
}
