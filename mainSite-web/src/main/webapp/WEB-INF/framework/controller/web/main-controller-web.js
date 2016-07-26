/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',

    './common/common-controller'

], function(angular) {

    /* Controllers 聚合子页面的controller */
    var app = angular.module('mainSite.web.controllers', [
        'mainSite.web.controller.common.commonModule'
    ]);

});