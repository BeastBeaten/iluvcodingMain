/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.web.controller.gas.gasModule',[]);

    app.controller('GasRechargeCtrl',['$rootScope','$scope','$ionicModal','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','OrderService','PayService','MemberService','MenuService','CommonService',
        function($rootScope,$scope,$ionicModal,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,OrderService,PayService,MemberService,MenuService,CommonService){
            $scope.data = {
                cardId:'',
                peUserName:'',
                gasCardNo:'',
                gameCount:'',
                gasCardName:'',
                gasCardTel:'',
                getOilFlag:false,
                cardNum:'1',
                isOneFaceValue:false,
                gasCardIsNoUse:'',
                isShowDesc:false,
                orderType:'GASRECHARGE',
                perValue:'',
                cno:'1',
                oilNO:'',
                boardId:'',
                purNum:'',
                maxCardNum:'',
                inPrice:'',
                opt:'',
                expression:'',
                cash:'',
                salePrice:'',
                code:$rootScope.code,
                valueDisable:true,
                cardName:'',
                cardNameTemp:''

            };
            $scope.menuFlag = '0';
            $scope.errorData = {
                errorMsg: '',
                oilNOMsg:'',
                nameError:'',
                telError:''
            };
            $scope.clearError = function(){
                $scope.errorData = {
                    errorMsg: '',
                    oilNOMsg:'',
                    nameError:'',
                    telError:''
                };
            }

            $scope.clearForm = function(type){
                if('1' == type){
                    $scope.data.gasCardNo = '';
                }else if('2' == type){
                    $scope.data.gasCardTel = '';
                }
            }

            $scope.showDesc = function(){
                $scope.data.isShowDesc = !$scope.data.isShowDesc;
            }

            $scope.initFaceValueList = function(id){
                // 中石化&非任意充
                if (id == '2593403') {
                    $scope.faceValueList = ProductService.getFaceValueForWebGasRecharge;
                    // 任意充
                } else {
                    $scope.faceValueList = ProductService.getFaceValueForWebOneGasRecharge;
                    $scope.data.isOneFaceValue = true;
                }
                angular.forEach($scope.faceValueList, function (item, key) {
                    if (parseInt(item.faceValue) == 500) {
                        item.choosed = true;
                        $scope.chooseFaceValue(item.faceValue);
                    }
                });
            }
            $scope.chooseFaceValue = function (value) {
                $scope.clearError();
                $scope.data.cardNum = '1';
                angular.forEach($scope.faceValueList, function (item, key) {
                    if (item.faceValue == value) {
                        // 加油卡卡号为空
                        if (Tools.prototype.isEmpty(value)) {
                            $scope.errorData.oilNOMsg = $rootScope.errorMsg.no_oilNo;
                            return;
                        }
                        if (Tools.prototype.isEmpty($scope.data.gasCardNo)) {
                            $scope.errorData.oilNOMsg = $rootScope.errorMsg.no_oilNo;
                            return;
                        }

                        if(!$scope.gasCardNoFormat.test($scope.data.gasCardNo)){
                            $scope.errorData.oilNOMsg = MessageService.errorMsg.commonMsg.oilNO_format_error;
                            item.choosed = false;
                            return false;
                        }

                        $scope.data.cardId = item.productCode;
                        $scope.data.perValue = item.faceValue;
                        // 改为判断ERP商品编号
                        if(item.faceValue == 1){
                            $scope.data.isOneFaceValue = true;
                            // 非任意充
                        }else{
                            $scope.data.isOneFaceValue = false;
                        }
                        ProductService.checkCanOrder({cardId:item.productCode,code:$rootScope.code}, function (data) {
                            if ("success" == data.message) {
                                $scope.data.purNum=item.purNum;
                                $scope.data.maxCardNum=item.purNum.split('-')[1];
                                $scope.data.inPrice=item.salePrice;
                                $scope.data.salePrice=item.salePrice;
                                $scope.data.cash=(parseFloat(item.salePrice)*1000*parseInt($scope.data.cardNum))/1000;
                                item.stock = "1";
                                $scope.data.perValue=item.faceValue;
                                $scope.errorData.errorMsg = '';
                                $scope.data.cardName=item.productName;
                            } else {
                                item.stock = "0";
                                $scope.data.cash='';
                                $scope.data.salePrice='';
                                $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_stock;
                                $scope.data.perValue='';
                            }
                        });
                        item.choosed = true;
                    } else {
                        item.choosed = false;
                    }
                });
            }

            // 初始化加油卡格式方式和卡号长度限制
            $scope.initFormat = function(gasCardNo){
                if(gasCardNo.slice(0,1) == '1'){
                    $scope.gasCardNoFormat = /^(100011)\d{13}$/;
                    $scope.gasCardNoLength = 19;
                }else{
                    $scope.gasCardNoFormat = /^(9)\d{15}$/;
                    $scope.gasCardNoLength = 16;
                }

            }

            $scope.itemList = [{id:'3130923',name:'全国中石油加油卡任意充',selected:false,icon:'oil-cc01'},{id:'2185601',name:'全国中石化加油卡任意充',selected:false,icon:'oil-cc'},{id:'2593403',name:'全国中石化加油卡直充',selected:true,icon:'oil-cc'}];
            $scope.initFaceValueList($scope.itemList[2].id);

            // 验证加油卡卡号
            $scope.checkOilNO = function(type){
                // 加油卡账号改变实时变化事件
                if('1' == type){
                    $scope.errorData.oilNOMsg = '';
                    $scope.errorData.errorMsg = '';
                    $scope.data.gasCardNo = $scope.data.gasCardNo.replace(/\D/g,'');
                    if(!Tools.prototype.isEmpty($scope.data.gasCardNo)){
                        $scope.initFormat($scope.data.gasCardNo);
                        if($scope.data.gasCardNo.length > $scope.gasCardNoLength){
                            $scope.data.gasCardNo = $scope.data.gasCardNo.substr(0,$scope.gasCardNoLength);
                        }
                        if($scope.data.gasCardNo.length == $scope.gasCardNoLength){
                            if($scope.gasCardNoFormat.test($scope.data.gasCardNo)){
                                $scope.errorData.oilNOMsg = '';
                                return true;
                            }else{
                                $scope.errorData.oilNOMsg = $rootScope.errorMsg.commonMsg.oilNO_format_error;
                                return false;
                            }
                        }
                    }else{
                        return false;
                    }
                    // 失去焦点事件
                }else if('2' == type){
                    if(Tools.prototype.isEmpty($scope.data.gasCardNo)){
                        return false;
                    }
                    if(!$scope.gasCardNoFormat.test($scope.data.gasCardNo)){
                        $scope.errorData.oilNOMsg = $rootScope.errorMsg.commonMsg.oilNO_format_error;
                        return false;
                    }else{
                        $scope.data.peUserName='';
                        $scope.errorData.oilNOMsg = '';
                    }
                    $scope.searchOil();
                    return true;
                    // 下单前页面参数校验
                }else if('3' == type){
                    if(Tools.prototype.isEmpty($scope.data.gasCardNo)){
                        $scope.errorData.oilNOMsg = $rootScope.errorMsg.commonMsg.no_oilNo;
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

            // 查询加油卡信息
            $scope.searchOil = function(){
                if(Tools.prototype.isEmpty($scope.data.gasCardNo)){
                    $scope.errorData.oilNOMsg = $rootScope.errorMsg.commonMsg.no_oilNo;
                    return;
                }
                if($scope.checkOilNO('1')){
                    $scope.data.getOilFlag = true;
                    $scope.data.oilNO = $scope.data.gasCardNo;
                    if($scope.data.oilNO.slice(0,1) == '1'){
                        $scope.data.cno = '1';
                    }else{
                        $scope.data.cno = '2';
                    }
                    ProductService.getWebGasCardInfo($scope.data,function(data){
                        $scope.data.getOilFlag = false;
                        // 查询操作成功
                        if('success' == data.message && 0 < data.data.length){
                            $scope.errorData.errorMsg = '';
                            var cardInfos = data.data[0].peUserName.split(";");
                            if(1 < cardInfos.length){
                                // 商品可用
                                if('0' == cardInfos[0]){
                                    if($scope.data.gasCardNo.slice(0,1) == '1'){
                                        $scope.data.gasCardName = "中石化 ";
                                    }else{
                                        $scope.data.gasCardName = "中石油 "
                                    }
                                    $scope.data.gasCardName += cardInfos[1];
                                    $scope.data.peUserName=cardInfos[1];
                                }else{
                                    $scope.data.gasCardName = '';
                                }

                                // 商品不可用
                                if('1' == cardInfos[0]){
                                    $scope.data.gasCardIsNoUse = cardInfos[1];
                                }else{
                                    $scope.data.gasCardIsNoUse = '';
                                }

                                // 商品不可用
                                if ('1' == cardInfos[0]){
                                    return false;
                                }
                                // 查询加油卡面值-中石化
                                if($scope.data.gasCardNo.slice(0,1) == '1') {
                                    $scope.getFaceValueList("1");
                                    // 查询加油卡面值-中石油
                                }else{
                                    $scope.getFaceValueList("2");
                                }
                                $scope.data.valueDisable=false;
                                // 查询失败
                            }else{
                                $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.query_gascard_error;
                            }
                            // 查询失败
                        }else{
                            $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.query_gascard_error;
                        }
                    });
                }
            }

            /**
             *gasRechargeType
             * 1：中石化
             * 2：中石油
             */
            // 查询加油卡面值和商品编号
            $scope.getFaceValueList = function(gasRechargeType){
                ProductService.getGasCardProductInfo(gasRechargeType,function(data){
                    if('success' == data.message && 0 < data.data.length){
                        angular.forEach($scope.faceValueList,function(item,key){
                            angular.forEach(data.data, function(dataItem,key){
                                // 屏蔽中石油固定面值商品
                                if("2" == gasRechargeType){
                                    if(item.faceValue == '1' && dataItem.faceValue == '1'){
                                        item.productCode = dataItem.productCode;
                                        item.purNum=dataItem.purNum;
                                    }
                                    // 中石化商品
                                }else{
                                    if(item.faceValue == dataItem.faceValue){
                                        item.productCode = dataItem.productCode;
                                        item.purNum=dataItem.purNum;
                                    }
                                }

                            });
                            item.stock = false;
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
                                                if (item.choosed) {
                                                    $scope.data.price = (salePriceData.data[0].salePrice * 1000)/1000;
                                                    $scope.data.cash=(parseFloat(item.salePrice)*1000*parseInt($scope.data.cardNum))/1000;
                                                    $scope.data.cardId=item.productCode;
                                                    $scope.data.perValue=item.faceValue;
                                                    $scope.errorData.errorMsg = '';
                                                    $scope.errorData.oilNOMsg = '';
                                                    $scope.data.cardName=salePriceData.data[0].productName;
                                                }
                                                item.productName=salePriceData.data[0].productName;
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

            // 切换三种大类商品:中石化任意充\中石化非任意充\中石油任意充
            $scope.chooseItem = function(cid){
                $scope.clearError();
                $scope.data.cash='';
                angular.forEach($scope.itemList, function (item, key) {
                    if (item.id == cid) {
                        item.selected = true;
                    }else{
                        item.selected = false;
                    }
                });
                $scope.initFaceValueList(cid);
                $scope.data.gasCardNo='';
                if('3130923' == cid){
                    $scope.gasCardNoFormat = /^(9)\d{15}$/;
                    $scope.gasCardNoLength = 16;
                    $scope.data.gasCardNo = "";
                }else{
                    $scope.gasCardNoFormat = /^(100011)\d{13}$/;
                    $scope.gasCardNoLength = 19;
                    $scope.data.gasCardNo = "";
                }
            }

            // 校验任意充商品输入的数量
            $scope.checkCardNum = function (type) {
                if('1' == type){
                    if($scope.errorData.errorMsg == $rootScope.errorMsg.commonMsg.oilNO_format_error){
                        $scope.errorData.errorMsg = '';
                    }
                    $scope.data.cardNum = $scope.data.cardNum.replace(/\D/g,'');
                    if(!$rootScope.commonUtils.isEmpty($scope.data.cardNum)){
                        var tempCardNum = parseInt($scope.data.cardNum);
                        if(tempCardNum < 1 || tempCardNum > $scope.data.maxCardNum){
                            $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.cardNum_format_error;
                            return false;
                        }else{
                            $scope.data.cash=(parseFloat($scope.data.salePrice)*1000*parseInt($scope.data.cardNum))/1000;
                            return true;
                        }
                    }else{
                        return false;
                    }
                } else if('2' == type){
                    if(!Tools.prototype.isEmpty($scope.errorData.errorMsg) &&  $scope.errorData.errorMsg != $rootScope.errorMsg.commonMsg.card_num_error){
                        return false;
                    }
                    if(Tools.prototype.isEmpty($scope.data.cardNum)){
                        $scope.data.cash = '';
                        return false;
                    }
                    if($scope.checkCardNum('1')){
                        $scope.errorData.errorMsg = '';
                        // 任意充使用计价接口计算支付价格
                        $scope.data.cash = (parseFloat($scope.data.salePrice)*1000*parseInt($scope.data.cardNum))/1000;
                    }else{
                        $scope.data.cash = '';
                    }
                }
            }

            $scope.submitForm = function($event){
                $event.target.disabled = true;
                if('' != $scope.errorData.errorMsg){
                    return;
                }

                if (Tools.prototype.isEmpty($scope.data.perValue)) {
                    $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_face_value;
                    return false;
                }
                if($scope.data.isOneFaceValue){
                    if(!$scope.checkCardNum('1')){
                        $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.cardNum_format_error;
                        return;
                    }
                }else{
                    $scope.data.cardNum = '1';
                }

                if(!Tools.prototype.isEmpty($scope.data.gasCardIsNoUse)){
                    $scope.errorData.errorMsg = $scope.data.gasCardIsNoUse;
                    return;
                }
                if(!$scope.checkOilNO('3')){
                    return;
                }
                if(Tools.prototype.isEmpty($scope.data.cardId)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.query_gascard_error;
                    return;
                }

                if($scope.data.gasCardIsNoUse == "副卡不能进行充值"){
                    $scope.errorData.errorMsg = $scope.data.gasCardIsNoUse;
                    return;
                }

                ProductService.checkCanOrder({cardId:$scope.data.cardId,code:$rootScope.code},function(data){
                    if("success" == data.message){
                        $scope.errorData.errorMsg = '';
                        $scope.data.searchRoute='gasOrderSearch';
                        $scope.data.gameCount=$scope.data.gasCardNo;
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
                    }else{
                        $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_stock;
                    }
                });
            }
        }]);

    // 根据充值账号查询订单页面
    app.controller('GasOrderSearchCtrl',['dialog','$rootScope','$scope','$state','$stateParams','CommonService','$compile','OrderService',function(dialog,$rootScope,$scope,$state,$stateParams,CommonService,$compile,OrderService){
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
                        searchRoute:'gasOrderSearch',
                        facePric:aData.facePric,
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
