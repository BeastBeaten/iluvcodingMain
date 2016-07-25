/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    './yc-common-routes',
    './yc-phone-routes',
    './yc-flow-routes',
    './yc-gas-routes'
], function(angular) {

    var app = angular.module('openwebApp.routes', [

        'openwebApp.route.common.commonModule',
        'openwebApp.route.phone.phoneModule',
        'openwebApp.route.flow.flowModule',
        'openwebApp.route.gas.gasModule'
    ]);


});