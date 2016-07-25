/**
 * Created by lili on 16/1/11.
 */

'use strict';

define(['angular',
    './ccb-gas-routes',
    './ccb-common-routes',
    './ccb-vip-routes'
], function(angular) {

    /* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
    var app = angular.module('openwebApp.routes', [
        'openwebApp.route.gas.gasModule',
        'openwebApp.route.common.commonModule',
        'openwebApp.route.vip.vipModule'

    ]);


});