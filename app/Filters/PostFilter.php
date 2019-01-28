<?php 

namespace App\Filters;

use App\Model\Post;

use Illuminate\Http\Request;

use App\Filters\Filters;


class PostFilter extends Filters

{
 protected $filters=['search_post'];

         protected function search_post($postname){
       
         	// dd($postname);
    	return  $this->builder->where('title','like', "%$postname%");

         }   
         

	}
 