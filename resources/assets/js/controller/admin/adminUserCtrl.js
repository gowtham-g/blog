angular.module("controllers").controller("adminUserController", ["$scope", "$window", "DataFactory", "$mdDialog", function ($scope, $window, DataFactory, $mdDialog) {

    $scope.adminUserCtrl = {};
    $scope.tagBtn = true;
    $scope.adminUserCtrl.currentPage = 1;
    $scope.adminUserCtrl.itemsPerPage = 10;
    $scope.adminUserCtrl.maxSize = 5;
    $scope.adminUserCtrl.showMove = false;
    $scope.adminUserCtrl.tagArray = [];
    $scope.adminUserCtrl.tableShow = true;
    $scope.adminUserCtrl.load = true;
    /*admin user*/
    $scope.adminUserCtrl.adminUserInitialData = function () {
        DataFactory.http('POST', $window.laroute.route('admin.user.paginate', {type: 'admin'})).then(function (data) {
            $scope.adminUserCtrl.userData = data;
            $scope.adminUserCtrl.totalItem = data.total;
        })
    }

    $scope.adminUserCtrl.searchUser = function (searchUserData, type, status) {
        $scope.adminUserCtrl.load = false;
        $scope.page=undefined;
        $scope.searchUserData=searchUserData;
        if (searchUserData == undefined) {
            $scope.adminUserCtrl.searchResultErr = "Please give name ";
            $scope.adminUserCtrl.load = true;
        } else {
            if($scope.viewType != undefined) {
                var requestData = {
                    search_name: searchUserData,
                    type: type,
                    viewType: $scope.viewType,
                    status: status
                }
            }else{
                var requestData = {
                    search_name: searchUserData,
                    type: type
                }
                }
            }
            DataFactory.http('POST', $window.laroute.route('admin.user.paginate', requestData)).then(function (data) {

                if (data.total == 0) {
                    $scope.adminUserCtrl.noUserErr = " No user Found";
                    $scope.adminUserCtrl.totalItem = data.total;
                    $scope.adminUserCtrl.tableShow = false;
                    $scope.adminUserCtrl.searchResultErr = "";
                    $scope.adminUserCtrl.load = true;
                } else {
                    $scope.adminUserCtrl.userData = data;
                    $scope.adminUserCtrl.noUserErr = " ";
                    $scope.searchData = "Search Result" + "  " + searchUserData;
                    $scope.adminUserCtrl.totalItem = data.total;
                    $scope.adminUserCtrl.userData.path = data.path;
                    $scope.adminUserCtrl.currentPage = data.current_page;
                    $scope.adminUserCtrl.dataType = 'search';
                    $scope.adminUserCtrl.searchResultErr = " ";
                    $scope.adminUserCtrl.tableShow = true;
                    $scope.adminUserCtrl.load = true;

                }
            })
        }


    $scope.adminUserCtrl.showAdminEditors = function () {
        $scope.adminUserCtrl.load = false;
        DataFactory.http('POST', $window.laroute.route('admin.show.admin_editors')).then(function (data) {
            $scope.adminUserCtrl.userData = data;
            $scope.adminUserCtrl.totalItem = data.total;
            $scope.adminUserCtrl.currentPage = data.current_page;
            $scope.adminUserCtrl.load = true;
        })
    }
    $scope.adminUserCtrl.itemsPerPageChange = function (currentPage, pageLimit, searchAdminUserData, type,status) {
        $scope.adminUserCtrl.load = false;
        $scope.adminUserCtrl.pageLimit = pageLimit;
        $scope.adminUserCtrl.itemsPerPage = pageLimit;
        $scope.searchAdminUserData=undefined;
        if ($scope.adminUserCtrl.pageLimit != undefined && searchAdminUserData != undefined && $scope.viewType == undefined) {
            var requestData = {
                page: currentPage,
                search_name: searchAdminUserData,
                limit: $scope.adminUserCtrl.pageLimit,
                type:type
            }
        }else if ($scope.adminUserCtrl.pageLimit != undefined && $scope.viewType != undefined && searchAdminUserData != undefined) {
            var requestData = {
                limit: $scope.adminUserCtrl.pageLimit,
                type: type,
                page: currentPage,
                viewType:$scope.viewType,
                status:status,
            }
        }
        else if ($scope.adminUserCtrl.pageLimit != undefined && $scope.viewType != undefined && searchAdminUserData == undefined) {
            var requestData = {
                limit: $scope.adminUserCtrl.pageLimit,
                type: type,
                page: currentPage,
                status:status,
                viewType:$scope.viewType
            }
        }else if ($scope.adminUserCtrl.pageLimit != undefined && $scope.viewType == undefined && searchAdminUserData == undefined) {
            var requestData = {
                limit: $scope.adminUserCtrl.pageLimit,
                type: type,
                page: currentPage
            }
        }

            DataFactory.http('POST', $scope.adminUserCtrl.userData.path , requestData)
                .then(function (data) {
                    $scope.adminUserCtrl.userData = data;
                    $scope.adminUserCtrl.totalItem = data.total;
                    $scope.adminUserCtrl.load = true;
                })


    }


    $scope.adminUserCtrl.pageChanged = function (currentPage, searchAdminUserData, type,status) {

        if (searchAdminUserData == undefined && $scope.viewType == undefined && $scope.adminUserCtrl.pageLimit == undefined) {
            var requestData = {
                page: currentPage,
                type: type
            }
        }
        else if (searchAdminUserData == undefined && $scope.viewType != undefined && $scope.adminUserCtrl.pageLimit == undefined) {
            var requestData = {
                page: currentPage,
                viewType:$scope.viewType,
                status:status,
                type: type
            }
        }
        else if (searchAdminUserData == undefined && $scope.viewType == undefined && $scope.adminUserCtrl.pageLimit != undefined) {
            var requestData = {
                page: currentPage,
                limit: $scope.adminUserCtrl.pageLimit,
                type: type
            }
        }
        else if (searchAdminUserData == undefined && $scope.viewType != undefined && $scope.adminUserCtrl.pageLimit != undefined) {
            var requestData = {
                page: currentPage,
                limit: $scope.adminUserCtrl.pageLimit,
                type: type,
                status:status,
                viewType:$scope.viewType

            }
        }
        else if (searchAdminUserData != undefined && $scope.adminUserCtrl.pageLimit == undefined && $scope.viewType == undefined) {
            var requestData = {
                page: currentPage,
                search_name: searchAdminUserData,
                type: type
            }
        } else if (searchAdminUserData != undefined && $scope.adminUserCtrl.pageLimit != undefined && $scope.viewType == undefined) {
            var requestData = {
                page: currentPage,
                search_name: searchAdminUserData,
                type: type,
                limit: $scope.adminUserCtrl.pageLimit
            }
        }
    else if (searchAdminUserData == undefined && $scope.adminUserCtrl.pageLimit != undefined && $scope.viewType != undefined) {
        var requestData = {
            page: currentPage,
            viewType:$scope.viewType,
            status:status,
            type: type,
            limit: $scope.adminUserCtrl.pageLimit
        }
    } else if (searchAdminUserData != undefined && $scope.adminUserCtrl.pageLimit != undefined && $scope.viewType != undefined) {
            var requestData = {
                page: currentPage,
                viewType:$scope.viewType,
                status:status,
                type: type,
                limit: $scope.adminUserCtrl.pageLimit,
                search_name: searchAdminUserData
            }
        }

        DataFactory.http('POST', $scope.adminUserCtrl.userData.path ,requestData)
            .then(function (data) {
                $scope.adminUserCtrl.userData = data;
                $scope.adminUserCtrl.totalItem = data.total;
                $scope.adminUserCtrl.currentPage = data.current_page;
                $window.scrollTo(0, 0);
            })

    }

    /*website user*/
    $scope.adminUserCtrl.websiteUserInitialData = function () {
        DataFactory.http('POST', $window.laroute.route('admin.user.paginate', {type: 'website'})).then(function (data) {
            $scope.adminUserCtrl.userData = data;
            $scope.adminUserCtrl.totalItem = data.total;
        })
    }

    $scope.adminUserCtrl.editUser = function (userId) {
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.user.edit", {id: userId}));
    }

    $scope.adminUserCtrl.updatePassword = function (userId, password, confirmPassword) {
        var data = {
            id: userId,
            password: password,
            password_confirmation: confirmPassword
        }
        DataFactory.http('POST', $window.laroute.route('change.profile.password', data)).then(function (data) {
            if (data.errors) {
                if (data.errors.password) {
                    $scope.adminUserCtrl.ErrMessage = data.errors.password[0];
                }
                else if (data.errors.password_confirmation) {
                    $scope.adminUserCtrl.ErrMessage = data.errors.password_confirmation[0];
                }
            } else {
                document.querySelector('.modal').style.display = "none";
                $scope.adminCtrl.swal_success('Password changed successfully');
            }
        })
    }

    $scope.adminUserCtrl.blockUser = function (userId, loginUser, index) {
        var data = {
            id: userId,
            is_login_user: loginUser
        };
        DataFactory.http('POST', $window.laroute.route('admin.user.block'), data).then(function (data) {
            $scope.adminUserCtrl.isLoginUser = data.is_login_user;
            $scope.adminUserCtrl.id = data.id;

            if ($scope.adminUserCtrl.id == userId && $scope.adminUserCtrl.isLoginUser == 1) {
                $scope.adminUserCtrl.userData.data[index].is_login_user = $scope.adminUserCtrl.isLoginUser;
            } else if ($scope.adminUserCtrl.id == userId && $scope.adminUserCtrl.isLoginUser != 1) {
                $scope.adminUserCtrl.userData.data[index].is_login_user = $scope.adminUserCtrl.isLoginUser;
            }
        })
    }

    $scope.adminUserCtrl.adminUser = function(userId, adminUser, index){
        var data = {
            id: userId,
            is_admin: adminUser
        };
        DataFactory.http('POST', $window.laroute.route('admin.web_user.is_admin'), data).then(function (data) {
            $scope.adminUserCtrl.isAdminUser = data.is_admin;
            $scope.adminUserCtrl.id = data.id;

            if ($scope.adminUserCtrl.id == userId && $scope.adminUserCtrl.isAdminUser == 1) {
                $scope.adminUserCtrl.userData.data[index].is_admin = $scope.adminUserCtrl.isAdminUser;
            } else if ($scope.adminUserCtrl.id == userId && $scope.adminUserCtrl.isLoginUser != 1) {
                $scope.adminUserCtrl.userData.data[index].is_admin = $scope.adminUserCtrl.isAdminUser;
            }
        })
    }

    $scope.adminUserCtrl.userType = function(viewType,type,status){
        $scope.viewType=viewType;
        $scope.searchUserData=undefined;
        $scope.page=undefined;
        var requestData={
            type:type,
            viewType:viewType,
            status:status
        }

        DataFactory.http('POST', $window.laroute.route('admin.user.paginate'),requestData).then(function (data) {
            $scope.adminUserCtrl.userData = data;
            $scope.adminUserCtrl.totalItem = data.total;
            $scope.adminUserCtrl.currentPage = data.current_page;
            $scope.adminUserCtrl.tableShow = true;
            $scope.adminUserCtrl.noUserErr = " ";
        })
    }

}]);