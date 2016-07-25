/**
 * Created by lili on 16/1/11.
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

require(['jquery','tools','angular','angular-ui-route','ionic','angular-cookie','./controller/mobile/custom/suzhou/sz-main-controller-mobile', './service/addons/mobile/custom/suzhou/sz-main-service-mobile', './routes/mobile/custom/suzhou/sz-main-route-mobile'],
    function() {

        // 聚合js脚本
        var module = angular.module('openwebApp', [
            'ui.router',
            'openwebApp.routes',
            'openwebApp.controllers',
            'openwebApp.services',
            'ionic',
            'ngCookies'

        ]);

        module.run(['$rootScope', '$state', '$stateParams', '$location','$cookieStore','MenuService',function($rootScope,$state,$stateParams,$location,$cookieStore,MenuService){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.config = document.getElementById('config').value;
            $rootScope.menu = document.getElementById('menu').value;
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.code = document.getElementById('code').value ;
            $rootScope.uuid = document.getElementById('uuid').value ? document.getElementById('uuid').value : '';
            $rootScope.userLoginId = document.getElementById('randomId').value;
            $rootScope.userData = {};
            $rootScope.gasCardNosForUser = "";
            $rootScope.rechargeDesc = "";
            $rootScope.phoneNo = document.getElementById('phoneNo').value;
            $rootScope.isPrivilegeUser = document.getElementById('isPrivilegeUser').value;
            $rootScope.hasMarketBill = document.getElementById('hasMarketBill').value;
            $rootScope.promptSaleEnd = document.getElementById('promptSaleEnd').value ? document.getElementById('promptSaleEnd').value : false;
            if(Tools.prototype.isEmpty($rootScope.phoneNo)){
                // 调用第三方控件登陆
                ThirdApp.isLogin();
            }
            if(!Tools.prototype.isEmpty($rootScope.config)){
                var config = eval('('+$rootScope.config+')');
                $rootScope.userData.title = config.title;
                $rootScope.userData.stylesheet = config.stylesheet;
                $rootScope.userData.payList = config.payList;
                $rootScope.userData.servicePhone = config.servicePhone;
                $rootScope.userData.copyright = config.copyright;

                $rootScope.showRechargeDesc = function(){

                }

                /**  if(!Tools.prototype.isEmpty($rootScope.menu)){
                    angular.forEach($rootScope.rcMenu, function (item, key) {
                        if(item.id == $rootScope.menu){
                            $rootScope.rechargeDesc = item.desc;
                        }
                    });
                }**/

                $rootScope.loginStatus= function(){
                    if(!Tools.prototype.isEmpty($rootScope.uuid)){
                        $rootScope.userLoginId = $rootScope.uuid;
                    }else{
                        $rootScope.userLoginId = Tools.prototype.saveCookie($rootScope.code+'randomId');
                        if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                            $rootScope.userData.loginTitle = '快速登录';
                        }else{
                            $rootScope.userData.loginTitle = '退出登录';
                        }
                    }
                }

                $rootScope.$on('userIntercepted',function(errorType){
                    ThirdApp.isLogin();
                });

               // $rootScope.loginStatus();

                $rootScope.login = function(){
                    Tools.prototype.saveCookie($rootScope.code+'randomId',null);
                    if('退出登录' == $rootScope.userData.loginTitle){
                        $cookieStore.remove('loginSeconds');
                    }
                    $rootScope.loginStatus();
                    $state.go('login');
                };

                $rootScope.goRecharge = function(){
                    if(!Tools.prototype.isEmpty($rootScope.code) && !Tools.prototype.isEmpty($rootScope.menu)){
                        window.location.href="/szcustom/mobilecommon/"+$rootScope.code+"?menu="+$rootScope.menu+"#/"+$rootScope.menu;
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

                $state.go($rootScope.menu);

            }

        }]);

        angular.bootstrap(document, ['openwebApp']);

    });
