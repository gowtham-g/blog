angular.module("controllers").controller("adminTypeController", ["$scope", "$window", "DataFactory", function ($scope, $window, DataFactory) {

    var csrf_token = document.getElementsByName('_token')[0].content;
    $scope.adminTypeCtrl = {};
    $scope.tagBtn = true;
    $scope.adminTypeCtrl.currentPage = 1;
    $scope.adminTypeCtrl.itemsPerPage = 10;
    $scope.adminTypeCtrl.maxSize = 5;
    $scope.adminTypeCtrl.showMove = false;
    $scope.adminTypeCtrl.tagArray = [];
    $scope.adminTypeCtrl.tableShow = true;
    $scope.adminTypeCtrl.load = true;
    $scope.adminTypeCtrl.typeLoad=false;
    $scope.adminTypeCtrl.home=true;

    $scope.adminTypeCtrl.typeInitialData = function () {
        DataFactory.http('POST', $window.laroute.route('admin.type.paginate')).then(function (data) {
            $scope.adminTypeCtrl.typeData = data;
            $scope.adminTypeCtrl.totalItem = data.total;
            $scope.adminTypeCtrl.tableShow = true;
            $scope.adminTypeCtrl.noTypeErr=" ";
            $scope.searchTypeData=undefined;
        })
    };

    $scope.adminTypeCtrl.itemPerPageChange = function (currentPage, pageLimit, searchTypeData) {
        $scope.adminTypeCtrl.pageLimit = pageLimit;
        $scope.adminTypeCtrl.load = false;
        $scope.adminTypeCtrl.itemsPerPage = pageLimit;

        if (pageLimit != undefined && searchTypeData != undefined) {
            var requestData={
                page:currentPage,
                limit: $scope.adminTypeCtrl.pageLimit,
                search_type:searchTypeData
            }
        } else if (pageLimit != undefined) {
            var requestData={
                page:currentPage,
                limit: $scope.adminTypeCtrl.pageLimit,
            }
        }
            DataFactory.http('POST', $scope.adminTypeCtrl.typeData.path , requestData).then(function (data) {
                $scope.adminTypeCtrl.load = true;
                $scope.adminTypeCtrl.typeData = data;
                $scope.adminTypeCtrl.totalItem = data.total;
                $scope.adminTypeCtrl.currentPage =data.current_page;
            })
    }

    $scope.adminTypeCtrl.pageChanged = function (currentPage , searchTypeData) {
        $scope.searchTypeData=searchTypeData;
        if ($scope.adminTypeCtrl.pageLimit != undefined && searchTypeData == undefined) {
            var requestData={
                page:currentPage,
                limit: $scope.adminTypeCtrl.pageLimit,
            }
        }else if (searchTypeData == undefined && $scope.adminTypeCtrl.pageLimit == undefined) {
            var requestData={
                page:currentPage
            }
        } else if (searchTypeData != undefined && $scope.adminTypeCtrl.pageLimit == undefined) {
            var requestData={
                page:currentPage,
                search_type:searchTypeData
            }

        } else if (searchTypeData != undefined && $scope.adminTypeCtrl.pageLimit != undefined) {
            var requestData={
                page:currentPage,
                limit: $scope.adminTypeCtrl.pageLimit,
                search_type:searchTypeData
            }
        }
            DataFactory.http('POST', $scope.adminTypeCtrl.typeData.path , requestData)
                .then(function (data) {
                    $scope.adminTypeCtrl.typeData = data;
                    $scope.adminTypeCtrl.totalItem = data.total;
                    $scope.adminTypeCtrl.currentPage = data.current_page;
                    if($scope.adminTypeCtrl.pageLimit != undefined){
                        $scope.adminTypeCtrl.itemsPerPage = $scope.adminTypeCtrl.pageLimit;
                    }
                    $window.scrollTo(0, 0);
                })

    };

    $scope.adminTypeCtrl.deleteType = function (typeID,index) {
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
                    var url = window.laroute.route("admin.type.delete", {type_id: typeID});
                    DataFactory.http('get', url, '').then(function (data, status, headers, config) {
                        $scope.adminCtrl.swal_delete('Deleted successfully');
                        $scope.adminTypeCtrl.typeData.data.splice(index,1);
                    });

                } else {
                    $scope.adminCtrl.swal_cancelalert();
                }
            },
            function () {
                return false;
            });
    };

    $scope.adminTypeCtrl.createType = function () {
        $scope.searchTypeData=undefined;
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.type.create"));

    };

    $scope.adminTypeCtrl.storeType = function (type, description) {
        $scope.adminTypeCtrl.typeLoad=true;
        if (type == undefined && description == undefined) {
            $scope.adminTypeCtrl.ErrMessage = "Please fill the Required field.";
            $scope.adminTypeCtrl.typeLoad=false;
        } else {
        var data = {
            tag_type: type,
            description: description
        };
        DataFactory.http('POST', $window.laroute.route('admin.type.store'), data).then(function (data) {
            $scope.adminTypeCtrl.typeLoad=false;
            if (data.errors) {
                if (data.errors.tag_type) {
                    $scope.adminTypeCtrl.ErrMessage = data.errors.tag_type[0];
                }
                else if (data.errors.description) {
                    $scope.adminTypeCtrl.ErrMessage = data.errors.description[0];
                }
            } else {
                document.querySelector('.modal').style.display = "none";
                $scope.adminTypeCtrl.typeLoad=false;
                $scope.adminCtrl.swal_success('Type created successfully','create');
            }
        })
    }
    };

    $scope.adminTypeCtrl.editType = function (typeID,index) {
        $scope.adminCtrl.index = index;
        $scope.adminCtrl.typeData = $scope.adminTypeCtrl.typeData;
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.type.edit", {type_id: typeID}));

    };

    $scope.adminTypeCtrl.editData = function (typeId) {
        DataFactory.http('POST', $window.laroute.route('admin.type.edit_data', {id: typeId})).then(function (data) {
            $scope.adminTypeCtrl.data = data;
        })
    };

    $scope.adminTypeCtrl.updateType = function (typeID, typeTag, typeDescription,metaTitle,metaDescription) {
        $scope.adminTypeCtrl.typeLoad=true;
        var data = {
            id: typeID,
            tag_type: typeTag,
            description: typeDescription,
            meta_title:metaTitle,
            meta_description:metaDescription
        };
        DataFactory.http('POST', $window.laroute.route('admin.type.update'), data).then(function (data) {
            $scope.adminTypeCtrl.typeLoad=false;
            if (data.errors) {
                if (data.errors.tag_type) {
                    $scope.adminTypeCtrl.ErrMessage = data.errors.tag_type[0];
                }
                else if (data.errors.description) {
                    $scope.adminTypeCtrl.ErrMessage = data.errors.description[0];
                }
            } else {
                $scope.adminCtrl.typeData.data.splice($scope.adminCtrl.index, 1, data)
                $scope.adminTypeCtrl.typeData = $scope.adminCtrl.typeData;
                $scope.adminCtrl.typeData = $scope.adminCtrl.index = null;
                $scope.adminTypeCtrl.typeLoad=false;
                $('.modal').modal('hide');
                $scope.adminCtrl.swal_success('Type created successfully');
            }
        })
    };

    $scope.adminTypeCtrl.searchType = function (searchTypeData) {
        $scope.adminTypeCtrl.load = false;
        $scope.adminTypeCtrl.home=false;
        $scope.searchTypeData=searchTypeData;

        if (searchTypeData == undefined) {

            $scope.adminTypeCtrl.searchResultErr = "Please give type";
            $scope.adminTypeCtrl.load = true;

        } else {
            DataFactory.http('POST', $window.laroute.route('admin.type.paginate', {
                search_type: searchTypeData
            })).then(function (data) {

                if (data.total == 0) {
                    $scope.adminTypeCtrl.noTypeErr = " No type Found";
                    $scope.adminTypeCtrl.totalItem = data.total;
                    $scope.adminTypeCtrl.tableShow = false;
                    $scope.adminTypeCtrl.load = true;
                } else {
                    $scope.adminTypeCtrl.typeData.data = data.data;
                    $scope.searchData = "Search Result" + "  " + searchTypeData;
                    $scope.adminTypeCtrl.totalItem = data.total;
                    $scope.adminTypeCtrl.searchResultErr = " ";
                    $scope.adminTypeCtrl.tableShow = true;
                    $scope.adminTypeCtrl.load = true;
                }
            })
        }
    };

}]);
