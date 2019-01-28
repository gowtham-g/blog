angular.module("controllers").controller("adminSearchController", ["$scope", "$window", "DataFactory", "$mdDialog", function ($scope, $window, DataFactory, $mdDialog) {

    $scope.adminSearchCtrl = {};
    $scope.adminSearchCtrl.tableShow = false;
    $scope.adminSearchCtrl.itemsPerPage = 10;
    $scope.adminSearchCtrl.maxSize = 5;
    $scope.adminSearchCtrl.select = true;
    $scope.adminSearchCtrl.hidePagination = true;
    $scope.adminSearchCtrl.load=true;

    $scope.adminSearchCtrl.categoryList = ["All","Tutorials","forums","News","Tags"];
    $scope.adminSearchCtrl.adminSearch = function (searchData) {
        $scope.adminSearchCtrl.load=false;
        if (searchData == undefined) {
            $scope.adminSearchCtrl.searchResultErr = "please give search data";
            $scope.adminSearchCtrl.hidePagination = true;
            $scope.adminSearchCtrl.load=true;
        }else{
            $scope.adminSearchCtrl.search = searchData;
            $scope.adminSearchCtrl.search_type = 'All';
            var data = {
                search: $scope.adminSearchCtrl.search,
                search_type: $scope.adminSearchCtrl.search_type,
                page_type: 'admin'
            }
            DataFactory.http('POST', $window.laroute.route('admin.search', data)).then(function (data) {
                if (data.length == 0) {
                    $scope.adminSearchCtrl.noDataErr = "No result found";
                    $scope.adminSearchCtrl.tableShow = false;
                    $scope.adminSearchCtrl.hidePagination = true;
                    $scope.adminSearchCtrl.load=true;
                }
                if(data.total > 10){
                    $scope.adminSearchCtrl.hidePagination = false;
                }else{
                    $scope.adminSearchCtrl.hidePagination = true;
                }
                $scope.adminSearchCtrl.totalItem = data.total;
                $scope.adminSearchCtrl.searchData = data;
                $scope.adminSearchCtrl.currentPage = data.current_page;
                $scope.adminSearchCtrl.categories = data.categories;
                $scope.adminSearchCtrl.searchValue = "Search result for" + " " + searchData;
                $scope.adminSearchCtrl.tableShow = true;
                $scope.adminSearchCtrl.hidePagination = false;
                $scope.adminSearchCtrl.select = false;
                $scope.adminSearchCtrl.searchResultErr = "";
                $scope.adminSearchCtrl.noDataErr = "";
                $scope.adminSearchCtrl.load=true;

            })
        }


    }

    $scope.adminSearchCtrl.categorySelect = function (category) {
        $scope.adminSearchCtrl.load=false;
     $scope.categorySelect=category;
        if(category == undefined){
            $scope.categoryId = 'All';
        }
        if(category == 'Tags'){
            $scope.categoryId = 'Tags';
        }
        else if (category !== undefined){
            $scope.categoryId = category;
        }
        var data = {
            search: $scope.adminSearchCtrl.search,
            search_type: $scope.categoryId,
            page_type: 'admin',
        };
        DataFactory.http('POST', $window.laroute.route('admin.search', data)).then(function (data) {
            $scope.adminSearchCtrl.load=true;
            $scope.adminSearchCtrl.categories = data.categories;
            $scope.adminSearchCtrl.categories.push({type:'All'});
            $scope.adminSearchCtrl.searchData = data;
            $scope.adminSearchCtrl.currentPage = data.current_page;
            $scope.adminSearchCtrl.tableShow = true;
            $scope.adminSearchCtrl.hidePagination = false;
            $scope.adminSearchCtrl.select = false;
            $window.scrollTo(0, 0);
        })
    }

    $scope.adminSearchCtrl.editPost = function (postId) {
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.tag_post.edit", {post_id: postId}));
    }

    $scope.adminSearchCtrl.pageChanged = function (currentPage) {
        if($scope.categorySelect == undefined){
            $scope.categoryId = 'All';
        }
        var data = {
            search: $scope.adminSearchCtrl.search,
            search_type: $scope.categoryId,
            page_type: 'admin',
            page:currentPage
        };
        DataFactory.http('POST', $window.laroute.route('admin.search', data)).then(function (data) {
            $scope.adminSearchCtrl.searchData = data;
            $scope.adminSearchCtrl.currentPage = data.current_page;
            $scope.adminSearchCtrl.tableShow = true;
            $scope.adminSearchCtrl.hidePagination = false;
            $scope.adminSearchCtrl.select = false;
            $window.scrollTo(0, 0);
        })

    }

}]);