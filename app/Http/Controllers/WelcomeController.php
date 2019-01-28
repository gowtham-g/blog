<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Post;
use App\Model\Category;
use App\Model\Tag;
use Illuminate\Support\Facades\Storage;
use App\Model\Type;

class WelcomeController extends Controller
{
    public function index()
    {
        return view('welcome');
    }
}
