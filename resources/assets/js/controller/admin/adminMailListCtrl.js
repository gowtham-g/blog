angular.module("controllers").controller("adminMailListController", ["$scope", "$window", "DataFactory", "$mdDialog", function ($scope, $window, DataFactory, $mdDialog) {

    $scope.adminMailListCtrl = {};
    $scope.tagBtn = true;
    $scope.adminMailListCtrl.currentPage = 1;
    $scope.adminMailListCtrl.itemsPerPage = 10;
    $scope.adminMailListCtrl.maxSize = 5;
    $scope.adminMailListCtrl.showMove = false;
    $scope.adminMailListCtrl.tagArray = [];
    $scope.adminMailListCtrl.tableShow = true;
    $scope.adminMailListCtrl.load = true;
    $scope.adminMailListCtrl.mailLoad=false;
    $scope.adminMailListCtrl.home=true;

    $scope.adminMailListCtrl.mailListInitialData = function () {
        DataFactory.http('POST', $window.laroute.route('admin.mail_list.paginate')).then(function (data) {
            $scope.adminMailListCtrl.mailListData = data;
            $scope.adminMailListCtrl.totalItem = data.total;
            $scope.adminMailListCtrl.home=true;
            $scope.adminMailListCtrl.tableShow = true;
            $scope.adminMailListCtrl.noMailErr = " ";
            $scope.searchMailData=undefined;
        })
    }

    $scope.adminMailListCtrl.createMailList = function () {
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.mail_list.create"));

    }


    $scope.adminMailListCtrl.storeMailList = function (name) {
        $scope.adminMailListCtrl.mailLoad=true;
        var data = {
            name: name,
        };
        DataFactory.http('POST', $window.laroute.route('admin.mail_list.store'), data).then(function (data) {
            if (data.errors) {
                $scope.adminMailListCtrl.mailLoad=false;
                if (data.errors.name) {
                    $scope.adminMailListCtrl.mailListErrorMsg = data.errors.name[0];
                }
            } else {
                document.querySelector('.modal').style.display = "none";
                $scope.adminMailListCtrl.mailLoad=false;
                $scope.adminCtrl.swal_success('MailList created successfully','create');
            }

        })
    }


    $scope.adminMailListCtrl.deleteMailList = function (mailListId,index) {
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

                    var url = window.laroute.route("admin.mail_list.delete", {id: mailListId});
                    DataFactory.http('get', url, '').then(function (data, status, headers, config) {
                        $scope.adminCtrl.swal_delete();
                        $scope.adminMailListCtrl.mailListData.data.splice(index,1);
                    })
                } else {
                    $scope.adminCtrl.swal_cancelalert();
                }
            },
            function () {
                return false;
            });
    }

    $scope.adminMailListCtrl.editMailList = function (mailListId,index) {
        $scope.adminCtrl.index = index;
        $scope.adminCtrl.mailListData = $scope.adminMailListCtrl.mailListData;
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.mail_list.edit", {id: mailListId}));

    }
    $scope.adminMailListCtrl.editMailListData = function (mailListId) {
        DataFactory.http('POST', $window.laroute.route("admin.mail_list.edit_data"),
            {id: mailListId}).then(function (data) {
            $scope.adminMailListCtrl.name = data.name;
        })
    }
    $scope.adminMailListCtrl.updateMailList = function (mailListId, name) {
        $scope.adminMailListCtrl.mailLoad=true;
        var data = {
            id: mailListId,
            name: name,
        };
        DataFactory.http('POST', $window.laroute.route('admin.mail_list.update'), data).then(function (data) {
            if (data.errors) {
                $scope.adminMailListCtrl.mailLoad=false;
                if (data.errors.name) {
                    $scope.adminMailListCtrl.mailListErrorMsg = data.errors.name[0];
                }
            } else {
                $scope.adminCtrl.mailListData.data.splice($scope.adminCtrl.index, 1, data)
                $scope.adminMailListCtrl.mailListData = $scope.adminCtrl.mailListData;
                $scope.adminCtrl.mailListData = $scope.adminCtrl.index = null;
                $('.modal').modal('hide');
                $scope.adminMailListCtrl.mailLoad=false;
                $scope.adminCtrl.swal_success('MailList updated  successfully');
            }
        })

    }

    $scope.adminMailListCtrl.searchMailList = function (searchMailListData) {
        $scope.adminMailListCtrl.load = false;
        $scope.adminMailListCtrl.home=false;
        if (searchMailListData == undefined) {
            $scope.adminMailListCtrl.searchResultErr = "Please give MailList type";
            $scope.adminMailListCtrl.load = true;
        } else {
            DataFactory.http('POST', $window.laroute.route('admin.mail_list.paginate', {
                search_mail: searchMailListData
            })).then(function (data) {
                if (data.total == 0) {
                    $scope.adminMailListCtrl.noMailErr = " No result Found";
                    $scope.adminMailListCtrl.totalItem = data.total;
                    $scope.adminMailListCtrl.tableShow = false;
                    $scope.adminMailListCtrl.searchResultErr = "";
                    $scope.adminMailListCtrl.load = true;
                } else {
                    $scope.adminMailListCtrl.mailListData = data;
                    $scope.searchData = "Search Result" + "  " + searchMailListData;
                    $scope.adminMailListCtrl.totalItem = data.total;
                    $scope.adminMailListCtrl.mailListData.path = data.path;
                    $scope.adminMailListCtrl.currentPage = data.current_page;
                    $scope.adminMailListCtrl.dataType = 'search';
                    $scope.adminMailListCtrl.searchResultErr = " ";
                    $scope.adminMailListCtrl.tableShow = true;
                    $scope.adminMailListCtrl.load = true;

                }
            })
        }
    }

    $scope.adminMailListCtrl.itemPerPageChange = function(currentPage, pageLimit, searchMailListData){
        $scope.adminMailListCtrl.itemsPerPage  = pageLimit;
        $scope.adminMailListCtrl.pageLimit = pageLimit;
        $scope.adminMailListCtrl.load = false;
        $scope.searchMailListData=undefined;
        if (pageLimit != undefined && searchMailListData != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.adminMailListCtrl.itemsPerPage,
                search_mail:searchMailListData
            }
        } else if (pageLimit != undefined) {

            var requestData={
                page:currentPage,
                limit:$scope.adminMailListCtrl.itemsPerPage
            }
        }

        DataFactory.http('POST', $scope.adminMailListCtrl.mailListData.path , requestData).then(function (data) {
            $scope.adminMailListCtrl.load = true;
            $scope.adminMailListCtrl.mailListData = data;
            $scope.adminMailListCtrl.totalItem = data.total;
            $scope.adminMailListCtrl.currentPage = data.current_page;
        })
    }

    $scope.adminMailListCtrl.pageChanged = function (currentPage, searchMailListData) {
        if ($scope.adminMailListCtrl.pageLimit != undefined && searchMailListData == undefined) {

            var requestData={
                page:currentPage,
                limit:$scope.adminMailListCtrl.itemsPerPage,
                search_mail:searchMailListData
            }
        }
        else if (searchMailListData == undefined && $scope.adminMailListCtrl.pageLimit == undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.adminMailListCtrl.itemsPerPage

            }
        } else if (searchMailListData != undefined && $scope.adminMailListCtrl.pageLimit == undefined) {
            var requestData={
                page:currentPage,
                search_mail:searchMailListData
            }
        }
        else if (searchMailListData != undefined && $scope.adminMailListCtrl.pageLimit != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.adminMailListCtrl.itemsPerPage,
                search_mail:searchMailListData
            }
        }
        DataFactory.http('POST', $scope.adminMailListCtrl.mailListData.path , requestData)
            .then(function (data) {
                $scope.adminMailListCtrl.mailListData = data;
                $scope.adminMailListCtrl.totalItem = data.total;
                $scope.adminMailListCtrl.currentPage = data.current_page;
                if($scope.adminMailListCtrl.pageLimit != undefined){
                    $scope.adminMailListCtrl.itemsPerPage = $scope.adminMailListCtrl.pageLimit;
                }
                $window.scrollTo(0, 0);
            })

    };

}]);