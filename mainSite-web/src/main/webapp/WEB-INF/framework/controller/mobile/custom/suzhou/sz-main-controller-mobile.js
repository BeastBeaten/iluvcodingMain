/**
 * Created by lili on 16/1/11.
 */
'use strict';

define(['angular',
    './sz-phone-controller',
    './sz-common-controller'
], function(angular) {

    /* Controllers 聚合子页面的controller */
    var app = angular.module('openwebApp.controllers', [
        'openwebApp.controller.phone.phoneModule',
        'openwebApp.controller.common.commonModule'
    ]);

});