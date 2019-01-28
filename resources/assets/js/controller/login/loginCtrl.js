angular.module("controllers").controller('loginController', ['$scope', 'DataFactory','modalFactory','$window','$mdDialog',function($scope, DataFactory, modalFactory, $window, $mdDialog) {

    var csrf_token = document.getElementsByName('_token')[0].content;
    $scope.loginCtrl = {};


    $scope.loginCtrl.registerPopup = function(data){
        if(data == 'forget'){
            angular.element('#forgetPwdModal').modal('hide');
            $scope.mainCtrl.dialog_popup( $window.laroute.route("register.pop_up"));
        }else{
            angular.element('#loginModal').modal('hide');
            $scope.mainCtrl.dialog_popup( $window.laroute.route("register.pop_up"));
        }

    }

    $scope.loginCtrl.forget_pwd = function(){
        angular.element('#loginModal').modal('hide');
        $scope.mainCtrl.dialog_popup( $window.laroute.route("forget.password.pop_up"));
    }

    $scope.loginCtrl.cancelForget_Pwd = function(){
        angular.element('#forgetPwdModal').modal('hide');
        $scope.mainCtrl.dialog_popup( $window.laroute.route("login.pop_up"));

    }

    $scope.loginCtrl.send_email = function(pwd_email){
        DataFactory.http('POST',$window.laroute.route('forgetPassword'),{email:pwd_email}).then(function(data){
            $scope.loginCtrl.emailMsg = data.success;
        })
    }

    $scope.loginCtrl.loginUser = function(emailText, password) {
        var event_type = modalFactory.getData('event_type') ? modalFactory.getData('event_type') : null;
        var event_id = modalFactory.getData('event_id');
        var event_respId= modalFactory.getData('event_respId');
        var event_voteType= modalFactory.getData('event_voteType');
        $scope.loginCtrl.showLoder = true;
        var checkedValue = document.querySelector('.rememberCls');
        if(checkedValue != null){
            if(checkedValue.checked == true){
                $scope.rememberValue = 1 ;
            }else{
                $scope.rememberValue = 0 ;
            }
        }

        DataFactory.http("POST",$window.laroute.route('user.login',{
            _token: csrf_token,
            email: emailText,
            password: btoa(password),
            remember : $scope.rememberValue,
            event_type:event_type,
            event_id :event_id,
            event_responseid:event_respId,
            event_votetype:event_voteType,

        })).then(function(data) {
            if (data.error) {
                $scope.loginCtrl.showLoder = false;
                $scope.loginCtrl.loginErrMsg = data.error;
            } else {
                var response = data.post;
                $window.localStorage.setItem('post', response);
                location.href = data.url;
            }

        });
    };

}]);