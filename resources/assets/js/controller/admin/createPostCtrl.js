angular.module("controllers").controller("createPostController", ["$scope", "DataFactory", "$q", "$sce", "$window", "pinService", "$document", function ($scope, DataFactory, $q, $sce, $window, pinService, $document) {

    var csrf_token = document.getElementsByName('_token')[0].content;
    $scope.createCtrl = {};
    var postTitle = "";
    var postVideo = "";
    var category_Id = "";
    $scope.image64 = "";
    $scope.createCtrl.selectTagId = [];
    $scope.createCtrl.showVideo = true;
    $scope.createCtrl.showExport = false;
    $scope.createCtrl.forumLoad = false;
    $scope.createCtrl.showBackToTop = false;
    $scope.createCtrl.imgError = true;
    $scope.createCtrl.zoom = false;
    $scope.createCtrl.initializeData = function () {
        $scope.createCtrl.categoryData = category;
        $scope.createCtrl.userData = user;
    }

    $scope.createCtrl.categorySelect = function (categoryId) {

        if (categoryId != undefined) {
            category_Id = categoryId;
            if (category_Id == $scope.adminCtrl.news_CategoriesId) {
                $scope.createCtrl.disabled_video = true;
            }
            else if (category_Id == $scope.adminCtrl.tutorial_CategoriesId) {
                $scope.createCtrl.disabled_video = false;
            }
        }
    };
    $scope.createCtrl.userSelect = function (userId) {
        $scope.userId = userId;
    }

    $(function () {
        $('.image-editor').cropit({
            width: 240,
            height: 140,
            imageBackground: true,
            minZoom: 'fit',
            imageBackgroundBorderWidth: 20,
            onImageLoading: function () {
                $scope.createCtrl.imgError = true;
                $scope.createCtrl.showExport = false;
                $scope.$$phase || $scope.$root && $scope.$root.$$phase || $scope.$digest();
            },
            onImageError: function () {
                $scope.createCtrl.imgError = false;
                $(".error-msg").text("Please use an image that's at least " + "240 px in width and " + "140 px in height.");
                $(".cropit-preview").addClass("has-error");
                $scope.createCtrl.showExport = true;
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

    /* Create post  */
    $scope.createCtrl.postCreate = function (title, video_url, tagId, type) {
        $scope.createCtrl.forumLoad = true;
        postTitle = title;
        postVideo = video_url == undefined ? '' : video_url;
        getTag_id = tagId == undefined ? '' : tagId;
        image = $scope.imageData == undefined ? '' : $scope.imageData;
        editorId = $scope.userId == undefined ? '' : $scope.userId;
        // is_publish = publish == undefined ? '' : publish;
        //meta_Keyword = metaKeyword == undefined ? '' : metaKeyword;
        var contentValue = simplemde.value();
        if (postTitle == undefined && postVideo == undefined && category_Id == "" && contentValue == "" && $scope.imageData == undefined) {
            $scope.createCtrl.ErrMessage = "Please fill the Required field.";
            $scope.createCtrl.forumLoad = false;
        } else {
            var uploadImg = new FormData();
            uploadImg.append('title', postTitle);
            uploadImg.append('category', category_Id);
            uploadImg.append('image_url', image);
            uploadImg.append('videoUrl', postVideo);
            uploadImg.append('tag_id', getTag_id);
            uploadImg.append('publish_date', $scope.date);
            uploadImg.append('content', contentValue);
            uploadImg.append('author', editorId);
            uploadImg.append('publish_date', $scope.date);
            //uploadImg.append('meta_title', metTitle);
            //uploadImg.append('meta_description', metaDescription);
            //uploadImg.append('meta_keyword', meta_Keyword);
            uploadImg.append('type', type);
            // uploadImg.append('isPublish', is_publish);
            var contentType = {'Content-Type': undefined};
            var markdown_img = pinService.markdownImg;
            uploadImg.append('markdown_img', JSON.stringify(markdown_img));

            DataFactory.http('POST', $window.laroute.route('admin.post.store'), uploadImg, contentType).then(function (data) {
                if (data.errors) {
                    $scope.createCtrl.forumLoad = false;

                    if (data.errors.title) {
                        $scope.createCtrl.ErrMessage = data.errors.title[0];
                    }
                    else if (data.errors.category) {
                        $scope.createCtrl.ErrMessage = data.errors.category[0];
                    }
                    else if (data.errors.image_url) {
                        $scope.createCtrl.ErrMessage = "Please choose the image and click the Export button";
                    }
                    else if (data.errors.videoUrl) {
                        $scope.createCtrl.ErrMessage = data.errors.videoUrl[0];
                    }
                    else if (data.errors.tag_id) {
                        $scope.createCtrl.ErrMessage = data.errors.tag_id[0];
                    }
                    else if (data.errors.content) {
                        $scope.createCtrl.ErrMessage = data.errors.content[0];
                    }
                    else if (data.errors.author) {
                        $scope.createCtrl.ErrMessage = data.errors.author[0];
                    }
                    // else if (data.errors.meta_title) {
                    //     $scope.createCtrl.ErrMessage = data.errors.meta_title[0];
                    // }
                    // else if (data.errors.meta_description) {
                    //     $scope.createCtrl.ErrMessage = data.errors.meta_description[0];
                    // }

                } else {
                    $scope.createCtrl.forumLoad = false;
                    $scope.adminCtrl.swal_success('Post created successfully','create');
                }
            });
        }
    }

    /*preview_functionality*/
    $scope.createCtrl.postPreview = function (title, tagId,videoUrl) {
        postTitle = title;
        if(category_Id == $scope.adminCtrl.news_CategoriesId){
            postVideo = null;
        }else{
            postVideo = videoUrl;
        }
        getTag_id = tagId;
        userId = $scope.userId;
        var contentValue = simplemde.value();
            var post_data = {
                title: postTitle,
                videoUrl: postVideo,
                tags: getTag_id,
                content: contentValue,
                user_id: userId
            };


            $.ajax({
                type: 'POST',
                url: '/post_preview',
                data: {data: post_data},
                success: function (data) {
                    var content = data;
                    window.open($window.laroute.route('admin.post.preview') + '/?page=demo', '_blank');
                }
            })
    };

    $scope.createCtrl.previewData = function () {
        var previewDataLength = $('p').innerHeight();
        var windowLength = $(window).height();
        var previewData = slugData;
        if (previewData != null) {
            if (slugData.category == 'Tutorials') {
                $scope.createCtrl.categoryId = $scope.mainCtrl.tutorial_CategoriesId;
            } else {
                $scope.createCtrl.categoryId = $scope.mainCtrl.news_CategoriesId;
            }
            $scope.createCtrl.previewData = slugData;
            $scope.contentMsg = slugData.content;
        }
        $scope.trustedContent = $scope.contentMsg;
        if (previewDataLength == windowLength || previewDataLength > windowLength) {
            $scope.createCtrl.showBackToTop = true;
        } else {
            $scope.createCtrl.showBackToTop = false;
        }

    }

    $scope.createCtrl.checkUrl = function (title) {
        DataFactory.http('POST', $window.laroute.route('admin.check_url', {title: title})).then(function (data) {
            $scope.createCtrl.slug = data;
        })
    }

    /*meta description count*/
    $scope.createCtrl.post_display_default = false;
    $scope.createCtrl.metaDescriptionCount = function () {
        $scope.type='meta_description';
        $scope.countValidation(300, $scope.meta_description.length,$scope.type);
    }

    /*meta title count */
    $scope.createCtrl.post_display_default = false;
    $scope.createCtrl.metaTitleCount = function () {
        $scope.type='meta_title';
        $scope.countValidation(255, $scope.meta_title.length,$scope.type);
    }

    /*title count */
    $scope.createCtrl.post_display_default = false;
    $scope.createCtrl.titleCount = function () {
        $scope.type='title';
        $scope.countValidation(255, $scope.title.length,$scope.type);
    }

    $scope.countValidation = function (max_len, cur_len,type) {
        if(type == 'meta_title'){
            $scope.createCtrl.meta_title_count = max_len;
        }else if(type == 'meta_description'){
            $scope.createCtrl.meta_discription_count = max_len;
        }
        else if(type == 'title'){
        $scope.createCtrl.title_count = max_len;
    }
        if (cur_len == undefined) {
            $scope.createCtrl.post_display_default = true;
            $scope.createCtrl.post_display_dynamic = false;
        } else {
            var count = cur_len;
        }
        $scope.createCtrl.post_display_dynamic = false;
        if (count > 0) {
            if (count == max_len) {
                $scope.createCtrl.post_display_dynamic = true;
                $scope.createCtrl.post_count_dynamic = 0;
            } else {
                $scope.createCtrl.post_display_default = false;
                $scope.createCtrl.post_display_dynamic = true;
                if(type == 'meta_title'){
                    $scope.createCtrl.meta_title_count_dynamic = $scope.createCtrl.meta_title_count - count;

                }else if(type == 'meta_description'){
                    $scope.createCtrl.meta_description_count_dynamic = $scope.createCtrl.meta_discription_count - count;

                }else if(type == 'title'){
                    $scope.createCtrl.title_count_dynamic = $scope.createCtrl.title_count - count;

                }
            }
        } else {
            $scope.createCtrl.post_display_dynamic = true;
            if(type == 'meta_title'){
                $scope.createCtrl.meta_title_count_dynamic = max_len;
            }else if(type == 'meta_description'){
                $scope.createCtrl.meta_description_count_dynamic = max_len;

            } else if(type == 'title'){
            $scope.createCtrl.title_count_dynamic = max_len;

        }
        }

    }

    /*Back to top*/
    $scope.createCtrl.toTheTop = function () {
        $document.scrollTopAnimated(0, 300).then(function () {
        });
    }


    /*iframe - Trusted url*/
    $scope.trustSrc = function (video_url) {
        return $sce.trustAsResourceUrl(video_url);
    }
    var url = window.laroute.route('tag.name');
    var select2_obj = $(".tagForm").select2({
        multiple: true,
        placeholder: "Eg) Ubuntu.",
        minimumInputLength: 3,
        ajax: {
            url: url,
            method: "POST",
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
}]);