<?php

namespace App\Model\Help;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HelpTag extends Model
{
    use Sluggable,SoftDeletes;
    protected $fillable = ['name','slug'];
    protected $dates = ['created_at'];
    protected $hidden = ['updated_at'];

    public function sluggable()
    {
        return[
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function helps()
    {
        return $this->hasMany(Help::class);
    }
}
