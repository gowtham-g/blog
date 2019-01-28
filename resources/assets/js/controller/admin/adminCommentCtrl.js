angular.module("controllers").controller("adminCommentController", ["$scope", "$window", "DataFactory", "$mdDialog", function ($scope, $window, DataFactory, $mdDialog) {

    $scope.adminCommentCtrl = {};
    $scope.tagBtn = true;
    $scope.adminCommentCtrl.currentPage = 1;
    $scope.adminCommentCtrl.itemsPerPage = 10;
    $scope.adminCommentCtrl.maxSize = 5;
    $scope.adminCommentCtrl.showMove = false;
    $scope.adminCommentCtrl.tagArray = [];
    $scope.adminCommentCtrl.commentView = true;
    $scope.adminCommentCtrl.postView = false;
    $scope.adminCommentCtrl.load = true;

    $scope.adminCommentCtrl.commentInitialData = function () {
        DataFactory.http('POST', $window.laroute.route('admin.comment.paginate')).then(function (data) {
            $scope.adminCommentCtrl.commentData = data;
            $scope.adminCommentCtrl.totalItem = data.total;
        })
    }

    $scope.adminCommentCtrl.deleteComment = function (commentId, index) {

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4fb7fe',
            cancelButtonColor: '#EF6F6C',
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
                if (result.value == true) {

                    var url = window.laroute.route("admin.comment.delete", {id: commentId});
                    DataFactory.http('get', url, '').then(function (data, status, headers, config) {
                        $scope.adminCtrl.swal_delete();
                        $scope.adminCommentCtrl.commentData.data.splice(index, 1);
                    })
                } else {
                    $scope.adminCtrl.swal_cancelalert();
                }
            },
            function () {
                return false;
            });
    }

    $scope.adminCommentCtrl.editComment = function (commentId, index) {

        $scope.adminCtrl.index = index;
        $scope.adminCtrl.commentData = $scope.adminCommentCtrl.commentData;
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.comment.edit", {id: commentId}));
    }

    $scope.adminCommentCtrl.editCommentData = function (commentId) {
        DataFactory.http('POST', $window.laroute.route("admin.comment.edit_data"),
            {id: commentId}).then(function (data) {
            $scope.adminCommentCtrl.comment = data.comment;
            if (data.post != null) {
                $scope.adminCommentCtrl.postTitle = data.post.title;
            } else {
                $scope.adminCommentCtrl.postTitle = data.response.post.title;
            }
        })
    }

    $scope.adminCommentCtrl.updateComment = function (commentId, name) {
        var data = {
            id: commentId,
            comment: name,
        };
        DataFactory.http('POST', $window.laroute.route('admin.comment.update'), data).then(function (data) {
            if (data.errors) {
                if (data.errors.comment) {
                    $scope.adminCommentCtrl.commentErrorMsg = data.errors.comment[0];
                }
            } else {
                $scope.adminCtrl.commentData.data[$scope.adminCtrl.index].comment = data.comment;
                $('.modal').modal('hide');
                $scope.adminCtrl.swal_success('Comment updated  successfully');
            }
        })

    }

    $scope.adminCommentCtrl.changeSearchValue = function (searchType) {
        $scope.searchType = searchType;
    }

    $scope.adminCommentCtrl.searchComment = function (searchCommentData) {
        $scope.adminCommentCtrl.load = false;
        $scope.page = undefined;

        if (searchCommentData == undefined || $scope.searchType == undefined) {
            $scope.adminCommentCtrl.searchResultErr = "Please give the data and select type ";
            $scope.adminCommentCtrl.load = true;
        } else {
            if($scope.type != undefined || $scope.searchType == 'comment'){
                var requestData={
                    name: searchCommentData,
                    searchtype: $scope.searchType,
                    type:$scope.type
                }
            }else{
                $scope.type=undefined;
                var requestData={
                    name: searchCommentData,
                    searchtype: $scope.searchType,
                }
            }

            DataFactory.http('POST', $window.laroute.route('admin.comment.search',requestData
            )).then(function (data) {
                if (data.total == 0) {
                    $scope.adminCommentCtrl.noMailErr = " No result Found";
                    $scope.adminCommentCtrl.totalItem = data.total;
                    $scope.adminCommentCtrl.tableShow = false;
                    $scope.adminCommentCtrl.searchResultErr = "";
                    $scope.adminCommentCtrl.load = true;
                } else {
                    $scope.adminCommentCtrl.commentData = data;
                    $scope.searchData = "Search Result" + "  " + searchCommentData;
                    $scope.adminCommentCtrl.totalItem = data.total;
                    $scope.adminCommentCtrl.commentData.path = data.path;
                    $scope.adminCommentCtrl.currentPage = data.current_page;
                    $scope.adminCommentCtrl.dataType = 'search';
                    $scope.adminCommentCtrl.searchResultErr = " ";
                    $scope.adminCommentCtrl.load = true;
                    if ($scope.searchType == 'comment') {
                        $scope.adminCommentCtrl.commentView = true;
                        $scope.adminCommentCtrl.postView = false;

                    } else if ($scope.searchType == 'post') {
                        $scope.adminCommentCtrl.commentView = false;
                        $scope.adminCommentCtrl.postView = true;
                    }
                }
            })
        }
    }

    $scope.adminCommentCtrl.itemsPerPageChange = function (currentPage, pageLimit, searchCommentData) {
        $scope.adminCommentCtrl.load = false;
        $scope.adminCommentCtrl.pageLimit = pageLimit;
        $scope.adminCommentCtrl.itemsPerPage = pageLimit;
        if ($scope.adminCommentCtrl.pageLimit != undefined && searchCommentData != undefined && $scope.type == undefined) {

            var requestData = {
                page: currentPage,
                name: searchCommentData,
                searchtype: $scope.searchType,
                limit: $scope.adminCommentCtrl.pageLimit
            }
        } else if ($scope.adminCommentCtrl.pageLimit != undefined && searchCommentData == undefined && $scope.type == undefined) {

            var requestData = {
                page: currentPage,
                limit: $scope.adminCommentCtrl.pageLimit
            }
        }else if ($scope.adminCommentCtrl.pageLimit != undefined && searchCommentData == undefined && $scope.type != undefined) {

            var requestData = {
                page: currentPage,
                type: $scope.type,
                limit: $scope.adminCommentCtrl.pageLimit
            }
        }
        else if ($scope.adminCommentCtrl.pageLimit != undefined && searchCommentData != undefined && $scope.type != undefined) {

                var requestData = {
                    page: currentPage,
                    type:$scope.type,
                    limit: $scope.adminCommentCtrl.pageLimit,
                    name: searchCommentData,
                    searchtype: $scope.searchType,
                }
    }
        DataFactory.http('POST', $scope.adminCommentCtrl.commentData.path, requestData)
            .then(function (data) {
                $scope.adminCommentCtrl.commentData = data;
                $scope.adminCommentCtrl.totalItem = data.total;
                $scope.adminCommentCtrl.currentPage = data.current_page;
                $scope.adminCommentCtrl.load = true;
            })
    }

    $scope.adminCommentCtrl.pageChanged = function (currentPage, searchCommentData) {
        $scope.page = $scope.adminCommentCtrl.pageLimit;

        if ($scope.adminCommentCtrl.pageLimit != undefined && searchCommentData == undefined && $scope.type == undefined) {
            var requestData = {
                page: currentPage,
                limit: $scope.adminCommentCtrl.pageLimit
            }
        }
        else if (searchCommentData == undefined && $scope.adminCommentCtrl.pageLimit == undefined && $scope.type == undefined) {
            var requestData = {
                page: currentPage
            }
        } else if (searchCommentData != undefined && $scope.adminCommentCtrl.pageLimit == undefined && $scope.type == undefined) {
            var requestData = {
                page: currentPage,
                name: searchCommentData,
                searchtype: $scope.searchType
            }
        } else if (searchCommentData != undefined && $scope.adminCommentCtrl.pageLimit != undefined && $scope.type == undefined) {
            var requestData = {
                page: currentPage,
                name: searchCommentData,
                searchtype: $scope.searchType,
                limit: $scope.adminCommentCtrl.pageLimit
            }
        }
        else if (searchCommentData == undefined && $scope.adminCommentCtrl.pageLimit == undefined && $scope.type != undefined) {
            var requestData = {
                page: currentPage,
                type: $scope.type
            }
        }
        else if (searchCommentData == undefined && $scope.adminCommentCtrl.pageLimit != undefined && $scope.type != undefined) {
                var requestData = {
                    page: currentPage,
                    type: $scope.type,
                    limit: $scope.adminCommentCtrl.pageLimit
                }
            }
            else if (searchCommentData != undefined && $scope.adminCommentCtrl.pageLimit != undefined && $scope.type != undefined) {
                var requestData = {
                    page: currentPage,
                    type: $scope.type,
                    limit: $scope.adminCommentCtrl.pageLimit,
                    name: searchCommentData,
                    searchtype: $scope.searchType,
                }
            }
            DataFactory.http('POST', $scope.adminCommentCtrl.commentData.path, requestData)
                .then(function (data) {
                    $scope.adminCommentCtrl.commentData = data;
                    $scope.adminCommentCtrl.totalItem = data.total;
                    $scope.adminCommentCtrl.currentPage = data.current_page;
                    $window.scrollTo(0, 0);
                })
        }
        ;

        $scope.adminCommentCtrl.approveComment = function (commentId, isApprove, index) {
            $scope.adminCommentCtrl.load = false;
            var data = {
                id: commentId,
                approve: isApprove
            };
            DataFactory.http('POST', $window.laroute.route('admin.comment.approve'), data).then(function (data) {
                $scope.adminCommentCtrl.approve = data.approve;
                $scope.adminCommentCtrl.id = data.id;
                $scope.adminCommentCtrl.load = true;


                if ($scope.adminCommentCtrl.id == commentId && $scope.adminCommentCtrl.approve == 1) {
                    $scope.adminCommentCtrl.commentData.data[index].approve = $scope.adminCommentCtrl.approve;
                } else if ($scope.adminCommentCtrl.id == commentId && $scope.adminCommentCtrl.approve != 1) {
                    $scope.adminCommentCtrl.commentData.data[index].approve = $scope.adminCommentCtrl.approve;
                }
            })
        }
        $scope.adminCommentCtrl.commentType = function (type) {
            $scope.adminCommentCtrl.load = false;
            $scope.searchCommentData=undefined;
            $scope.page=undefined;
            $scope.searchType=undefined;
            $scope.type = type;

            DataFactory.http('POST', $window.laroute.route('admin.comment.paginate'), {type: $scope.type}).then(function (data) {
                $scope.adminCommentCtrl.commentData = data;
                $scope.adminCommentCtrl.totalItem = data.total;
                $scope.adminCommentCtrl.load = true;
                $scope.adminCommentCtrl.currentPage = data.current_page;
            })
        }

    }
    ]);