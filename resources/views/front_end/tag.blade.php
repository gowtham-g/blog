@include('layouts.header')
@include('layouts.nav')


<div ng-controller="mainController as main">
    @include('layouts.secondNav')

<div class="mainContainer Uneven-Height">
    <div class="container" >
        <span class="badge badge-dark UnevenHeight-space">{{$posts[0]->name}}</span>
            <div class="row" ng-init='main.PostImage()' id="Imagecard">
                    @foreach($posts as $post)
                    @foreach($post->helps as $pos)
                    <div class="col-md-6 pr" >
                        <div class="UnevenHeight-space"><a href="{{ route('post.read', ['helpPost' => $pos->slug]) }}"><img src="{{$pos->img}}" alt="" class="imageZoom"></a></div>
                        <span href=""><h3 class="blog-title"><a href="{{ route('post.read', ['helpPost' => $pos->slug]) }}">{{ $pos->title }}</a></h3></span>
                        <p class="bot-mspace">Video content is one of the most popular mediums for businesses today, and for good reason. Video is more engaging, more memorable, and more popular among consumers than any other type of content...</p>
                        <span class="badge badge-info UnevenHeight-space">{{$pos->help_state}}</span>
                        <strong><a  style="padding-left: 402px" href="{{ route('post.read', ['helpPost' => $pos->slug]) }}" class="link-read-more">Read more <i class="fa fa-chevron-right"></i></a></strong>
                        <hr>
                    </div>
                @endforeach
                @endforeach

            <div class="separate-line pa"></div>
        </div>

    </div>
</div>
</div>



@include('layouts.footer')