angular.module("controllers").controller("adminSiteMapUrlController", ["$scope", "$window", "DataFactory", "$mdDialog", function ($scope, $window, DataFactory, $mdDialog) {

    $scope.adminSiteMapUrlCtrl = {};
    $scope.adminSiteMapUrlCtrl.currentPage = 1;
    $scope.adminSiteMapUrlCtrl.itemsPerPage = 10;
    $scope.adminSiteMapUrlCtrl.maxSize = 5;
    $scope.adminSiteMapUrlCtrl.showMove = false;
    $scope.adminSiteMapUrlCtrl.tagArray = [];
    $scope.adminSiteMapUrlCtrl.tableShow = true;
    $scope.adminSiteMapUrlCtrl.load = true;

    $scope.adminSiteMapUrlCtrl.siteMapInitialData = function () {
        DataFactory.http('POST', $window.laroute.route('admin.site_map.paginate')).then(function (data) {
            $scope.adminSiteMapUrlCtrl.siteMapData = data;
            $scope.adminSiteMapUrlCtrl.totalItem = data.total;
        })
    }

    $scope.adminSiteMapUrlCtrl.searchPost = function (searchPostData) {
        $scope.adminSiteMapUrlCtrl.load = false;
        if(searchPostData == undefined){
            $scope.adminSiteMapUrlCtrl.noPostErr = "Please give value ";
            $scope.adminSiteMapUrlCtrl.load = true;
        }else{
            var data = {
                search_post: searchPostData,
            }
            DataFactory.http('POST', $window.laroute.route('admin.site_map.paginate', data)).then(function (data) {
                if (data.total == 0) {
                    $scope.adminSiteMapUrlCtrl.noPostErr = "No post found ";
                    $scope.adminSiteMapUrlCtrl.totalItem = data.total;
                    $scope.adminSiteMapUrlCtrl.tableShow = false;
                    $scope.adminSiteMapUrlCtrl.load = true;
                } else {
                    $scope.adminSiteMapUrlCtrl.tableShow = true;
                    $scope.adminSiteMapUrlCtrl.siteMapData = data;
                    $scope.adminSiteMapUrlCtrl.dataType = 'search';
                    $scope.adminSiteMapUrlCtrl.currentPage = data.current_page;
                    $scope.adminSiteMapUrlCtrl.totalItem = data.total;
                    $scope.searchData = "Search Result" + "  " + searchPostData;
                    $scope.adminSiteMapUrlCtrl.noPostErr = "";
                    $scope.adminSiteMapUrlCtrl.load = true;
                }
            })
        }

    }

    $scope.adminSiteMapUrlCtrl.itemPerPageChange = function (currentPage, pageLimit, searchPostData) {
        $scope.adminSiteMapUrlCtrl.load = false;
        $scope.adminSiteMapUrlCtrl.pageLimit = pageLimit;
        $scope.adminSiteMapUrlCtrl.itemsPerPage = pageLimit;
        $scope.searchPostData = undefined;
        if (pageLimit != undefined && searchPostData == undefined) {
            var requestData = {
                page: currentPage,
                limit: $scope.adminSiteMapUrlCtrl.pageLimit,
                search_post: searchPostData
            }
        } else if (pageLimit != undefined) {
            var requestData = {
                page: currentPage,
                limit: $scope.adminSiteMapUrlCtrl.pageLimit
            }
        }

        DataFactory.http('POST', $window.laroute.route('admin.site_map.paginate'), requestData).then(function (data) {
            $scope.adminSiteMapUrlCtrl.siteMapData = data;
            $scope.adminSiteMapUrlCtrl.totalItem = data.total;
            $scope.adminSiteMapUrlCtrl.load = true;
            $scope.adminSiteMapUrlCtrl.currentPage = data.current_page;
        })

    }
    $scope.adminSiteMapUrlCtrl.pageChanged = function (currentPage, searchPostData) {
        if ($scope.adminSiteMapUrlCtrl.pageLimit != undefined && searchPostData == undefined) {

            var requestData = {
                page: currentPage,
                limit: $scope.adminSiteMapUrlCtrl.itemsPerPage,
                search_post: searchPostData
            }
        }
        else if (searchPostData == undefined && $scope.adminSiteMapUrlCtrl.pageLimit == undefined) {
            var requestData = {
                page: currentPage,
                limit: $scope.adminSiteMapUrlCtrl.itemsPerPage

            }
        } else if (searchPostData != undefined && $scope.adminSiteMapUrlCtrl.pageLimit == undefined) {
            var requestData = {
                page: currentPage,
                search_post: searchPostData
            }
        }
        else if (searchPostData != undefined && $scope.adminSiteMapUrlCtrl.pageLimit != undefined) {
            var requestData = {
                page: currentPage,
                limit: $scope.adminSiteMapUrlCtrl.itemsPerPage,
                search_post: searchPostData
            }
        }

        DataFactory.http('POST', $scope.adminSiteMapUrlCtrl.siteMapData.path, requestData)
            .then(function (data) {
                $scope.adminSiteMapUrlCtrl.siteMapData = data;
                $scope.adminSiteMapUrlCtrl.totalItem = data.total;
                $scope.adminSiteMapUrlCtrl.currentPage = data.current_page;
                if ($scope.adminSiteMapUrlCtrl.pageLimit != undefined) {
                    $scope.adminSiteMapUrlCtrl.itemsPerPage = $scope.adminSiteMapUrlCtrl.pageLimit;
                }
                $window.scrollTo(0, 0);
            })

    };

    $scope.adminSiteMapUrlCtrl.siteMapUrl = function (type) {

        if (type == 'image') {
            DataFactory.http('GET', $window.laroute.route('sitemap.images'));
        } else if (type == 'video') {
            DataFactory.http('GET', $window.laroute.route('sitemap.videos'));

        } else if (type == 'post') {
            DataFactory.http('GET', $window.laroute.route('sitemap.news'));
        }
    }

}]);