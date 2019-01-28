<?php
/**
 * Created by PhpStorm.
 * User: user-15
 * Date: 9/8/2018
 * Time: 12:00 PM
 */

namespace App\Services;
use App\Model\Vote;
use App\Model\Post;
use App\Model\Response;
use Illuminate\Support\Facades\DB;
use App\Model\Point;
use App\Model\PointUser;

class VoteService
{
    public static function user_vote($question_id,$response_id,$type,$vote_type)
    {
        if($vote_type == "question")
        {
            $post = Post::where('id',$question_id)->withcount(['vote' => function($query){
                $query->select(DB::raw("SUM(vote) as vote_count"))->where('user_id',auth()->id());
            }])->first();
            if($post->vote_count == null){
                $postvote = 0;
            }else{
                $postvote = $post->vote_count;
            }
        }

        if($vote_type == "response")
        {
            $response = Response::where('id',$response_id)->withCount(['vote' => function($query){
                $query->select(DB::raw("SUM(vote) as vote_count"))->where('user_id',auth()->id());
            }])->first();

            if($response->vote_count == null){
                $responsevote = 0;
            }else{
                $responsevote = $response->vote_count;
            }
        }

        if($response_id == null){
            if(!Vote::where(['user_id' => auth()->id(),'forum_id' =>$question_id,'response_id' => null ])->exists()){
                if($type == 'upvote'){
                    $up_vote = Vote::create([
                        'user_id' => auth()->id(),
                        'forum_id' => $question_id,
                        'vote' => 1,
                        'type' => $vote_type,
                    ]);
                    $point = Point::where('slug',$type)->first();
                    PointUser::create([
                        'user_id' => auth()->id(),
                        'point_id'=> $point->id
                    ]);
                    $vote_count = Post::where('id',$question_id)
                        ->withCount(['vote' => function ($query) { $query->select(DB::raw("SUM(vote) as vote_count"));}])
                        ->pluck('vote_count');
                    return response()->json($vote_count);
                }
                elseif($type == 'downvote'){
                    $up_vote = Vote::create([
                        'user_id' => auth()->id(),
                        'forum_id' => $question_id,
                        'vote' => -1,
                        'type' => $vote_type,
                    ]);
                    $point = Point::where('slug',$type)->first();
                    PointUser::create([
                        'user_id' => auth()->id(),
                        'point_id'=> $point->id
                    ]);
                    $vote_count = Post::where('id',$question_id)
                        ->withCount(['vote' => function ($query) { $query->select(DB::raw("SUM(vote) as vote_count"));}])
                        ->pluck('vote_count');
                    return response()->json($vote_count);
                }
            }else{
                if($type == 'downvote'){
                    if($postvote == 1 || $postvote == 0 ){
                        $up_vote = Vote::create([
                            'user_id' => auth()->id(),
                            'forum_id' => $question_id,
                            'vote' => -1,
                            'type' => $vote_type
                        ]);
                        $vote_count = Post::where('id',$question_id)
                            ->withCount(['vote' => function ($query) { $query->select(DB::raw("SUM(vote) as vote_count"));}])
                            ->pluck('vote_count');
                        return response()->json($vote_count);
                    }else{
                        return response()->json(['error' => 'you already downvote the particular forum']);
                    }
                }
                elseif($type == 'upvote'){
                    if($postvote == -1 || $postvote == 0){
                        $up_vote = Vote::create([
                            'user_id' => auth()->id(),
                            'forum_id' => $question_id,
                            'vote' => 1,
                            'type' => $vote_type
                        ]);
                        $vote_count = Post::where('id',$question_id)
                            ->withCount(['vote' => function ($query) { $query->select(DB::raw("SUM(vote) as vote_count"));}])
                            ->pluck('vote_count');
                        return response()->json($vote_count);
                    }else{
                        return response()->json(['error' => 'you already upvote the particular forum']);
                    }
                }
            }
        }else{
            if(!Vote::where(['user_id' => auth()->id(),'response_id' =>$response_id])->exists()){
                if($type == 'upvote'){
                    $up_vote = Vote::create([
                        'user_id' => auth()->id(),
                        'forum_id' => $question_id,
                        'response_id' => $response_id,
                        'vote' => 1,
                        'type' => $vote_type
                    ]);
                    $point = Point::where('slug',$type)->first();
                    PointUser::create([
                        'user_id' => auth()->id(),
                        'point_id'=> $point->id
                    ]);
                    $vote_count = Response::where('id',$response_id)
                        ->withCount(['vote' => function ($query) { $query->select(DB::raw("SUM(vote) as vote_count"));}])
                        ->pluck('vote_count');
                    return response()->json($vote_count);
                }
                elseif($type == 'downvote'){
                    $up_vote = Vote::create([
                        'user_id' => auth()->id(),
                        'forum_id' => $question_id,
                        'response_id' => $response_id,
                        'vote' => -1,
                        'type' => $vote_type
                    ]);
                    $point = Point::where('slug',$type)->first();
                    PointUser::create([
                        'user_id' => auth()->id(),
                        'point_id'=> $point->id
                    ]);
                    $vote_count = Response::where('id',$response_id)
                        ->withCount(['vote' => function ($query) { $query->select(DB::raw("SUM(vote) as vote_count"));}])
                        ->pluck('vote_count');
                    return response()->json($vote_count);
                }
            }else{
                if($type == 'downvote'){
                    if($responsevote == 1 || $responsevote == 0 ){
                        $up_vote = Vote::create([
                            'user_id' => auth()->id(),
                            'forum_id' => $question_id,
                            'response_id' => $response_id,
                            'vote' => -1,
                            'type' => $vote_type
                        ]);
                        $vote_count = Response::where('id',$response_id)
                            ->withCount(['vote' => function ($query) { $query->select(DB::raw("SUM(vote) as vote_count"));}])
                            ->pluck('vote_count');
                        return response()->json($vote_count);
                    }else{

                        return response()->json(['error' => 'you already downvote the particular Response']);

                    }
                }
                elseif($type == 'upvote'){
                    if($responsevote == -1 || $responsevote == 0 ){
                        $up_vote = Vote::create([
                            'user_id' => auth()->id(),
                            'forum_id' => $question_id,
                            'response_id' => $response_id,
                            'vote' => 1,
                            'type' => $vote_type
                        ]);
                        $vote_count = Response::where('id',$response_id)
                            ->withCount(['vote' => function ($query) { $query->select(DB::raw("SUM(vote) as vote_count"));}])
                            ->pluck('vote_count');
                        return response()->json($vote_count);
                    }else{

                        return response()->json(['error' => 'you already upvote the particular Response']);
                    }
                }
            }
        }
    }
}