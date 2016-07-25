/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.common.commonModule',[]);

    app.controller('OrderQueryCtrl',['$rootScope','$scope','$state','$stateParams','OrderService','MessageService','dialog',function($rootScope,$scope,$state,$stateParams,OrderService,MessageService,dialog){
        $scope.data = {
            queryType:$stateParams.type,
            code:$rootScope.code,
            billState:'success',
            already:'success',
            queryFlag:'1',
            iDisplayStart:0,
            rechargeAccount:'',
            verifyCode:''
        };

        $scope.idenData = {
            imageCodeUrl:'',
            errorMsg:'',
            imageCodeMsg:'',
            isShowBox:true
        };

        $scope.idenData.imageCodeUrl = '/member/getImageCode?randomId='+Math.random().toString(36).substr(2);

        $scope.flushImageCode = function(){
            $scope.idenData.imageCodeUrl = '/member/getImageCode?randomId='+Math.random().toString(36).substr(2);
        }

        $scope.checkAccount = function(type){
            if('1' == type){
                //focus
                $('#rechargeAccount')[0].placeholder="";
                $scope.idenData.errorMsg = '';
            }else if('2' == type){
                //blur
                if(Tools.prototype.isEmpty($scope.data.rechargeAccount)){
                    $('#rechargeAccount')[0].placeholder="请输入充值账号";
                }else{
                    $scope.idenData.errorMsg = '';
                }
            }else if('3' == type){
                $scope.data.rechargeAccount = $scope.data.rechargeAccount.replace(/\D/g,'');
                if(!Tools.prototype.isEmpty($scope.data.rechargeAccount)){
                    $scope.idenData.errorMsg = '';
                }
            }
        }

        $scope.checkImageCode = function(type){
            if('1' == type){
                //focus
                $('#imageCode')[0].placeholder="";
                $scope.idenData.imageCodeMsg = '';
            }else if('2' == type){
                //blur
                if(Tools.prototype.isEmpty($scope.data.verifyCode)){
                    $('#imageCode')[0].placeholder="请输入验证字符";
                }else{
                    $scope.idenData.imageCodeMsg = '';
                }
            }else if('3' == type){
                $scope.data.verifyCode = $scope.data.verifyCode.replace(/\D/g,'');
                if(!Tools.prototype.isEmpty($scope.data.verifyCode)){
                    $scope.idenData.imageCodeMsg = '';
                }
            }
        }

        $scope.showBox = function(){
            $scope.idenData.isShowBox = !$scope.idenData.isShowBox;
        }

        var pageNo0 = 0,pageNo1= 0,pageNo9= 0,canLoadMore0=true,canLoadMore1=true,canLoadMore9=true;
        $scope.orderList = [];
        $scope.orderList1 = [];
        $scope.orderList0 = [];
        $scope.orderList9 = [];
        $scope.changeOrderType = function(billState,already,queryFlag){
            $scope.data.queryFlag = queryFlag;
            $scope.data.billState = billState;
            $scope.data.already = already;
            if('remote' == $scope.data.queryType){
                $scope.setOrderList([]);
                if(0 == $scope.orderList.length){
                    $scope.queryOrder();
                }
            }else{
                $scope.queryOrder();
            }

        }
        $scope.queryFlag = function(){
            if('1' == $scope.data.queryFlag){
                return 0 == $scope.orderList1.length;
            }else if('0' == $scope.data.queryFlag){
                return 0 == $scope.orderList0.length;
            }else{
                return 0 == $scope.orderList9.length;
            }
        }
        $scope.setOrderList = function(data){
            if('1' == $scope.data.queryFlag){
                if(0 < data.length){
                    for(var i = 0;i < data.length;i++){
                        $scope.orderList1.push(data[i]);
                    }
                }
                $scope.orderList = $scope.orderList1;
            }else if('0' == $scope.data.queryFlag){
                if(0 < data.length){
                    for(var i = 0;i < data.length;i++){
                        $scope.orderList0.push(data[i]);
                    }
                }
                $scope.orderList = $scope.orderList0;
            }else{
                if(0 < data.length){
                    for(var i = 0;i < data.length;i++){
                        $scope.orderList9.push(data[i]);
                    }
                }
                $scope.orderList = $scope.orderList9;
            }
        }


        $scope.queryRemoteOrder =function(){
            if(!$scope.getCanLoadMore()){
                $scope.setOrderList([]);
                return;
            }
            $scope.data.iDisplayStart = $scope.getPageNo();
            OrderService.queryOrders($scope.data,function(data){
                if('success' == data.message && 0 < data.data.length){
                    $scope.setOrderList(data.data);
                    $scope.setCanLoadMore(true);
                    $scope.idenData.isShowBox =false;
                }else if('IMAGECODE_ERROR' == data.message){
                    $scope.idenData.imageCodeMsg = '您输入的验证码有误';
                    $scope.flushImageCode();
                    $scope.idenData.isShowBox =true;
                }else{
                    if(0 == $scope.getPageNo()){
                        $scope.orderList = [];
                    }
                    $scope.setCanLoadMore(false);
                    $scope.idenData.isShowBox =false;
                }
            });
        }

        $scope.chooseTime = function(month){
            angular.forEach($scope.dateList,function(item,key){
                if(item.month == month){
                    $scope.data.startMonth = parseInt(month);
                    $scope.data.startYear = item.year;
                }
            });
            $scope.orderList = [];
            $scope.orderList1 = [];
            $scope.orderList0 = [];
            $scope.orderList9 = [];
            pageNo0 = 0;pageNo1= 0;pageNo9= 0;
            canLoadMore0=true;canLoadMore1=true;canLoadMore9=true;
            $scope.queryRemoteOrder();
        }

        $scope.getPageNo=function(){
            if('1' == $scope.data.queryFlag){
                return pageNo1;
            }else if('0' == $scope.data.queryFlag){
                return pageNo0;
            }else{
                return pageNo9;
            }
        }

        $scope.addPageNo=function(){
            if('1' == $scope.data.queryFlag){
                pageNo1++;
            }else if('0' == $scope.data.queryFlag){
                pageNo0++;
            }else{
                pageNo9++;
            }
        }

        $scope.getCanLoadMore=function(){
            if('1' == $scope.data.queryFlag){
                return canLoadMore1;
            }else if('0' == $scope.data.queryFlag){
                return canLoadMore0;
            }else{
                return canLoadMore9;
            }
        }

        $scope.setCanLoadMore=function(flag){
            if('1' == $scope.data.queryFlag){
                canLoadMore1 = flag;
            }else if('0' == $scope.data.queryFlag){
                canLoadMore0 = flag;
            }else{
                canLoadMore9 = flag;
            }
        }

        $scope.queryOrder = function(){
            if(Tools.prototype.isEmpty($scope.data.rechargeAccount)){
                $scope.idenData.errorMsg = '请输入充值账号';
                return;
            }
            if(Tools.prototype.isEmpty($scope.data.verifyCode)){
                $scope.idenData.imageCodeMsg = '请输入验证字符';
                return;
            }
            $scope.orderList = [];
            $scope.orderList1 = [];
            $scope.orderList0 = [];
            $scope.orderList9 = [];
            $scope.queryRemoteOrder();
        }


        $scope.getCardName = function(cardName){
            return cardName.replace(/\d+\u5143/g,'');
        }

        $scope.loadMore = function(){
            if(!$scope.getCanLoadMore()){
                return;
            }
            if(0  == $scope.getPageNo() && 0 == $scope.orderList.length){
                return;
            }
            $scope.addPageNo();
            $scope.queryRemoteOrder();
        }

        $scope.getCurMenu = function(){
            if($rootScope.menu.indexOf('game') > -1){
                return 'gamerecharge';
            }else if($rootScope.menu.indexOf('gift') > -1){
                return 'giftCardrecharge';
            }else if($rootScope.menu.indexOf('vip') > -1){
                return 'viprecharge';
            }else{
                return $rootScope.menu;
            }
        }

        $scope.goPay = function(billId,cardName){
            if(1 == $rootScope.userData.payList.length){
                var menu = $scope.getCurMenu();
                var payForm = {
                    orderNo:billId,
                    bankCode:$rootScope.userData.payList[0].bankCode,
                    payTypeId:$rootScope.userData.payList[0].payTypeId,
                    payType:$rootScope.userData.payList[0].payType,
                    returnUrl:'http://web.yiqianlian.com/yicha/success/'+menu,
                    code:$rootScope.code,
                    memberId:$rootScope.userLoginId
                };
                if('0820' == payForm.bankCode){
                    payForm.payoutName = cardName;
                }
                OrderService.getPayUrlForMobile(payForm,function(data){
                    if('success' == data.message){
                        location.href = data.data[0];
                    }else{
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.pay_error;
                        dialog.showTip({
                            template:$scope.errorData.errorMsg
                        });
                    }
                });
            }
        }
    }]);

    app.controller('RechargeDescCtrl',['$rootScope','$scope','$state',function($rootScope,$scope,$state){
        $scope.indexNum = '';
        if(Tools.prototype.isEmpty($rootScope.rechargeDesc)){
            $state.go($rootScope.menu);
        }
        $scope.indexNum = $rootScope.rechargeDesc.length + 1;
    }]);
});
