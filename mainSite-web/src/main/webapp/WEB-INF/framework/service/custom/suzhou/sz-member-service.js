/**
 * Created by lili on 16/1/28.
 */
'use strict';

define(['angular'], function(angular) {

    var gavinService = angular.module('openwebApp.service.member.suzhou.memberModule', []);

    gavinService.factory('MemberServiceForSZ',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
        var getRandomId = function(){
            return Math.random().toString(36).substr(2);
        }
        return {
            login:function(loginForm,callback){
                $http.get('/szcustom/login',{params:loginForm}).success(callback);
            }
        }
    }]);
});