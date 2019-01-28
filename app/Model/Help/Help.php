<?php

namespace App\Model\Help;


use App\Model\Module;
use App\User;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Nicolaslopezj\Searchable\SearchableTrait;

class Help extends Model
{
    use SearchableTrait, Sluggable, SoftDeletes;

    protected $guarded = ['id'];
    protected $fillable = ['user_id', 'help_category_id', 'help_state_id', 'help_tag_id', 'title', 'description', 'is_closed', 'is_approve', 'approved_at', 'approved_by','is_marked','img'];
    protected $dates = ['created_at'];
    protected $hidden = ['updated_at', 'deleted_at'];
    protected $appends = ['description_name'];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }
    protected $searchable = [
        'columns' => [
            'title' => 10,
        ],
    ];


    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id')->select('users.id', 'user_name', 'profile_image');
    }
    public function helpState()
    {
        return $this->belongsTo(HelpState::class);
    }
    public function helpCategory()
    {
        return $this->belongsTo(HelpCategory::class, 'help_category_id','id');
    }
    public function helpTag()
    {
        return $this->belongsTo(HelpTag::class,'help_tag_id','id');
    }
    public function helpPivot()
    {
        return $this->belongsToMany(HelpTag::class, 'help_tag_pivot','help_id','help_tag_id');
    }
    public function getDescriptionNameAttribute()
    {
        preg_match('%^(<p[^>]*>.*?</p>)$%im', $this->description, $matches);
        return $matches;
    }
}
