/**
 * Created by zhoulijun on 16-4-19.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.vip.vipModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('viprecharge', {
            url: "/viprecharge",
            templateUrl:'/partials/mobile/custom/ccb/vip/vip-index.html',
            controller:"VipIndexCtrl"
        });

        $stateProvider.state('vipcharge', {
            url: "/vipcharge?gamename",
            templateUrl:'/partials/mobile/custom/ccb/vip/vip-recharge.html',
            controller:"VipRechargeCtrl"
        });

        $stateProvider.state('viplist', {
            url: "/viplist",
            templateUrl:'/partials/mobile/custom/ccb/vip/vip-list.html',
            controller:"VipListCtrl"
        });


        $stateProvider.state('vipkamicharge', {
            url: "/vipkamicharge?gamename",
            templateUrl:'/partials/mobile/custom/ccb/vip/vip-kami-recharge.html',
            controller:"KamiRechargeCtrl"
        });



    }]);
});