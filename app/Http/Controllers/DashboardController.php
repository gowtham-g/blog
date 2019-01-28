<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Help\HelpCategory;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $helpCategories = HelpCategory::oldest('order_by')->where('slug', '!=', 'changelog')->get()->each(function($helpCategory){
            $helpCategory->load([
                'help_state'=> function($query) use($helpCategory) {
                    $query->withCount([
                        'helps' => function($query) use($helpCategory){
                            $query->where('helps.help_category_id', $helpCategory->id);
                        }]);
                }]);
        });

        return view('admin.dashboard', compact('helpCategories'));
    }
}
