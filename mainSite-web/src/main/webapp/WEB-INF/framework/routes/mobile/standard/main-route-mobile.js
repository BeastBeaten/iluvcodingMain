/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    './common/common-routes',
    './category/phone-routes',
    './category/flow-routes',
    './category/gas-routes',
    './category/game-routes',
    './category/gift-routes',
    './category/vip-routes',
    './category/public-routes'
], function(angular) {

    /* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
    var app = angular.module('openwebApp.routes', [

        'openwebApp.route.common.commonModule',
        'openwebApp.route.phone.phoneModule',
        'openwebApp.route.flow.flowModule',
        'openwebApp.route.gas.gasModule',
        'openwebApp.route.game.gameModule',
        'openwebApp.route.giftCard.giftCardModule',
        'openwebApp.route.vip.vipModule',
        'openwebApp.route.public.publicModule'
    ]);


});