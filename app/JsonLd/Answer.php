<?php

namespace App\JsonLd;

use JsonLd\ContextTypes\AbstractContext;
use JsonLd\ContextTypes\Person;

class Answer extends AbstractContext
{
    /**
     * Property structure
     *
     * @var array
     */
    protected $structure = [
        'upvoteCount' => null,
        'description' => null,
        'dateCreated' => null,
        'author' => Person::class,
    ];
}