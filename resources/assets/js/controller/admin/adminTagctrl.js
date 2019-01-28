angular.module("controllers").controller("adminTagController", ["$scope", "$window", "DataFactory", function ($scope, $window, DataFactory) {

    var csrf_token = document.getElementsByName('_token')[0].content;

    $scope.admintagCtrl = {};
    $scope.tagBtn = true;
    $scope.admintagCtrl.currentPage = 1;
    $scope.admintagCtrl.itemsPerPage = 10;
    $scope.admintagCtrl.maxSize = 5;
    $scope.admintagCtrl.showMove = false;
    $scope.admintagCtrl.tagArray = [];
    $scope.admintagCtrl.postView = false;
    $scope.admintagCtrl.typeView = false;
    $scope.admintagCtrl.tableShow = true;
    $scope.admintagCtrl.viewBtn = true;
    $scope.admintagCtrl.tagImage = false;
    $scope.admintagCtrl.imgChooseShow = false;
    $scope.admintagCtrl.tagMsgShow = false;
    $scope.admintagCtrl.postMsgShow = false;
    $scope.admintagCtrl.typeMsgShow = false;
    $scope.admintagCtrl.tagListShow = false;
    $scope.admintagCtrl.load = true;
    $scope.admintagCtrl.home = true;
    $scope.admintagCtrl.tagLoad = false;
    $scope.admintagCtrl.selectTagId = [];
    var checkBox;

    $scope.admintagCtrl.tagInitialData = function () {
        DataFactory.http('POST', $window.laroute.route('admin.tag.paginate')).then(function (data) {
            $scope.admintagCtrl.allTagData = data;
            $scope.admintagCtrl.totalItem = data.total;
            $scope.admintagCtrl.allTagType = $window.tagType;
            $scope.admintagCtrl.tableShow = true;
            $scope.admintagCtrl.postView = false;
            $scope.admintagCtrl.typeView = false;
            $scope.admintagCtrl.home = true;
            $scope.searchTagData = undefined;
            $scope.searchType = undefined
            $window.scrollTo(0, 0);
        })

    };

    $scope.admintagCtrl.selectTag = function (select, tagId,index) {
        $scope.adminCtrl.index = index;
        $scope.adminCtrl.allTagData = $scope.admintagCtrl.allTagData;
        checkBox = document.getElementById("myCheck_" + tagId);
        if ($scope.select == undefined) {
            $scope.admintagCtrl.moveErr = " please choose tag Type";
            checkBox.checked = false;
        } else if ($scope.select != "select") {
            if (checkBox.checked == true) {
                DataFactory.http('POST', $window.laroute.route('admin.tag.move', {
                    type_id: $scope.select.id,
                    tag_id: tagId
                })).then(function (data) {
                    if (data == "Already moved") {
                        $scope.mainCtrl.info_toaster(data);
                        checkBox.checked = false;
                    } else {
                        $scope.mainCtrl.success_toaster('Successfully moved');
                        checkBox.checked = false;
                        $scope.adminCtrl.allTagData.data[$scope.adminCtrl.index ].type = data.type;
                    }

                })
            }
        }
    };

    $scope.admintagCtrl.typeSelect = function (type) {
        $scope.select=type;
    };

    /*Search Tag*/

    $scope.admintagCtrl.searchType = function (type) {
        $scope.searchType = type;

    }
    $scope.admintagCtrl.searchResult = function (searchValue,type) {
        $scope.admintagCtrl.home = false;
        $scope.page = undefined;
        $scope.admintagCtrl.pageLimit=$scope.page;
        $scope.admintagCtrl.load = false;
        $scope.searchTagData=searchValue;
        $scope.searchType=type;
        if(searchValue == undefined) {
            $scope.admintagCtrl.searchResultErr = "Please give Search value ";
            $scope.admintagCtrl.load = true;
            $scope.admintagCtrl.noTagPostErr = " ";
        }else if($scope.searchType == undefined){
            $scope.admintagCtrl.searchResultErr = "Please choose filter type";
            $scope.admintagCtrl.load = true;
            $scope.admintagCtrl.noTagPostErr = " ";
        }else if(searchValue != undefined && $scope.searchType != undefined) {
            var searchUrl = $window.laroute.route('admin.tags.search', {
                search_value: searchValue,
                search_type: $scope.searchType
            });
            DataFactory.http('POST', searchUrl).then(function (data) {
                if(data.total == 0){
                    $scope.admintagCtrl.searchResultErr = " No result Found";
                    $scope.admintagCtrl.totalItem = data.total;
                    $scope.admintagCtrl.tableShow = false;
                    $scope.admintagCtrl.postView = false;
                    $scope.admintagCtrl.tagMsgShow = false;
                    $scope.admintagCtrl.load = true;
                }else{
                    $scope.admintagCtrl.allTagData = data;
                    $scope.searchData = "Search Result" + "  " + searchValue;
                    $scope.admintagCtrl.totalItem = data.total;
                    $scope.admintagCtrl.currentPage = data.current_page;
                    $scope.admintagCtrl.allTagData.path = data.path;
                    $scope.admintagCtrl.dataType = 'search';
                    $scope.admintagCtrl.searchResultErr = " ";
                    $scope.admintagCtrl.load = true;
                    if($scope.searchType == 'tag'){
                        $scope.admintagCtrl.searchResultErr = " ";
                        $scope.admintagCtrl.tableShow = true;
                        $scope.admintagCtrl.postView = false;
                        $scope.admintagCtrl.typeView = false;
                        $scope.admintagCtrl.tagMsgShow = true;
                        $scope.admintagCtrl.postMsgShow = false;
                        $scope.admintagCtrl.typeMsgShow = false;

                    }else if($scope.searchType == 'post'){
                        $scope.admintagCtrl.postView = true;
                        $scope.admintagCtrl.tableShow = false;
                        $scope.admintagCtrl.typeView = false;
                        $scope.admintagCtrl.tagMsgShow = false;
                        $scope.admintagCtrl.postMsgShow = true;
                        $scope.admintagCtrl.typeMsgShow = false;
                        $scope.admintagCtrl.tagListShow = true;

                    }else if($scope.searchType == 'type'){
                        $scope.admintagCtrl.postView = false;
                        $scope.admintagCtrl.tableShow = false;
                        $scope.admintagCtrl.typeView = true;
                        $scope.admintagCtrl.tagMsgShow = false;
                        $scope.admintagCtrl.postMsgShow = false;
                        $scope.admintagCtrl.typeMsgShow = true;
                    }
                }

            })
        }


    };
    $scope.admintagCtrl.itemsPerPageChange = function (currentPage,pageLimit,searchTagData) {
        $scope.admintagCtrl.load = false;
        $scope.admintagCtrl.pageLimit = pageLimit;
        if(searchTagData != undefined || $scope.noTag != undefined){
            $scope.admintagCtrl.home = false;
        }
        if(searchTagData == undefined){
            $scope.searchValue = undefined;
            $scope.searchType = undefined
        }
        if(pageLimit != undefined){
            $scope.admintagCtrl.itemsPerPage = pageLimit;
        }
        if(pageLimit != undefined && searchTagData != undefined){
            var requestData={
                limit: $scope.admintagCtrl.itemsPerPage,
                page: currentPage,
                search_value : searchTagData,
                search_type : $scope.searchType,
            }
        }else if(pageLimit != undefined && searchTagData == undefined){
            var requestData={
                limit: $scope.admintagCtrl.itemsPerPage,
                page: currentPage
            }
        }else if($scope.noTag != undefined && pageLimit != undefined && searchPostData == undefined){
            DataFactory.http('POST', $window.laroute.route('admin.no_tag_post.search'), {limit: $scope.admintagCtrl.pageLimit, page : currentPage}).then(function (data) {
                if (data.total == 0) {
                    $scope.admintagCtrl.noTagPostErr = " No post Found";
                    $scope.admintagCtrl.totalItem = data.total;
                    $scope.admintagCtrl.tableShow = false;
                    $scope.admintagCtrl.postView = false;
                    $scope.admintagCtrl.typeView = false;
                    $scope.admintagCtrl.load = false;

                } else {
                    $scope.admintagCtrl.postView = true;
                    $scope.admintagCtrl.typeView = false;
                    $scope.admintagCtrl.tableShow = false;
                    $scope.admintagCtrl.tagMsgShow = false;
                    $scope.admintagCtrl.postMsgShow = false;
                    $scope.admintagCtrl.typeMsgShow = false;
                    $scope.admintagCtrl.tagListShow = false;
                    $scope.admintagCtrl.load = true;

                    $scope.admintagCtrl.allTagData = data;
                    $scope.admintagCtrl.totalItem = data.total;
                }

            })
        }
            DataFactory.http('POST', $scope.admintagCtrl.allTagData.path , requestData).then(function(data) {
                $scope.admintagCtrl.allTagData = data;
                $scope.admintagCtrl.load = true;
                $scope.admintagCtrl.totalItem = data.total;
                $window.scrollTo(0, 0);
            })

    }

    $scope.admintagCtrl.pageChanged = function (currentPage, searchTagData) {
        if(searchTagData != undefined || $scope.noTag != undefined){
            $scope.admintagCtrl.home = false;
        }
        if(searchTagData == undefined){
            $scope.searchValue = undefined;
            $scope.searchType = undefined
        }
        if($scope.admintagCtrl.pageLimit != undefined && searchTagData == undefined){
            var requestData={
                limit: $scope.admintagCtrl.pageLimit,
                page: currentPage
            }
        }else if(searchTagData == undefined && $scope.admintagCtrl.pageLimit == undefined){
            var requestData={
                page: currentPage
            }
        }else if(searchTagData != undefined && $scope.admintagCtrl.pageLimit == undefined){
            var requestData={
                search_value : searchTagData,
                search_type : $scope.searchType,
                page: currentPage
            }
        }else if(searchTagData != undefined && $scope.admintagCtrl.pageLimit != undefined){
            var requestData={
                limit: $scope.admintagCtrl.pageLimit,
                search_value : searchTagData,
                search_type : $scope.searchType,
                page: currentPage
            }
        }else if($scope.noTag != undefined && $scope.admintagCtrl.pageLimit != undefined){
            var requestData={
                limit:$scope.admintagCtrl.pageLimit,
                page:currentPage
            }
        }

            DataFactory.http('POST', $scope.admintagCtrl.allTagData.path,requestData)
                .then(function (data) {
                    $scope.admintagCtrl.allTagData = data;
                    $scope.admintagCtrl.totalItem = data.total;
                    $scope.admintagCtrl.currentPage = data.current_page;
                    $window.scrollTo(0, 0);
                    if($scope.admintagCtrl.pageLimit != undefined){
                        $scope.admintagCtrl.itemsPerPage = $scope.admintagCtrl.pageLimit;
                    }else{
                        $scope.admintagCtrl.itemsPerPage=10;
                    }

                })

    };


    $scope.admintagCtrl.tagPost = function (postId) {
        $scope.test = [];
        $('#tagId > option:selected').each(function () {
            $scope.test.push($(this).val());
        });
        DataFactory.http('POST', $window.laroute.route('admin.tag_post.store', {
            tag_id: $scope.test,
            post_id: postId
        })).then(function (data) {
            if (data == "success") {
                document.querySelector('.modal').style.display = "none";
                $scope.adminCtrl.swal_success(data);

            }
        })
    };


    $scope.admintagCtrl.noTagPost = function (type) {
        $scope.noTag=type;
        $scope.page= undefined;
        $scope.searchTagData = undefined;
        $scope.searchType = undefined;
        $scope.admintagCtrl.home = false;

        if($scope.page == undefined){
            $scope.admintagCtrl.itemsPerPage=10;
        }
        $scope.admintagCtrl.pageLimit=$scope.page;
        DataFactory.http('POST', $window.laroute.route('admin.no_tag_post.search')).then(function (data) {
            if (data.total == 0) {
                $scope.admintagCtrl.noTagPostErr = " No post Found";
                $scope.admintagCtrl.totalItem = data.total;
                $scope.admintagCtrl.tableShow = false;
                $scope.admintagCtrl.postView = false;
                $scope.admintagCtrl.typeView = false;
                $scope.admintagCtrl.load = false;

            } else {
                $scope.admintagCtrl.postView = true;
                $scope.admintagCtrl.typeView = false;
                $scope.admintagCtrl.tableShow = false;
                $scope.admintagCtrl.tagMsgShow = false;
                $scope.admintagCtrl.postMsgShow = false;
                $scope.admintagCtrl.typeMsgShow = false;
                $scope.admintagCtrl.tagListShow = false;
                $scope.admintagCtrl.load = true;
                $scope.admintagCtrl.allTagData = data;
                $scope.admintagCtrl.totalItem = data.total;
            }
        })
    }

    $scope.admintagCtrl.editTagPost = function (postID, index) {
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.tag_post.edit", {post_id: postID}));

    };

    $scope.admintagCtrl.tagPostData = function (title) {
        $scope.admintagCtrl.title = title;
    };

    /*create_tag*/
    $scope.admintagCtrl.createTag = function () {
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.tags.create"));
    };

    $scope.admintagCtrl.createTag_alltype = function () {

        $scope.admintagCtrl.allType = $window.tagType;

    };


    $(function () {

        $('.image-editor').cropit({
            width: 240,
            height: 140,
            height: 140,
            minZoom: 'fit',
            imageBackground: true,
            imageBackgroundBorderWidth: 20,
            onImageLoading: function () {
                $(".error-msg").text("");
                $scope.admintagCtrl.showExport = false;
                $scope.$$phase || $scope.$root && $scope.$root.$$phase || $scope.$digest();
            },
            onImageError: function () {
                $(".error-msg").text("Please use an image that's at least " + "240 px in width and " + "140 px in height.");
                $(".cropit-preview").addClass("has-error");
                $scope.admintagCtrl.showExport = true;
                $scope.$$phase || $scope.$root && $scope.$root.$$phase || $scope.$digest();
            }
        });

        $('.export').click(function () {
            $scope.imageData = $('.image-editor').cropit('export');
        });
    });

    $scope.admintagCtrl.storetag = function (tagName, tagType, tagDescription) {
        $scope.admintagCtrl.tagLoad = true;
        if (tagName == undefined && tagDescription == undefined && tagType == undefined && $scope.imageData == undefined) {
            $scope.admintagCtrl.errorMsg = "Please fill the required field";
            $scope.admintagCtrl.tagLoad = false;

        }
        else {
            var frmData = new FormData();
            frmData.append('tag_name', tagName);
            frmData.append('description', tagDescription);
            if (tagType != undefined) {
                frmData.append('type_id', tagType.id);
            }
            frmData.append('image', $scope.imageData);
            var header = {'Content-Type': undefined};
            DataFactory.http('post', $window.laroute.route('admin.tags.store'), frmData, header)
                .then(function (data) {
                    $scope.admintagCtrl.tagLoad = false;
                    if (data.imgError) {
                        $scope.admintagCtrl.errorMsg = data.imgError;
                    }
                    if (data.errors) {
                        if (data.errors.tag_name) {
                            $scope.admintagCtrl.errorMsg = data.errors.tag_name[0];
                        } else if (data.errors.type_id) {
                            $scope.admintagCtrl.errorMsg = data.errors.type_id[0];

                        }
                        else if (data.errors.description) {
                            $scope.admintagCtrl.errorMsg = data.errors.description[0];

                        }
                    } else if (data == 'created successfully') {
                        document.querySelector('.modal').style.display = "none";
                        $scope.adminCtrl.swal_success(data,'create');
                        $scope.admintagCtrl.tagLoad = false;
                    }

                });

        }

    };

    /*edit tag*/
    $scope.admintagCtrl.editTag = function (tagId, index) {
        $scope.adminCtrl.index = index;
        $scope.adminCtrl.allTagData = $scope.admintagCtrl.allTagData;
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.tags.edit", {tag_id: tagId}));
    };

    $scope.admintagCtrl.editTagData = function (id, types) {
        DataFactory.http('POST', $window.laroute.route("admin.tag.edit_data"),
            {id: id}).then(function (data) {
            $scope.admintagCtrl.data=data;
            $scope.admintagCtrl.oldTagType = data.type[0].tag_type;
            $scope.admintagCtrl.oldTagId = data.type[0].id;
            $scope.admintagCtrl.types = JSON.parse(types);
            $scope.editTag_typeId = data.type.id;
        })
        if ($scope.admintagCtrl.imgUrl == 'null') {
            $scope.admintagCtrl.tagImage = false;
            $scope.admintagCtrl.imgChooseShow = true;
        } else {
            $scope.admintagCtrl.tagImage = true;
            $scope.admintagCtrl.imgChooseShow = false;

        }
    };

    $scope.admintagCtrl.oldImgRemove = function () {
        $scope.admintagCtrl.tagImage = false;
        $scope.admintagCtrl.imgChooseShow = true;
    }
    $scope.admintagCtrl.viewOldImg = function () {

        $scope.admintagCtrl.tagImage = true;
        $scope.admintagCtrl.imgChooseShow = false;
    }
    $scope.admintagCtrl.editTagType = function () {

        $scope.editTag_typeId = $scope.editTag.id;

    };
    /*update tag*/
    $scope.admintagCtrl.updateTag = function (editTagId, editTagName, editTagDescription,metaTitle,metaDescription) {
        $scope.admintagCtrl.tagLoad = false;
        if (editTagName.length == 0 && editTagDescription.length == 0) {
            $scope.admintagCtrl.errorMsg = "Please fill the required fields";
            $scope.admintagCtrl.tagLoad = true;
        }
        else {
            var frmData = new FormData();
            frmData.append('id', editTagId);
            frmData.append('tag_name', editTagName);
            frmData.append('description', editTagDescription);
            frmData.append('type_id', $scope.editTag_typeId);
            frmData.append('image', $scope.imageData);
            frmData.append('meta_title', metaTitle);
            frmData.append('meta_description', metaDescription);
            frmData.append('oldTypeId', $scope.admintagCtrl.oldTagId);
            frmData.append('oldImg', $scope.admintagCtrl.picture);

            var header = {'Content-Type': undefined};
            DataFactory.http('post', $window.laroute.route('admin.tags.update'), frmData, header).then(function (data) {
                $scope.admintagCtrl.tagLoad = true;
                if (data.errors) {
                    if (data.errors.tag_name) {
                        $scope.admintagCtrl.errorMsg = data.errors.tag_name[0];
                    }
                    else if (data.errors.description) {
                        $scope.admintagCtrl.errorMsg = data.errors.description[0];
                    }
                } else {
                    $scope.adminCtrl.allTagData.data.splice($scope.adminCtrl.index, 1, data)
                    $scope.admintagCtrl.allTagData = $scope.adminCtrl.allTagData;
                    $scope.adminCtrl.allTagData = $scope.adminCtrl.index = null;
                    $('.modal').modal('hide');
                    $scope.mainCtrl.success_toaster('Successfully updated');
                    $scope.admintagCtrl.tagLoad = true;
                }
            });
        }

    };

    /*Delete tag*/
    $scope.admintagCtrl.deleteTag = function (tagId,index) {
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

                    var url = window.laroute.route("admin.tag.delete", {tag_id: tagId});
                    DataFactory.http('get', url, '').then(function (data, status, headers, config) {
                        $scope.adminCtrl.swal_delete();
                        $scope.admintagCtrl.allTagData.data.splice(index,1);
                    });
                } else {
                    $scope.adminCtrl.swal_cancelalert();
                }

            },
            function () {
                return false;
            });
    };
    $scope.admintagCtrl.typeEnable = function (tagName, tagDes, icon) {
        if (tagName.length > 0 && tagDes.length > 0 && icon.length > 0) {
            $scope.tagBtn = false
        } else {
            $scope.tagBtn = true;
        }
    };


    /*create a new Tag */
    $scope.admintagCtrl.tags = function (tag, tagDes, type, icon) {
        DataFactory.http('POST', $window.laroute.route('tags', {
            _token: csrf_token,
            tag_name: tag,
            tag_description: tagDes,
            type: type.id,
            icon_url: icon
        }))
            .then(function (data) {

            });
        $scope.tag_name = "";
        $scope.tag_description = "";
        $scope.typeName = "";
        $scope.tagIcon = "";
        $scope.tagBtn = true;


    };

    $(document).ready(function () {

        var url = window.laroute.route('tag.name');
        var select2_obj = $(".tagForm").select2({
            multiple: true,
            placeholder: "Enter a tag name",
            minimumInputLength: 3,
            ajax: {
                url: url,
                method: "POST",
                cache: false,


                data: function (params) {
                    var query = {
                        tag: params.term
                    }
                    return query;
                },
                processResults: function (data) {

                    return {
                        results: $.map(data, function (item) {
                            return {
                                text: item.text,
                                id: item.id
                            }
                        })
                    };
                },
            }
        });
        $(".tagForm").select2('data', {id: 5556, name: 'MyLabel'});

    })


}]);