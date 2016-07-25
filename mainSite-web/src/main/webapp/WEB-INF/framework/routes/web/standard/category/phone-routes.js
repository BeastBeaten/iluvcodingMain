/**
 * Created by zhangjinlong on 15-11-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.web.route.phone.phoneModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('phonerecharge', {
            url: "/phonerecharge?phoneNo",
            templateUrl:'/partials/web/standard/phone/phone-index.html',
            controller:"PhoneRechargeCtrl"
        });

        $stateProvider.state('orderpay', {
            url: "/pay/order?orderForm",
            templateUrl: "/partials/web/standard/common/common-pay.html",
            controller: "OrderPayCtrl"
        });

    }]);
});