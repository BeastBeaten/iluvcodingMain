
'use strict';

define(['angular'], function(angular) {

    var serviceFor58 = angular.module('openwebApp.service.market58.market58Module', []);

    serviceFor58.factory('MarketServiceFor58',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){

        return {
            getMarketBatchInfo:function(callback){
                return RequestUtil.request('/58/getMarketBatchInfo', null, callback, '');
            },
            addMarketBillFor58:function(marketBillForm,callback){
                return RequestUtil.request('/58/addMarketBillFor58', marketBillForm, callback, '');
            },
            getMarketBillsByUser:function(randomId,callback){
                return RequestUtil.request('/58/getMarketBillsByUser',{memberId:randomId} , callback, '');
            }
        }
    }]);

});