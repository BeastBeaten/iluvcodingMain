/**
 * Created with IntelliJ IDEA.
 * User: Win7
 * Date: 15-11-4
 * Time: 下午2:35
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(['angular'], function(angular) {

    var payService = angular.module('openwebApp.service.pay.payModule', []);

    payService.factory('PayService',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
        var getRandomId = function(){
            return Math.random().toString(36).substr(2);
        }
        return {
            getPayUrlForMobile:function(payForm,callback){
                return RequestUtil.request('/pay/checkIsSwitchNewGate?randomId='+getRandomId(), payForm, callback, '正在提交');
            },
            getPayUrl:function(payForm,callback){
                return RequestUtil.request('/web/getPayUrl?randomId='+getRandomId(), payForm, callback, '正在提交');
            }
        }
    }]);
});