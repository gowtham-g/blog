@extends('layouts/app')
@section('content')
    <div class="outer">
        <div class="inner bg-container">
            <div class="row">
                <div class="col-12 data_tables">
                    <div class="card">
                        @if(Session::has('success'))
                            <div class="alert alert-success">
                                {{ Session::get('success') }}
                            </div>
                        @endif
                        <div class="card-header bg-white">
                            Edit status
                        </div>
                        <div class="card-body m-t-35">
                            {{ Form::model($helpCategory,array('url' => route('admin.category.update',[$helpCategory->slug]),'method' => 'post','class' => 'login_validator')) }}
                            @include('admin.create.form', ['type' => 'Update'])
                            {{ Form::close() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection