/**
 * Created by lili on 14-11-26.
 */


'use strict';

require.config({
    //配置angular的路径
    // baseUrl:'js',
    paths:{
        "jquery":"http://pic.ofcard.com/cards/js/angular/jquery",
        "angular":"http://pic.ofcard.com/cards/js/angular/angularmin",
        "angular-ui-route":"http://pic.ofcard.com/cards/js/angular/angular-ui-router",
        "angular-cookie":"http://pic.ofcard.com/cards/js/angular/angular-cookie",
        "ionic":"http://pic.ofcard.com/cards/js/angular/ionicbundlemin",
        "tools":"http://pic.ofpay.com/cards/js/lib/tools",
        "jQueryRotate":"http://pic.ofcard.com/cards/js/angular/jQueryRotate",
        "jQueryEasing":"http://pic.ofcard.com/cards/js/angular/jqueryeasingmin"
    },
    //这个配置是你在引入依赖的时候的包名
    shim:{
        "jquery":{
            exports:"jquery"
        },
        "angular":{
            deps: ['jquery'],
            exports:"angular"
        },
        "angular-ui-route":{
            deps: ['jquery', 'angular'],
            exports:"angular-ui-router"
        },
        "ionic":{
            exports:"ionic"
        },"angular-cookie":{
            deps: ['jquery', 'angular'],
            exports:"angular-cookie"
        },
        "tools":{
            deps: ['jquery'],
            exports:"tools"
        },
        "jQueryRotate":{
            deps: ['jquery'],
            exports:"jQueryRotate"
        },
        "jQueryEasing":{
            deps: ['jquery'],
            exports:"jQueryEasing"
        }
    }
})

require(['jquery','tools','jQueryRotate','jQueryEasing','angular','angular-ui-route','ionic','angular-cookie','./controller/market/custom/market-abc-controller', './filter/main-filter', './service/addons/market/custom/main-service-abc-market', './routes/market/custom/market-abc-routes'],
    function() {

        // 聚合js脚本
        var module = angular.module('openwebApp', [
            'ui.router',
            'openwebApp.route.marketAbc.marketAbcModule',
            'openwebApp.filters',
            'openwebApp.services',
            'openwebApp.controller.marketAbc.marketAbcModule',
            'ionic',
            'ngCookies'

        ]);

        module.run(['$rootScope', '$state', '$stateParams', '$location','WxService',function($rootScope,$state,$stateParams,$location,WxService){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.result = document.getElementById("result").value;
            $rootScope.userLoginId = Tools.prototype.saveCookie('abcrandomId');
            $rootScope.mobileNo = Tools.prototype.saveCookie('abcloginMobileNo');
            $rootScope.billInfo = '';
            if("AE" == $rootScope.result || "ANS" == $rootScope.result){
                $state.go('end');
            }else{
                $state.go('index',{type:'0'});
            }

            $rootScope.isShare = true;

            WxService.getWxConfig($location.$$absUrl.split("#")[0].split("?")[0],function(data){
                if("success" == data.message && 0 < data.data.length){
                    wx.config({
                        debug:false,
                        appId: data.data[0].appId,
                        timestamp: data.data[0].timestamp,
                        nonceStr: data.data[0].nonceStr,
                        signature: data.data[0].signature,
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo'
                        ]
                    });
                    wx.ready(function(){
                        wx.onMenuShareAppMessage({
                            title: '农行新春大礼包',
                            desc: '红包系亲情，春节送心意！农行5折话费等着你！',
                            link: 'http://web.yiqianlian.com/abc/index',
                            imgUrl: 'http://pic.ofpay.com/cards/standard/img/lottery-bg-title-AB.png',
                            success: function (res) {
                                $rootScope.isShare = false;
                            }
                        });
                        wx.onMenuShareTimeline({
                            title: '农行新春大礼包',
                            desc: '红包系亲情，春节送心意！农行5折话费等着你！',
                            link: 'http://web.yiqianlian.com/abc/index',
                            imgUrl: 'http://pic.ofpay.com/cards/standard/img/lottery-bg-title-AB.png',
                            success: function (res) {
                                $rootScope.isShare = false;
                            }
                        });
                        wx.onMenuShareQQ({
                            title: '农行新春大礼包',
                            desc: '红包系亲情，春节送心意！农行5折话费等着你！',
                            link: 'http://web.yiqianlian.com/abc/index',
                            imgUrl: 'http://pic.ofpay.com/cards/standard/img/lottery-bg-title-AB.png',
                            success: function (res) {
                                $rootScope.isShare = false;
                            }
                        });
                        wx.onMenuShareWeibo({
                            title: '农行新春大礼包',
                            desc: '红包系亲情，春节送心意！农行5折话费等着你！',
                            link: 'http://web.yiqianlian.com/abc/index',
                            imgUrl: 'http://pic.ofpay.com/cards/standard/img/lottery-bg-title-AB.png',
                            success: function (res) {
                                $rootScope.isShare = false;
                            }
                        });
                    });
                }
            });

            $rootScope.hideShare = function(){
                $rootScope.isShare = false;
            }

        }]);

        angular.bootstrap(document, ['openwebApp']);

    });
