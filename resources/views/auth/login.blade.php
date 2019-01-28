@extends('layouts.app')
@section('body_class')
    login-class
@endsection

@section('content')
    <!-- Nav tabs -->
    <div class="fullscreen pt-0" ng-controller="loginController">
        <div class="bot-mspace bot-space">
            @include('auth.login_register_header')
            <div class="login_fixed">
                <div class="loginDialogPage loginpg_rightbar pr">
                    <div class="loginpg_rightInnr">
                        <div class="pr loginMinHt">
                            <div class="loginpg_rightInnr">
                                <div class="loginpg_left-sidebar pa">
                                    <div class="loginpg_leftInnr">
                                        <div class="loginpg_leftoverlay">
                                            <div class="loginpg_lefttop">
                                                <div class="loginpg_logo dc">
                                                    <a class="navbar-brand" href="/" title="WoFox" alt="WoFox"></a>
                                                </div>
                                                <div class="loginpg_content dc">
                                                    <h2>Visualize Your Creativity, Stay in Sync With Your Team & Increase Productivity.</h2>
                                                    <p>Easily plan, create, collaborate, and manage all your visual content creations from a single platform.</p>
                                                </div>
                                            </div>
                                            <div class="loginpg_bottomContent pa">
                                                <div class="dc">
                                                    Don't have an account?
                                                    <a class="btn btn-default" href="{{route('register')}}">Sign up</a>
                                                </div>fg
                                            </div>F
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="container-fluid" ng-controller="AuthController" id="login-page">
                                <div class="login_fixed">
                                    <div class="loginDialogPage loginpg_rightbar pr">
                                        <div class="loginpg_rightInnr">
                                            <div class="pr loginMinHt">
                                                <div class="login_mobileLogo"><a class="navbar-brand" href="/" title="WoFox" alt="WoFox"></a></div>
                                                <div class="loginpg_mobileSpace">
                                                    <p class="dc _login-socialhd">Log in with your social account:</p>
                                                    <div class="clearfix _social-lnk dc">
                                                        <a ng-click="$event.stopPropagation();auth.loginWithSocialCommon('login.facebook')">
                                                            <button class="btn _login-fb">
                                                                <span class="login_social_media"><i class="fa fa-facebook"></i></span><span>Facebook</span>
                                                            </button>
                                                        </a>
                                                        <a ng-click="$event.stopPropagation();auth.loginWithSocialCommon('login.twitter')">
                                                            <button class="btn _login-tw">
                                                                <span class="login_social_media"><i class="fa fa-twitter"></i></span><span>Twitter</span>
                                                            </button>
                                                        </a>
                                                        <a ng-click="$event.stopPropagation();auth.loginWithSocialCommon('login.googleplus')">
                                                            <button class="btn _login-gl">
                                                                <span class="login_social_media"><i class="fa fa-google"></i></span><span>Google</span>
                                                            </button>
                                                        </a>
                                                    </div>
                                                    <div class="dc"><p class="orTxt space">[or]</p></div>
                                                    <div ng-init="setFormOldValue('{{ old('user_name') }}', '{{ old('password') }}' )">
                                                        @if ($errors->any())
                                                            <ul>
                                                                @foreach ($errors->all() as $error)
                                                                    <li style="color: red">{{ $error }}</li>
                                                                @endforeach
                                                            </ul>
                                                        @endif
                                                        {{ Form::open(['method' => 'POST','route' => 'user.login', 'name' => 'loginForm']) }}
                                                        <div class="form-group">
                                                            <label for="exampleInputEmail1" class="">Email (or User name)</label>
                                                            {{ Form::text('user_name',null,['class' => 'form-control','placeholder' => 'eg., john@doe.com', "id" => "login_user_name",  'required' => 'required','ng-keyup' => 'auth.loginErrorValidation()','ng-model' => 'auth.logins.user_name', 'ng-change' => 'auth.userNameChange()']) }}
                                                            <div id="error_login_user_name" class="text-danger" role="alert" style="display: none;">
                                                                <div>Please enter your email / username</div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="password" class="">Password</label>
                                                            <div class="eye-non pr">
                                                                {{ Form::password('password',['class' => 'form-control','placeholder' => 'e.g., *******', "id" => "login_password", 'required' => 'required','ng-keyup' => 'auth.loginPasswordErrorValidation()','ng-model'=>'auth.signup.password','id'=>'password','ng-keyup'=>'auth.password_enter(\'password\');']) }}
                                                                <span ng-if="loginForm.password.$viewValue!=0">
                                                                 <span ng-click="auth.password_show('password')" ng-show="auth.password_view['password']"><span class="account-eye pa account-icon"></span></span>
                                                                  <span ng-click="auth.password_show('password')" ng-show="auth.password_hide['password']"><span class="account-icon pa account-slash"></span></span>
                                                                 </span>
                                                                <div id="error_login_password" class="text-danger" role="alert" style="display: none;">
                                                                    <div>Please enter your password</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="dr bot-mspace bot-space">
                                                            {{ Form::submit('Log in',['class' => "btn btn-default pull-right", 'id' => 'submit_form', 'disabled' => 'disable' ]) }}
                                                        </div>
                                                        {{ Form::close() }}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="loginpg_left-sidebar pa">
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



