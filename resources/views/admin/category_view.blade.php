@extends('layouts/app')
@section('content')
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/chosen/css/chosen.css')}}"/>
<div  ng-controller="adminController as adminCtrl">
    <div class="inner ">
    <header >
        <div class="main-bar">
            <div class="clearfix bot-mspace">
                <div class="pull-left">
                    <h4 class="category-list">Category List</h4>
                </div>
                <div class="pull-right">

                    <a href="{{ route('category.create') }}" style="float: right;" class="btn btn-info">Create</a>
                </div>
            </div>
        </div>
    </header>
        <div class="bg-container">
            <div class="card">
                {{--<div class="card-header bg-white">
                    <div class="row">
                        <div class="col-lg-7 col-md-12">
                            <div class="d-flex">

                            </div>
                            <p class="errorMsg">@{{adminPointCtrl.noPointErr}}</p>
                        </div>
                    </div>
                </div>--}}
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>Category</th>
                                <th>Child category</th>
                                <th>Description</th>
                                <th>Icon</th>
                                <th>Display disable</th>
                                <th>Display date</th>
                                <th>User post</th>
                                <th>active</th>
                                <th>State Mapping</th>
                                <th>Post count</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>

                            @php $sno=1; @endphp
                            @foreach($helpCategory as $category)

                                @component('admin.category_form', ['category' => $category,'helpState'=>$helpState,'is_parent'=>1])
                                @endcomponent
                                @if(isset($category->childCategories))
                                    @foreach($category->childCategories as $child_category)
                                        @component('admin.category_form', ['category' => $child_category,'helpState'=>$helpState,'is_parent'=>0])
                                        @endcomponent
                                    @endforeach
                                @endif
                            @endforeach
                            </tbody>
                        </table>
                        <div class="clearfix">
                            <div class="float-left">
                                <p ng-if="adminPointCtrl.totalItem > 10">showing @{{adminPointCtrl.pointData.from}} to @{{adminPointCtrl.pointData.to}} of @{{adminPointCtrl.totalItem}} entries</p>
                            </div>
                            <div class="float-right">
                                <ul ng-if="adminPointCtrl.totalItem > 10" uib-pagination total-items="adminPointCtrl.totalItem" items-per-page="adminPointCtrl.itemsPerPage" ng-model="adminPointCtrl.currentPage" max-size="adminPointCtrl.maxSize" class="pagination-sm m-0" boundary-link-numbers="true" rotate="false" ng-change="adminPointCtrl.pageChanged(adminPointCtrl.currentPage,searchPointData,'point')"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function () {
            $(".chzn-select").chosen({allow_single_deselect: true});
        });
    </script>
</div>
    <script type="text/javascript" src="{{asset('assets\js\iziToast.min.js')}}"></script>
    @stop







