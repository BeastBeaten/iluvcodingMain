/**
 * Created with IntelliJ IDEA.
 * User: Win7
 * Date: 15-11-4
 * Time: 下午2:34
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(['angular'], function(angular) {

    var gavinService = angular.module('openwebApp.service.gavin.gavinModule', []);

    gavinService.factory('GavinService',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
        var getRandomId = function(){
            return Math.random().toString(36).substr(2);
        }
        return {
            sendVerifyCode:function(idenForm,callback){
                $http.get('/gavin/sendVerifyCode',{params:idenForm}).success(callback);
            },
            checkVerifyCode:function(idenForm,callback){
                $http.get('/gavin/checkVerifyCode',{params:idenForm}).success(callback);
            }
        }
    }]);
});