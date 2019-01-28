<?php
/**
 * Created by PhpStorm.
 * User: user-15
 * Date: 9/7/2018
 * Time: 6:42 PM
 */

namespace App\Services;
use App\Model\Subscribe;
use App\Model\Point;
use App\Model\PointUser;

class SubscribeService
{

    public static function tag_subscribe($type,$id)
    {
        if(!Subscribe::where('user_id',auth()->id())->where('tag_id',$id)->exists())
        {
            $subscribe = Subscribe::create([
                'user_id' => auth()->id(),
                'tag_id' => $id,
            ]);
            $point = Point::where('slug',$type)->first();
            PointUser::create([
                'user_id' => auth()->id(),
                'point_id'=> $point->id
            ]);
        }
    }
}