var blogs =angular.module("controllers").controller("mainController", ["$scope", "$window", "DataFactory", "$location", "$mdDialog", "$sce","$state", function ($scope, $window, DataFactory,$location,$mdDialog, $sce,$state) {
    var main = this;
    main.laroute =$window.laroute;
     main.folderImageData = [];
        main.image_selected_count = 0;
        main.wmSelectAllImages = true;
        main.mainSourceHeight = 100;
        main.mainSourceWidth = 100;
        main.mainType = 'C';
        main.folderImageData = [];
        main.errorImageQueue = [];
        main.mainFolders = [];
        main.uploadImageQueue =[];
        main.total = 0;
        main.transparency = 90;
        main.wmPadding = 0;
        main.showFolder = [];
  function __ThumbObjectGrid(gridItem, is_lazy_load) {
    var retInfo = {
        "height" : 0,
        "style" : {}
    };
    if(!gridItem) {
        return retInfo;
    }
    retInfo.style["min-height"] = (parseInt(gridItem.height) - parseInt(gridItem.text_height)  ) + 'px';
    if(is_lazy_load){
        retInfo.style["line-height"] = (parseInt(gridItem.height) - parseInt(gridItem.text_height)) + 'px';
    }
    return retInfo;
};

function __ThumbGridWidth(image) {
    var retInfo = {
        "width" : 0,
        "style" : {}
    };
    if(!image) {
        return retInfo;
    }
    retInfo.width = (image.width - 30);
    retInfo.style["width"] = retInfo.width + "px";    
    return retInfo;
};
var getCalculatedSize = function(pItem, size, column) {
    angular.forEach(pItem.data, function(data, index) {
        if(index % column == 0) {
            datasHeight = datasHeight + (data.image_process? data.image_process.height : 300);
        }
    });
    var minSize = Number(pItem.minHeight.replace('px', ' '));
    return isNaN(minSize) == false && datasHeight < minSize ? false : true;
};

     function __ThumbGridStyle(gridItem) {
    var retInfo = {
        "height" : 0,
        "style" : {}
    };
    if(!gridItem) {
        return retInfo;
    }
    if (gridItem) {
        retInfo.height = (parseInt(gridItem.translateY) + parseInt(gridItem.height));
        retInfo.style = {
            position: 'absolute',
            left: gridItem.translateX + 'px',
            top: gridItem.translateY + 'px',
            width: gridItem.width + 'px',
            height: gridItem.noExtra ? gridItem.height+'px' : gridItem.height + 2 + 'px'
        };
    } 
    return retInfo;  
};
function __ImageProcess(datas, pImgInfo, resize, text_height, isThumb, isDesign,with_label,isCollaborate) {
    var size;
    if (resize) {
        size = resize;
    }
    else if (isThumb) {
        size = 220;
    } 
    else {
        size = 290;
    }
    var returnLists = [];
    var thumbGrid = pImgInfo.thumbGrid;
    var multiplier = pImgInfo.multiplier;
    angular.forEach(datas, function (data, key) {
        if (isThumb) {
            var colordata = ParseJson(data.colors);
            var height = colordata.c.length * 20 + 20 + 200;
            text_height = colordata.c.length * 20 + 20;
        }
        else {
            var split = [270, 190];
            if (data.thumb_size && data.thumb_size.toUpperCase().indexOf("X")) {
                var splitString = data.thumb_size.toUpperCase().split("X");
                split[0] = splitString[0];
                split[1] = splitString[1];
            }
            else if (isDesign && data.thumbnail_size && data.thumbnail_size.toUpperCase().indexOf("X")) {
                var splitString = data.thumbnail_size.toUpperCase().split("X");
                split[0] = splitString[0];
                split[1] = splitString[1];
            }
            else {
                split[0] = 270;
                split[1] = 190;
            }
            data.X_axis = split[0];
            data.Y_axis = split[1];
            if (data.X_axis > 270) {
                var percentage = (270 / data.X_axis);
                data.X_axis = data.X_axis * percentage;
                data.Y_axis = data.Y_axis * percentage;
            }
            if (resize) {
                var subValue = (isCollaborate) ? 0 : 12
                var adjustHeight = (parseInt(size * multiplier) - subValue) / split[0];
                if (adjustHeight > 1) {
                    adjustHeight = 1;
                }                    
                data.X_axis = parseInt(split[0] * adjustHeight * multiplier);
                data.Y_axis = parseInt(split[1] * adjustHeight);
                var height = parseInt(data.Y_axis) + parseInt(text_height);
            }
            else {
                if(text_height != 0){
                    text_height = 110;
                }
                data.X_axis = parseInt(split[0] * multiplier);
                var height_percentage = (( parseInt(size * multiplier) - 20 ) / split[0] );
                data.Y_axis = parseInt(split[1] * (height_percentage > 1 ? 1 : height_percentage));
                var height = parseInt(data.Y_axis) + parseInt(text_height);
            }
        }
        var intMinValue = Math.min.apply(Math, thumbGrid);
        var indexValue = thumbGrid.indexOf(intMinValue);
        data.image_process = {
            'translateX': indexValue * parseInt(size * multiplier),
            'translateY': thumbGrid[indexValue],
            'width': parseInt(size * multiplier),
            'height': parseInt(height),
            'text_height': text_height
        };
        thumbGrid[indexValue] = parseInt(thumbGrid[indexValue]) + parseInt(height) + parseInt(!with_label?15:22);
        returnLists.push(data);
    });
    __text_height = text_height;
    return returnLists;
};
    function __ImageOnLoad(id, __size, isThumb, isResize, isWfx, isAssets,isPopup) {

    var domEl = angular.element('#' + id);
    if(!domEl){
       return;
    }
    var width = domEl.width() ? domEl.width() : 250;
    var column, multiplier, calculatedValues;
    if(isAssets && !isAssets.isScroll) {
        calculatedValues = getUnevenColumns(__size, isThumb, isResize, width);
        column = calculatedValues.column;
        var isScrollPresent = getCalculatedSize(isAssets, width, column);
        width = isScrollPresent ? width - 8 : width - 3;
        datasHeight = 0;
    }
    var calculatedValues = getUnevenColumns(__size, isThumb, isResize, width, isPopup);
    column = calculatedValues.column;
    multiplier = calculatedValues.multiplier;

    var thumbGrid = [];
    for (var i = 0; i < column; i++) {
        thumbGrid.push(0);
    };

    domEl = null;
    var ImgInfo = {
        thumbGrid : thumbGrid,
        multiplier : multiplier
    };
    return ImgInfo;
};

    var getUnevenColumns = function(__size, isThumb, isResize, width, isPopup) {
    var divisor = 290;
    var column;
    var multiplierWidth;
    var multiplier = 1;
    if(!isResize) {
        window.scrollTo(0,0);
    }
    if (typeof __size == 'undefined' || __size == 0) {
        divisor = 290;
    }
    else {
        divisor = __size;
    }
    if (isThumb) {
        if(!__size || __size == 0){
            __size = 220;
        }
        column = parseInt(width / __size);
        multiplierWidth = 0.03;
    }
    else {
        column = parseInt(width / divisor);
        multiplierWidth = 0.03;

        if (width >= 1145) {
            multiplier = 1
        }
        else if (width >= 767) {
            if (column != 3) {
                multiplier = (((width) / 3) / divisor) - multiplierWidth;
                column = 3;
            }
        }
        else if (width >= 425 && !isPopup) {
            if (column != 2) {
                multiplier = (((width) / 2) / divisor) - multiplierWidth;
                column = 2;
            }
        }
        else if (__size > 0 && !isPopup) {
            if(!isResize) {
                width = parseInt(width - 10);
            }
            multiplier = (((width) / column) / divisor) - multiplierWidth;
        }
        else if(isPopup) {
            column = parseInt(width / __size);
            multiplier = (((width) / column) / divisor) - multiplierWidth;
        }
        else {
            multiplier = (((width) / 1) / divisor) - multiplierWidth;
            column = 1;
        }
    }
    column = (column < 1) ? 1 : column;
    return { column : column, multiplier : multiplier };
}


    main.PostImageLoad = function (image, is_scroll) {

                var imgs = typeof image == 'string' ? JSON.parse(image) : image;
            var __thumbGrids = __ImageOnLoad('popuploader', 0, false, true);
            var imageProcessData;
            if (main.folderImageData) {
                if(!is_scroll){
                    main.folderImageData = [];
                }
                var imgData = imgs.data ? imgs.data : imgs;
                if(imgData.length > 0){
                    angular.forEach(imgData, function (img, key) {
                        main.folderImageData.push(img);
                    })
                }
                imageProcessData = main.folderImageData;
               
            } else {
                imageProcessData = imgs.data;
            }
            main.folderImageData = __ImageProcess(imageProcessData, __thumbGrids, 400, 150, null, true);
            if(imgs.total){
                main.total = imgs.total;
            }
/*        var __thumbGrids = __ImageOnLoad('Imagecard', 270, true);
        main.folderImageData = __ImageProcess($scope.posts, __thumbGrids, 540, 0, null, true);*/
    }

    main.PostImage = function () {
        var url = window.laroute.route('get.post.images');
        DataFactory.http('get', url).then(function (data) {
            $scope.posts = data.posts.data;
            $scope.categories= data.categories;

            $scope.states = {};
            $scope.states.activeItem = 'item1';

            $scope.helpStates= data.helpStates;
            var mainDefaultCount = 0;
            var renderFolderCount = $scope.posts.length;
            main.folderPage = main.folderPage ? main.folderPage : 2;
            main.folderTotal = main.total;
            main.defaultCount = mainDefaultCount;
            main.renderFolderCount = renderFolderCount;
            main.PostImageLoad(data.posts);
        });
    }
    main.SecondNav = function () {
        var url = window.laroute.route('get.secondNav');
    }
    main.AssetWidthStyle = function (image) {
        return __ThumbGridWidth(image).style;
    };
    main.ObjectGrid = function (image) {
        var style = __ThumbObjectGrid(image, true).style;
        style["min-height"] = parseInt(style["min-height"].split('px')[0]) - 20 + "px";
        style["line-height"] = parseInt(style["line-height"].split('px')[0]) - 20 + "px";
        return style;
    };
    main.gridStyle = function(image) {
        var gridInfo = __ThumbGridStyle(image);
        console.log(gridInfo);
        main.gridHeight = (main.gridHeight > gridInfo.height) ? main.gridHeight : gridInfo.height;
        main.gridHeightStyle = {
            "height": main.gridHeight + 'px'
        };
        return gridInfo.style;
    };

    main.postNav = function () {
        $scope.postshow = false;
        var url = window.laroute.route('get.post.images');
        DataFactory.http('get', url).then(function (data) {
            $scope.categories= data.categories;
        });
    }
    main.categoryView = function (slug) {
        $scope.postshow = true;
        var url = window.laroute.route('category.view',{helpCategory:slug});
        DataFactory.http('get',url).then(function (data) {
            console.log(data);
            $scope.posts = data.posts;
            main.PostImageLoad(data.posts);
            $scope.$$phase || $scope.$root && $scope.$root.$$phase || $scope.$digest();

        })
    }
    $scope.inputValue = null;
    $scope.search = function (value) {
        var url = window.laroute.route('search',{help:value});
        DataFactory.http('get',url).then(function (data) {
            $scope.posts = data.posts;
        })
    };
        $('#nav').click(function(){
        $('#nav').removeClass('active');
        $(this).addClass('active');
 })
}]);
blogs.filter('unsafe', ["$sce", function ($sce) {
    return function (val ) {
        return $sce.trustAsHtml(val);
    };
}]);



