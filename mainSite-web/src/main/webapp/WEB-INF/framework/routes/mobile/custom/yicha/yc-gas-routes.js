/**
 * Created by zhangjinlong on 15-11-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.gas.gasModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('gasrecharge', {
            url: "/gasrecharge",
            templateUrl:'/partials/mobile/custom/yicha/gas/gas-index.html',
            controller:"GasRechargeCtrl"
        });

        $stateProvider.state('agreement', {
            url: "/agreement",
            templateUrl:'/partials/mobile/custom/yicha/gas/agreement.html',
            controller:"GasRechargeCtrl"
        });

    }]);
});