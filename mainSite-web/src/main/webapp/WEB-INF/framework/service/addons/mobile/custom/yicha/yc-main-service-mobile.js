/**
 * Created by lili on 16/1/12.
 */

'use strict';

define(['angular',
    '../../../../common/common-service',
    '../../../../standard/product-service',
    '../../../../custom/yicha/yc-order-service'
], function(angular) {

    var app = angular.module('openwebApp.services', [
        'openwebApp.service.comm.commonModule',
        'openwebApp.service.product.productModule',
        'openwebApp.service.yicha.order.orderModule'
    ]);

});