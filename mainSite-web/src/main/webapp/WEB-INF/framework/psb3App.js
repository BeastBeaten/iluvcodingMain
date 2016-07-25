/**
 * Created by zhouqing on 16-1-26.
 */

'use strict';

require.config({
    //配置angular的路径
    //baseUrl:'js',
    paths:{
        "jquery":"http://pic.ofcard.com/cards/js/angular/jquery",
        "angular":"http://pic.ofcard.com/cards/js/angular/angularmin",
        "angular-ui-route":"http://pic.ofcard.com/cards/js/angular/angular-ui-router",
        "angular-cookie":"http://pic.ofcard.com/cards/js/angular/angular-cookie",
        "ionic":"http://pic.ofcard.com/cards/js/angular/ionicbundlemin"
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
        "angular-cookie":{
            deps: ['jquery', 'angular'],
            exports:"angular-cookie"
        },
        "ionic":{
            exports:"ionic"
        }
    }
})

require(['angular','jquery', 'angular-ui-route','angular-cookie','./controller/market/custom/psb/psb3-controller', './service/addons/market/custom/psb/psb3-main-service-mobile', './routes/market/custom/psb/psb3-routes','ionic'],
    function() {

        // 聚合js脚本
        var module = angular.module('openwebApp', [
            'ui.router',
            'ngCookies',
            'openwebApp.psb3Routes',
            'openwebApp.psb3Service',
            'openwebApp.psb3Controllers',
            'ionic'

        ]);

        module.run(['$rootScope', '$state', '$stateParams', '$location','$cookieStore','MessageService',function($rootScope,$state,$stateParams,$location,$cookieStore,MessageService){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.isMobile = true;
            if (/android/i.test(navigator.userAgent)){
                $rootScope.hasHeader = true;
            }else{
                $rootScope.hasHeader = false;
            }
            $rootScope.userId = document.getElementById('user').value;
            $rootScope.result = document.getElementById('result').value;
            $rootScope.errorMsg = MessageService.errorMsg;
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

            if('ANS' == $rootScope.result || 'AE' == $rootScope.result){
                $state.go('index');
            }else if($rootScope.result.indexOf('NOW') != -1){
                $rootScope.startTime = new Date($rootScope.result.split('-')[1]);
                $state.go('giftcheck',{type:"1"});
            }else{
                $state.go('giftcheck',{type:"0"});
            }

        }]);


        angular.bootstrap(document, ['openwebApp']);

    });
