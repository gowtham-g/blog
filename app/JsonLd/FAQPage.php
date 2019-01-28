<?php
/**
 * Created by PhpStorm.
 * User: user-15
 * Date: 10/3/2018
 * Time: 3:34 PM
 */
namespace App\JsonLd;

use JsonLd\ContextTypes\AbstractContext;
use JsonLd\ContextTypes\ImageObject;

class FAQPage extends AbstractContext
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