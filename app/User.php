<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Model\Follower;
use App\Model\Post;
use App\Model\Like;
use App\Model\Subscribe;
use App\Model\Point;
use App\Model\Activity;
use App\Model\Pin;
use App\Model\Folder;
use App\Model\Comment;
use App\Model\Vote;
use App\Model\UserEmailUnsubscription;
use Illuminate\Support\Facades\Storage;
use Zizaco\Entrust\Traits\EntrustUserTrait;
use Nicolaslopezj\Searchable\SearchableTrait;
use App\Model\Trophy;

class User extends Authenticatable
{
    use Notifiable;
    use EntrustUserTrait;
    use SearchableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_name','full_name','email', 'password','profile_image','image_url','designation','workspace','ip_address'
    ];
    protected $searchable = [
        'columns' => [
            'users.user_name' => 10,
            'users.full_name' => 10,
            'users.email' => 10,
        ]
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'created_at', 'updated_at', 'deleted_at', 'verification_code','login_time','ip_address','is_admin_editor','is_verified'
    ];

    public function likedPosts()
    {
        return $this->morphedByMany('App\Model\Post', 'likeable')->whereDeletedAt(null);
    }

    public function activity()
    {
        return $this->hasMany(Activity::class);
    }

    public function followers()
    {
        return $this->hasMany(Follower::class,'following_id', 'id')->with('user_follower');
    }

    public function following()
    {
        return $this->hasMany(Follower::class,'follower_id', 'id')->with('user_following');
    }

    public function isFollowing()
    {
        return $this->hasOne(Follower::class, 'following_id')->where('follower_id', auth()->id());
    }

    public function post()
    {
        return $this->hasMany(Post::class,'user_id', 'id')->where('categories_id',config('constant.CATEGORY_FORUM'));
    }

    public function likes()
    {
        return $this->hasMany(Like::class,'user_id', 'id');
    }

    public function pins()
    {
        return $this->hasMany(Pin::class,'user_id', 'id');
    }

    public function subscribe()
    {
        return $this->hasMany(Subscribe::class,'user_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class,'user_id', 'id');
    }

    public function getImageUrlAttribute($data)
    {
        return $data ? Storage::disk('users')->url('/') . $data : '/assets/img/profile_icon/' . strtolower($this->full_name[0]) . '.png';
    }

    public function setPasswordAttribute($data)
    {
        return $this->attributes['password'] = bcrypt($data);
    }

    public function posts()
    {
        return $this->hasMany(Post::class,'user_id', 'id');
    }

    public function folder()
    {
        return $this->hasMany(Folder::class,'user_id', 'id');
    }

    public function up_votes()
    {
        return $this->hasMany(Vote::class,'user_id', 'id')->where('vote',1);
    }

    public function down_votes()
    {
        return $this->hasMany(Vote::class,'user_id', 'id')->where('vote',-1);
    }

    public function unsubscribe_email()
    {
        return $this->belongsToMany('App\Model\MailList','user_email_unsubscriptions','user_id', 'mail_lists_id');
    }

    public function points()
    {
        return $this->belongsToMany('App\Model\Point','point_users','user_id','point_id');
    }

    public function scopeUserDetail($query)
    {
        return $query->withCount(['post','likes','pins','subscribe','followers','following','isFollowing','points'=> function ($query) {
            $query->select(\DB::raw("SUM(points) as points_count"));
        }]);

    }

}
