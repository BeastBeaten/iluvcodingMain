/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.flow.flowModule',[]);

    app.controller('FlowRechargeCtrl',['$rootScope','$scope','$state','$stateParams','$cookieStore','$compile','MessageService','ProductService','OrderService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$cookieStore,$compile,MessageService,ProductService,OrderService,MenuService){
        $rootScope.userData.title = '流量';
        $rootScope.menu = 'flowrecharge';
        $rootScope.curRouter = $rootScope.menu;
        $rootScope.rechargeDesc = MenuService.flowrecharge.desc;
        var phoneNo = $stateParams.phoneNo;
        $scope.data={
            gameCount:'',
            cash:'',
            cityin:'',
            mobileType:'',
            hasCookie:false,
            showCookie:false,
            cookieData:''
        }

        $scope.errorData = {
            phoneNoError:'',
            errorMsg:''
        }

        $scope.payList = $rootScope.userData.payList;

        $scope.orderForm = {
            code:$rootScope.code,
            memberId:$rootScope.userLoginId,
            platform:'Mobile',
            ofLinkId:$rootScope.ofLinkId,
            orderType:'FLOWRECHARGE'
        }

        var cookieNoes = Tools.prototype.saveCookie("flowNoes");
        if(Tools.prototype.isEmpty(cookieNoes)){
            $scope.data.hasCookie = false;
            $scope.phoneNoes = '';
        }else{
            $scope.data.hasCookie = true;
            $scope.phoneNoes = cookieNoes.split(";");
        }

        $scope.showCookie = function(){
            $scope.data.showCookie = !$scope.data.showCookie;
        }

        $scope.clearCookie = function(){
            Tools.prototype.saveCookie("flowNoes",null);
            $scope.phoneNoes = '';
            $scope.data.hasCookie = false;
            $scope.data.showCookie = false;

        }

        $scope.clearError = function(type){
            if('1' == type){
                //focus
                $('#gameCount')[0].placeholder="";
            }else if('2' == type){
                //blur
                if(Tools.prototype.isEmpty($scope.data.gameCount)){
                    $('#gameCount')[0].placeholder="请输入或选择手机号码";
                }else if(!Tools.prototype.isMobileNo($scope.data.gameCount) || Tools.prototype.is170MobileNo($scope.data.gameCount)){
                    $scope.errorData.phoneNoError=MessageService.errorMsg.orderMsg.phone_no_error;
                }
                $scope.data.showCookie = false;
            }else if('3' == type){
                //clear phoneno
                $scope.data.gameCount = '';
                $scope.data.showCookie = false;
                $scope.errorData.phoneNoError='';
                $scope.errorData.errorMsg = '';
                $scope.data.mobileType = '';
                $scope.data.cityin = '';
                $scope.clearFaceValue();
            }else if('4' == type){
                //clear msg
                $scope.errorData.phoneNoError='';
                $scope.errorData.errorMsg = '';
            }
        }

        $scope.clearFaceValue = function(){
            $scope.orderForm.flowValue = '';
            $scope.orderForm.perValue = '';
            angular.forEach($scope.faceList,function(item,key){
                item.id = '';
                item.choosed = false;
                item.stock = false;
                item.price = '';
            });
        }

        $scope.checkPhoneNo = function(type){
            $scope.data.gameCount = $scope.data.gameCount.replace(/\D/g,'');
            $scope.clearError('4');
            if($scope.data.gameCount.length > 11){
                $scope.data.gameCount = $scope.data.gameCount.substr(0,11);
            }
            if(Tools.prototype.isEmpty($scope.data.gameCount)){
                $scope.data.showCookie = false;
                return;
            }else if(!Tools.prototype.isEmpty($scope.data.gameCount) && '1' == type){
                $scope.data.showCookie = true;
            }
            if(11 == $scope.data.gameCount.length){
                $scope.data.showCookie = false;
                if(Tools.prototype.isMobileNo($scope.data.gameCount) && !Tools.prototype.is170MobileNo($scope.data.gameCount)){
                    if('1' == type){
                        $('#gameCount').blur();
                    }
                    $cookieStore.remove("FlowerRechargeNo");
                    $cookieStore.put("FlowerRechargeNo",$scope.data.gameCount);
                    ProductService.getPhoneInfo($scope.data.gameCount,function(data){
                        if("success" == data.message){
                            if(data.data[0].prvcin == data.data[0].cityin){
                                $scope.data.cityin = data.data[0].prvcin;
                            }else{
                                $scope.data.cityin = data.data[0].prvcin+' '+data.data[0].cityin;
                            }
                            $scope.data.cityin += data.data[0].mobileType;
                            $scope.data.mobileType = data.data[0].mobileType;
                            $cookieStore.remove("FlowerRechargeInfo");
                            $cookieStore.put("FlowerRechargeInfo",$scope.data.cityin);
                            $cookieStore.remove("FlowerTypeInfo");
                            $cookieStore.put("FlowerTypeInfo",$scope.data.mobileType);
                            // 判断运营商类型，根据运营商获取流量商品规格
                            switch($scope.data.mobileType){
                                case '移动':$scope.faceList = ProductService.getFaceValueForCM;break;
                                case '联通':$scope.faceList = ProductService.getFaceValueForCU;break;
                                case '电信':$scope.faceList = ProductService.getFaceValueForCT;break;
                                default: $scope.faceList = ProductService.getFlowFaceValue;
                            }
                            $scope.getFlowSalePrice();
                        }else{
                            $scope.data.mobileType = '';
                            $scope.data.cityin = '';
                        }
                    })
                }else{
                    $scope.data.mobileType = '';
                    $scope.data.cityin = '';
                    $scope.errorData.phoneNoError=MessageService.errorMsg.orderMsg.phone_no_error;
                }

            }else{
                if(!Tools.prototype.isEmpty($scope.data.mobileType) || !Tools.prototype.isEmpty($scope.data.cityin)){
                    $scope.data.cityin='';
                    $scope.data.mobileType = '';
                }
                $scope.errorData.phoneNoError='';
                $scope.clearFaceValue();
            }
        }

        $scope.choosePhoneNo = function(phoneNo){
            $scope.data.gameCount = phoneNo;
            $scope.data.showCookie = false;
            $scope.checkPhoneNo('2');
        }

        $scope.getFlowSalePrice = function(){
            if(!Tools.prototype.isEmpty($scope.data.mobileType)){
                angular.forEach($scope.faceList,function(item,key){
                    ProductService.getFlowSalePrice({gameCount:$scope.data.gameCount,flowValue:item.flowValue,perValue:item.perValue,code:$rootScope.code},function (data){
                        item.choosed = false;
                        if ("success" == data.message && 0 < data.data.length) {
                            item.price = data.data[0].salePrice;
                            item.stock = true;
                            if(!Tools.prototype.isEmpty($rootScope.faceValue) && item.perValue == $rootScope.faceValue){
                                $scope.chooseValue(item.flowValue);
                            }
                        }else{
                            item.price = '';
                            item.stock = false;
                        }
                    });
                });
            }
        }

        $scope.chooseValue = function(flowValue){
            $scope.data.showCookie = false;
            if('phonerecharge' == flowValue){
                if(!Tools.prototype.isMobileNo($scope.data.gameCount) || Tools.prototype.is170MobileNo($scope.data.gameCount)){
                    $scope.data.gameCount = '';
                }
                $state.go('phonerecharge',{phoneNo:$scope.data.gameCount});
                return;
            }
            if(Tools.prototype.isEmpty($scope.data.mobileType)){
                return;
            }
            angular.forEach($scope.faceList,function(item,key){
                if(item.flowValue == flowValue){
                    if(item.stock){
                        item.choosed = true;
                        $scope.orderForm.flowValue = item.flowValue;
                        $scope.orderForm.perValue = item.perValue;
                        $scope.data.cash = item.price;
                    }else{
                        item.choosed = false;
                        $scope.orderForm.flowValue = '';
                        $scope.orderForm.perValue = '';
                        $scope.data.cash = '';
                    }
                }else{
                    item.choosed = false;
                }
            });
            if(Tools.prototype.isEmpty($scope.orderForm.perValue)){
                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                return;
            }
            $scope.clearError('4');
        }

        if(!Tools.prototype.isEmpty(phoneNo) || !Tools.prototype.isEmpty($scope.data.gameCount)){
            $rootScope.rechargeAccount = '';
            $rootScope.faceValue = '';
            $scope.data.gameCount = phoneNo;
            $scope.checkPhoneNo('2');
        }else if(!Tools.prototype.isEmpty($cookieStore.get("FlowerRechargeNo"))){
            var FlowerRechargeNo = $cookieStore.get("FlowerRechargeNo");
            if(!Tools.prototype.isEmpty(FlowerRechargeNo)){
                $scope.data.gameCount = FlowerRechargeNo;
            }

            var FlowerRechargeInfo = $cookieStore.get("FlowerRechargeInfo");
            var FlowerTypeInfo = $cookieStore.get("FlowerTypeInfo");
            if(!Tools.prototype.isEmpty(FlowerRechargeInfo)){
                $scope.data.cityin = FlowerRechargeInfo;
                $scope.data.mobileType = FlowerTypeInfo;
                switch($scope.data.mobileType){
                    case '移动':$scope.faceList = ProductService.getFaceValueForCM;break;
                    case '联通':$scope.faceList = ProductService.getFaceValueForCU;break;
                    case '电信':$scope.faceList = ProductService.getFaceValueForCT;break;
                    default: $scope.faceList = ProductService.getFlowFaceValue;
                }
                angular.forEach($scope.faceList,function(item,key){
                    if(item.choosed && !Tools.prototype.isEmpty(item.price)){
                        $scope.data.cash = item.price;
                        $scope.orderForm.cardId = item.id;
                        $scope.orderForm.perValue = item.perValue;
                        $scope.orderForm.flowValue = item.flowValue;
                    }
                });
                if(Tools.prototype.isEmpty($scope.data.cash)){
                    $scope.checkPhoneNo('2');
                }
            }else{
                $scope.data.cash = '';
                $scope.faceList = ProductService.getFlowFaceValue;
                $scope.clearFaceValue();
            }
        }else if(!Tools.prototype.isEmpty($rootScope.rechargeAccount)){
            $scope.data.gameCount = $rootScope.rechargeAccount;
            $scope.checkPhoneNo('2');
        }else{
            $scope.data.cash = '';
            $scope.faceList = ProductService.getFlowFaceValue;
            $scope.clearFaceValue();
        }

        $scope.takeOrder = function($event,bank){
            $event.target.disabled = true;
            $scope.data.showCookie = false;
            if(Tools.prototype.isEmpty($scope.data.gameCount)){
                $scope.errorData.phoneNoError=MessageService.errorMsg.commonMsg.no_phone;
                $event.target.disabled = false;
                return;
            }
            if(!Tools.prototype.isMobileNo($scope.data.gameCount) || Tools.prototype.is170MobileNo($scope.data.gameCount)){
                $scope.errorData.phoneNoError=MessageService.errorMsg.orderMsg.phone_no_error;
                $event.target.disabled = false;
                return;
            }
            if(Tools.prototype.isEmpty($scope.orderForm.flowValue)){
                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_face_value;
                $event.target.disabled = false;
                return;
            }

            $rootScope.bank = bank;
            $scope.orderForm.gameCount = $scope.data.gameCount;
            OrderService.takeSaleOrder($scope.orderForm,function(data){
                if('success' ==  data.message){
                    $rootScope.saveCookies('flowNoes',$scope.orderForm.gameCount);
                    var payForm = {
                        orderNo:data.data[0].billId,
                        bankCode:bank.bankCode,
                        payTypeId:bank.payTypeId,
                        payType:bank.payType,
                        menu:'flowrecharge',
                        returnUrl:'http://web.yiqianlian.com/yicha/success/'+$rootScope.menu,
                        code:$rootScope.code,
                        memberId:$rootScope.userLoginId
                    };
                    if('0820' == payForm.bankCode){
                        payForm.payoutName = data.data[0].cardName;
                    }
                    OrderService.getPayUrlForMobile(payForm,function(data){
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
});
