<?php

namespace App\JsonLd;

use JsonLd\ContextTypes\AbstractContext;
use JsonLd\ContextTypes\ImageObject;

class SpeakableSpecification extends AbstractContext
{
    /**
     * Property structure
     *
     * @var array
     */
    protected $structure = [
        'cssSelector' => null,
        'description' => null,
    ];
}