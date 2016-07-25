/**
 * 易嵌联新版手机端标准版app
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

require(['jquery','tools','angular','angular-ui-route','ionic','angular-cookie','./controller/mobile/standard/main-controller-mobile', './directive/mobile/standard/main-directive-mobile', './filter/main-filter', './service/addons/mobile/standard/main-service-mobile', './routes/mobile/standard/main-route-mobile'],
    function() {

        // 聚合js脚本
        var module = angular.module('openwebApp', [
            'ui.router',
            'openwebApp.routes',
            'openwebApp.filters',
            'openwebApp.directives',
            'openwebApp.services',
            'openwebApp.controllers',
            'ionic',
            'ngCookies'

        ]);

        module.run(['$rootScope', '$state', '$stateParams', '$location','$cookieStore','MarketService',function($rootScope,$state,$stateParams,$location,$cookieStore,MarketService){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.config = document.getElementById('config').value;
            $rootScope.menu = document.getElementById('menu').value;
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.code = document.getElementById('code').value ;
            $rootScope.uuid = document.getElementById('uuid') ? document.getElementById('uuid').value ? document.getElementById('uuid').value : '' : '';
            $rootScope.mallUrl = document.getElementById("mallUrl") ? document.getElementById("mallUrl").value ? document.getElementById("mallUrl").value : '' : '';
            $rootScope.mallUrlOld = document.getElementById("mallUrlOld") ? document.getElementById("mallUrlOld").value ? document.getElementById("mallUrlOld").value : '' : '';
            $rootScope.rechargeAccount = document.getElementById('rechargeAccount').value;
            $rootScope.faceValue = document.getElementById('faceValue').value;
            $rootScope.noRouter = document.getElementById("noRouter") ? document.getElementById("noRouter").value ? document.getElementById("noRouter").value : '' : '';
            $rootScope.ofLinkId = document.getElementById('ofLinkId') ? document.getElementById('ofLinkId').value ? document.getElementById('ofLinkId').value : '' : '';
            $rootScope.userLoginId = '';
            $rootScope.hasUuid = false;
            $rootScope.userData = {};
            $rootScope.marketInfo = {
                code:$rootScope.code,
                userId:'',
                faceValue:'',
                cash:'',
                title:'不使用',
                billId:'',
                category:'',
                marketPayType:'',
                getDefaultFlag:true
            };
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
                $rootScope.userData.copyright = config.copyright;
                $rootScope.marketInfo.category = config.marketCategory;
                $rootScope.marketInfo.marketPayType = config.marketPayType;

                if(!Tools.prototype.isEmpty($rootScope.ofLinkId)){
                    Tools.prototype.saveCookie($rootScope.code+'ofLinkId',null,{path:'/'});
                    Tools.prototype.saveCookie($rootScope.code+'ofLinkId',$rootScope.ofLinkId,{expires:1,path:'/'});
                }else if(!Tools.prototype.isEmpty(Tools.prototype.saveCookie($rootScope.code+'ofLinkId'))){
                    $rootScope.ofLinkId = Tools.prototype.saveCookie($rootScope.code+'ofLinkId');
                }

                $rootScope.loginStatus= function(){
                    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                        var hasUuid = Tools.prototype.saveCookie($rootScope.code+'hasUuid');
                        if(!Tools.prototype.isEmpty(hasUuid)){
                            $rootScope.uuid = Tools.prototype.saveCookie($rootScope.code+'randomId');
                        }
                    }
                    if(!Tools.prototype.isEmpty($rootScope.uuid)){
                        $rootScope.userLoginId = $rootScope.uuid;
                        Tools.prototype.saveCookie($rootScope.code+'randomId',null,{path:'/'});
                        Tools.prototype.saveCookie($rootScope.code+'randomId',$rootScope.uuid,{expires:30,path:'/'});
                        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                            $rootScope.hasUuid = true;
                            Tools.prototype.saveCookie($rootScope.code+'hasUuid',null,{path:'/'});
                            Tools.prototype.saveCookie($rootScope.code+'hasUuid',$rootScope.hasUuid,{expires:30,path:'/'});
                        }
                    }else{
                        $rootScope.userLoginId = Tools.prototype.saveCookie($rootScope.code+'randomId');
                        if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                            $rootScope.userData.loginTitle = '快速登录';
                            $rootScope.userData.loginOut = '';
                            $rootScope.marketInfo.title='请登录';
                        }else{
                            $rootScope.userData.loginTitle = Tools.prototype.saveCookie($rootScope.code+'loginMobileNo');
                            $rootScope.userData.loginOut = '退出';
                            $rootScope.marketInfo.title='不使用';
                        }
                    }
                }

                $rootScope.$on('userIntercepted',function(errorType){
                    $state.go("login",{from:$state.current.name});
                });


                $rootScope.loginStatus();

                $rootScope.login = function(){
                    Tools.prototype.saveCookie($rootScope.code+'loginMobileNo',null,{path:'/'});
                    Tools.prototype.saveCookie($rootScope.code+'randomId',null,{path:'/'});
                    if('退出' == $rootScope.userData.loginOut){
                        $cookieStore.remove($rootScope.code+'loginSeconds');
                        $cookieStore.remove($rootScope.code+'loginSecondTime');
                    }
                    $rootScope.initMarketInfo();
                    $rootScope.loginStatus();
                    $state.go('login');
                };

                $rootScope.goRecharge = function(){
                    if(!Tools.prototype.isEmpty($rootScope.code) && !Tools.prototype.isEmpty($rootScope.menu)){
                        window.location.href="/mobile/mobilecommon/"+$rootScope.code+"?menu="+$rootScope.menu+"&randomId="+Tools.prototype.saveCookie($rootScope.code+'randomId')+"#/"+$rootScope.menu;
                    }
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

                $rootScope.initMarketInfo=function(){
                    $rootScope.marketInfo.userId = '';
                    $rootScope.marketInfo.faceValue='';
                    $rootScope.marketInfo.cash ='';
                    $rootScope.marketInfo.title=Tools.prototype.isEmpty($rootScope.userLoginId) ? '请登录':'不使用';
                    $rootScope.marketInfo.billId = '';
                }

                $rootScope.getDefaultMarketBill = function(obj,category){
                    if(!$rootScope.marketInfo.getDefaultFlag){
                        return;
                    }
                    if(!Tools.prototype.isEmpty($rootScope.userLoginId) && !Tools.prototype.isEmpty($rootScope.marketInfo.faceValue)){
                        var marketBills = [];
                        MarketService.getMarketBills({code:$rootScope.code,userId:$rootScope.userLoginId},function(data){
                            if("success" == data.message){
                                angular.forEach(data.data,function(item,key){
                                    if('psbc' == $rootScope.code){
                                        if("0" == item.consumerState && '1' == item.state && $rootScope.marketInfo.category.indexOf(category) != -1){
                                            if('OCP' == $rootScope.marketInfo.marketPayType){
                                                if(parseFloat($rootScope.marketInfo.faceValue) <= parseFloat(item.cash)){
                                                    marketBills.push(item);
                                                }
                                            }
                                        }
                                    }else{
                                        if("0" == item.consumerState && '1' == item.state && category.indexOf(item.templateCateId) != -1 && $rootScope.marketInfo.category.indexOf(item.templateCateId) != -1){
                                            if("OCP" == $rootScope.marketInfo.marketPayType){
                                                if(parseFloat($rootScope.marketInfo.faceValue) <= parseFloat(item.cash)){
                                                    marketBills.push(item);
                                                }
                                            }else if('OCP&OLP2' == $rootScope.marketInfo.marketPayType){
                                                if(parseFloat($rootScope.marketInfo.faceValue) == parseFloat(item.faceValue)){
                                                    marketBills.push(item);
                                                }
                                            }else if(parseFloat($rootScope.marketInfo.faceValue) >= parseFloat(item.faceValue)){
                                                marketBills.push(item);
                                            }
                                        }
                                    }
                                });
                                if(0 < marketBills.length){
                                    var temp = marketBills[0];
                                    for(var i = 1; i < marketBills.length;i++){
                                        if("OCP" == $rootScope.marketInfo.marketPayType){
                                            if(parseFloat(temp.cash) > parseFloat(marketBills[i].cash)){
                                                temp = marketBills[i];
                                            }
                                        }else{
                                            if(parseFloat(temp.cash) < parseFloat(marketBills[i].cash)){
                                                temp = marketBills[i];
                                            }
                                        }
                                    }
                                    $rootScope.marketInfo.billId = temp.billId;
                                    $rootScope.marketInfo.cash = temp.cash;
                                    $rootScope.marketInfo.title = '-'+temp.cash+'元';
                                    obj.setCash();
                                }else{
                                    $rootScope.marketInfo.billId = '';
                                    $rootScope.marketInfo.cash = '';
                                    $rootScope.marketInfo.title = '不使用';
                                }
                            }
                        });
                    }
                }

                if(!Tools.prototype.isEmpty($rootScope.noRouter)){
                    $state.go($rootScope.menu);
                }

            }

        }]);

        angular.bootstrap(document, ['openwebApp']);

    });
