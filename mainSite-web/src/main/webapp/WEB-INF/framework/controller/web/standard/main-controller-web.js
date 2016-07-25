/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    './common/common-controller',
    './category/phone-controller',
    './category/gas-controller',
    './category/game-controller',
    './category/public-controller',
    './category/giftCard-controller'
], function(angular) {

    /* Controllers 聚合子页面的controller */
    var app = angular.module('openwebApp.web.controllers', [
        'openwebApp.web.controller.common.commonModule',
        'openwebApp.web.controller.phone.phoneModule',
        'openwebApp.web.controller.gas.gasModule',
        'openwebApp.web.controller.game.gameModule',
        'openwebApp.web.controller.public.publicModule',
        'openwebApp.web.controller.giftCard.giftCardModule'
    ]);

});