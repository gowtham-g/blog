<?php

namespace App\JsonLd;

use JsonLd\ContextTypes\AbstractContext;
use JsonLd\ContextTypes\Person;
use App\JsonLd\Answer;
use JsonLd\ContextTypes\Organization;
use JsonLd\ContextTypes\WebPage;
class Question extends AbstractContext
{
    /**
     * Property structure
     *
     * @var array
     */
    protected $structure = [
        'name' => null,
        'description' => null,
        'text' => null,
        'upvoteCount' => null,
        'dateCreated' => null,
        'author' => Person::class,
        'answerCount' => null,
        'acceptedAnswer' => Answer::class,
        'datePublished' => null,
        'publisher' => Organization::class,
        'mainEntityOfPage' => WebPage::class,
    ];
}