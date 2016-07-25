/**
 * Created with IntelliJ IDEA.
 * User: Win7
 * Date: 15-11-4
 * Time: 下午2:34
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(['angular'], function(angular) {

    var gavinService = angular.module('openwebApp.service.member.memberModule', []);

    gavinService.factory('MemberService',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
        var getRandomId = function(){
            return Math.random().toString(36).substr(2);
        }
        return {
            login:function(loginForm,callback){
                $http.get('/member/login',{params:loginForm}).success(callback);
            },
            updateUserInfo:function(marketUserForm, callback){
                $http.get('/member/updateuser',{params:marketUserForm}).success(callback);
            },
            getCasheUserInfo:function(marketUserForm, callback){
                $http.get('/member/getcacheuserinfo',{params:marketUserForm}).success(callback);
            }
        }
    }]);
});