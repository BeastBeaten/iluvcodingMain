/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular'], function(angular) {

    /* Filters */
    var app = angular.module('openwebApp.filters', []);
    app.factory('UserInterceptor', ['$q','$rootScope',function ($q,$rootScope) {

        return {
            request:function(config){
                //config.headers["TOKEN"] = $rootScope.user.token;
                var url = config.url;
               /** if(url.indexOf("/order") != -1){
                   // return $q.reject(response);
                   //if(Tools.prototype.isEmpty(config.params.userToken)){
                       $rootScope.$state.go("login");
                       return $q.reject(config);

                   //}
                }**/
                return config;
            },
            responseError: function (response) {
                var data = response.config;
                 //判断错误码，如果是未登录
                if(response.status == "403" || response.status == "403"){
                    // 清空用户本地token存储的信息，如果
                    //$rootScope.user = {token:""};
                    // 全局事件，方便其他view获取该事件，并给以相应的提示或处理
                    $rootScope.lastForm = response.config.params;
                    $rootScope.lastUrl = response.config.url;
                    $rootScope.$emit("userIntercepted","notLogin",response);
                }
                // 如果是登录超时
                /**if(data["errorCode"] == "500998"){
                    $rootScope.$emit("userIntercepted","sessionOut",response);
                }**/
                return $q.reject(response);
            }
        };
    }]);

    app.config(['$httpProvider',function ($httpProvider) {
        $httpProvider.interceptors.push('UserInterceptor');
    }]);

});