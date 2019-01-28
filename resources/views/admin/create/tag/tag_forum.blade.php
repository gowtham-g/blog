<fieldset>
    <div class="form-group row m-t-30">

    </div>
    <div class="form-group row">
        <div class="col-lg-3 text-lg-right" style="padding: 8px">
            {{ Form::label('name', 'Name', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8">
            {{ Form::text('name', null, array('class' => 'form-control','placeholder' => 'name')) }}
            @if($errors->has('name'))
                <small class="help-block" style="color: red;">{{ $errors->first('name') }}</small>
            @endif
        </div>
    </div>
    <div class="form-group row">
        <div class="col-lg-9 ml-auto">
            <button type="submit" id="confirm_tel" class="btn btn-default">{{$type}}</button>
        </div>
    </div>
</fieldset>

