/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    './common/common-routes',
    './category/phone-routes',
    './category/game-routes',
    './category/public-routes',
    './category/gas-routes',
    './category/gift-routes'
], function(angular) {

    /* Controllers 聚合子页面的controller */
    var app = angular.module('openwebApp.web.routes', [
        'openwebApp.web.route.common.commonModule',
        'openwebApp.web.route.phone.phoneModule',
        'openwebApp.web.route.game.gameModule',
        'openwebApp.web.route.gas.gasModule',
        'openwebApp.web.route.public.publicModule',
        'openwebApp.web.route.giftCard.giftCardModule'
    ]);


});