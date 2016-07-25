/**
 * Created with IntelliJ IDEA.
 * User: Win7
 * Date: 15-11-4
 * Time: 下午2:30
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(['angular'], function(angular) {

    var orderService = angular.module('openwebApp.service.order.cgb.orderModule', []);

    orderService.factory('CGBOrderService',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
        var getRandomId = function(){
            return Math.random().toString(36).substr(2);
        }
        return {
            queryOrderInfo:function(QueryForm,callback){
                return RequestUtil.request('/cgb/queryOrderInfo?randomId='+getRandomId(), QueryForm, callback, '正在查询');
            },
            getFaceValueForGasRecharge:[   // 获取中石化面值规格
                {
                    productCode:'',
                    faceValue:100,
                    productName:'100元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false

                },{
                    productCode:'',
                    faceValue:200,
                    productName:'200元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false
                },{

                    productCode:'',
                    faceValue:500,
                    productName:'500元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false
                },{

                    productCode:'',
                    faceValue:1000,
                    productName:'1000元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false
                },{

                    productCode:'',
                    faceValue:1,
                    productName:'',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:true
                }
            ]
        }
    }]);
});