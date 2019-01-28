
@extends('layouts.app')
@section('body_class')
    error-page
@endsection
@section('content')
    <link rel="stylesheet" href="/assets/css/error.css">
    <div class="main">
                <div class="container">
                    <div class="page-error-img text-center">
                        <img src="{{ asset('assets/img/blank.gif') }}" lazy-img="{{ asset('/assets/img/error-page.png')}}" alt="">
                    </div>
                    <div class="errorContainer dc top-mspace">
                        <p class="errorIcon error403"><!-- don't delete --></p>
                        <p class="pgNtFnd">Access Denied</p>
                        <p class="return">Take me back to <a href="{{ url('') }}">{{ config('app.name') }}</a></p>
                    </div>
                </div>
            </div>
@endsection