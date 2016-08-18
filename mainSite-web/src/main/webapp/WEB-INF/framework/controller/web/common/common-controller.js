/**
 *
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('mainSite.web.controller.common.commonModule',[]);

    app.controller('PreviewCtrl',['$rootScope','$scope','$state','$stateParams','$location','MenuService',function($rootScope,$scope,$state,$stateParams,$location,MenuService){

        //解析URL路径
        var urlPath = $stateParams.type;

        //设置当前目录
        $rootScope.curTab = urlPath;

        //筛选加载菜单项
        if(urlPath == 'coding'){
            $rootScope.menuTabs = MenuService.menu_coding;
        }else if(urlPath == 'living'){
            $rootScope.menuTabs = MenuService.menu_living;
        }else if(urlPath == 'gaming'){
            $rootScope.menuTabs = MenuService.menu_gaming;
        }else{
            return '404';
        }




    }]);

});
