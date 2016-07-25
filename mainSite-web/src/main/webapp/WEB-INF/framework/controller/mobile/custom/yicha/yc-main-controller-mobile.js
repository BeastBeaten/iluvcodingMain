/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    './yc-common-controller',
    './yc-phone-controller',
    './yc-flow-controller',
    './yc-gas-controller'
], function(angular) {

    /* Controllers 聚合子页面的controller */
    var app = angular.module('openwebApp.controllers', [
        'openwebApp.controller.common.commonModule',
        'openwebApp.controller.phone.phoneModule',
        'openwebApp.controller.flow.flowModule',
        'openwebApp.controller.gas.gasModule'
    ]);

});