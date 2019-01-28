<?php

namespace App\Jobs;

use App\Notifications\UserForumCreate;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\User;
use Notification;


class UserForumCreateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $tries = 2;
    public $user;
    public $post;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user, $post)
    {
        $this->user = $user;
        $this->post = $post;


    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $admin_user = User::withRole('admin')->get();
        foreach ($admin_user as $users) {
            Notification::send($users, new UserForumCreate($this->user,$this->post));
            $users->increment('forum_count');
        }
    }
}
