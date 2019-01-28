@extends('layouts.app')
<main>
    @section('content')
        <div ng-init="adminCtrl.categoryInit('{{old('category')}}')">
            <div class="outer">
                <div class="inner bg-container">
                    <div class="row">
                        <div class="col-12 data_tables">
                            <div class="card">
                                <div class="card-body seclect_form col-lg-12">
                                    <div class="card-body m-t-30 post-category">
                                            <form name="myForm" class="login_validator1" method="POST" enctype="multipart/form-data" action="{{route('category.post.store')}}">
                                            <div class="form-group row">
                                               <div class="col-lg-3 text-lg-right">
                                                    {{ Form::label('category', 'Category', array('class' => 'col-form-label')) }}
                                                </div>
                                                <div class="col-lg-8">
                                                    <div class="seclect_form bot-mspace">
                                                        {{Form::select('category',$category, NULL, array('data-placeholder'=>'Select category','ng-model'=>'adminCtrl.category','class' =>'form-control chzn-select','tabindex' => '8','multiple'))}}
                                                        @if($errors->has('category'))
                                                            <small class="help-block">Please select category</small>
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>
                                                @include('admin.create.add_post.addPost_forum', ['type' => 'Add'])
                                            </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            $(document).ready(function () {

                $(".chzn-select").chosen({
                    allow_single_deselect: true
                });
            });
        </script>
    @stop
</main>






