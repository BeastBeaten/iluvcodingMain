/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    './market-of-routes'
], function(angular) {

    /* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
    var app = angular.module('openwebApp.routes', [

        'openwebApp.route.marketOf.marketOfModule'

    ]);


});