<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class WelcomeTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function view_all_post()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
    
    /** @test */
    function a_user_can_view_single_post()
    {
        $post = factory('App\Model\Post')->create();
        dd($post);
        $response = $this->get('/'.$post->slug);
        $response->assertStatus($post);
    }
}
