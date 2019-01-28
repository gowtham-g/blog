<?php

namespace App\Model\Help;

use App\User;
use Illuminate\Database\Eloquent\Model;

class HelpVote extends Model
{
    protected $fillable = [ 'help_id', 'user_id' ];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function users()
    {
        return $this->belongsTo(User::class);
    }
    public function helps()
    {
        return $this->belongsTo(Help::class);
    }
}
