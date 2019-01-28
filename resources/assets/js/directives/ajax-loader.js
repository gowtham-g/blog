'use strict';
angular.module("directives").directive('ajax-loader', []) 
    .directive("ajaxLoaderLg", function() {
        return {
            template: '<div class="pageload"><div class="loading-container"><div class="loading-text"></div></div></div>',
            restrict: 'E',
            replace: true
        };
    })
    .directive("ajaxLoaderMd", function() {
        return {
            template: '<div class="tag-subdemo"><div class="pageload"><div class="loading-container"><div class="loading-text"> </div></div></div></div>',
            restrict: 'E',
            replace: true
        };
    })
    .directive("ajaxLoaderSm", function() {
        return {
            template: '<div class="pageload-small"><div class="loading-container"><div class="loading-text"></div></div></div>',
            restrict: 'E',
            replace: true
        };
    })
    .directive("ajaxLoaderCard", function() {
        return {
            template: '<div class="tag-subdemo-card"><div class="pageload"><div class="loading-container"> <div class="loading-text"></div></div></div></div>',
            restrict: 'E',
            replace: true
        };
    });

