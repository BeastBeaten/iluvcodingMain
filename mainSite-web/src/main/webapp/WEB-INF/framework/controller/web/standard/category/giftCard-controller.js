/**
 * Created by 沈金荣 on 16-03-28.
 */
'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.web.controller.giftCard.giftCardModule',[]);

    app.controller('GiftCardHomeCtrl', ['$scope','$stateParams','$state', '$rootScope', 'CommonService',
        function ($scope,$stateParams,$state,$rootScope, CommonService) {
        $scope.menuFlag = $stateParams.menuFlag ? $stateParams.menuFlag : '0';
        $scope.itemList = CommonService.getGiftCardListForB2C;

        $scope.goBuy = function(name){
            $state.go('giftOrder',{name:name});
         }
    }]);


    app.controller('GiftCardOrderCtrl', ['dialog','$rootScope', '$scope', '$filter', '$state', '$stateParams', '$interval','$cookieStore','CommonService','ProductService','GavinService','OrderService',
        function (dialog,$rootScope, $scope, $filter, $state, $stateParams,$interval,$cookieStore,CommonService, ProductService, GavinService,OrderService) {
         $scope.data = {
            cardName:$stateParams.name,
            orderType:'CARDPASSRECHARGE',
            cardNum:'1',
            cardNumWap:'',
            cardId:'',
            desc:'',
            isShowDesc:false,
            cash:'',
            salePrice:'',
            code:$rootScope.code,
            purNum:'',
            shortMessage:'',
            perValue:'',
            faceValue:'',
            giftName:$stateParams.name,
            hasCookie:false,
            cardNameTemp:'',
            cardStock:'0'
        };
        $scope.showDesc = function(){
            $scope.data.isShowDesc = !$scope.data.isShowDesc;
        }
        var cookiePhoneNum = $rootScope.saveCookie('userPhoneNum');
        if(!Tools.prototype.isEmpty(cookiePhoneNum)){
            $scope.data.hasCookie = true;
            $scope.data.shortMessage = cookiePhoneNum;
            $rootScope.saveCookie('userPhoneNum',null);
            $rootScope.saveCookie('userPhoneNum',cookiePhoneNum,{expires:30});
        }else{
            $scope.data.hasCookie = false;
        }
        $scope.errorData = {
            errorMsg: '',
            shortMessageError: ''
        };
        $scope.idenCodeData={
            isGet:false,
            idenCode:'',
            title:'点击获取'
        }

        var cookieSeconds = $cookieStore.get('giftCardBuySeconds');
        if(!Tools.prototype.isEmpty(cookieSeconds) && 0 < parseInt(cookieSeconds)) {
            $scope.idenCodeData.isGet = true;
            cookieSeconds = parseInt(cookieSeconds);
            var cookieTimer = $interval(function () {
                if (0 == cookieSeconds) {
                    $interval.cancel(cookieTimer);
                    $scope.idenCodeData.isGet = false;
                    $scope.idenCodeData.title = '点击获取';
                    $cookieStore.remove('giftCardBuySeconds');
                } else {
                    $scope.idenCodeData.title = '再次获取' + cookieSeconds + '';
                    cookieSeconds--;
                    $cookieStore.put('giftCardBuySeconds', cookieSeconds);
                }
            }, 1000);
        }
        $scope.clearError = function(){
            $scope.errorData.errorMsg = '';
            $scope.errorData.shortMessageError = '';
        }

        $scope.clearForm = function(type){
            if('1' == type){
                $scope.data.shortMessage = '';
            }else if('2' == type){
                $scope.idenCodeData.idenCode = '';
            }
        }
        //获取面值规格
        ProductService.getGiftCardInfo({productName:$scope.data.cardName,code:$rootScope.code}, function (data) {
            if ("success" == data.message) {
                if (null == data.data || 0 == data.data.length) {
                    $scope.faceValueList1 = {"message": "error"};
                } else {
                    $scope.faceValueList1 = [];
                    $scope.faceValueList1 = data.data;
                    angular.forEach($scope.faceValueList1, function (item, key) {
                        item.parValue = parseInt(item.faceValue);
                        item.purNum = '1-10';
                    });
                }
            } else {
                $scope.faceValueList1 = {"message": "error"};
            }
        });


        $scope.chooseFaceValue = function (productCode) {
            $scope.data.cardNumWap = '';
            $scope.errorData.errorMsg = '';
            angular.forEach($scope.faceValueList1, function (item, key) {
                if (item.productCode == productCode) {
                    $scope.faceValueList1[key].choosed = true;
                    $scope.data.cardId = item.productCode;
                    $scope.data.perValue = item.faceValue;
                    $scope.data.faceValue = item.faceValue;
                    ProductService.checkCanOrder({cardId:item.productCode,code:$rootScope.code}, function (data) {
                        if ("success" == data.message) {
                            ProductService.getGiftCardStock({cardId:item.productCode,code:$rootScope.code}, function (stockData) {
                                if ("success" == stockData.message) {
                                    angular.forEach(stockData.data, function (stockItem, key) {
                                        $scope.data.purNum=item.purNum;
                                        $scope.data.maxCardNum=item.purNum.split('-')[1];
                                        $scope.data.cardStock=stockItem.purNum;
                                    });
                                    if (parseInt($scope.data.cardStock) <= 0 || parseInt($scope.data.cardNum)>parseInt($scope.data.cardStock)) {
                                        item.stock = "0";
                                        $scope.giftSalePrice='';
                                        $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_stock;
                                    } else {
                                        if ($scope.data.purNum != '0' && $scope.data.purNum != null) {
                                            $scope.data.cardName=item.productName;
                                            ProductService.getSalePrice({cardId:item.productCode,code:$rootScope.code},function(salePriceData){
                                                if('success' == salePriceData.message){
                                                    item.price = "售价" + (salePriceData.data[0].salePrice * 1000)/1000 + "元";
                                                    item.salePrice = (salePriceData.data[0].salePrice * 1000)/1000;
                                                    $scope.inPrice=(salePriceData.data[0].salePrice * 1000)/1000;
                                                    $scope.cash=(parseFloat($scope.inPrice)*1000*parseInt($scope.data.cardNum))/1000;
                                                    $scope.data.cash=$scope.cash;
                                                    item.stock = "1";
                                                }else{
                                                    item.salePrice = '';
                                                    item.price = "缺货";
                                                }
                                            });
                                        } else {
                                            item.stock = "0";
                                            $scope.giftSalePrice='';
                                            $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_stock;
                                        }
                                    }
                                } else {
                                    item.stock = "0";
                                    $scope.giftSalePrice='';
                                    $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_stock;
                                }
                            });
                        } else {
                            item.stock = "0";
                            $scope.giftSalePrice='';
                            $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_stock;
                        }
                        item.parValue = parseInt(item.faceValue);
                    });

                    if ($rootScope.errorMsg.changeCardMsg.no_face_value == $scope.errorData.errorMsg) {
                        $scope.errorData.errorMsg = '';
                    }
                } else {
                   item.choosed = false;
                }
            });
        }

        $scope.checkCardNum = function (type) {
            if('3' == type){
                $scope.data.cardNum = $scope.data.cardNumWap;
                type = 2;
            }
            if('1' == type){
                if($scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.cardNum_format_error){
                    $scope.errorData.errorMsg = '';
                }
                $scope.data.cardNum = $scope.data.cardNum.replace(/\D/g,'');
                if(!Tools.prototype.isEmpty($scope.data.cardNum)){
                    ProductService.getGiftCardStock({cardId:$scope.data.cardId,code:$rootScope.code}, function (stockData) {
                        if ("success" == stockData.message) {
                            angular.forEach(stockData.data, function (stockItem, key) {
                                $scope.data.cardStock = stockItem.purNum;
                            });
                        }
                    });
                    var tempCardNum = parseInt($scope.data.cardNum);
                    if (tempCardNum > parseInt($scope.data.cardStock)) {
                        $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_stock;
                        return false;
                    }
                    if(tempCardNum < 1 || tempCardNum > $scope.data.maxCardNum){
                        $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.cardNum_format_error;
                        return false;
                    }else{
                        $scope.cash = (parseFloat($scope.inPrice) * 1000 * parseInt($scope.data.cardNum)) / 1000;
                        $scope.data.cash = $scope.cash;
                        $scope.errorData.errorMsg = '';
                        return true;
                    }
                }else{
                    return false;
                }
            }else if('2' == type){
                if(!Tools.prototype.isEmpty($scope.errorData.errorMsg)
                    &&  $scope.errorData.errorMsg != $rootScope.errorMsg.giftCardMsg.cardNum_format_error){
                    return false;
                }
                if($rootScope.commonUtils.isEmpty($scope.data.cardNum)){
                    return false;
                }
                if($scope.checkCardNum('1')){
                    $scope.errorData.errorMsg = '';
                    $scope.cash = (parseFloat($scope.inPrice)*1000*parseInt($scope.data.cardNum))/1000;
                }else{
                    $scope.cash = '';
                }
            }
        }

        $scope.checkShortMessage = function (type) {
            if('1' == type){
                if (Tools.prototype.isEmpty($scope.data.shortMessage)) {
                    return false;
                }
                $scope.errorData.shortMessageError = '';
                if (!Tools.prototype.isEmpty($scope.data.shortMessage)) {
                    if (/^1[3|4|5|7|8][0-9]\d{8}$/.test($scope.data.shortMessage)) {
                        $scope.errorData.shortMessageError = '';
                        return true;
                    } else {
                        $scope.errorData.shortMessageError = $rootScope.errorMsg.giftCardMsg.shortMsg_format_error;
                        return false;
                    }
                }
            }else if('2' == type){
                $scope.data.shortMessage = $scope.data.shortMessage.replace(/\D/g,'');
                if($scope.data.shortMessage.length > 11){
                    $scope.data.shortMessage = $scope.data.shortMessage.substr(0,11);
                }
                $scope.errorData.shortMessageError = '';
                $scope.errorData.errorMsg = '';
            }

        }

        $scope.updatePhoneNum = function(){
            $scope.data.hasCookie = false;
            $scope.data.shortMessage = '';
            $rootScope.saveCookie('userPhoneNum',null);
            cookieSeconds = 0;
        }

        $scope.getIdenCode = function(type){
            // type为1时，代表web端，需要弹出提示框
            if(type!=null &&type==1){
                alert("注意：本站无兼职， 请确保手机号为本人，且不要轻易把购买商品透露给其他人!");
            }
            if (Tools.prototype.isEmpty($scope.data.shortMessage)) {
                $scope.errorData.shortMessageError = $rootScope.errorMsg.giftCardMsg.no_shortMsg_or_email;
                return false;
            }
            if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test($scope.data.shortMessage)) {
                $scope.errorData.shortMessageError = $rootScope.errorMsg.giftCardMsg.shortMsg_format_error;
                return false;
            }
            if($scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.no_code_error
                    || $scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.check_code_error){
                $scope.errorData.errorMsg = '';
            }
            if(!$scope.idenCodeData.isGet){
                $scope.idenCodeData.isGet = true;
                var seconds = 59;
                var timer = $interval(function(){
                    if(0 == seconds){
                        $interval.cancel(timer);
                        $scope.idenCodeData.isGet = false;
                        $scope.idenCodeData.title = '点击获取';
                        $cookieStore.remove('giftCardBuySeconds');
                    }else{
                        $scope.idenCodeData.title='再次获取'+seconds + '';
                        seconds--;
                        $cookieStore.put('giftCardBuySeconds',seconds);
                    }
                },1000);
                if($scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.send_code_error){
                    $scope.errorData.errorMsg = '';
                }
                $scope.data.telPho=$scope.data.shortMessage;
                GavinService.sendVerifyCode($scope.data,function(data){
                    if("success" == data.message){
                        //$cookieStore.put('userPhoneNum',$scope.data.telPho);
                    }else{
                        $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.send_code_error;
                    }
                });
            }
        }

        $scope.sendVerifyCode = function(){
            $scope.errorData.errorMsg = '';
            $scope.data.telPho=$scope.data.shortMessage;
            if (Tools.prototype.isEmpty($scope.data.telPho)) {
                $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.phone_no_format_error;
                return false;
            }
            GavinService.sendVerifyCode($scope.data, function(data){
                if("success" == data.message){
                    $scope.errorData.errorMsg = '';
                }
            });

        }

        $scope.checkCode = function(){
            if($scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.no_code_error || $scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.check_code_error){
                $scope.errorData.errorMsg = '';
            }
        }

        $scope.submitForm = function () {
            if (!Tools.prototype.isEmpty($scope.errorData.shortMessageError)
                    || !Tools.prototype.isEmpty($scope.errorData.errorMsg)
                    || !Tools.prototype.isEmpty($scope.errorData.cardNumError)) {
                return false;
            }
            if (Tools.prototype.isEmpty($scope.data.perValue)) {
                $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_face_value;
                return false;
            }
            if (!$scope.checkCardNum('1')) {
                $scope.errorData.cardNumError = $rootScope.errorMsg.giftCardMsg.cardNum_format_error;
                return false;
            }

            if (Tools.prototype.isEmpty($scope.data.shortMessage)) {
                $scope.errorData.shortMessageError = $rootScope.errorMsg.giftCardMsg.no_shortMsg_or_email;
                return false;
            }else if(!$scope.checkShortMessage('1')){
                return false;
            }

            if(!$scope.data.hasCookie && Tools.prototype.isEmpty($scope.idenCodeData.idenCode)){
                $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_code_error;
                return false;
            }
            //传递正确名称的下单参数
            $scope.data.telPho=$scope.data.shortMessage;
            if(!$scope.data.hasCookie){
                //传递正确名称的下单参数
                $scope.data.verifyCode = $scope.idenCodeData.idenCode;
                $scope.data.cardNameTemp=$scope.data.cardName;
                GavinService.checkVerifyCode($scope.data,function(data){
                    if('success' == data.message){
                        //$cookieStore.put('userPhoneNum',$scope.data.shortMessage);
                        $rootScope.saveCookie('userPhoneNum',null);
                        $rootScope.saveCookie('userPhoneNum',$scope.data.shortMessage,{expires:30});
                        ProductService.checkCanOrder({cardId:$scope.data.cardId,code:$rootScope.code}, function (data) {
                            if ("success" == data.message) {
                                $scope.data.searchRoute = 'giftOrderSearch';
                                // 生成销售订单
                                OrderService.takeWebSaleOrder($scope.data,function (data1) {
                                    // 下销售单成功
                                    if("success" == data1.message && 0 < data1.data.length) {
                                        $scope.data.billId = data1.data[0].billId;
                                        // 跳转支付确认页面
                                        $state.go("orderpay",{orderForm:Tools.prototype.putParams($scope.data)});
                                    }
                                });
                            } else {
                                $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_stock;
                            }
                        });
                    }else{
                        $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.check_code_error;
                    }
                });
            }else{
                ProductService.checkCanOrder({cardId:$scope.data.cardId,code:$rootScope.code}, function (data) {
                    if ("success" == data.message) {
                        $scope.data.searchRoute = 'giftOrderSearch';
                        $scope.data.cash = $scope.cash;
                        // 生成销售订单
                        OrderService.takeWebSaleOrder($scope.data,function (data1) {
                            // 下销售单成功
                            if("success" == data1.message && 0 < data1.data.length) {
                                $scope.data.billId = data1.data[0].billId;
                                // 跳转支付确认页面
                                $state.go("orderpay",{orderForm:Tools.prototype.putParams($scope.data)});
                            }
                        });
                    } else {
                        $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_stock;
                    }
                });
            }
        }

    }]);

    app.controller('GiftCardSearchCtrl',['dialog','$rootScope','$scope','$state','$stateParams','$interval','$cookieStore','CommonService','$compile','OrderService','GavinService',"ProductService",
        function(dialog,$rootScope,$scope,$state,$stateParams,$interval,$cookieStore,CommonService,$compile,OrderService,GavinService, ProductService){
        $scope.menuFlag = $stateParams.menuFlag ? $stateParams.menuFlag : '0';
        $scope.orderForm = {
            telPho:'',
            hasCookie:false,
            searchFlag:false
        };
        $scope.errorData = {
            errorMsg:'',
            phoneErrorMsg:''
        };
        $scope.idenCodeData={
            isGet:false,
            idenCode:'',
            title:'获取验证码'
        }
        var cookieSeconds = $cookieStore.get('giftCardSearchSeconds');
        if(!Tools.prototype.isEmpty(cookieSeconds) && 0 < parseInt(cookieSeconds)){
            $scope.idenCodeData.isGet = true;
            cookieSeconds = parseInt(cookieSeconds);
            var cookieTimer = $interval(function(){
                if(0 == cookieSeconds){
                    $interval.cancel(cookieTimer);
                    $scope.idenCodeData.isGet = false;
                    $scope.idenCodeData.title = '获取验证码';
                    $cookieStore.remove('giftCardSearchSeconds');
                }else{
                    $scope.idenCodeData.title='再次获取'+cookieSeconds + '';
                    cookieSeconds--;
                    $cookieStore.put('giftCardSearchSeconds',cookieSeconds);
                }
            },1000);
        }
        var cookiePhoneNum = $cookieStore.get('userPhoneNum');
        if(!Tools.prototype.isEmpty(cookiePhoneNum)){
            $scope.orderForm.hasCookie = true;
            $scope.orderForm.telPho = cookiePhoneNum;
        }else{
            $scope.orderForm.hasCookie = false;
        }
        $scope.updatePhoneNum = function(){
            $scope.orderForm.hasCookie = false;
            $scope.orderForm.telPho = '';
            $cookieStore.remove('userPhoneNum');
        }
        $scope.checkCode = function(){
            if($scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.no_code_error || $scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.check_code_error){
                $scope.errorData.errorMsg = '';
            }
        }
        $scope.checkAccount = function (type) {
            if('1' == type){
                if (Tools.prototype.isEmpty($scope.orderForm.telPho)) {
                    return false;
                }
                $scope.errorData.error = '';
                if (/^1[3|4|5|7|8][0-9]\d{8}$/.test($scope.orderForm.telPho)) {
                    $scope.errorData.phoneErrorMsg = '';
                    return true;
                } else {
                    $scope.errorData.phoneErrorMsg = $rootScope.errorMsg.giftCardMsg.shortMsg_format_error;
                    return false;
                }
            }else if('2' == type){
                $scope.orderForm.telPho = $scope.orderForm.telPho.replace(/\D/g,'');
                if($scope.orderForm.telPho.length > 11){
                    $scope.orderForm.telPho = $scope.orderForm.telPho.substr(0,11);
                }
                $scope.errorData.phoneErrorMsg = '';
            }

        }
        $scope.getIdenCode = function(){
            if (Tools.prototype.isEmpty($scope.orderForm.telPho)) {
                $scope.errorData.phoneErrorMsg = $rootScope.errorMsg.giftCardMsg.no_shortMsg_or_email;
                return false;
            }
            if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test($scope.orderForm.telPho)) {
                $scope.errorData.phoneErrorMsg = $rootScope.errorMsg.giftCardMsg.shortMsg_format_error;
                return false;
            }
            if($scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.no_code_error
                    || $scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.check_code_error){
                $scope.errorData.errorMsg = '';
            }
            if(!$scope.idenCodeData.isGet){
                $scope.idenCodeData.isGet = true;
                var seconds = 59;
                var timer = $interval(function(){
                    if(0 == seconds){
                        $interval.cancel(timer);
                        $scope.idenCodeData.isGet = false;
                        $scope.idenCodeData.title = '获取验证码';
                        $cookieStore.remove('giftCardSearchSeconds');
                    }else{
                        $scope.idenCodeData.title=seconds + '秒后重新获取验证码';
                        seconds--;
                        $cookieStore.put('giftCardSearchSeconds',seconds);
                    }
                },1000);
                if($scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.send_code_error){
                    $scope.errorData.errorMsg = '';
                }
                GavinService.sendVerifyCode($scope.orderForm,function(data){
                    if("success" == data.message){
                        $scope.errorData.errorMsg = '';
                    }else{
                        $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.send_code_error;
                    }
                });
            }
        }
        $scope.search = function(){
            if(!Tools.prototype.isEmpty($scope.errorData.phoneErrorMsg)
                    || !Tools.prototype.isEmpty($scope.errorData.errorMsg)){
                return false;
            }
            if (Tools.prototype.isEmpty($scope.orderForm.telPho)) {
                $scope.errorData.phoneErrorMsg = $rootScope.errorMsg.giftCardMsg.no_shortMsg_or_email;
                return false;
            }

            if(!$scope.orderForm.hasCookie && Tools.prototype.isEmpty($scope.idenCodeData.idenCode)){
                $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_code_error;

                return false;
            }
            $("#dataTable").refreshData();
            $scope.orderForm.searchFlag = true;
        }
        $scope.reset = function(){
            $scope.orderForm = {
                tid:'',
                telPho:'',
                searchFlag:false
            };
            $scope.errorData = {
                errorMsg:'',
                phoneErrorMsg:''
            };
            $scope.idenCodeData={
                isGet:false,
                idenCode:'',
                title:'获取验证码'
            }
            $("#dataTable").refreshData();
        }
        $scope.hideCardDetail = function(){
            $scope.errorData.queryCardError = '';
            $scope.cardDetail = {};
        }
        $("#dataTable").dataTables({
            "sDom":'<"top"i>rt<"bottom"lp>',
            "bSort":false,
            "bLengthChange":false,
            "iDisplayLength":5,
            "bProcessing":false,
            "sAjaxSource":"/web/orderList",
            "fnServerData":function(sSource,aoData,fnCallback){
                if(!Tools.prototype.isEmpty($scope.orderForm.telPho)){
                    var temp = [{name:"rechargeAccount",value:$scope.orderForm.telPho},{name:'verifyCode',value:$scope.idenCodeData.idenCode},{name:'hasCookie',value:$scope.orderForm.hasCookie},{name:'code',value:$rootScope.code}];
                    var postData = aoData.concat(temp);
                    $.post(sSource,postData,function(json){
                        $cookieStore.put('userPhoneNum',$scope.orderForm.telPho);
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
                "mDataProp":function(aData,type,val){
                    val = aData.telpho;
                    if (val=='' || val==null) {
                        val = aData.gameCount;
                    }
                    return val;
                }
            },{
                "mDataProp":"cash"
            },{
                "mDataProp":function(aData,type,val){
                    val = '';
                    return val;
                }
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
                        searchRoute:'giftOrderSearch',
                        facePric:aData.facePric
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
                angular.element(tds[tds.length-2]).append(orderStateElement);
            },
            "oLanguage": {
                "sLengthMenu": "每页显示 _MENU_ 笔",
                "sInfo": "当前第 _START_ - _END_ 笔　共计 _TOTAL_ 笔"
            }
        });
        $scope.rePay = function(index){
            $state.go('orderpay',{orderForm:Tools.prototype.putParams($scope.rePayFormList[index])});
        }

    }]);
});
