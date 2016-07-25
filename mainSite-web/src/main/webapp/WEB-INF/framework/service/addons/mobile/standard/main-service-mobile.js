/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    '../../../common/common-service',
    '../../../standard/gavin-service',
    '../../../standard/product-service',
    '../../../standard/order-service',
    '../../../standard/pay-service',
    '../../../standard/market-service',
    '../../../standard/member-service'
], function(angular) {

    /* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
    var app = angular.module('openwebApp.services', [
        'openwebApp.service.comm.commonModule',
        'openwebApp.service.gavin.gavinModule',
        'openwebApp.service.product.productModule',
        'openwebApp.service.order.orderModule',
        'openwebApp.service.pay.payModule',
        'openwebApp.service.market.marketModule',
        'openwebApp.service.member.memberModule'
    ]);

});