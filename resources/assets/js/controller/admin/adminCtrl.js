var helpcat = angular.module("controllers").controller("adminController", ["$scope","$window", "DataFactory","$mdDialog","helpApiCall",function ($scope,$window, DataFactory, $mdDialog,helpApiCall) {

    $scope.adminCtrl = {};
    $scope.adminCtrl.tutorial_CategoriesId = 1;
    $scope.adminCtrl.forum_CategoriesId = 2;
    $scope.adminCtrl.news_CategoriesId = 3;
    $scope.adminCtrl.laroute = $window.laroute;
    $scope.adminCtrl.status = [];
    $scope.adminCtrl.initializeStatus = initializeStatus;
    $scope.adminCtrl.cancel = cancel;
    $scope.categories = [];
    
    $scope.showBoardView = function (slug, id) {
        $scope.show_board_view_for = slug;
        $scope.show_board_view_for_id = id;
        $mdDialog.show({
            templateUrl: $window.laroute.route("help.view", {'name': 'board-view'}),
            preserveScope: true,
            scope: $scope,
            hasBackdrop: true,
            clickOutsideToClose: true,
            escapeToClose: true,
            onComplete: function () {
            }
        });
    };

    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        $scope.IsVisible = $scope.IsVisible ? false : true;
    }

    function cancel() {
        modalPromise.hide();
    }

    function initializeStatus(id) {
        $scope.adminCtrl.status[id] = [];
    }
    $('select[name="state_id"]').change(function () {
        var url = $window.laroute.route('category.state');
        var data = {
            state_ids: $(this).val(),
            category_id: $(this).data('category-id')
        };
        DataFactory.http('post', url, data).then(function (data, status, headers, config) {
            iziToast.show({
                title: 'Success',
                message: data.success,
                color: '#00cc99',
                position: 'topRight'
            });
        });
    });

    $scope.adminCtrl.submitdata = function () {
        console.log($scope.adminCtrl.state['data']);
        var help_state_id = document.getElementById('help_state_id');
        var e = help_state_id.options[help_state_id.selectedIndex].text;
        var choosen = document.getElementById('tagChoosen');
        var tag = choosen.options[choosen.selectedIndex].text;
    }

    $('select[name="category"]').change(function () {
        $scope.adminCtrl.state_list =[];
         var statename =[];
        var data = {
            category_id: $(this).val(),
        };
        $scope.categories.push(data);
        var url = $window.laroute.route("admin.api.getStates");
        $scope.adminCtrl.state = {data:data.category_id};
        $.ajax({
            type: "POST",
            url: url,
            data: {data:data.category_id},
            success: function(resultData){
                $scope.adminCtrl.state_list = resultData;
            }
        });
    });

    $('select[name="helptags_id"]').change(function () {
        var url = $window.laroute.route('post.tag');
        var data = {
            tag_ids: $(this).val(),
            category_id: $(this).data('category-id')
        };
        DataFactory.http('post', url, data).then(function (data, status, headers, config) {
        });

    });
   $scope.adminCtrl.swal_success = function(dataMsg,type){
	swal({
        position: 'center',
        type: 'success',
        title: dataMsg,
        showConfirmButton: false,
        timer: 1500
	 }).then(function(){
	     if(type == 'create'){
             location.reload();
         }
        })
}
$scope.adminCtrl.getStates = function(){
    $scope.adminCtrl.state = $scope.adminCtrl.category;
    helpApiCall.get($window.laroute.route("admin.api.getStates", {helpCategory:$scope.adminCtrl.state}) ).then(function (response){
    $scope.adminCtrl.state_list= response;
    });
}
$scope.adminCtrl.categoryInit = function(category){
        if(category) {
            $scope.adminCtrl.category= category;
            helpApiCall.get($window.laroute.route("admin.api.getStates", {helpCategory:$scope.adminCtrl.state})).then(function (response) {
                $scope.adminCtrl.state_list = response;
            });

            helpApiCall.get($window.laroute.route("admin.api.getTag",{helpCategory:$scope.adminCtrl.tag})).then(function (response){
                $scope.adminCtrl.tag_list= response;
            });
        }
    };
$scope.adminCtrl.dialog_popup = function(url){
    $mdDialog.show({
            templateUrl: url,
            scope: $scope,
            hasBackdrop: true,
            clickOutsideToClose: true,
            escapeToClose: true,
            preserveScope : true,
            onComplete:function () {

            }
        });
}
$scope.adminCtrl.menuShowHide= function(type){
    if(type == "help"){
        var divID = document.getElementById("myHelpDiv");
    }
    if (divID.style.display == "none" || divID.style.display == "") {
        divID.style.display = "block";
    } else {
        divID.style.display = "none";
    }
}
    $scope.adminCtrl.deleteHelpStatus = function(id) {
        modalPromise = $mdDialog.show({
            templateUrl: $window.laroute.route("admin.state.popup", {helpState:id}),
            preserveScope: true,
            scope: $scope,
            hasBackdrop: true,
            clickOutsideToClose: true,
            escapeToClose: true,
            onShowing: function (e) {

            },
            onComplete: function (e) {

            },
            onRemoving: function (e) {

            },
            onRemoved: function (e) {
            }
        });
    }

    $scope.adminCtrl.deleteState = function (id) {
        var url = $window.laroute.route("admin.state.delete",{helpState:id});
        console.log(url);
        DataFactory.http('get',url).then(function (data) {
        }).then(function () {
            location.reload();
        });
    }

    $scope.adminCtrl.updateStatus = function (id) {
        $scope.adminCtrl.status[id] = $scope.adminCtrl.status[id]? 0 : 1;
        var data = {status: $scope.adminCtrl.status[id]};
        DataFactory.http('',$window.laroute.route("state.approve.update", {state: id}), data).then(function (data, status, headers, config) {
            if(data.data) {
                swal({
                    title: '',
                    text: data.data,
                    type: 'success',
                    confirmButtonColor: '#00c0ef'
                }).then(function () {
                });
            }
            if(data.error) {
                swal({
                    title: '',
                    text: data.error,
                    type: 'warning',
                    confirmButtonColor: '#00c0ef'
                }).done();
            }
        })

    }

    $scope.adminCtrl.deleteHelpTag = function(id) {
        modalPromise = $mdDialog.show({
            templateUrl: $window.laroute.route("admin.tag.delete",{helpTag:id}),
            preserveScope: true,
            scope: $scope,
            hasBackdrop: true,
            clickOutsideToClose: true,
            escapeToClose: true,
            onShowing: function (e) {

            },
            onComplete: function (e) {

            },
            onRemoving: function (e) {

            },
            onRemoved: function (e) {
            }
        });
    }


    $scope.adminCtrl.deleteTag = function (id) {
        DataFactory.http('get',$window.laroute.route("user.tag.delete",{helpTag: id})).then(function (data) {
        }).then(function () {
            location.reload();
        });
    }

    $scope.adminCtrl.DeleteCategory = function (id) {


        modalPromise = $mdDialog.show({
            templateUrl: $window.laroute.route("admin.category.delete",{helpCategory:id}),
            preserveScope: true,
            scope: $scope,
            hasBackdrop: true,
            clickOutsideToClose: true,
            escapeToClose: true,
            onShowing: function (e) {

            },
            onComplete: function (e) {

            },
            onRemoving: function (e) {

            },
            onRemoved: function (e) {
            }
        });
    }

    $scope.adminCtrl.Categorydelete = function (slug) {
        DataFactory.http('get',$window.laroute.route("admin.category.destroy",{helpCategory: slug})).then(function (data) {
        }).then(function () {
            location.reload();
        });
    }
    $scope.adminCtrl.uploadUrl = '';
    $scope.adminCtrl.uploadFileUpload = function (filedata, pCallback) {
        var header = {'Content-Type': undefined};
        DataFactory.http('post', 'help/api/file_upload', filedata, header)
            .then(function (data, status, headers, config) {
                if (data.result) {
                    $scope.adminCtrl.uploadUrl = data.result;
                    pCallback();
                } else if (data.message) {
                    console.log(data);

                } else {
                    iziToast.show({
                        title: 'Error',
                        message: data.error,
                        color: 'red',
                        position: 'topRight'
                    });
                }
            });
    }

}]);

