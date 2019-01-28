iv ng-if ="auth.signup_window_show">
<div class="">

    <div class="bot-space bot-mspace">
        <p class="_login-socialhd _signup dl">Sign up</p>
    </div>

    <form name="signupForm" ng-submit="auth.signup()">
        You'll be creating your first visual content in less than 1 minute.
        <div class="form-group"></div>
        <div class="form-group">
            <label for="exampleInputEmail2" class="">Full Name</label>
            <input name="name" type="text" ng-model="auth.signup.fullname" class="form-control" id="exampleInputUsername2"
                   placeholder="eg., John Doe" ng-minlength="3" ng-maxlength="50"
                   ng-pattern="/^[A-Za-z0-9 ]+$/" autocomplete="off" required  ng-model-options="{ updateOn: 'blur' }">
            <div  ng-messages="signupForm.name.$error" class="text-danger" role="alert" ng-if="signupForm.name.$dirty">
                <div ng-message ="required">Name field is required</div>
                <div ng-message-exp="['minlength', 'maxlength']">Your name must contain minimum 3 and maximum 50 characters</div>
                <div ng-message="pattern">This name contains certain characters that aren't allowed</div>
            </div>

        </div>
        <div class="form-group">
            <label for="exampleInputEmail1" class="">User Name</label>
            <input type="text" name="user_name" ng-model="auth.signup.user_name"
                   class="form-control" id="exampleInputUsername1" placeholder="eg., JDoe123" ng-minlength="3" username ng-maxlength="20"
                   ng-pattern="/^[A-Za-z0-9]+$/" ng-keydown="auth.signup_err_msg_uname=''" ng-model-options="{ updateOn: 'blur' }" required autocomplete="off">
            <div  ng-messages="signupForm.user_name.$error" class="text-danger" role="alert" ng-if="signupForm.user_name.$dirty">
                <div ng-message ="required">Username field is required</div>
                <div ng-message-exp="['minlength', 'maxlength']">Your username must contain minimum 3 and maximum 20 characters</div>
                <div ng-message="pattern">Your username can only contain letters and numbers</div>
                <div ng-message="username"> This username is already taken</div>
            </div>
            {{--<div class="text-danger dl" ng-if="auth.signup_err_msg_uname">{{auth.signup_err_msg_uname}}</div>--}}
        </div>
        <div class="form-group">
            <label for="exampleInputEmail3" class="">Email Address</label>
            <input name="email" type="text" ng-model="auth.signup.email" ng-keydown="auth.signup_err_msg_email=''" class="form-control" id="exampleInputUsername3"
                   placeholder="e.g., john@doe.com" emailcheck required  autocomplete="off" ng-model-options="{ updateOn: 'blur' }"
                   ng-pattern='/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i'>
            <div  ng-messages="signupForm.email.$error" class="text-danger" role="alert" ng-if="signupForm.email.$dirty">
                <div ng-message ="required">The email field is required</div>
                <div ng-message="pattern">Please enter a valid email address</div>
                <div ng-message="emailcheck"> This email is already taken.  <a ng-click="auth.userForm('login')" class="">Login</a> or <a ng-click="auth.userForm('forgot')">reset your password</a></div>
            </div>
            {{--<div class="text-danger dl" ng-if="auth.signup_err_msg_email">{{auth.signup_err_msg_email}}</div>--}}
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1" class="">Password</label>
            <div class="eye-non pr">
                <input name="password" type="password" ng-model="auth.signup.password" class="form-control" ng-keyup="auth.password_enter('exampleInputPassword1')"  id="exampleInputPassword1"
                       placeholder="e.g., ******" ng-minlength="6" ng-maxlength="20" required ng-model-options="{ updateOn: 'blur' }">
                <span ng-if="signupForm.password.$viewValue!=0">
                                            <span ng-click="auth.password_show('exampleInputPassword1')" ng-show="auth.password_view['exampleInputPassword1']"><span class="account-eye pa account-icon"></span></span>
                                            <span ng-click="auth.password_show('exampleInputPassword1')" ng-show="auth.password_hide['exampleInputPassword1']"><span class="account-icon pa account-slash"></span></span>
                                            </span>

                <div  ng-messages="signupForm.password.$error" class="text-danger" role="alert" ng-if="signupForm.password.$dirty">
                    <div ng-message ="required">Password field is required</div>
                    <div ng-message-exp="['minlength', 'maxlength']">Your password must contain minimum 6 and maximum 20 characters</div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1" class="">Confirm Password</label>
            <div class="eye-non pr">
                <input type="password" ng-model="auth.signup.confirmpassword" name="confirmPassword" class="form-control" ng-keyup="auth.password_enter('exampleInputPassword2')" id="exampleInputPassword2" placeholder="e.g., ******"
                       compareto="auth.signup.password" required  ng-model-options="{ debounce: 500 }" />
                <span ng-if="signupForm.confirmPassword.$viewValue!=0">
                                            <span ng-click="auth.password_show('exampleInputPassword2')" ng-show="auth.password_view['exampleInputPassword2']"><span class="account-eye pa account-icon"></span></span>
                                            <span ng-click="auth.password_show('exampleInputPassword2')" ng-show="auth.password_hide['exampleInputPassword2']"><span class="account-icon pa account-slash"></span></span>
                                            </span>
                <div ng-messages="signupForm.confirmPassword.$error"  class="text-danger" role="alert" ng-if="signupForm.confirmPassword.$dirty" class="help-block">
                    <div ng-message="required">Confirm password field is required</div>
                    <div ng-message="compareto">Password doesn't match. Try again!</div>
                </div>
            </div>
        </div>
        <div class="">
            <div class="checkbox dl input_checkbox_bg no-mar signup_privacy_terms" ng-init="auth.signup.terms_and_conditions = true">
                <label class="no-mar">
                    <input name="terms_and_conditions" ng-model="auth.signup.terms_and_conditions" type="checkbox"
                           ng-required="!auth.signup.terms_and_conditions" ng-checked="true"/>
                    <span class="checkbox_bg top-mspacesm"></span> By signing up to WoFox, you agree to our
                    <a href="/terms-of-use" target="_blank">Terms of Use</a> and <a href="/privacy-policy" target="_blank">Privacy Policy.</a>
                </label>
                <div ng-messages="signupForm.terms_and_conditions.$error" ng-if="signupForm.terms_and_conditions.$dirty"  class="text-danger" role="alert"  class="help-block">
                    <div ng-message="required">Accept to our Terms of Use and Privacy Policy for further proceeding</div>
                </div>
            </div>
            <div class="checkbox dl input_checkbox_bg no-mar">
                <label class="no-mar">
                    <input type="checkbox" name="is_accept_offer" ng-model="auth.signup.is_accept_offer" class="js-switch sm_toggle_checked is_accept_offer"/>
                    <span class="checkbox_bg top-mspacesm"></span> Please update me on WoFox updates and offers.
                </label>
            </div>
        </div>
        <div class="dr bot-mspace bot-space">
            <button type="submit" ng-disabled="signupForm.$invalid" class="btn btn-default">Submit</button>
            <!--
            <button type="submit" ng-disabled="signupForm.$invalid" class="btn btn-default">Submit</button>
            <!--ng-disabled="auth.signup_button_disable"-->
        </div>

    </form>

    <div class="Userlogin_lk">
        <div class="registerLnk top-space "><p class="dr">Already a member?  <a ng-click="auth.userForm('login')" class="">Log in</a></p></div>
        <div class="btmlink dr signup_privacy_terms">
            <a href="/privacy-policy" target="_blank">Privacy policy</a>&nbsp;|&nbsp;
            <a href="/terms-of-use" target="_blank">Terms of use</a>
        </div>
    </div>
</div>

</div>