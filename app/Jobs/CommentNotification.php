<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Model\Post;
use App\User;
use Notification;
use App\Notifications\UserPostComment;

class CommentNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $tries = 2;
    public $comment_user;
    public $post;
    public $post_user;
    public $post_category;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($comment_user, $post, $post_user, $post_category)
    {
        $this->comment_user = $comment_user;
        $this->post = $post;
        $this->post_user = $post_user;
        $this->post_category = $post_category;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $admin_user = User::withRole('admin')->get();
        if($this->post_user->is_admin == 0){
            $maillist = $this->post_user->load(['unsubscribe_email' => function ($query) {
                $query->where('slug', 'comment')->where('type','notification');
            }]);
            if(count($maillist->unsubscribe_email) == 0){
                $admin_user['post_user'] = $this->post_user;
            }
        }
        foreach ($admin_user as $user) {

            $user->notify(new UserPostComment($this->post, $this->comment_user, $this->post_user, $this->post_category,$user));
            if($user->is_admin == 1){
                $user->increment('comment_count');
            }
        }
    }
}
