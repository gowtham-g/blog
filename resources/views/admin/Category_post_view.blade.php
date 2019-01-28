@extends('layouts/app')
@section('content')
    <div class="outer">
        <div class="inner bg-container" ng-controller="adminController as adminCtrl">
            <div class="row">
                <div class="col-12 data_tables">
                    <div class="card">
                        <div class="card-header bg-white">
                            <i class="fa fa-table"></i> List <span style="text-transform: lowercase">{{ $helpCategory->name }}</span> post
                                <button style="margin-left:82%" class="btn createDesignMenu float-right" ng-click="ShowHide()">Filter<span class="badge badge-pill"></span></button>
                                </div>
                                <div  ng-show = "IsVisible" aria-multiselectable="true">
                                    <div class="card">
                                        <div>
                                            <div class="card-body m-t-10">
                                                {{ Form::open(array('url' => request()->fullUrl(),'method' => 'get')) }}
                                                <div class="row">
                                                    <div class="col-md-2 form-group">
                                                        <label>Post Title</label>
                                                        {{ Form::text('title',old('title'),['placeholder'=>'Enter post title','class'=>'form-control']) }}
                                                    </div>
                                                    <div class="col-md-2 form-group">
                                                        <label>Status</label>
                                                        {{ Form::select('state', $helpStates, old('state'), ['placeholder' => 'Select post status','class'=>'form-control'])  }}
                                                    </div>
                                                    <div class="col-md-2 form-group">
                                                        <label>&nbsp;&nbsp;</label>
                                                        <div>
                                                            <button type="submit" name="filter" value="1"  class="btn btn-default btn-space">Go</button>
                                                            <a  href="{{ request()->url() }}" class="btn btn-close btn-space">Clear</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                {{ Form::close() }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body m-t-35">
                                    <div class="table-responsive">

                                        <table class="display table table-striped table-bordered">
                                            <thead>
                                            <tr>
                                                <th class="serial_num">S.no</th>
                                                <th>
                                                    <a href="{{ request()->fullUrlWithQuery(['sort' => request()->query('sort') == 'name_asc' ? 'name_desc' : 'name_asc']) }}">Post title</a>
                                                </th>
                                                <th>Status</th>
                                                <th>
                                                    Created by
                                                </th>
                                                <th>
                                                    <a href="{{ request()->fullUrlWithQuery(['sort' => request()->query('sort') == 'latest' ? 'oldest' : 'latest']) }}">Created on</a>
                                                </th>
                                                <th class="admin_action">
                                                    Actions
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            @php
                                                $counter = $helps->perPage() * ($helps->currentPage()-1);
                                            @endphp
                                            @if(!$helps->count()==0)
                                                @foreach ($helps as $help)
                                                    <tr>

                                                        <td class="serial_num">{{  $counter + $loop->iteration }}</td>
                                                        <td>{{  $help->title }}</td>
                                                        <td>
                                                            {{$help->helpState->name}}
                                                        </td>
                                                        <td>{{$help->user["user_name"] or '-'}}</td>
                                                        <td><span localdatetime="'{{  $help->created_at }} '"></span></td>
                                                        <td class="admin_action">
                                                            <div class="admin_actionDiv" ng-controller="helpCategoryPostListController">
                                                                <a ng-click="adminCtrl.helpViewPost('{{ $help->slug }}')">
                                                                    <i class="fa fa-pencil btn btn-labeled"></i>
                                                                </a>
                                                                <a class="fa fa-trash btn btn-labeled"
                                                                   data-toggle="tooltip" data-placement="top" ng-click="helpDelete('{{$help->id}}')"}}
                                                                   title="Delete"></a>
                                                            </div>

                                                        </td>
                                                    </tr>

                                                @endforeach
                                            @else
                                                <div class="alert alert-danger">No data</div>
                                            @endif
                                            </tbody>
                                        </table>
                                    </div>
                                    {{$helps->appends(request()->query())->links()}}
                                </div>
                    </button>
                </button>
            </div>
        </div>
    </div>
@endsection


