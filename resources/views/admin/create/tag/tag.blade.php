@extends('layouts.app')
@section('content')
<div class="outer">
    <div class="inner bg-container">
        <div class="">
            <div class="inner bg-container forms">
                <div class="row">
                    <div class="col">
                        <div class="card">
                            @if(Session::has('success'))
                                <div class="alert alert-success">
                                    {{ Session::get('success') }}
                                </div>
                            @endif
                            <div class="card-header bg-white">
                                Create tag
                            </div>
                            <div class="card-body">
                                {{ Form::open(array('url' => route('admin.tag_store'),'method' => 'POST','class' => 'login_validator')) }}
                                @include('admin.create.tag.tag_forum', ['type' => 'Add'])
                                {{ Form::close() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection