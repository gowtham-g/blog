<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\User;
use App\Model\Post;

class ForumCreateEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    public $user;
    public $post;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user,Post $post)
    {
        $this->queue = 'forum';
        $this->user = $user;
        $this->post = $post;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('mail.forum_create',compact('user','post'));
    }
}
