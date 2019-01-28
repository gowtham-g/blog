@extends('layouts.app')
@section('content')
    <main>
        <div class="outer">
            <div class="inner bg-container">
                <div class="outer">
                    <div class="inner bg-container forms">
                        <div class="row">
                            <div class="col">
                                <div class="card">
                                    <div class="card-header bg-white">
                                        Create category
                                    </div>
                                    <div class="card-body">
                                        {{ Form::open(array('url' => route('category.store'),'method' => 'POST','class' => 'login_validator')) }}
                                        @include('admin.create.form', ['type' => 'Add'])
                                        {{ Form::close() }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</main>
@endsection
