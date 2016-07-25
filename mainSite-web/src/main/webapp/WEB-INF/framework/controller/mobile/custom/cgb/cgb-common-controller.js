/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.common.commonModule',[]);

    app.controller('OrderQueryCtrl',['$rootScope','$scope','$state','$stateParams','CGBOrderService','PayService','MessageService','dialog',function($rootScope,$scope,$state,$stateParams,CGBOrderService,PayService,MessageService,dialog){
        if(Tools.prototype.isEmpty($rootScope.userLoginId)){
            window.location.href='http://web.yiqianlian.com/cgb/mobile?siteURL=http://web.yiqianlian.com/cgb/mobile?menu=order-query&actionflag=login';
            return;
        }
        $rootScope.curRouter = "order-query";
        $scope.data = {
            queryType:'remote',
            memberId:$rootScope.userLoginId,
            code:$rootScope.code,
            billState:'success',
            already:'success',
            queryFlag:'1',
            iDisplayStart:0
        };

        $scope.errorData = {
            errorMsg:''
        };

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
                if('remote' == $scope.data.queryType){
                    if(0 < data.length){
                        for(var i = 0;i < data.length;i++){
                            $scope.orderList1.push(data[i]);
                        }
                    }
                    $scope.orderList = $scope.orderList1;
                }else{
                    $scope.orderList1 = data;
                }
            }else if('0' == $scope.data.queryFlag){
                if('remote' == $scope.data.queryType){
                    if(0 < data.length){
                        for(var i = 0;i < data.length;i++){
                            $scope.orderList0.push(data[i]);
                        }
                    }
                    $scope.orderList = $scope.orderList0;
                }else{
                    $scope.orderList0 = data;
                }
            }else{
                if('remote' == $scope.data.queryType){
                    if(0 < data.length){
                        for(var i = 0;i < data.length;i++){
                            $scope.orderList9.push(data[i]);
                        }
                    }
                    $scope.orderList = $scope.orderList9;
                }else{
                    $scope.orderList9 = data;
                }
            }
        }

        $scope.queryRemoteOrder =function(){
            if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                $scope.orderList = [];
                return;
            }
            if(!$scope.getCanLoadMore()){
                $scope.setOrderList([]);
                return;
            }
            $scope.data.iDisplayStart = $scope.getPageNo();
            CGBOrderService.queryOrderInfo($scope.data,function(data){
                if('success' == data.message && 0 < data.data.length){
                    $scope.setOrderList(data.data);
                    $scope.setCanLoadMore(true);
                }else{
                    if(0 == $scope.getPageNo()){
                        $scope.orderList = [];
                    }
                    $scope.setCanLoadMore(false);
                }
            });
        }

        $scope.initMonth =function(){
            $scope.dateList = [];
            var date = new Date();
            var date2 = null;
            for(var i = 0; i < 6;i++ ){
                var temp = {};
                date2 = new Date(date.getFullYear(),date.getMonth()+1-i,0);
                temp.year=date2.getFullYear();
                temp.month=date2.getMonth();
                $scope.dateList.push(temp);
            }
            $scope.data.startYear = $scope.dateList[0].year;
            $scope.data.startMonth = parseInt($scope.dateList[0].month);
        }

        if('remote' == $scope.data.queryType){
            $scope.initMonth();
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
            if('remote' == $scope.data.queryType){
                $scope.queryRemoteOrder();
            }else{
                $scope.queryLocalOrder();
            }
        }

        $scope.queryOrder();

        $scope.getCardName = function(cardName){
            return cardName.replace(/\d+\u5143/g,'');
        }

        $scope.loadMore = function(){
            if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                $scope.orderList = [];
                return;
            }
            if(!$scope.getCanLoadMore()){
                return;
            }
            if(0  == $scope.getPageNo() && 0 == $scope.orderList.length){
                return;
            }
            $scope.addPageNo();
            $scope.queryRemoteOrder();
        }

        $scope.goPay = function(billId,cardName){
            if(1 == $rootScope.userData.payList.length){
                var payForm = {
                    orderNo:billId,
                    bankCode:$rootScope.userData.payList[0].bankCode,
                    payTypeId:$rootScope.userData.payList[0].payTypeId,
                    payType:$rootScope.userData.payList[0].payType,
                    returnUrl:'http://web.yiqianlian.com/cgb/order?menu=gasrecharge',
                    code:$rootScope.code,
                    memberId:$rootScope.userLoginId
                };
                PayService.getPayUrlForMobile(payForm,function(data){
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

    app.controller('MarketCtrl',['$rootScope','$scope','$state','$stateParams','$ionicModal','MarketService',function($rootScope,$scope,$state,$stateParams,$ionicModal,MarketService){
        if(Tools.prototype.isEmpty($rootScope.userLoginId)){
            window.location.href='http://web.yiqianlian.com/cgb/mobile?siteURL=http://web.yiqianlian.com/cgb/mobile?menu=gasrecharge&actionflag=login';
            return;
        }

        $rootScope.marketInfo.userId = $rootScope.userLoginId;
        $rootScope.marketInfo.getDefaultFlag = false;

        $scope.data = {
            code:$rootScope.code,
            userId:$rootScope.userLoginId,
            category:$stateParams.category,
            isShowBind:false,
            message:'',
            CDKey:'',
            billInfo:'',
            billId:'',
            title:'',
            cash:''
        };

        $scope.cancel = function(type){
            if('1' == type) {
                $state.go($rootScope.menu);
            }else{
                $scope.data.isShowBind = false;
                $scope.data.billInfo = '';
            }
        }

        $scope.initMarketBills = function(){
            if(!Tools.prototype.isEmpty($scope.marketBills)){
                angular.forEach($scope.marketBills,function(item,key){
                    if(!Tools.prototype.isEmpty($rootScope.marketInfo.billId) && item.billId == $rootScope.marketInfo.billId){
                        item.choosed = true;
                    }else{
                        item.choosed = false;
                    }
                    item.desc = '满'+item.faceValue+'元面值使用';
                    if("0" == item.consumerState && '1' == item.state && $scope.data.category.indexOf(item.templateCateId) != -1){
                        if("OCP" == $rootScope.marketInfo.marketPayType){
                            item.desc = '可支付'+item.faceValue+'元及以下面值';
                            if(parseFloat($rootScope.marketInfo.faceValue) <= parseFloat(item.cash)){
                                item.isActive = true;
                            }else{
                                item.isActive = false;
                            }
                        }else if(parseFloat($rootScope.marketInfo.faceValue) >= parseFloat(item.faceValue)){
                            item.isActive = true;
                        }else{
                            item.isActive = false;
                        }
                    }else{
                        item.isActive = false;
                    }
                });
            }else{
                $scope.marketBills = '';
            }
        }

        $scope.getMarketBills = function(){
            MarketService.getMarketBills({code:$rootScope.code,userId:$rootScope.userLoginId},function(data){
                if("success" == data.message){
                    $scope.marketBills = data.data;
                }
                $scope.initMarketBills();
            });
        }

        $scope.getMarketBills();



        $scope.chooseBill = function(billId){
            angular.forEach($scope.marketBills,function(item,key){
                if(billId == item.billId && item.isActive){
                    item.choosed = !item.choosed;
                    if(item.choosed){
                        $scope.data.billId = item.billId;
                        $scope.data.title = '-'+item.cash+'元';
                        $scope.data.cash = item.cash;
                    }else{
                        $scope.data.billId = '';
                        $scope.data.title = '不使用';
                        $scope.data.cash = '';
                    }
                }else{
                    item.choosed = false;
                }
            });
        }

        $scope.getMarketBillByCDKey = function(){
            MarketService.getMarketBillByCDKey({code:$rootScope.code,CDKey:$scope.data.CDKey,userId:$rootScope.userLoginId},function(data){
                if("success" == data.message){
                    $scope.data.billInfo = data.data[0];
                    if("OCP" == $rootScope.marketInfo.marketPayType){
                        $scope.data.billInfo.desc = '可支付'+$scope.data.billInfo.faceValue+'元及以下面值';
                    }else{
                        $scope.data.billInfo.desc = '满'+$scope.data.billInfo.faceValue+'元面值使用';
                    }
                }else if("HasBind" == data.message){
                    $scope.data.billInfo = '';
                    $scope.data.message='抵用券已绑定!';
                }else{
                    $scope.data.billInfo = '';
                    $scope.data.message='未查询到相关抵用券信息，请核对抵用券号!';
                }
                $scope.data.isShowBind = true;
            });
        }

        $scope.bindBill = function(){
            if(Tools.prototype.isEmpty($scope.data.billInfo)){
                $scope.data.billInfo = '';
                $scope.data.isShowBind = false;
                return;
            }
            MarketService.bindMarketBill({billId:$scope.data.billInfo.billId,userId:$rootScope.userLoginId},function(data){
                if("success" == data.message){
                    $scope.getMarketBills();
                    $scope.data.CDKey = '';
                    $scope.data.isShowBind = false;
                }else if("HasBind" == data.message){
                    $scope.data.billInfo = '';
                    $scope.data.message='抵用券已绑定!';
                }else{
                    $scope.data.billInfo = '';
                    $scope.data.message='抱歉，绑定失败，请稍后重试!';
                }
            });

        }

        $scope.confirm = function(){

            if(!Tools.prototype.isEmpty($scope.data.CDKey)){
                $scope.getMarketBillByCDKey();
                return;
            }

            if(!Tools.prototype.isEmpty($scope.data.billId)){
                $rootScope.marketInfo.billId = $scope.data.billId;
                $rootScope.marketInfo.title = $scope.data.title;
                $rootScope.marketInfo.cash = $scope.data.cash;
            }
            $state.go($rootScope.menu);
        }

        $ionicModal.fromTemplateUrl('../../../partials/mobile/custom/cgb/common/market-desc-bank.html', {
            scope: $scope,
            focusFirstInput: false
        }).then(function(modal) {
            $scope.model = modal;
        });

        $scope.showRules = function(){
            $scope.model.show();
        }

        $scope.agreeRules = function(){
            $scope.model.hide();
        }

        $scope.clearCDKey = function(){
            if(!Tools.prototype.isEmpty($scope.data.CDKey)){
                $scope.data.CDKey = '';
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
