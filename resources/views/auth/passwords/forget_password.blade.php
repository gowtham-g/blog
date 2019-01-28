@extends('layouts.app')

@section('content')
    <div class="main main-bg">
        <div class="head">
            <div class="head">
                <div class="login_fixed">
                    <div class="loginDialogPage loginpg_rightbar pr">
                        <div class="loginpg_rightInnr">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-3">

                                    </div>
                                    <div class="col-lg-5">
                                        <div class="pr loginMinHt bg-white space">
                                            <div class="login_mobileLogo"><a class="tutorial-head" href="/" title="{{ config('app.name') }}" alt="{{ config('app.name') }}">{{ config('app.name') }}</a></div>
                                            <div class="loginpg_mobileSpace">
                                                <div>
                                                    @if($verification_token)
                                                    <form class="form-horizontal" role="form" method="POST" action="{{route('user.password.reset')}}">
                                                        <input type="hidden" name="token" value="{{ $verification_token }}">
                                                        {{ csrf_field() }}
                                                        <div class="form-group my-2 pt-2{{ $errors->has('password') ? ' has-error' : '' }}">
                                                            <label for="name" class=" hor-spacesm bold">Password</label>
                                                            <input  type="password" class="form-control login-input mt-1" name="password" value="" placeholder="Password" >
                                                            @if ($errors->has('password'))
                                                                <span class="help-block text-danger">
                                                                   <strong>{{ $errors->first('password') }}</strong>
                                                                </span>
                                                            @endif
                                                        </div>
                                                        <div class="form-group my-2 pt-2">
                                                            <label for="name" class="hor-spacesm bold">Confirm password</label>
                                                            <input id="password-confirm" type="password" class="form-control" name="password_confirmation" placeholder="Confirm Password">
                                                            @if ($errors->has('password_confirmation'))
                                                                <span class="help-block text-danger">
                                                                   <strong>{{ $errors->first('password_confirmation') }}</strong>
                                                                </span>
                                                            @endif
                                                        </div>

                                                        <div class="form-group clearfix top-mspace">
                                                            <div class="float-right">
                                                                <button type="submit" class="sign-but">
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    @else
                                                        Token mismatched. Please try again!
                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection


