
'use strict';

define(['angular'], function(angular) {

    var abcService = angular.module('openwebApp.service.marketAbc.marketAbcModule', []);

    abcService.factory('MarketService',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
        var getRandomId = function(){
            return Math.random().toString(36).substr(2);
        }
        return {
            getPhoneInfo:function(phoneNo,callback){
                return RequestUtil.request('/product/getPhoneInfo', {phoneNo:phoneNo}, callback, '');
            },
            getPrizes:function(billForm,callback){
                return RequestUtil.request('/market/queryBill', billForm, callback, '正在查询');
            },
            getPrize:function(billForm,callback){
                return RequestUtil.request('/abc/getPrize', billForm, callback, '');
            }
        }
    }]);

});