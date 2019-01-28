<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\User;
use App\Model\Post;

class PostResponseEmail extends Mailable
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
        $this->queue = 'response';
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
        return $this->markdown('mail.post_response',compact('user','post'));
    }
}
