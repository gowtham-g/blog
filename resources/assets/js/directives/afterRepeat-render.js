'use strict';
angular.module("directives").directive('afterRepeatRender', ['$timeout', '$parse', function($timeout, $parse) {
    return {
        restrict: "A",
        scope: false,
        link: function(scope, element, attrs) {
            if (scope.$last) {
                $timeout(function() {
                    var func = $parse(attrs.afterRepeatRender);
                    func = func(scope);
                    if (typeof func == "function") {
                        func();
                    }
                });
            }
        }
    }
}]);

angular.module("directives").directive('localdatetime', ['$window', function ($window) {
    return {
        restrict: 'A',
        scope: {
            localdatetime: '<'
        },
        link: function (scope, element) {
            var result = $window.moment.utc(scope.localdatetime).local().format('DD MMM YYYY, H:mm');
            if(result == 'Invalid date'){
                result = "NULL";
            }
            angular.element(element).html(result)
        }
    };
}]);