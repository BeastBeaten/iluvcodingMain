/**
 * Created by lili on 16/6/19.
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

require(['jquery','tools','angular','angular-ui-route','ionic','angular-cookie','./controller/mobile/standard/main-controller-mobile',
        './directive/mobile/standard/main-directive-mobile', './filter/main-filter','./service/addons/mobile/standard/main-service-mobile',
        './routes/mobile/standard/main-route-mobile','./service/addons/market/custom/main-service-58-market','./controller/market/custom/market-58-controller',
        './routes/market/custom/market-58-routes'],
    function() {

        // 聚合js脚本
        var module = angular.module('openwebApp', [
            'ui.router',
            'openwebApp.routes',
            'openwebApp.filters',
            'openwebApp.directives',
            'openwebApp.services',
            'openwebApp.controllers',
            'openwebApp.servicesfor58',
            'openwebApp.route.market58.market58Module',
            'openwebApp.controller.market58.market58Module',
            'ionic',
            'ngCookies'

        ]);

        module.run(['$rootScope', '$state', '$stateParams', '$location','MarketServiceFor58','MemberService',function($rootScope,$state,$stateParams,$location,MarketServiceFor58,MemberService){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.curRouter = '';
            $rootScope.userLoginId = '';
            $rootScope.hasUuid = false;
            $rootScope.userData = {};
            $rootScope.code = '58';
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
            $rootScope.initMarketBills = [
                {
                    categoryName:'流量券',
                    marketDesc:'中国移动流量10元抵用券',
                    baseValue:'10',
                    leftNum:'0',
                    class:"1",
                    desc:'限购买1G产品时使用 有效期 2016-09-30',
                    category:'3A',
                    alreadyGet : false
                },{
                    categoryName:'流量券',
                    marketDesc:'中国移动流量5元抵用券',
                    baseValue:'5',
                    leftNum:'0',
                    class:"2",
                    desc:'限购买500M产品时使用 有效期 2016-09-30',
                    category:'3A',
                    alreadyGet : false
                },{
                    categoryName:'流量券',
                    marketDesc:'中国移动流量4元抵用券',
                    baseValue:'4',
                    leftNum:'0',
                    class:"3",
                    desc:'限购买150M产品时使用 有效期 2016-09-30',
                    category:'3A',
                    alreadyGet : false
                },{
                    categoryName:'油卡券',
                    marketDesc:'中石化加油卡3元抵用券',
                    baseValue:'3',
                    leftNum:'0',
                    class:"4",
                    desc:'限购买中石化500元时使用 有效期 2016-07-31',
                    category:'5',
                    alreadyGet : false
                }];

            $rootScope.$on('userIntercepted',function(errorType){
                $state.go("login",{from:$state.current.name});
            });

            $rootScope.loginStatus= function(){

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
                }
            }

            $rootScope.loginStatus();
            $state.go('marketIndex');

        }]);

        angular.bootstrap(document, ['openwebApp']);

    });