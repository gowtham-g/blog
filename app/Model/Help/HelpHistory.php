<?php

namespace App\Model\Help;

use App\User;
use Illuminate\Database\Eloquent\Model;

class HelpHistory extends Model
{
    protected $fillable = ['help_id', 'help_state_id', 'user_id'];
    protected $hidden = [ 'created_at', 'updated_at'];

    public function helps()
    {
        return $this->belongsTo(Help::class,'help_id','id');
    }
    public function helpState()
    {
        return $this->belongsTo(HelpState::class,'help_state_id','id');
    }
    public function users()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
}
