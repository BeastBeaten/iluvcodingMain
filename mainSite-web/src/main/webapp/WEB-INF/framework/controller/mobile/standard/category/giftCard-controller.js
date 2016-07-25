/**
 * Created by 沈金荣 on 16-03-28.
 */
'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.giftCard.giftCardModule',[]);

    app.controller('GiftCardIndexCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,MenuService){
            var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
            $("#copyright").html(copyright);
            $rootScope.menu = 'giftCardrecharge';
            $rootScope.userData.title = '礼品卡';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.giftCardrecharge.desc;
        }]);

    app.controller('GiftCardListCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,MenuService){
            $rootScope.menu = 'giftCardrecharge';
            $rootScope.userData.title = '礼品卡';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.giftCardrecharge.desc;

            $scope.data = {
                search:''
            };

            ProductService.getGiftCardList(function(data){
                if('success' == data.message){
                    $scope.giftCardList = data.data;
                }else{
                    $scope.giftCardList = '';
                }
            });
            Tools.prototype.saveCookie("giftCardList","天猫超市;唯品会");
            var cookieList = Tools.prototype.saveCookie("giftCardList");
            if(!Tools.prototype.isEmpty(cookieList)){
                $scope.rechargeGiftCardList = cookieList.split(";");
            }else{
                $scope.rechargeGiftCardList = '';
            }

            $scope.clearSearch = function(type){
                if('1' == type){
                    //focus
                    $('#search')[0].placeholder="";
                }else if('2' == type){
                    //blur
                    if(Tools.prototype.isEmpty($scope.data.search)){
                        $('#search')[0].placeholder="请输入礼品卡名称检索";
                    }
                }else if('3' == type){
                    //clear
                    $scope.data.search = '';
                    $('#search')[0].placeholder="请输入礼品卡名称检索";
                }
            }

            $scope.goCharge = function(giftCardName){
                $state.go("giftCardcharge",{giftCardName:giftCardName});
            }


        }]);

    app.controller('GiftCardRechargeCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','OrderService','PayService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,OrderService,PayService,MenuService){
            var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
            $("#copyright").html(copyright);
            $rootScope.menu = 'giftCardcharge';
            $rootScope.userData.title = '礼品卡';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.giftCardrecharge.desc;

            //$rootScope.giftCardName = !Tools.prototype.isEmpty($stateParams.giftCardName) ? $stateParams.giftCardName : $rootScope.giftCardName;
            var telPho = $stateParams.telPho;
            $scope.data = {
                giftCardName:$stateParams.giftCardName,
                arbitraryNum:'',
                cardNum:'1',
                salePrice:'',
                cash:'',
                cityin:'',
                mobileType:'',
                hasCookie:false,
                showCookie:false,
                cookieData:'',
                telPho:'',
                imgUrl:''
            };

            $scope.payList = $rootScope.userData.payList;
            $scope.orderForm = {
                orderType:'CARDPASSRECHARGE',
                cardNum:'',
                cardType:0,
                cardId:'',
                perValue:'',
                memberId:$rootScope.userLoginId,
                platform:'Mobile',
                code:$rootScope.code,
                telPho:'',
                ofLinkId:$rootScope.ofLinkId
            };

            $scope.errorData = {
                phoneNoError:'',
                errorMsg:''
            };

            var cookieNoes = Tools.prototype.saveCookie("giftCardNoes");
            if(Tools.prototype.isEmpty(cookieNoes)){
                $scope.data.hasCookie = false;
                $scope.giftCardNoes = '';
            }else{
                $scope.data.hasCookie = true;
                $scope.giftCardNoes = cookieNoes.split(";");
            }

            $scope.showCookie = function(){
                $scope.data.showCookie = !$scope.data.showCookie;
            }

            //$scope.data.giftCardName

            $scope.imgMatch = function(name){
                if(Tools.prototype.isEmpty(name)){
                    $state.go("giftCardrecharge");
                    return;
                }
                if(name.indexOf("京东") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/card-jd.png";
                    return;
                }else if (name.indexOf("天猫") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/card-tm.png";
                    return;
                }else if (name.indexOf("当当") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/card-dd.png";
                    return;
                }else if (name.indexOf("国美") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/card-gm.png";
                    return;
                }else if (name.indexOf("唯品会") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/card-wph.png";
                    return;
                }else if (name.indexOf("携程") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/card-xc.png";
                    return;
                }else if (name.indexOf("1号店") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/card-yhd.png";
                    return;
                }else if (name.indexOf("亚马逊") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/card-ymx.png";
                    return;
                }else if (name.indexOf("中粮") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/card-zl.png";
                    return;
                }else if (name.indexOf("苏宁") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/card-sn.png";
                    return;
                }else {
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/card-gift.png";
                    return;
                }
            }
            $scope.giftCardInfo = '';
            if(!Tools.prototype.isEmpty($scope.data.giftCardName)){
                ProductService.getGiftCardInfo({code:$rootScope.code,productName:$scope.data.giftCardName},function(data){
                    if("success" == data.message){
                        var faceNameList = [];

                        angular.forEach(data.data, function (item) {
                            var face ={
                            };
                            face.name = item.productName;
                            face.value = item.faceValue;
                            face.productCode = item.productCode;
                            faceNameList.push(face);
                        });
                        ProductService.chargeGiftCardInfo.faceValueList = faceNameList;
                        $scope.giftCardInfo = ProductService.chargeGiftCardInfo;
                        $scope.giftCardInfo.name = $scope.data.giftCardName;
                        angular.forEach($scope.giftCardInfo.faceValueList,function(item,key){
                            if(!Tools.prototype.isEmpty(item.productCode)){
                                ProductService.checkCanOrder({cardId:item.productCode,code:$rootScope.code}, function (orderCheckData) {
                                    if ("success" == orderCheckData.message) {
                                        ProductService.getSalePrice({cardId:item.productCode,productName:item.name,code:$rootScope.code},function (data){
                                            item.choosed = false;
                                            if ("success" == data.message && 0 < data.data.length) {
                                                item.salePrice = data.data[0].salePrice;
                                                item.stock = true;
                                                if(!Tools.prototype.isEmpty($rootScope.faceValue) && item.perValue == $rootScope.faceValue){
                                                    $scope.chooseValue(item);
                                                }
                                            }else{
                                                item.salePrice = '';
                                                item.stock = false;
                                            }
                                        });
                                    } else {
                                        item.stock = false;
                                        item.salePrice = "";
                                    }
                                });
                            }else{
                                item.stock = false;
                                item.salePrice = "";
                            }
                        });
                    }else{
                        $scope.giftCardInfo = '';
                        $state.go("giftCardrecharge");
                        return;
                    }
                });
            }else{
                $scope.giftCardInfo = ProductService.chargeGiftCardInfo;
                if(Tools.prototype.isEmpty($scope.giftCardInfo.name)){
                    $state.go('giftCardrecharge');
                    return;
                }
                $scope.data.giftCardName = $scope.giftCardInfo.name;
            }
            $scope.imgMatch($scope.data.giftCardName);
            $scope.clearError = function(type){
                if('1' == type){
                    //focus
                    $('#telPho')[0].placeholder="";
                }else if('2' == type){
                    //blur
                    if(Tools.prototype.isEmpty($scope.data.telPho)){
                        $('#telPho')[0].placeholder="请输入或选择手机号码";
                    }else if(!Tools.prototype.isMobileNo($scope.data.telPho) || Tools.prototype.is170MobileNo($scope.data.telPho)){
                        $scope.errorData.phoneNoError=MessageService.errorMsg.orderMsg.phone_no_error;
                    }
                    $scope.data.showCookie = false;
                }else if('3' == type){
                    //clear phoneno
                    $scope.data.telPho = '';
                    $scope.data.showCookie = false;
                    $scope.errorData.phoneNoError='';
                    $scope.errorData.errorMsg = '';
                    $scope.data.mobileType = '';
                    $scope.data.cityin = '';
                    //$scope.clearFaceValue();
                }else if('4' == type){
                    //clear msg
                    $scope.errorData.phoneNoError='';
                    $scope.errorData.errorMsg = '';
                }
            }

            $scope.clearFaceValue = function(){
                $scope.orderForm.perValue = '';
                angular.forEach($scope.giftCardInfo.faceValueList,function(item,key){
                    item.choosed = false;
                    item.stock = false;
                });
            }

            $scope.clearCookie = function(){
                Tools.prototype.saveCookie("giftCardNoes",null);
                $scope.giftCardNoes = '';
                $scope.data.hasCookie = false;
                $scope.data.showCookie = false;

            }

            $scope.checkPhoneNo = function(type){
                $scope.data.telPho = $scope.data.telPho.replace(/\D/g,'');
                $scope.clearError('4');
                if($scope.data.telPho.length > 11){
                    $scope.data.telPho = $scope.data.telPho.substr(0,11);
                }
                if(Tools.prototype.isEmpty($scope.data.telPho)){
                    $scope.data.showCookie = false;
                    return;
                }else if(!Tools.prototype.isEmpty($scope.data.telPho) && '1' == type){
                    $scope.data.showCookie = true;
                }
                if(11 == $scope.data.telPho.length){
                    $scope.data.showCookie = false;
                    if(Tools.prototype.isMobileNo($scope.data.telPho) && !Tools.prototype.is170MobileNo($scope.data.telPho)){
                        if('1' == type){
                            $('#telPho').blur();
                        }
                        $cookieStore.remove("GiftCardRechargeNo");
                        $cookieStore.put("GiftCardRechargeNo",$scope.data.telPho);
                        ProductService.getPhoneInfo($scope.data.telPho,function(data){
                            if("success" == data.message){
                                if(data.data[0].prvcin == data.data[0].cityin){
                                    $scope.data.cityin = data.data[0].prvcin;
                                }else{
                                    $scope.data.cityin = data.data[0].prvcin+' '+data.data[0].cityin;
                                }
                                $scope.data.cityin += data.data[0].mobileType;
                                $scope.data.mobileType = data.data[0].mobileType;
                                $cookieStore.remove("GiftCardRechargeInfo");
                                $cookieStore.put("GiftCardRechargeInfo",$scope.data.cityin);
                                $cookieStore.remove("GiftCardTypeInfo");
                                $cookieStore.put("GiftCardTypeInfo",$scope.data.mobileType);
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
                    //$scope.clearFaceValue();
                }
            }

            $scope.choosePhoneNo = function(telPho){
                $scope.data.telPho = telPho;
                $scope.data.showCookie = false;
                $scope.checkPhoneNo('2');
            }

            $scope.chooseValue = function(chooseItem){
                $scope.data.showCookie = false;
                /*            if(Tools.prototype.isEmpty($scope.data.mobileType)){
                 return;
                 }*/
                if(Tools.prototype.isEmpty(chooseItem.productCode)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                    $scope.data.cash = '';
                    return;
                }
                if(chooseItem.productCode != $scope.orderForm.cardId){
                    $rootScope.initMarketInfo();
                }
                angular.forEach($scope.giftCardInfo.faceValueList,function(item,key){
                    if(chooseItem.productCode == item.productCode){
                        if(item.stock){
                            item.choosed = true;
                            $scope.orderForm.cardId = item.productCode;
                            $scope.orderForm.perValue = item.value;
                            $scope.data.salePrice = item.salePrice;
                        }else{
                            item.choosed = false;
                            $scope.orderForm.cardId = '';
                            $scope.orderForm.perValue = '';
                            $scope.data.salePrice = '';
                        }
                        $scope.getCash();
                    }else{
                        item.choosed = false;
                    }
                });
                $scope.clearError('4');
            }

            $scope.useMarketBill = function(category){
                if(!Tools.prototype.isEmpty($scope.orderForm.perValue) && !Tools.prototype.isEmpty($scope.data.cardNum)){
                    $rootScope.marketInfo.faceValue = parseInt($scope.orderForm.perValue) * parseInt($scope.data.cardNum);
                }else{
                    $rootScope.marketInfo.faceValue = $scope.orderForm.perValue;
                }
                if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                    $state.go('login');
                    return;
                }
                $state.go("market",{"category":category});
            }

            $scope.isNum = function(num){
                if(num != ''){
                    $scope.errorData.errorMsg = '';
                    var re = /^[1-9]+[0-9]*]*$/;
                    if(!re.test(num)){
                        $scope.data.cardNum = 1;
                        return false;
                    }else {
                        return true;
                    }
                }
            }

            $scope.checkCardNum = function(type){
                if (type == '1') {
                    if ($scope.isNum($scope.data.cardNum)) {
                        if ($scope.data.cardNum < 1) {
                            $scope.data.cardNum = 1;
                        } else if ($scope.data.cardNum > 100) {
                            $scope.data.cardNum = 100;
                        }
                    }
                }else if(type == '3'){
                    if ($scope.data.cardNum == 100){
                        $scope.data.cardNum = 100;
                    }else {
                        ++$scope.data.cardNum;
                    }
                } else if (type == '2'){
                    if ($scope.data.cardNum > 1){
                        --$scope.data.cardNum;
                    }else {
                        $scope.data.cardNum = 1;
                    }
                }
                $scope.errorData.errorMsg = '';
                $scope.getCash();
                $cookieStore.remove("GiftCardCardNum");
                $cookieStore.put("GiftCardCardNum",$scope.data.cardNum);
            }

            $scope.getCash = function(){
                if(!Tools.prototype.isEmpty($scope.data.cardNum)){
                    $scope.orderForm.cardNum = $scope.data.cardNum;
                    if (!Tools.prototype.isEmpty($scope.data.salePrice)){
                        $scope.data.cash =((parseFloat($scope.data.salePrice)*1000)*parseInt($scope.data.cardNum))/1000;
                        $rootScope.marketInfo.faceValue = parseInt($scope.orderForm.perValue) * parseInt($scope.data.cardNum);
                        $rootScope.marketInfo.getDefaultFlag = true;
                        $rootScope.getDefaultMarketBill($scope,'4');
                    }else{
                        $scope.data.cash = '';
                    }
                }else{
                    $scope.data.cash = '';
                }
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

            if(!Tools.prototype.isEmpty($scope.giftCardInfo.faceValueList)){
                angular.forEach($scope.giftCardInfo.faceValueList,function(item,key){
                    if(item.choosed && !Tools.prototype.isEmpty(item.salePrice)){
                        $scope.data.salePrice = item.salePrice;
                        $scope.orderForm.cardId = item.productCode;
                        $scope.orderForm.perValue = item.value;
                        if(!Tools.prototype.isEmpty($cookieStore.get("GiftCardCardNum"))){
                            $scope.data.cardNum = $cookieStore.get("GiftCardCardNum");
                        }
                        $scope.getCash();
                    }
                });

                if(!Tools.prototype.isEmpty($cookieStore.get("GiftCardRechargeNo"))){
                    $scope.data.telPho = $cookieStore.get("GiftCardRechargeNo");
                    var GiftCardRechargeInfo = $cookieStore.get("GiftCardRechargeInfo");
                    var GiftCardTypeInfo = $cookieStore.get("GiftCardTypeInfo");
                    if(!Tools.prototype.isEmpty(GiftCardRechargeInfo)){
                        $scope.data.cityin = GiftCardRechargeInfo;
                        $scope.data.mobileType  = GiftCardTypeInfo;
                    }
                }

            }

            $scope.takeOrder = function($event,bank){
                $scope.orderForm.cardNum = $scope.data.cardNum;
                $event.target.disabled = true;
                $scope.data.showCookie = false;
                if(Tools.prototype.isEmpty($scope.data.telPho)){
                    $scope.errorData.phoneNoError=MessageService.errorMsg.commonMsg.no_phone;
                    $event.target.disabled = false;
                    return;
                }
                if(!Tools.prototype.isMobileNo($scope.data.telPho) || Tools.prototype.is170MobileNo($scope.data.telPho)){
                    $scope.errorData.phoneNoError=MessageService.errorMsg.orderMsg.phone_no_error;
                    $event.target.disabled = false;
                    return;
                }
                if(Tools.prototype.isEmpty($scope.orderForm.perValue)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_face_value;
                    $event.target.disabled = false;
                    return;
                }
                if(Tools.prototype.isEmpty($scope.orderForm.cardNum)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_card_num;
                    $event.target.disabled = false;
                    return;
                }
                //查询库存
                ProductService.getGiftCardStock({cardId:$scope.orderForm.cardId,code:$rootScope.code},function (data){
                    if ("success" == data.message && 0 < data.data.length && (parseInt(data.data[0].purNum) >= parseInt($scope.orderForm.cardNum))) {
                        $rootScope.bank = bank;
                        $scope.orderForm.telPho = $scope.data.telPho;
                        $scope.orderForm.marketBillId = $rootScope.marketInfo.billId;
                        OrderService.takeSaleOrder($scope.orderForm,function(data){
                            $rootScope.saveCookies('giftCardNoes',$scope.orderForm.telPho);
                            if('success' ==  data.message){
                                var payForm = {
                                    orderNo:data.data[0].billId,
                                    bankCode:bank.bankCode,
                                    payTypeId:bank.payTypeId,
                                    payType:bank.payType,
                                    returnUrl:'http://web.yiqianlian.com/mobile/success/'+$rootScope.code+'/giftCardrecharge',
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



                    }else{
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                        $event.target.disabled = false;
                        return
                    }
                });
            }

            if(!Tools.prototype.isEmpty($rootScope.lastUrl)){
                OrderService.takeSaleOrder($rootScope.lastForm,function(data){
                    if('success' ==  data.message){
                        var payForm = {
                            orderNo:data.data[0].billId,
                            bankCode:$rootScope.bank.bankCode,
                            payTypeId:$rootScope.bank.payTypeId,
                            payType:$rootScope.bank.payType,
                            returnUrl:'http://web.yiqianlian.com/mobile/success/'+$rootScope.code+'/giftCardrecharge',
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
                        });
                    }else{
                        $rootScope.lastUrl = '';
                        $rootScope.lastForm = '';
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                    }
                });
            }

        }]);
});
