/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.gas.gasModule',[]);

    app.controller('GasRechargeCtrl',['$rootScope','$scope','$ionicModal','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','OrderService','PayService','MemberService','MenuService','CGBOrderService',
        function($rootScope,$scope,$ionicModal,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,OrderService,PayService,MemberService,MenuService,CGBOrderService){
        $rootScope.menu = 'gasrecharge';
        $rootScope.curRouter = $rootScope.menu;
        $rootScope.rechargeDesc =  MenuService.gasrecharge.desc;

        $scope.data = {
            gasCardNo:'',
            cno:'1',
            gasCardName:'',
            gasCardTel:'',
            getOilFlag:false,
            cardNum:'',
            cash:'',
            isOneFaceValue:false,
            gasCardIsNoUse:'',
            hasCookie:false,
            showCookie:false,
            showNumInput:false,
            isSinopec:true,
            isFirstInit:true,
            arbitraryAmount:'',
            cardType:'',
            canCleanHistory:true,
            payBtnName:'立即支付',
            type:$stateParams.type
        };


        $scope.cookieNos = [];

        $scope.orderForm = {
            orderType:'GASRECHARGE',
            cardNum:'1',
            cardType:0,
            cardId:'',
            perValue:'',
            memberId:$rootScope.userLoginId,
            platform:'Mobile',
            code:$rootScope.code
        };

        $scope.payList = $rootScope.userData.payList;

        $scope.isAndroidClient = Tools.prototype.isAndroid();
        $scope.isIosClient = Tools.prototype.isIos();

            //提示蒙层
        $ionicModal.fromTemplateUrl('../../../partials/mobile/custom/ccb/gas/prompt.html', {
            scope: $scope,
            focusFirstInput: false
        }).then(function(modal) {
            $scope.model = modal;
        });

        $scope.faceValueList = CGBOrderService.getFaceValueForGasRecharge;

        $scope.clearArbitraryAmountError = function(type){
            if('1' == type){
                //focus
                $scope.clearError(4);
                $('#arbitrarycharge')[0].placeholder="";
                $scope.data.cash = '';
                angular.forEach($scope.faceValueList, function (item, key) {
                    item.choosed =false;
                });
            }else if('2' == type){
                //blur
                if(Tools.prototype.isEmpty($scope.data.arbitraryAmount)){
                    $('#arbitrarycharge')[0].placeholder="任意充";
                    $scope.errorData.errorMsg = '';
                }
            }
        }

        $scope.clearFaceValue = function(){
            angular.forEach($scope.faceValueList,function(item,key){
                item.stock = false;
                item.choosed =false;
                item.price = '';
                item.productCode = '';
            });

            $scope.orderForm.cardId = '';
            $scope.orderForm.perValue = '';

            if(!Tools.prototype.isEmpty($scope.data.arbitraryAmount)){
                $scope.data.arbitraryAmount = "";
                $('#arbitrarycharge')[0].placeholder="任意充";
                $('#arbitrarycharge').blur();
            }
        }

       /** $scope.itemList = [{id:'3130923',name:'全国中石油加油卡任意充',selected:false,icon:'oil-cc01'},
            {id:'2185601',name:'全国中石化加油卡任意充',selected:false,icon:'oil-cc'},
            {id:'2593403',name:'全国中石化加油卡直充',selected:true,icon:'oil-cc'}];   */


        $scope.gasCardNoFormat = /^(100011)\d{13}$/;
        $scope.gasCardNoLength = 19;

        $scope.errorData = {
            oilNOMsg:'',
            errorMsg:'',
            agreementMsg:'',
            cardMsg:'',
            orderMsg:'',
            popMsg:''
        };

        $scope.displayHistory = function(){
            if(Tools.prototype.isEmpty($scope.cookieNos)){
                $scope.data.hasCookie = false;
                $scope.gasCardNos = '';
            }else{
                $scope.data.hasCookie = true;
                $scope.gasCardNos = JSON.parse('['+ $scope.cookieNos + ']');
            }

        }

        $scope.getHistory = function(){
            // 用户登陆过，从用户信息表中取缓存号码
            if(!Tools.prototype.isEmpty($rootScope.userLoginId)){
                MemberService.getCasheUserInfo({randomId:$rootScope.userLoginId},function(data){
                    if('success' == data.message && 0 < data.data.length){
                        $scope.cookieNos = data.data[0].gasCardNos;
                        $scope.data.canCleanHistory = false;
                        $scope.displayHistory();
                    }
                });
            }else{
                $scope.cookieNos = Tools.prototype.saveCookie("gasCardNos");
                $scope.displayHistory();
            }
        }

        $scope.getHistory();

        $scope.showCookie = function(){
            $scope.getHistory();
            $scope.data.showCookie = !$scope.data.showCookie;
        }

        $scope.clearCookie = function(){
            Tools.prototype.saveCookie("gasCardNos", null);
            $scope.data.hasCookie = false;
            $scope.data.showCookie = false;

        }

        $scope.clearError = function(type){
            if('1' == type){
                //focus
                $('#gasCardNo')[0].placeholder="";
                $scope.data.showCookie=false;
            }else if('2' == type){
                //blur
                if(Tools.prototype.isEmpty($scope.data.gasCardNo)){
                    $('#gasCardNo')[0].placeholder="请输入加油卡";
                }
                $scope.data.showCookie = false;
            }else if('3' == type){
                //clear phoneno
                $scope.data.gasCardNo = '';
                $scope.data.showCookie = false;
                $scope.errorData.oilNOMsg='';
                $scope.errorData.errorMsg = '';
                $scope.data.gasCardName = '';
                $scope.errorData.agreementMsg = '';
                $scope.errorData.orderMsg = '';
                $scope.errorData.cardMsg = '';
                $scope.clearFaceValue();
            }else if('4' == type){
                //clear msg
                $scope.errorData.oilNOMsg='';
                $scope.errorData.errorMsg = '';
                $scope.errorData.agreementMsg = '';
                $scope.errorData.orderMsg = '';
                $scope.errorData.cardMsg = '';
            }
        }



        $scope.chooseGasCardNo = function(gasCardNo){
            $scope.data.gasCardNo = gasCardNo;
            $scope.data.showCookie = false;
            $scope.checkOilNO('1');
        }

        $scope.gasCardNoFormat = /^(100011)\d{13}$/;

        $scope.gasCardNoLength = 19;
        $scope.checkOilNO = function(type){
            $scope.clearError(4);
            $scope.data.gasCardName = "";
            if('1' == type){
                $scope.errorData.oilNOMsg = '';
                $scope.errorData.errorMsg = '';
                $scope.errorData.agreementMsg = '';
                $scope.errorData.orderMsg = '';
                $scope.errorData.cardMsg = '';
                $scope.data.gasCardNo = $scope.data.gasCardNo.replace(/\D/g,'');
                if(!Tools.prototype.isEmpty($scope.data.gasCardNo)){

                    $scope.initFormat($scope.data.gasCardNo);
                    if($scope.data.gasCardNo.length > $scope.gasCardNoLength){
                        $scope.data.gasCardNo = $scope.data.gasCardNo.substr(0,$scope.gasCardNoLength);
                    }

                    if($scope.data.gasCardNo.length == $scope.gasCardNoLength){
                        $("#gasCardNo").blur();
                        $scope.clearFaceValue();
                        if($scope.gasCardNoFormat.test($scope.data.gasCardNo)){
                            $scope.errorData.oilNOMsg = '';
                            $scope.data.isFirstInit = false;
                            return true;
                        }else{
                            $scope.errorData.oilNOMsg = MessageService.errorMsg.commonMsg.oilNO_format_error;
                            $scope.errorData.popMsg = $scope.errorData.oilNOMsg;
                            $scope.model.show();
                            return false;
                        }
                    }
                }else{
                    return false;
                }
            }else if('2' == type){
                if(Tools.prototype.isEmpty($scope.data.gasCardNo)){
                    return false;
                }
                $scope.initFormat($scope.data.gasCardNo);

                if(!$scope.gasCardNoFormat.test($scope.data.gasCardNo)){
                    $scope.errorData.oilNOMsg = MessageService.errorMsg.commonMsg.oilNO_format_error;
                    $scope.errorData.popMsg = $scope.errorData.oilNOMsg;
                    $scope.model.show();
                    return false;
                }else{
                    $scope.errorData.oilNOMsg = '';
                }
                $scope.searchOil();
                return true;
            }else if('3' == type){
                if(Tools.prototype.isEmpty($scope.data.gasCardNo)){
                    return false;
                }
                $scope.initFormat($scope.data.gasCardNo);

                if(!$scope.gasCardNoFormat.test($scope.data.gasCardNo)){
                    $scope.errorData.oilNOMsg = MessageService.errorMsg.commonMsg.oilNO_format_error;
                    $scope.errorData.popMsg = $scope.errorData.oilNOMsg;
                    $scope.model.show();
                    return false;
                }else{
                    $scope.errorData.oilNOMsg = '';
                }

                return true;
            }
        }

        $scope.checkHistoryNoList = function(currentGasCradNo){
            if ($scope.gasCardNos && $scope.gasCardNos.length > 0){
                for (var i = 0; i< $scope.gasCardNos.length; i++){
                    if ($scope.gasCardNos[i].gasCardNo == currentGasCradNo){
                        return false;
                    }
                }

            }
            if ($scope.gasCardNos && $scope.gasCardNos.length >= 5){
                $scope.gasCardNos.splice(4,$scope.gasCardNos.length);

                $scope.cookieNos = "";

                for(var i = 0; i< $scope.gasCardNos.length; i++){
                    var temp = {gasCardNo:$scope.gasCardNos[i].gasCardNo, gasCardName:$scope.gasCardNos[i].gasCardName};
                   if(i == 3){
                       $scope.cookieNos += JSON.stringify(temp);
                   }else{
                       $scope.cookieNos += JSON.stringify(temp) + ",";
                   }
                }

            }
            return true;

        }

        $scope.initFormat = function(gasCardNo){
            if(gasCardNo.slice(0,1) == '1'){
                $scope.gasCardNoFormat = /^(100011)\d{13}$/;
                $scope.gasCardNoLength = 19;
            }else{
                $scope.gasCardNoFormat = /^(9)\d{15}$/;
                $scope.gasCardNoLength = 16;
            }

        }


        $scope.cancle = function(){
            $scope.model.hide();
            $scope.clearFaceValue();
            $scope.data.isFirstInit = true;
        }

        $scope.confirm = function(){
            $scope.model.hide();
        }

        $scope.searchOil = function(){
            if(Tools.prototype.isEmpty($scope.data.gasCardNo)){
                $scope.errorData.oilNOMsg = MessageService.errorMsg.commonMsg.no_oilNo;
                $scope.errorData.popMsg = $scope.errorData.oilNOMsg;
                $scope.model.show();
                return false;
            }
            $scope.data.getOilFlag = true;
            $scope.data.oilNO = $scope.data.gasCardNo;
            $cookieStore.remove("gasRechargeNo");
            $cookieStore.put("gasRechargeNo",$scope.data.gasCardNo);
            if($scope.data.oilNO.slice(0,1) == '1'){
                $scope.data.cno = '1';
            }else{
                $scope.data.cno = '2';
            }
            ProductService.getGasCardInfo($scope.data,function(data){
                $scope.data.getOilFlag = false;
                if('success' == data.message && 0 < data.data.length){
                    $scope.errorData.errorMsg = '';
                    var cardInfos = data.data[0].peUserName.split(";");
                    if(1 < cardInfos.length){
                        if('0' == cardInfos[0]){
                            if($scope.data.gasCardNo.slice(0,1) == '1'){
                                $scope.data.gasCardName = "中石化 ";
                            }else{
                                $scope.data.gasCardName = "中石油 "
                            }
                            $scope.data.gasCardName += cardInfos[1];
                        }else{
                            $scope.data.gasCardName = '';
                        }

                        if('1' == cardInfos[0]){
                            $scope.data.gasCardIsNoUse = cardInfos[1];
                        }else{
                            $scope.data.gasCardIsNoUse = '';
                        }

                        if ('1' == cardInfos[0]){
                            $scope.errorData.popMsg = '未查询到用户信息,请确认卡号无误';
                            $scope.model.show();

                        }
                        // 查询加油卡面值
                        if($scope.data.gasCardNo.slice(0,1) == '1') {
                            $scope.getFaceValueList("1");
                        }else{
                            $scope.getFaceValueList("2");
                        }
                        $cookieStore.remove("gasRechargeInfo");
                        $cookieStore.put("gasRechargeInfo",$scope.data.gasCardName);
                        return true;
                    }else{
                        $scope.errorData.popMsg = '未查询到用户信息,请确认卡号无误';
                        $scope.model.show();
                        return false;
                    }
                }else{
                    $scope.errorData.popMsg = '未查询到用户信息,请确认卡号无误';
                    $scope.model.show();
                    return false;

                }
            });
            return false;
        }

        /**
         *gasRechargeType
         * 1：中石化
         * 2：中石油
         */
        $scope.getFaceValueList = function(gasRechargeType){
            ProductService.getGasCardProductInfo(gasRechargeType,function(data){
                $scope.data.isFirstInit = false;
                if('success' == data.message && 0 < data.data.length){
                    angular.forEach($scope.faceValueList,function(item,key){
                        angular.forEach(data.data, function(dataItem,key){

                            // 屏蔽中石油固定面值商品
                            if("2" == gasRechargeType){
                                if(item.faceValue == '1' && dataItem.faceValue == '1'){
                                    item.productCode = dataItem.productCode;
                                }
                            }else{
                                if(item.faceValue == dataItem.faceValue){
                                    item.productCode = dataItem.productCode;
                                }
                            }

                        });
                        item.stock = false;
                        item.choosed = false;
                        if("2" == gasRechargeType && item.faceValue != '1'){
                            item.productCode = '';
                        }
                        if(!Tools.prototype.isEmpty(item.productCode)){
                            ProductService.checkCanOrder({cardId:item.productCode,code:$rootScope.code}, function (orderCheckData) {
                                if ("success" == orderCheckData.message) {
                                    ProductService.getSalePrice({cardId:item.productCode,code:$rootScope.code},function(salePriceData){
                                        if('success' == salePriceData.message){
                                            item.price = "售价" + (salePriceData.data[0].salePrice * 1000)/1000 + "元";
                                            item.salePrice = (salePriceData.data[0].salePrice * 1000)/1000;
                                            if(item.isOneFaceValue){
                                                $scope.data.price = (salePriceData.data[0].salePrice * 1000)/1000;
                                            }
                                        }else{
                                            item.salePrice = '';
                                            item.price = "缺货";
                                        }
                                    });
                                    item.stock = true;


                                } else {
                                    item.price = "缺货";
                                }
                            });
                        }else{
                            item.price = "缺货";
                        }

                    });
                }
                else {
                    angular.forEach($scope.faceValueList, function (item, key) {
                        item.stock = false;
                        item.choosed = false;
                        item.price = "缺货";
                    });
                    }
                });
        }

        $scope.setPayBtnName =function(){
            if(!Tools.prototype.isEmpty($scope.data.cash) && parseFloat($scope.data.cash) > 300){
                $scope.data.payBtnName = 'KEY令支付';
            }else{
                $scope.data.payBtnName = '立即支付';
            }
        }

        $scope.chooseValue = function (chooseItem) {
            $scope.clearError();
            $scope.orderForm.cardNum = '1';
            if(!Tools.prototype.isEmpty($scope.data.arbitraryAmount)){
                $scope.data.arbitraryAmount = "";
                $('#arbitrarycharge')[0].placeholder="任意充";
            }
            if(chooseItem.productCode != $scope.orderForm.cardId){
                $rootScope.initMarketInfo();
            }
            angular.forEach($scope.faceValueList, function (item, key) {
                if (item.productCode == chooseItem.productCode) {
                    if(item.stock){
                        $scope.faceValueList[key].choosed = true;
                        $scope.orderForm.cardId = item.productCode;
                        $scope.orderForm.perValue = item.faceValue;
                        $scope.data.cash = item.salePrice;
                        $scope.setPayBtnName();
                        $rootScope.marketInfo.faceValue = $scope.orderForm.perValue;
                        $rootScope.marketInfo.getDefaultFlag = true;
                        $rootScope.getDefaultMarketBill($scope,'5');
                    }else{
                        $scope.faceValueList[key].choosed = false;
                        $scope.orderForm.cardId = '';
                        $scope.orderForm.perValue = '';
                        $scope.data.cash = '';
                        $rootScope.marketInfo.faceValue = '';
                    }
                } else {
                    $scope.faceValueList[key].choosed = false;
                }
            });
            $scope.clearError('4');
        }

        $scope.checkArbitraryAmount = function (type) {
            angular.forEach($scope.faceValueList, function (item, key) {
                    $scope.orderForm.cardId = "";
                    $scope.orderForm.perValue = "";
                    $scope.data.cash = '';
                    $scope.faceValueList[key].choosed = false;
            });
            if(type == 3){
                if(Tools.prototype.isEmpty($scope.data.arbitraryAmount)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_charge_amount;
                }
                type = 2;
            }
            if('1' == type){

                if($scope.errorData.errorMsg == MessageService.errorMsg.commonMsg.wrong_charge_amount){
                    $scope.errorData.errorMsg = '';
                }
                $scope.data.arbitraryAmount = $scope.data.arbitraryAmount.replace(/\D/g,'');
                if(!Tools.prototype.isEmpty($scope.data.arbitraryAmount)){
                    var tempCardNum = parseInt($scope.data.arbitraryAmount);
                    var flag = false;
                    if(tempCardNum >= 1 && tempCardNum <= 2000){
                        flag = true;
                    }
                    if(!flag){
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.wrong_charge_amount+'，有效购买金额2000以内！';
                        $scope.data.arbitraryAmount = '';
                    }else{
                        $scope.errorData.errorMsg = '';
                        angular.forEach($scope.faceValueList, function (item, key) {
                            if (item.isOneFaceValue) {
                                $scope.orderForm.cardId = item.productCode;
                                $scope.orderForm.perValue = item.faceValue;
                                if(Tools.prototype.isEmpty($scope.data.price) && !Tools.prototype.isEmpty(item.salePrice)){
                                    $scope.data.price = item.salePrice;
                                }
                            } else {
                                $scope.faceValueList[key].choosed = false;
                            }
                        });
                        $scope.orderForm.cardNum = $scope.data.arbitraryAmount;

                        $scope.data.total = "售价" + parseFloat((($scope.data.price *1000 * $scope.data.arbitraryAmount)/1000).toFixed(3)) + "元";

                        $scope.data.cash = parseFloat((($scope.data.price *1000 * $scope.data.arbitraryAmount)/1000).toFixed(3));

                        $scope.setPayBtnName();
                    }
                    return flag;
                }else{
                    $scope.data.cash = '';
                    return false;
                }
            }else if('2' == type){
                if(!Tools.prototype.isEmpty($scope.errorData.errorMsg) &&  $scope.errorData.errorMsg != MessageService.errorMsg.commonMsg.wrong_charge_amount){
                    return false;
                }
                if($scope.checkArbitraryAmount('1')){
                    $scope.errorData.errorMsg = '';
                }
            }
        }

        $scope.useMarketBill = function(category){
            $rootScope.marketInfo.faceValue = $scope.orderForm.perValue;
            if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                window.location.href='http://web.yiqianlian.com/cgb/mobile?siteURL=http://web.yiqianlian.com/cgb/mobile?menu=gasrecharge&actionflag=login';
                return;
            }
            $state.go("market",{"category":category});
        }

        $scope.setCash = function(){
            if(!Tools.prototype.isEmpty($rootScope.marketInfo.billId)){
                if(parseFloat($rootScope.marketInfo.cash) >= parseFloat($scope.data.cash)){
                    $scope.data.cash = '0';
                }else{
                    $scope.data.cash = parseFloat($scope.data.cash) - parseFloat($rootScope.marketInfo.cash);
                }
                $scope.setPayBtnName();
            }
        }

        var gasRechargeNo = $cookieStore.get("gasRechargeNo");
        if(!Tools.prototype.isEmpty(gasRechargeNo)){
            $scope.data.gasCardNo = gasRechargeNo;
        }

        var gasRechargeInfo = $cookieStore.get("gasRechargeInfo");
        if(!Tools.prototype.isEmpty(gasRechargeInfo)){
            $scope.data.gasCardName = gasRechargeInfo;
        }
        angular.forEach($scope.faceValueList,function(item,key){
            if(item.stock && item.choosed && !Tools.prototype.isEmpty(item.salePrice)){
                $scope.data.isFirstInit = false;
                $scope.data.cash = item.salePrice;
                $scope.orderForm.cardId = item.productCode;
                $scope.orderForm.perValue = item.faceValue;
//                if(Tools.prototype.isEmpty($rootScope.marketInfo.billId)){
//                    $rootScope.marketInfo.faceValue = $scope.orderForm.perValue;
//                    $rootScope.getDefaultMarketBill($scope,'5');
//                }
            }
        });
        if(Tools.prototype.isEmpty($scope.data.cash)){
            $scope.data.cash = '';
            $scope.data.isFirstInit = true;
            $rootScope.marketInfo.faceValue = '';
            $scope.clearFaceValue();
            $scope.checkOilNO('2');
            if(!Tools.prototype.isEmpty($scope.data.type) && '2' == $scope.data.type && Tools.prototype.isIos()){
                $("#gasCardNo").focus();
                $scope.clearError('1');
            }
        }else{
            $scope.setCash();
        }

        $scope.takeOrder = function($event,bank){
            $event.target.disabled = true;
            $scope.data.showCookie = false;
            $scope.orderForm.gameCount = $scope.data.gasCardNo;
            $scope.orderForm.gasCardName = $scope.data.gasCardName;

            if(!Tools.prototype.isEmpty($scope.errorData.oilNOMsg) || !Tools.prototype.isEmpty($scope.errorData.errorMsg)){
                $event.target.disabled = false;
                return;
            }
            if(Tools.prototype.isEmpty($scope.orderForm.gameCount)){
                $scope.errorData.errorMsg = MessageService.errorMsg.orderMsg.no_oil_no;
                $event.target.disabled = false;
                return;
            }else if(!$scope.checkOilNO(3)){
                $event.target.disabled = false;
                return;
            }
            if(Tools.prototype.isEmpty($scope.orderForm.cardId)){
                $scope.errorData.cardMsg = MessageService.errorMsg.commonMsg.no_face_value;
                $event.target.disabled = false;
                return;
            }

            if($scope.data.gasCardIsNoUse == "副卡不能进行充值"){
                $scope.errorData.oilNOMsg = $scope.data.gasCardIsNoUse;
                $event.target.disabled = false;
                return;
            }

            if(!$("#agreement")[0].checked){
                $scope.errorData.agreementMsg=MessageService.errorMsg.commonMsg.prompt_agreetment_check;
                $event.target.disabled = false;
                return;
            }

            $rootScope.bank = bank;
            $scope.orderForm.marketBillId = $rootScope.marketInfo.billId;
            OrderService.takeSaleOrder($scope.orderForm,function(data){
                if('success' ==  data.message){
                    $scope.orderForm.gameCount = "";
                    $scope.orderForm.cardId = "";
                    var payForm = {
                        orderNo:data.data[0].billId,
                        bankCode:bank.bankCode,
                        payTypeId:bank.payTypeId,
                        payType:bank.payType,
                        returnUrl:'http://web.yiqianlian.com/cgb/order?menu=gasrecharge',
                        code:$rootScope.code,
                        memberId:$rootScope.userLoginId,
                        marketBillId:$scope.orderForm.marketBillId
                    };

                    PayService.getPayUrlForMobile(payForm,function(data){
                        if('success' == data.message){
                            location.href = data.data[0];
                        }else{
                            $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.pay_error;
                        }
                        $event.target.disabled = false;
                    });

                    // 缓存用户加油卡号
                    $scope.bindUserGasCard($scope.data.gasCardNo);
                }else{
                    $scope.errorData.orderMsg = MessageService.errorMsg.commonMsg.no_stock;
                    $event.target.disabled = false;
                }
            });


        }

        $scope.goOrderCenter = function(){
            if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                $rootScope.curRouter = "order-query";
                window.location.href='http://web.yiqianlian.com/cgb/mobile?siteURL=http://web.yiqianlian.com/cgb/mobile?menu=order-query&actionflag=login';
                return;
            }
            $state.go("order-query");
        }

        $scope.bindUserGasCard = function(gasCardNo){

            // 判断用户是否登录，有登录将号码记录到用户信息表
            if ($scope.checkHistoryNoList($scope.data.gasCardNo)) {
                var addGasCardNoInfo = {gasCardNo:$scope.data.gasCardNo, gasCardName:$scope.data.gasCardName};
                //addGasCardNoInfo = eval(addGasCardNoInfo);
                if (Tools.prototype.isEmpty($scope.gasCardNos) || $scope.gasCardNos.length == 0) {
                    $scope.cookieNos = JSON.stringify(addGasCardNoInfo);
                } else {
                    //$scope.cookieNos += ";" + $scope.data.gasCardNo;

                    //$scope.gasCardNos.push(addGasCardNoInfo);
                    $scope.cookieNos = JSON.stringify(addGasCardNoInfo) + ',' + $scope.cookieNos;

                }

                if(!Tools.prototype.isEmpty($rootScope.userLoginId)) {
                    MemberService.updateUserInfo({gasCardNos:$scope.cookieNos,randomId:$rootScope.userLoginId},function(salePriceData){
                        return;
                    });
                }else{

                    Tools.prototype.saveCookie("gasCardNos", $scope.cookieNos, {expires: 30});
                }
            }
        }


    }]);

    app.controller('GasAgreementCtrl',['$rootScope',
        function($rootScope){

        }]);
});
