/**
 * 
 */
/*global define */

'use strict';

define(['angular',

    './common/common-routes'

], function(angular) {

    /* Controllers 聚合子页面的controller */
    var app = angular.module('mainSite.web.routes', [
        'mainSite.web.route.common.commonModule'
    ]);


});