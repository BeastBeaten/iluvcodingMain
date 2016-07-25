'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.public.publicModule',[]);

    app.controller('PublicRechargeCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','OrderService','PayService','MenuService','MemberService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,OrderService,PayService,MenuService,MemberService){
            var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
            $("#copyright").html(copyright);
            $rootScope.userData.title = '水电煤';
            $rootScope.menu = 'publicrecharge';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.publicrecharge.desc;
            var publicNo = $stateParams.publicNo;
            $scope.data={
                gameCount:'',
                cash:'',
                prov:'',
                city:'',
                provNo:'',
                cityNo:'',
                payUnitName:'',
                mobileType:'',
                hasCookie:false,
                showCookie:false,
                cookieData:'',
                projectTypeId:'c2680',
                selectedPayUnit:null
            };

            $scope.errorData = {
                errorMsg:'',
                agreementMsg:'',
                cardMsg:'',
                orderMsg:'',
                areaMsg:'',
                cityMsg:''
            };
            if (Tools.prototype.isEmpty($rootScope.publicData)) {
                $rootScope.publicData = {
                    code:$rootScope.code,
                    gameCount:'',
                    cash:'',
                    prov:'',
                    useCity:'',
                    provinceName:'',
                    useCityId:'',
                    provinceId:'',
                    payUnitId:'',
                    payUnitName:'',
                    pebarCd:'',
                    supItemTplId:'',
                    payProjectId:'v2620',
                    projectTypeId:$scope.data.projectTypeId,
                    cardid:'',
                    accountName:'',
                    balance:'',
                    payUnitList:'',
                    payMentDay:'',
                    arreasInfoList:'',
                    selectedArreasInfo:''
                };
                var publicLoginCity = $cookieStore.get("PublicLoginCity");
                $cookieStore.remove("PublicLoginCity");
                if (!Tools.prototype.isEmpty($cookieStore.get("PublicRechargeCity"))) {
                    var PublicRechargeCity = $cookieStore.get("PublicRechargeCity");
                    if (!Tools.prototype.isEmpty(PublicRechargeCity)) {
                        $rootScope.publicData.useCity = PublicRechargeCity;
                    }
                }
                ProductService.queryAreaByIp(function (data) {
                    if ('success' == data.message && 0 < data.data.length) {
                        if (Tools.prototype.isEmpty($rootScope.publicData.useCity)) {
                            $rootScope.publicData.useCity = data.data[0];
                        }
                        if (Tools.prototype.isEmpty($rootScope.userLoginId)) {
                            $rootScope.publicData.useCity = data.data[0];
                        }
                        // 只有在登陆的情况下，取ip地址，判断是否更新
                        if (!Tools.prototype.isEmpty(publicLoginCity)) {
                            // 从cookie里取地址，如果和当前地址不同，则进行提示
                            if (data.data[0] != $rootScope.publicData.useCity) {
                                $scope.errorData.cityMsg = data.data[0];
                            }
                        }
                    }
                    if (Tools.prototype.isEmpty($rootScope.publicData.useCity)) {
                        $rootScope.publicData.useCity = '北京';
                    }
                    $scope.data.city = $rootScope.publicData.useCity;
                    ProductService.getPublicArea($rootScope.publicData,function(data){
                        if('success' == data.message && 0 < data.data.length){
                            $rootScope.publicData.provinceName = data.data[0].province;
                            $rootScope.publicData.useCityId = data.data[0].useCityId;
                            $rootScope.publicData.provinceId = data.data[0].provinceId;
                            ProductService.getPayUnitList($rootScope.publicData, function(data) {

                                if('success' == data.message && 0 < data.data.length){
                                    $rootScope.publicData.payUnitId = data.data[0].payUnitId;
                                    $rootScope.publicData.payUnitName = data.data[0].payUnitName;
                                    $rootScope.publicData.payUnitList = data.data;
                                    $scope.data.payUnitName = data.data[0].payUnitName;
                                    $scope.data.selectedPayUnit = data.data[0];
                                    $scope.errorData.areaMsg = '';
                                } else {
                                    $rootScope.publicData.payUnitId = '';
                                    $rootScope.publicData.payUnitName = '';
                                    $rootScope.publicData.payUnitList = null;
                                    $scope.data.payUnitName = '';
                                    $scope.data.selectedPayUnit = null;
                                    if ($scope.data.projectTypeId=='c2670') {
                                        $scope.errorData.areaMsg = '水费';
                                    } else if ($scope.data.projectTypeId=='c2680') {
                                        $scope.errorData.areaMsg = '电费';
                                    } else if ($scope.data.projectTypeId=='c2681') {
                                        $scope.errorData.areaMsg = '煤气费';
                                    }
                                }
                            });
                        }
                    });
                });
            } else {
                var publicLoginCity = $cookieStore.get("PublicLoginCity");
                $cookieStore.remove("PublicLoginCity");
                ProductService.queryAreaByIp(function(data){
                    if ('success' == data.message && 0 < data.data.length) {
                        // 从cookie里取地址，如果和当前地址不同，则进行提示
                        if (data.data[0] != $rootScope.publicData.useCity) {
                            // 只有在登陆的情况下，取ip地址，判断是否更新
                            if (!Tools.prototype.isEmpty(publicLoginCity)) {
                                $scope.errorData.cityMsg = data.data[0];
                            }
                        }
                    }
                    // publicData已经存在
                    ProductService.getPublicArea($rootScope.publicData,function(data){
                        if('success' == data.message && 0 < data.data.length){
                            $rootScope.publicData.provinceName = data.data[0].province;
                            $rootScope.publicData.useCityId = data.data[0].useCityId;
                            $rootScope.publicData.provinceId = data.data[0].provinceId;
                            ProductService.getPayUnitList($rootScope.publicData, function(data) {

                                if('success' == data.message && 0 < data.data.length){
                                    $rootScope.publicData.payUnitId = data.data[0].payUnitId;
                                    $rootScope.publicData.payUnitName = data.data[0].payUnitName;
                                    $rootScope.publicData.payUnitList = data.data;
                                    $scope.data.payUnitName = data.data[0].payUnitName;
                                    $scope.data.selectedPayUnit = data.data[0];
                                    $scope.errorData.areaMsg = '';
                                } else {
                                    $rootScope.publicData.payUnitId = '';
                                    $rootScope.publicData.payUnitName = '';
                                    $rootScope.publicData.payUnitList = null;
                                    $scope.data.payUnitName = '';
                                    $scope.data.selectedPayUnit = null;
                                    if ($scope.data.projectTypeId=='c2670') {
                                        $scope.errorData.areaMsg = '水费';
                                    } else if ($scope.data.projectTypeId=='c2680') {
                                        $scope.errorData.areaMsg = '电费';
                                    } else if ($scope.data.projectTypeId=='c2681') {
                                        $scope.errorData.areaMsg = '煤气费';
                                    }
                                }
                            });
                        }
                    });
                });
            }

            // 更新地区，交费单位信息
            $scope.refreshPublicArea = function() {
                ProductService.getPublicArea($rootScope.publicData,function(data){
                    if('success' == data.message && 0 < data.data.length){
                        $rootScope.publicData.provinceName = data.data[0].province;
                        $rootScope.publicData.useCityId = data.data[0].useCityId;
                        $rootScope.publicData.provinceId = data.data[0].provinceId;
                        ProductService.getPayUnitList($rootScope.publicData, function(data) {

                            if('success' == data.message && 0 < data.data.length){
                                $rootScope.publicData.payUnitId = data.data[0].payUnitId;
                                $rootScope.publicData.payUnitName = data.data[0].payUnitName;
                                $rootScope.publicData.payUnitList = data.data;
                                $scope.data.payUnitName = data.data[0].payUnitName;
                                $scope.data.selectedPayUnit = data.data[0];
                                $scope.errorData.areaMsg = '';
                            } else {
                                // 没有查询到数据，说明不支持该地区
                                $rootScope.publicData.payUnitId = '';
                                $rootScope.publicData.payUnitName = '';
                                $rootScope.publicData.payUnitList = null;
                                $scope.data.payUnitName = '';
                                $scope.data.selectedPayUnit = null;
                                if ($scope.data.projectTypeId=='c2670') {
                                    $scope.errorData.areaMsg = '水费';
                                } else if ($scope.data.projectTypeId=='c2680') {
                                    $scope.errorData.areaMsg = '电费';
                                } else if ($scope.data.projectTypeId=='c2681') {
                                    $scope.errorData.areaMsg = '煤气费';
                                }
                            }
                        });
                    }
                });
            };
            $scope.data.city = $rootScope.publicData.useCity;
            $scope.data.projectTypeId = $rootScope.publicData.projectTypeId;

            $scope.payList = $rootScope.userData.payList;

            $scope.orderForm = {
                orderType:'PHONERECHARGE',
                cardNum:'1',
                cardType:0,
                cardId:'',
                memberId:$rootScope.userLoginId,
                platform:'Mobile',
                code:$rootScope.code
            };

            $scope.choosePublicUnit = function(payUnitId, payUnitName){
                $rootScope.publicData.payUnitId = payUnitId;
                $rootScope.publicData.payUnitName = payUnitName;
            };

            $scope.notChangeCity = function() {
                $scope.errorData.cityMsg = '';
                $cookieStore.remove("PublicRechargeCity");
                $cookieStore.put("PublicRechargeCity",$rootScope.publicData.useCity);
                $scope.refreshPublicArea();
            };

            $scope.doChangeCity = function() {
                $rootScope.publicData.useCity = $scope.errorData.cityMsg;
                $scope.data.city = $scope.errorData.cityMsg;
                $scope.errorData.cityMsg = '';
                $cookieStore.remove("PublicRechargeCity");
                $cookieStore.put("PublicRechargeCity",$rootScope.publicData.useCity);
                $scope.refreshPublicArea();
            };

            var cookieNoes = Tools.prototype.saveCookie("publicNoes");

            if(Tools.prototype.isEmpty(cookieNoes)){
                $scope.data.hasCookie = false;
                $scope.publicNoes = '';
            }else{
                $scope.data.hasCookie = true;
                $scope.publicNoes = cookieNoes.split(";");
                if ($scope.publicNoes.length > 0) {
                    $scope.data.gameCount = cookieNoes.split(";")[0];
                }
            }

            $scope.chooseProjectType = function(type) {
                $scope.data.projectTypeId = type;
                $rootScope.publicData.projectTypeId = type;
                $scope.refreshPublicArea();
                $scope.errorData.areaMsg='';
                $scope.errorData.errorMsg='';
            };

            $scope.chooseCity = function() {
                $state.go("publicCity",{});
            };
            $scope.showCookie = function(){
                $scope.data.showCookie = !$scope.data.showCookie;
            };

            $scope.clearCookie = function(){
                Tools.prototype.saveCookie("publicNoes",null);
                $scope.publicNoes = '';
                $scope.data.hasCookie = false;
                $scope.data.showCookie = false;

            };

            $scope.clearError = function(type){
                if('1' == type){
                    //focus
                    $('#gameCount')[0].placeholder="";
                }else if('2' == type){
                    //blur
                    if(Tools.prototype.isEmpty($scope.data.gameCount)){
                        $('#gameCount')[0].placeholder="请输入户号";
                    }
                    $rootScope.publicData.gameCount = $scope.data.gameCount;
                    $scope.data.showCookie = false;
                }else if('3' == type){
                    //clear phoneno
                    $scope.data.gameCount = '';
                    $scope.data.showCookie = false;
                    $scope.errorData.errorMsg = '';
                    $scope.data.mobileType = '';
                    $scope.data.cityin = '';
                }else if('4' == type){
                    //clear msg
                    $scope.errorData.errorMsg = '';
                }
            };

            $scope.checkPublicNo = function(type){
                $scope.data.gameCount = $scope.data.gameCount.replace(/\D/g,'');
                $scope.clearError('4');
                if($scope.data.gameCount.length > 30){
                    $scope.data.gameCount = $scope.data.gameCount.substr(0,30);
                }
                if(Tools.prototype.isEmpty($scope.data.gameCount)){
                    $scope.data.showCookie = false;
                }else if(!Tools.prototype.isEmpty($scope.data.gameCount) && '1' == type){
                    if ($scope.data.hasCookie) {
                        $scope.data.showCookie = true;
                    }
                }
            };

            $scope.choosePublicNo = function(publicNo){
                $scope.data.gameCount = publicNo;
                $scope.data.showCookie = false;
                $scope.checkPublicNo('2');
            };

            // 查询欠费信息
            $scope.queryPublicBill = function($event){
                $event.target.disabled = true;
                $rootScope.publicData.gameCount = $scope.data.gameCount;
                if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                    $event.target.disabled = false;
                    $state.go('login');
                    return;
                }
                if ($scope.data.gameCount == null || $scope.data.gameCount == '') {
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_publicNo;
                    $event.target.disabled = false;
                    return;
                }
                if ($rootScope.publicData.payUnitName == null || $rootScope.publicData.payUnitName == '') {
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_publicUnit;
                    $event.target.disabled = false;
                    return;
                }
                $rootScope.publicData.pebarCd = $scope.data.gameCount;
                ProductService.queryPublicInfo($rootScope.publicData,function(data){
                    if(!'success' == data.message || 0 == data.data.length) {
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.wrong_publicNo;
                        $event.target.disabled = false;
                    }
                    if (Tools.prototype.isEmpty(data.data[0])) {
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.wrong_publicNo;
                        $event.target.disabled = false;
                    }
                    if('success' == data.message && 0 < data.data.length) {
                        $rootScope.publicData.arreasInfoList = data.data;
                        $rootScope.publicData.selectedArreasInfo = data.data[0]
                        $rootScope.publicData.accountName =data.data[0].accountName;
                        $rootScope.publicData.balance = data.data[0].balance;
                        $rootScope.publicData.payMentDay = data.data[0].payMentDay;
                        $rootScope.publicData.cardid = data.data[0].outProductId;
                        $rootScope.publicData.supItemTplId = data.data[0].supItemTplId;
                        $rootScope.saveCookies('publicNoes', $scope.data.gameCount);
                        $cookieStore.remove("PublicRechargeNo");
                        $cookieStore.put("PublicRechargeNo", $scope.data.gameCount);
                        $cookieStore.remove("PublicRechargeCity");
                        $cookieStore.put("PublicRechargeCity", $rootScope.publicData.useCity);
                        $event.target.disabled = false;
                        $state.go("publicQuery", {});
                    }
                });
            };

            if(!Tools.prototype.isEmpty(publicNo)){
                $rootScope.rechargeAccount = '';
                $rootScope.faceValue = '';
                $scope.data.gameCount = publicNo;
                $scope.checkPublicNo('2');
            } else if (!Tools.prototype.isEmpty($rootScope.publicData)
                && !Tools.prototype.isEmpty($rootScope.publicData.gameCount)) {
                $scope.data.gameCount = $rootScope.publicData.gameCount
            }
            else if(!Tools.prototype.isEmpty($cookieStore.get("PublicRechargeNo"))){
                var PublicRechargeNo = $cookieStore.get("PublicRechargeNo");
                if(!Tools.prototype.isEmpty(PublicRechargeNo)){
                    $scope.data.gameCount = PublicRechargeNo;
                }
            }else if(!Tools.prototype.isEmpty($rootScope.rechargeAccount)){
                $scope.data.gameCount = $rootScope.rechargeAccount;
                $scope.checkPublicNo('2');
            }

        }]);

    app.controller('PublicQueryCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$compile', '$cookieStore', 'MessageService', 'ProductService', 'OrderService', 'PayService', 'MenuService',
        function ($rootScope, $scope, $state, $stateParams, $compile, $cookieStore, MessageService, ProductService, OrderService, PayService, MenuService) {
            var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
            $("#copyright").html(copyright);
            $rootScope.userData.title = '水电煤';
            $rootScope.menu = 'publicQuery';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.publicrecharge.desc;
            $scope.data={
                gameCount:'',
                cash:'',
                cityin:'',
                mobileType:'',
                hasCookie:false,
                showCookie:false,
                cookieData:'',
                projectTypeId:'',
                name:'',
                item:'',
                cardid:'',
                payMentDay:'',
                arreasInfoList:'',
                selectedArreasInfo:''
            };
            $scope.errorData = {
                errorMsg:'',
                agreementMsg:'',
                cardMsg:'',
                orderMsg:''
            };
            if (Tools.prototype.isEmpty($rootScope.publicData)) {
                $state.go("publicrecharge",{});
                $scope.errorData.errorMsg = '请在查询页面点击查询后再进行支付';
            }

            $scope.data.name = $rootScope.publicData.accountName;
            $scope.data.item = $rootScope.publicData.payUnitName;
            $scope.data.projectTypeId = $rootScope.publicData.projectTypeId;
            $scope.data.cash = $rootScope.publicData.balance;
            $scope.data.gameCount = $rootScope.publicData.pebarCd;
            $scope.payList = $rootScope.userData.payList;
            $scope.data.cardid = $rootScope.publicData.cardid;
            $scope.data.arreasInfoList = $rootScope.publicData.arreasInfoList;
            $scope.data.selectedArreasInfo = $rootScope.publicData.selectedArreasInfo;

            $scope.orderForm = {
                orderType: 'PUBLICRECHARGE',
                cardNum: $scope.data.cash,
                perValue: '1',
                cardType: 0,
                cardId: $rootScope.publicData.cardid,
                memberId: $rootScope.userLoginId,
                platform: 'Mobile',
                code: $rootScope.code,
                cityin:$rootScope.publicData.useCityId,
                prvcin:$rootScope.publicData.provinceId,
                gameCount: $rootScope.publicData.pebarCd,
                supItemTplId:$rootScope.publicData.supItemTplId,
                provinceName:$rootScope.publicData.provinceName,
                useCity:$rootScope.publicData.useCity,
                payProjectId:$rootScope.publicData.payProjectId,
                projectTypeId:$rootScope.publicData.projectTypeId,
                payUnitId:$rootScope.publicData.payUnitId,
                payUnitName:$rootScope.publicData.payUnitName,
                marketBillId: '',
                ofLinkId:$rootScope.ofLinkId,
                payMentDay:$rootScope.publicData.payMentDay
            };
            if ($scope.data.cash == '' && $scope.data.gameCount == '') {
                $state.go("publicrecharge",{});
            }

            $scope.choosePayMentDay = function(balance, payMentDay) {
                $scope.data.cash = balance;
                $scope.data.payMentDay = payMentDay;
            }

            $scope.takeOrder = function($event,bank){
                $event.target.disabled = true;
                $scope.data.showCookie = false;
                if(Tools.prototype.isEmpty($scope.data.gameCount)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_publicNo;
                    $event.target.disabled = false;
                    return;
                }
                if(Tools.prototype.isEmpty($scope.data.cash)) {
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.wrong_cash;
                    $event.target.disabled = false;
                    return;
                }
                $rootScope.bank = bank;
                $scope.orderForm.cardId = $rootScope.publicData.cardid;
                $scope.orderForm.gameCount = $scope.data.gameCount;
                $scope.orderForm.cardNum = $scope.data.cash;
                $scope.orderForm.payMentDay = $scope.data.payMentDay;

                OrderService.takeSaleOrder($scope.orderForm,function(data){
                    if('success' ==  data.message){
                        var payForm = {
                            orderNo:data.data[0].billId,
                            bankCode:bank.bankCode,
                            payTypeId:bank.payTypeId,
                            payType:bank.payType,
                            returnUrl:'http://web.yiqianlian.com/mobile/success/'+$rootScope.code+'/publicrecharge',
                            code:$rootScope.code,
                            memberId:$rootScope.userLoginId,
                            marketBillId:$scope.orderForm.marketBillId
                        };
                        if('0820' == payForm.bankCode){
                            payForm.payoutName = data.data[0].cardName;
                        }
                        PayService.getPayUrlForMobile(payForm,function(data){
                            if('success' == data.message){
                                location.href = data.data[0];
                            }else{
                                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.pay_error;
                            }
                            $event.target.disabled = false;
                        });
                    }else{
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                        $event.target.disabled = false;
                    }
                });
            }
        }]);

    app.controller('PublicCityCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$compile', '$cookieStore','$location','$anchorScroll', 'MessageService', 'ProductService', 'OrderService', 'PayService', 'MenuService',
        function ($rootScope, $scope, $state, $stateParams, $compile, $cookieStore, $location, $anchorScroll, MessageService, ProductService, OrderService, PayService, MenuService) {
            var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
            $("#copyright").html(copyright);
            $rootScope.userData.title = '水电煤';
            $rootScope.menu = 'publicrecharge';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.publicrecharge.desc;
            var publicNo = $stateParams.publicNo;
            $scope.data={
                gameCount:'',
                cash:'',
                city:'',
                provinceName:'',
                cityId:'',
                provinceId:'',
                mobileType:'',
                hasCookie:false,
                showCookie:false,
                cookieData:'',
                projectTypeId:'',
                name:'',
                item:''
            };
            if (Tools.prototype.isEmpty($rootScope.publicData)) {
                $rootScope.publicData = {
                    code:$rootScope.code,
                    gameCount:'',
                    cash:'',
                    prov:'',
                    useCity:'',
                    provinceName:'',
                    useCityId:'',
                    provinceId:'',
                    payUnitId:'',
                    payUnitName:'',
                    pebarCd:'',
                    supItemTplId:'',
                    payProjectId:'v2620',
                    projectTypeId:$scope.data.projectTypeId,
                    cardid:'',
                    accountName:'',
                    balance:'',
                    payUnitList:''
                };
            }
            ProductService.queryAreaByIp(function (data) {
                if ('success' == data.message && 0 < data.data.length) {
                    $scope.data.city = data.data[0];
                    if (!Tools.prototype.isEmpty($scope.data.city)) {
                        ProductService.getPublicArea($rootScope.publicData, function (data) {
                            if ('success' == data.message && 0 < data.data.length) {
                                $scope.data.provinceName = data.data[0].province;
                                $scope.data.cityId = data.data[0].useCityId;
                                $scope.data.provinceId = data.data[0].provinceId;
                            }
                        });
                    }
                }
            });

            $scope.changeCityList=function(queryValue){
                var cityArray = new Array();
                for (var i = 0;i < $scope.baseCityList.length;i++) {
                    var publicCityInfo = $scope.baseCityList[i];
                    var city = new Array();
                    for (var j = 0;j < publicCityInfo.cityInfoList.length;j++) {
                        var userCity = publicCityInfo.cityInfoList[j].useCity;
                        if (userCity.indexOf(queryValue) > -1) {
                            city.push(publicCityInfo.cityInfoList[j]);
                        }
                    }
                    if (city.length > 0) {
                        publicCityInfo.cityInfoList = city;
                        cityArray.push(publicCityInfo);
                    }
                }
                $scope.cityList = cityArray;

            };

            $scope.clearCity = function() {
                $scope.queryValue = '';
                $scope.cityList = $scope.baseCityList;
            };

            $scope.chooseAreaCity = function(provinceId,province,useCityId,useCity) {
                $rootScope.publicData.provinceId = $scope.data.provinceId;
                $rootScope.publicData.province = $scope.data.provinceName;
                $rootScope.publicData.useCityId = $scope.data.cityId;
                $rootScope.publicData.useCity = $scope.data.city;

                $cookieStore.remove("PublicRechargeCity");
                $cookieStore.put("PublicRechargeCity",$rootScope.publicData.useCity);
                $state.go("publicrecharge",{});
            };

            $scope.chooseCity = function(provinceId,province,useCityId,useCity) {
                $rootScope.publicData.provinceId = provinceId;
                $rootScope.publicData.province = province;
                $rootScope.publicData.useCityId = useCityId;
                $rootScope.publicData.useCity = useCity;

                $cookieStore.remove("PublicRechargeCity");
                $cookieStore.put("PublicRechargeCity",$rootScope.publicData.useCity);
                $state.go("publicrecharge",{});
            };
            ProductService.getPublicCity({belongTo:''},function(data){
                if('success' == data.message && 0 < data.data.length){
                    $scope.cityList = data.data;
                    $scope.baseCityList = data.data;
                }
            });

        }]);
});
