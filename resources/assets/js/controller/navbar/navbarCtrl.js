angular.module("controllers").controller("navbarController", ["$scope", "$window", "DataFactory", "$location", function ($scope, $window, DataFactory, $location) {
    $scope.navbarCtrl = {};
    $scope.navbarCtrl.filter = true;
    $scope.navbarCtrl.cmtFilter = false;
    $scope.navbarCtrl.notification = false;
    $scope.navbarCtrl.filterView = false;
    var nav_Sidebar = document.getElementById("nav-sidebar-sub");

    if (location.pathname == "/news") {
        angular.element('.news').addClass('nav-active');
        $('.mobileNews').ready(function () {
            angular.element('.mobileNews').addClass('nav-active');
        })
    }
    else if (location.pathname == "/tutorials") {
        angular.element('.tut').addClass('nav-active');
        $('.mobileTutorial').ready(function () {
            angular.element('.mobileTutorial').addClass('nav-active');
        })
    } else if (location.pathname == "/questions") {
        angular.element('.forum').addClass('nav-active');
        $('.mobileForum').ready(function () {
            angular.element('.mobileForum').addClass('nav-active');
        })
    } else if (location.pathname == "/tags") {
        angular.element('.tag').addClass('nav-active');
        $('.mobileTags').ready(function () {
            angular.element('.mobileTags').addClass('nav-active');
        })
    }
    else if (location.pathname == "/dashboard") {
        $('.dashboard').ready(function () {
            angular.element('.dashboard').addClass('nav-active');
        })
    }
    else if (location.pathname == "/account_setting") {
        $('.account-mobile').ready(function () {
            angular.element('.account-mobile').addClass('nav-active');
        })
    }


    var backdrop_removeFun = function () {
        if (angular.element('.deskDropdown').hasClass('d-block') == true) {
            angular.element('.deskDropdown').removeClass('d-block');
            angular.element('.backdropmenu').removeClass('d-block');
        }

    }

    var category_removeFun = function () {
        if (angular.element('.categoryMenu').hasClass('d-block') == true) {
            angular.element('.categoryMenu').removeClass('d-block');
            angular.element('.backdropmenu').removeClass('d-block');
        }
    }

    $scope.navbarCtrl.authorDropdown = function () {
        if ($scope.mainCtrl.profileImgWid <= $scope.mainCtrl.mob_popupWid) {
            $scope.mainCtrl.disableBtn = true;
            $scope.mainCtrl.dialog_popup($window.laroute.route("mobile.nav.pop_up"));
        } else {
            angular.element('.deskDropdown').toggleClass('d-block');
            category_removeFun();
            angular.element('.backdropmenu').toggleClass('d-block');

        }
    }

    $('.modal-backdrop ').click(function () {
        var dropDown = angular.element('.backdropmenu').hasClass('d-block'),
            backdrop = angular.element('.deskDropdown').hasClass('d-block'),
            categoryLev = angular.element('.categoryMenu').hasClass('d-block');
        if (dropDown == true || categoryLev == true && backdrop == true) {
            angular.element('.deskDropdown').removeClass('d-block');
            angular.element('.backdropmenu').removeClass('d-block');
            angular.element('.categoryMenu').removeClass('d-block');
            angular.element('.dropdownCategory').removeClass('nav-active');
        }

    });

    $scope.navbarCtrl.closeCategory = function(){
         angular.element('.categoryMenu').removeClass('d-block');
        angular.element('.backdropmenu').removeClass('d-block');

    }

    $scope.navbarCtrl.mobileview_search = function () {
        if (document.querySelector('.mobileSearch').style.display == "" || document.querySelector('.mobileSearch').style.display == "none") {
            document.querySelector('.mobileSearch').style.display = "block";
        } else {
            document.querySelector('.mobileSearch').style.display = "none";
        }
    }

    $scope.navbarCtrl.mobileview_Categories = function () {
        if($scope.navbarCtrl.category == undefined){
             DataFactory.http('GET', $window.laroute.route("category.pop_up")).then(function (data) {
            $scope.navbarCtrl.category = data;
            });
        }
        $scope.mainCtrl.mobileCategory_active();
        angular.element('.categoryMenu').toggleClass('d-block');
        angular.element('.dropdownCategory').toggleClass('nav-active');
        backdrop_removeFun();
        angular.element('.backdropmenu').toggleClass('d-block');
    }

    $scope.navbarCtrl.mobileview_login = function () {
        $scope.mainCtrl.dialog_popup($window.laroute.route("mobile.nav.pop_up"));
    }

    /* category - type */
    $scope.navbarCtrl.category_popup = function () {
        if($scope.navbarCtrl.category == undefined){
               DataFactory.http('GET', $window.laroute.route("category.pop_up")).then(function (data) {
            $scope.navbarCtrl.category = data;
        });
        }
        angular.element('.categoryMenu').toggleClass('d-block');
        angular.element('.dropdownCategory').toggleClass('nav-active');
        backdrop_removeFun();
        angular.element('.backdropmenu').toggleClass('d-block');

    }

    $scope.navbarCtrl.notificationPopup = function () {
        $scope.mainCtrl.disableBtn = true;
        $scope.mainCtrl.dialog_popup($window.laroute.route('notify.pop_up'));
        backdrop_removeFun();
        category_removeFun();
    }

    $scope.navbarCtrl.adminnotificationPopup = function (type, notifyType) {
        $scope.mainCtrl.dialog_popup($window.laroute.route('notify.pop_up', {type: type, notifyType: notifyType}));
    }

    $scope.navbarCtrl.notificationData = function (category, type, notifyType) {
        var notify_type = notifyType ? notifyType : 'notify';
        $scope.navbarCtrl.category = JSON.parse(category);
        $scope.navbarCtrl.type = type;
        DataFactory.http('POST', $window.laroute.route('auth.user', {type: notify_type})).then(function (data) {
            var returnData = data.unread_notifications;
            if (type.length != 0) {
                $scope.navbarCtrl.cmtFilter = noNotification(returnData, type);
            }
            $scope.navbarCtrl.notifyData = data.unread_notifications;
            $scope.mainCtrl.loginUser.notify_count = data.notify_count;
        });
    }

    var noNotification = function (returnData, type, isFilter) {
        var temp = [];
        for (var i = 0; i < returnData.length; i++) {
            if (isFilter == 'filter') {
                if (type && returnData[i].data.category_id == type) {
                    temp.push(returnData)
                }
            }
            else {
                if (returnData[i].type == type) {
                    temp.push(returnData);
                }
            }
        }
        var cmtFilter = (temp.length > 0 ) ? false : true;
        return cmtFilter;
    }

    $scope.navbarCtrl.categorySelect = function (category) {
        var notifyData = $scope.navbarCtrl.notifyData;
        $scope.navbarCtrl.cmtFilter = noNotification(notifyData, category, 'filter');
        if (category == undefined) {
            $scope.navbarCtrl.filter = true;
            $scope.navbarCtrl.notification = false;
            $scope.navbarCtrl.cmtFilter = false;
        } else {
            $scope.category = category;
            $scope.navbarCtrl.filter = false;
            $scope.navbarCtrl.notification = true;
        }

    }

    /*Notification*/
    $scope.navbarCtrl.notifyView = function (notifyData, notifyId) {
        DataFactory.http('POST', $window.laroute.route('notification.id', {id: notifyId})).then(function (data) {
            if (notifyData.post != undefined) {
                $window.location.href = $window.laroute.route('question.slug', {"slug": notifyData.post});
            } else {
                $window.location.href = $window.laroute.route('profile.user.name', {"user_name": notifyData.user.user_name})
            }
        })
    }

    $scope.navbarCtrl.notifyCancel = function (notifyId, index, notificationType) {
        DataFactory.http('POST', $window.laroute.route('notification.delete.id', {id: notifyId})).then(function (data) {
            if (notificationType.length == 0) {
                $scope.navbarCtrl.notifyData.splice(index, 1);
            }
            else {
                var cancelArr = [];
                angular.forEach($scope.navbarCtrl.notifyData, function (value, key) {
                    if (value.id == notifyId) {
                        $scope.navbarCtrl.notifyData.splice(key, 1);
                        angular.forEach($scope.navbarCtrl.notifyData, function (value, key) {
                            if (value.type == notificationType) {
                                cancelArr.push(value)
                            }
                        });
                    }
                    $scope.navbarCtrl.cmtFilter = (cancelArr.length > 0 ) ? false : true;
                })
            }
        })
    }

    $scope.navbarCtrl.searchPopup = function () {
        $scope.mainCtrl.dialog_popup($window.laroute.route('search.pop_up'));
    }

    /*Date Spiliting */
    $scope.dateFunc = function (data) {
        $scope.str = data.split(" ")[0];
        return $scope.str;
    };

    /* category - subtag */
    $scope.navbarCtrl.mobile_subTag = function (type) {
        if (nav_Sidebar.style.display === 'block') {
            nav_Sidebar.style.display = 'none';
        } else {
            nav_Sidebar.style.display = 'block';
        }
        for (var i = 0; i < $scope.tags.length; i++) {
            $scope.navbarCtrl.typeCat = $scope.tags[i];
            if (type === $scope.navbarCtrl.typeCat.tag_type) {
                $scope.navbarCtrl.type_name = $scope.navbarCtrl.typeCat.tag_type;
                $scope.navbarCtrl.type_slug = $scope.navbarCtrl.typeCat.slug;
                $scope.navbarCtrl.subTag = $scope.tags[i].tags;
            }
        }
    }
}]);
