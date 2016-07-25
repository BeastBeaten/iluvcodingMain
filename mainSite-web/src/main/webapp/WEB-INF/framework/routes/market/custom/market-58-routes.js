/**
 * Created by lili on 16/6/20.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.market58.market58Module', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('marketIndex', {
            url: "/marketIndex",
            templateUrl:'/partials/market/custom/58/index.html',
            controller:"IndexCtrl"
        });

        $stateProvider.state('marketbills', {
            url: "/marketbills",
            templateUrl:'/partials/market/custom/58/market-bills.html',
            controller:"MarketBillCtrl"
        });
    }]);
});