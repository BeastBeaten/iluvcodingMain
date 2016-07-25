/**
 * Created by zhangjinlong on 15-11-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.flow.flowModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('flowrecharge', {
            url: "/flowrecharge?phoneNo",
            templateUrl:'/partials/mobile/custom/yicha/flow/flow-index.html',
            controller:"FlowRechargeCtrl"
        });

    }]);
});