/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    './market-of-controller'
], function(angular) {

    /* Controllers 聚合子页面的controller */
    var app = angular.module('openwebApp.controllers', [
        'openwebApp.controller.market.marketModule'
    ]);

});