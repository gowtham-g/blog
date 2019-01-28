angular.module("controllers").controller("adminPointController", ["$scope", "$window", "DataFactory", "$mdDialog", function ($scope, $window, DataFactory, $mdDialog) {

    $scope.adminPointCtrl = {};
    $scope.tagBtn = true;
    $scope.adminPointCtrl.currentPage = 1;
    $scope.adminPointCtrl.itemsPerPage = 10;
    $scope.adminPointCtrl.maxSize = 5;
    $scope.adminPointCtrl.showMove = false;
    $scope.adminPointCtrl.tagArray = [];
    $scope.adminPointCtrl.tableShow = true;
    $scope.adminPointCtrl.load=true;
    $scope.adminPointCtrl.pointLoad=false;
    $scope.adminPointCtrl.home=true;

    $scope.adminPointCtrl.pointInitialData = function () {
        DataFactory.http('POST', $window.laroute.route('admin.point.paginate')).then(function (data) {
            $scope.adminPointCtrl.pointData = data;
            $scope.adminPointCtrl.totalItem = data.total;
            $scope.adminPointCtrl.tableShow = true;
            $scope.adminPointCtrl.home=true;
            $scope.adminPointCtrl.noPointErr = " ";
            $scope.searchPointData=undefined;
        })
    }

   $scope.adminPointCtrl.createPoint = function(){
       $scope.adminCtrl.dialog_popup( $window.laroute.route("admin.point.create"));

   }


    $scope.adminPointCtrl.storePoint = function (name, point) {
        $scope.adminPointCtrl.pointLoad=true;
        if (name == undefined && point == undefined) {
            $scope.adminPointCtrl.pointErrorMsg = "Please fill the required fields";
            $scope.adminPointCtrl.pointLoad=false;
        } else {
            var data = {
                name: name,
                points: point
            };
            DataFactory.http('POST', $window.laroute.route('admin.point.store'), data).then(function (data) {
                if (data.errors) {
                    $scope.adminPointCtrl.pointLoad=false;
                    if (data.errors.name) {
                        $scope.adminPointCtrl.pointErrorMsg  = data.errors.name[0];
                    }
                    else if (data.errors.points) {
                        $scope.adminPointCtrl.pointErrorMsg  = data.errors.points[0];
                    }
                } else {
                    document.querySelector('.modal').style.display = "none";
                    $scope.adminCtrl.swal_success('Point created successfully','create');
                    $scope.adminPointCtrl.pointLoad=false;
                }

            })
        }

    }
    $scope.adminPointCtrl.deletePoint = function (pointId,index) {
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

                    var url = window.laroute.route("admin.json_list.delete", {id: pointId});
                    DataFactory.http('get', url, '').then(function (data, status, headers, config) {
                        $scope.adminCtrl.swal_delete();
                        $scope.adminPointCtrl.pointData.data.splice(index,1);
                    })
                } else {
                    $scope.adminCtrl.swal_cancelalert();
                }
            },
            function () {
                return false;
            });
    }

    $scope.adminPointCtrl.editPoint = function (pointId,index) {
        $scope.adminCtrl.index = index;
        $scope.adminCtrl.pointData = $scope.adminPointCtrl.pointData;
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.point.edit", {id: pointId}));

    }
    $scope.adminPointCtrl.editPointData = function (pointId) {
        DataFactory.http('POST', $window.laroute.route("admin.point.edit_data"),
            {id: pointId}).then(function (data) {
            $scope.adminPointCtrl.data = data;
        })
    }
    $scope.adminPointCtrl.updatePoint = function ( pointId,name, point) {
        $scope.adminPointCtrl.pointLoad=true;
        var data = {
            id:pointId,
            name: name,
            points: point

        };
            DataFactory.http('POST', $window.laroute.route('admin.point.update'), data).then(function (data) {
                if (data.errors) {
                    $scope.adminPointCtrl.pointLoad=false;
                    if (data.errors.name) {
                        $scope.adminPointCtrl.pointErrorMsg  = data.errors.name[0];
                    }
                    else if (data.errors.points) {
                        $scope.adminPointCtrl.pointErrorMsg  = data.errors.points[0];
                    }
                } else {
                    $scope.adminCtrl.pointData.data.splice($scope.adminCtrl.index, 1, data)
                    $scope.adminPointCtrl.pointData = $scope.adminCtrl.pointData;
                    $scope.adminCtrl.pointData = $scope.adminCtrl.index = null;
                    $('.modal').modal('hide');
                    $scope.adminPointCtrl.pointLoad=false;
                    $scope.adminCtrl.swal_success('Point updated  successfully');
                }
            })
    }

    $scope.adminPointCtrl.searchPoint = function (searchPointData) {
        $scope.adminPointCtrl.load=false;
        $scope.page=undefined;
        $scope.adminPointCtrl.home=false;
        if (searchPointData == undefined) {
            $scope.adminPointCtrl.searchResultErr = "Please give Point type";
        } else {
            DataFactory.http('POST', $window.laroute.route('admin.point.paginate', {
                search_point: searchPointData
            })).then(function (data) {
                if (data.total == 0) {
                    $scope.adminPointCtrl.noPointErr = " No Point Found";
                    $scope.adminPointCtrl.totalItem = data.total;
                    $scope.adminPointCtrl.tableShow = false;
                    $scope.adminPointCtrl.searchResultErr="";
                    $scope.adminPointCtrl.load=true;
                } else {
                    $scope.adminPointCtrl.pointData = data;
                    $scope.searchData = "Search Result" + "  " + searchPointData;
                    $scope.adminPointCtrl.totalItem = data.total;
                    $scope.adminPointCtrl.pointData.path = data.path;
                    $scope.adminPointCtrl.currentPage = data.current_page;
                    $scope.adminPointCtrl.dataType = 'search';
                    $scope.adminPointCtrl.searchResultErr = " ";
                    $scope.adminPointCtrl.tableShow = true;
                    $scope.adminPointCtrl.load=true;

                }
            })
        }
    }

    $scope.adminPointCtrl.itemsPerPageChange = function (currentPage, pageLimit, searchPointData) {
        $scope.adminPointCtrl.itemsPerPage  = pageLimit;
        $scope.adminPointCtrl.pageLimit = pageLimit;
        $scope.adminPointCtrl.load = false;
        $scope.searchPointData=undefined;
        if (pageLimit != undefined && searchPointData != undefined) {
           var requestData={
               page:currentPage,
               limit:$scope.adminPointCtrl.itemsPerPage,
               search_point:searchPointData
           }
        } else if (pageLimit != undefined) {

            var requestData={
                page:currentPage,
                limit:$scope.adminPointCtrl.itemsPerPage
            }
        }

            DataFactory.http('POST', $scope.adminPointCtrl.pointData.path , requestData).then(function (data) {
                $scope.adminPointCtrl.load = true;
                $scope.adminPointCtrl.pointData = data;
                $scope.adminPointCtrl.totalItem = data.total;
            })
    }

    $scope.adminPointCtrl.pageChanged = function (currentPage, searchPointData) {

        if ($scope.adminPointCtrl.pageLimit != undefined && searchPointData == undefined) {

            var requestData={
                page:currentPage,
                limit:$scope.adminPointCtrl.itemsPerPage,
                search_point:searchPointData
            }
        }
        else if (searchPointData == undefined && $scope.adminPointCtrl.pageLimit == undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.adminPointCtrl.itemsPerPage

            }
        } else if (searchPointData != undefined && $scope.adminPointCtrl.pageLimit == undefined) {
            var requestData={
                page:currentPage,
                search_point:searchPointData
            }
        }
        else if (searchPointData != undefined && $scope.adminPointCtrl.pageLimit != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.adminPointCtrl.itemsPerPage,
                search_point:searchPointData
            }
        }

            DataFactory.http('POST', $scope.adminPointCtrl.pointData.path , requestData)
                .then(function (data) {
                    $scope.adminPointCtrl.pointData = data;
                    $scope.adminPointCtrl.totalItem = data.total;
                    $scope.adminPointCtrl.currentPage = data.current_page;
                    if($scope.adminPointCtrl.pageLimit != undefined){
                        $scope.adminPointCtrl.itemsPerPage = $scope.adminPointCtrl.pageLimit;
                    }
                    $window.scrollTo(0, 0);
                })
    };

}]);