/**
 * Created with IntelliJ IDEA.
 * User: Win7
 * Date: 15-11-4
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(['angular'], function(angular) {

    var payService = angular.module('openwebApp.service.wechat.wechatModule', []);

    payService.factory('WxService',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
        var getRandomId = function(){
            return Math.random().toString(36).substr(2);
        }
        return {
            getWxConfig:function(url,callback){
                return RequestUtil.request('/wechat/getWxConfig', {"url":url}, callback, '');
            }
        }
    }]);
});