/**
 * Created by zhangjinlong on 15-11-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.web.route.gas.gasModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('gasrecharge', {
            url: "/gasrecharge",
            templateUrl:'/partials/web/standard/gas/gas-index.html',
            controller:"GasRechargeCtrl"
        });

        $stateProvider.state('agreement', {
            url: "/pay/order?orderForm",
            templateUrl:'/partials/web/standard/gas/common-pay.html',
            controller:"OrderPayCtrl"
        });

        $stateProvider.state('gasOrderSearch', {
            url: "/gas-order-query?orderForm",
            templateUrl: "/partials/web/standard/gas/gas-search.html",
            controller: "GasOrderSearchCtrl"
        });
    }]);
});