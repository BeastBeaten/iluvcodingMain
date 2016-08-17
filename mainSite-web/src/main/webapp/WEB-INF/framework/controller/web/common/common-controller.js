/**
 *
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('mainSite.web.controller.common.commonModule',[]);

    app.controller('PreviewCtrl',['$rootScope','$scope','$state','$stateParams','$location','MenuService',function($rootScope,$scope,$state,$stateParams,$location,MenuService){

        var urlPath  = $location.path().split("/")[2];
        console.log(urlPath);

        if(urlPath == 'coding'){

            $rootScope.menuTabs = MenuService.menu_coding;

        }else if(urlPath == 'living'){

            $rootScope.menuTabs = MenuService.menu_living;

        }else if(urlPath == 'gaming'){

            $rootScope.menuTabs = MenuService.menu_gaming;

        }else{
            return '404';
        }

        $rootScope.curTab = urlPath;


    }]);

});
