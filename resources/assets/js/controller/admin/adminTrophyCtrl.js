angular.module("controllers").controller("adminTrophyController",["$scope","$window","DataFactory","$mdDialog",function($scope,$window,DataFactory,$mdDialog){

    $scope.adminTrophyCtrl = {};
    $scope.tagBtn = true;
    $scope.adminTrophyCtrl.currentPage = 1;
    $scope.adminTrophyCtrl.itemsPerPage = 10;
    $scope.adminTrophyCtrl.maxSize = 5;
    $scope.adminTrophyCtrl.showMove = false;
    $scope.adminTrophyCtrl.tagArray = [];
    $scope.adminTrophyCtrl.tableShow = true;
    $scope.adminTrophyCtrl.load=true;
    $scope.adminTrophyCtrl.trophyLoad=false;
    $scope.adminTrophyCtrl.home=true;

    $scope.adminTrophyCtrl.trophyInitialData = function () {
        DataFactory.http('POST', $window.laroute.route('admin.trophy.paginate')).then(function (data) {
            $scope.adminTrophyCtrl.trophyData = data;
            $scope.adminTrophyCtrl.totalItem = data.total;
            $scope.adminTrophyCtrl.home=true;
            $scope.adminTrophyCtrl.tableShow = true;
            $scope.adminTrophyCtrl.noTrophyErr = " ";
        })
    }

    $scope.adminTrophyCtrl.createTrophy = function(){
        $scope.adminCtrl.dialog_popup( $window.laroute.route("admin.trophy.create"));

    }


    $scope.adminTrophyCtrl.storeTrophy = function (name, range) {
        $scope.adminTrophyCtrl.trophyLoad=true;
        if (name == undefined && range == undefined) {
            $scope.adminTrophyCtrl.trophyErrorMsg = "Please fill the required fields";
            $scope.adminTrophyCtrl.trophyLoad=false;
        } else {
            var data = {
                name: name,
                range: range
            };
            DataFactory.http('POST', $window.laroute.route('admin.trophy.store'), data).then(function (data) {
                if (data.errors) {
                    $scope.adminTrophyCtrl.trophyLoad=false;
                    if (data.errors.name) {
                        $scope.adminTrophyCtrl.trophyErrorMsg  = data.errors.name[0];
                    }
                    else if (data.errors.range) {
                        $scope.adminTrophyCtrl.trophyErrorMsg  = data.errors.range[0];
                    }
                } else {
                    document.querySelector('.modal').style.display = "none";
                    $scope.adminTrophyCtrl.trophyLoad=false;
                    $scope.adminCtrl.swal_success('Trophy created successfully','create');
                }

            })
        }

    }
    $scope.adminTrophyCtrl.deleteTrophy = function (trophyId,index) {
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

                    var url = window.laroute.route("admin.trophy.delete", {id: trophyId});
                    DataFactory.http('get', url, '').then(function (data, status, headers, config) {
                        $scope.adminCtrl.swal_delete();
                        $scope.adminTrophyCtrl.trophyData.data.splice(index,1);
                    })
                } else {
                    $scope.adminCtrl.swal_cancelalert();
                }
            },
            function () {
                return false;
            });
    }

    $scope.adminTrophyCtrl.editTrophy = function (trophyId,index) {
        $scope.adminCtrl.index = index;
        $scope.adminCtrl.trophyData = $scope.adminTrophyCtrl.trophyData;
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.trophy.edit", {id: trophyId}));

    }
    $scope.adminTrophyCtrl.editTrophyData = function (trophyId) {
        DataFactory.http('POST', $window.laroute.route("admin.trophy.edit_data"),
            {id: trophyId}).then(function (data) {
            $scope.adminTrophyCtrl.data = data;
        })
    }
    $scope.adminTrophyCtrl.updateTrophy = function ( trophyId,name, range) {
        $scope.adminTrophyCtrl.trophyLoad=true;
        var data = {
            id:trophyId,
            name: name,
            range: range
        };

            $scope.adminTrophyCtrl.trophyErrorMsg  = "";
            DataFactory.http('POST', $window.laroute.route('admin.trophy.update'), data).then(function (data) {
                if (data.errors) {
                    $scope.adminTrophyCtrl.trophyLoad=false;
                    if (data.errors.name) {
                        $scope.adminTrophyCtrl.trophyErrorMsg  = data.errors.name[0];
                    }
                    else if (data.errors.range) {
                        $scope.adminTrophyCtrl.trophyErrorMsg  = data.errors.range[0];
                    }
                } else {
                    $scope.adminCtrl.trophyData.data.splice($scope.adminCtrl.index, 1, data)
                    $scope.adminTrophyCtrl.trophyData = $scope.adminCtrl.trophyData;
                    $scope.adminCtrl.trophyData = $scope.adminCtrl.index = null;
                    $('.modal').modal('hide');
                    $scope.adminTrophyCtrl.trophyLoad=false;
                    $scope.adminCtrl.swal_success('Trophy updated  successfully');
                }
            })

    }

    $scope.adminTrophyCtrl.searchTrophy = function (searchTrophyData) {
        $scope.adminTrophyCtrl.load=false;
        $scope.adminTrophyCtrl.home=false;
        $scope.page=undefined;
        if (searchTrophyData == undefined) {
            $scope.adminTrophyCtrl.searchResultErr = "Please give Trophy name";
            $scope.adminTrophyCtrl.load=true;
        } else {
            DataFactory.http('POST', $window.laroute.route('admin.trophy.paginate', {
                search_trophy: searchTrophyData
            })).then(function (data) {
                if (data.total == 0) {
                    $scope.adminTrophyCtrl.noTrophyErr = " No Trophy Found";
                    $scope.adminTrophyCtrl.totalItem = data.total;
                    $scope.adminTrophyCtrl.tableShow = false;
                    $scope.adminTrophyCtrl.searchResultErr="";
                    $scope.adminTrophyCtrl.load=true;
                } else {
                    $scope.adminTrophyCtrl.trophyData = data;
                    $scope.searchData = "Search Result" + "  " + searchTrophyData;
                    $scope.adminTrophyCtrl.totalItem = data.total;
                    $scope.adminTrophyCtrl.trophyData.path = data.path;
                    $scope.adminTrophyCtrl.currentPage = data.current_page;
                    $scope.adminTrophyCtrl.dataType = 'search';
                    $scope.adminTrophyCtrl.searchResultErr = " ";
                    $scope.adminTrophyCtrl.tableShow = true;
                    $scope.adminTrophyCtrl.load=true;

                }
            })
        }
    }

    $scope.adminTrophyCtrl.itemsPerPageChange = function (currentPage, pageLimit, searchTrophyData) {
        $scope.adminTrophyCtrl.itemsPerPage  = pageLimit;
        $scope.adminTrophyCtrl.pageLimit = pageLimit;
        $scope.adminTrophyCtrl.load = false;
        $scope.searchTrophyData=undefined;
        if (pageLimit != undefined && searchTrophyData != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.adminTrophyCtrl.itemsPerPage,
                search_point:searchTrophyData
            }
        } else if (pageLimit != undefined) {

            var requestData={
                page:currentPage,
                limit:$scope.adminTrophyCtrl.itemsPerPage
            }
        }

        DataFactory.http('POST', $scope.adminTrophyCtrl.trophyData.path , requestData).then(function (data) {
            $scope.adminTrophyCtrl.load = true;
            $scope.adminTrophyCtrl.trophyData = data;
            $scope.adminTrophyCtrl.totalItem = data.total;
            $scope.adminTrophyCtrl.currentPage = data.current_page;

        })
    }

    $scope.adminTrophyCtrl.pageChanged = function (currentPage, searchTrophyData) {

        if ($scope.adminTrophyCtrl.pageLimit != undefined && searchTrophyData == undefined) {

            var requestData={
                page:currentPage,
                limit:$scope.adminTrophyCtrl.itemsPerPage,
                search_trophy:searchTrophyData
            }
        }
        else if (searchTrophyData == undefined && $scope.adminTrophyCtrl.pageLimit == undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.adminTrophyCtrl.itemsPerPage

            }
        } else if (searchTrophyData != undefined && $scope.adminTrophyCtrl.pageLimit == undefined) {
            var requestData={
                page:currentPage,
                search_trophy:searchTrophyData
            }
        }
        else if (searchTrophyData != undefined && $scope.adminTrophyCtrl.pageLimit != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.adminTrophyCtrl.itemsPerPage,
                search_trophy:searchTrophyData
            }
        }

        DataFactory.http('POST', $scope.adminTrophyCtrl.trophyData.path , requestData)
            .then(function (data) {
                $scope.adminTrophyCtrl.trophyData = data;
                $scope.adminTrophyCtrl.totalItem = data.total;
                $scope.adminTrophyCtrl.currentPage = data.current_page;
                if($scope.adminTrophyCtrl.pageLimit != undefined){
                    $scope.adminTrophyCtrl.itemsPerPage = $scope.adminTrophyCtrl.pageLimit;
                }
                $window.scrollTo(0, 0);
            })
    };
}])