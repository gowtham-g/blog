angular.module("controllers").controller("adminCategoryController", ["$scope", "$window", "DataFactory", function ($scope, $window, DataFactory) {

    $scope.adminCategoryCtrl = {};
    $scope.adminCategoryCtrl.currentPage = 1;
    $scope.adminCategoryCtrl.itemsPerPage = 10;
    $scope.adminCategoryCtrl.maxSize = 5;
    $scope.adminCategoryCtrl.showMove = false;
    $scope.adminCategoryCtrl.tableShow = true;
    $scope.adminCategoryCtrl.load=true;
    $scope.adminCategoryCtrl.categoryLoad=false;
    $scope.adminCategoryCtrl.home=true;
    
    $scope.adminCategoryCtrl.categoryInitialData = function () {
        DataFactory.http('POST',$window.laroute.route('admin.category.paginate')).then(function(data){
            $scope.adminCategoryCtrl.categoryData=data;
            $scope.adminCategoryCtrl.totalItem = data.total;
            $scope.adminCategoryCtrl.tableShow = true;
            $scope.adminCategoryCtrl.home=true;
            $scope.adminCategoryCtrl.noSearchErr = " ";
            $scope.searchData=undefined;
        });
        // $scope.adminCategoryCtrl.categoryData = $window.categories;
    }

    $scope.adminCategoryCtrl.createCategory = function () {

        $scope.adminCtrl.dialog_popup( $window.laroute.route("admin.category.create"));
    }

    $scope.adminCategoryCtrl.storeCategory = function (type) {
        $scope.adminCategoryCtrl.categoryLoad=true;
        if (type == undefined || type.length == 0) {
            $scope.adminCategoryCtrl.ErrMessage = "Please fill the required field";
            $scope.adminCategoryCtrl.categoryLoad=false;
        }
        else {
            DataFactory.http('POST', $window.laroute.route('admin.category.store', {
                type: type
            })).then(function (data) {
                if (data.errors) {
                    $scope.adminCategoryCtrl.categoryLoad=false;
                    if (data.errors.type) {
                        $scope.adminCategoryCtrl.ErrMessage = data.errors.type[0];
                    }
                } else {
                    document.querySelector('.modal').style.display = "none";
                    $scope.adminCategoryCtrl.categoryLoad=false;
                    $scope.adminCtrl.swal_success('Category created successfully','create');
                }
            })
        }
    }

    $scope.adminCategoryCtrl.deleteCategory = function (categoryID,index) {
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
                var url = window.laroute.route("admin.category.delete", {category_id: categoryID});
                DataFactory.http('get', url, '').then(function (data, status, headers, config) {
                $scope.adminCtrl.swal_delete();
                    $scope.adminCategoryCtrl.categoryData.data.splice(index,1);
                });
            } else {
                    $scope.adminCtrl.swal_cancelalert();
            }

        },
        function () {
            return false;
        });
    };


    $scope.adminCategoryCtrl.editCategory = function (categoryID,index) {
        $scope.adminCtrl.index = index;
        $scope.adminCtrl.categoryData = $scope.adminCategoryCtrl.categoryData;
        $scope.adminCtrl.dialog_popup( $window.laroute.route("admin.category.edit", {category_id: categoryID}));
    };

    $scope.adminCategoryCtrl.editData = function (id) {
        DataFactory.http('POST', $window.laroute.route('admin.category.edit_data',{category_id:id})).then(function(data){
            $scope.adminCategoryCtrl.data = data;
        })
    };

    $scope.adminCategoryCtrl.updateCategory = function (catId, catType) {
        $scope.adminCategoryCtrl.categoryLoad=true;
            DataFactory.http('POST', $window.laroute.route('admin.category.update', {
                id: catId,
                type: catType
            })).then(function (data) {
                if (data.errors) {
                    $scope.adminCategoryCtrl.categoryLoad=false;
                    if (data.errors.type) {
                        $scope.adminCategoryCtrl.ErrMessage = data.errors.type[0];
                    }
                } else {
                    $scope.adminCtrl.categoryData.data.splice($scope.adminCtrl.index, 1, data)
                    $scope.adminCategoryCtrl.categoryData = $scope.adminCtrl.categoryData;
                    $scope.adminCtrl.categoryData = $scope.adminCtrl.index = null;
                    $('.modal').modal('hide');
                    $scope.adminCategoryCtrl.categoryLoad=false;
                    $scope.adminCtrl.swal_success('Category updated successfully');
                }
            })

    };

    $scope.adminCategoryCtrl.searchCategory = function(searchData){
        $scope.adminCategoryCtrl.load=false;
        $scope.page=undefined;
        $scope.adminCategoryCtrl.home=false;
        if (searchData == undefined) {
            $scope.adminCategoryCtrl.searchDataErr = "Please give Category type";
        } else {
            DataFactory.http('POST', $window.laroute.route('admin.category.paginate'), {
                search_category: searchData
            }).then(function (data) {
                if (data.total == 0) {
                    $scope.adminCategoryCtrl.noSearchErr = " No Category Found";
                    $scope.adminCategoryCtrl.totalItem = data.total;
                    $scope.adminCategoryCtrl.tableShow = false;
                    $scope.adminCategoryCtrl.searchDataErr="";
                    $scope.adminCategoryCtrl.load=true;
                } else {
                    $scope.adminCategoryCtrl.categoryData = data;
                    $scope.searchData = "Search Result" + "  " + searchData;
                    $scope.adminCategoryCtrl.totalItem = data.total;
                    $scope.adminCategoryCtrl.categoryData.path = data.path;
                    $scope.adminCategoryCtrl.currentPage = data.current_page;
                    $scope.adminCategoryCtrl.dataType = 'search';
                    $scope.adminCategoryCtrl.searchDataErr = " ";
                    $scope.adminCategoryCtrl.tableShow = true;
                    $scope.adminCategoryCtrl.load=true;

                }
            })
        }
    }

    $scope.adminCategoryCtrl.itemPerPageChange = function (currentPage, pageLimit, searchData) {
        $scope.adminCategoryCtrl.itemsPerPage  = pageLimit;
        $scope.adminCategoryCtrl.pageLimit = pageLimit;
        $scope.adminCategoryCtrl.load = false;
        $scope.searchData=undefined;
        if (pageLimit != undefined && searchData != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.adminCategoryCtrl.itemsPerPage,
                search_category:searchData
            }
        } else if (pageLimit != undefined) {

            var requestData={
                page:currentPage,
                limit:$scope.adminCategoryCtrl.itemsPerPage
            }
        }

        DataFactory.http('POST', $scope.adminCategoryCtrl.categoryData.path , requestData).then(function (data) {
            $scope.adminCategoryCtrl.load = true;
            $scope.adminCategoryCtrl.categoryData = data;
            $scope.adminCategoryCtrl.totalItem = data.total;
        })
    }

    $scope.adminCategoryCtrl.pageChanged = function (currentPage, searchData) {

        if ($scope.adminCategoryCtrl.pageLimit != undefined && searchData == undefined) {

            var requestData={
                page:currentPage,
                limit:$scope.adminCategoryCtrl.itemsPerPage,
                search_category:searchData
            }
        }
        else if (searchData == undefined && $scope.adminCategoryCtrl.pageLimit == undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.adminCategoryCtrl.itemsPerPage

            }
        } else if (searchData != undefined && $scope.adminCategoryCtrl.pageLimit == undefined) {
            var requestData={
                page:currentPage,
                search_category:searchData
            }
        }
        else if (searchData != undefined && $scope.adminCategoryCtrl.pageLimit != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.adminCategoryCtrl.itemsPerPage,
                search_category:searchData
            }
        }

        DataFactory.http('POST', $scope.adminCategoryCtrl.categoryData.path , requestData)
            .then(function (data) {
                $scope.adminCategoryCtrl.categoryData = data;
                $scope.adminCategoryCtrl.totalItem = data.total;
                $scope.adminCategoryCtrl.currentPage = data.current_page;
                if($scope.adminCategoryCtrl.pageLimit != undefined){
                    $scope.adminCategoryCtrl.itemsPerPage = $scope.adminCategoryCtrl.pageLimit;
                }
                $window.scrollTo(0, 0);
            })
    };

 

}]);
