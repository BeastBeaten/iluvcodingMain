/**
 * Created by zhouqing on 16-1-26.
 */
'use strict';

define(['angular'
], function(angular) {

    var app = angular.module('openwebApp.psb3Routes', [

    ]);

    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider.state('giftcheck', {
            url: "/giftcheck?type",
            templateUrl: "/partials/market/custom/psb3/gift-check.html",
            controller: "GiftCheckCtrl"
        });

        $stateProvider.state('index', {
            url: "/index",
            templateUrl: "/partials/market/custom/psb3/index.html",
            controller: ""
        });

        $stateProvider.state('over', {
            url: "/over",
            templateUrl: "/partials/market/custom/psb3/over.html",
            controller: ""
        });

        $stateProvider.state('showbill', {
            url: "/showbill?data",
            templateUrl: "/partials/market/custom/psb3/show-bill.html",
            controller: "MarketBillCtrl"
        });

        $stateProvider.state('giftindex', {
            url: "/giftindex?data",
            templateUrl: "/partials/market/custom/psb3/gift-index.html",
            controller: "GiftCardIndexCtrl"
        });

        $stateProvider.state('giftsuccess', {
            url: "/giftsuccess?card",
            templateUrl: "/partials/market/custom/psb3/gift-success.html",
            controller: "GiftSuccessCtrl"
        });

    }]);

});