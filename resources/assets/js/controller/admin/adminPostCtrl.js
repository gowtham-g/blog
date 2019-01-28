angular.module("controllers").controller("adminPostController", ["$scope", "$window", "DataFactory", "$timeout", "pinService", "$sce", "$document", function ($scope, $window, DataFactory, $timeout, pinService, $sce, $document) {

    $scope.adminPostCtrl = {};
    $scope.tagBtn = true;
    $scope.adminPostCtrl.currentPage = 1;
    $scope.adminPostCtrl.itemsPerPage = 10;
    $scope.adminPostCtrl.totalLoaded = 0;
    $scope.adminPostCtrl.maxSize = 5;
    $scope.adminPostCtrl.showMove = false;
    $scope.adminPostCtrl.tableShow = true;
    $scope.adminPostCtrl.oldImgShow = true;
    $scope.adminPostCtrl.viewBtn = true;
    $scope.adminPostCtrl.postImge = false;
    $scope.adminPostCtrl.imgChooseShow = false;
    $scope.adminPostCtrl.Check = true;
    $scope.adminPostCtrl.Close = true;
    $scope.adminPostCtrl.viewDatePicker = false;
    $scope.pageLimit = null;
    $scope.adminPostCtrl.imgError = true;
    $scope.adminPostCtrl.load = true;
    $scope.adminPostCtrl.postLoad = false;

    $scope.adminPostCtrl.postInitialize_data = function () {
        DataFactory.http('POST', $window.laroute.route('admin.post.paginate'),{postCategory: $scope.adminCtrl.tutorial_CategoriesId}).then(function (data) {
            $scope.adminPostCtrl.postData = data;
            $scope.adminPostCtrl.totalItem = data.total;
            $window.scrollTo(0, 0);
        });
    };

    $scope.adminPostCtrl.tag = function (tag) {
        $scope.adminPostCtrl.tagData = tag;
    };

    $scope.adminPostCtrl.dateFormat = function (createdDate) {
        $scope.dateFrmt = moment(createdDate).format('ll');
    };


    $scope.adminPostCtrl.deletePost = function (postId,index) {
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
                    var url = window.laroute.route("admin.post.delete", {post_id: postId});
                    DataFactory.http('get', url, '').then(function (data, status, headers, config) {
                        $scope.adminCtrl.swal_delete('Deleted successfully');
                        $scope.adminPostCtrl.postData.data.splice(index,1);
                    });

                } else {
                    $scope.adminCtrl.swal_cancelalert();
                }
            },
            function () {
                return false;
            });
    };

    $scope.adminPostCtrl.editPost = function (postId,index) {
        $scope.adminCtrl.index = index;
        $scope.adminCtrl.postData = $scope.adminPostCtrl.postData;
        $scope.adminCtrl.dialog_popup($window.laroute.route("admin.post.edit", {id: postId}));
    };

    $scope.adminPostCtrl.editPostData = function (id, categories, user) {
        DataFactory.http('POST', $window.laroute.route("admin.post.edit_data"),
            {id: id}).then(function (data) {
            $scope.adminPostCtrl.data = data;
            $scope.adminPostCtrl.publishDate=data.publish_date;
            $scope.dateTime = new Date($scope.adminPostCtrl.publishDate);
            $scope.dateTime = moment($scope.dateTime).format("YYYY-MM-DD");
            var date = new Date();
            $scope.currentdate = moment(date).format('YYYY-MM-DD');
            if ($scope.currentdate < $scope.dateTime || $scope.currentdate == $scope.dateTime) {
                $scope.adminPostCtrl.viewDatePicker = false;
            } else {
                $scope.adminPostCtrl.viewDatePicker = true;
            }
            $scope.adminPostCtrl.markdown_content = data.markdown_content;
            $scope.adminPostCtrl.oldAuthor = data.user;
            $scope.adminPostCtrl.oldCategory = data.category.type;
            $scope.adminPostCtrl.oldCategoryId = data.category.id;

            if ($scope.adminPostCtrl.oldCategoryId == 1) {
                $scope.adminPostCtrl.disabled_video = false;
            } else {
                $scope.adminPostCtrl.disabled_video = true;
            }
            $scope.adminPostCtrl.categories = JSON.parse(categories);
            $scope.adminPostCtrl.users = JSON.parse(user);
            simplemde.value($scope.adminPostCtrl.markdown_content);

        })
        if ($scope.adminPostCtrl.imgUrl == 'null') {
            $scope.adminPostCtrl.postImge = false;
            $scope.adminPostCtrl.imgChooseShow = true;
        } else {
            $scope.adminPostCtrl.postImge = true;
            $scope.adminPostCtrl.imgChooseShow = false;

        }
        $scope.adminPostCtrl.oldImgRemove = function () {
            $scope.adminPostCtrl.postImge = false;
            $scope.adminPostCtrl.imgChooseShow = true;
        }
        $scope.adminPostCtrl.viewOldImg = function () {
            $scope.adminPostCtrl.postImge = true;
            $scope.adminPostCtrl.imgChooseShow = false;
        }
    }

    $scope.adminPostCtrl.editCatType = function () {
        if ($scope.editCategory == null) {
            $scope.editCategoryId = $scope.adminPostCtrl.oldCategoryId;
            if ($scope.adminPostCtrl.oldCategoryId == $scope.adminCtrl.tutorial_CategoriesId) {
                $scope.adminPostCtrl.disabled_video = false;

            }
            else if ($scope.adminPostCtrl.oldCategoryId == $scope.adminCtrl.news_CategoriesId) {
                $scope.adminPostCtrl.disabled_video = true;

            }
        } else {
            if ($scope.editCategory.id == $scope.adminCtrl.news_CategoriesId) {
                $scope.adminPostCtrl.disabled_video = true;
            }
            if ($scope.editCategory.id == $scope.adminCtrl.tutorial_CategoriesId) {
                $scope.adminPostCtrl.disabled_video = false;
            }
        }

    };

    $scope.adminPostCtrl.editUser = function () {
        $scope.editUserId = $scope.editUser.id;
    };

    $(function () {

        $('.image-editor').cropit({
            width: 240,
            height: 140,
            minZoom: 'fit',
            imageBackground: true,
            imageBackgroundBorderWidth: 20,
            onImageLoading: function () {
                $scope.adminPostCtrl.imgError = true;
                $scope.adminPostCtrl.showExport = false;
                $scope.$$phase || $scope.$root && $scope.$root.$$phase || $scope.$digest();
            },
            onImageError: function () {
                $scope.adminPostCtrl.imgError = false;
                $(".error-msg").text("Please use an image that's at least " + "240 px in width and " + "140 px in height.");
                $(".cropit-preview").addClass("has-error");
                $scope.adminPostCtrl.showExport = true;
                $scope.$$phase || $scope.$root && $scope.$root.$$phase || $scope.$digest();
            }

        });

        $('.export').click(function () {
            $scope.imageData = $('.image-editor').cropit('export');
        });
    });

    $(function () {
        $('#datetimepicker4').datetimepicker();
        $('#datetimepicker4').on("change.datetimepicker", function (e) {
            $scope.date = moment(e.date).format('YYYY-MM-DD');
        });
    });

    $scope.adminPostCtrl.postUpdate = function (title, video_url, id, metaTitle, metaDescription, metaKeyword) {
        $scope.adminPostCtrl.postLoad = true;
        var tag_id = [];
        angular.forEach(angular.element('#tag-id > option:selected'), function (value, key) {
            tag_id.push(value.value);
        });
        var postTitle = title;
        var category_Id = $scope.editCategory == null ? $scope.adminPostCtrl.oldCategoryId : $scope.editCategory.id;
        // var publish_date = $scope.date == undefined ? '' : $scope.date;
        var author = $scope.editUserId == undefined ? $scope.adminPostCtrl.oldAuthor.id : $scope.editUserId;
        if (category_Id == $scope.adminCtrl.news_CategoriesId) {
            var postVideo = '';
        } else {
            var postVideo = video_url == null ? '' : video_url;
        }
        var editablecontent = simplemde.value();

        var uploadImg = new FormData();
        uploadImg.append('id', id);
        uploadImg.append('title', postTitle);
        uploadImg.append('tag_id', tag_id);
        uploadImg.append('videoUrl', postVideo);
        uploadImg.append('category', category_Id);
        // uploadImg.append('publish_date', publish_date);
        // uploadImg.append('old_publish_date', $scope.dateTime);
        uploadImg.append('content', editablecontent);
        uploadImg.append('image_url', $scope.imageData);
        uploadImg.append('type', "postUpdate");
        uploadImg.append('author', author);
        uploadImg.append('meta_title', metaTitle);
        uploadImg.append('meta_description', metaDescription);
        uploadImg.append('meta_keyword', metaKeyword);
        var contentType = {'Content-Type': undefined};
        var markdown_img = pinService.markdownImg;
        uploadImg.append('markdown_img', JSON.stringify(markdown_img));
        DataFactory.http('POST', $window.laroute.route('admin.post.update'), uploadImg, contentType).then(function (data) {
            $scope.adminPostCtrl.postLoad = false;
            if (data.errors) {
                if (data.errors.title) {
                    $scope.adminPostCtrl.ErrMessage = data.errors.title[0];
                }
                else if (data.errors.category) {
                    $scope.adminPostCtrl.ErrMessage = data.errors.category[0];
                }
                else if (data.errors.image_url) {
                    $scope.adminPostCtrl.ErrMessage = "Please choose the image and click the Export button";
                }
                else if (data.errors.videoUrl) {
                    $scope.adminPostCtrl.ErrMessage = data.errors.videoUrl[0];
                }
                else if (data.errors.tag_id) {
                    $scope.adminPostCtrl.ErrMessage = data.errors.tag_id[0];

                }
                else if (data.errors.content) {
                    $scope.adminPostCtrl.ErrMessage = data.errors.content[0];
                }
                else if (data.errors.meta_title) {
                    $scope.adminPostCtrl.ErrMessage = data.errors.meta_title[0];
                }
                else if (data.errors.meta_description) {
                    $scope.adminPostCtrl.ErrMessage = data.errors.meta_description[0];
                }
                else if (data.errors.meta_keyword) {
                    $scope.adminPostCtrl.ErrMessage = data.errors.meta_keyword[0];
                }

            } else {
                $scope.adminCtrl.postData.data.splice($scope.adminCtrl.index, 1, data)
                $scope.adminPostCtrl.postData = $scope.adminCtrl.postData;
                $scope.adminCtrl.posttData = $scope.adminCtrl.index = null;
                $('.modal').modal('hide');
                $scope.adminCtrl.swal_success('Post updated successfully');
                $scope.adminPostCtrl.postLoad = false;
            }
        });
    }

    $(document).ready(function () {
        var url = window.laroute.route('tag.name');
        var select2_obj = $(".postTag").select2({
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
        $(".tagForm");

    })
    $scope.adminPostCtrl.checkUrl = function (title) {
        DataFactory.http('POST', $window.laroute.route('admin.check_url', {title: title})).then(function (data) {
            $scope.adminPostCtrl.data.slug = data;
        })
    }


    $scope.adminPostCtrl.searchPost = function (searchPostData) {
        $scope.adminPostCtrl.load = false;
        $scope.page=undefined;
        $scope.searchPostData=searchPostData;
        if (searchPostData == undefined || searchPostData.length == 0) {
            $scope.adminPostCtrl.searchDataErr = " Please given search title ";
            $scope.adminPostCtrl.load = true;
        }
        else {
            $scope.adminPostCtrl.searchDataErr = " ";
            if($scope.category != undefined){
               var requestData={
                   search_post: searchPostData,
                   type: $scope.category,
                   postCategory: $scope.adminCtrl.tutorial_CategoriesId
               }
            }else{
                var requestData={
                    search_post: searchPostData,
                    postCategory: $scope.adminCtrl.tutorial_CategoriesId
                }
            }
            DataFactory.http('POST', $window.laroute.route('admin.post.paginate',requestData)).then(function (data) {
                if (data.total == 0) {
                    $scope.adminPostCtrl.noPostErr = "No post found ";
                    $scope.adminPostCtrl.totalItem = data.total;
                    $scope.adminPostCtrl.tableShow = false;
                    $scope.adminPostCtrl.load = true;
                } else {
                    $scope.adminPostCtrl.load = true;
                    $scope.adminPostCtrl.tableShow = true;
                    $scope.adminPostCtrl.postData.data = data.data;
                    $scope.adminPostCtrl.dataType = 'search';
                    $scope.adminPostCtrl.currentPage = data.current_page;
                    $scope.adminPostCtrl.postData.path = data.path;
                    $scope.adminPostCtrl.totalItem = data.total;
                    $scope.searchData = "Search Result" + "  " + searchPostData;
                    $scope.adminPostCtrl.noPostErr = "";
                    $scope.adminPostCtrl.postLoad = false;
                }

            })
        }


    }

    $scope.adminPostCtrl.itemPerPageChange = function (currentPage, pageLimit, searchPostData) {
        if(pageLimit != undefined){
            $scope.adminPostCtrl.itemsPerPage = pageLimit;
        }
        $scope.adminPostCtrl.pageLimit = pageLimit;
        $scope.adminPostCtrl.load = false;
        $scope.adminPostCtrl.itemsPerPage =pageLimit;
        if(pageLimit != undefined && searchPostData != undefined && $scope.category == undefined){
            var requestData={
                page: currentPage,
                limit: $scope.adminPostCtrl.pageLimit,
                search_post:searchPostData,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }else if(pageLimit != undefined && $scope.category == undefined && searchPostData == undefined) {
            var requestData={
                page: currentPage,
                limit: $scope.adminPostCtrl.pageLimit,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }else if($scope.category != undefined && pageLimit != undefined && searchPostData == undefined){
            var requestData={
                page: currentPage,
                limit: $scope.adminPostCtrl.pageLimit,
                type: $scope.category,
                category_id :$scope.adminCtrl.tutorial_CategoriesId,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }else if($scope.category != undefined && pageLimit != undefined && searchPostData != undefined){
            var requestData={
                page: currentPage,
                limit: $scope.adminPostCtrl.pageLimit,
                type: $scope.category,
                category_id :$scope.adminCtrl.tutorial_CategoriesId,
                search_post:searchPostData,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }
        DataFactory.http('POST', $scope.adminPostCtrl.postData.path ,requestData).then(function(data) {
            $scope.adminPostCtrl.postData = data;
            $scope.adminPostCtrl.totalItem = data.total;
            $scope.adminPostCtrl.load= true;
        })
    }

    $scope.adminPostCtrl.pageChanged = function (currentPage, searchPostData) {
        $scope.adminPostCtrl.pageLimit=$scope.page;
        if ($scope.adminPostCtrl.pageLimit != undefined && searchPostData == undefined && $scope.category == undefined) {
            var requestData={
                page: currentPage,
                limit : $scope.adminPostCtrl.pageLimit,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }else if (searchPostData == undefined && $scope.adminPostCtrl.pageLimit == undefined && $scope.category == undefined) {
            var requestData={
                page: currentPage,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }else if (searchPostData != undefined && $scope.adminPostCtrl.pageLimit == undefined && $scope.category == undefined) {
            var requestData={
                page: currentPage,
                search_post : searchPostData,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }else if (searchPostData != undefined && $scope.adminPostCtrl.pageLimit != undefined && $scope.category == undefined) {
            var requestData={
                page: currentPage,
                limit : $scope.adminPostCtrl.pageLimit,
                search_post : searchPostData,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }else if(searchPostData == undefined && $scope.adminPostCtrl.pageLimit != undefined && $scope.category != undefined){
            var requestData={
                page: currentPage,
                limit : $scope.adminPostCtrl.pageLimit,
                type: $scope.category,
                category_id :$scope.adminCtrl.tutorial_CategoriesId,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }else if(searchPostData == undefined && $scope.adminPostCtrl.pageLimit == undefined && $scope.category != undefined){
            var requestData={
                page: currentPage,
                limit : $scope.adminPostCtrl.pageLimit,
                type: $scope.category,
                category_id :$scope.adminCtrl.tutorial_CategoriesId,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }else if(searchPostData != undefined && $scope.adminPostCtrl.pageLimit == undefined && $scope.category != undefined){
            var requestData={
                page: currentPage,
                limit : $scope.adminPostCtrl.pageLimit,
                type: $scope.category,
                category_id :$scope.adminCtrl.tutorial_CategoriesId,
                search_post : searchPostData,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }else if(searchPostData != undefined && $scope.adminPostCtrl.pageLimit != undefined && $scope.category != undefined){
            var requestData={
                page: currentPage,
                limit : $scope.adminPostCtrl.pageLimit,
                type: $scope.category,
                category_id :$scope.adminCtrl.tutorial_CategoriesId,
                search_post : searchPostData,
                postCategory: $scope.adminCtrl.tutorial_CategoriesId
            }
        }
        DataFactory.http('POST', $scope.adminPostCtrl.postData.path ,requestData)
            .then(function (data) {
                $scope.adminPostCtrl.postData = data;
                $scope.adminPostCtrl.totalItem = data.total;
                $scope.adminPostCtrl.currentPage = data.current_page;
                if($scope.adminPostCtrl.pageLimit != undefined){
                    $scope.adminPostCtrl.itemsPerPage = $scope.adminPostCtrl.pageLimit;
                }else{
                    $scope.adminPostCtrl.itemsPerPage=10;
                }
                $window.scrollTo(0, 0);
            })
    }

    $scope.adminPostCtrl.viewPost = function (postId, postTitle, postVideo, markdownContent, category, slug, user, tag) {

        var post_data = {
            id: postId,
            title: postTitle,
            videoUrl: postVideo,
            category: category,
            content: markdownContent,
            user_id: user,
            tags: tag
        };
        $.ajax({
            type: 'POST',
            url: '/post_preview',
            data: {data: post_data},
            success: function (data) {
                var content = data;
                window.open($window.laroute.route('admin.post.preview') + '/?page=' + slug, '_blank');

            }
        })
    }

    $scope.adminPostCtrl.postEditPreview = function (postId, postTitle, postVideo, markdownContent, category, slug, user) {
        var tag_id = [];
        angular.forEach(angular.element('#tag-id > option:selected'), function (value, key) {
            tag_id.push(value.value);
        });
        var editablecontent = simplemde.value();
        var post_user = $scope.editUserId == undefined ? user : $scope.editUserId
        var post_category=$scope.editCategory == undefined ? category : $scope.editCategory.id

        var post_data = {
            id: postId,
            title: postTitle,
            videoUrl: postVideo,
            category: post_category,
            content: editablecontent,
            user_id: post_user,
            tags: tag_id
        };
        $.ajax({
            type: 'POST',
            url: '/post_preview',
            data: {data: post_data},
            success: function (data) {
                var content = data;
                window.open($window.laroute.route('admin.post.preview') + '/?page=' + slug, '_blank');

            }
        })
    }


    /*Back to top*/
    $scope.adminPostCtrl.toTheTop = function () {
        $document.scrollTopAnimated(0, 300).then(function () {
        });
    }
    $scope.adminPostCtrl.approvePost = function (postId, isApprove, index) {
        var data = {
            id: postId,
            is_approve: isApprove
        };
        DataFactory.http('POST', $window.laroute.route('admin.post.approve'), data).then(function (data) {
            $scope.adminPostCtrl.isApprove = data.is_approve;
            $scope.adminPostCtrl.id = data.id;

            if ($scope.adminPostCtrl.id == postId && $scope.adminPostCtrl.isApprove == 1) {
                $scope.adminPostCtrl.postData.data[index].is_approve = $scope.adminPostCtrl.isApprove;
            } else if ($scope.adminPostCtrl.id == postId && $scope.adminPostCtrl.isApprove != 1) {
                $scope.adminPostCtrl.postData.data[index].is_approve = $scope.adminPostCtrl.isApprove;
            }
        })
    }

    $scope.adminPostCtrl.categorySelect = function(category){
        $scope.searchPostData=undefined;
        $scope.page=undefined;
        $scope.category=category;
        if($scope.page == undefined){
            $scope.adminPostCtrl.itemsPerPage=10;
        }
        var data={
            category_id :$scope.adminCtrl.tutorial_CategoriesId,
            type: $scope.category,
            postCategory: $scope.adminCtrl.tutorial_CategoriesId
        };
        DataFactory.http('POST',$window.laroute.route('admin.unapprove.post'),data).then(function(data){
            if(data.total == 0){
                $scope.adminPostCtrl.noForumErr = "No forum Found";
                $scope.adminPostCtrl.totalItem = data.total;
                $scope.adminPostCtrl.tableShow = false;
            }else{
                $scope.adminPostCtrl.postData = data;
                $scope.adminPostCtrl.totalItem = data.total;
                $scope.adminPostCtrl.currentPage = data.current_page;
                $scope.adminPostCtrl.tableShow = true;
                $scope.adminPostCtrl.noPostErr = " ";
            }

        })
    }

    /*meta description count*/
    $scope.adminPostCtrl.post_display_default = false;
    $scope.adminPostCtrl.metaDescriptionCount = function () {
        $scope.type='meta_description';
        $scope.countValidation(300, $scope.adminPostCtrl.data.meta_description.length,$scope.type);
    }

    /*meta title count */
    $scope.adminPostCtrl.post_display_default = false;
    $scope.adminPostCtrl.metaTitleCount = function () {
        $scope.type='meta_title';
        $scope.countValidation(255, $scope.adminPostCtrl.data.meta_title.length,$scope.type);
    }

    /*title count */
    $scope.adminPostCtrl.post_display_default = false;
    $scope.adminPostCtrl.titleCount = function () {
        $scope.type='title';
        $scope.countValidation(255, $scope.adminPostCtrl.data.title.length,$scope.type);
    }

    $scope.countValidation = function (max_len, cur_len,type) {
        if(type == 'meta_title'){
            $scope.adminPostCtrl.meta_title_count = max_len;
        }else if(type == 'meta_description'){
            $scope.adminPostCtrl.meta_discription_count = max_len;
        }
        else if(type == 'title'){
            $scope.adminPostCtrl.title_count = max_len;
        }
        if (cur_len == undefined) {
            $scope.adminPostCtrl.post_display_default = true;
            $scope.adminPostCtrl.post_display_dynamic = false;
        } else {
            var count = cur_len;
        }
        $scope.adminPostCtrl.post_display_dynamic = false;
        if (count > 0) {
            if (count == max_len) {
                $scope.adminPostCtrl.post_display_dynamic = true;
                $scope.adminPostCtrl.post_count_dynamic = 0;
            } else {
                $scope.adminPostCtrl.post_display_default = false;
                $scope.adminPostCtrl.post_display_dynamic = true;
                if(type == 'meta_title'){
                    $scope.adminPostCtrl.meta_title_count_dynamic = $scope.adminPostCtrl.meta_title_count - count;

                }else if(type == 'meta_description'){
                    $scope.adminPostCtrl.meta_description_count_dynamic = $scope.adminPostCtrl.meta_discription_count - count;

                }else if(type == 'title'){
                    $scope.adminPostCtrl.title_count_dynamic = $scope.adminPostCtrl.title_count - count;
                }
            }
        } else {
            $scope.adminPostCtrl.post_display_dynamic = true;
            if(type == 'meta_title'){
                $scope.adminPostCtrl.meta_title_count_dynamic = max_len;
            }else if(type == 'meta_description'){
                $scope.adminPostCtrl.meta_description_count_dynamic = max_len;

            } else if(type == 'title'){
                $scope.adminPostCtrl.title_count_dynamic = max_len;

            }
        }

    }
}
]);