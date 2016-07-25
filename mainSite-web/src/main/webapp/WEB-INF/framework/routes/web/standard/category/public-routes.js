/**
 * Created by zhangjinlong on 15-11-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.web.route.public.publicModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('publicrecharge', {
            url: "/publicrecharge?publicNo",
            templateUrl:'/partials/web/standard/public/public-index.html',
            controller:"PublicRechargeCtrl"
        });

        $stateProvider.state('publicQuery', {
            url: "/publicQuery?gameCount&item&projectTypeId&provNo&cityNo",
            templateUrl:'/partials/web/standard/public/public-search.html',
            controller:"PublicQueryCtrl"
        });

    }]);
});