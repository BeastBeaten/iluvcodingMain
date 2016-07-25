/**
 * Created by zhangjinlong on 15-8-20.
 */
'use strict';

define(['angular'
], function(angular) {

    var app = angular.module('openwebApp.psbRoutes', [

    ]);

    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider.state('giftcheck', {
            url: "/giftcheck?type",
            templateUrl: "/partials/market/custom/psb/gift-check.html",
            controller: "GiftCheckCtrl"
        });

        $stateProvider.state('noallow', {
            url: "/noallow",
            templateUrl: "/partials/market/custom/psb/no-allow.html",
            controller: ""
        });

        $stateProvider.state('index', {
            url: "/index",
            templateUrl: "/partials/market/custom/psb/index.html",
            controller: ""
        });

        $stateProvider.state('over', {
            url: "/over",
            templateUrl: "/partials/market/custom/psb/over.html",
            controller: ""
        });

        $stateProvider.state('showbill', {
            url: "/showbill?data",
            templateUrl: "/partials/market/custom/psb/show-bill.html",
            controller: "MarketBillCtrl"
        });

        $stateProvider.state('giftindex', {
            url: "/giftindex?data",
            templateUrl: "/partials/market/custom/psb/gift-index.html",
            controller: "GiftCardIndexCtrl"
        });

        $stateProvider.state('giftsuccess', {
            url: "/giftsuccess?card",
            templateUrl: "/partials/market/custom/psb/gift-success.html",
            controller: "GiftSuccessCtrl"
        });

    }]);

});