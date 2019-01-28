angular.module('wofoxApp').factory('modalFactory', [ function() {
    var data = [];
  return {
    openMenuModal: function(templateLink, windowAnimation, popUpData, modalController) {
        var modalObj = $uibModal.open({
            templateUrl: templateLink,
            backdrop: 'static',
            windowClass: windowAnimation,
            controller: modalController,
            parent: angular.element(document.body),
            resolve: {
              popUpData: function() {
                return popUpData;
              }
            },
            size: 'md',
            keyboard: true
        });
    },
    setData: function (key, value) {
          data[key] = value;
    },
    getData: function(key) {
        return data[key]
    },
    windowWidthCalculation: function(){
          var width = window.innerWidth;
          var windowData = [];
          if(width >= 1920) {
              windowData = { window_size: 6,show_width:16.66};
          } else if(width >= 1441 && width < 1920) {
              windowData = {window_size: 5,show_width: 20};
          } else if(width > 768 && width <= 1440) {
              windowData = {window_size: 4,show_width: 25};
          } else if(width > 468 && width <= 768) {
              windowData = {window_size: 3,show_width: 33.33};
          } else if(width <= 468) {
              windowData = {window_size: 1,show_width:100};
          }
          return windowData;
      },
      getWindowSize: function () {
          var width = window.innerWidth;
          if(width > 991) {
              return true;
          }
          return false;
      }
};
}]);

