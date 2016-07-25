/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.game.gameModule',[]);

    app.controller('GameIndexCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,MenuService){
        var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
        $("#copyright").html(copyright);
        $rootScope.menu = 'gamerecharge';
        $rootScope.userData.title = '游戏';
        $rootScope.curRouter = $rootScope.menu;
        $rootScope.rechargeDesc =  MenuService.gamerecharge.desc;
    }]);

    app.controller('GameListCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,MenuService){
            $rootScope.menu = 'gamerecharge';
            $rootScope.userData.title = '游戏';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.gamerecharge.desc;
            $scope.letters = ProductService.getLettersList;

            $scope.data = {
                search:''
            };

            ProductService.getGameList(function(data){
                if('success' == data.message){
                    $scope.gameList = data.data;
                }else{
                    $scope.gameList = '';
                }
            });
            var cookieList = Tools.prototype.saveCookie("gameList");
            if(!Tools.prototype.isEmpty(cookieList)){
                $scope.rechargeGameList = cookieList.split(";");
            }else{
                $scope.rechargeGameList = '';
            }

            $scope.clearSearch = function(type){
                if('1' == type){
                    //focus
                    $('#search')[0].placeholder="";
                }else if('2' == type){
                    //blur
                    if(Tools.prototype.isEmpty($scope.data.search)){
                        $('#search')[0].placeholder="请输入游戏名称检索";
                    }
                }else if('3' == type){
                    //clear
                    $scope.data.search = '';
                    $('#search')[0].placeholder="请输入游戏名称检索";
                }
            }

            $scope.goCharge = function(gameName){
                $state.go("gamecharge",{gamename:gameName});
            }


    }]);

    app.controller('GameRechargeCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','$ionicModal','MessageService','ProductService','OrderService','PayService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,$ionicModal,MessageService,ProductService,OrderService,PayService,MenuService){
            var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
            $("#copyright").html(copyright);
            $rootScope.menu = 'gamecharge';
            $rootScope.userData.title = '游戏';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.gamerecharge.desc;
            $scope.data = {
                gameName:$stateParams.gamename,
                isBattleAccount:$stateParams.gamename == '魔兽世界' ? true : false,
                chooseBattleAccount:false,
                battleAccount:'',
                gameCount:'',
                arbitraryNum:'',
                isArbitrary:false,
                cardNum:'',
                purNum:'',
                salePrice:'',
                cash:'',
                hasGCCookie:false,
                showGCCookie:false,
                hasBCCookie:false,
                showBCCookie:false
            };
            $scope.gameAreas = '';
            $scope.gameServices = '';
            $scope.orderForm = {
                orderType:'GAMERECHARGE',
                gameCount:'',
                battleAccount:'',
                cardNum:'',
                cardType:0,
                cardId:'',
                gameArea:'',
                gameServer:'',
                perValue:'',
                memberId:$rootScope.userLoginId,
                platform:'Mobile',
                code:$rootScope.code,
                ofLinkId:$rootScope.ofLinkId
            };
            $scope.errorData = {
                errorMsg:''
            };

            $scope.gameInfo = '';
            if(!Tools.prototype.isEmpty($scope.data.gameName)){
                ProductService.getGameInfo({code:$rootScope.code,productName:$scope.data.gameName},function(data){
                    if("success" == data.message){
                        ProductService.chargeGameInfo.name = data.data[0].name;
                        ProductService.chargeGameInfo.icon = data.data[0].icon;
                        ProductService.chargeGameInfo.faceValueList = data.data[0].faceValueList;
                        $scope.gameInfo = ProductService.chargeGameInfo;
                    }else{
                        $scope.gameInfo = '';
                        $state.go('gamerecharge');
                        return;
                    }
                })
            }else{
                $scope.gameInfo = ProductService.chargeGameInfo;
                $scope.data.isBattleAccount = $scope.gameInfo.name == '魔兽世界' ? true : false;
                if(Tools.prototype.isEmpty($scope.gameInfo.name)){
                    $state.go('gamerecharge');
                    return;
                }
            }

            var cookieGCNoes = Tools.prototype.saveCookie("gameNoes");
            if(Tools.prototype.isEmpty(cookieGCNoes)){
                $scope.data.hasGCCookie = false;
                $scope.gameNoes = '';
            }else{
                $scope.data.hasGCCookie = true;
                $scope.gameNoes = cookieGCNoes.split(";");
            }

            $scope.showGCCookie = function(){
                $scope.data.showGCCookie = !$scope.data.showGCCookie;
            }

            $scope.clearGCCookie = function(){
                Tools.prototype.saveCookie("gameNoes",null);
                $scope.gameNoes = '';
                $scope.data.hasGCCookie = false;
                $scope.data.showGCCookie = false;

            }


            var cookieBCNoes = Tools.prototype.saveCookie("battleNoes");
            if(Tools.prototype.isEmpty(cookieBCNoes)){
                $scope.data.hasBCCookie = false;
                $scope.battleNoes = '';
            }else{
                $scope.data.hasBCCookie = true;
                $scope.battleNoes = cookieBCNoes.split(";");
            }

            $scope.showBCCookie = function(){
                $scope.data.showBCCookie = !$scope.data.showBCCookie;
            }

            $scope.clearBCCookie = function(){
                Tools.prototype.saveCookie("battleNoes",null);
                $scope.battleNoes = '';
                $scope.data.hasBCCookie = false;
                $scope.data.showBCCookie = false;

            }


            $scope.clearError = function(type){
                if('1' == type){
                    //清错误提示
                    $scope.errorData.errorMsg = '';
                }else if('2' == type){
                    $scope.data.gameCount = '';
                    $scope.data.showGCCookie = false;
                }else if('3' == type){
                    $scope.data.battleAccount = '';
                    $scope.data.showBCCookie = false;
                }
            }

            $scope.clearFaceValue = function(type){
                if(!Tools.prototype.isEmpty($scope.gameInfo)){

                    angular.forEach($scope.gameInfo.faceValueList,function(item,key){
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

                angular.forEach($scope.gameInfo.faceValueList,function(item,key){
                    if(chooseItem.cardId == item.cardId){
                        if(item.stock){
                            item.choosed = true;
                            $scope.orderForm.cardId = item.cardId;
                            $scope.orderForm.perValue = item.faceValue;
                            $scope.data.salePrice = item.salePrice;
                            $scope.data.purNum = item.buyNum;
                            $scope.data.cardNum = '';
                        }else{
                            item.choosed = false;
                            $scope.orderForm.cardId = '';
                            $scope.orderForm.perValue = '';
                            $scope.data.salePrice = '';
                            $scope.data.purNum = '';
                            $scope.data.cardNum = '';
                        }
                        $scope.getGameAreas($scope.orderForm.cardId);
                    }else{
                        item.choosed = false;
                    }
                });

                $scope.data.cash = '';

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
                    $cookieStore.remove("GameCardNum");
                    $cookieStore.put("GameCardNum",cardNum);
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
                    angular.forEach($scope.gameInfo.faceValueList,function(item,key){
                        if(item.arbitrary){
                            if(item.stock){
                                item.choosed = true;
                                $scope.orderForm.cardId = item.cardId;
                                $scope.orderForm.perValue = item.faceValue;
                                $scope.data.salePrice = item.salePrice;
                                $scope.data.purNum = item.buyNum;
                                $scope.data.cardNum = '';
                            }else{
                                item.choosed = false;
                                $scope.orderForm.cardId = '';
                                $scope.orderForm.perValue = '';
                                $scope.data.salePrice = '';
                                $scope.data.purNum = '';
                                $scope.data.cardNum = '';
                                $scope.data.arbitraryNum = '';
                            }
                            $scope.getGameAreas($scope.orderForm.cardId);
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
                    $scope.data.cash = '';
                }
            }

            $scope.checkGameCount = function(type){
                if('1' == type){
                    $('#gameCount')[0].placeholder="";
                }else if('2' == type){
                    if(Tools.prototype.isEmpty($scope.data.gameCount)){
                        $('#gameCount')[0].placeholder="请输入游戏账号";
                    }else{
                        $cookieStore.remove("GameRechargeNo");
                        $cookieStore.put("GameRechargeNo",$scope.data.gameCount);
                    }
                    $scope.data.showGCCookie = false;
                }else if('3' == type){
                    $('#battleAccount')[0].placeholder="";
                }else if('4' == type){
                    $scope.errorData.errorMsg = '';
                    if(Tools.prototype.isEmpty($scope.data.battleAccount)){
                        $('#battleAccount')[0].placeholder="请输入通行证账号";
                    }else if(!$scope.checkBattleCount()){
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.battle_account_format_error;
                    }else{
                        $cookieStore.remove("GameBattleRechargeNo");
                        $cookieStore.put("GameBattleRechargeNo",$scope.data.battleAccount);
                    }
                    $scope.data.showBCCookie = false;
                }else if('5' == type){
                    $('#gameAccount')[0].placeholder="";
                }else if('6' == type){
                    if(Tools.prototype.isEmpty($scope.data.gameCount)){
                        $('#gameAccount')[0].placeholder="请输入需要充值的游戏账号";
                    }else{
                        $cookieStore.remove("GameRechargeNo");
                        $cookieStore.put("GameRechargeNo",$scope.data.gameCount);
                    }
                    $scope.data.showGCCookie = false;
                }else if('7' == type){
                    if(!Tools.prototype.isEmpty($scope.data.gameCount)){
                        $scope.data.showGCCookie = true;
                    }else{
                        $scope.data.showGCCookie = false;
                    }
                }else if('8' == type){
                    if(!Tools.prototype.isEmpty($scope.data.battleAccount)){
                        $scope.data.showBCCookie = true;
                    }else{
                        $scope.data.showBCCookie = false;
                    }
                }
            }

            $scope.chooseGCNo = function(gcNo){
                $scope.data.gameCount = gcNo;
                $scope.data.showGCCookie = false;
                $cookieStore.remove("GameRechargeNo");
                $cookieStore.put("GameRechargeNo",$scope.data.gameCount);
            }

            $scope.chooseBCNo = function(bcNo){
                $scope.data.battleAccount = bcNo;
                $scope.data.showBCCookie = false;
                $cookieStore.remove("GameBattleRechargeNo");
                $cookieStore.put("GameBattleRechargeNo",$scope.data.battleAccount);
            }

            $scope.checkBattleCount = function(){
                if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test($scope.data.battleAccount) || 50 < $scope.data.battleAccount.length){
                    return false;
                }
                return true;
            }

            $scope.makeOnlyAccount = function(){
                $scope.data.chooseBattleAccount = !$scope.data.chooseBattleAccount;
            }

            $ionicModal.fromTemplateUrl('../../../partials/mobile/standard/game/game-area.html', {
                scope: $scope,
                focusFirstInput: false
            }).then(function(modal) {
                $scope.gameAreaModel = modal;
            });

            $ionicModal.fromTemplateUrl('../../../partials/mobile/standard/game/game-service.html', {
                scope: $scope,
                focusFirstInput: false
            }).then(function(modal) {
                $scope.gameServiceModel = modal;
            });

            $scope.$on('$destroy', function() {
                $scope.gameAreaModel.remove();
                $scope.gameServiceModel.remove();
            });

            $scope.getGameAreas = function(cardId){
                if(!Tools.prototype.isEmpty(cardId)){
                    ProductService.getGameArea({'cardId':cardId},function(data){
                        if('success' == data.message){
                            $scope.gameAreas = data.data;
                        }else{
                            $scope.gameAreas = '';
                        }
                    })
                }else{
                    $scope.gameAreas = '';
                }
            }

            $scope.getGameServices = function(cardId,gamearea){
                if(!Tools.prototype.isEmpty(cardId) && !Tools.prototype.isEmpty(gamearea)){
                    ProductService.getGameServer({'cardId':cardId,'gameArea':gamearea},function(data){
                        if('success' == data.message){
                            $scope.gameServices = data.data;
                        }else{
                            $scope.gameServices = '';
                        }
                    })
                }else{
                    $scope.gameServices = '';
                }
            }

            $scope.showGameAreaService = function(type){
                if('1' == type){
                    if('' != $scope.gameAreas){
                        $scope.gameAreaModel.show();
                    }
                }else if('2' == type){
                    if('' != $scope.gameServices){
                        $scope.gameServiceModel.show();
                    }
                }
            }

            $scope.chooseGameArea = function(gameArea){
                $scope.gameAreaModel.hide();
                if(!Tools.prototype.isEmpty(gameArea)){
                    $scope.orderForm.gameArea = gameArea;
                    $scope.getGameServices($scope.orderForm.cardId,gameArea);
                    $scope.orderForm.gameServer = '';
                    $cookieStore.remove("GameArea");
                    $cookieStore.put("GameArea",$scope.orderForm.gameArea);
                }
            }

            $scope.chooseGameService = function(gameService){
                $scope.gameServiceModel.hide();
                if(!Tools.prototype.isEmpty(gameService)){
                    $scope.orderForm.gameServer = gameService;
                    $cookieStore.remove("GameServer");
                    $cookieStore.put("GameServer",$scope.orderForm.gameServer);
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

            $scope.init = function(){
                if(!Tools.prototype.isEmpty($scope.gameInfo.faceValueList)){
                    angular.forEach($scope.gameInfo.faceValueList,function(item,key){
                        if(item.choosed && item.stock){
                            if(item.arbitrary){
                                $scope.data.isArbitrary = true;
                                $scope.clearArbitraryAmountError('1');
                            }else{
                                $scope.data.isArbitrary = false;
                                $scope.chooseValue(item);
                            }
                            if(!Tools.prototype.isEmpty($cookieStore.get("GameCardNum"))){
                                $scope.data.cardNum = $cookieStore.get("GameCardNum");
                                if(item.arbitrary){
                                    $scope.data.arbitraryNum = $scope.data.cardNum;
                                }
                            }
                            $scope.getCash();
                        }
                    });
                    if(!Tools.prototype.isEmpty($cookieStore.get("GameRechargeNo"))){
                        $scope.data.gameCount = $cookieStore.get("GameRechargeNo");
                    }
                    if(!Tools.prototype.isEmpty($cookieStore.get("GameBattleRechargeNo")) && $scope.data.isBattleAccount){
                        $scope.data.battleAccount = $cookieStore.get("GameBattleRechargeNo");
                    }
                    if($scope.data.isBattleAccount && Tools.prototype.isEmpty($scope.data.gameCount)){
                        $scope.data.chooseBattleAccount = true;
                    }
                    if(!Tools.prototype.isEmpty($cookieStore.get("GameArea"))){
                        $scope.orderForm.gameArea = $cookieStore.get("GameArea");
                        $scope.getGameServices($scope.orderForm.cardId,$scope.orderForm.gameArea);
                    }
                    if(!Tools.prototype.isEmpty($cookieStore.get("GameServer"))){
                        $scope.orderForm.gameServer = $cookieStore.get("GameServer");
                    }
                }
                $cookieStore.remove("GameCardNum");
                $cookieStore.remove("GameRechargeNo");
                $cookieStore.remove("GameBattleRechargeNo");
                $cookieStore.remove("GameArea");
                $cookieStore.remove("GameServer");
            }

            $scope.init();

            $scope.takeOrder = function($event,bank){
                $event.target.disabled = true;

                if(Tools.prototype.isEmpty($scope.orderForm.cardId)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_face_value;
                    $event.target.disabled = false;
                    return;
                }

                if(!Tools.prototype.isEmpty($scope.data.arbitraryNum)){
                    $scope.data.cardNum = $scope.data.arbitraryNum;
                }

                $scope.orderForm.cardNum = $scope.data.cardNum;

                if(Tools.prototype.isEmpty($scope.orderForm.cardNum)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_card_num;
                    $event.target.disabled = false;
                    return;
                }

                if(!$scope.checkCardNumLimit($scope.orderForm.cardNum)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.card_num_error;
                    $event.target.disabled = false;
                    return;
                }

                if($scope.data.isBattleAccount){
                    if(Tools.prototype.isEmpty($scope.data.battleAccount)){
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_battle_account;
                        $event.target.disabled = false;
                        return;
                    }else if(!$scope.checkBattleCount()){
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.battle_account_format_error;
                        $event.target.disabled = false;
                        return;
                    }
                    if(!$scope.data.chooseBattleAccount && Tools.prototype.isEmpty($scope.data.gameCount)){
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_game_account;
                        $event.target.disabled = false;
                        return;
                    }
                }else{
                    if(Tools.prototype.isEmpty($scope.data.gameCount)){
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_game_account;
                        $event.target.disabled = false;
                        return;
                    }
                }

                if(!Tools.prototype.isEmpty($scope.gameAreas) && Tools.prototype.isEmpty($scope.orderForm.gameArea)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_game_area;
                    $event.target.disabled = false;
                    return;
                }

                if(!Tools.prototype.isEmpty($scope.gameServices) && Tools.prototype.isEmpty($scope.orderForm.gameServer)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_game_service;
                    $event.target.disabled = false;
                    return;
                }

                $scope.orderForm.gameCount = $scope.data.gameCount;
                $scope.orderForm.battleAccount = $scope.data.battleAccount;
                $scope.orderForm.marketBillId = $rootScope.marketInfo.billId;
                $rootScope.bank = bank;

                OrderService.takeSaleOrder($scope.orderForm,function(data){
                    if('success' ==  data.message){
                        $rootScope.saveCookies('gameNoes',$scope.orderForm.gameCount);
                        $rootScope.saveCookies('battleNoes',$scope.orderForm.battleAccount);
                        var payForm = {
                            orderNo:data.data[0].billId,
                            bankCode:bank.bankCode,
                            payTypeId:bank.payTypeId,
                            payType:bank.payType,
                            returnUrl:'http://web.yiqianlian.com/mobile/success/'+$rootScope.code+'/gamerecharge',
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
                        $rootScope.saveCookies('gameNoes',$scope.lastForm.gameCount);
                        $rootScope.saveCookies('battleNoes',$scope.lastForm.battleAccount);
                        var payForm = {
                            orderNo:data.data[0].billId,
                            bankCode:$rootScope.bank.bankCode,
                            payTypeId:$rootScope.bank.payTypeId,
                            payType:$rootScope.bank.payType,
                            returnUrl:'http://web.yiqianlian.com/mobile/success/'+$rootScope.code+'/gamerecharge',
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
