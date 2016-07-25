/**
 * Created by zhangjinlong on 15-11-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.phone.phoneModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('phonerecharge', {
            url: "/phonerecharge?phoneNo",
            templateUrl:'/partials/mobile/custom/yicha/phone/phone-index.html',
            controller:"PhoneRechargeCtrl"
        });

    }]);
});