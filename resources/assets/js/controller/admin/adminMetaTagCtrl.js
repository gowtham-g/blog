angular.module("controllers").controller("adminMetaTagController", ["$scope", "$window", "DataFactory", function ($scope, $window, DataFactory) {

    $scope.admin_MetaTagCtrl = {};
    $scope.tagBtn = true;
    $scope.admin_MetaTagCtrl.currentPage = 1;
    $scope.admin_MetaTagCtrl.itemsPerPage = 10;
    $scope.admin_MetaTagCtrl.maxSize = 5;
    $scope.admin_MetaTagCtrl.showMove = false;
    $scope.admin_MetaTagCtrl.tagArray = [];
    $scope.admin_MetaTagCtrl.tableShow = true;
    $scope.admin_MetaTagCtrl.metaTagTyeView = false;
    $scope.admin_MetaTagCtrl.searchView = false;
    $scope.admin_MetaTagCtrl.metaTagLoad = false;
    $scope.admin_MetaTagCtrl.load=true;
    $scope.admin_MetaTagCtrl.home=true;
    $scope.admin_MetaTagCtrl.metatagInitialData = function () {
        DataFactory.http('POST', $window.laroute.route('admin.meta_tag.paginate')).then(function (data) {
            $scope.page=undefined;
            $scope.metaTagType=undefined;
            $scope.admin_MetaTagCtrl.tableShow = true;
            $scope.admin_MetaTagCtrl.home=true;
            $scope.admin_MetaTagCtrl.metaTagTyeView = false;
            $scope.admin_MetaTagCtrl.metaTagData = data;
            $scope.admin_MetaTagCtrl.totalItem = data.total;
            $scope.admin_MetaTagCtrl.noDataError = " ";
            $scope.admin_MetaTagCtrl.noPostErr = "";
            $scope.searchData=undefined;
        })
    };

    $scope.admin_MetaTagCtrl.createMetaTag = function () {
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.meta_tags.create"));
    }

    $scope.admin_MetaTagCtrl.storeMetaTag = function (tag, detail, keyword) {
        $scope.admin_MetaTagCtrl.metaTagLoad = true;
        if (tag == undefined && detail == undefined && keyword == undefined) {
            $scope.admin_MetaTagCtrl.ErrMessage = "Please fill the Required field.";
            $scope.admin_MetaTagCtrl.metaTagLoad = false;
        } else {
            var data = {
                tag: tag,
                details: detail,
                keyword: keyword
            };
            DataFactory.http("POST", $window.laroute.route('admin.meta_tags.store', data)).then(function (data) {
                if (data.errors) {
                    $scope.admin_MetaTagCtrl.metaTagLoad = false;
                    if (data.errors.tag) {
                        $scope.admin_MetaTagCtrl.ErrMessage = data.errors.tag[0];
                    }
                    else if (data.errors.details) {
                        $scope.admin_MetaTagCtrl.ErrMessage = data.errors.details[0];
                    }
                    else if (data.errors.keyword) {
                        $scope.admin_MetaTagCtrl.ErrMessage = data.errors.keyword[0];
                    }

                } else {
                    document.querySelector('.modal').style.display = "none";
                    $scope.admin_MetaTagCtrl.metaTagLoad = false;
                    $scope.adminCtrl.swal_success('MetaTag created successfully','create');
                }
            })
        }

    }

    $scope.admin_MetaTagCtrl.editMetaTag = function (metaTagId,index) {
        $scope.adminCtrl.index = index;
        $scope.adminCtrl.metaTagData = $scope.admin_MetaTagCtrl.metaTagData;
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.meta_tags.edit", {metaTagid: metaTagId}));

    };

    $scope.admin_MetaTagCtrl.edit_Data = function (metaId) {
        DataFactory.http('POST', $window.laroute.route('admin.meta_tag.editdata'), {id: metaId}).then(function (data) {
            $scope.admin_MetaTagCtrl.data = data;
        })
    };

    $scope.admin_MetaTagCtrl.update_MetatagData = function (metaTagId, metaSlug, metaTag, metaDetails, keyword) {
        $scope.admin_MetaTagCtrl.metaTagLoad = true;
        let verifyType = document.querySelector('input[name = "metaTag_type"]:checked').value;

        DataFactory.http('POST', $window.laroute.route('admin.meta_tags.update', {
            id: metaTagId,
            slug: metaSlug,
            tag: metaTag,
            details: metaDetails,
            keyword: keyword,
            type: verifyType
        })).then(function (data) {
            if (data.errors) {
                $scope.admin_MetaTagCtrl.metaTagLoad = false;
                if (data.errors.tag) {
                    $scope.admin_MetaTagCtrl.ErrMessage = data.errors.tag[0];
                }
                else if (data.errors.details) {
                    $scope.admin_MetaTagCtrl.ErrMessage = data.errors.details[0];
                }
                else if (data.errors.keyword) {
                    $scope.admin_MetaTagCtrl.ErrMessage = data.errors.keyword[0];
                }
            } else {
                $scope.adminCtrl.metaTagData.data.splice($scope.adminCtrl.index, 1, data)
                $scope.admin_MetaTagCtrl.metaTagData = $scope.adminCtrl.metaTagData;
                $scope.adminCtrl.metaTagData = $scope.adminCtrl.index = null;
                $('.modal').modal('hide');
                $scope.mainCtrl.success_toaster('Successfully updated');
                $scope.admin_MetaTagCtrl.metaTagLoad = false;
            }
        })
    };

    $scope.admin_MetaTagCtrl.deleteMetaTag = function (metaTagId,index) {

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
                    var url = window.laroute.route("admin.meta_tags.delete", {metaTagId: metaTagId});
                    DataFactory.http('get', url, '').then(function (data, status, headers, config) {
                        $scope.admin_MetaTagCtrl.metaTagData.data.splice(index,1);
                        $scope.adminCtrl.swal_delete('Deleted successfully');
                    });
                } else {
                    $scope.adminCtrl.swal_cancelalert();
                }
            },
            function () {
                return false;
            });
    };


    $scope.admin_MetaTagCtrl.type_list = function (value) {
        $scope.admin_MetaTagCtrl.home=false;
        $scope.admin_MetaTagCtrl.value=value;
        DataFactory.http('POST', $window.laroute.route('admin.meta_type.list', {
            metaType: value
        })).then(function (data) {
            if (data.total == 0) {
                $scope.admin_MetaTagCtrl.noDataError = "No data found";
                $scope.admin_MetaTagCtrl.totalItem = data.total;
                $scope.admin_MetaTagCtrl.tableShow = false;
            } else {
                $scope.admin_MetaTagCtrl.noDataError = " ";
                $scope.admin_MetaTagCtrl.tableShow = true;
                $scope.admin_MetaTagCtrl.metaTagData.data = data.data;
                $scope.admin_MetaTagCtrl.totalItem = data.total;
            }
        })
    };

    $scope.admin_MetaTagCtrl.metatagView = function (metaTagType) {
        $scope.admin_MetaTagCtrl.home=false;
        $scope.page=undefined;
        $scope.admin_MetaTagCtrl.load=false;
        $scope.searchData="";
        $scope.admin_MetaTagCtrl.type = metaTagType;
        DataFactory.http('POST', $window.laroute.route('admin.metatag_type.view', {search_type: metaTagType})).then(function (data) {
            if (data.total == 0) {
                $scope.admin_MetaTagCtrl.noPostErr = "No result found ";
                $scope.admin_MetaTagCtrl.totalItem = data.total;
                $scope.admin_MetaTagCtrl.tableShow = false;
                $scope.admin_MetaTagCtrl.metaTagTyeView = false;
                $scope.admin_MetaTagCtrl.serachView = false;
                $scope.admin_MetaTagCtrl.load=true;
            } else {
                $scope.admin_MetaTagCtrl.metaTagData = data;
                $scope.admin_MetaTagCtrl.totalItem = data.total;
                $scope.admin_MetaTagCtrl.tableShow = false;
                $scope.admin_MetaTagCtrl.metaTagTyeView = true;
                $scope.admin_MetaTagCtrl.serachView = true;
                $scope.admin_MetaTagCtrl.dataType = 'type';
                $scope.admin_MetaTagCtrl.currentPage = data.current_page;
                $scope.admin_MetaTagCtrl.metaTagData.path = data.path;
                $scope.admin_MetaTagCtrl.totalItem = data.total;
                $scope.admin_MetaTagCtrl.noPostErr = "";
                $scope.admin_MetaTagCtrl.load=true;
            }

        })
    }

    $scope.admin_MetaTagCtrl.editMetaTagType = function (id,index) {
        $scope.adminCtrl.index = index;
        $scope.adminCtrl.metaTagData = $scope.admin_MetaTagCtrl.metaTagData;
        var data = {
            id: id,
            type: $scope.admin_MetaTagCtrl.type
        };
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.meta_tag_type.edit", data));
    }

    $scope.admin_MetaTagCtrl.metaTagTypeEdit = function (id, type) {
        var data = {
            id: id,
            type: type
        };
        DataFactory.http('POST', $window.laroute.route('admin.meta_tag_type.editdata', data)).then(function (data) {
            $scope.admin_MetaTagCtrl.data = data;
        })
    }

    $scope.admin_MetaTagCtrl.update_MetatagType = function (id, metaTitle, metadescription, metaKeyword,type) {
        var data = {
            id: id,
            meta_title: metaTitle,
            meta_description: metadescription,
            meta_keyword:metaKeyword,
            type: type
        }

        DataFactory.http('POST', $window.laroute.route('admin.meta_tag_type.update', data)).then(function (data) {
            $scope.adminCtrl.metaTagData.data.splice($scope.adminCtrl.index, 1, data)
            $scope.admin_MetaTagCtrl.metaTagData = $scope.adminCtrl.metaTagData;
            $scope.adminCtrl.metaTagData = $scope.adminCtrl.index = null;
            $('.modal').modal('hide');
                $scope.adminCtrl.swal_success("Update successfully");
        })
    }

    $scope.admin_MetaTagCtrl.itemsPerPageChange = function (currentPage, pageLimit, searchMetaData,metaTagType) {
        $scope.admin_MetaTagCtrl.load=false;
        $scope.admin_MetaTagCtrl.itemsPerPage  = pageLimit;
        $scope.admin_MetaTagCtrl.pageLimit = pageLimit;
        if (pageLimit != undefined && searchMetaData != undefined && metaTagType != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.admin_MetaTagCtrl.itemsPerPage,
                search_value:searchMetaData,
                search_type: metaTagType
            }
        }
        else if (pageLimit != undefined  && searchMetaData != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.admin_MetaTagCtrl.itemsPerPage,
                search_value:searchMetaData,
            }
        }
        else if (pageLimit != undefined && metaTagType != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.admin_MetaTagCtrl.itemsPerPage,
                search_type: metaTagType
            }
        }
        else if (pageLimit != undefined && $scope.admin_MetaTagCtrl.value != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.admin_MetaTagCtrl.itemsPerPage,
                metaType:$scope.admin_MetaTagCtrl.value

            }
        }
        else if (pageLimit != undefined) {
            var requestData={
                page:currentPage,
                limit:$scope.admin_MetaTagCtrl.itemsPerPage
            }
        }

        DataFactory.http('POST', $scope.admin_MetaTagCtrl.metaTagData.path , requestData).then(function (data) {
            $scope.admin_MetaTagCtrl.load = true;
            $scope.admin_MetaTagCtrl.metaTagData = data;
            $scope.admin_MetaTagCtrl.totalItem = data.total;
            $scope.admin_MetaTagCtrl.load=true;
        })
    }
    $scope.admin_MetaTagCtrl.pageChanged = function (currentPage, metaTagType, searchData) {
        if (metaTagType != undefined && searchData == undefined && $scope.admin_MetaTagCtrl.value == undefined) {
           requestData={
               page:currentPage,
               search_type:metaTagType
           }
        } else if (metaTagType != undefined && searchData != undefined && $scope.admin_MetaTagCtrl.value == undefined) {
            requestData={
                page:currentPage,
                search_type:metaTagType,
                search_value:searchData
            }
        }
        else if (metaTagType == undefined && searchData == undefined && $scope.admin_MetaTagCtrl.value != undefined) {
            requestData = {
                page: currentPage,
                metaType: $scope.admin_MetaTagCtrl.value
            }
        }
        else if (metaTagType == undefined && searchData == undefined && $scope.admin_MetaTagCtrl.value == undefined) {
            requestData={
                page:currentPage
            }
        }
        DataFactory.http('POST', $scope.admin_MetaTagCtrl.metaTagData.path, requestData)
            .then(function (data) {
                $scope.admin_MetaTagCtrl.metaTagData = data;
                $scope.admin_MetaTagCtrl.totalItem = data.total;
                $scope.admin_MetaTagCtrl.currentPage = data.current_page;
                if($scope.admin_MetaTagCtrl.pageLimit != undefined){
                    $scope.admin_MetaTagCtrl.itemsPerPage = $scope.admin_MetaTagCtrl.pageLimit;
                }
                $window.scrollTo(0, 0);
            })

    };



    $scope.admin_MetaTagCtrl.searchMetaTagType = function (searchData, type) {
        $scope.admin_MetaTagCtrl.home=false;
        $scope.admin_MetaTagCtrl.load=false;
        $scope.page=undefined;
        var data = {
            search_value: searchData,
            search_type: type
        }
        DataFactory.http('POST', $window.laroute.route('admin.meta_tag.search', data)).then(function (data) {
            if (data.total == 0) {
                $scope.admin_MetaTagCtrl.noPostErr = "No result found ";
                $scope.admin_MetaTagCtrl.totalItem = data.total;
                $scope.admin_MetaTagCtrl.tableShow = false;
                $scope.admin_MetaTagCtrl.metaTagTyeView = false;
                $scope.admin_MetaTagCtrl.load=true;
            } else {
                $scope.admin_MetaTagCtrl.metaTagData = data;
                $scope.admin_MetaTagCtrl.totalItem = data.total;
                $scope.admin_MetaTagCtrl.tableShow = false;
                $scope.admin_MetaTagCtrl.metaTagTyeView = true;
                $scope.admin_MetaTagCtrl.dataType = 'search';
                $scope.admin_MetaTagCtrl.currentPage = data.current_page;
                $scope.admin_MetaTagCtrl.metaTagData.path = data.path;
                $scope.admin_MetaTagCtrl.totalItem = data.total;
                $scope.admin_MetaTagCtrl.noPostErr = "";
                $scope.admin_MetaTagCtrl.load=true;
            }
        })
    }


    $scope.admin_MetaTagCtrl.metaGenerate = function(type,postType){
        var data = {
            type : type,
            post_type: postType
        }
        DataFactory.http('POST', $window.laroute.route('meta.tag.generate', data))
            .then(function (data) {

        });
    };

}]);
