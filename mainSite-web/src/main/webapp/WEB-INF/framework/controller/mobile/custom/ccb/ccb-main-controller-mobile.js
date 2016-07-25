/**
 * Created by lili on 16/1/11.
 */
'use strict';

define(['angular',
    './ccb-gas-controller',
    './ccb-common-controller',
    './ccb-vip-controller'
], function(angular) {

    /* Controllers 聚合子页面的controller */
    var app = angular.module('openwebApp.controllers', [
        'openwebApp.controller.gas.gasModule',
        'openwebApp.controller.common.commonModule',
        'openwebApp.controller.vip.vipModule'
    ]);

});