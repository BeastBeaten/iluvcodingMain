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
        "tools":"http://pic.ofpay.com/cards/js/lib/tools"
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
        }
    }
})

require(['jquery','tools','angular','angular-ui-route','ionic','angular-cookie','./controller/mobile/custom/yicha/yc-main-controller-mobile', './service/addons/mobile/custom/yicha/yc-main-service-mobile', './routes/mobile/custom/yicha/yc-main-route-mobile'],
    function() {

        // 聚合js脚本
        var module = angular.module('openwebApp', [
            'ui.router',
            'openwebApp.routes',
            'openwebApp.services',
            'openwebApp.controllers',
            'ionic',
            'ngCookies'

        ]);

        module.run(['$rootScope', '$state', '$stateParams',function($rootScope,$state,$stateParams){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.config = document.getElementById('config').value;
            $rootScope.menu = document.getElementById('menu').value;
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.code = document.getElementById('code').value ;
            $rootScope.noRouter = document.getElementById("noRouter") ? document.getElementById("noRouter").value ? document.getElementById("noRouter").value : '' : '';
            $rootScope.userLoginId = '';
            $rootScope.hasUuid = false;
            $rootScope.userData = {};
            $rootScope.gasCardNosForUser = "";
            $rootScope.rechargeDesc = "";
            if(!Tools.prototype.isEmpty($rootScope.config)){
                var config = eval('('+$rootScope.config+')');
                $rootScope.userData.title = config.title;
                $rootScope.userData.stylesheet = config.stylesheet;
                $rootScope.userData.payList = config.payList;
                $rootScope.userData.header = config.header;
                $rootScope.userData.returnUrl = config.returnUrl;

                var ua = window.navigator.userAgent.toLowerCase();
                angular.forEach($rootScope.userData.payList,function(item,key){
                    //微信客户端，自动切微信支付
                    if(ua.match(/MicroMessenger/i) == 'micromessenger' && ('0820' == item.bankCode || '0821' == item.bankCode)){
                        item.bankName = '微信支付';
                        item.bankCode = '0802';
                        item.desc = '微信直接支付';
                        item.payType = 'Tencent';
                    }else if(ua.match(/MicroMessenger/i) != 'micromessenger' && '0802' == item.bankCode){
                        //非微信客户端，自动切支付宝支付
                        item.bankName = '支付宝支付';
                        item.bankCode = '0820';
                        item.desc = '支付宝';
                        item.payType = 'AliPayMobile';
                    }

                    //微信客户端，自动切微信支付
                    if(ua.match(/MicroMessenger/i) == 'micromessenger' && 'ZDY_ALIPAY_WAP' == item.bankCode){
                        item.bankName = '微信支付';
                        item.bankCode = 'ZDY_WX_JSAPI';
                        item.desc = '微信直接支付';
                        item.payType = 'Tencent';
                    }else if(ua.match(/MicroMessenger/i) != 'micromessenger' && 'ZDY_WX_JSAPI' == item.bankCode){
                        //非微信客户端，自动切支付宝支付
                        item.bankName = '支付宝支付';
                        item.bankCode = 'ZDY_ALIPAY_WAP';
                        item.desc = '支付宝';
                        item.payType = 'AliPayMobile';
                    }
                });

                $rootScope.userData.servicePhone = config.servicePhone;


                $rootScope.goRecharge = function(){
                    window.location.href="/yicha/mobilecommon?menu="+$rootScope.menu+"#/"+$rootScope.menu;
                }

                $rootScope.saveCookies = function(key,obj){
                    if('localOrder' == key){
                        var orders = Tools.prototype.saveCookie('localOrder');
                        if(Tools.prototype.isEmpty(orders)){
                            Tools.prototype.saveCookie(key,obj,{expires:30});
                        }else{
                            Tools.prototype.saveCookie(key,null);
                            orders = obj + ';' + orders;
                            if(10 < orders.split(";").length){
                                orders = orders.substring(0,orders.lastIndexOf(";"));
                            }
                            Tools.prototype.saveCookie(key,orders,{expires:30});
                        }
                    }else{
                        var counts = Tools.prototype.saveCookie(key);
                        if(Tools.prototype.isEmpty(counts)){
                            Tools.prototype.saveCookie(key,obj,{expires:30});
                        }else{
                            if(counts.indexOf(obj) == -1){
                                Tools.prototype.saveCookie(key,null);
                                counts = obj + ';' + counts;
                                if(5 < counts.split(';').length){
                                    counts = counts.substring(0,counts.lastIndexOf(';'));
                                }
                            }
                            Tools.prototype.saveCookie(key,counts,{expires:30});
                        }
                    }
                }

                $rootScope.showRechargeDesc = function(){
                    $state.go('recharge-desc');
                }

                if(!Tools.prototype.isEmpty($rootScope.noRouter)){
                    $state.go($rootScope.menu);
                }


            }

        }]);

        angular.bootstrap(document, ['openwebApp']);

    });
