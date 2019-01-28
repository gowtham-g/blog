<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\UserRegisterEvent' => [
            'App\Listeners\UserRegisterListener',
        ],
        'App\Events\PostResponseEvent' => [
            'App\Listeners\PostResponseListener',
        ],
        'App\Events\ForumCreateEvent' => [
            'App\Listeners\ForumCreateListener',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
