<?php

namespace App\JsonLd;

use JsonLd\ContextTypes\AbstractContext;
use JsonLd\ContextTypes\ImageObject;

class QAPage extends AbstractContext
{
    /**
     * Property structure
     *
     * @var array
     */
    protected $structure = [
        'image' => null,
        'title' => null,
        'name' => null,
        'description' => null,
        'primaryImageOfPage' => ImageObject::class,
    ];
}