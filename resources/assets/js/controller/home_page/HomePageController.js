(function () {
    'use strict';
    var json_url = null;
    var modalPromise;
    angular
        .module('wofoxApp')
        .controller('HomePageController', HomePageController)

    HomePageController.$inject = ['$scope'];
    function HomePageController($scope) {
        $scope.document_is_ready = true;
        angular.element('body').removeClass('document_not_ready');
        
        var homePage = this;
        homePage.menu_count = 0;
        homePage.menuLists = {};
        homePage.defaultMenuIndex = 0;
        homePage.setMenuFirstValue = function (count) {

            homePage.menu_count = count;
        };
        homePage.setMenuActive = function (index) {
            for (var i = 0; i < homePage.menu_count; i++) {
                homePage.menuLists[i] = index == i;
            }
        };
        homePage.setMenuActive1 = function (index) {
            homePage.defaultMenuIndex = index;
            homePage.setMenuActive(index);
        };
    }
})()