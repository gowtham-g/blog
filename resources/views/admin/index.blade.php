
<!doctype html>
<html lang="en" ng-app="wofoxApp">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="_token" content="{{ csrf_token() }}">

    <title>{{ config('app.name') }} Admire</title>
    <!-- global styles-->
    <link rel="stylesheet" type="text/css" href="{{ asset('/assets/css/app.css')}}">
    <link href="//fonts.googleapis.com/css?family=Rajdhani:400,500,600,700" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="{{asset('/assets/css/custom.css')}}"/>
    <link type="text/css" rel="stylesheet" href="#" id="skin_change"/>
    <script src="{{ asset('/assets/js/app.js') }}"></script>
</head>

<body class="bodyCls @yield('body_class')" ng-controller="adminController" id="WoFoxApp">
@section('body_class')
    admin
@endsection
<div class="myDesignContainer clearfix">
<div class="sidebar sidebarDashobard ">
    <div class="clearfix">
        @include('admin.side_menu')
        <div class="_left-sidein icon pull-left" id="design-nav">
            <ul class="topLeftSid unstyled ver_ULbdr_before">
                @if(Route::currentRouteName()=='admin.dashboard' || Route::currentRouteName()=='admin.status_view' || Route::currentRouteName()=='admin.tag_view' ||Route::currentRouteName()=='admin.post_view'||Route::currentRouteName()=='admin.category_view'
               || Route::currentRouteName()=='admin.state_edit' ||  Route::currentRouteName()=='admin.tag_edit'  ||  Route::currentRouteName()=='admin.category.edit' || Route::currentRouteName()=='admin.category.preview'
               || Route::currentRouteName()=='admin.tag_create' || Route::currentRouteName()=='admin.state_create' || Route::currentRouteName()=='category.create' )
                <li class="recent @if (Route::currentRouteName() == 'admin.dashboard') {{'active'}} @endif @if (Route::currentRouteName() == 'home') {{'active'}} @endif" id="designImages">
                    <a href="{{ route('admin.dashboard') }}"><i class="fa fa-angle-double-right"></i> Dashboard</a>
                </li>
                <li class="design @if (Route::currentRouteName() == 'admin.category_view' || Route::currentRouteName() == 'designs.folder.list.page' || Route::currentRouteName()=='category.create') {{'active'}} @endif" id="designImages">
                    <a id="dusk_public_design_js" href="{{ route('admin.category_view' ) }}"><i class="fa fa-angle-double-right"></i>Category</a>
                </li>
                <li class="collection @if (Route::currentRouteName() == 'admin.status_view' || Route::currentRouteName() == 'collections.folder.list.page' || Route::currentRouteName()=='admin.state_create') {{'active'}} @endif" id="designImages">
                    <a href="{{ route('admin.status_view') }}"><i class="fa fa-angle-double-right"></i>Status</a>
                </li>
                <li class="collection @if (Route::currentRouteName() == 'admin.tag_view' || Route::currentRouteName() == 'admin.tag_create') {{'active'}}  @endif" id="designImages">
                    <a href="{{ route('admin.tag_view') }}"><i class="fa fa-angle-double-right"></i>Tag</a>
                </li>
                <li class="design @if (Route::currentRouteName() == 'admin.post_view') {{'active'}} @endif" id="designImages">
                    <a href="{{ route('admin.post_view') }}"><i class="fa fa-angle-double-right"></i>Add Post
                        <i class="fa fa-angle-double-right"></i>
                        <span class="lt_count pull-right" id="count_render"></span>
                    </a>
                </li>
                @endif
            </ul>
        </div>
    </div>
</div>
</div>
<script src="{{asset('assets/js/iziToast.min.js')}}"></script>
<script>
    function myFunction() {
            document.querySelector(".collapse").classList.toggle("show");
    }
            window.authUser = {!!json_encode(collect(auth()->user())->only(['id','user_name','full_name','email','comment_count','image_url','forum_count','user_count']))!!};
</script>
@include('layouts.errors')
</body>
</html>











