
(function () {
    'use strict';
    angular.module('wofoxApp')

        .filter('unsafe',['$sce',function ($sce) {
            return function (val) {
                return $sce.trustAsHtml(val);
            };
        }]);
})();