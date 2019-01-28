<?php

namespace App\Model\Help;

use App\User;
use Illuminate\Database\Eloquent\Model;

class HelpComment extends Model
{
    protected $fillable = [ 'help_id', 'help_state_id', 'user_id', 'description', 'is_admin_post'];

    protected $hidden = [ 'updated_at', 'deleted_at'];

    protected $touches = ['help'];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id')->select('users.id', 'user_name', 'name', 'profile_image');
    }
    public function help()
    {
        return $this->belongsTo(Help::class, 'help_id','id');
    }
}
