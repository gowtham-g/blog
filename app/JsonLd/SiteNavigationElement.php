<?php

namespace App\JsonLd;

use JsonLd\ContextTypes\AbstractContext;
use JsonLd\ContextTypes\Person;

class SiteNavigationElement extends AbstractContext
{
    /**
     * Property structure
     *
     * @var array
     */
    protected $structure = [
        'name'=> null,
        'url' => null,
        'site' => null
    ];

    protected function setSiteAttribute($site)
    {
        foreach($site as $key => $value) {
            $type[] = [
                '@type'=>'Site',
              'name' => $key,
              'url' => $value
            ];
        }

        return $type;
    }
}