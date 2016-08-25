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

        var getMenuTabsById = function(id){

            var menuTabs;

            if(id == 'coding'){
                menuTabs = MenuService.menu_coding;
            }else if(id == 'living'){
                menuTabs = MenuService.menu_living;
            }else if(id == 'gaming'){
                menuTabs = MenuService.menu_gaming;
            }else{
                return [
                    {id:'error',name:'加载菜单失败'}
                ];
            }

            return menuTabs;

        };

        //筛选加载菜单项
        $rootScope.menuTabs = getMenuTabsById(urlPath);

    }]);

    app.controller('PageListCtrl',['$rootScope','$scope','$state','$stateParams','$location','MenuService',function($rootScope,$scope,$state,$stateParams,$location,MenuService){

        //解析URL路径
        var urlPath = $stateParams.filetype;

        //设置当前目录
        $rootScope.curMenuTab = urlPath;

        var getFileByType = function (type) {

            var tempFiles = MenuService.files;
            var subFile;

            for (var i in tempFiles) {

                if (type == tempFiles[i].type) {
                    subFile = tempFiles[i].content;
                    break;
                } else {
                    subFile = [
                        {id: 'error', name: '文章加载异常'}
                    ];
                }

            }

            return subFile;

//////////   angularjs循环没有中断机制 效率没有源生for循环高    ////////////////
//
//        angular.forEach(MenuService.files,function(data){
//            if(data.type == urlPath){
//                tempFiles = data.content;
//            }else{
//                tempFiles = [{id:'error',name:'文章加载异常'}];
//            }
//        });
////////////////////////////////////////////////////////////////////

        };

        //加载对应项文章
        $rootScope.files = getFileByType(urlPath);

        $scope.fileDetail = function(id){

            var tempFileDetail = MenuService.fileDetail;
            var fileChosen2;

            for (var i in tempFileDetail) {

                  if(tempFileDetail[i].id == id){

                      fileChosen2 = tempFileDetail[i];

                      break;
                  }

            }

            $rootScope.fileChosen = fileChosen2;

        };

    }]);

});