helpcat.factory('helpApiCall', ['$http', '$window', '$q', function($http, $window, $q) {
    var data = [];
    var ScopeLists = {};
    var _getControllerName = function() {
        return (this.$$controllerName || null);
    };
    function StringifyJson(pObject) {
        var Json = null;
        try {
            if(pObject && typeof pObject == "string") {
                Json = pObject;
            }
            else if(pObject && typeof pObject == "object") {
                Json = JSON.stringify(pObject);
            }
        }
        catch(e) {
            Json = null;
        }
        return Json;
    }
    var __transformRequestData = function(pData) {
        var RequestContent = pData ? StringifyJson(pData) : pData;
        return RequestContent;
    };
    var transformResponseData = function(responseContent, headers) {
        if(headers('Content-Type') == 'application/json'){
            var responseContent = angular.fromJson(responseContent);
        }
        return responseContent;
    };
    var decryptData = function(pData) {
        pData = Aes.Ctr.decrypt(pData, "wfx", 256);
        var ParsedData = JSON.parse(pData);
        return ParsedData ? ParsedData : pData;
    };
    var return_obj = {
        get: function(url, postData, headers) {
            var deferred = $q.defer();
            $http.get( url,{'headers': headers ? headers : {'Accept': 'application/json'},'params':postData,transformResponse : transformResponseData})
                .then( function(response, status, headers, config) {
                    deferred.resolve(response.data);
                })
                .catch(function(errResp, status, headers, config) {
                    deferred.reject({ status: status, response:errResp });
                });
            return deferred.promise;
        },
        post: function(url, postData, headers,isForm) {
            if(isForm) {
                headers["Content-Type"] = undefined;
                var transFormRequest = angular.identity;
            }else{
                var transFormRequest = __transformRequestData;
            }
            var deferred = $q.defer();
            $http.post( url, postData,{'headers': (headers ? headers : {'Accept': 'application/json', 'contentType': 'application/json; charset=utf-8'}),transformRequest : transFormRequest,transformResponse : transformResponseData})
                .success( function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                .error(function(errResp, status, headers, config) {
                    deferred.reject({ status: status, response:errResp });
                });
            return deferred.promise;
        },
        patch: function(url, postData, headers){
            var deferred = $q.defer();
            $http.patch( url, postData,{'headers': headers ? headers : {'Accept': 'application/json', 'contentType': 'application/json; charset=utf-8'},transformRequest : __transformRequestData,transformResponse : transformResponseData})
                .success( function(response, status, headers, config) {
                    deferred.resolve(response);
                })
                .error(function(errResp, status, headers, config) {
                    deferred.reject({ status: status, response:errResp });
                });
            return deferred.promise;
        },
        delete: function(url, postData, headers) {
            var deferred = $q.defer();
            $http.delete( url, {'params':postData},{'headers': headers ? headers : {'Accept': 'application/json', 'contentType': 'application/json; charset=utf-8'},transformResponse : transformResponseData})
                .success( function(response, status, headers, config) {
                    deferred.resolve(transformResponseData(response, headers));
                })
                .error(function(errResp, status, headers, config) {
                    deferred.reject({ status: status, response:errResp });
                });
            return deferred.promise;
        },
        setData: function (key, value) {
            data[key] = value;
        },
        getData: function(key) {
            return data[key]
        },
        unsetData: function (key) {
            data[key] = null;
            delete data[key];
        },
        setScope: function (key, value) {
            if (value && value.toString() == "[object Object]" && value.$id) {
                value["$$controllerName"] = key;
                value["getControllerName"] = _getControllerName;
                ScopeLists[key] = value;
            }
            else {
                throw new Error("The given value is not a angular object");
            }
        },
        getScope: function (key) {
            return ScopeLists[key];
        },
        unsetScope: function (key) {
            ScopeLists[key] = null;
            delete ScopeLists[key];
        },
        decrypt:  function (pData) {
            return decryptData(pData);
        }
    };
    return_obj.categoryStatuses = function (category_slug) {
        if(data['list_category_status' + category_slug]) return $q.defer().resolve(data['list_category_status' + category_slug]);
        return return_obj.get($window.laroute.route("help.api.list.category.status", {helpCategory: category_slug }));
    };
    return return_obj;
}]);
helpcat.controller('helpCategoryPostListController', ['$scope', '$window', '$mdDialog','DataFactory', function ($scope, $window, $mdDialog,DataFactory) {
    $scope.adminCtrl.helpPostViewService = {};
    $scope.adminCtrl.helpViewPost = function (help_slug) {
        $scope.adminCtrl.helpPostViewService.help_slug = help_slug;
        console.log($window.laroute.route("help.view",{'name': 'post-view'}));
        $mdDialog.show({
            templateUrl : $window.laroute.route("help.view",{'name': 'post-view'}),
            preserveScope : true,
            scope : $scope,
            controller: 'helpPostController',
            hasBackdrop : true,
            clickOutsideToClose : true,
            escapeToClose : true,
            onComplete : function() {
            }
        });
    };
}]);

helpcat.controller('helpPostController', ['$scope', '$http', '$window', 'helpApiCall','$mdDialog', function ($scope, $http, $window, helpApiCall,$mdDialog) {

    $scope.helpPost = {model: {}, edit: {}, fn: {}};
    $scope.helpPost.showPost = function(help_slug){
        helpApiCall.get($window.laroute.route("help.api.post.show", {help: help_slug }) ).then(function (response) {
            $scope.helpPost.help = response;
            $scope.helpPost.category_slug = response.help_category.slug;
            $scope.helpPost.is_user_post = response.help_category.is_user_post;
            $scope.helpPost.help_slug = response.slug;
            helpApiCall.categoryStatuses($scope.helpPost.category_slug).then(function (status_list) {
                $scope.helpPost.cat_statuses = status_list;
            });

        });
    };

    $scope.helpPost.fn.editDescription = function (is_description) {
        if(is_description){
            $scope.helpPost.edit.description = true;
            $scope.helpPost.model.description = $scope.helpPost.help.description;
        }else{
            $scope.helpPost.edit.description = false;
        }
    };

    $scope.helpPost.fn.updateDescription = function(){
        helpApiCall.patch($window.laroute.route("help.api.post.update.description", {help: $scope.helpPost.help_slug}),{description:$scope.helpPost.model.description}).then(function (response) {
            $scope.home.success(response);
            $scope.helpPost.help.description = $scope.helpPost.model.description;
            $scope.helpPost.fn.editDescription(false);
        });
    }

    $scope.helpPost.fn.editTitle = function (is_edit) {
        if(is_edit){
            $scope.helpPost.edit.title = true;
            $scope.helpPost.model.title = $scope.adminCtrl.helpPost.help.title;
        }else{
            $scope.helpPost.edit.title = false;
        }
    };
    $scope.helpPost.fn.updateTitle = function () {
        helpApiCall.patch($window.laroute.route("help.api.post.update.title", {help: $scope.helpPost.help_slug}),{title:$scope.helpPost.model.title}).then(function (response) {
            $scope.home.success(response);
            $scope.helpPost.help.title = $scope.helpPost.model.title;
            $scope.helpPost.fn.editTitle(false);
            $scope.$emit('help_post_title_changed',$scope.helpPost.help);
        });
    };
    $scope.helpPost.fn.editStatus = function (is_edit) {
        if(is_edit){
            $scope.helpPost.edit.status = true;
            $scope.helpPost.model.status = $scope.helpPost.help.help_state;
        }else{
            $scope.helpPost.edit.status = false;
        }
    };
    $scope.helpPost.fn.changeStatus = function () {
        var status=$scope.helpPost.model.status;
        var url = $window.laroute.route("help.post.state-change", {helpState: status.id, help: $scope.helpPost.help_slug});
        helpApiCall.post(url, '').then(function (response) {
            $scope.home.success(response);
            $scope.$emit('help_post_status_changed',$scope.helpPost.help, $scope.helpPost.help.help_state_id, status.id, $scope.helpPost.help.help_category_id);
            $scope.helpPost.help.help_state_id = status.id;
            $scope.helpPost.help.help_state = status;
            status.pivot.user = authUser;
            $scope.helpPost.help.help_history.push(status);
            $scope.helpPost.fn.editStatus(false);
        });
    };
    $scope.helpPost.fn.editCategory = function (is_edit) {
        if(is_edit){
            $scope.helpPost.edit.category = true;
            if($scope.helpPost.categories){
                $scope.helpPost.model.category = $scope.helpPost.help.help_category_id;
            }else {
                helpApiCall.get($window.laroute.route('help.api.list.category', {type: 'admin'})).then(function (response) {
                    $scope.helpPost.categories = response;
                    $scope.helpPost.model.category = $scope.helpPost.help.help_category_id;
                });
            }
        }else{
            $scope.helpPost.edit.category = false;
        }
    };
    $scope.helpPost.fn.changeCategory = function () {
        var url = $window.laroute.route("help.api.post.update.category", {helpCategory: $scope.helpPost.model.category, help: $scope.helpPost.help_slug});
        helpApiCall.post(url, '').then(function (response) {
            $scope.home.success(response);
            location.reload()
        });
    };

    $scope.helpPost.fn.postComment = function (form) {
        helpApiCall.post($window.laroute.route("help.api.post.comment.store", {helpCategory: $scope.helpPost.category_slug, help: $scope.helpPost.help_slug}), {description: $scope.helpPost.model.comment}).then(function (response) {
            $scope.helpPost.help.help_comments.push(response);
            $scope.helpPost.model.comment = '';
            resetForm(form);
        });
    };

    $scope.helpPost.fn.deletePost = function () {
        swal({
            title: 'Are you sure?',
            text: '',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00c0ef',
            cancelButtonColor: '#ff8080',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger'
        }).then(function () {
            helpApiCall.delete($window.laroute.route("help.api.post.destroy", {helpCategory: $scope.helpPost.category_slug, help: $scope.helpPost.help_slug})).then(function (response) {
                $scope.home.error(response);
                $('#post-view-modal').modal('hide');
                var data = {helpSlug:$scope.helpPost.help_slug,helpState:$scope.helpPost.help.help_state.slug};
                $scope.$emit('deletePostState',data);
            });
        }, function (dismiss) {
        });
    };
    $scope.helpPost.fn.editCommentPopup = function (comment) {
        $scope.comment = comment;
        $scope.helpPost.model.updateComment = comment.description;
        $mdDialog.show({
            templateUrl: $window.laroute.route("help.api.post.comment.show",{comment: comment.id}),
            preserveScope: true,
            scope: $scope,
            hasBackdrop: true,
            clickOutsideToClose: true,
            escapeToClose: true,
            onShowing: function (e) {
            },
            onComplete: function (e) {
            },
            onRemoving: function (e) {
            },
            onRemoved: function (e) {
                modelOpen();
            }
        });
    };

    $scope.helpPost.fn.postCommentUpdate = function () {
        helpApiCall.patch($window.laroute.route("help.api.post.comment.update", {comment:$scope.comment.id}),{description: $scope.helpPost.model.updateComment}).then(function(response){
            $('#updateComment').modal('hide');
            $scope.comment.description = $scope.helpPost.model.updateComment;
        });
    };

    $scope.helpPost.fn.deleteComment = function (comment) {
        swal({
            title: 'Are you sure?',
            text: '',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00c0ef',
            cancelButtonColor: '#ff8080',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger'
        }).then(function () {
            helpApiCall.delete($window.laroute.route("help.api.post.comment.destroy", {comment: comment})).then(function (response) {
                $scope.helpPost.help.help_comments = _.reject($scope.helpPost.help.help_comments, ['id',comment]);
            });
        }, function (dismiss) {
        });
    };

    $scope.helpPost.fn.checkMarked = function () {
        if($scope.helpPostMarked){
            $scope.helpPost.model.mark_read=true;
        }else{
            $scope.helpPost.model.mark_read=false;
        }
    };
    $scope.helpPost.fn.markRead = function () {
        var mark = $scope.helpPost.model.mark_read;
        var url = $window.laroute.route("help.api.post.change.marked", {help: $scope.helpPost.help_slug});
        helpApiCall.post(url, {is_marked:mark}).then(function (response) {
            var data = {helpSlug:$scope.helpPost.help_slug,helpState:$scope.helpPost.help.help_state.slug,is_marked:mark};
            $scope.$emit('setMarkedStatus',data);
            $scope.home.success(response);
        });
    };
    $scope.helpPost.fn.zoneClick = function () {
        $scope.helpPost.edit = {};
    };
    if($scope.helpPostViewService){
        $scope.helpPost.showPost($scope.helpPostViewService.help_slug);

    }
}]);
