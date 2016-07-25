/**
 * Created by zhouqing on 14-10-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.common.commonModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('recharge-desc', {
            url: "/recharge-desc",
            templateUrl:'/partials/mobile/custom/cgb/common/recharge-desc.html',
            controller:"RechargeDescCtrl"
        });

        $stateProvider.state('order-query', {
            url: "/order-query",
            templateUrl:'/partials/mobile/custom/cgb/common/order-query.html',
            controller:"OrderQueryCtrl"
        });

        $stateProvider.state('market', {
            url: "/market?category",
            templateUrl:'/partials/mobile/custom/cgb/common/market-index.html',
            controller:"MarketCtrl"
        });

    }]);
});