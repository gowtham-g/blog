<fieldset>
    <div class="form-group row m-t-30">

    </div>
    <div class="row">

        <div class="col-lg-3 text-lg-right">
            {{ Form::label('name', 'Name', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8 bot-mspace">
            {{ Form::text('name', null, array('class' => 'form-control','placeholder' => 'Name')) }}
            @if($errors->has('name'))
                <small class="help-block" style="color:red">{{ $errors->first('name') }}</small>
            @endif
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('category', 'Category', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8 bot-mspace">
            {{Form::select('parent_id',$categories, isset($helpCategory->parent_id)?$helpCategory->parent_id:"",array('class' =>'form-control chzn-select','placeholder' => 'Select parent category','tabindex' => '2'))}}
            @if($errors->has('parent_id'))
                <small class="help-block" style="color:red">Please select category</small>
            @endif
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('Icon', 'Icon', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8 bot-mspace">
            {{ Form::text('icon', null, array('class' => 'form-control','placeholder' => 'Icon')) }}
            @if($errors->has('icon'))
                <small class="help-block" style="color:red">{{ $errors->first('icon') }}</small>
            @endif
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('Color', 'Color', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8 bot-mspace">
            {{ Form::text('color', null, array('class' => 'form-control','placeholder' => 'Color code')) }}
            @if($errors->has('color'))
                <small class="help-block" style="color:red">{{ $errors->first('color') }}</small>
            @endif
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('Description', 'Description', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8 bot-mspace">
            {{ Form::text('description', null, array('class' => 'form-control','placeholder' => 'Description')) }}
            @if($errors->has('description'))
                <small class="help-block" style="color:red">{{ $errors->first('description') }}</small>
            @endif
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('Is display disable', 'Is display disable', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8 bot-mspace">
            <div class="form-check row m-t-10">
                <div class="col-lg-12">
                    <label class="custom-control custom-radio signin_radio1">
                        {{ Form::radio('is_display_disable', '1', true, array('class' => 'custom-control-input')) }}
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">Yes</span>
                    </label>
                    <label class="custom-control custom-radio signin_radio2">
                        {{ Form::radio('is_display_disable', '0', false, array('class' => 'custom-control-input')) }}
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">No</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('Is display date', 'Is display date', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8 bot-mspace">
            <div class="form-check row m-t-10">
                <div class="col-lg-12">
                    <label class="custom-control custom-radio signin_radio1">
                        {{ Form::radio('is_display_date', '1', true, array('class' => 'custom-control-input')) }}
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">Yes</span>
                    </label>
                    <label class="custom-control custom-radio signin_radio2">
                        {{ Form::radio('is_display_date', '0', false, array('class' => 'custom-control-input')) }}
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">No</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('Is active', 'Is active', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8 bot-mspace">
            <div class="form-check row m-t-10">
                <div class="col-lg-12">
                    <label class="custom-control custom-radio signin_radio1">
                        {{ Form::radio('is_active', '1', true, array('class' => 'custom-control-input')) }}
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">Active</span>
                    </label>
                    <label class="custom-control custom-radio signin_radio2">
                        {{ Form::radio('is_active', '0', false, array('class' => 'custom-control-input')) }}
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">Inactive</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-3 text-lg-right">
            {{ Form::label('Is user post', 'Is user post', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8 bot-mspace">
            <div class="form-check row m-t-10">
                <div class="col-lg-12">
                    <label class="custom-control custom-radio signin_radio1">
                        {{ Form::radio('is_user_post', '1', true, array('class' => 'custom-control-input')) }}
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">Yes</span>
                    </label>
                    <label class="custom-control custom-radio signin_radio2">
                        {{ Form::radio('is_user_post', '0', false, array('class' => 'custom-control-input')) }}
                        <span class="custom-control-indicator"></span>
                        <span class="custom-control-description">No</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-lg-9 ml-auto">
            <button type="submit" id="confirm_tel" class="btn btn-default">{{$type}}</button>
        </div>
    </div>
</fieldset>

