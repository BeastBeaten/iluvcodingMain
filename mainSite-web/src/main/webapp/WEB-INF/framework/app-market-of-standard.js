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

require(['jquery','tools','angular','angular-ui-route','ionic','angular-cookie','./controller/market/standard/main-controller-market', './filter/main-filter', './service/addons/market/standard/main-service-market', './routes/market/standard/main-route-market'],
    function() {

        // 聚合js脚本
        var module = angular.module('openwebApp', [
            'ui.router',
            'openwebApp.routes',
            'openwebApp.filters',
            'openwebApp.services',
            'openwebApp.controllers',
            'ionic',
            'ngCookies'

        ]);

        module.run(['$rootScope', '$state', '$stateParams', '$location','$cookieStore','MenuService',function($rootScope,$state,$stateParams,$location,$cookieStore,MenuService){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.result = document.getElementById("result").value;
            $rootScope.code = document.getElementById("code").value;
            $rootScope.userLoginId = '';
            $rootScope.mobileNo = '';
            $rootScope.hideEND = function(){
                $rootScope.result = '';
            }

        }]);

        angular.bootstrap(document, ['openwebApp']);

    });
