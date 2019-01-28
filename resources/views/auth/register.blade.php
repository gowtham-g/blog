@extends('layouts.app')
@section('body_class')
    login-class
@endsection
u
@section('content')
    <!-- Nav tabs -->
    <div class="fullscreen pt-0" ng-controller="registerController">
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
                                                    Don't have an account? <a class="btn btn-default" href="{{route('login')}}">Log in</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bot-space">
                                <div class="active">
                                    <h5 class="w-100">Sign up</h5>
                                    <div class="social-blade">
                                        <p class="bot-mspace top-space">You'll be creating your first visual content in less than 1 minute.</p>
                                    </div>
                                    <form name="registerForm" class="elegant-aero" method="post">
                                        <div class="name-pwd bot-space">
                                            <div class="name-social w-100 d-inline-block pr  bot-mspace">
                                                <input type="text" name="fullname" class="form-control"
                                                       ng-model="register_fullName" placeholder="Full Name" required>
                                                <span ng-show="registerForm.fullname.$dirty && registerForm.fullname.$invalid">
                                                <p ng-show="registerForm.fullname.$error.required"
                                                   class="help-block errorMsg">Fullname field is required.</p>
                                            </span>
                                                <div class="name-img pa">
                                                    <i class="fa fa-user"></i>
                                                </div>
                                            </div>
                                            <div class="name-social w-100 d-inline-block pr  bot-mspace">
                                                <input type="text" name="username" class="form-control"
                                                       ng-model="register_userName" placeholder="User Name" required>
                                                <p ng-show="registerForm.username.$invalid && !registerForm.username.$pristine"
                                                   class="help-block errorMsg">Username field is required.</p>
                                                <div class="name-img pa">
                                                    <i class="fa fa-user"></i>
                                                </div>
                                            </div>
                                            <div class="name-social w-100 d-inline-block pr bot-mspace">
                                                <input type="email" class="form-control " name="email"
                                                       autocomplete="off"
                                                       ng-pattern='/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i'
                                                       ng-model="register_email" placeholder="Email Address"
                                                       name="email" required/>
                                                <div ng-messages="registerForm.email.$error"
                                                     ng-show="registerForm.email.$dirty">
                                                    <div ng-message="pattern" class="errorMsg">Please enter a valid
                                                        email address
                                                    </div>
                                                    <div ng-message="required" class="errorMsg">The Email is required
                                                    </div>
                                                </div>
                                                <div class="name-img pa">
                                                    <i class="fa fa-envelope-o"></i>
                                                </div>
                                            </div>
                                            <div class="name-social w-100 d-inline-block pr  bot-mspace">
                                                <input type="text" name="username" class="form-control"
                                                       ng-model="register_workspace" placeholder="Workspace" required>
                                                <div class="name-img pa">
                                                    <i class="fa fa-tasks"></i>
                                                </div>
                                            </div>
                                            <div class="name-social w-100 d-inline-block pr  bot-mspace">
                                                <input type="text" name="username" class="form-control"
                                                       ng-model="register_designation" placeholder="Designation" required>
                                                <div class="name-img pa">
                                                    <i class="fa fa-id-badge"></i>
                                                </div>
                                            </div>
                                            <div class="name-social w-100 d-inline-block pr bot-mspace">
                                                <input type="password" class="form-control" name="password"
                                                       placeholder="Password" ng-model="password"
                                                       ng-minlength="6" ng-maxlength="20" required>
                                                <div ng-messages="registerForm.password.$error" class="text-danger"
                                                     role="alert" ng-if="registerForm.password.$dirty">
                                                    <div ng-message="required">Password field is required</div>
                                                    <div ng-message-exp="['minlength', 'maxlength']">Your new password
                                                        must contain minimum 6 and maximum 20 characters
                                                    </div>
                                                </div>
                                                <div class="name-img pa">
                                                    <i class="fa fa-key" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <div class="name-social w-100 d-inline-block pr bot-mspace">
                                                <input type="password" class="form-control" name="retype_password"
                                                       placeholder="Confirm Password" ng-model="retype_password"
                                                       ng-pattern="password" required>
                                                <div ng-messages="registerForm.retype_password.$error"
                                                     class="text-danger" role="alert"
                                                     ng-if="registerForm.retype_password.$dirty">
                                                    <div ng-message="required">Confirm Password field is required</div>
                                                    <div ng-message="pattern">Password doesn't match. Try again!</div>
                                                </div>
                                                <div class="name-img pa">
                                                    <i class="fa fa-key" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <div class="form-group  mb-3">
                                                <div class="">
                                                    <div class="checkbox dl input_checkbox_bg no-mar signup_privacy_terms"
                                                         ng-init="checkVal = true">
                                                        <label class="no-mar">
                                                            <input name="terms_and_conditions" type="checkbox" class=""
                                                                   ng-checked="checkVal" ng-model="checkVal">
                                                            <span class="top-mspacesm"></span> By signing up
                                                            to {{ config('app.name') }}, you agree to our
                                                        </label>
                                                        <div class="text-danger" ng-if="!checkVal">Accept to our Terms
                                                            of Use and Privacy Policy for further proceeding
                                                        </div>
                                                    </div>
                                                    <div class="checkbox dl input_checkbox_bg no-mar">
                                                        <label class="no-mar">
                                                            <input type="checkbox" name="is_accept_offer"
                                                                   class="js-switch sm_toggle_checked is_accept_offer ng-pristine ng-untouched ng-valid ng-empty">
                                                            <span class="top-mspacesm"></span> Please update me on {{ config('app.name') }} updates and offers.
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                                <div class="clearfix">
                                                        <button ng-class="{'user-log':registerForm.$invalid}"
                                                                class="btn btn-default sign-but mt-1 submit float-right"
                                                                ng-disabled="registerForm.fullname.$invalid || registerForm.username.$invalid || registerForm.email.$invalid ||  registerForm.password.$invalid || registerForm.retype_password.$invalid || !checkVal"
                                                                ng-click="registerCtrl.registerValue(register_fullName,register_userName,register_email,register_workspace,register_designation,password,retype_password)">
                                                            Submit
                                                        </button>
                                                    <span class="errorMsg">@{{registerCtrl.registerErr}}</span>
                                                </div>
                                            <div class="dc pt-2">
                                                <p> Already have an account? <a href="{{route('login')}}"> Log in here.</a></p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection