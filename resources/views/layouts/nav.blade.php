<header>
   <nav class="navbar navbar-default navbar-fixed-top hor_bdr_before editor NavbarJs">
      <div class="container">
          <div class="navbar-header">
              <a class="navbar-brand" href=""></a>
              <div class="header_desk clearfix">

             @php
                 $menus = json_decode(\Storage::disk('json_modules')->get('main_menu.json'));
                 $menu_count = count($menus);
             @endphp
             <div  ng-controller="HomePageController as home">
             <ul class="_top-doublemenu nav navbar-nav navbar-left desktop_menu first_menu"
                 ng-mouseleave="home.setMenuActiveOnLeave()" ng-init="home.setMenuFirstValue('{{ $menu_count }}')">
                 @php $activeSecondMenu = ''; @endphp
                 @foreach($menus as $index => $menu)
                     @php $activeMenu = '';  @endphp
                     @if(isset($menu->direct_category_file) && count($menu->direct_category_file) > 0)
                         @foreach($menu->direct_category_file as $direct_category_file)
                             @if(\Request::segment(1) == $menu->modules->slug && \Request::segment(2) == $direct_category_file->slug)
                                 @php  $activeMenu = 'activeMainMenu' ; @endphp
                             @endif
                             @if(!$activeMenu)
                                 @if(\Request::segment(1) == $menu->modules->slug && getCategory() == $direct_category_file->slug)
                                     @php  $activeMenu = 'activeMainMenu' ;  $activeSecondMenu = getCategory(); @endphp
                                 @endif
                             @endif
                         @endforeach
                     @elseif(isset($menu->child_module_list) && count($menu->child_module_list) > 0)
                         @foreach($menu->child_module_list as $direct_category_file)
                             @if(\Request::segment(1) == $direct_category_file->slug)
                                 @php  $activeMenu = 'activeMainMenu' ; @endphp
                             @endif
                         @endforeach
                     @endif
                     <li class="{{$menu->slug}}"
                         ng-mouseover="home.setMenuActive('{{ $index }}')" ng-mouseleave="home.setMenuActive(-1)">
                         <a class="first_menuLnk pr {{((\Request::segment(1) == ($menu->url))||(isset($modules->parent_id)?$modules->parent_id==$menu->id:'') ?'activeMainMenu':'')}} {{ $activeMenu }}"
                            href="{{ route('menu', $menu->url) }}">
                             <span>{{ $menu->name }}</span>
                             <span class="pa menuLnk_arrow"></span>
                         </a>
                         @if(!$menu->is_no_child)
                             <div class="mainMenuOverEffect pa"
                                  ng-show="home.menuLists['{{ $index }}'] == true" @if($index > 0) style="display: none"
                                  @endif ng-style="{ 'display': (home.menuLists['{{ $index }}'] == true)? 'block' : '', 'z-index' : (home.menuLists[{{ $index }}] == true)? '999999' : '0' }">
                                 <div class="">
                                     <div class=" ">
                                         <ul class="_top-doublemenu nav navbar-nav navbar-left desktop_menu no-mar">
                                             @if(isset($menu->direct_category_file) && count($menu->direct_category_file) > 0)
                                                 @foreach($menu->direct_category_file as $direct_category_file)
                                                     <li class="pr mainMenuOverEffectLi {{ $direct_category_file->class }} {{( (\Request::segment(1) == $menu->modules->slug && \Request::segment(2) == $direct_category_file->slug) || (isset($category_menu['category']['slug'])? $category_menu['category']['slug'] == $direct_category_file->slug : '') ?'activeMenu':'')}} {{ $direct_category_file->slug == $activeSecondMenu? 'activeMenu' : '' }}">
                                                         <a href="{{ route('category', [$menu->modules->slug,  $direct_category_file->slug ]) }}">
                                                             <span class="menuIcon show"></span>
                                                             <span class="menuHeading show">{{ $direct_category_file->name }}</span>
                                                             <span class="menuDes show">{{$direct_category_file->description}}</span>
                                                         </a>
                                                     </li>
                                                 @endforeach
                                             @elseif(isset($menu->child_module_list) && count($menu->child_module_list) > 0)
                                                 @foreach($menu->child_module_list as $direct_category_file)
                                                     <li class="pr mainMenuOverEffectLi {{ $direct_category_file->model }} {{ (\Request::segment(1) == ($direct_category_file->slug) || (isset($modules->model)? $modules->model == $direct_category_file->model : '') ?'activeMenu':'')}} {{ $direct_category_file->is_coming_soon == 1 ? 'comingsoonMain' : '' }} ">
                                                         <a href="{{ $direct_category_file->is_coming_soon == 1 ? '' : route('menu',  $direct_category_file->slug) }}">
                                                             @if($direct_category_file->is_coming_soon == 1)
                                                                 <span class="pa comingsoonText"> Coming soon</span>
                                                             @endif
                                                             <span class="menuIcon show"></span>
                                                             <span class="menuHeading show">{{ $direct_category_file->name }}
                                                    </span>
                                                             <span class="menuDes show">{{$direct_category_file->description}}</span>
                                                         </a>
                                                     </li>
                                                 @endforeach
                                             @endif
                                         </ul>
                                     </div>
                                 </div>
                             </div>
                         @endif
                     </li>
                 @endforeach

                 <li class="register_menu create-register"><a ng-click="home.loginWindow()"><i class="fa fa-user"></i>
                 <div class="dropdown_login">Login</div>
                 </a>
                 </li>
                {{-- <li class="hmarSpace login_btn"><a ng-click="home.loginWindow('signup')">Join</a></li>--}}
             </ul>
             </div>
         </div>
          </div>
          </div>
   </nav>
</header>
<script async src="{{ asset('/assets/js/app.js') }}"></script>

