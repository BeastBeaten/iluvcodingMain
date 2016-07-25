/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.web.controller.game.gameModule',[]);

    app.controller('GameRechargeCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','$ionicModal','MessageService','ProductService','OrderService','PayService','MenuService','CommonService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,$ionicModal,MessageService,ProductService,OrderService,PayService,MenuService,CommonService){

            $scope.lettersList = CommonService.getLettersList;
            $scope.hotGameList = CommonService.getHotGameList;
            $scope.allGameList = [];
            ProductService.getWebGameList(function(data){
                if("success" == data.message){
                    angular.forEach(data.data,function(item,key){
                        $scope.allGameList.push(item);
                    });
                }
            });
            $scope.data = {
                showHotGame:$scope.lettersList[0].choosed?true:false
            };
            if(!$scope.lettersList[0].choosed){
                angular.forEach($scope.lettersList,function(item,key){
                    if(item.choosed){
                        $scope.data.gameFilter = item.name;
                    }
                });
            }
            $scope.chooseLetter = function(letter){
                if($scope.lettersList[0].name == letter){
                    $scope.data.showHotGame = true;
                }else{
                    $scope.data.showHotGame = false;
                }
                angular.forEach($scope.lettersList,function(item,key){
                    if(item.name == letter){
                        item.choosed = true;
                        $scope.data.gameFilter = item.name;
                    }else{
                        item.choosed = false;
                    }
                });
            }

            $scope.goBuy = function(gameName){
                $state.go('gameList',{gameName:gameName});
            }
        }]);

    app.controller('GameListCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','MenuService','OrderService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,MenuService,OrderService){
            $scope.data = {
                gameName:$stateParams.gameName,
                isBattleAccount:$stateParams.gameName == '魔兽世界' ? true : false,
                chooseBattleAccount:false,
                battleAccount:'',
                gameCount:'',
                arbitraryNum:'',
                isArbitrary:false,
                cardNum:'1',
                purNum:'',
                salePrice:'',
                cash:'',
                orderType:'GAMERECHARGE',
                cardId:'',
                code:$rootScope.code,
                perValue:'',
                gameArea:'',
                gameServer:'',
                cardName:'',
                searchRoute:'gameOrderSearch',
                faceValue:'',
                billId:'',
                cardNameTemp:''
            };
            $scope.errorData = {
                errorMsg:'',
                battleMsg:''
            }
            $scope.gameArea = '';
            $scope.gameServer = '';
            $scope.gameItemList = '';

            ProductService.getWebGameInfo({code:$rootScope.code,productName:$scope.data.gameName},function(data){
                if("success" == data.message){
                    $scope.gameItemList = data.data;
                    $scope.faceValueList=data.data[0].faceValueList;
                    $scope.data.cardName=data.data[0].name;
                }else{
                    $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_game_product;
                }
            });


            $scope.chooseFaceValue = function(cardId) {
                $scope.errorData.errorMsg = '';
                angular.forEach($scope.faceValueList, function (item, key) {
                    if (cardId == item.cardId) {
                        $scope.data.perValue = item.faceValue;
                        item.choosed = true;
                        ProductService.checkCanOrder({cardId:cardId,code:$rootScope.code}, function (data) {
                            if ('success' == data.message) {
                                item.stock = true;
                                $scope.errorData.errorMsg = '';
                                $scope.data.cardId = item.cardId;
                                $scope.data.purNum = item.buyNum;
                                $scope.data.salePrice = parseFloat(item.salePrice);
                                $scope.data.cash = ($scope.data.salePrice * 1000 * parseFloat($scope.data.cardNum))/1000;
                                $scope.data.cardName=$scope.data.cardName + item.faceName;
                                $scope.getGameAreas($scope.data.cardId);
                            } else {
                                item.stock = false;
                                $scope.data.cardId = '';
                                $scope.data.purNum = 0;
                                $scope.data.salePrice = '';
                                $scope.data.cash='';
                                $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_game_product_stock;
                            }
                        });

                    }else{
                        item.choosed = false;
                    }
                });
            }

            $scope.clearError = function(){
                $scope.errorData.errorMsg = '';
                $scope.errorData.battleMsg = '';
            }

            $scope.checkCardNum = function(type){
                if(Tools.prototype.isEmpty($scope.data.cardId)){
                    return false;
                }
                if(type == 3){
                    if(Tools.prototype.isEmpty($scope.data.cardNum)){
                        $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_card_num;
                    }
                    type = 2;
                }
                if('1' == type){
                    if($scope.errorData.errorMsg == $rootScope.errorMsg.gameMsg.no_card_num){
                        $scope.errorData.errorMsg = '';
                    }
                    //$scope.game.cardNum = $scope.game.cardNum.replace(/\D/g,'');
                    if((!/^[0-9]*$/.test($scope.data.cardNum))){
                        $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_card_num;
                        return false;
                    }
                    if(!Tools.prototype.isEmpty($scope.data.cardNum)){
                        var tempCardNum = parseInt($scope.data.cardNum);
                        var flag = $scope.validCardNum(tempCardNum);
                        if(!flag){
                            $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_card_num;
                        } else {
                            $scope.data.cash = ($scope.data.salePrice * 1000 * $scope.data.cardNum)/1000;
                        }
                        return flag;
                    }else{
                        return false;
                    }
                }else if('2' == type){
                    if(!Tools.prototype.isEmpty($scope.errorData.errorMsg) && $scope.errorData.errorMsg!= $rootScope.errorMsg.gameMsg.no_card_num){
                        return false;
                    }
                    if(Tools.prototype.isEmpty($scope.data.cardNum)){
                        return false;
                    }
                    if($scope.checkCardNum('1')){
                        $scope.errorData.errorMsg = '';
                        $scope.data.cash = ($scope.data.salePrice * 1000 * $scope.data.cardNum)/1000;
                    }else{
                        $scope.data.cash = '';
                    }
                }
            }

            $scope.validCardNum = function(cardNum) {
                var purNum = $scope.data.purNum;
                if (purNum == '' || purNum == null) {
                    return false;
                }
                var splitItem = purNum.split(',');
                if (splitItem.length > 1) {
                    for (var c = 0;c<splitItem.length; c++) {
                        var item1 = splitItem[c];
                        if(item1.indexOf('-') != -1){
                            var splitTempItem = item1.split('-');
                            var purNumMin = parseInt(splitTempItem[0]);
                            var purNumMax = parseInt(splitTempItem[1]);
                            if(cardNum >= purNumMin && cardNum <= purNumMax){
                                return true;
                            }
                        } else if (cardNum == parseInt(item1)) {
                            return true;
                        }
                    }
                } else {
                    if(purNum.indexOf('-') != -1){
                        var purNumMin = parseInt(purNum.split('-')[0]);
                        var purNumMax = parseInt(purNum.split('-')[1]);
                        if(cardNum >= purNumMin && cardNum <= purNumMax){
                            return true;
                        }
                    } else if (cardNum == parseInt(purNum)) {
                        return true
                    }
                }
                return false;
            }

            $scope.checkBattleAccount = function(type){
                if('1' == type){
                    $scope.errorData.battleMsg = '';
                }else if('2' == type){
                    if(Tools.prototype.isEmpty($scope.data.battleAccount)){
                        return false;
                    }
                    if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test($scope.data.battleAccount) || 50 < $scope.data.battleAccount.length){
                        $scope.errorData.battleMsg = $rootScope.errorMsg.gameMsg.battle_account_format_error;
                        return false;
                    }
                    $scope.errorData.battleMsg = '';
                    return true;
                }

            }
            $scope.makeOnly = function(){
                $scope.errorData.errorMsg = '';
            }
            $scope.checkGameAccount = function(){
                if(Tools.prototype.isEmpty($scope.data.gameCount)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_game_count;
                    return false;
                }
                $scope.errorData.errorMsg = '';
                return true;
            }
            $scope.getGameAreas = function(cardId){
                if(!Tools.prototype.isEmpty(cardId)){
                    ProductService.getGameArea({'cardId':cardId},function(data){
                        if('success' == data.message){
                            $scope.gameArea = data.data;
                        }else{
                            $scope.gameArea = '';
                        }
                    })
                }else{
                    $scope.gameArea = '';
                }
            }
            $scope.getGameServices = function(cardId,gameArea){
                if(!Tools.prototype.isEmpty(cardId) && !Tools.prototype.isEmpty(gameArea)){
                    ProductService.getGameServer({'cardId':cardId,'gameArea':gameArea},function(data){
                        if('success' == data.message){
                            $scope.gameServer = data.data;
                        }else{
                            $scope.gameServer = '';
                        }
                    })
                }else{
                    $scope.gameServer = '';
                }
            }
            $scope.chooseArea = function(){
                if(!Tools.prototype.isEmpty($scope.data.gameArea) && $scope.errorData.errorMsg == $rootScope.errorMsg.gameMsg.no_game_area){
                    $scope.errorData.errorMsg = '';
                }
                if (!Tools.prototype.isEmpty($scope.data.gameArea)) {
                    $scope.getGameServices($scope.data.cardId,$scope.data.gameArea);
                }
            }
            $scope.chooseServer = function(){
                if(!Tools.prototype.isEmpty($scope.data.gameServer) && $scope.errorData.errorMsg == $rootScope.errorMsg.gameMsg.no_game_server){
                    $scope.errorData.errorMsg = '';
                }
            }
            $scope.submit = function(){
                $scope.errorData.errorMsg = '';
                if(Tools.prototype.isEmpty($scope.data.cardId)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_face_value;
                    return false;
                }

                if(!$scope.checkCardNum('1')){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_card_num;
                    return false;
                }
                if($scope.data.isBattleAccount){
                    if(Tools.prototype.isEmpty($scope.data.battleAccount)){
                        $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_battle_account;
                        return false;
                    }else if(!$scope.checkBattleAccount('2')){
                        return false;
                    }
                    if('1' != $scope.data.chooseBattleAccount){
                        if(!$scope.checkGameAccount()){
                            return false;
                        }
                    }
                }else{
                    if(!$scope.checkGameAccount()){
                        return false;
                    }
                }

                if(!Tools.prototype.isEmpty($scope.gameArea) && Tools.prototype.isEmpty($scope.data.gameArea)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_game_area;
                    return false;
                }
                if(!Tools.prototype.isEmpty($scope.gameServer) && Tools.prototype.isEmpty($scope.data.gameServer)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_game_server;
                    return false;
                }

                ProductService.checkCanOrder({cardId:$scope.data.cardId,code:$scope.data.code}, function (data) {
                    if ('success' == data.message) {
                        $scope.errorData.errorMsg = '';
                        $scope.data.faceValue = (parseFloat($scope.data.perValue) * 1000 * parseInt($scope.data.cardNum))/1000;
                        $scope.data.searchRoute='gameOrderSearch';
                        $scope.data.cardNameTemp=$scope.data.cardName;
                        // 生成销售订单
                        OrderService.takeWebSaleOrder($scope.data,function (data1) {
                            // 下销售单成功
                            if("success" == data1.message && 0 < data1.data.length) {
                                $scope.data.billId = data1.data[0].billId;
                                // 跳转支付确认页面
                                $state.go("orderpay",{orderForm:Tools.prototype.putParams($scope.data)});
                            }
                        });
                    }else {
                        $scope.data.cardId = '';
                        $scope.data.purNum = 0;
                        $scope.data.salePrice = '';
                        $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_game_product_stock;
                    }
                });

            }
    }]);

    app.controller('GameSearchCtrl',['$rootScope','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','MenuService',
        function($rootScope,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,MenuService){
            $scope.orderForm = {
                tid:$stateParams.tid,
                rechargeAccount:'',
                type:'1',
                searchFlag:false
            };
            $scope.rePayFormList = [];
            $scope.errorData = {
                errorMsg:''
            };
            $scope.chooseSearchType = function(type){
                $scope.orderForm.type = type;
                $scope.orderForm.rechargeAccount='';
                $scope.errorData.errorMsg = '';
            }
            $scope.search = function(){
                if('2' == $scope.orderForm.type){
                    if(Tools.prototype.isEmpty($scope.orderForm.battleAccount)){
                        $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.no_battle_account;

                        return;
                    }
                    if($scope.checkBattleAccount()){
                        if(Tools.prototype.isEmpty($scope.orderForm.gameAccount)){
                            $scope.orderForm.rechargeAccount = $scope.orderForm.battleAccount+"$null";
                        }else{
                            $scope.orderForm.rechargeAccount = $scope.orderForm.battleAccount + "$" + $scope.orderForm.gameAccount;
                        }
                    }else{
                        return;
                    }

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
                    telPho:'',
                    rechargeAccount:'',
                    type:'1',
                    searchFlag:false
                };
                $scope.errorData = {
                    errorMsg:''
                };
                $("#dataTable").refreshData();
            }
            $scope.checkAccount = function(){
                if('1' == $scope.orderForm.type){
                    if(!$rootScope.commonUtils.isEmpty($scope.orderForm.rechargeAccount)){
                        $scope.errorData.errorMsg = '';
                    }
                }else if('2' == $scope.orderForm.type){
                    if(!$rootScope.commonUtils.isEmpty($scope.orderForm.battleAccount)){
                        $scope.errorData.errorMsg = '';
                    }
                }
            }
            $scope.checkBattleAccount = function(){
                if($rootScope.commonUtils.isEmpty($scope.orderForm.battleAccount)){
                    return false;
                }
                if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test($scope.orderForm.battleAccount) || 50 < $scope.orderForm.battleAccount.length){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.gameMsg.battle_account_format_error;
                    return false;
                }
                $scope.errorData.errorMsg = '';
                return true;
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
                        }else if(!Tools.prototype.isEmpty($scope.orderForm.tid) ){
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
                    "mDataProp":function(aData,type,val){
                        val = '';
                        if(null != aData.gameCount){
                            if(aData.gameCount.indexOf("$") > -1){
                                var temp= aData.gameCount.split("$");
                                if(null != temp[1] && 'null' != temp[1]){
                                    val  += temp[1];
                                }else{
                                    val  += temp[0];
                                }
                            }else{
                                val += aData.gameCount;
                            }
                        }
                        return val;
                    }
                },{
                    "mDataProp":"cash"
                },{
                    "mDataProp":"gameArea"
                },{
                    "mDataProp":"countType"
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
                            searchRoute:'gameOrderSearch',
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
                    angular.element(tds[tds.length-1]).append(orderStateElement);

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
