/**
 * Created by lili on 16/1/13.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.common.commonModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('order-query', {
            url: "/order-query",
            templateUrl:'/partials/mobile/custom/suzhou/sz-orders.html',
            controller:"OrderQueryCtrl"
        });

        $stateProvider.state('servicedesc', {
            url: "/servicedesc",
            templateUrl:'/partials/mobile/custom/suzhou/sz-service-desc.html',
            controller:"OrderQueryCtrl"
        });

    }]);
});