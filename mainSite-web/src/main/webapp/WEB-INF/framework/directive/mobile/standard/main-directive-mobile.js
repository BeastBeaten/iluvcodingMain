/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    './common/common-directive'
], function(angular) {

    /* Directive 聚合子页面的directive */
    var app = angular.module('openwebApp.directives', [

        'openwebApp.directive.common.commonModule'

    ]);


});