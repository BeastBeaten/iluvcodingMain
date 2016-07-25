/**
 * Created with IntelliJ IDEA.
 * User: Win7
 * Date: 15-11-4
 * Time: 下午2:30
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(['angular'], function(angular) {

    var orderService = angular.module('openwebApp.service.yicha.order.orderModule', []);

    orderService.factory('OrderService',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
        var getRandomId = function(){
            return Math.random().toString(36).substr(2);
        }
        return {
            takeSaleOrder:function(SaleOrderForm,callback){
                return RequestUtil.request('/yicha/takeSaleOrder?randomId='+getRandomId(), SaleOrderForm, callback, '正在提交');
            },
            queryOrders:function(QueryForm,callback){
                return RequestUtil.request('/yicha/queryOrders?randomId='+getRandomId(), QueryForm, callback, '正在查询');
            },
            getPayUrlForMobile:function(payForm,callback){
                return RequestUtil.request('/yicha/getKernelPayUrlForMobile?randomId='+getRandomId(), payForm, callback, '正在提交');
            }
        }
    }]);
});