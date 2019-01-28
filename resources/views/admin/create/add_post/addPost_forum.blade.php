<fieldset style="padding-righ:3px">
    <div class="form-group row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('state', 'State', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8 bot-mspace">
            <select name="help_state_id" id="help_state_id" placeholder="Select state"  ng-model="state_list.name" class="form-control" ng-options="state_list.name for state_list in adminCtrl.state_list track by state_list.id">
            </select>
            @if($errors->has('help_state_id'))
                <small class="help-block" style="color:red">Please select state</small>
            @endif
        </div>
    </div>

    <div class="form-group row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('tag', 'Tag', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8 post-category">
            <div class="bot-mspace">
                {{ Form::select('helptags_id[]',helptags(), null,array('data-placeholder'=>'Select tag' , 'class' =>'form-control chzn-select', 'tabindex' => '8','multiple','id'=>'tagChoosen' )) }}
                @if($errors->has('helptags_id'))
                    <small class="help-block" style="color:red">Please select tag</small>
                @endif
            </div>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('Title', 'Title', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8">
            <div class="bot-mspace">
                {{ Form::text('title', null, array('class' => 'form-control','placeholder' => 'Title')) }}
                @if($errors->has('title'))
                    <small class="help-block" style="color:red">{{ $errors->first('title') }}</small>
                @endif
            </div>
        </div>
    </div>

    <div class="form-group row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('Images', 'Images', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8">
            {{ Form::file('image') }}
            @if($errors->has('image'))
                <small class="help-block" style="color:red">{{ $errors->first('image') }}</small>
            @endif
        </div>
    </div>
    <div class="form-group row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('description', 'Description', array('class' => 'col-form-label')) }}
        </div>

        <div class="col-lg-8">
            {{ Form::textarea('description', null, array('class' => 'ckeditor','placeholder' => 'description','ckeditor' => 'ckeditor','rows' => '15', 'id'=>'previewPost')) }}
            @if($errors->has('description'))
                <small class="help-block" style="color:red">{{ $errors->first('description') }}</small>
            @endif
        </div>
    </div>

    <div class="form-group row m-t-30"></div>
    <div class="form-group row">
        <div class="col-lg-9 ml-auto">
            <button  id="confirm_tel" ng-click="adminCtrl.submitdata()"  value="Add" ng-disabled=" !adminCtrl.state"  class="btn btn-default">{{$type}}</button>
        </div>
    </div>
</fieldset>
<script src="{{ URL::asset('assets/js/ckeditor/angular-ckeditor.min.js') }}"></script>
<script type="text/javascript" src="{{asset('assets/js/ckeditor/ckeditor.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/ckeditor/config.js')}}"></script>
<script> angular.module("wofoxApp").requires.push('ckeditor');</script>

