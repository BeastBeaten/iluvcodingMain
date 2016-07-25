/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.web.controller.common.commonModule',[]);

    // 订单支付页面
    app.controller('OrderPayCtrl',['$rootScope','$scope','$state','$stateParams','$cookieStore','CommonService','PayService',function($rootScope,$scope,$state,$stateParams,$cookieStore,CommonService,PayService){
        $scope.orderForm = Tools.prototype.getParams($stateParams.orderForm);
        $scope.data = {
            orderNo:$scope.orderForm.billId,
            bankTypeId:1,
            isBankType:true,
            gameCount:'',
            marketBillId:'',
            billCash:'',
            code:$rootScope.code,
            cardName:$scope.orderForm.cardName,
            billId:$scope.orderForm.billId
        };
        $scope.errorData = {
            errorMsg:'',
            showPay:'0'
        }

        $scope.bankList = $rootScope.userData.payList;

        $scope.chooseBankType = function(type){
            $scope.data.bankTypeId = type;
            if(3 == type){
                // 暂时空
            }else if(1 == type){
                $scope.getTotalPay($scope.bankList[0]);
            }
        }

        $scope.chooseBank = function(bank){
            $scope.getTotalPay(bank);
        }

        $scope.getTotalPay = function(bank){
            $scope.data.bankCode = bank.bankCode;
            $scope.data.payTypeId = bank.payTypeId;
            if(bank.bankCode == "0435"){
                $scope.data.gameCount = $scope.orderForm.gameCount;
            }
            $scope.data.acctPayAmount = parseFloat($scope.orderForm.cash);
            $scope.data.acctPayAmount = Math.round($scope.data.acctPayAmount*1000)/1000;
        }
        if(!Tools.prototype.isEmpty($scope.bankList)){
            $scope.getTotalPay($scope.bankList[0]);
        }

        $scope.pay = function(){
            if(''!= $scope.errorData.errorMsg){
                return;
            }
            $scope.errorData.showPay = '1';
        }

        $scope.closePayWindow = function(){
            $scope.errorData.showPay = '0';
            $state.go($scope.orderForm.searchRoute,{tid:$scope.data.orderNo});
        }

        $scope.goSearch = function(){
            $scope.errorData.showPay = '0';
            $state.go($scope.orderForm.searchRoute,{tid:$scope.data.orderNo});
        }
    }]);

    // 根据充值账号查询订单页面
    app.controller('PhoneOrderSearchCtrl',['dialog','$rootScope','$scope','$state','$stateParams','CommonService','$compile','OrderService',function(dialog,$rootScope,$scope,$state,$stateParams,CommonService,$compile,OrderService){
        $scope.rePay = function(index){
            $state.go('orderpay',{orderForm:Tools.prototype.putParams($scope.rePayFormList[index])});
        };
        $scope.orderForm = {
            tid:$stateParams.tid,
            rechargeAccount:''
        };
        $scope.errorData = {
            errorMsg:''
        };
        $scope.rePayFormList = [];
        if(!Tools.prototype.isEmpty($scope.orderForm.tid)){
            $scope.orderForm.searchFlag = true;
        }else{
            $scope.orderForm.searchFlag = false;
        }
        $scope.search = function(){
            if(!Tools.prototype.isEmpty($scope.errorData.errorMsg)){
                return false;
            }
            if(Tools.prototype.isEmpty($scope.orderForm.rechargeAccount)){
                $scope.errorData.errorMsg = $rootScope.errorMsg.searchMsg.no_account;
            }else{
                $("#dataTable").refreshData();
                $scope.orderForm.searchFlag = true;
            }
        }
        $scope.reset = function(){
            $scope.orderForm = {
                tid:'',
                rechargeAccount:'',
                searchFlag:false
            };
            $scope.errorData = {
                errorMsg:''
            };
            $("#dataTable").refreshData();
        }

        // 校验手机号
        $scope.checkAccount = function(){
            if(!Tools.prototype.isEmpty($scope.orderForm.rechargeAccount)){
                $scope.errorData.errorMsg = '';
                if (!Tools.prototype.isMobileNo($scope.orderForm.rechargeAccount)) {
                    $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.phone_format_error;
                    return false;
                } else {
                    $scope.errorData.errorMsg = ''
                    $scope.orderForm.searchFlag = true;
                    return true;
                }
            }
            else {
                $scope.errorData.errorMsg = '';
            }
        }

        // 校验加油卡账号
        $scope.checkGasAccount = function(){
            if(!Tools.prototype.isEmpty($scope.orderForm.rechargeAccount)){
                $scope.errorData.errorMsg = '';
                if(!/^(100011)\d{13}$/.test($scope.orderForm.rechargeAccount) && !/^(9)\d{15}$/.test($scope.orderForm.rechargeAccount)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.oilNO_format_error;
                }
            }else {
                $scope.errorData.errorMsg = '';
            }
        }

        $("#dataTable").dataTables({
            "sDom":'<"top"i>rt<"bottom"lp>',
            "bSort":false,
            "bLengthChange":false,
            "iDisplayLength":5,
            "bProcessing":false,
            "sAjaxSource":"/web/orderList",
            "fnServerData":function(sSource,aoData,fnCallback){
                if(!Tools.prototype.isEmpty($scope.orderForm.tid) || !Tools.prototype.isEmpty($scope.orderForm.rechargeAccount)){
                    var temp = null;
                    if(!Tools.prototype.isEmpty($scope.orderForm.rechargeAccount)){
                        temp = [{name:"rechargeAccount",value:$scope.orderForm.rechargeAccount},{name:'code',value:$rootScope.code}];
                    }else if(!$rootScope.commonUtils.isEmpty($scope.orderForm.tid) ){
                        temp = [{name:"tid",value:$scope.orderForm.tid},{name:'code',value:$rootScope.code}];
                    }
                    var postData = aoData.concat(temp);
                    $.post(sSource,postData,function(json){
                        fnCallback(json.data);
                    },"json");
                }else{
                    var returnData = eval('({"iTotalDisplayRecords":0,"iTotalRecords":0,"aaData":[]})');
                    fnCallback(returnData);
                }
            },
            "aoColumns":[{
                "mDataProp":"billId"
            },{
                "mDataProp":"orderTime"
            },{
                "mDataProp":"cardName"
            },{
                "mDataProp":"cardNum"
            },{
                "mDataProp":"gameCount"
            },{
                "mDataProp":"cash"
            },{
                "mDataProp":function(aData,type,val){
                    val = '';
                    return val;
                }
            }],
            "fnRowCallback":function(nRow,aData,iDisplayIndex,iDisplayIndexFull){
                var tds = $(nRow).find('td');
                var orderState = '';
                var orderStateElement;
                if(0 == iDisplayIndex){
                    $scope.rePayFormList = [];
                }
                tds = $(nRow).find('td');
                if(0 == aData.billStat){
                    $scope.rePayForm = {
                        cardName:aData.cardName,
                        orderTime:aData.orderTime,
                        cash:aData.cash,
                        billId:aData.billId,
                        gameCount:aData.gameCount,
                        battleAccount:aData.battleAccount,
                        telpho:aData.telpho,
                        email:aData.email,
                        cardNum:aData.cardNum,
                        searchRoute:'orderSearch',
                        facePric:aData.facePric,
                        platform:'web'
                    };
                    $scope.rePayFormList.push($scope.rePayForm);
                    orderState = '<a href="javascript:void(0)" ng-click = "rePay('+($scope.rePayFormList.length-1)+')">待付款</a>';
                }else{
                    if(1 == aData.already){
                        orderState = '<span>成功</span>';
                    }else if (0 == aData.already){
                        orderState = '<span>充值中</span>';
                    }else if (9 == aData.already){
                        orderState = '<span>成功退款</span>';
                    }
                    else{
                        orderState = '<span>失败</span>';
                    }
                }

                orderStateElement = $compile(orderState)($scope);
                angular.element(tds[tds.length-1]).append(orderStateElement);

            },
            "oLanguage": {
                "sLengthMenu": "每页显示 _MENU_ 笔",
                "sInfo": "当前第 _START_ - _END_ 笔　共计 _TOTAL_ 笔"
            }
        });

    }]);
});
