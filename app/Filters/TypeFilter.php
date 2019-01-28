<?php

namespace App\Filters;

use App\Model\Tag;

use Illuminate\Http\Request;

use App\Filters\Filters;


class TypeFilter extends Filters

{
    protected $filters=['search_type'];

    protected function search_type($typename){

        // $tag=Tag::where('tag_name',$tagname)->firstOrFail();
        // return $this->builder->where('id',$tag->id);
        return  $this->builder->where('tag_type','like', "%$typename%");

    }


}
