<?php
/**
 * Created by PhpStorm.
 * User: user-15
 * Date: 9/7/2018
 * Time: 6:00 PM
 */

namespace App\Services;
use App\Model\Like;
use Auth;
use App\Model\Post;
use App\Model\PointUser;
use App\Notifications\UserPostLike;
use App\Model\Point;

class LikeService
{
    public static function like($type,$like_id)
    {
        $id = $like_id;
        self::handleLike('App\Model\Post', $id);
        $point = Point::where('slug',$type)->first();
        PointUser::create([
            'user_id' => auth()->id(),
            'point_id'=> $point->id
        ]);
    }

    private static function handleLike($type, $id)
    {
        $existing_like = Like::withTrashed()->whereLikeableType($type)->whereLikeableId($id)->whereUserId(Auth::id())->first();
        if (is_null($existing_like)) {
            Like::create([
                'user_id' => Auth::id(),
                'likeable_id' => $id,
                'likeable_type' => $type,
            ]);
            $post = Post::where('id',$id)->with('user')->first();
            $user = $post['user']->load(['unsubscribe_email' => function($query){
                $query->where('slug', 'like')->where('type','notification');
            }]);
            $like_user = auth()->user();
            if(count($user->unsubscribe_email) == 0) {
                $user->notify(new UserPostLike($like_user, $post));
            }
        } else {
            if (is_null($existing_like->deleted_at)) {
                $existing_like->delete();
            } else {
                $existing_like->restore();
            }
        }
    }

}