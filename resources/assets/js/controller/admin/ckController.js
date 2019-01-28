
var ckEditorApp = angular.module('ckEditorCtrl', []);
ckEditorApp.controller('ckController', ['$scope', '$mdDialog', '$window','$http', function ($scope, $mdDialog, $window, $http) {

    $scope.uploadUrl = '';
    $scope.uploadFileUpload = function (filedata, pCallback) {

        var content = angular.element('meta[name=_token]').attr('content');
        var Url = $window.laroute.route('help.ck.image.upload');
        $http({
            method: "POST",
            headers: { 'Content-Type': undefined },
            transFormRequest :angular.identity,
            url: Url,
            data: filedata,
            _token: content
        }).then(function(response){
            $scope.uploadUrl = response.data.result;
            pCallback();
        },function(response){
            iziToast.show({
                title: 'Error',
                message:  response.data.message == 'File too large!' ? 'Maximum file size: 300 MB' : response.data.message,
                color: '#ff9933',
                position: 'topCenter'
            });
        });

    };

}]);

angular.module("wofoxApp").requires.push('ckEditorCtrl');