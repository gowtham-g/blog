<fieldset>
    <div class="form-group row">
        <div class="col-lg-3 text-lg-right" style="padding:8px">
            {{ Form::label('name', 'Name', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8">
            {{ Form::text('name', null, array('class' => 'form-control','placeholder' => 'name')) }}
            @if($errors->has('name'))
                <small class="help-block" style="color: red">{{ $errors->first('name') }}</small>
            @endif
        </div>
    </div>
    <div class="form-group row">
        <div class="col-lg-3 text-lg-right" style="padding:8px">
            {{ Form::label('color', 'Color', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8">
            {{ Form::text('color_code', null, array('class' => 'form-control color-input','placeholder' => 'choose color...')) }}
            @if($errors->has('color_code'))
                <small class="help-block" style="color: red">{{ $errors->first('color_code') }}</small>
            @endif
        </div>
    </div>
    <div class="form-group row">
        <div class="col-lg-3 text-lg-right" style="padding:8px" >
            {{ Form::label('order_by', 'order_by', array('class' => 'col-form-label')) }}
        </div>
        <div class="col-lg-8">
            {{ Form::text('order_by', null, array('class' => 'form-control ','placeholder' => 'choose order_by...')) }}
            @if($errors->has('order_by'))
                <small class="help-block" style="color: red">{{ $errors->first('order_by') }}</small>
            @endif
        </div>
    </div>

    <div class="form-group row">
        <div class="col-lg-9 ml-auto">
            <button type="submit" id="confirm_tel" class="btn btn-default">{{$type}}</button>
        </div>
    </div>
</fieldset>

<script type="text/javascript" src="{{asset('assets/js/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js')}}"></script>

@section('footer_scripts')
    <script>
    $(document).ready(function () {
         $('.color-input').colorpicker({
            format: 'hex'
            });
    });
    </script>
@endsection