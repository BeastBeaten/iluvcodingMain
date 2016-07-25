/**
 * Created by zhouqing on 14-10-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.marketOf.marketOfModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('index-of', {
            url: "/index",
            templateUrl:'/partials/market/standard/index.html',
            controller:"IndexCtrl"
        });

        $stateProvider.state('rule', {
            url: "/rule",
            templateUrl:'/partials/market/standard/rules.html',
            controller:""
        });

        $stateProvider.state('success', {
            url: "/success",
            templateUrl:'/partials/market/standard/success.html',
            controller:"PrizeCtrl"
        });

        $stateProvider.state('prize', {
            url: "/prize",
            templateUrl:'/partials/market/standard/prizes.html',
            controller:"PrizeCtrl"
        });

    }]);
});