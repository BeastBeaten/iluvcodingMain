/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.phone.phoneModule',[]);

    app.controller('PhoneRechargeCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','OrderService','PayService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,OrderService,PayService,MenuService){
        var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
        $("#copyright").html(copyright);
        $rootScope.userData.title = '话费';
        $rootScope.menu = 'phonerecharge';
        $rootScope.curRouter = $rootScope.menu;
        $rootScope.rechargeDesc =  MenuService.phonerecharge.desc;
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

        $scope.payList = $rootScope.userData.payList;

        $scope.orderForm = {
            orderType:'PHONERECHARGE',
            cardNum:'1',
            cardType:0,
            cardId:'',
            memberId:$rootScope.userLoginId,
            platform:'Mobile',
            code:$rootScope.code,
            ofLinkId:$rootScope.ofLinkId
        }

        $scope.errorData = {
            phoneNoError:'',
            errorMsg:''
        }
//        Tools.prototype.saveCookie("phoneNoes","18918133410;15996281799",{expires:30});
        var cookieNoes = Tools.prototype.saveCookie("phoneNoes");
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
            Tools.prototype.saveCookie("phoneNoes",null);
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
            $scope.orderForm.cardId = '';
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
                    $cookieStore.remove("PhoneRechargeNo");
                    $cookieStore.put("PhoneRechargeNo",$scope.data.gameCount);
                    ProductService.getPhoneInfo($scope.data.gameCount,function(data){
                        if("success" == data.message){
                            if(data.data[0].prvcin == data.data[0].cityin){
                                $scope.data.cityin = data.data[0].prvcin;
                            }else{
                                $scope.data.cityin = data.data[0].prvcin+' '+data.data[0].cityin;
                            }
                            $scope.data.cityin += data.data[0].mobileType;
                            $scope.data.mobileType = data.data[0].mobileType;
                            $cookieStore.remove("PhoneRechargeInfo");
                            $cookieStore.put("PhoneRechargeInfo",$scope.data.cityin);
                            $cookieStore.remove("PhoneTypeInfo");
                            $cookieStore.put("PhoneTypeInfo",$scope.data.mobileType);
                            angular.forEach($scope.faceList,function(item,key){
                                ProductService.getPhoneProduct({code:$rootScope.code,mobileType:$scope.data.mobileType,provinceName:data.data[0].prvcin,faceValue:item.value,phoneNo:$scope.data.gameCount},function(data){
                                    item.choosed = false;
                                    if('success' == data.message){
                                        item.id = data.data[0].id;
                                        item.price = data.data[0].salePrice;
                                        item.stock = true;
                                        if(!Tools.prototype.isEmpty($rootScope.faceValue) && item.value == $rootScope.faceValue){
                                            $scope.chooseValue(item.id);
                                        }
                                    }else{
                                        item.id = '';
                                        item.stock = false;
                                        item.price = '';
                                    }
//                                    if(key == $scope.faceList.length - 1){
//                                        $scope.getProductDetail();
//                                    }
                                })
                            });

//                            ProductService.getPhoneFaceValue({'provinceName':data.data[0].prvcin,'cityName':data.data[0].cityin,'mobileType':data.data[0].mobileType,code:$rootScope.code},function(data){
//                                if("success" == data.message && 0 < data.data.length){
//                                    angular.forEach(data.data,function(item,key){
//                                        angular.forEach($scope.faceList,function(temp,key){
//                                            if(item.parValue == temp.value){
//                                                temp.id = item.id;
//                                            }
//                                        });
//
//                                    });
//                                    $scope.getProductDetail();
//                                }
//                            });
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

        if('abc' == $rootScope.code){
            $scope.faceList = ProductService.getABCPhoneFaceValueList;
        }else if('psbc' == $rootScope.code){
            $scope.faceList = ProductService.getPSBCPhoneFaceValueList;
        }else if('ycpsbc' == $rootScope.code){
            $scope.faceList = ProductService.getYCPSBCPhoneFaceValueList;
        }else{
            $scope.faceList = ProductService.getPhoneFaceValueList;
        }

        $scope.choosePhoneNo = function(phoneNo){
            $scope.data.gameCount = phoneNo;
            $scope.data.showCookie = false;
            $scope.checkPhoneNo('2');
        }

        $scope.chooseValue = function(id){
            $scope.data.showCookie = false;

            if('flowrecharge' == id){
                if(!Tools.prototype.isMobileNo($scope.data.gameCount) || Tools.prototype.is170MobileNo($scope.data.gameCount)){
                    $scope.data.gameCount = '';
                }
                $rootScope.initMarketInfo();
                $state.go('flowrecharge',{phoneNo:$scope.data.gameCount});
                return;
            }

            if(Tools.prototype.isEmpty($scope.data.mobileType)){
                return;
            }

            if(Tools.prototype.isEmpty(id)){
                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                $scope.data.cash = '';
                return;
            }
            if(id != $scope.orderForm.cardId){
                $rootScope.initMarketInfo();
            }
            angular.forEach($scope.faceList,function(item,key){
                if(item.id == id){
                    if(item.stock){
                        item.choosed = true;
                        $scope.orderForm.cardId = item.id;
                        $scope.orderForm.perValue = item.value;
                        $scope.data.cash = item.price;
                        $rootScope.marketInfo.faceValue = $scope.orderForm.perValue;
                        $rootScope.marketInfo.getDefaultFlag = true;
                        $rootScope.getDefaultMarketBill($scope,'1');
                    }else{
                        item.choosed = false;
                        $scope.orderForm.cardId = '';
                        $scope.orderForm.perValue = '';
                        $scope.data.cash = '';
                        $rootScope.marketInfo.faceValue = '';
                    }
//                    $scope.orderForm.boardId = item.boardId;
                }else{
                    item.choosed = false;
                }
            });
            $scope.clearError('4');
        }

        $scope.useMarketBill = function(category){
            $rootScope.marketInfo.faceValue = $scope.orderForm.perValue;
            if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                $state.go('login');
                return;
            }
//            if(Tools.prototype.isEmpty($rootScope.marketInfo.faceValue)){
//                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_face_value;
//                return;
//            }
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

        if(!Tools.prototype.isEmpty(phoneNo)){
            $rootScope.rechargeAccount = '';
            $rootScope.faceValue = '';
            $scope.data.gameCount = phoneNo;
            $scope.checkPhoneNo('2');
        }else if(!Tools.prototype.isEmpty($cookieStore.get("PhoneRechargeNo"))){
            var PhoneRechargeNo = $cookieStore.get("PhoneRechargeNo");
            if(!Tools.prototype.isEmpty(PhoneRechargeNo)){
                $scope.data.gameCount = PhoneRechargeNo;
            }

            var PhoneRechargeInfo = $cookieStore.get("PhoneRechargeInfo");
            var PhoneTypeInfo = $cookieStore.get("PhoneTypeInfo");
            if(!Tools.prototype.isEmpty(PhoneRechargeInfo)){
                $scope.data.cityin = PhoneRechargeInfo;
                $scope.data.mobileType  = PhoneTypeInfo;
                angular.forEach($scope.faceList,function(item,key){
                    if(item.choosed && !Tools.prototype.isEmpty(item.price)){
                        $scope.data.cash = item.price;
                        $scope.orderForm.cardId = item.id;
                        $scope.orderForm.perValue = item.value;
//                        if(Tools.prototype.isEmpty($rootScope.marketInfo.billId)){
//                            $rootScope.marketInfo.faceValue = $scope.orderForm.perValue;
//                            $rootScope.getDefaultMarketBill($scope,'1');
//                        }
                    }
                });
                if(Tools.prototype.isEmpty($scope.data.cash)){
                    $rootScope.marketInfo.faceValue = '';
                    $scope.checkPhoneNo('2');
                }else{
                    $scope.setCash();
                }
            }else{
                $scope.data.cash = '';
                $scope.clearFaceValue();
            }
        }else if(!Tools.prototype.isEmpty($rootScope.rechargeAccount)){
            $scope.data.gameCount = $rootScope.rechargeAccount;
            $scope.checkPhoneNo('2');
        }

        $scope.takeOrder = function($event,bank){
            $event.target.disabled = true;
            $scope.data.showCookie = false;
//            if(!Tools.prototype.isEmpty($scope.errorData.phoneNoError) || !Tools.prototype.isEmpty($scope.errorData.errorMsg)){
//                $event.target.disabled = false;
//                return;
//            }
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
            if(Tools.prototype.isEmpty($scope.orderForm.cardId)){
                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_face_value;
                $event.target.disabled = false;
                return;
            }
            $rootScope.bank = bank;
            $scope.orderForm.gameCount = $scope.data.gameCount;
            $scope.orderForm.marketBillId = $rootScope.marketInfo.billId;
            OrderService.takeSaleOrder($scope.orderForm,function(data){
                if('success' ==  data.message){
                    $rootScope.saveCookies('phoneNoes',$scope.orderForm.gameCount);
//                    if(Tools.prototype.isEmpty($scope.orderForm.memberId)){
//                        $rootScope.saveCookies('localOrder',data.data[0].billId);
//                    }
                    var payForm = {
                        orderNo:data.data[0].billId,
                        bankCode:bank.bankCode,
                        payTypeId:bank.payTypeId,
                        payType:bank.payType,
                        returnUrl:'http://web.yiqianlian.com/mobile/success/'+$rootScope.code+'/'+$rootScope.menu,
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

            if(!Tools.prototype.isEmpty($rootScope.lastUrl)){
                OrderService.takeSaleOrder($rootScope.lastForm,function(data){
                    if('success' ==  data.message){
                        $rootScope.saveCookies('phoneNoes',$scope.lastForm.gameCount);
//                        if(Tools.prototype.isEmpty($scope.orderForm.memberId)){
//                            $rootScope.saveCookies('localOrder',data.data[0].billId);
//                        }
                        var payForm = {
                            orderNo:data.data[0].billId,
                            bankCode:$rootScope.bank.bankCode,
                            payTypeId:$rootScope.bank.payTypeId,
                            payType:$rootScope.bank.payType,
                            returnUrl:'http://web.yiqianlian.com/mobile/success/'+$rootScope.code+'/'+$rootScope.menu,
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
                            //$event.target.disabled = false;
                        });
                    }else{
                        $rootScope.lastUrl = '';
                        $rootScope.lastForm = '';
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                        //$event.target.disabled = false;
                    }
                });
            }

    }]);


});