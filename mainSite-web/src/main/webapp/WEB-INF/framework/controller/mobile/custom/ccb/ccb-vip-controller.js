/**
 * Created by zhoulijun on 16-4-19.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.vip.vipModule',[]);

    app.controller('VipIndexCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,MenuService){
        var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
        $("#copyright").html(copyright);
        $rootScope.menu = 'viprecharge';
        $rootScope.userData.title = '会员';
        $rootScope.curRouter = $rootScope.menu;
        $rootScope.rechargeDesc =  MenuService.viprecharge.desc;
    }]);




    app.controller('VipListCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,MenuService){
            $rootScope.menu = 'viprecharge';
            $rootScope.userData.title = '会员';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.viprecharge.desc;
            $scope.letters = ProductService.getLettersList;

            $scope.data = {
                search:''
            };

            ProductService.getVipList(function(data){
                if('success' == data.message){
                    $scope.vipList = data.data;
                }else{
                    $scope.vipList = '';
                }
            });
            var cookieList = Tools.prototype.saveCookie("vipList");
            if(!Tools.prototype.isEmpty(cookieList)){
                $scope.rechargeVipList = cookieList.split(";");
            }else{
                $scope.rechargeVipList = '';
            }

            $scope.clearSearch = function(type){
                if('1' == type){
                    //focus
                    $('#search')[0].placeholder="";
                }else if('2' == type){
                    //blur
                    if(Tools.prototype.isEmpty($scope.data.search)){
                        $('#search')[0].placeholder="请输入会员名称检索";
                    }
                }else if('3' == type){
                    //clear
                    $scope.data.search = '';
                    $('#search')[0].placeholder="请输入会员名称检索";
                }
            }

            $scope.goCharge = function(gameName){
                if(gameName == "爱奇艺黄金会员"){
                    $state.go("vipkamicharge",{gamename:gameName});
                }else{
                    $state.go("vipcharge",{gamename:gameName});
                }
            }

        }]);



    app.controller('VipRechargeCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','$ionicModal','MessageService','ProductService','OrderService','PayService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,$ionicModal,MessageService,ProductService,OrderService,PayService,MenuService){
            var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
            $("#copyright").html(copyright);
            $rootScope.menu = 'vipcharge';
            $rootScope.userData.title = '会员';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.viprecharge.desc;
            $scope.data = {
                gameName:$stateParams.gamename,
                gameCount:'',
                arbitraryNum:'',
                isArbitrary:false,
                cardNum:'',
                purNum:'',
                salePrice:'',
                cash:'',
                hasCookie:false,
                showCookie:false,
                imgUrl:''
            };

            //组装下单form并赋值
            $scope.orderForm = {
                orderType:'GAMERECHARGE',
                gameCount:'',
                cardNum:'',
                cardType:0,
                cardId:'',
                gameArea:'',
                gameServer:'',
                perValue:'',
                memberId:$rootScope.userLoginId,
                platform:'Mobile',
                code:$rootScope.code,
                ofLinkId:$rootScope.ofLinkId,
                cardName:''
            };
            $scope.errorData = {
                errorMsg:'',
                popMsg:''
            };

            $scope.confirm = function(){
                $scope.model.hide();
            }

            //提示蒙层
            $ionicModal.fromTemplateUrl('../../../partials/mobile/custom/ccb/common/prompt.html', {
                scope: $scope,
                focusFirstInput: false
            }).then(function(modal) {
                $scope.model = modal;
            });

            $scope.$on('$destroy', function() {
                $scope.model.remove();
            });


            //根据名称取得相应图票并给页面赋值
            $scope.imgMatch = function(vipname){
                if(Tools.prototype.isEmpty(vipname)){
                    $state.go("viprecharge");
                    return;
                }
                if(vipname.indexOf("爱奇艺黄金会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/member-qiy.png";
                    return;
                }else if (vipname.indexOf("优酷土豆黄金会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/member-youku.png";
                    return;
                }else if (vipname.indexOf("好莱坞会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/member-hlw.png";
                    return;
                }else if (vipname.indexOf("新浪微博会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/member-xinlang.png";
                    return;
                }else if (vipname.indexOf("迅雷会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/member-xl.png";
                    return;
                }else if (vipname.indexOf("搜狐黄金会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/member-sh.png";
                    return;
                }else if (vipname.indexOf("乐视会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/member-ls.png";
                    return;
                }else if (vipname.indexOf("YY会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/member-yy.png";
                    return;
                }else if (vipname.indexOf("QQ超级会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/SUPER_QQ.png";
                    return;
                }else if (vipname.indexOf("芒果TV") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/M_TV.png";
                    return;
                }else if (vipname.indexOf("QQ会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/QQ02.png";
                    return;
                }else if (vipname.indexOf("Q币充值") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/QB.png";
                    return;
                }else if (vipname.indexOf("CF会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/CF.png";
                    return;
                }else if (vipname.indexOf("QQ贵族钻") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/LZ.png";
                    return;
                }
            }


            $scope.vipInfo = '';
            if(!Tools.prototype.isEmpty($scope.data.gameName)){
                ProductService.getVipInfo({code:$rootScope.code,productName:$scope.data.gameName},function(data){
                    if("success" == data.message){
                        ProductService.chargeVipInfo.name = data.data[0].name;
                        ProductService.chargeVipInfo.faceValueList = data.data[0].faceValueList;
                        $scope.vipInfo = ProductService.chargeVipInfo;
                    }else{
                        $scope.vipInfo = '';
                        $state.go('viprecharge');
                        return;
                    }
                })
            }else{
                $scope.vipInfo = ProductService.chargeVipInfo;
                if(Tools.prototype.isEmpty($scope.vipInfo.name)){
                    $state.go('viprecharge');
                    return;
                }
                $scope.data.gameName = $scope.vipInfo.name;
                $scope.data.cardNum = $cookieStore.get("VipCardNum");
            }

            $scope.imgMatch($scope.data.gameName);

            var cookieNoes = Tools.prototype.saveCookie("vipNoes");
            if(Tools.prototype.isEmpty(cookieNoes)){
                $scope.data.hasCookie = false;
                $scope.vipNoes = '';
            }else{
                $scope.data.hasCookie = true;
                $scope.vipNoes = cookieNoes.split(";");
            }

            $scope.showCookie = function(){
                $scope.data.showCookie = !$scope.data.showCookie;
            }

            $scope.clearCookie = function(){
                Tools.prototype.saveCookie("vipNoes",null);
                $scope.vipNoes = '';
                $scope.data.hasCookie = false;
                $scope.data.showCookie = false;

            }

            $scope.clearError = function(type){
                if('1' == type){
                    //清错误提示
                    $scope.errorData.errorMsg = '';
                }else if('2' == type){
                    $scope.data.gameCount = '';
                    $scope.data.showCookie = false;
                }
            }

            $scope.chooseValue = function(chooseItem){
                $scope.clearError('1');
                $scope.data.isArbitrary = false;
                if(!Tools.prototype.isEmpty($scope.data.arbitraryNum)){
                    $scope.data.arbitraryNum = "";
                    $('#arbitrarycharge')[0].placeholder="任意充";
                }
                if(chooseItem.cardId != $scope.orderForm.cardId){
                    $rootScope.initMarketInfo();
                }
                angular.forEach($scope.vipInfo.faceValueList,function(item,key){
                    if(chooseItem.cardId == item.cardId){
                        if(item.stock){
                            item.choosed = true;
                            $scope.orderForm.cardId = item.cardId;
                            $scope.orderForm.perValue = item.faceValue;
                            $scope.data.salePrice = item.salePrice;
                            $scope.data.purNum = item.buyNum;
                            $scope.data.cardNum = '1';
                            $cookieStore.remove("VipCardNum");
                            $cookieStore.put("VipCardNum",$scope.data.cardNum);
                            var faceName = item.faceName;
                            if(faceName == "月卡" || faceName == "年卡" || faceName == "季卡"
                                || faceName == "VIP1个月" || faceName == "VIP3个月" || faceName == "VIP1年")
                            {
                                $scope.orderForm.cardName = item.faceName;
                            }else{
                                $scope.orderForm.cardName = '';
                            }
                        }else{
                            item.choosed = false;
                            $scope.orderForm.cardId = '';
                            $scope.orderForm.perValue = '';
                            $scope.data.salePrice = '';
                            $scope.data.purNum = '';
                            $scope.data.cardNum = '';
                        }
                        $scope.getCash();
                    }else{
                        item.choosed = false;
                    }
                });

            }

            $scope.chooseValueForInit = function(chooseItem){
                $scope.clearError('1');
                if(chooseItem.cardId != $scope.orderForm.cardId){
                    $rootScope.initMarketInfo();
                }
                angular.forEach($scope.vipInfo.faceValueList,function(item,key){
                    if(chooseItem.cardId == item.cardId){
                        if(item.stock){
                            item.choosed = true;
                            $scope.orderForm.cardId = item.cardId;
                            $scope.orderForm.perValue = item.faceValue;
                            $scope.data.salePrice = item.salePrice;
                            $scope.data.purNum = item.buyNum;
                            $scope.data.cardNum = '1';
                            var faceName = item.faceName;
                            if(faceName == "月卡" || faceName == "年卡" || faceName == "季卡"
                                || faceName == "VIP1个月" || faceName == "VIP3个月" || faceName == "VIP1年")
                            {
                                $scope.orderForm.cardName = item.faceName;
                            }else{
                                $scope.orderForm.cardName = '';
                            }
                        }else{
                            item.choosed = false;
                            $scope.orderForm.cardId = '';
                            $scope.orderForm.perValue = '';
                            $scope.data.salePrice = '';
                            $scope.data.purNum = '';
                            $scope.data.cardNum = '';
                        }
                        $scope.getCash();
                    }else{
                        item.choosed = false;
                    }
                });

            }

            $scope.checkCardNum = function(type){
                if('1' == type){
                    $scope.data.cardNum = $scope.data.cardNum.replace(/\D/g,'');
                }else if('2' == type){
                    if(!Tools.prototype.isEmpty($scope.data.cardNum) && parseInt($scope.data.cardNum) > 1){
                        $scope.data.cardNum = parseInt($scope.data.cardNum) - 1 + '';
                    }else{
                        $scope.data.cardNum = '1';
                    }
                }else if('3' == type){
                    if(Tools.prototype.isEmpty($scope.data.cardNum)){
                        $scope.data.cardNum = '1';
                    }else{
                        $scope.data.cardNum = parseInt($scope.data.cardNum) + 1 + '';
                    }
                }
                if($scope.checkCardNumLimit($scope.data.cardNum)){
                    $scope.errorData.errorMsg = '';
                    $scope.getCash();
                }else{
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.card_num_error;
                    $scope.data.cash = '';
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                }
            }

            $scope.checkCardNumLimit = function(cardNum){
                if(Tools.prototype.isEmpty(cardNum)){
                    return false;
                }
                var cardNumInt = parseInt(cardNum);
                if(Tools.prototype.isEmpty($scope.data.purNum)){
                    return false;
                }
                var flag = false;
                var purNums1 = $scope.data.purNum.split(",");
                var purNums2;
                for(var i = 0; i < purNums1.length; i ++){
                    if(purNums1[i].indexOf("-") != -1){
                        purNums2 = purNums1[i].split("-");
                        if(cardNumInt >= parseInt(purNums2[0]) && cardNumInt <= parseInt(purNums2[1])){
                            flag = true;
                            break;
                        }
                    }else if(parseInt(purNums1[i]) == cardNumInt){
                        flag = true;
                        break;
                    }

                }
                if(flag){
                    $cookieStore.remove("VipCardNum");
                    $cookieStore.put("VipCardNum",$scope.data.cardNum);
                }
                return flag;
            }

            $scope.clearArbitraryAmountError = function(type){
                if('1' == type){
                    //focus
                    $scope.clearError('1');
                    if(!Tools.prototype.isEmpty($('#arbitrarycharge')[0])){
                        $('#arbitrarycharge')[0].placeholder="";
                    }
                    $scope.clearFaceValue('2');
                    $scope.data.isArbitrary = true;
                    angular.forEach($scope.vipInfo.faceValueList,function(item,key){
                        if(item.arbitrary){
                            if(item.stock){
                                item.choosed = true;
                                $scope.orderForm.cardId = item.cardId;
                                $scope.orderForm.perValue = item.faceValue;
                                $scope.data.salePrice = item.salePrice;
                                $scope.data.purNum = item.buyNum;
                                $scope.data.cardNum = '';
                                var faceName = item.faceName;
                                if(faceName == "月卡" || faceName == "年卡" || faceName == "季卡"
                                    || faceName == "VIP1个月" || faceName == "VIP3个月" || faceName == "VIP1年")
                                {
                                    $scope.orderForm.cardName = item.faceName;
                                }else{
                                    $scope.orderForm.cardName = '';
                                }
                            }else{
                                item.choosed = false;
                                $scope.orderForm.cardId = '';
                                $scope.orderForm.perValue = '';
                                $scope.data.salePrice = '';
                                $scope.data.purNum = '';
                                $scope.data.cardNum = '';
                                $scope.data.arbitraryNum = '';
                            }
                        }else{
                            item.choosed = false;
                        }
                    });
                }else if('2' == type){
                    //blur
                    if(Tools.prototype.isEmpty($scope.data.arbitraryNum)){
                        $('#arbitrarycharge')[0].placeholder="任意充";
                    }
                }
            }

            $scope.clearFaceValue = function(type){
                if(!Tools.prototype.isEmpty($scope.vipInfo)){

                    angular.forEach($scope.vipInfo.faceValueList,function(item,key){
                        item.choosed = false;
                    });

                    if('1' == type){
                        $scope.orderForm.cardId = '';
                        $scope.orderForm.perValue = '';

                        if(!Tools.prototype.isEmpty($scope.data.arbitraryNum)){
                            $scope.data.arbitraryNum = "";
                            $('#arbitrarycharge')[0].placeholder="任意充";
                        }
                    }

                }
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

            $scope.getCash = function(){
                if(!Tools.prototype.isEmpty($scope.data.arbitraryNum)){
                    $scope.data.cardNum = $scope.data.arbitraryNum;
                }
                if(!Tools.prototype.isEmpty($scope.data.cardNum) && parseInt($scope.data.cardNum) > 0){
                    $scope.data.cash =((parseFloat($scope.data.salePrice)*1000)*parseInt($scope.data.cardNum))/1000;
                    $rootScope.marketInfo.faceValue = parseInt($scope.orderForm.perValue) * parseInt($scope.data.cardNum);
                    $rootScope.marketInfo.getDefaultFlag = true;
                    $rootScope.getDefaultMarketBill($scope,'2');
                }else{
                    $scope.data.cash = '';
                    $rootScope.initMarketInfo();
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
            $scope.checkArbitraryAmount = function(type){
                if(Tools.prototype.isEmpty($scope.orderForm.cardId)){
                    $scope.data.arbitraryNum = '';
                    return;
                }
                $scope.data.arbitraryNum = $scope.data.arbitraryNum.replace(/\D/g,'');
                if($scope.checkCardNumLimit($scope.data.arbitraryNum)){
                    $scope.errorData.errorMsg = '';
                    $scope.getCash();
                }else{
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.card_num_error;
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                    $scope.data.cash = '';
                }
            }

            $scope.checkGameCount = function(type){
                if('1' == type){
                    $('#gameCount')[0].placeholder="";
                }else if('2' == type){
                    if(Tools.prototype.isEmpty($scope.data.gameCount)){
                        $('#gameCount')[0].placeholder="请输入手机号";
                    }else{
                        $cookieStore.remove("VipRechargeNo");
                        $cookieStore.put("VipRechargeNo",$scope.data.gameCount);
                    }
                    $scope.data.showCookie = false;
                }else if('3' == type){
                    if(!Tools.prototype.isEmpty($scope.data.gameCount)){
                        $scope.data.showCookie = true;
                    }else{
                        $scope.data.showCookie = false;
                    }
                }
            }

            $scope.chooseVipNo = function(vipNo){
                $scope.data.gameCount = vipNo;
                $scope.data.showCookie = false;
                $cookieStore.remove("VipRechargeNo");
                $cookieStore.put("VipRechargeNo",$scope.data.gameCount);
            }

            $scope.init = function(){
                if(!Tools.prototype.isEmpty($scope.vipInfo.faceValueList)){
                    angular.forEach($scope.vipInfo.faceValueList,function(item,key){
                        if(item.choosed && item.stock){
                            if(item.arbitrary){
                                $scope.data.isArbitrary = true;
                                $scope.clearArbitraryAmountError('1');
                            }else{
                                $scope.data.isArbitrary = false;
                                $scope.chooseValueForInit(item);
                                //$scope.chooseValue(item);
                            }
                            if(!Tools.prototype.isEmpty($cookieStore.get("VipCardNum"))){
                                $scope.data.cardNum = $cookieStore.get("VipCardNum");
                                if(item.arbitrary){
                                    $scope.data.arbitraryNum = $scope.data.cardNum;
                                }
                            }else{
                                $scope.data.cardNum = '1';
                            }
                            $scope.getCash();
                        }
                    });
                    if(!Tools.prototype.isEmpty($cookieStore.get("VipRechargeNo"))){
                        $scope.data.gameCount = $cookieStore.get("VipRechargeNo");
                    }
                }
            }

            $scope.init();

            $scope.takeOrder = function($event,bank){
                $event.target.disabled = true;

                if(Tools.prototype.isEmpty($scope.orderForm.cardId)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_face_value;
                    $event.target.disabled = false;
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                    return;
                }

                if(!Tools.prototype.isEmpty($scope.data.arbitraryNum)){
                    $scope.data.cardNum = $scope.data.arbitraryNum;
                }

                if(Tools.prototype.isEmpty($scope.data.cardNum)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_card_num;
                    $event.target.disabled = false;
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                    return;
                }

                if(!$scope.checkCardNumLimit($scope.data.cardNum)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.card_num_error;
                    $event.target.disabled = false;
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                    return;
                }

                if(Tools.prototype.isEmpty($scope.data.gameCount)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_phone;
                    $event.target.disabled = false;
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                    return;
                }

                $rootScope.bank = bank;
                $scope.orderForm.cardNum = $scope.data.cardNum;
                $scope.orderForm.gameCount = $scope.data.gameCount;
                $scope.orderForm.marketBillId = $rootScope.marketInfo.billId;
                //下单支付
                OrderService.takeSaleOrder($scope.orderForm,function(data){
                    if('success' ==  data.message){
                        $rootScope.saveCookies('vipNoes',$scope.orderForm.gameCount);
                        var payForm = {
                            orderNo:data.data[0].billId,
                            bankCode:bank.bankCode,
                            payTypeId:bank.payTypeId,
                            payType:bank.payType,
                            returnUrl:'http://web.yiqianlian.com/ccbCustom/success/'+$rootScope.code+'/viprecharge',
                            code:$rootScope.code,
                            memberId:$rootScope.userLoginId,
                            marketBillId:$scope.orderForm.marketBillId
                        };
                        if('0808' == payForm.bankCode){
                            if (/android/i.test(navigator.userAgent)){
                                payForm.payoutName = 'Android';
                            }else if (/ipad|iphone/i.test(navigator.userAgent)){
                                payForm.payoutName = 'iPhone';
                            }
                        }
                        PayService.getPayUrlForMobile(payForm,function(data){
                            if('success' == data.message){
                                location.href = data.data[0];
                            }else{
                                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.pay_error;
                                $scope.errorData.popMsg = $scope.errorData.errorMsg;
                                $scope.model.show();
                            }
                            $event.target.disabled = false;
                        });
                    }else{
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                        $event.target.disabled = false;
                        $scope.errorData.popMsg = $scope.errorData.errorMsg;
                        $scope.model.show();
                    }
                });

            }

            if(!Tools.prototype.isEmpty($rootScope.lastUrl)){
                OrderService.takeSaleOrder($rootScope.lastForm,function(data){
                    if('success' ==  data.message){
                        $rootScope.saveCookies('vipNoes',$scope.lastForm.gameCount);
                        var payForm = {
                            orderNo:data.data[0].billId,
                            bankCode:$rootScope.bank.bankCode,
                            payTypeId:$rootScope.bank.payTypeId,
                            payType:$rootScope.bank.payType,
                            returnUrl:'http://web.yiqianlian.com/ccbCustom/success/'+$rootScope.code+'/viprecharge',
                            code:$rootScope.code,
                            memberId:$rootScope.userLoginId,
                            marketBillId:$rootScope.lastForm.marketBillId
                        };
                        if('0820' == payForm.bankCode){
                            payForm.payoutName = data.data[0].cardName;
                        }
                        if('0808' == payForm.bankCode){
                            if (/android/i.test(navigator.userAgent)){
                                payForm.payoutName = 'Android';
                            }else if (/ipad|iphone/i.test(navigator.userAgent)){
                                payForm.payoutName = 'iPhone';
                            }
                        }
                        PayService.getPayUrlForMobile(payForm,function(data){
                            if('success' == data.message){
                                location.href = data.data[0];
                            }else{
                                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.pay_error;
                                $scope.errorData.popMsg = $scope.errorData.errorMsg;
                                $scope.model.show();
                            }
                            $rootScope.lastUrl = '';
                            $rootScope.lastForm = '';
                        });
                    }else{
                        $rootScope.lastUrl = '';
                        $rootScope.lastForm = '';
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                        $scope.errorData.popMsg = $scope.errorData.errorMsg;
                        $scope.model.show();
                    }
                });
            }

        }]);




   //卡密处理器
    app.controller('KamiRechargeCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','$ionicModal','MessageService','ProductService','OrderService','PayService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,$ionicModal,MessageService,ProductService,OrderService,PayService,MenuService){
            var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
            $("#copyright").html(copyright);
            $rootScope.menu = 'vipkamicharge';
            $rootScope.userData.title = '会员';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.viprecharge.desc;

            var telPho = $stateParams.telPho;
            $scope.data = {
                vipCardName:$stateParams.gamename,
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

            //提示蒙层
            $ionicModal.fromTemplateUrl('../../../partials/mobile/custom/ccb/common/prompt.html', {
                scope: $scope,
                focusFirstInput: false
            }).then(function(modal) {
                $scope.model = modal;
            });

            $scope.$on('$destroy', function() {
                $scope.model.remove();
            });

            $scope.confirm = function(){
                $scope.model.hide();
            }

            $scope.imgMatch = function(name){
                if(Tools.prototype.isEmpty(name)){
                    $state.go("viprecharge");
                    return;
                }

                if(name.indexOf("爱奇艺黄金会员") > -1){
                    $scope.data.imgUrl = "http://pic.ofcard.com/cards/standard/img/member-qiy.png";
                    return;
                }
            }

            $scope.vipCardInfo = '';
            if(!Tools.prototype.isEmpty($scope.data.vipCardName)){
                ProductService.getVipInfo({code:$rootScope.code,productName:$scope.data.vipCardName},function(data){
                    if("success" == data.message){
                        ProductService.chargeVipInfo.faceValueList = data.data[0].faceValueList;
                        $scope.vipCardInfo = ProductService.chargeVipInfo;
                        $scope.vipCardInfo.name = $scope.data.vipCardName;
                    }else{
                        $scope.vipCardInfo = '';
                        $state.go("viprecharge");
                        return;
                    }
                });
            }else{
                $scope.vipCardInfo = ProductService.chargeVipInfo;
                if(Tools.prototype.isEmpty($scope.vipCardInfo.name)){
                    $state.go('viprecharge');
                    return;
                }
                $scope.data.vipCardName = $scope.vipCardInfo.name;
            }

            $scope.imgMatch($scope.data.vipCardName);

            var cookieNoes = Tools.prototype.saveCookie("vipCardNoes");
            if(Tools.prototype.isEmpty(cookieNoes)){
                $scope.data.hasCookie = false;
                $scope.vipCardNoes = '';
            }else{
                $scope.data.hasCookie = true;
                $scope.vipCardNoes = cookieNoes.split(";");
            }

            $scope.showCookie = function(){
                $scope.data.showCookie = !$scope.data.showCookie;
            }

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
                        $scope.errorData.popMsg = $scope.errorData.phoneNoError;
                        $scope.model.show();
                    }
                    $scope.data.showCookie = false;
                }else if('3' == type){
                    $scope.data.telPho = '';
                    $scope.data.showCookie = false;
                    $scope.errorData.phoneNoError='';
                    $scope.errorData.errorMsg = '';
                    $scope.data.mobileType = '';
                    $scope.data.cityin = '';
                }else if('4' == type){
                    $scope.errorData.phoneNoError='';
                    $scope.errorData.errorMsg = '';
                }
            }

            $scope.clearFaceValue = function(){
                $scope.orderForm.perValue = '';
                angular.forEach($scope.vipCardInfo.faceValueList,function(item,key){
                    item.choosed = false;
                    item.stock = false;
                });
            }

            $scope.clearCookie = function(){
                Tools.prototype.saveCookie("vipCardNoes",null);
                $scope.vipCardNoes = '';
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
                        $cookieStore.remove("VipCardRechargeNo");
                        $cookieStore.put("VipCardRechargeNo",$scope.data.telPho);
                        ProductService.getPhoneInfo($scope.data.telPho,function(data){
                            if("success" == data.message){
                                if(data.data[0].prvcin == data.data[0].cityin){
                                    $scope.data.cityin = data.data[0].prvcin;
                                }else{
                                    $scope.data.cityin = data.data[0].prvcin+' '+data.data[0].cityin;
                                }
                                $scope.data.cityin += data.data[0].mobileType;
                                $scope.data.mobileType = data.data[0].mobileType;
                                $cookieStore.remove("VipCardRechargeInfo");
                                $cookieStore.put("VipCardRechargeInfo",$scope.data.cityin);
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
                        $scope.errorData.popMsg = $scope.errorData.phoneNoError;
                        $scope.model.show();
                    }

                }else{
                    if(!Tools.prototype.isEmpty($scope.data.mobileType) || !Tools.prototype.isEmpty($scope.data.cityin)){
                        $scope.data.cityin='';
                        $scope.data.mobileType = '';
                    }
                    $scope.errorData.phoneNoError='';
                }
            }

            $scope.choosePhoneNo = function(telPho){
                $scope.data.telPho = telPho;
                $scope.data.showCookie = false;
                $scope.checkPhoneNo('2');
            }

            $scope.chooseValue = function(chooseItem){
                $scope.data.showCookie = false;
                if(Tools.prototype.isEmpty(chooseItem.cardId)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                    $scope.data.cash = '';
                    return;
                }
                if(chooseItem.cardId != $scope.orderForm.cardId){
                    $rootScope.initMarketInfo();
                }
                angular.forEach($scope.vipCardInfo.faceValueList,function(item,key){
                    if(chooseItem.cardId == item.cardId){
                        if(item.stock){
                            item.choosed = true;
                            $scope.orderForm.cardId = item.cardId;
                            $scope.orderForm.perValue = item.faceValue;
                            $scope.data.salePrice = item.salePrice;
                            $scope.data.purNum = item.buyNum;
                            $scope.data.cardNum = 1;
                            $cookieStore.remove("VipCardCardNum");
                            $cookieStore.put("VipCardCardNum",$scope.data.cardNum);
                        }else{
                            item.choosed = false;
                            $scope.orderForm.cardId = '';
                            $scope.orderForm.perValue = '';
                            $scope.data.salePrice = '';
                            $scope.data.purNum = '';
                            $scope.data.cardNum = '';
                        }
                        $scope.getCash();
                    }else{
                        item.choosed = false;
                    }
                });
                $scope.clearError('4');
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
                        } else if ($scope.data.cardNum > 10) {
                            $scope.data.cardNum = 10;
                        }
                    }
                }else if(type == '3'){
                    if ($scope.data.cardNum == 10){
                        $scope.data.cardNum = 10;
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
                $cookieStore.remove("VipCardCardNum");
                $cookieStore.put("VipCardCardNum",$scope.data.cardNum);
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

            if(!Tools.prototype.isEmpty($scope.vipCardInfo.faceValueList)){
                angular.forEach($scope.vipCardInfo.faceValueList,function(item,key){
                    if(item.choosed && !Tools.prototype.isEmpty(item.salePrice)){
                        $scope.data.purNum = item.buyNum;
                        $scope.data.salePrice = item.salePrice;
                        $scope.orderForm.cardId = item.cardId;
                        $scope.orderForm.perValue = item.faceValue;
                        if(!Tools.prototype.isEmpty($cookieStore.get("VipCardCardNum"))){
                            $scope.data.cardNum = $cookieStore.get("VipCardCardNum");
                        }else{
                            $scope.data.cardNum = 1;
                        }
                        $scope.getCash();
                    }
                });

                if(!Tools.prototype.isEmpty($cookieStore.get("VipCardRechargeNo"))){
                    $scope.data.telPho = $cookieStore.get("VipCardRechargeNo");
                    var vipCardRechargeInfo = $cookieStore.get("VipCardRechargeInfo");
                    var vipCardTypeInfo = $cookieStore.get("VipCardTypeInfo");
                    if(!Tools.prototype.isEmpty(vipCardRechargeInfo)){
                        $scope.data.cityin = vipCardRechargeInfo;
                        $scope.data.mobileType  = vipCardTypeInfo;
                    }
                }

            }

            $scope.takeOrder = function($event,bank){
                $scope.orderForm.cardNum = $scope.data.cardNum;
                $event.target.disabled = true;
                $scope.data.showCookie = false;
                if(Tools.prototype.isEmpty($scope.data.telPho)){
                    $scope.errorData.phoneNoError=MessageService.errorMsg.commonMsg.no_phone;
                    $scope.errorData.popMsg = $scope.errorData.phoneNoError;
                    $scope.model.show();
                    $event.target.disabled = false;
                    return;
                }
                if(!Tools.prototype.isMobileNo($scope.data.telPho) || Tools.prototype.is170MobileNo($scope.data.telPho)){
                    $scope.errorData.phoneNoError=MessageService.errorMsg.orderMsg.phone_no_error;
                    $scope.errorData.popMsg = $scope.errorData.phoneNoError;
                    $scope.model.show();
                    $event.target.disabled = false;
                    return;
                }
                if(Tools.prototype.isEmpty($scope.orderForm.perValue)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_face_value;
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                    $event.target.disabled = false;
                    return;
                }
                if(Tools.prototype.isEmpty($scope.orderForm.cardNum)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_card_num;
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                    $event.target.disabled = false;
                    return;
                }
                //查询库存
                ProductService.getVipCardStock({cardId:$scope.orderForm.cardId,code:$rootScope.code},function (data){
                    if ("success" == data.message && 0 < data.data.length && (parseInt(data.data[0].purNum) >= parseInt($scope.orderForm.cardNum))) {
                        $rootScope.bank = bank;
                        $scope.orderForm.telPho = $scope.data.telPho;
                        $scope.orderForm.marketBillId = $rootScope.marketInfo.billId;
                        OrderService.takeSaleOrder($scope.orderForm,function(data){
                            $rootScope.saveCookies('vipCardNoes',$scope.orderForm.telPho);
                            if('success' ==  data.message){
                                var payForm = {
                                    orderNo:data.data[0].billId,
                                    bankCode:bank.bankCode,
                                    payTypeId:bank.payTypeId,
                                    payType:bank.payType,
                                    returnUrl:'http://web.yiqianlian.com/mobile/success/'+$rootScope.code+'/viprecharge',
                                    code:$rootScope.code,
                                    memberId:$rootScope.userLoginId,
                                    marketBillId:$scope.orderForm.marketBillId
                                };
                                if('0808' == payForm.bankCode){
                                    if (/android/i.test(navigator.userAgent)){
                                        payForm.payoutName = 'Android';
                                    }else if (/ipad|iphone/i.test(navigator.userAgent)){
                                        payForm.payoutName = 'iPhone';
                                    }
                                }
                                PayService.getPayUrlForMobile(payForm,function(data){
                                    if('success' == data.message){
                                        location.href = data.data[0];
                                    }else{
                                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.pay_error;
                                        $scope.errorData.popMsg = $scope.errorData.errorMsg;
                                        $scope.model.show();
                                    }
                                    $event.target.disabled = false;
                                });
                            }else{
                                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                                $scope.errorData.popMsg = $scope.errorData.errorMsg;
                                $scope.model.show();
                                $event.target.disabled = false;
                            }
                        });

                    }else{
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                        $scope.errorData.popMsg = $scope.errorData.errorMsg;
                        $scope.model.show();
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
                            returnUrl:'http://web.yiqianlian.com/mobile/success/'+$rootScope.code+'/viprecharge',
                            code:$rootScope.code,
                            memberId:$rootScope.userLoginId,
                            marketBillId:$rootScope.lastForm.marketBillId
                        };
                        if('0808' == payForm.bankCode){
                            if (/android/i.test(navigator.userAgent)){
                                payForm.payoutName = 'Android';
                            }else if (/ipad|iphone/i.test(navigator.userAgent)){
                                payForm.payoutName = 'iPhone';
                            }
                        }
                        PayService.getPayUrlForMobile(payForm,function(data){
                            if('success' == data.message){
                                location.href = data.data[0];
                            }else{
                                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.pay_error;
                                $scope.errorData.popMsg = $scope.errorData.errorMsg;
                                $scope.model.show();
                            }
                            $rootScope.lastUrl = '';
                            $rootScope.lastForm = '';
                        });
                    }else{
                        $rootScope.lastUrl = '';
                        $rootScope.lastForm = '';
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                        $scope.errorData.popMsg = $scope.errorData.errorMsg;
                        $scope.model.show();
                    }
                });
            }

        }]);


});
