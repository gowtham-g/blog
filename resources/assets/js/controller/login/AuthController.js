(function () {
    'use strict';
    angular
        .module('wofoxApp')
        .controller('AuthController', AuthController)


    AuthController.$inject = ['$scope', 'DataFactory', '$window', 'modalFactory','$mdDialog'];
    function AuthController($scope, DataFactory, $window, modalFactory,$mdDialog) {
        //var auth = this;
        $scope.auth = {};
        $scope.auth.login_window_show = true;
        $scope.auth.logins = {};
        $scope.auth.signup = {};
        $scope.auth.userNameChange = function () {
            if($scope.auth.logins.user_name)
                $("#submit_form").removeAttr('disabled');
        }
        /**
         * @param type
         * display the login, signup, forgot form page
         * */
        $scope.auth.userForm = function (type) {
            if (type == 'forgot') {
                $scope.auth.authentication_class = 'forgot-dialog';
                $scope.auth.login_window_show = false;
                $scope.auth.signup_window_show = false;
                $scope.auth.forgot_passoword_window_show = true;
            } else if (type == 'login' || type == undefined) {
                $scope.auth.authentication_class = 'login-dialog';
                $scope.auth.login_window_show = true;
                $scope.auth.signup_window_show = false;
                $scope.auth.forgot_passoword_window_show = false;
            } else if (type == 'signup') {
                $scope.auth.authentication_class = 'signup-dialog';
                $scope.auth.login_window_show = false;
                $scope.auth.signup_window_show = true;
                $scope.auth.forgot_passoword_window_show = false;
            }
        };

        $scope.auth.scopePharse = function () {
            if ($scope.auth.logins.user_name) {
                angular.element("#submit_form").removeAttr('disabled');
            }
        }




        $scope.auth.userForm(modalFactory.getData('popup_type'));
        /*Login functionality*/
        $scope.auth.logins.force_login = false;
        $scope.auth.invalid_logins = false;
        $scope.auth.loginRequest = function () {
            var data = {
                user_name: $scope.auth.logins.user_name,
                password: btoa($scope.auth.logins.password),
                remember: 0,
            };
            console.log(data)
            $scope.auth.login_password_error = false;
            $scope.auth.login_button_disable = true;
            $scope.auth.login_err_msg = '';
            var url = $window.laroute.route("user.login");
            var header = {'X-Requested-With': 'XMLHttpRequest'};
            DataFactory.http('post', url, data, header)
                .then(function (data) {
                    $scope.auth.login_button_disable = false;
                    if (data.url) {
                        $('#login_modal_id').hide();
                    }
                    else if(data.error) {
                        $scope.auth.invalid_logins = true;
                    }
                }).finally(function () {
            });
        };
        $scope.auth.killOldSeesions = function() {
            $('#already_loggedin_close').click();
            $scope.auth.ajax_loader = true;
            $scope.auth.logins.force_login = true;
            $scope.auth.loginRequest();
        }

        /* Validation functionality*/
        $scope.auth.form_validation = function (type) {
            var data = {
                user_name: $scope.auth.signup.user_name,
                name: $scope.auth.signup.fullname,
                email: $scope.auth.signup.email,
                password: $scope.auth.signup.password,
                password_confirmation: $scope.auth.signup.confirmpassword,

            };
            if (type == 'user_name') {
                $scope.auth.signup_err_msg = '';
                $scope.auth.signup_err_msg_uname = '';
                var data = {
                    user_name: $scope.auth.signup.user_name,
                };
                var _username = /^[A-Za-z0-9_]+$/;
                if ($scope.auth.signup.user_name.length < 3 || $scope.auth.signup.user_name.length > 20) {
                    $scope.auth.signup_err_msg_uname = 'Your username must contain minimum 6 and maximum 20 characters';
                } else if (!_username.test($scope.auth.signup.user_name)) {
                    $scope.auth.signup_err_msg_uname = "Your username can only contain letters, numbers and '_'";
                } else {
                    $scope.auth.signup_err_msg_uname = '';
                    var url = $window.laroute.route("user.usernameValidation");
                    DataFactory.http('post', url, data)
                        .then(function (data, status, headers, config) {
                            if (data['user_name']) {
                                $scope.auth.signup_err_msg_uname = data['user_name'][0];
                            }
                        })

                }
            } else if (type == 'fullname') {
                var ck_username = /^[0-9a-zA-Z\s]+$/;
                if (data['name'] == undefined || data['name'] == '' || data['name'].length == 0) {
                    $scope.auth.signup_err_msg_fname = 'Name field is required';
                }
                else if (data['name'].length < 3 || data['name'].length > 50) {
                    $scope.auth.signup_err_msg_fname = 'Your name must contain minimum 6 and maximum 50 characters';
                }
                else if (!ck_username.test(data['name'])) {
                    $scope.auth.signup_err_msg_fname = 'This name contains certain characters that aren\'t allowed';
                }
                else {
                    $scope.auth.signup_err_msg_fname = '';
                }
            } else if (type == "email") {
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if (data['email'] == undefined || data['email'] == '' || data['email'].length == 0) {
                    $scope.auth.signup_err_msg_email = 'Email field is required';
                } else if (!pattern.test(data['email'])) {
                    $scope.auth.signup_err_msg_email = 'Please enter a valid email address';
                }
                else {

                    $scope.auth.signup_err_msg_email = '';
                    var url = $window.laroute.route("user.emailValidation");
                    DataFactory.http('post', url, {'email': data['email']})
                        .then(function (data, status, headers, config) {
                            if (data['email']) {
                                $scope.auth.signup_err_msg_email = data['email'][0];
                            }
                        })
                }
            } else if (type == 'pwd') {
                if (data['password'] == undefined || data['password'] == '' || data['password'].length == 0) {
                    $scope.auth.signup_err_msg_pwd = 'Password field is required';
                } else if (data['password'].length < 6 || data['password'].length > 20) {
                    $scope.auth.signup_err_msg_pwd = 'Your password must contain minimum 6 and maximum 20 characters';
                }
                else {
                    $scope.auth.signup_err_msg_pwd = '';
                }

            } else if (type == 'cpwd') {
                if (data['password_confirmation'] == undefined || data['password_confirmation'] == '' || data['password_confirmation'].length == 0) {
                    $scope.auth.signup_err_msg_cpwd = 'Confirm password field is required';

                } else if (data['password'] != data['password_confirmation']) {
                    $scope.auth.signup_err_msg_cpwd = "Password doesn’t match. Try again!";
                }
                else {
                    $scope.auth.signup_err_msg_cpwd = '';
                }
            }
        }
        $scope.auth.signup = function (type) {
            $scope.auth.signup_err_msg = '';
            $scope.auth.signup_err_msg_uname = '';
            $scope.auth.signup_err_msg_fname = '';
            $scope.auth.signup_err_msg_email = '';
            $scope.auth.signup_err_msg_pwd = '';
            $scope.auth.signup_err_msg_cpwd = '';
            var error = false;
            // return;
            var data = {
                full_name: $scope.auth.signup.user_name,
                user_name: $scope.auth.signup.fullname,
                email: $scope.auth.signup.email,
                password: $scope.auth.signup.password,
                password_confirmation: $scope.auth.signup.confirmpassword,
                is_accept_offer: $scope.auth.signup.is_accept_offer,
                terms_and_conditions: $scope.auth.signup.terms_and_conditions,
            };
            $scope.auth.signup_button_disable = true;
            // $scope.auth.ajax_loader = true;
            var header = {'X-Requested-With': 'XMLHttpRequest'};
            var url = $window.laroute.route("user.register");
            DataFactory.http('post', url, data, header)
                .then(function (data) {



                    $scope.auth.signup_button_disable = false;
                    // $scope.auth.ajax_loader = false;
                    if (data['redirect']) {
                        location.href = data['redirect'];
                    }
                    $scope.auth.signup_button_disable = false;
                    // $scope.auth.ajax_loader = false;
                    if (data['name']) {
                        $scope.auth.signup_err_msg_fname = data['name'][0];
                    }
                    if (data['user_name']) {
                        $scope.auth.signup_err_msg_uname = data['user_name'][0];
                    }
                    if (data['email']) {
                        $scope.auth.signup_err_msg_email = data['email'][0];
                    }
                    if (data['password']) {
                        $scope.auth.signup_err_msg_pwd = data['password'][0];
                    }
                    if (data['password_confirmation']) {
                        $scope.auth.signup_err_msg_cpwd = data['password_confirmation'][0];
                    }
                    if (data['terms_and_conditions']) {
                        $scope.auth.accept_terms = "Accept to our Terms of Use and Privacy Policy for further proceeding";
                    }
                    if (data['error']) {
                        showErrorMessage(data['error']);
                    }
                }).finally(function () {
                // $scope.auth.ajax_loader = false;
            });
        }

        /*
         * forgot password functionality
         * */
        $scope.auth.forgotPassword = function () {
            $scope.auth.forgot_passwordbutton_disable = true;
            $scope.auth.forgot_error_msg = '';
            $scope.auth.forgot_success_msg = '';
            // $scope.auth.ajax_loader = true;
            var data = {
                email: $scope.auth.forgot_email,
            };
            var url = $window.laroute.route('forgot.password');
            DataFactory.http('post', url, data)
                .then(function (data) {
                    $scope.auth.forgot_passwordbutton_disable = false;
                    $scope.auth.forgot_success_msg = '';
                    if (data['success']) {
                        $scope.auth.forgot_success_msg = data['success'];
                    }
                    if (data['error']) {
                        $scope.auth.forgot_error_msg = data['error'][0];
                        //showErrorMessage(data['error']);
                    }
                    if (data.status_code == 422) {
                        //showErrorMessage(data.email[0]);
                        $scope.auth.forgot_error_msg = data.email[0];
                    }
                }).finally(function () {
                // $scope.auth.ajax_loader = false;
            });
        };
        $scope.auth.loginWithSocialCommon = function (route, provider) {
            console.log(route);
            var width = 900;
            var height = 600;
            var url = $window.laroute.route(route);
            var center_left = (screen.width / 2) - (width / 2);
            var center_top = (screen.height / 2) - (height / 2);
            window.open(url, provider, "scrollbars=1, width=" + width + ", height=" + height + ", left=" + center_left + ", top=" + center_top);

        }
        $scope.auth.password_hide = [];
        $scope.auth.password_view = [];
        $scope.auth.password_show = function (id) {
            var x = document.getElementById(id);
            if (x.type === "password") {
                x.type = "text";
                $scope.auth.password_view[id]=true;
                $scope.auth.password_hide[id]=false;
            } else {
                x.type = "password";
                $scope.auth.password_view[id]=false;
                $scope.auth.password_hide[id]=true;
            }
        };

        $scope.auth.password_enter = function (id) {
            var text = angular.element('#'+id).val();
            if(text) {
                $scope.auth.password_hide[id]=true;
                $scope.auth.password_view[id]=false;
            }
            else{
                $scope.auth.password_hide[id]=false;
                $scope.auth.password_view[id]=true;
            }
        }

        $scope.auth.loginErrorValidation = function() {
            if($("#login_user_name").val() == '') {
                $("#error_login_user_name").css('display', '');
                $("#submit_form").attr('disabled', 'disable');
            } else {
                $("#error_login_user_name").css('display', 'none');
            }

            if($("#login_user_name").val() != "" && $("#login_password").val() != "") {
                $("#submit_form").removeAttr('disabled');
            }
        }
        $scope.auth.loginPasswordErrorValidation = function() {
            if($("#login_password").val() == '') {
                $("#error_login_password").css('display', '');
                $("#submit_form").attr('disabled', 'disable');
            } else {
                $("#error_login_password").css('display', 'none');
            }

            if($("#login_user_name").val() != "" && $("#login_password").val() != "") {
                $("#submit_form").removeAttr('disabled');
            }
        }

        document.getElementById('login-page') && $(document).ready(function() {
            setTimeout(function(){
                $scope.auth.userNameChange(1);
                $("body").trigger( "click" );
            },300);
            if ($("#login_user_name").val()) {
                $("#submit_form").removeAttr('disabled');
            }
        });

    }

})();