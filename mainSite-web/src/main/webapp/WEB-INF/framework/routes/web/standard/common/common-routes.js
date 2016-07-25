/**
 * Created by zhouqing on 14-10-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.web.route.common.commonModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('orderSearch', {
            url: "/order-query?orderForm",
            templateUrl: "/partials/web/standard/common/common-search.html",
            controller: "PhoneOrderSearchCtrl"
        });

    }]);
});