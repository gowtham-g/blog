<?php

namespace App\Listeners;

use App\Events\UserRegisterEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Mail\RegistrationEmail;
use App\Mail\VerifyEmail;
use Illuminate\Support\Facades\Mail;
use App\Jobs\UserRegister;
class UserRegisterListener
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
     * @param  UserRegisterEvent $event
     * @return void
     */
    public function handle(UserRegisterEvent $event)
    {
        $user = $event->user;
        $job = (new UserRegister($user))->onQueue('admin');
        dispatch($job);
        Mail::to($user->email)->queue(new RegistrationEmail($user));
        Mail::to($user->email)->queue(new VerifyEmail($user));
    }
}
