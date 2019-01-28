angular.module("controllers").controller("adminReportController", ["$scope", "$window", "DataFactory", "$timeout", function ($scope, $window, DataFactory, $timeout) {


    var csrf_token = document.getElementsByName('_token')[0].content;

    $scope.adminReportCtrl = {};
    $scope.adminReportCtrl.currentPage = 1;
    $scope.adminReportCtrl.itemsPerPage = 10;
    $scope.adminReportCtrl.maxSize = 5;
    $scope.adminReportCtrl.showMove = false;
    $scope.adminReportCtrl.tableShow = true;
    $scope.adminReportCtrl.load = true;


    /*permission page*/
    $scope.adminReportCtrl.reportInitialData = function () {
        DataFactory.http('POST', $window.laroute.route('admin.tags_report.paginate')).then(function (data) {
            $scope.adminReportCtrl.tagData = data;
            $scope.adminReportCtrl.totalItem = data.total;
        })

    };
    $scope.adminReportCtrl.searchTag = function (searchValue) {
        $scope.adminReportCtrl.load = false;
        if(searchValue == 'All'){
            $scope.type=undefined;
        }
        $scope.page=undefined;
        if (searchValue == undefined) {
            $scope.adminReportCtrl.searchResultErr = "Please give tag name";
            $scope.adminReportCtrl.load = true;
        } else {
            if($scope.type != undefined){
                var requestData={
                    search_tag: searchValue,
                    type:$scope.type
                }
            }else{
                var requestData={
                    search_tag: searchValue
                }
            }

            var searchUrl = $window.laroute.route('admin.tags_report.paginate', requestData);
            DataFactory.http('POST', searchUrl).then(function (data) {
                if (data.total == 0) {
                    $scope.adminReportCtrl.searchResultErr = " No tag Found";
                    $scope.adminReportCtrl.totalItem = data.total;
                    $scope.adminReportCtrl.tableShow = false;
                    $scope.adminReportCtrl.load = true;

                } else {
                    $scope.adminReportCtrl.tagData = data;
                    $scope.searchData = "Search Result" + "  " + searchValue;
                    $scope.adminReportCtrl.totalItem = data.total;
                    $scope.adminReportCtrl.currentPage = data.current_page;
                    $scope.adminReportCtrl.tagData.path = data.path;
                    $scope.adminReportCtrl.dataType = 'search';
                    $scope.adminReportCtrl.searchResultErr = " ";
                    $scope.adminReportCtrl.tableShow = true;
                    $scope.adminReportCtrl.load = true;

                }
            })
        }

    };

    $scope.adminReportCtrl.itemsPerPageChange = function (currentPage, pageLimit, tagData) {
        $scope.adminReportCtrl.itemsPerPage = pageLimit;
        $scope.adminReportCtrl.pageLimit = pageLimit;
        $scope.adminReportCtrl.load = false;
        $scope.tagData = undefined;
        if (pageLimit != undefined && tagData != undefined && $scope.type == undefined) {
            var requestData = {
                page: currentPage,
                limit: $scope.adminReportCtrl.itemsPerPage,
                search_tag: tagData
            }
        } else if (pageLimit != undefined && $scope.type == undefined && tagData == undefined) {

            var requestData = {
                page: currentPage,
                limit: $scope.adminReportCtrl.itemsPerPage
            }
        }
        else if (pageLimit != undefined && $scope.type != undefined && tagData == undefined) {

            var requestData = {
                page: currentPage,
                limit: $scope.adminReportCtrl.itemsPerPage,
                type:$scope.type
            }
        }
        else if (pageLimit != undefined && $scope.type != undefined && tagData != undefined) {

            var requestData = {
                page: currentPage,
                limit: $scope.adminReportCtrl.itemsPerPage,
                type:$scope.type,
                search_tag: tagData
            }
        }

        DataFactory.http('POST', $scope.adminReportCtrl.tagData.path, requestData).then(function (data) {
            $scope.adminReportCtrl.load = true;
            $scope.adminReportCtrl.tagData = data;
            $scope.adminReportCtrl.totalItem = data.total;
            $scope.adminReportCtrl.currentPage = data.current_page;
        })
    }

    $scope.adminReportCtrl.pageChanged = function (currentPage, searchTagData) {
        if ($scope.adminReportCtrl.pageLimit != undefined && searchTagData == undefined && $scope.type == undefined) {
            var requestData = {
                page: currentPage,
                limit: $scope.adminReportCtrl.itemsPerPage,
            }
        }
        else if (searchTagData == undefined && $scope.adminReportCtrl.pageLimit == undefined && $scope.type == undefined) {
            var requestData = {
                page: currentPage
            }
        } else if (searchTagData != undefined && $scope.adminReportCtrl.pageLimit == undefined && $scope.type == undefined) {
            var requestData = {
                page: currentPage,
                search_tag: searchTagData
            }
        } else if (searchTagData != undefined && $scope.adminReportCtrl.pageLimit != undefined && $scope.type == undefined) {
            var requestData = {
                page: currentPage,
                limit: $scope.adminReportCtrl.itemsPerPage,
                search_tag: searchTagData
            }
        }else if (searchTagData == undefined && $scope.adminReportCtrl.pageLimit == undefined && $scope.type != undefined) {
                var requestData = {
                    page: currentPage,
                    type: $scope.type

                }
            }
        else if (searchTagData == undefined && $scope.adminReportCtrl.pageLimit != undefined && $scope.type != undefined) {
            var requestData = {
                page: currentPage,
                type: $scope.type,
                limit: $scope.adminReportCtrl.itemsPerPage

            }
        }else if (searchTagData != undefined && $scope.adminReportCtrl.pageLimit == undefined && $scope.type != undefined) {
                var requestData = {
                    page: currentPage,
                    search_tag: searchTagData,
                    type: $scope.type,
                }
            }else if (searchTagData != undefined && $scope.adminReportCtrl.pageLimit != undefined && $scope.type != undefined) {
                var requestData = {
                    page: currentPage,
                    search_tag: searchTagData,
                    type: $scope.type,
                    limit: $scope.adminReportCtrl.itemsPerPage
                }
            }
            DataFactory.http('POST', $scope.adminReportCtrl.tagData.path, requestData)
                .then(function (data) {
                    $scope.adminReportCtrl.tagData = data;
                    $scope.adminReportCtrl.totalItem = data.total;
                    $scope.adminReportCtrl.currentPage = data.current_page;
                    if ($scope.adminReportCtrl.pageLimit != undefined) {
                        $scope.adminReportCtrl.itemsPerPage = $scope.adminReportCtrl.pageLimit;
                    }
                    $window.scrollTo(0, 0);
                })

        };


        $scope.adminReportCtrl.categorySelect = function (type) {
            $scope.type = type;
            $scope.searchTagData=undefined;
            $scope.page=undefined;
            $scope.adminReportCtrl.load = false;
            var requestData = {
                type: type
            }
            DataFactory.http('POST', $window.laroute.route('admin.tags_report.paginate'), requestData).then(function (data) {
                if (data.total == 0) {
                    $scope.adminReportCtrl.searchResultErr = "No Tag Found";
                    $scope.adminReportCtrl.totalItem = data.total;
                    $scope.adminReportCtrl.tableShow = false;
                    $scope.adminReportCtrl.load = true;
                } else {
                    $scope.adminReportCtrl.tagData = data;
                    $scope.adminReportCtrl.totalItem = data.total;
                    $scope.adminReportCtrl.currentPage = data.current_page;
                    $scope.adminReportCtrl.tableShow = true;
                    $scope.adminReportCtrl.load = true;
                    $scope.adminReportCtrl.searchResultErr = " ";
                }

            })
        }
    }
    ]);
