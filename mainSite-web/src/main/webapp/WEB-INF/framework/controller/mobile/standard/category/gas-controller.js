/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.gas.gasModule',[]);

    app.controller('GasRechargeCtrl',['$rootScope','$scope','$ionicModal','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','OrderService','PayService','MemberService','MenuService',
        function($rootScope,$scope,$ionicModal,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,OrderService,PayService,MemberService,MenuService){

            var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
            if(!Tools.prototype.isEmpty($rootScope.userData.header)){
                var header = $compile(angular.element('<'+$rootScope.userData.header+'></'+$rootScope.userData.header+'>'))($scope);
                $("#header").html(header);
            }
            $("#copyright").html(copyright);
            $rootScope.userData.title = '加油卡';
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
                canCleanHistory:true

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
                code:$rootScope.code,
                ofLinkId:$rootScope.ofLinkId
            };

            // $scope.gasCardNosJson = [{gasCardNo:'1000111232112321231',cardType:'中石化',gasCardName:'李'},
            //    {gasCardNo:'1000111232112321232',cardType:'中石化',gasCardName:'周'}];

            $scope.payList = $rootScope.userData.payList;

            //提示蒙层
            $ionicModal.fromTemplateUrl('../../../partials/mobile/standard/common/prompt.html', {
                scope: $scope,
                focusFirstInput: false
            }).then(function(modal) {
                $scope.model = modal;
            });



            // 缓存号码
            // $scope.gasCardNos = eval($scope.gasCardNosJson);

            //  $scope.cookieNos = $scope.gasCardNos;

            //  初始化面值规格（根据中石化面值规格初始化）
            /**ProductService.getGasCardProductInfo("1",function(data){
           if("success" == data.message  && 0 < data.data.length){
               $scope.faceValueList = data.data;
               angular.forEach($scope.faceValueList,function(item,key){
                   item.stock = false;
                   item.choosed = false;
               });
           }else{  **/
            $scope.faceValueList = ProductService.getFaceValueForGasRecharge;

            $scope.clearArbitraryAmountError = function(type){
                if($rootScope.code == '58'){
                    $rootScope.initMarketInfo();

                }
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
                orderMsg:''
            };

            $scope.displayHistory = function(){
                if(Tools.prototype.isEmpty($scope.cookieNos)){
                    $scope.data.hasCookie = false;
                    $scope.gasCardNos = '';
                }else{
                    $scope.data.hasCookie = true;
                    // $scope.gasCardNos = eval($scope.cookieNos);
                    //$scope.gasCardNos = eval($scope.gasCardNosJson);
                    //$scope.gasCardNos = eval('('+$scope.cookieNos+')');
                    $scope.gasCardNos = JSON.parse('['+ $scope.cookieNos + ']');
                }

            }

            $scope.getHistory = function(){
                // 用户登陆过，从用户信息表中取缓存号码
                if(!Tools.prototype.isEmpty($rootScope.userLoginId)){
                    MemberService.getCasheUserInfo({randomId:$rootScope.userLoginId},function(data){
                        if('success' == data.message && 0 < data.data.length){
                            $scope.cookieNos = data.data[0].gasCardNos;
                            /**if(!Tools.prototype.isEmpty($scope.cookieNos)){
                        $scope.cookieNos = JSON.parse($scope.cookieNos);
                    }**/
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
                /** if(!Tools.prototype.isEmpty($rootScope.userLoginId)) {
                MemberService.updateUserInfo({gasCardNos:'',randomId:$rootScope.userLoginId},function(salePriceData){
                    return;
                });
            }else{**/

                Tools.prototype.saveCookie("gasCardNos", null);
                // }
                //$scope.gasCardNos = '';
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
                    $scope.data.gasCardNo = '';0
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
                        /** if(Tools.prototype.isEmpty($scope.data.gasCardNo)){
                        $scope.data.showCookie = false;
                        return;
                    }else if(!Tools.prototype.isEmpty($scope.data.gasCardNo) && '1' == type){
                        $scope.data.showCookie = true;
                    }  **/

                        if($scope.data.gasCardNo.length == $scope.gasCardNoLength){
                            $("#gasCardNo").blur();
                            $scope.clearFaceValue();
                            if($scope.gasCardNoFormat.test($scope.data.gasCardNo)){
                                $scope.errorData.oilNOMsg = '';
                                // 缓存号码
                                /**if ($scope.checkHistoryNoList($scope.data.gasCardNo)){
                                if($scope.gasCardNos.length == 0){
                                    $scope.cookieNos = $scope.data.gasCardNo;
                                }else{
                                    $scope.cookieNos += ";" + $scope.data.gasCardNo;
                                }

                                Tools.prototype.saveCookie("gasCardNos", $scope.cookieNos, {expires:30})
                            }**/
                                    // 查询加油卡信息
                                    //$scope.searchOil();
                                $scope.data.isFirstInit = false;
                                return true;
                            }else{
                                $scope.errorData.oilNOMsg = MessageService.errorMsg.commonMsg.oilNO_format_error;

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

                        return false;
                    }else{
                        $scope.errorData.oilNOMsg = '';
                    }

                    // 查询加油卡信息
                    /**if($scope.searchOil()){
                    // 查询加油卡面值
                    if($scope.data.gasCardNo.slice(0,1) == '1'){
                        $scope.getFaceValueList("1");
                    }else{
                        $scope.faceValueList = '';
                    }
                }**/
                    $scope.searchOil();
                    return true;
                }else if('3' == type){
                    if(Tools.prototype.isEmpty($scope.data.gasCardNo)){
                        return false;
                    }
                    $scope.initFormat($scope.data.gasCardNo);

                    if(!$scope.gasCardNoFormat.test($scope.data.gasCardNo)){
                        $scope.errorData.oilNOMsg = MessageService.errorMsg.commonMsg.oilNO_format_error;

                        return false;
                    }else{
                        $scope.errorData.oilNOMsg = '';
                    }

                    return true;
                }
            }

            $scope.checkHistoryNoList = function(currentGasCradNo){
                // $scope.cookieNos = Tools.prototype.saveCookie("gasCardNos");
                if ($scope.gasCardNos && $scope.gasCardNos.length > 0){
                    // $scope.gasCardNos = $scope.cookieNos.split(";");
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
                // $("#takeOrder")[0].disabled = true;
            }

            $scope.confirm = function(){
                $scope.model.hide();
                // $("#takeOrder")[0].disabled = false;

                // 查询加油卡面值
                if($scope.data.gasCardNo.slice(0,1) == '1') {
                    $scope.getFaceValueList("1");
                }else{
                    $scope.getFaceValueList("2");
                }
            }

            $scope.searchOil = function(){
                if(Tools.prototype.isEmpty($scope.data.gasCardNo)){
                    $scope.errorData.oilNOMsg = MessageService.errorMsg.commonMsg.no_oilNo;

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
//                            $scope.errorData.errorMsg = cardInfos[1];
                                $scope.data.gasCardIsNoUse = cardInfos[1];
                                //return false;
                            }else{
                                $scope.data.gasCardIsNoUse = '';
                            }

                            if ('1' == cardInfos[0]){
                                $scope.model.show();
                                return false;
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
//                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.query_gascard_error;
                            $scope.model.show();
                            return false;
                        }
                    }else{
//                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.query_gascard_error;
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

                        //$scope.faceValueListFromERP = data.data;
                        //$scope.faceValueList = data.data;
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

            $scope.chooseValue = function (chooseItem) {
                $scope.clearError();
                $scope.orderForm.cardNum = '1';
                //$('#arbitrarycharge').addClass("row-p");
//            if(!chooseItem.stock){
//                return;
//            }
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
//                    if(tempCardNum < 1 || tempCardNum > $scope.data.maxCardNum){
//                        $scope.errorData.errorMsg = $rootScope.errorMsg.gasMsg.cardNum_format_error;
//                        return false;
//                    }else{
//                        return true;
//                    }
                        var flag = false;
                        if(tempCardNum >= 1 && tempCardNum <= 5000){
                            flag = true;
                        }
                        if(!flag){
                            $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.wrong_charge_amount;
                        }else{
                            angular.forEach($scope.faceValueList, function (item, key) {
                                if (item.isOneFaceValue) {
                                    $scope.faceValueList[key].choosed = true;
                                    $scope.orderForm.cardId = item.productCode;
                                    $scope.orderForm.perValue = item.faceValue;
                                    if(Tools.prototype.isEmpty($scope.data.price) && !Tools.prototype.isEmpty(item.salePrice)){
                                        $scope.data.price = item.salePrice;
                                    }
                                    item.cardNum = $scope.data.arbitraryAmount;
                                } else {
                                    $scope.faceValueList[key].choosed = false;
                                }
                            });
                            $scope.orderForm.cardNum = $scope.data.arbitraryAmount;

                            $scope.data.total = "售价" + parseFloat((($scope.data.price *1000 * $scope.data.arbitraryAmount)/1000).toFixed(3)) + "元";

                            $scope.data.cash = parseFloat((($scope.data.price *1000 * $scope.data.arbitraryAmount)/1000).toFixed(3));

                            $rootScope.marketInfo.faceValue = $scope.orderForm.cardNum;
                            $rootScope.marketInfo.getDefaultFlag = true;
                            if($rootScope.code == '58'){
                                $rootScope.initMarketInfo();

                            }else{
                                $rootScope.getDefaultMarketBill($scope,'5');
                            }
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
                    /**if(Tools.prototype.isEmpty($scope.data.arbitraryAmount)){
                    $scope.data.cash = '';
                    return false;
                }**/
                    if($scope.checkArbitraryAmount('1')){
                        $scope.errorData.errorMsg = '';
                    }
                }
            }

            $scope.useMarketBill = function(category){
                $rootScope.marketInfo.faceValue = $scope.orderForm.perValue;
                if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                    $state.go('login');
                    return;
                }
//                if(Tools.prototype.isEmpty($rootScope.marketInfo.faceValue)){
//                    $scope.errorData.cardMsg = MessageService.errorMsg.commonMsg.no_face_value;
//                    return;
//                }
                $state.go("market",{"category":category});
            }

        $scope.setCash = function(){
            if(!Tools.prototype.isEmpty($rootScope.marketInfo.billId)){
                if(parseFloat($rootScope.marketInfo.cash) >= parseFloat($scope.data.cash)){
                    $scope.data.cash = '0';
                }else{
                    $scope.data.cash = ((parseFloat($scope.data.cash) * 1000) - (parseFloat($rootScope.marketInfo.cash) * 1000))/1000;
                }
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
                    if(item.isOneFaceValue){
                        $scope.orderForm.cardNum = item.cardNum;
                        $scope.data.arbitraryAmount = item.cardNum;
                        $scope.data.total = "售价" + parseFloat(((item.salePrice *1000 * $scope.data.arbitraryAmount)/1000).toFixed(3)) + "元";
                        $scope.data.cash = parseFloat(((item.salePrice *1000 * $scope.data.arbitraryAmount)/1000).toFixed(3));
                    }
//                    if(Tools.prototype.isEmpty($rootScope.marketInfo.billId)){
//                        $rootScope.marketInfo.faceValue = $scope.orderForm.perValue;
//                        $rootScope.getDefaultMarketBill($scope,'5');
//                    }
                }
            });
            if(Tools.prototype.isEmpty($scope.data.cash)){
                $scope.data.cash = '';
                $scope.data.isFirstInit = true;
                $rootScope.marketInfo.faceValue = '';
                $scope.clearFaceValue();
                $scope.checkOilNO('2');
            }else{
                $scope.setCash();
            }


            $scope.takeOrder = function($event,bank){
                $event.target.disabled = true;
                $scope.data.showCookie = false;
                if($rootScope.lastUrl && !Tools.prototype.isEmpty($rootScope.lastUrl)){
                    $scope.orderForm = $rootScope.lastForm;
                }else{
                    $scope.orderForm.gameCount = $scope.data.gasCardNo;
                }

                if(!$("#agreement")[0].checked){
                    $scope.errorData.agreementMsg=MessageService.errorMsg.commonMsg.prompt_agreetment_check;
                    $event.target.disabled = false;
                    return;
                }
                if(!Tools.prototype.isEmpty($scope.errorData.oilNOMsg) || !Tools.prototype.isEmpty($scope.errorData.errorMsg)){
                    $event.target.disabled = false;
                    return;
                }
                if(!$scope.checkOilNO(3)){
                    //$scope.errorData.oilNOMsg=MessageService.errorMsg.commonMsg.no_oilNo;
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

                $rootScope.bank = bank;
                $scope.orderForm.marketBillId = $rootScope.marketInfo.billId;
                OrderService.takeSaleOrder($scope.orderForm,function(data){
                    if('success' ==  data.message){
//                    if(Tools.prototype.isEmpty($rootScope.userLoginId)){
//                        $rootScope.saveCookies('localOrder',data.data[0].billId);
//                    }


                        // 缓存用户加油卡号
                        $scope.bindUserGasCard($scope.data.gasCardNo);

                        $scope.orderForm.gameCount = "";
                        $scope.orderForm.cardId = "";
                        var payForm = {
                            orderNo:data.data[0].billId,
                            bankCode:bank.bankCode,
                            payTypeId:bank.payTypeId,
                            payType:bank.payType,
                            returnUrl:$rootScope.userData.returnUrl+$rootScope.code+'/'+$rootScope.menu,
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
                        $scope.errorData.orderMsg = MessageService.errorMsg.commonMsg.no_stock;
                        $event.target.disabled = false;
                    }
                });


            }

            if(!Tools.prototype.isEmpty($rootScope.lastUrl)){
                OrderService.takeSaleOrder($rootScope.lastForm,function(data){
                    $rootScope.lastUrl = "";
                    if('success' ==  data.message){
//                    if(Tools.prototype.isEmpty($rootScope.userLoginId)){
//                        $rootScope.saveCookies('localOrder',data.data[0].billId);
//                    }


                        // 缓存用户加油卡号
                        $scope.bindUserGasCard($rootScope.lastForm.gasCardNo);

                        $scope.orderForm.gameCount = "";
                        $scope.orderForm.cardId = "";
                        var payForm = {
                            orderNo:data.data[0].billId,
                            bankCode:$rootScope.bank.bankCode,
                            payTypeId:$rootScope.bank.payTypeId,
                            payType:$rootScope.bank.payType,
                            returnUrl:$rootScope.userData.returnUrl+$rootScope.code+'/'+$rootScope.menu,
                            code:$rootScope.code,
                            memberId:$rootScope.userLoginId,
                            marketBillId:$rootScope.lastForm.marketBillId
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
                            $rootScope.lastUrl = '';
                            $rootScope.lastForm = '';
                            // $event.target.disabled = false;
                        });
                    }else{
                        $rootScope.lastUrl = '';
                        $rootScope.lastForm = '';
                        $scope.errorData.orderMsg = MessageService.errorMsg.commonMsg.no_stock;
                        //$event.target.disabled = false;
                    }
                });
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
});