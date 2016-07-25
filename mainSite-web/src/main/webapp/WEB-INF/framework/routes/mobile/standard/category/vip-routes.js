/**
 * Created by zhoulijun on 16-4-19.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.vip.vipModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('viprecharge', {
            url: "/viprecharge",
            templateUrl:'/partials/mobile/standard/vip/vip-index.html',
            controller:"VipIndexCtrl"
        });

        //直充充值页面
        $stateProvider.state('vipcharge', {
            url: "/vipcharge?gamename",
            templateUrl:'/partials/mobile/standard/vip/vip-recharge.html',
            controller:"VipRechargeCtrl"
        });

        //搜索页面
        $stateProvider.state('viplist', {
            url: "/viplist",
            templateUrl:'/partials/mobile/standard/vip/vip-list.html',
            controller:"VipListCtrl"
        });

        //特殊分支,爱奇异直充转卡密充值
        $stateProvider.state('vipkamicharge', {
            url: "/vipkamicharge?gamename",
            templateUrl:'/partials/mobile/standard/vip/vip-kami-recharge.html',
            controller:"KamiRechargeCtrl"
        });

    }]);
});