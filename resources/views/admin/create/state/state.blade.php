@extends('layouts.app')
@section('content')
    <div class="outer">
        <div class="inner bg-container">
            <div class="outer">
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
                                   State category
                                </div>
                                    <div class="card-body m-t-35">
                                        {{ Form::open(array('url' => route('admin.state_store'),'method' => 'POST','class' => 'login_validator')) }}
                                        @include('admin.create.state.form', ['type' => 'Update'])
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
