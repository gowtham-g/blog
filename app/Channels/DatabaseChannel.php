<?php

namespace App\Channels;

use App\User;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Channels\DatabaseChannel as NotificationDatabaseChannel;

class DatabaseChannel extends NotificationDatabaseChannel
{
    /**
     * Send the given notification.
     *
     * @param  mixed  $notifiable
     * @param  \Illuminate\Notifications\Notification  $notification
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function send($notifiable, Notification $notification)
    {
        if($notifiable instanceof User){
            if($notifiable->is_admin == 0){
                $notifiable->increment('notify_count');
            }
        }
        return $notifiable->routeNotificationFor('database')->create([
            'id' => $notification->id,
            'type' => isset($notification->notifyType)?$notification->notifyType:snake_case($this->getClassName(get_class($notification))),
            'data' => $this->getData($notifiable, $notification),
            'read_at' => null
        ]);
    }

    protected function getClassName($classNameSpace) {
        $path = explode('\\', $classNameSpace);
        return array_pop($path);
    }
}