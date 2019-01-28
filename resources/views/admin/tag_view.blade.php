@extends('layouts/app')
@section('content')
    <div class="outer">
        <div class="inner bg-container" ng-controller="adminController as adminCtrl">
            <div class="row">
                <div class="col-12 data_tables">
                    <div class="card">
                        <div class="card-header bg-white">
                            <i class="fa fa-table"></i> List status
                            <a class="collapsed accordion-section-title float-right createDesignMenu" href="{{ route('admin.tag_create') }}">
                                <i class="icomoon icomoon-plus"></i>Add
                            </a>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table id="" class="display table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th class="">Name</th>
                                        <th class="">Created at</th>
                                        <th class="admin_action">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @php
                                        $counter = $helpTag->perPage() * ($helpTag->currentPage()-1);
                                    @endphp
                                    @foreach($helpTag as $tag)
                                        <tr>
                                            <td>{{ $tag->name }}</td>
                                            <td><span localdatetime="'{{  $tag->created_at }}'"></span></td>
                                            <td class="admin_action">
                                                <div class="">
                                                    <a class="fa fa-pencil btn btn-labeled" href="{{ route('admin.tag_edit', ['helpTag' => $tag->id]) }}" data-toggle="tooltip" data-placement="top" title="Edit"></a>

                                                    <a  class="fa fa-trash btn btn-labeled"  ng-click="adminCtrl.deleteHelpTag('{{$tag->id}}')" data-toggle="tooltip" data-placement="top" title="Delete">
                                                    </a>
                                                </div>

                                            </td>
                                        </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                             {{  $helpTag->appends(request()->query())->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
