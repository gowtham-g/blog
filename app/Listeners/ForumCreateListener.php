<?php

namespace App\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForumCreateEmail;
use App\Jobs\UserForumCreateJob;

class ForumCreateListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object $event
     * @return void
     */
    public function handle($event)
    {
        $user = $event->user;
        $post = $event->post;
        $job = (new UserForumCreateJob($user, $post))->onQueue('admin');
        dispatch($job);
        Mail::to($user->email)->queue(new ForumCreateEmail($user, $post));
    }
}
