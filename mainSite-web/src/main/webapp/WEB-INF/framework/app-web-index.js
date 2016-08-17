/**
 * app
 */


'use strict';

require.config({
    //配置angular的路径
    // baseUrl:'js',
    paths:{
//        "jquery":"../lib/js/jquery",
//        "angular":"../lib/js/angularmin",
//        "angular-ui-route":"../lib/js/angular-ui-router",
//        "angular-cookie":"../lib/js/angular-cookie",
//        "ionic":"../lib/js/ionicbundlemin",
//        "tools":"../lib/util/tools"

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

require(['jquery','tools','angular','angular-ui-route','ionic','angular-cookie','./controller/web/main-controller-web', './directive/web/main-directive-web', './filter/main-filter', './service/addons/web/main-service-web', './routes/web/main-route-web'],
    function() {

        // 聚合js脚本
        var module = angular.module('mainSite', [
            'ui.router',
            'mainSite.web.routes',
            'mainSite.filters',
            'mainSite.web.directives',
            'mainSite.web.services',
            'mainSite.web.controllers',
            'ionic',
            'ngCookies'

        ]);

        module.run(['$rootScope', '$state', '$stateParams', '$location','$cookieStore','MenuService',function($rootScope,$state,$stateParams,$location,$cookieStore,MenuService){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.menuNavs = MenuService.menu;

        }]);

        angular.bootstrap(document, ['mainSite']);

    });
