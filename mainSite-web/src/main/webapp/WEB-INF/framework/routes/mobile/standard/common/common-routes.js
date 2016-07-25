/**
 * Created by zhouqing on 14-10-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.common.commonModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('recharge-desc', {
            url: "/recharge-desc",
            templateUrl:'/partials/mobile/standard/common/recharge-desc.html',
            controller:"RechargeDescCtrl"
        });

//        $stateProvider.state('order', {
//            url: "/order",
//            templateUrl:'/partials/mobile/standard/order/order-index.html',
//            controller:"OrderIndexCtrl"
//        });

        $stateProvider.state('order-query', {
            url: "/order-query?type",
            templateUrl:'/partials/mobile/standard/order/order-query.html',
            controller:"OrderQueryCtrl"
        });

        $stateProvider.state('login', {
            url: "/login",
            templateUrl:'/partials/mobile/standard/common/login-index.html',
            controller:"LoginCtrl"
        });

        $stateProvider.state('market', {
            url: "/market?category",
            templateUrl:'/partials/mobile/standard/common/market-index.html',
            controller:"MarketCtrl"
        });

    }]);
});