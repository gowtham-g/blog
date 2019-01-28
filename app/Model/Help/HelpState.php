<?php

namespace App\Model\Help;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HelpState extends Model
{
    use Sluggable,SoftDeletes;
    protected $fillable = [ 'name', 'slug', 'class', 'color_code','order_by'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function sluggable()
    {
        return[
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function helpComments()
    {
        return $this->hasMany(HelpComment::class);
    }
    public function helps()
    {
        return $this->hasMany(Help::class);
    }
    public function categoryState()
    {
        return $this->belongsToMany(HelpCategory::class,'help_state_pivots');
    }
}
