<div class="nav-header">
    <div class="container">
        <div class="navbar1 clearfix">
            <h1 class="pull-left"  ng-click="main.PostImage()"><a style="color: white">Blog</a></h1>
            <div class="dropdown1">
                <ul>
                    <li id="nav"  class="blog_@{{category.name}}" ng-class="{'active': category.id == states.activeItem}"  ng-click="states.activeItem=category.id" ng-repeat="category in categories">
                        <a href="#" style="color: white" ng-click="main.categoryView(category.slug)">@{{category.name}}</a>
                        <ul class="dropdown1-content1">
                            <li  ng-repeat="child in category.child_categories"><a href="">@{{ child.name }}</a></li>
                        </ul>
                    </li>
                    <li class="blog-search">
                        <form ng-submit="search(inputValue)">
                            <input type="text" name="name" ng-model="inputValue" placeholder="Search" class="form-control" />
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

