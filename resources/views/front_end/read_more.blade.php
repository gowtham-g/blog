@include('layouts.header')
@include('layouts.nav')

<div ng-controller="mainController as main" ng-init="main.postNav()">
@include('layouts.secondNav')

<div class="container" style="padding-top:50px" ng-show="!postshow">
    <div class="card mb-3">
        <div class="card-body">
       <h1>{{$helpPosts->title}}</h1>
        @foreach($helpPosts->helpPivot as $helpPost)
                <span class="badge badge-pill badge-primary"><a style="color: white;" href="{{ route('tag.main', ['helpTag' => $helpPost->slug]) }}">{{$helpPost->name}}</a></span>
            @endforeach
        {!! $helpPosts->description !!}
     </div>
  </div>
  </div>

    <div ng-show="postshow">
    <div class="mainContainer Uneven-Height">
        <div class="container">
            <div class="row" id="Imagecard">
                <div class="col-md-6 pr" ng-repeat = "post in posts track by post.id">
                    <div class="UnevenHeight-space"><a style="color: white" href="@{{ main.laroute.route('post.read',{'helpPost':post.id})}}"><img src="@{{ post.img }}" alt="" class="imageZoom"></a></div>
                    <div ng-if="post.help_tag.name">
                        <span class="badge badge-dark UnevenHeight-space"><a style="color: white" href="@{{ main.laroute.route('tag.main',{'helpTag':post.help_tag.slug})}}">@{{ post.help_tag.name }}</a></span>
                    </div>
                    <span><h3 class="blog-title"><a href="@{{ main.laroute.route('post.read',{'helpPost':post.id})}}">@{{ post.title }}</a></h3></span>
                    <span class="bot-mspace" ng-bind-html="post.description_name[0].toString() | unsafe"></span>
                    <span class="badge badge-info UnevenHeight-space" >
                            <a style="color: white" href="@{{ main.laroute.route('status.view',{'helpState':post.help_state.slug})}}">
                           @{{post.help_state.name}}
                        </a>
                    </span>
                    <strong><a  style="padding-left: 402px" href="@{{ main.laroute.route('post.read',{'helpPost':post.slug})}}" class="link-read-more">Read more <i class="fa fa-chevron-right"></i></a></strong>
                    <hr>
                </div>
                <div class="separate-line pa"></div>
            </div>
            <div class="alert alert-warning" ng-show="posts.length==0">No posts yet</div>
        </div>
    </div>
</div>
</div>


@include('layouts.footer')