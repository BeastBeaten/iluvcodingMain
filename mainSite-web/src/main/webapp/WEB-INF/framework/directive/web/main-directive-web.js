/**
 *
 */
/*global define */

'use strict';

define(['angular',
    './common/common-directive'
], function(angular) {

    /* Directive 聚合子页面的directive */
    var app = angular.module('mainSite.web.directives', [

        'mainSite.web.directive.common.commonModule'

    ]);


});