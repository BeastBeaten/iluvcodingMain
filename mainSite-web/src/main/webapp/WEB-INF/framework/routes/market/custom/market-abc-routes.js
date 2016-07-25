/**
 * Created by zhouqing on 14-10-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.marketAbc.marketAbcModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('index', {
            url: "/index?type",
            templateUrl:'/partials/market/custom/index.html',
            controller:"IndexCtrl"
        });

        $stateProvider.state('actindex', {
            url: "/actindex",
            templateUrl:'/partials/market/custom/nh_index.html',
            controller:"actIndex"
        });

        $stateProvider.state('act3recharge', {
            url: "/act3recharge",
            templateUrl:'/partials/market/custom/nh_act03.html',
            controller:"act3Recharge"
        });

        $stateProvider.state('rule', {
            url: "/rule",
            templateUrl:'/partials/market/custom/rules.html',
            controller:""
        });

        $stateProvider.state('success', {
            url: "/success",
            templateUrl:'/partials/market/custom/success.html',
            controller:"SuccessCtrl"
        });

        $stateProvider.state('prizes', {
            url: "/prizes",
            templateUrl:'/partials/market/custom/prizes.html',
            controller:"PrizeCtrl"
        });

        $stateProvider.state('end', {
            url: "/end",
            templateUrl:'/partials/market/custom/end.html',
            controller:""
        });

    }]);
});