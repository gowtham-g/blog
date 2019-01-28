<?php

namespace App\Model\Help;

use Illuminate\Database\Eloquent\Model;

class HelpTagPivot extends Model
{
    protected  $table = 'help_tag_pivot';
    protected $fillable = [ 'help_id', 'help_tag_id'];
    protected $hidden = [ 'created_at', 'updated_at'];
}
