<?php 

namespace App\Filters;

use App\Model\Tag;

use Illuminate\Http\Request;

use App\Filters\Filters;


class TagFilter extends Filters

{
 protected $filters=['search_tag'];

         protected function search_tag($tagname){
       
         	// $tag=Tag::where('tag_name',$tagname)->firstOrFail();
         	// return $this->builder->where('id',$tag->id);
    	return  $this->builder->where('tag_name','like', "%$tagname%");

         }   
         

	}
