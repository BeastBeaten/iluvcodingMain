/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    './common/common-controller',
    './category/phone-controller',
    './category/flow-controller',
    './category/gas-controller',
    './category/game-controller',
    './category/giftCard-controller',
    './category/vip-controller',
    './category/public-controller'
], function(angular) {

    /* Controllers 聚合子页面的controller */
    var app = angular.module('openwebApp.controllers', [
        'openwebApp.controller.common.commonModule',
        'openwebApp.controller.phone.phoneModule',
        'openwebApp.controller.flow.flowModule',
        'openwebApp.controller.gas.gasModule',
        'openwebApp.controller.game.gameModule',
        'openwebApp.controller.giftCard.giftCardModule',
        'openwebApp.controller.vip.vipModule',
        'openwebApp.controller.public.publicModule'
    ]);

});