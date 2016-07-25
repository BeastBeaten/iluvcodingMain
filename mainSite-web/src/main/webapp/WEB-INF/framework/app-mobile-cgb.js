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

require(['jquery','tools','angular','angular-ui-route','ionic','angular-cookie','./controller/mobile/custom/cgb/cgb-main-controller-mobile', './service/addons/mobile/custom/cgb/cgb-main-service-mobile', './filter/main-filter', './routes/mobile/custom/cgb/cgb-main-route-mobile'],
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

        module.run(['$rootScope', '$state', '$stateParams', '$location','$cookieStore','MarketService','OrderService','PayService','MemberService',function($rootScope,$state,$stateParams,$location,$cookieStore,MarketService,OrderService,PayService,MemberService){
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.config = document.getElementById('config').value;
            $rootScope.menu = document.getElementById('menu').value;
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.code = document.getElementById('code').value ;
            $rootScope.order = document.getElementById('order').value ;
            $rootScope.uuid = document.getElementById('uuid').value;
            $rootScope.userLoginId = $rootScope.uuid;
            $rootScope.userData = {};
            $rootScope.marketInfo = {
                code:$rootScope.code,
                userId:'',
                faceValue:'',
                cash:'',
                title:Tools.prototype.isEmpty($rootScope.userLoginId) ? '请登录':'不使用',
                billId:'',
                category:'',
                marketPayType:'',
                getDefaultFlag:true
            };
            $rootScope.gasCardNosForUser = "";
            $rootScope.rechargeDesc = "";
            if(!Tools.prototype.isEmpty($rootScope.config)){
                var config = JSON.parse($rootScope.config);
                $rootScope.userData.title = config.title;
                $rootScope.userData.stylesheet = config.stylesheet;
                $rootScope.userData.payList = config.payList;
                $rootScope.userData.servicePhone = config.servicePhone;
                $rootScope.userData.copyright = config.copyright;
                $rootScope.marketInfo.category = config.marketCategory;
                $rootScope.marketInfo.marketPayType = config.marketPayType;


                $rootScope.$on('userIntercepted',function(errorType){
                    if(!Tools.prototype.isEmpty($rootScope.lastUrl)){
                        Tools.prototype.saveCookie("lastUrl",$rootScope.lastUrl,{expires:0.01,path:'/'});
                        Tools.prototype.saveCookie("lastForm",JSON.stringify($rootScope.lastForm),{expires:0.01,path:'/'});
                    }
                    window.location.href='http://web.yiqianlian.com/cgb/mobile?siteURL=http://web.yiqianlian.com/cgb/mobile?menu=gasrecharge&actionflag=login';
                });


                $rootScope.login = function(){
                    window.location.href='http://web.yiqianlian.com/cgb/mobile?siteURL=http://web.yiqianlian.com/cgb/mobile?menu=gasrecharge&actionflag=login';
                };

                $rootScope.goRecharge = function(){
                    if(!Tools.prototype.isEmpty($rootScope.code) && !Tools.prototype.isEmpty($rootScope.menu)){
                        window.location.href="/cgb/mobile?menu="+$rootScope.menu+"&uuid="+$rootScope.uuid;
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
                                    if("0" == item.consumerState && '1' == item.state && item.templateCateId.indexOf(category) != -1){
                                        if("OCP" == $rootScope.marketInfo.marketPayType){
                                            if(parseFloat($rootScope.marketInfo.faceValue) <= parseFloat(item.cash)){
                                                marketBills.push(item);
                                            }
                                        }else if(parseFloat($rootScope.marketInfo.faceValue) >= parseFloat(item.faceValue)){
                                            marketBills.push(item);
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

                $rootScope.saveGasCount = function(form){
                    MemberService.getCasheUserInfo({randomId:$rootScope.userLoginId},function(data){
                        var gasCardNos = '';
                        if('success' == data.message && 0 < data.data.length){
                            gasCardNos = data.data[0].gasCardNos;
                        }
                        if(gasCardNos.indexOf(form.gameCount) == -1){
                            var temp = {"gasCardNo":form.gameCount,"gasCardName":form.gasCardName};
                            gasCardNos = ('' == gasCardNos ?  JSON.stringify(temp) : JSON.stringify(temp)+","+gasCardNos);
                            MemberService.updateUserInfo({gasCardNos:gasCardNos,randomId:$rootScope.userLoginId},function(data){
                                return;
                            });
                        }
                    });
                }

                var lastUrl = Tools.prototype.saveCookie("lastUrl");
                var lastForm = Tools.prototype.saveCookie("lastForm");
                if(null != lastUrl && '' != $rootScope.userLoginId){
                    $rootScope.lastForm = JSON.parse(lastForm);
                    $rootScope.lastForm.memberId = $rootScope.userLoginId;
                    OrderService.takeSaleOrder($rootScope.lastForm,function(data){
                        Tools.prototype.saveCookie("lastUrl",null,{path:'/'});
                        Tools.prototype.saveCookie("lastForm",null,{path:'/'});
                        if('success' ==  data.message){
                            $rootScope.saveGasCount($rootScope.lastForm);
                            var payForm = {
                                orderNo:data.data[0].billId,
                                bankCode:$rootScope.userData.payList[0].bankCode,
                                payTypeId:$rootScope.userData.payList[0].payTypeId,
                                payType:$rootScope.userData.payList[0].payType,
                                returnUrl:'http://web.yiqianlian.com/cgb/order?menu=gasrecharge',
                                code:$rootScope.code,
                                memberId:$rootScope.userLoginId,
                                marketBillId:$rootScope.lastForm.marketBillId
                            };
                            PayService.getPayUrlForMobile(payForm,function(data){
                                if('success' == data.message){
                                    location.href = data.data[0];
                                }else{
                                    $state.go($rootScope.menu);
                                }
                            });
                        }else{
                            $state.go($rootScope.menu);
                        }
                    });
                }else if(Tools.prototype.isEmpty($rootScope.order)){
                    $state.go($rootScope.menu,{type:'1'});
                }else{
                    $state.go('order-query');
                }

            }

        }]);

        angular.bootstrap(document, ['openwebApp']);

    });
