angular.module('services', []);
angular.module('controllers', ['directives']);
angular.module('directives', ['services']);

var wofoxApp = angular.module("wofoxApp", ['controllers', 'services', 'directives', 'ngMessages', 'ui.router', 'ui.bootstrap', '720kb.socialshare','angularLazyImg']);
wofoxApp.filter("groupBy", ["$filter", function($filter) {
    return function(pItem, index) {
        var condArray = [];
        if(angular.isObject(pItem)) {
            for(var i in pItem) {
                condArray.push(pItem[i]);
            };
        }
        else {
            condArray = pItem;
        }
        var newArray = $filter('orderBy')(condArray, 'st');
        return newArray;
    };

}]);