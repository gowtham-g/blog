<?php

namespace App\Model\Help;

use Illuminate\Database\Eloquent\Model;

class HelpStatePivot extends Model
{
    protected $table = 'help_tag_pivot';
    protected $fillable = [ 'help_category_id', 'help_state_id', 'is_negative', 'order_by' ];
    protected $hidden = [ 'created_at', 'updated_at'];

    public function helpCategories()
    {
        return $this->belongsTo(HelpCategory::class, 'help_category_id','id');
    }
    public function helpState()
    {
        return $this->belongsTo(HelpState::class,'help_state_id','id');
    }
}
