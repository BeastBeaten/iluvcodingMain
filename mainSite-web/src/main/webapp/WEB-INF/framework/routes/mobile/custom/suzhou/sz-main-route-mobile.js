/**
 * Created by lili on 16/1/11.
 */

'use strict';

define(['angular',
    './sz-phone-routes',
    './sz-common-routes'
], function(angular) {

    /* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
    var app = angular.module('openwebApp.routes', [
        'openwebApp.route.phone.phoneModule',
        'openwebApp.route.common.commonModule'

    ]);


});