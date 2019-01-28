@extends('layouts/app')
@section('content')
    <div class="outer">
        <div class="inner bg-container" ng-controller="adminController as adminCtrl">
            <div class="row">
                <div class="col-12 data_tables">
                    <div class="card">
                        <div class="card-header bg-white">
                            <i class="fa fa-table"></i> List status
                            <a class="collapsed accordion-section-title float-right createDesignMenu" href="{{ route('admin.state_create') }}">
                                <i class="icomoon icomoon-plus"></i>Add
                            </a>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table id="" class="display table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th class="">Name</th>
                                        <th class="">Color code</th>
                                        <th class="">Order by</th>
                                        <th class="admin_action">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @php
                                        $counter = $helpState->perPage() * ($helpState->currentPage()-1);
                                    @endphp
                                    @foreach ($helpState as $status)
                                        <tr>
                                            <td style="color:{{ $status->color_code }};">{{ $status->name }}</td>
                                            <td>{{ $status->color_code }}</td>
                                            <td>{{ $status->order_by }}</td>
                                            <td class="admin_action">
                                                <div class="">
                                                    <a class="fa fa-pencil btn btn-labeled" href="{{ route('admin.state_edit', ['helpState' => $status->id]) }}" data-toggle="tooltip" data-placement="top" title="Edit">
                                                    </a>
                                                    <a  class="fa fa-trash btn btn-labeled"  ng-click="adminCtrl.deleteHelpStatus('{{$status->id}}')" data-toggle="tooltip" data-placement="top" title="Delete">
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                            {{  $helpState->appends(request()->query())->links() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
