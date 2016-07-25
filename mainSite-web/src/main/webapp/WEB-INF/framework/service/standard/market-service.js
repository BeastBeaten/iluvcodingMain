/**
 * Created with IntelliJ IDEA.
 * User: Win7
 * Date: 15-11-4
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(['angular'], function(angular) {

    var gavinService = angular.module('openwebApp.service.market.marketModule', []);

    gavinService.factory('MarketService',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
        var getRandomId = function(){
            return Math.random().toString(36).substr(2);
        }
        return {
            getPrizes:[
                {
                    id:'P00006',
                    name:'华为优购码',
                    pic:'http://pic.ofcard.com/cards/standard/img/lottery-gift01.png',
                    index:0,
                    icon:''
                },{
                    id:'P00010',
                    name:'7元抵用券',
                    pic:'http://pic.ofcard.com/cards/standard/img/lottery-gift-liuliang.png',
                    index:1,
                    icon:'lottery-gift02'
                },{
                    id:'P00001',
                    name:'韩束补水面膜',
                    pic:'http://pic.ofcard.com/cards/standard/img/lottery-gift01.png',
                    index:2,
                    icon:''
                },{
                    id:'P00007',
                    name:'1元抵用券',
                    pic:'http://pic.ofcard.com/cards/standard/img/lottery-gift-liuliang.png',
                    index:9,
                    icon:'lottery-gift02'
                },{
                    id:'P00002',
                    name:'京东E卡100元',
                    pic:'http://pic.ofcard.com/cards/standard/img/lottery-gift01.png',
                    index:3,
                    icon:''
                },{
                    id:'P00004',
                    name:'京东E卡200元',
                    pic:'http://pic.ofcard.com/cards/standard/img/lottery-gift01.png',
                    index:8,
                    icon:''
                },{
                    id:'P00009',
                    name:'4元抵用券',
                    pic:'http://pic.ofcard.com/cards/standard/img/lottery-gift-liuliang.png',
                    index:4,
                    icon:'lottery-gift02'
                },{
                    id:'P00005',
                    name:'海鲜大礼包',
                    pic:'http://pic.ofcard.com/cards/standard/img/lottery-gift01.png',
                    index:7,
                    icon:''
                },{
                    id:'P00008',
                    name:'2元抵用券',
                    pic:'http://pic.ofcard.com/cards/standard/img/lottery-gift-liuliang.png',
                    index:6,
                    icon:'lottery-gift02'
                },{
                    id:'P00003',
                    name:'韩束BB霜',
                    pic:'http://pic.ofcard.com/cards/standard/img/lottery-gift01.png',
                    index:5,
                    icon:''
                }


            ],
            getPrize:function(orderForm,callback){
                $http.get('/market/getPrize',{params:orderForm}).success(callback);
            },
            getPrizeOrder:function(orderForm,callback){
                $http.get('/market/getPrizeOrder',{params:orderForm}).success(callback);
            },
            getMarketBills:function(marketForm,callback){
                return RequestUtil.request('/market/queryBill', marketForm, callback, '正在查询');
            },
            getMarketBillByCDKey:function(marketForm,callback){
                return RequestUtil.request('/market/queryBillByCDKey', marketForm, callback, '正在查询');
            },
            bindMarketBill:function(marketForm,callback){
                $http.get('/market/bindBill',{params:marketForm}).success(callback);
            }
        }
    }]);
});