<?php

namespace App\Model\Help;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\SoftDeletes;

class HelpCategory extends Model
{
    use Sluggable,SoftDeletes;
    protected $fillable = [ 'name', 'slug', 'icon', 'is_active', 'is_user_post', 'parent_id','color','description','is_display_date', 'is_display_disable'];
    protected $hidden = [ 'created_at', 'updated_at', 'deleted_at'];
    protected $appends = ['display_date','user_post','category_active'];

    public function sluggable()
    {
        return[
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function getDisplayDateAttribute()
    {
        return $this->is_display_date ? 'Yes':'No';
    }

    public function getDisplayDisableAttribute()
    {
        return $this->is_display_disable ? 'Yes':'No';
    }
    public function getUserPostAttribute()
    {
        return $this->is_user_post ? 'Yes':'No';
    }
    public function getCategoryActiveAttribute()
    {
        return $this->is_active ? 'Yes':'No';
    }
    public function helps()
    {
        return $this::hasMany(Help::class);
    }
    public function getRouteKeyName()
    {
        return 'slug';
    }
    public function help_state()
    {
        return $this->belongsToMany(HelpState::class, 'help_state_pivots','help_category_id','help_state_id');
    }
    public function childCategories()
    {
        return $this->hasMany(HelpCategory::class, 'parent_id' , 'id')->withcount('helps');
    }
    public function parentCategories()
    {
        return $this->belongsTo(HelpCategory::class, 'parent_id' , 'id');
    }
    public function helpTag()
    {
        return $this->belongsTo(HelpTag::class,'help_tag_id','id');
    }
}
