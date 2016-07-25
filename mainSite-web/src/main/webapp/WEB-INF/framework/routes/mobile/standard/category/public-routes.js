/**
 * Created by zhangjinlong on 15-11-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.public.publicModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('publicrecharge', {
            url: "/publicrecharge?publicNo",
            templateUrl:'/partials/mobile/standard/public/public-index.html',
            controller:"PublicRechargeCtrl"
        });

        $stateProvider.state('publicQuery', {
            url: "/publicQuery?gameCount&item&projectTypeId&provNo&cityNo",
            templateUrl:'/partials/mobile/standard/public/public-query.html',
            controller:"PublicQueryCtrl"
        });

        $stateProvider.state('publicCity', {
            url: "/publicCity?belongTo",
            templateUrl:'/partials/mobile/standard/public/public-city.html',
            controller:"PublicCityCtrl"
        });

    }]);
});