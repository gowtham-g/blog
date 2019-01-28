@extends('layouts/app')

@section('content')
<div class="" ng-controller="adminController as adminCtrl">
    <div class="inner bg-container">
        <ul class="row" id="dash-category-list">
            @foreach($helpCategories as $helpCategory)
                @if($helpCategory->is_user_post == 1)
                    <li class="col-lg-3 col-12 md_align_section" data-id="{{ $helpCategory->slug }}">
                        <div class="card cur height100 help_category_{{ $helpCategory->id }}">
                            <div class="card-header bg-white pointer">
                                {{ $helpCategory->name }}
                            </div>
                            <div class="card-body p-0">
                                @foreach($helpCategory->help_state as $helpState)
                                    <div class="task-item {!! $helpState->class !!} help_state_{!! $helpState->id !!}">
                                        <a style="color: {{ $helpState->color_code }};">{{ $helpState->name }}</a>
                                        <span class="float-right dashboard_counts post_count"
                                              >{{ $helpState->helps_count }}</span>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </li>
                @endif
            @endforeach
        </ul>
        <div class="card">
            <div class="card-header bg-white pointer">
                Changelog
            </div>
            <div class="card-body p-3">
                <ul class="row" id="dash-category-list">
                    @foreach($helpCategories as $helpCategory)
                        @if($helpCategory->is_user_post == 0)
                            <li class="col-lg-3 col-12 md_align_section" data-id="{{ $helpCategory->slug }}">

                                <div class="card cur height100 help_category_{{ $helpCategory->id }}">
                                    <div class="card-header bg-white pointer">
                                        {{ $helpCategory->name }}
                                    </div>
                                    <div class="card-body p-0">
                                        @foreach($helpCategory->help_state as $helpState)
                                            <div class="task-item {!! $helpState->class !!} help_state_{!! $helpState->id !!}">
                                                <a style="color: {{ $helpState->color_code }};">{{ $helpState->name }}</a>
                                                <span class="float-right dashboard_counts post_count"
                                                      >{{ $helpState->helps_count }}</span>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>

                            </li>
                        @endif
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</div>
<style>
    .task-item {
        margin: 18px 20px;
    }
</style>
@endsection
@section('footer_scripts')
    <script src="{{ URL::asset('assets/js/ckeditor/angular-ckeditor.min.js') }}"></script>
    <script type="text/javascript" src="{{asset('assets/js/ckeditor/ckeditor.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/ckeditor/config.js')}}"></script>
    <script> angular.module("myApp").requires.push('ckeditor');</script>
@endsection