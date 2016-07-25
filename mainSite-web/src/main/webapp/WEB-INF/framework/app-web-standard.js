/**
 * PC端标准版
 */


'use strict';

require.config({
    //配置angular的路径
    // baseUrl:'js',
    paths:{
        "jquery":"http://pic.ofcard.com/cards/js/angular/jquery",
        "dataTables-init":"http://pic.ofcard.com/cards/js/angular/jquery-dataTables-init",
        "dataTables-min":"http://pic.ofcard.com/cards/js/angular/jquery-dataTables-min",
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
        "dataTables-init":{
            deps: ['jquery'],
            exports:"jquery-dataTables-init"
        },
        "dataTables-min":{
            deps: ['jquery'],
            exports:"jquery-dataTables-min"
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
        },
        "angular-cookie":{
            deps: ['jquery', 'angular'],
            exports:"angular-cookie"
        },
        "tools":{
            deps: ['jquery'],
            exports:"tools"
        }
    }
})
require(['jquery','dataTables-init','dataTables-min','tools','angular','angular-ui-route','ionic','angular-cookie','./controller/web/standard/main-controller-web', './directive/web/standard/main-directive-web','./service/addons/web/standard/main-service-web', './routes/web/standard/main-route-web'],
    function() {

        // 聚合js脚本
        var module = angular.module('openwebApp', [
            'ui.router',
            'openwebApp.web.routes',
            'openwebApp.web.directives',
            'openwebApp.web.services',
            'openwebApp.web.controllers',
            'ionic',
            'ngCookies'

        ]);

        module.run(['$rootScope', '$state', '$stateParams', '$location','$cookieStore','MenuService','MessageService',function($rootScope,$state,$stateParams,$location,$cookieStore,MenuService,MessageService){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.code = document.getElementById('code').value;
            $rootScope.uuid = document.getElementById('uuid').value;
            $rootScope.ofLinkId = document.getElementById('ofLinkId').value;
            $rootScope.errorMsg = MessageService.errorMsg;
            $rootScope.menuDesc = MessageService.menuDesc;
            $rootScope.config = document.getElementById('config').value;
            $rootScope.servicePhone = "";
            $rootScope.commonUtils = {
                isEmpty:function(obj){
                    if(undefined == obj || null == obj || '' == obj){
                        return true;
                    }
                    return false;
                },
                putParams:function(data){
                    return encodeURIComponent(JSON.stringify(data));
                },
                getParams:function(data){
                    return JSON.parse(decodeURIComponent(data));
                }
            };
            $rootScope.parentMenu = MenuService.web.parentMenu;
            $rootScope.childMenu = [];
            var userRcMenu = [];
            $rootScope.userData = {
                topImg:'',
                topClass:'',
                title:'',
                footer:'0',
                topClassTemp:''
            };
            $rootScope.currentFrameMenu ={
                pic:''
            };
            if($rootScope.commonUtils.isEmpty($location.$$path)){
                $cookieStore.remove('currentMenuUrl');
            }
            if(!$rootScope.commonUtils.isEmpty($rootScope.code)){
                var config = eval('('+$rootScope.config+')');
                angular.forEach(MenuService.web.rcMenu,function(item,key){
                    var tempMenu = item;
                    angular.forEach(config.webPaths.split(","),function(item1,key){
                        if(item1 == tempMenu.pathname){
                            tempMenu.value.pathname = tempMenu.pathname;
                            userRcMenu.push(tempMenu.value);
                        }
                    });
                });
                $rootScope.userData.topClassTemp = config.topClass;
                $rootScope.userData.topImg = config.topImg ? config.topImg : '';
                $rootScope.userData.topUrl = config.topUrl ? config.topUrl:'';
                $rootScope.userData.title = config.title ? config.title : '';
                $rootScope.userData.personClass = config.personClass;
                $rootScope.userData.footer = config.footer ? config.footer : '0';
                $rootScope.servicePhone = config.servicePhone ? config.servicePhone : '025-69828599';
                $rootScope.userData.topLogo = config.topLogo ? config.topLogo : [];
                $rootScope.userData.topLogoClass = config.topLogoClass ? config.topLogoClass : '';
                $rootScope.userData.footerClass = config.footerClass ? config.footerClass : '';
                $rootScope.userData.payList = config.webPayList ? config.webPayList : '';
                if(null != userRcMenu && 0 < userRcMenu.length){
                    $rootScope.childMenu = userRcMenu;
                    $rootScope.currentFrameMenu = $rootScope.childMenu[0];
                    var currentRoute = $location.$$path.substring(1);
                    var flag = false;
                    if(!$rootScope.commonUtils.isEmpty(currentRoute)){
                        angular.forEach($rootScope.childMenu,function(item,key){
                            if(item.url == currentRoute){
                                flag = true;
                            }
                        })
                    }
                    if(!flag){
                        currentRoute = $cookieStore.get('currentMenuUrl');
                    }
                    if(!$rootScope.commonUtils.isEmpty(currentRoute)){
                        angular.forEach($rootScope.childMenu,function(item,key){
                            if(item.url == currentRoute){
                                $rootScope.currentFrameMenu = item;
                            }
                        })
                    }
                    $rootScope.currentFrameMenu.choosed = true;
                    $state.go($rootScope.currentFrameMenu.url);
                }
                $rootScope.chooseParentMenu = function(curName){
                    if('充值中心' == curName){
                        $rootScope.childMenu = userRcMenu;
                    }
                }
                $rootScope.chooseChildMenu = function(curName){
                    angular.forEach($rootScope.childMenu,function(item,key){
                        if(item.name == curName){
                            $rootScope.currentFrameMenu = item;
                            item.choosed = true;
                            $cookieStore.put('currentMenuUrl',$rootScope.currentFrameMenu.url);
                        }else{
                            item.choosed = false;
                        }
                    });
                }
            }

            $rootScope.saveCookie = function(name, value, options){
                if (typeof value != 'undefined') { // name and value given, set cookie
                    options = options || {};
                    if (value === null) {
                        value = '';
                        options.expires = -1;
                    }
                    var expires = '';
                    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                        var date;
                        if (typeof options.expires == 'number') {
                            date = new Date();
                            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                        } else {
                            date = options.expires;
                        }
                        expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                    }
                    var path = options.path ? '; path=' + options.path : '';
                    var domain = options.domain ? '; domain=' + options.domain : '';
                    var secure = options.secure ? '; secure' : '';
                    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
                } else { // only name given, get cookie
                    var cookieValue = null;
                    if (document.cookie && document.cookie != '') {
                        var cookies = document.cookie.split(';');
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = jQuery.trim(cookies[i]);
                            // Does this cookie string begin with the name we want?
                            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }
            }
        }]);

        angular.bootstrap(document, ['openwebApp']);

    });
