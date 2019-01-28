@extends('layouts/app')


@section('content')

    <div class="outer">
        <div class="inner bg-container">
            <div class="row">
                <div class="col-12 data_tables">
                    <div class="card">
                        <div class="card-header bg-white">
                            Edit status
                        </div>
                        <div class="card-body m-t-35">
                            {{ Form::model($helpTag,array('url' => route('admin.tag_update',[$helpTag->id]),'method' => 'post','class' => 'login_validator')) }}
                            @include('admin.create.tag.tag_forum', ['type' => 'Update'])
                            {{ Form::close() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection