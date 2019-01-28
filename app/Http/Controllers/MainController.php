<?php

namespace App\Http\Controllers;

use App\Model\Help\Help;
use App\Model\Help\HelpCategory;
use App\Model\Help\HelpState;
use App\Model\Help\HelpTag;
use Illuminate\Support\Facades\Auth;

class MainController extends Controller
{
    public function index(){
       return view('front_end.main');
   }
   public function readMore($helpPost){
       $help = Help::where('slug',$helpPost)->first();
       $helpPosts = $help->load('helpPivot');
       $category = HelpCategory::whereNull('parent_id')->get()->each(function ($helpCategory){
           $helpCategory->childCategories;
       });
       return view('front_end.read_more',compact("helpPosts","category"));
   }
  public function posts(){
      $post = Help::with('helpTag')->with('helpState')->paginate();
       $category = HelpCategory::whereNull('parent_id')->get()->each(function ($helpCategory){
           $helpCategory->childCategories;
       });
       $helpState  = $post->load('helpState');
      return response()->json(['posts'=> $post,'categories'=>$category,'helpStats'=>$helpState]);

    }
    public function loginTemplate(){
        return view('user.login');
    }
    public function Categoryview(HelpCategory $helpCategory){
        $posts = $helpCategory->helps;
        $categories = HelpCategory::whereNull('parent_id')->get()->each(function ($helpCategory){
            $helpCategory->childCategories;
        });
        $helpState  = $posts->load('helpState');
        return response()->json(['posts'=> $posts,'categories'=>$categories,'helpState'=>$helpState]);
    }
    public function Search($help){
        $assets = Help::when($help, function ($query) use ($help) {
            $query->search($help, null, true)->orderby('relevance', 'desc');
        })
            ->when(!$help, function ($query) {
                $query->latest();
            })->get();

        return response()->json(['posts'=> $assets]);
    }
    public function  tagview($helpTag){
        $help = HelpTag::where('slug',$helpTag)->get();
        $posts = $help->load('helps');
        $categories = HelpCategory::whereNull('parent_id')->get()->each(function ($helpCategory){
            $helpCategory->childCategories;
        });
        return view('front_end.tag',compact('posts','categories'));
    }
    public function statusview($helpState){
        $state = HelpState::where('slug',$helpState)->get();
        $posts = $state ->load('helps');
        $categories = HelpCategory::whereNull('parent_id')->get()->each(function ($helpCategory){
            $helpCategory->childCategories;
        });
        return view('front_end.tag',compact('posts','categories'));
    }
}
