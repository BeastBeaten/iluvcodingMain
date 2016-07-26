/**
 * Created with IntelliJ IDEA.
 * User: Win7
 * Date: 15-11-4
 * Time: 下午2:30
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(['angular'], function(angular) {

    var demoService = angular.module('mainSite.service.order.orderModule', []);

//    orderService.factory('OrderService',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
//        var getRandomId = function(){
//            return Math.random().toString(36).substr(2);
//        }
//        return {
//            takeSaleOrderNew:function(SaleOrderForm,callback){
//                return RequestUtil.request('/order/takeSaleOrderNew?randomId='+getRandomId(), SaleOrderForm, callback, '正在提交');
//            },
//            takeSaleOrder:function(SaleOrderForm,callback){
//                return RequestUtil.request('/order/takeSaleOrder?randomId='+getRandomId(), SaleOrderForm, callback, '正在提交');
//            },
//            takeWebSaleOrder:function(SaleOrderForm,callback){
//                return RequestUtil.request('/web/takeSaleOrder?randomId='+getRandomId(), SaleOrderForm, callback, '');
//            },
//            queryOrderDetail:function(orderForm,callback){
//                return RequestUtil.request('/order/queryOrderDetail?randomId='+getRandomId(),orderForm, callback, '');
//            },
//            queryOrderInfo:function(QueryForm,callback){
//                return RequestUtil.request('/order/queryOrderInfo?randomId='+getRandomId(), QueryForm, callback, '正在查询');
//            },
//            queryOrders:function(QueryForm,callback){
//                return RequestUtil.request('/order/queryOrderInfos?randomId='+getRandomId(), QueryForm, callback, '正在查询');
//            },
//            takeSaleOrderAndPay:function(SaleOrderForm,callback){
//                return RequestUtil.request('/order/takeSaleOrderAndPay?randomId='+getRandomId(), SaleOrderForm, callback, '正在提交');
//            },
//            orderList:function(QueryForm,callback){
//                return RequestUtil.request('/order/orderList?randomId='+getRandomId(), QueryForm, callback, '正在查询');
//            }
//        }
//    }]);
});