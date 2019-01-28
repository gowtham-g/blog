<!DOCTYPE html>
<html lang="en"  ng-app="wofoxApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="_token" content="{{ csrf_token() }}">
    <meta name="image" content=" {{config('constant.url')}}/assets/img/logo.svg">
    <meta name="robots" content="noindex, nofollow"/>
    <meta name="googlebot" content="noindex, nofollow"/>

<!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-128596212-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-128596212-1');
    </script>

    <link rel="shortcut icon" type="image/ico" href="{{ asset('assets/img/favicon.ico')}}"/>
    <link rel="stylesheet"  href="{{ asset('assets/css/app.css')}}" >
    <link href="//fonts.googleapis.com/css?family=Rajdhani:500,600" rel="stylesheet">
</head>
<body data-spy="scroll" data-target=".scroll_effect" data-offset="110" class="bodyCls document_not_ready @yield('body_class')">
@include('layouts.nav')
<div class="mainContainer">
    <div class="menu_scroll">
        <ul id="">
            @component('admin.index')
            @endcomponent
        </ul>
    </div>
</div>
<div id="content" class="bg-container">
    <header class="head">
        <div class="main-bar">
            <div class="row no-gutters">
                <div class="col-sm-5 col-lg-6 skin_txt">
                    <h4 class="nav_top_align m-t-5">
                        @yield('title')
                    </h4>
                </div>
                <div class="col-sm-7 col-lg-6">
                    @yield('breadcrumbs')
                </div>
            </div>
        </div>
    </header>
@yield('content')
</div>
 @yield('facebook_meta')
<script async src="{{ asset('/assets/js/app.js') }}"></script>
</body>
</html>
