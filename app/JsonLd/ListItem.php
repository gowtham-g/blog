<?php

namespace App\JsonLd;

use JsonLd\ContextTypes\AbstractContext;
use JsonLd\ContextTypes\Person;

class ListItem extends AbstractContext
{
    /**
     * Property structure
     *
     * @var array
     */
    protected $structure = [
        'position' => null,
        'item' => null,
        'name' => null,
    ];

    protected function setItemAttribute($item)
    {
        foreach($item as $key => $list){
            if($list->categories_id == config('constant.CATEGORY_FORUM')){
                $ListItem[] = [
                    '@type' =>  'ListItem',
                    'name' => $list->title,
                    'url' => route('question.slug',$list->slug),
                    'image' => [
                       '@type' => 'ImageObject',
                       'url' => $list->user->image_url
                     ],
                ];
            }elseif($list->categories_id == config('constant.CATEGORY_TUTORIAL')){
                $ListItem[] = [
                    '@type' =>  'ListItem',
                    'name' => $list->title,
                    'url' =>route('slug',$list->slug),
                    'image' => [
                       '@type' => 'ImageObject',
                       'url' => $list->image_url
                     ],
                ];
            }elseif($list->categories_id == config('constant.CATEGORY_NEWS')){
                $ListItem[] = [
                    '@type' =>  'ListItem',
                    'name' => $list->title,
                    'url' =>route('news.slug',$list->slug),
                    'image' => [
                       '@type' => 'ImageObject',
                       'url' => $list->image_url
                     ],
                ];
            }   
        }
        return $ListItem;
    }
}