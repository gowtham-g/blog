
angular.module('services').service("$mdDialog", ['$q', '$rootScope', '$animate', '$templateRequest', '$compile', '$controller', function($q, $rootScope, $animate, $templateRequest, $compile, $controller) {
    var modalsLists = [];
    this.show = function(__options) {        
        var defaultOptions = {
            templateUrl : "",            
            template : "",
            scope : null,
            preserveScope : false,
            hasBackdrop : true,
            clickOutsideToClose : true,
            escapeToClose : true,
            onComplete : null,
            onRemoving : null
        };
        var _deferred = $q.defer();
        var options = angular.extend(defaultOptions, __options);        
        var $self = new Object(); 
        $self.options = options;  
        $self.show = createAndTransitionIn;
        $self.hide = transitionOutAndRemove;
        $self.deferred = _deferred;
        $self.promise = _deferred.promise;
        $self._events = {};
        if(angular.isFunction($self.options.onShowing)) {
            $self._events["onShowing"] = $self.options.onShowing;
            $self.options.onShowing = null;
            delete $self.options.onShowing;
        }
        if(angular.isFunction($self.options.onComplete)) {
            $self._events["onComplete"] = $self.options.onComplete;
            $self.options.onComplete = null;
            delete $self.options.onComplete;
        }
        if(angular.isFunction($self.options.onRemoving)) {
            $self._events["onRemoving"] = $self.options.onRemoving;
            $self.options.onRemoving = null;
            delete $self.options.onRemoving;
        }
        if(angular.isFunction($self.options.onRemoved)) {
            $self._events["onRemoved"] = $self.options.onRemoved;
            $self.options.onRemoved = null;
            delete $self.options.onRemoved;
        }
        showElement($self, function() {
            modalsLists.push($self);
        });
        return $self;
    };

    this.hide = function(args) {
        var length = modalsLists.length;            
        function getLastPopup() {
            var item = null;
            for(var i = length - 1; i >= 0; i++) {
                if(!modalsLists[i].isRemoving) {
                    item = modalsLists[i];
                    break;
                }
            };
            return item;
        };
        var lastPopup = getLastPopup();
        if(lastPopup) {
            lastPopup.isRemoving = true;
            lastPopup.hide(args);
        }
    };

    this.hideAll = function(args) {
        var length = modalsLists.length;
        for(var i = 0; i < length; i++) {            
            if(modalsLists[i].isRemoving) {                
                continue;
            }            
            var lastPopup = modalsLists[i];
            if(lastPopup) {
                lastPopup.isRemoving = true;
                lastPopup.hide(args);
            }
        };
    };

    var showElement = function($self, pCallback) {        
        if(!$self.options.scope) {
            $self.options.scope = $rootScope.$new(true);            
        }        
        compile($self.options, function() {                   
            $self.show();
            pCallback();
        });             
    };

    var compile = function(options, pCallback) {        
        var controller = options.controller;
        var controllerAs = options.controllerAs;
        var resolves = {};        
        if(options.templateUrl && options.templateUrl != "") {
            resolves.$template = $templateRequest(options.templateUrl);
        }
        else {
            resolves.$template = $q.when(options.template);
        }                        
        $q.all(resolves).then(function(state) {
            var element = angular.element('<div>').html(state.$template.trim()).contents();                        
            options.element = element;
            var linkFn = $compile(options.element);
            if(controller) {
                var invokeCtrl = $controller(controller, { $scope : options.scope }, true);
                var ctrl = invokeCtrl();                
                if(controllerAs) {
                    options.scope[controllerAs] = ctrl;
                }
            }
            linkFn(options.scope);                        
            if(pCallback) {
                pCallback();
            }
        });                
    };

    function createAndTransitionIn() {
      
        angular.element("body").append(this.options.element);
        $(this.options.element).modal('show');
        attachEvents.call(this);
    };

    function transitionOutAndRemove(args, abort) {
        this.closeResult = args;
        this.hasAbort = (abort == true) ? true : false;
        $(this.options.element).modal('hide');                
    };

    var __destroyVar = function() {
        if(this.options.element[0].parentNode) {
            this.options.element[0].parentNode.removeChild(this.options.element[0]);
        }        
        var index = modalsLists.indexOf(this);
        if(index > -1) {
            modalsLists.splice(index, 1);
        }
        detachEvents.call(this);
        if(!this.options.preserveScope && this.options.scope) {
            this.options.scope.$destroy();            
        }
        this.options.scope = null;
        for(var i in this.options) {
            this.options[i] = null;
        };
        for(var i in this._events) {
            this._events[i] = null;
        };
        this._events = null;
        this.options = null; 
        this.show = null;
        this.hide = null;
    };

    var fire = function(eventName, args) {
        if(angular.isFunction(this._events[eventName])) {
            this._events[eventName].apply(this, [args]);
        }
    };

    var onShowing = function(ev) {
        fire.apply(this, ["onShowing", { e : ev, target : ev.target, name : "show.bs.modal" }]);
    };

    var onComplete = function(ev) {
        fire.apply(this, ["onComplete", { e : ev, target : ev.target, name : "shown.bs.modal" }]);
    };

    var onRemoving = function(ev) {             
        try {
            fire.apply(this, ["onRemoving", { e : ev, target : ev.target, name : "hide.bs.modal", data : this.closeResult }]);
        }
        catch(e) {}         
    };

    var onRemoved = function(ev) {                
        var closeResult = this.closeResult;
        this.closeResult = null;
        try {
            fire.apply(this, ["onRemoved", { e : ev, target : ev.target, name : "hidden.bs.modal", data : closeResult }]);        
        }
        catch(e) {}
        if(this.hasAbort) {
            this.deferred.reject(closeResult);
        }       
        else {
            this.deferred.resolve(closeResult);
        }
        __destroyVar.apply(this, arguments);
    };

    var attachEvents = function() {
        var $self = this;
        $($self.options.element).on("show.bs.modal", function() {
            onShowing.apply($self, arguments);
        });
        $($self.options.element).on("shown.bs.modal", function() {
            onComplete.apply($self, arguments);
        });
        $($self.options.element).on("hide.bs.modal", function() {
            onRemoving.apply($self, arguments);
        });
        $($self.options.element).on("hidden.bs.modal", function() {
            onRemoved.apply($self, arguments);
        });        
    };

    var detachEvents = function() {
        $(this.options.element).off("show.bs.modal");
        $(this.options.element).off("shown.bs.modal");
        $(this.options.element).off("hide.bs.modal");
        $(this.options.element).off("hidden.bs.modal");        
    };
}]);
