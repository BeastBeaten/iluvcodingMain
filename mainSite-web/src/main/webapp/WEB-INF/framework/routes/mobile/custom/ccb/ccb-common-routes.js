/**
 * Created by zhouqing on 14-10-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.common.commonModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('recharge-desc', {
            url: "/recharge-desc",
            templateUrl:'/partials/mobile/custom/ccb/common/recharge-desc.html',
            controller:""
        });

        $stateProvider.state('order-query', {
            url: "/order-query?type",
            templateUrl:'/partials/mobile/custom/ccb/common/order-query.html',
            controller:"OrderQueryCtrl"
        });

        $stateProvider.state('login', {
            url: "/login",
            templateUrl:'/partials/mobile/custom/ccb/common/login-index.html',
            controller:"LoginCtrl"
        });

        $stateProvider.state('market', {
            url: "/market?category",
            templateUrl:'/partials/mobile/custom/ccb/common/market-index.html',
            controller:"MarketCtrl"
        });

    }]);
});