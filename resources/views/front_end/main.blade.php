@include('layouts.header')
@include('layouts.nav')
 <div ng-controller="mainController as main">
    @include('layouts.secondNav')
    <div class="mainContainer Uneven-Height">
        <div class="container" ng-init='main.PostImage()'>
                           <div data-position="top"  when-scrolled="main.loadMoreAssets()">
                                <div class="row pr" id="popuploader">
                                    <ul ng-style="main.gridHeightStyle">
                                        <ul ng-repeat="post in posts track by post.id"
                                            ng-style="main.gridStyle(post.image_process)">
                                            <div ng-style="main.AssetWidthStyle(post.image_process)">
                                                <div class="productLst dc">
                                                    <div ng-style="main.ObjectGrid(post.image_process)">
                                                        <img src="@{{ post.img }}">
                                                    </div>
                                                    <div class="masterGridLstCaption bot-space">
                                                        <div class="hor-space dl">
                                                            <p class="DesignName top-spacesm truncate"><a href="@{{ main.laroute.route('tag.main',{'helpTag':post.help_tag.slug})}}">@{{ post.help_tag.name }}</a></p>
                                                            <p class="DesignName top-spacesm truncate"><a href="@{{ main.laroute.route('post.read',{'helpPost':post.slug})}}">@{{ post.title }}</a></p>
                                                            <p class="category_details categoryName truncate"><a href="main.laroute.route()"></a>@{{post.help_state.name}}</p>
                                                        </div>
                                                        <strong><a href="@{{ main.laroute.route('post.read',{'helpPost':post.slug})}}" class="link-read-more">Read more <i class="fa fa-chevron-right"></i></a></strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </ul>
                                </div> 
                          </div>


           {{-- <div data-position="top"
                 when-scrolled="main.loadMoreAssets()">
                <div class="pr" id="popuploader">
                    <ul class="clearfix" id="rightContainer" ng-style="main.gridHeightStyle">
                        <li class="recentLst libraryimg"
                            ng-repeat="post in posts track by post.id"
                            ng-style="main.gridStyle(post.image_process)">
                            <div class="mygridViewLst box_shadow wmImageDiv"
                                 id="wmImageDiv_@{{ $index }}"
                                 ng-style="main.AssetWidthStyle(post.image_process)"
                                 ng-class="{'ui_select' : main.folderImageData[$index].image_selected}">
                                <div class="productLst dc">
                                    <div class="productLst v_align_middle" ng-style="main.ObjectGrid(post.image_process)">
                                        <img class="lazy"
                                             id="watermarkImg_@{{ post.id }}"
                                             data-src="/assets/img/lazy_load.gif"
                                             lazy-img="@{{  post.img }}"
                                             alt=""
                                        >
                                        <div class="insertBtn pa watermark_edit"
                                             id="watermarkClass_@{{ imageData.id }}">
                                        </div>
                                    </div>
                                    <div class="masterGridLstCaption bot-space">
                                        <div class="hor-space dl">
                                            <p class="DesignName top-spacesm truncate"
                                               ng-if="post.name.length<30">@{{post.name}}</p>
                                            <p class="DesignName top-spacesm truncate"
                                               ng-if="post.name.length>=30"
                                               data-title="@{{ post.name }}"
                                               bs-tooltip>@{{ post.name  }}</p>
                                            <p class="category_details categoryName truncate">Uploaded
                                                on @{{post.title}}</p>
                                            <p class="category_details truncate">

                                            </p>
                                        </div>

                                        <div class="designCardMenu">
                                            <div class="clearfix assetDotIcon">
                                                <div class="designCard_ulList pull-right pr">
                                                                    <span class="myDesgClbIcon design_topicon cur">
                                                                    <i id="sortdesc_@{{$index}}" class="doticon"></i>
                                                                    </span>
                                                    <div id="list_option_@{{imageData.id}}"
                                                         class="popOverPo arrow_top box_shadow hvStyle">
                                                        <span class="pa arrow cur"></span>
                                                        <ul class="unstyled dl">
                                                            <li class="pr" ng-class="{'disabled' : !post.process_status}">
                                                                --}}{{-- <a ng-click="main.watermarkImageView($index);">
                                                                                                     <span class="myDesngIcon right-space"><i
                                                                                                                 class="fa fa-arrows"></i></span>
                                                                     Preview
                                                                 </a>--}}{{--
                                                            </li>
                                                            <li class="pr" ng-class="{'disabled' : !post.process_status}">
                                                                --}}{{-- <a ng-click="watermark.singleDownload($index)">
                                                                                                 <span class="myDesngIcon right-space">
                                                                                                     <i class="fa fa-download"></i>
                                                                                                 </span>Download
                                                                 </a>--}}{{--
                                                            </li>
                                                            <li class="pr" ng-class="{'disabled' : !post.process_status}">
                                                                --}}{{--<a ng-click="watermark.assetSaveAndDownload(imageData.id, $index)">
                                                                                                    <span class="myDesngIcon right-space"><i
                                                                                                                class="fa fa-arrows"></i></span>
                                                                    Move to assets
                                                                </a>--}}{{--
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>--}}




            <div class="alert alert-warning" ng-show="posts.length==0">No posts yet</div>
        </div>
  </div>
</div> 
@include('layouts.footer')













