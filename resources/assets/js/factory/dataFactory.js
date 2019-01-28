(function () {
    'use strict';
    angular
        .module("wofoxApp")
        .factory('DataFactory', DataFactory)
    DataFactory.$inject = ['$http', '$q', '$window'];

    function DataFactory($http, $q, ngNotify, $window) {
        /**
         * method -> get, post, put, patch, delete
         * url -> http url
         * data -> pass data to http request
         * return mixed data
         * */
        var isJsonString = function(pStr) {
            var __isJson = false;
            try {
                JSON.parse(pStr);
                __isJson = true;
            }
            catch(e) {
                __isJson = false;
            }
            return __isJson;
        };

        function ParseJson(pStr) {
            var Json = null;
            try {
                if(pStr && typeof pStr == "string") {
                    Json = JSON.parse(pStr);
                }
                else if(pStr && typeof pStr == "object") {
                    Json = JSON.parse(JSON.stringify(pStr));
                }
            }
            catch(e) {
                Json = null;
            }
            return Json;
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
        };
        var __transformRequestData = function(pData) {
            var RequestContent = pData ? StringifyJson(pData) : pData;
            if(RequestContent) {
                RequestContent = Aes.Ctr.encrypt(RequestContent, "wfx", 256);
                RequestContent = { "payLoad" : RequestContent };
                RequestContent = StringifyJson(RequestContent);
            }
            return RequestContent;
        };
        var __transformResponseData = function(pData) {
            var ResponseContent = ParseJson(pData);
            if(ResponseContent && ResponseContent.payLoad) {
                ResponseContent = Aes.Ctr.decrypt(ResponseContent.payLoad, "wfx", 256);
                var ParsedData = ParseJson(ResponseContent);
                ResponseContent = ParsedData ? ParsedData : ResponseContent;
            }
            else {
                ResponseContent = pData;
            }
            return ResponseContent;
        };

        return {
            http: function (method, url, data, headers) {
                var request = {
                    method: method,
                    url: url,
                    data: data,
                };
                if (headers) {
                    request.headers = headers;
                }
                var deferred = $q.defer();
                var promise = $http(request)
                    .then(
                        function success(response) {
                            deferred.resolve(response.data);
                        },
                        function error(message, code) {
                            if(!message.data){
                                message.data = {};
                            }
                            if (typeof(message.data) == 'string') {
                                message.data = {data: message.data, status_code: message.status}
                            }
                            if (message.status == 500 || message.status == 404) {
                                // showErrorMessage('Something went wrong!');
                                deferred.reject(message.status);
                            }
                            message.data.status_code = message.status;
                            deferred.resolve(message.data, message.status);
                        }
                    );
                return deferred.promise;
            },
            httpNode : function(method, url, data, headers) {
                var request = {
                    method: method,
                    url: url,
                    data: data,
                    transformRequest: __transformRequestData,
                    transformResponse: __transformResponseData,
                };
                if (headers) {
                    request.headers = headers;
                }
                var deferred = $q.defer();
                $http(request)
                    .then(function success(response) {
                            var reqData = null;
                            if(response && response.canceled) {
                                return;
                            }
                            if(response && response.status && response.data) {
                                reqData = response.data;
                            }
                            if(angular.isString(reqData) == true && isJsonString(reqData)) {
                                reqData = ParseJson(reqData);
                            }
                            deferred.resolve(reqData);
                        },
                        function error(response, status) {
                            var errorMsg = null;
                            if (response && response.status == -1) {
                                errorMsg = 'request take too longer to response';
                            }
                            else if(response.status && response.status == 404) {
                                errorMsg = "Request '" + response.config.url + "' not found";
                            }
                            else if(response.status && response.status == 422) {
                                errorMsg = (response.data && response.data.message) || "";
                            }
                            else if(angular.isString(response.data)) {
                                errorMsg = response.data;
                            }
                            else {
                                errorMsg = "Something has gone wrong.Please refresh and try it...";
                            }
                            deferred.reject(errorMsg);
                        }
                    );
                return deferred.promise;
            },
            downloadFromNode : function(method, url, data, headers) {
                var request = {
                    method: method,
                    url: url,
                    responseType: "blob",
                    data: data,
                    transformRequest: __transformRequestData,
                    transformResponse: __transformResponseData,
                };
                if (headers) {
                    request.headers = headers;
                }
                var deferred = $q.defer();
                $http(request)
                    .then(function success(response) {
                            var reqData = null;
                            if(response && response.canceled) {
                                return;
                            }
                            deferred.resolve(response);
                        },
                        function error(response, status) {
                            var errorMsg = null;
                            if (response && response.status == -1) {
                                errorMsg = 'request take too longer to response';
                            }
                            else if(response.status && response.status == 404) {
                                errorMsg = "Request '" + response.config.url + "' not found";
                            }
                            else if(response.status && response.status == 422) {
                                errorMsg = (response.data && response.data.message) || "";
                            }
                            else if(angular.isString(response.data)) {
                                errorMsg = response.data;
                            }
                            else {
                                errorMsg = "Something has gone wrong.Please refresh and try it...";
                            }
                            deferred.reject(errorMsg);
                        }
                    );
                return deferred.promise;
            }
        }
    }
})();
