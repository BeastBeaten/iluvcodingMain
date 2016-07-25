/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    './common/common-controller',
    './common/common-account-controller',
    './recharge/changecard-controller',
    './recharge/phonerecharge-controller',
    './recharge/gamerecharge-controller',
    './recharge/giftcard-controller',
    './recharge/publicrecharge-controller',
    './recharge/gasrecharge-controller',
    './recharge/phonecard-controller',
    './recharge/gamecard-controller',
    './market/market-controller',
    './recharge/tencentrecharge-controller',
    './recharge/flowrecharge-controller'
], function(angular) {

    /* Controllers 聚合子页面的controller */
    var app = angular.module('openwebApp.controllers', [
        'openwebApp.controller.common.commonModule',
        'openwebApp.controller.recharge.changeCardModule',
        'openwebApp.controller.recharge.phonerechargeModule',
        'openwebApp.controller.recharge.gamerechargeModule',
        'openwebApp.controller.recharge.giftCardModule',
        'openwebApp.controller.recharge.publicchargeModule',
        'openwebApp.controller.recharge.gasrechargeModule',
        'openwebApp.controller.recharge.phoneCardModule',
        'openwebApp.controller.recharge.gameCardModule',
        'openwebApp.controller.market.marketModule',
        'openwebApp.controller.recharge.tencentrechargeModule',
        'openwebApp.controller.account.accountModule',
        'openwebApp.controller.recharge.flowrechargeModule'
    ]);


});