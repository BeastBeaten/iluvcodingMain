/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.web.controller.phone.phoneModule',[]);

    app.controller('PhoneRechargeCtrl',['dialog','$rootScope','$scope','$state','$stateParams','$cookieStore','$interval','CommonService','ProductService','OrderService',function(dialog,$rootScope,$scope,$state,$stateParams,$cookieStore,$interval,CommonService,ProductService,OrderService){
        $scope.menuFlag = $stateParams.menuFlag ? $stateParams.menuFlag : '0';
        $scope.gasSearchFlag = $stateParams.gasSearchFlag ? $stateParams.gasSearchFlag : '1';
        var type = $stateParams.type;
        $scope.errorData={};
        $scope.data ={
            gameCount:'',
            rePhoneNo:'',
            rechargeAccount:'',
            faceValue:'',
            mobileType:'',
            isShowDesc:false,
            cash:'',
            cardId:'',
            boardId:'',
            cardName:'',
            cardNameTemp:'',
            orderType:'PHONERECHARGE',
            code:$rootScope.code,
            cardNum:'1',
            cardType:0,
            ofLinkId:$rootScope.ofLinkId,
            perValue:'',
            billId:''
        };
        $scope.errorData = {
            phoneNoError:'',
            errorMsg:'',
            isSub:''
        };
        $scope.orderForm = {
            orderType:'PHONERECHARGE',
            cardNum:'1',
            cardType:0,
            cardId:'',
            perValue:'',
            code:$rootScope.code,
            ofLinkId:$rootScope.ofLinkId
        };

        $scope.clearError = function(){
            $scope.errorData.errorMsg = '';
            $scope.errorData.phoneErrorMsg = '';
        }

        $scope.checkPhoneNo = function(obj){
            $scope.data.gameCount = $scope.data.gameCount.replace(/\D/g,'');
            if($scope.data.gameCount.length > 11){
                $scope.data.gameCount = $scope.data.gameCount.substr(0,11);
            }
            if(Tools.prototype.isEmpty($scope.data.gameCount)){
                $scope.data.rePhoneNo = '';
            }else{
                $scope.data.rePhoneNo = '';
                var temp = $scope.data.gameCount.split('');
                for(var i = 0 ;i < temp.length;i++){
                    if(3 == i || 6 == i){
                        $scope.data.rePhoneNo += ' ';
                    }
                    $scope.data.rePhoneNo += temp[i];
                }
            }

            if($scope.data.gameCount.length == 11){
                if(Tools.prototype.isMobileNo($scope.data.gameCount) && !Tools.prototype.is170MobileNo($scope.data.gameCount)){
                    $scope.errorData.phoneNoError = '';
                    ProductService.getPhoneInfo($scope.data.gameCount,function(data){
                        if("success" == data.message && 0 < data.data.length){
                            $scope.data.prvcin =  data.data[0].prvcin;
                            $scope.data.cityin = data.data[0].cityin;
                            if($scope.data.prvcin == $scope.data.cityin){
                                $scope.data.cityin = '';
                            }
                            $scope.data.mobileType = data.data[0].mobileType;
                            angular.forEach($scope.faceValueList,function(item,key){
                                if (item.choosed) {
                                    $scope.chooseFaceValue(item.value);
                                }
                            });
                        }else{
                            $scope.errorData.phoneNoError = $rootScope.errorMsg.commonMsg.phone_no_error;
                        }
                    });
                }else{
                    $scope.errorData.phoneNoError = $rootScope.errorMsg.commonMsg.phone_no_error;
                }
            }else{
                $scope.errorData.phoneNoError = '';
                $scope.errorData.errorMsg = '';
                $scope.data.prvcin = '';
                $scope.data.cityin = '';
                $scope.data.mobileType = '';
                $scope.data.validNo='true';
                $scope.data.cash = '';
            }
        }

        $scope.faceValueList = CommonService.getFaceValueList;

        $scope.checkPhoneNum = function(){
            if(Tools.prototype.isEmpty($scope.data.gameCount)){
                return;
            }
            if(!Tools.prototype.isMobileNo($scope.data.gameCount) || Tools.prototype.is170MobileNo($scope.data.gameCount)){
                $scope.errorData.phoneNoError = $rootScope.errorMsg.commonMsg.phone_format_error;
            }else{
                $scope.checkPhoneNo('');
            }
        }

        $scope.clearPhoneNum = function(){
            $scope.errorData.phoneNoError = '';
            $scope.data.gameCount = '';
            $scope.data.prvcin = '';
            $scope.data.cityin = '';
            $scope.data.mobileType = '';
        }

        $scope.chooseFaceValue = function(value){
            if(!Tools.prototype.isEmpty($scope.errorData.phoneNoError)){
                return;
            }
            $scope.errorData.errorMsg = '';
            if(Tools.prototype.isEmpty($scope.data.mobileType)){
                return;
            }
            if(Tools.prototype.isEmpty(value)){
                $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_stock;
                $scope.data.cash = '';
                return;
            }
            angular.forEach($scope.faceValueList,function(item,key){
                if(item.value == value){
                    item.choosed = true;
                    ProductService.getWebPhoneProduct({code:$rootScope.code,mobileType:$scope.data.mobileType,provinceName:$scope.data.prvcin,faceValue:item.value,phoneNo:$scope.data.gameCount},function(data){
                        if('success' == data.message){
                            item.stock = true;
                            item.id = data.data[0].id;
                            item.price = data.data[0].salePrice;
                            item.productName = data.data[0].productName;
                            $scope.data.cardId = data.data[0].id;
                            $scope.data.faceValue = item.value;
                            $scope.data.perValue = item.value;
                            $scope.data.cash = data.data[0].salePrice;
                            $scope.data.cardName = item.productName;
                        }else{
                            item.stock = false;
                            item.id = '';
                            item.price = '';
                            item.productName = '';
                            $scope.data.cardId = '';
                            $scope.data.faceValue = '';
                            $scope.data.perValue = '';
                            $scope.data.cash = '';
                            $scope.data.cardName = '';
                        }
                    });
                } else {
                    item.choosed = false;
                }
            });
            $scope.clearError();
        }

        $scope.showDesc = function(){
            $scope.data.isShowDesc = !$scope.data.isShowDesc;
        }

        $scope.takeOrder = function(){
            $scope.errorData.isSub = '1';
            if(Tools.prototype.isEmpty($scope.data.gameCount)){
                $scope.errorData.phoneNoError = $rootScope.errorMsg.commonMsg.no_phone;
                $scope.errorData.isSub = '';
                return;
            }
            if(!Tools.prototype.isMobileNo($scope.data.gameCount) || Tools.prototype.is170MobileNo($scope.data.gameCount)){
                $scope.errorData.phoneNoError = $rootScope.errorMsg.commonMsg.phone_format_error;
                $scope.errorData.isSub = '';
                return;
            }
            if(Tools.prototype.isEmpty($scope.data.cardId)){
                angular.forEach($scope.faceValueList,function(item,key){
                    if(item.choosed && '' != item.id){
                        $scope.data.cardId = item.id;
                        $scope.data.cardName = item.productName;
                        $scope.data.faceValue=item.value;
                        $scope.data.perValue = item.value;
                    }else if(item.choosed && '' == item.id){
                        item.stock = false;
                        $scope.data.faceValue='';
                        $scope.data.perValue = '';
                        $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_stock;
                        $scope.errorData.isSub = '';
                        return;
                    }
                });
            }
            if(Tools.prototype.isEmpty($scope.data.cardId)){
                $scope.data.faceValue='';
                $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_stock;
                $scope.errorData.isSub = '';
                return;
            }
            ProductService.checkCanOrder({cardId:$scope.data.cardId,code:$rootScope.code},function(data){
                if("success" == data.message){
                    $scope.errorData.errorMsg = '';
                    $scope.data.searchRoute='orderSearch';
                    $scope.data.cardNameTemp=$scope.data.cardName;
                    $scope.errorData.isSub = '';
                    $rootScope.saveCookie('userPhoneNum',$scope.data.gameCount,{expires:30});
                    // 生成销售订单
                    OrderService.takeWebSaleOrder($scope.data,function (data1) {
                        // 下销售单成功
                        if("success" == data1.message && 0 < data1.data.length) {
                            $scope.data.billId = data1.data[0].billId;
                            // 跳转支付确认页面
                            $state.go("orderpay",{orderForm:Tools.prototype.putParams($scope.data)});
                        }
                    });
                }else{
                    $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_stock;
                    angular.forEach($scope.faceValueList,function(item,key){
                        if(item.id == $scope.data.cardId){
                            item.stock = false;
                        }
                    });
                    $scope.errorData.isSub = '';
                }
            });

        }

        var cookiePhoneNum = $rootScope.saveCookie('userPhoneNum');
        if(!Tools.prototype.isEmpty(cookiePhoneNum)){
            $scope.data.hasCookie=true;
            $scope.data.rechargeAccount = cookiePhoneNum;
            $rootScope.saveCookie('userPhoneNum',null);
            $rootScope.saveCookie('userPhoneNum',cookiePhoneNum,{expires:30});
        }else{
            $scope.data.hasCookie = false;
        }

        $scope.checkAccount = function(){
            if(!Tools.prototype.isEmpty($scope.data.rechargeAccount)){
                $scope.errorData.errorMsg = '';
                if (!Tools.prototype.isMobileNo($scope.data.rechargeAccount)) {
                    $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.phone_format_error;
                    return false;
                }
            }
            else {
                $scope.errorData.errorMsg = '';
            }
        }
    }]);
});
