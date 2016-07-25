/**
 * Created by lili on 16/1/12.
 */

'use strict';

define(['angular',
    '../../../../custom/psb/psb3-service'
], function(angular) {

    /* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
    var app = angular.module('openwebApp.services', [
        'openwebApp.psb3Service'
    ]);

});