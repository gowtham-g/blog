@extends('layouts.app')
@section('body_class')
    error-page
@endsection
@section('content')
    <link rel="stylesheet" href="/assets/css/error.css">
    <div class="main">
        <div class="container">
            <div class="dc bot-mspace"><a id="navbar-logo" class="dc" href="@{{ mainCtrl.laroute.route('welcome') }}"><span class="logo m-auto" alt="logo"> </span></a></div>
                <div class="page-error-img text-center">
                    <img src="{{asset('/assets/img/error-page-404.png')}}" alt="">
                </div>
                    <div class="errorContainer dc">
                        <p class="errorIcon error404"><!-- don't delete --></p>
                        @if($exception->getMessage())
                            <p class="pgNtFnd">OOPS! This seems to be a dead link - {{ $exception->getMessage() }} </p>
                        @else
                            <p class="pgNtFnd">OOPS! This seems to be a dead link - Page not found </p>
                        @endif

                        <p class="return">Take me back to <a href="{{ url('') }}">{{ config('app.name') }}</a></p>
                    </div>
            </div>
        </div>
        </div>
@endsection
