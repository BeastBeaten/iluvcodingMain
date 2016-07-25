/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.directive.common.commonModule',[]);

    app.directive('copyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
                '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click ="login()">{{userData.loginTitle}} <span ng-bind="userData.loginOut"></span> | </a>' +
                '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
                '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
                '<a ng-click="showRechargeDesc()">充值说明</a></p>' +
                '<p class="logo"><a href="http://eqxiu.com/s/6swATl6d" target="_blank"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo.png" style="width: 78px;"></a>' +
                '<br>本服务由易嵌联授权提供</p></div>',
            replace:true
        }
    }]);

    app.directive('copyright2',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
                '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click ="login()">{{userData.loginTitle}} <span ng-bind="userData.loginOut"></span> | </a>' +
                '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
                '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
                '<a ng-click="showRechargeDesc()">充值说明</a></p></div>',
            replace:true
        }
    }]);

    app.directive('ddbcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
                '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
                '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
                '<a ng-click="showRechargeDesc()">充值说明</a></p></div>',
            replace:true
        }
    }]);

    app.directive('itoolscopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
                '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click ="login()">{{userData.loginTitle}} <span ng-bind="userData.loginOut"></span> | </a>' +
                '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
                '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
                '<a ng-click="showRechargeDesc()">充值说明</a></p>' +
                '<p class="logo"><a href="http://eqxiu.com/s/6swATl6d" target="_blank"><img src="http://pic.ofpay.com/cards/standard/img/logo-itools.png" style="width: 130px;"></a>' +
                '<br>本服务由易嵌联授权提供</p></div>',
            replace:true
        }
    }]);

    app.directive('xingyeheader',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="bar bar-header bar-positive">' +
            '<a class="button button-icon icon ion-ios7-arrow-back button-icon-font" href="{{mallUrl}}">返回商城 </a>' +
            '<h1 class="title"></h1>' +
            '</div>',
            replace:true
        }
    }]);

    app.directive('xingyeoldheader',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="bar bar-header bar-positive">' +
            '<a class="button button-icon icon ion-ios7-arrow-back"  href="{{mallUrlOld}}"> </a>' +
            '<h1 class="title">加油卡</h1>' +
            '</div>',
            replace:true
        }
    }]);

    app.directive('spdbcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
                '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click ="login()">{{userData.loginTitle}} <span ng-bind="userData.loginOut"></span> | </a>' +
                '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
                '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
                '<a ng-click="showRechargeDesc()">充值说明</a></p>' +
                '<p class="logo"><a href="http://eqxiu.com/s/6swATl6d" target="_blank"><img src="http://pic.ofpay.com/cards/standard/img/pfbank.png" style="width: 78px;"></a>' +
                '<br>本服务由易嵌联授权提供</p></div>',
            replace:true
        }
    }]);

    app.directive('mdlcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
            '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click ="login()">{{userData.loginTitle}} <span ng-bind="userData.loginOut"></span> | </a>' +
            '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
            '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
            '<a ng-click="showRechargeDesc()">充值说明</a></p></div>',
            replace:true
        }
    }]);

    app.directive('yichacopyright', ['$rootScope', function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
                '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click="login()">{{userData.loginTitle}}<span ng-bind="userData.loginOut"></span> | </a>' +
                '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登陆</span> | </a>' +
                '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a> | ' +
                '<a ng-click="showRechargeDesc()">充值说明</a></p></div>',
            replace:true
        }
    }]);

    app.directive('cjwcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
                '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click ="login()">{{userData.loginTitle}} <span ng-bind="userData.loginOut"></span> | </a>' +
                '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
                '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
                '<a ng-click="showRechargeDesc()">充值说明</a></p>' +
                '<p class="logo"><a href="http://cjwsc.com" target="_blank"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo2.png" style="width: 78px;"></a>' +
                '<br>本服务由易嵌联授权提供</p></div>',
            replace:true
        }
    }]);

    app.directive('njfbcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
                '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click ="login()">{{userData.loginTitle}} <span ng-bind="userData.loginOut"></span> | </a>' +
                '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
                '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
                '<a ng-click="showRechargeDesc()">充值说明</a></p>' +
                '<p class="logo"><a target="_blank"><img src="http://pic.ofcard.com/cards/mobile/img/viva-logo.png" style="  width: 90px;height: 25px;"></a> | ' +
                '<a href="http://eqxiu.com/s/6swATl6d" target="_blank"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo.png" style="width: 78px;">' +
                '<br>维瓦数字&欧飞提供技术支持</p></div>',
            replace:true
        }
    }]);

    app.directive('yxtcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
            '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click ="login()">{{userData.loginTitle}} <span ng-bind="userData.loginOut"></span> | </a>' +
            '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
            '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
            '<a ng-click="showRechargeDesc()">充值说明</a></p>' +
            '<p class="logo"><a href="http://eqxiu.com/s/6swATl6d" target="_blank"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo-yxt.png" style="width: 78px;"></a>' +
            '<br>本服务由易嵌联授权提供</p></div>',
            replace:true
        }
    }]);

    app.directive('copyright116114',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
            '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click ="login()">{{userData.loginTitle}} <span ng-bind="userData.loginOut"></span> | </a>' +
            '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
            '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
            '<a ng-click="showRechargeDesc()">充值说明</a></p>' +
            '<p class="logo"><a href="http://eqxiu.com/s/6swATl6d" target="_blank"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo-116114.png" style="width: 78px;"></a>' +
            '<br>本服务由易嵌联授权提供</p></div>',
            replace:true
        }
    }]);

    app.directive('jftcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
            '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click ="login()">{{userData.loginTitle}} <span ng-bind="userData.loginOut"></span> | </a>' +
            '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
            '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
            '<a ng-click="showRechargeDesc()">充值说明</a></p>' +
            '<p class="logo"><a href="http://eqxiu.com/s/6swATl6d" target="_blank"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo-jft.png" style="width: 78px;"></a>' +
            '<br>本服务由易嵌联授权提供</p></div>',
            replace:true
        }
    }]);

    app.directive('vmallcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright"><p class="link">' +
                '<a ng-if="'+"'"+"'==uuid"+'" class="link-phone" ng-click ="login()">{{userData.loginTitle}} <span ng-bind="userData.loginOut"></span> | </a>' +
                '<a ng-if="'+"'"+"'!=uuid"+'"><span>您已登录</span> | </a>' +
                '<a ui-sref="order-query({type:'+"'"+"remote"+"'"+'})">订单查询</a>｜' +
                '<a ng-click="showRechargeDesc()">充值说明</a></p>' +
                '<p class="logo"><a target="_blank" href="http://m.vmall.com"><img src="http://pic.ofcard.com/cards/mobile/img/hw-logo.png" style="  width: 90px;height: 25px;"></a> | ' +
                '<a href="http://eqxiu.com/s/6swATl6d" target="_blank"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo.png" style="width: 78px;">' +
                '<br>欧飞提供技术支持</p></div>',
            replace:true
        }
    }]);

});

