/**
 * Created by zhouqing on 16-1-26.
 */
'use strict';

define(['angular'
], function(angular) {

    var app = angular.module('openwebApp.psb2Routes', [

    ]);

    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider.state('giftcheck', {
            url: "/giftcheck?type",
            templateUrl: "/partials/market/custom/psb2/gift-check.html",
            controller: "GiftCheckCtrl"
        });

        $stateProvider.state('noallow', {
            url: "/noallow",
            templateUrl: "/partials/market/custom/psb2/no-allow.html",
            controller: ""
        });

        $stateProvider.state('index', {
            url: "/index",
            templateUrl: "/partials/market/custom/psb2/index.html",
            controller: ""
        });

        $stateProvider.state('over', {
            url: "/over",
            templateUrl: "/partials/market/custom/psb2/over.html",
            controller: ""
        });

        $stateProvider.state('showbill', {
            url: "/showbill?data",
            templateUrl: "/partials/market/custom/psb2/show-bill.html",
            controller: "MarketBillCtrl"
        });

        $stateProvider.state('giftindex', {
            url: "/giftindex?data",
            templateUrl: "/partials/market/custom/psb2/gift-index.html",
            controller: "GiftCardIndexCtrl"
        });

        $stateProvider.state('giftsuccess', {
            url: "/giftsuccess?card",
            templateUrl: "/partials/market/custom/psb2/gift-success.html",
            controller: "GiftSuccessCtrl"
        });

    }]);

});