/**
 * Created by zhouqing on 14-10-15.
 */
/*global define */

'use strict';

define(['angular',
    '../../../common/common-service',
    '../../../standard/gavin-service',
    '../../../standard/member-service',
    '../../../standard/wechat-service',
    '../../../custom/abc/market-abc-service'
], function(angular) {

    /* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
    var app = angular.module('openwebApp.services', [
        'openwebApp.service.comm.commonModule',
        'openwebApp.service.gavin.gavinModule',
        'openwebApp.service.member.memberModule',
        'openwebApp.service.wechat.wechatModule',
        'openwebApp.service.marketAbc.marketAbcModule'
    ]);

});