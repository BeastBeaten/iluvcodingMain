/**
 * Created by lili on 16/1/11.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.phone.phoneModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('phonerecharge', {
            url: "/phonerecharge?phoneNo",
            templateUrl:'/partials/mobile/custom/suzhou/sz-phone-index.html',
            controller:"PhoneRechargeCtrl"
        });

    }]);
});