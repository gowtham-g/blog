angular.module("controllers").controller("registerController", ["$scope", "DataFactory", "$window", function($scope, DataFactory, $window) {

    var csrf_token = document.getElementsByName('_token')[0].content;
    $scope.registerCtrl = {};
    $scope.registerCtrl.registerClose = function() {
        document.getElementById('addpostregister').style.display = "none";
    }

    $scope.registerCtrl.loginPopup = function(){
        angular.element('#registerModel').modal('hide');
        $scope.mainCtrl.dialog_popup( $window.laroute.route("login.pop_up"));

    }

    $scope.registerCtrl.registerValue = function(fullName,userName,registerEmail,workspace,desgination,password,confirmPassword) {
        $scope.registerCtrl.showLoder = true;
        DataFactory.http("POST",$window.laroute.route('user.register',{
            _token: csrf_token,
            user_name: userName,
            full_name: fullName,
            email: registerEmail,
            workspace: workspace ? workspace:'' ,
            desgination : desgination ? desgination:'',
            password: btoa(password),
            password_confirmation: btoa(confirmPassword),
        })).then(function(data) {
                if(data.errors){
                    $scope.registerCtrl.showLoder = false;
                    if(data.errors.full_name){
                         $scope.registerCtrl.registerErr = data.errors.full_name[0];
                    }
                    else if (data.errors.email && ! data.errors.user_name) {
                        $scope.registerCtrl.registerErr = data.errors.email[0];
                    }
                    else if(data.errors.email && data.errors.user_name){

                        $scope.registerCtrl.registerErr = "The given user name and email is already Taken";
                    }
                    else if(data.errors.user_name && ! data.errors.email){

                        $scope.registerCtrl.registerErr = "The given user name  is already Taken";
                    }
                }
                else{
                    location.href = data.url;
                }

            })
    };

}]);