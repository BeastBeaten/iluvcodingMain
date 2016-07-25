/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.common.commonModule',[]);

    app.controller('OrderQueryCtrl',['$rootScope','$scope','$state','$stateParams','OrderService','PayService','MessageService','$ionicModal',function($rootScope,$scope,$state,$stateParams,OrderService,PayService,MessageService,$ionicModal){
        if('remote' == $stateParams.type && Tools.prototype.isEmpty($rootScope.userLoginId)){
            $rootScope.curRouter = "order-query";
            $state.go('login');
            return;
        }
        $scope.data = {
            queryType:$stateParams.type,
            memberId:$rootScope.userLoginId,
            code:$rootScope.code,
            billState:'success',
            already:'success',
            queryFlag:'1',
            iDisplayStart:0,
            canLoadMore:true
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

        var pageNo0 = 0,pageNo1= 0,pageNo9= 0,canLoadMore0=true,canLoadMore1=true,canLoadMore9=true;
        $scope.orderList = [];
        $scope.orderList1 = [];
        $scope.orderList0 = [];
        $scope.orderList9 = [];
        $scope.changeOrderType = function(billState,already,queryFlag){
            $scope.data.queryFlag = queryFlag;
            $scope.data.billState = billState;
            $scope.data.already = already;
            if('remote' == $scope.data.queryType){
                $scope.setOrderList([]);
                if(0 == $scope.orderList.length){
                    $scope.queryOrder();
                }
            }else{
                $scope.queryOrder();
            }

        }

        if(0==$scope.orderList.length){
            $scope.data.canLoadMore = true;
        }
        $scope.queryFlag = function(){
            if('1' == $scope.data.queryFlag){
                return 0 == $scope.orderList1.length;
            }else if('0' == $scope.data.queryFlag){
                return 0 == $scope.orderList0.length;
            }else{
                return 0 == $scope.orderList9.length;
            }
        }
        $scope.setOrderList = function(data){
            if('1' == $scope.data.queryFlag){
                if('remote' == $scope.data.queryType){
                    if(0 < data.length){
                        for(var i = 0;i < data.length;i++){
                            $scope.orderList1.push(data[i]);
                        }
                    }
                    $scope.orderList = $scope.orderList1;
                }else{
                    $scope.orderList1 = data;
                }
            }else if('0' == $scope.data.queryFlag){
                if('remote' == $scope.data.queryType){
                    if(0 < data.length){
                        for(var i = 0;i < data.length;i++){
                            $scope.orderList0.push(data[i]);
                        }
                    }
                    $scope.orderList = $scope.orderList0;
                }else{
                    $scope.orderList0 = data;
                }
            }else{
                if('remote' == $scope.data.queryType){
                    if(0 < data.length){
                        for(var i = 0;i < data.length;i++){
                            $scope.orderList9.push(data[i]);
                        }
                    }
                    $scope.orderList = $scope.orderList9;
                }else{
                    $scope.orderList9 = data;
                }
            }
        }
        $scope.queryLocalOrder = function(){
            var bills = Tools.prototype.saveCookie('localOrder');
            if(Tools.prototype.isEmpty(bills)){
                return;
            }
            $scope.data.billIdList = bills.split(";");
            if($scope.queryFlag()){
                OrderService.queryOrders($scope.data,function(data){
                    if('success' == data.message && 0 < data.data.length){
                        $scope.setOrderList(data.data);
                        $scope.orderList = data.data;
                    }else{
                        $scope.orderList = [];
                    }
                });
            }else if('1' == $scope.data.queryFlag){
                $scope.orderList = $scope.orderList1;
            }else if('0' == $scope.data.queryFlag){
                $scope.orderList = $scope.orderList0;
            }else{
                $scope.orderList = $scope.orderList9;
            }
        }

        $scope.queryRemoteOrder =function(){
            if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                $scope.orderList = [];
                return;
            }
            if(!$scope.getCanLoadMore()){
                $scope.setOrderList([]);
                return;
            }
            $scope.data.iDisplayStart = $scope.getPageNo();
            OrderService.queryOrderInfo($scope.data,function(data){
                if('success' == data.message && 0 < data.data.length){
                    $scope.setOrderList(data.data);
                    $scope.setCanLoadMore(true);
                }else{
                    if(0 == $scope.getPageNo()){
                        $scope.orderList = [];
                    }
                    $scope.setCanLoadMore(false);
                }
            });
        }

        $scope.initMonth =function(){
            $scope.dateList = [];
            var date = new Date();
            var date2 = null;
            for(var i = 0; i < 6;i++ ){
                var temp = {};
                date2 = new Date(date.getFullYear(),date.getMonth()+1-i,0);
                temp.year=date2.getFullYear();
                temp.month=date2.getMonth();
                $scope.dateList.push(temp);
            }
            $scope.data.startYear = $scope.dateList[0].year;
            $scope.data.startMonth = parseInt($scope.dateList[0].month);
        }

        if('remote' == $scope.data.queryType){
            $scope.initMonth();
        }

        $scope.chooseTime = function(month){
            angular.forEach($scope.dateList,function(item,key){
                if(item.month == month){
                    $scope.data.startMonth = parseInt(month);
                    $scope.data.startYear = item.year;
                }
            });
            $scope.orderList = [];
            $scope.orderList1 = [];
            $scope.orderList0 = [];
            $scope.orderList9 = [];
            pageNo0 = 0;pageNo1= 0;pageNo9= 0;
            canLoadMore0=true;canLoadMore1=true;canLoadMore9=true;
            $scope.queryRemoteOrder();
        }

        $scope.getPageNo=function(){
            if('1' == $scope.data.queryFlag){
                return pageNo1;
            }else if('0' == $scope.data.queryFlag){
                return pageNo0;
            }else{
                return pageNo9;
            }
        }

        $scope.addPageNo=function(){
            if('1' == $scope.data.queryFlag){
                pageNo1++;
            }else if('0' == $scope.data.queryFlag){
                pageNo0++;
            }else{
                pageNo9++;
            }
        }

        $scope.getCanLoadMore=function(){
            if('1' == $scope.data.queryFlag){
                return canLoadMore1;
            }else if('0' == $scope.data.queryFlag){
                return canLoadMore0;
            }else{
                return canLoadMore9;
            }
        }

        $scope.setCanLoadMore=function(flag){
            if('1' == $scope.data.queryFlag){
                canLoadMore1 = flag;
            }else if('0' == $scope.data.queryFlag){
                canLoadMore0 = flag;
            }else{
                canLoadMore9 = flag;
            }


            $scope.data.canLoadMore = flag;
        }

        $scope.queryOrder = function(){
            if('remote' == $scope.data.queryType){
                $scope.queryRemoteOrder();
            }else{
                $scope.queryLocalOrder();
            }
        }

        $scope.queryOrder();

        $scope.getCardName = function(cardName){
            return cardName.replace(/\d+\u5143/g,'');
        }

        $scope.loadMore = function(){
            if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                $scope.orderList = [];
                return;
            }
            if(!$scope.getCanLoadMore()){
                $scope.data.canLoadMore = false;
                return;
            }
            if(0  == $scope.getPageNo() && 0 == $scope.orderList.length){
                return;
            }
            $scope.addPageNo();
            $scope.queryRemoteOrder();
        }

        $scope.goPay = function(billId,cardName){
            if(1 == $rootScope.userData.payList.length){
                var payForm = {
                    orderNo:billId,
                    bankCode:$rootScope.userData.payList[0].bankCode,
                    payTypeId:$rootScope.userData.payList[0].payTypeId,
                    payType:$rootScope.userData.payList[0].payType,
                    returnUrl:'http://web.yiqianlian.com/ccbCustom/success/'+$rootScope.code+'/'+$rootScope.menu,
                    code:$rootScope.code,
                    memberId:$rootScope.userLoginId
                };
                if('0820' == payForm.bankCode){
                    payForm.payoutName = cardName;
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
                });
            }
        }
    }]);

    app.controller('LoginCtrl',['$rootScope','$scope','$state','$stateParams','$cookieStore','$interval','MessageService','GavinService','MemberService','$ionicModal',function($rootScope,$scope,$state,$stateParams,$cookieStore,$interval,MessageService,GavinService,MemberService,$ionicModal){
        $scope.data={
            mobileNo:'',
            verifyCode:'',
            imageCode:'',
            randomId:'',
            code:$rootScope.code
        }
        $scope.idenCodeData={
            isGet:false,
            title:'获取验证码',
            getImageCode:false,
            imageCodeUrl:''
        }
        $scope.errorData = {
            errorMsg:'',
            popMsg:''
        }

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

        var loginSeconds = $cookieStore.get($rootScope.code+'loginSeconds');
        var loginSecondTime = $cookieStore.get($rootScope.code+'loginSecondTime');
        var now = new Date().getTime();
        if(!Tools.prototype.isEmpty(loginSecondTime) && now - parseInt(loginSecondTime) >= 60000){
            loginSeconds = 0;
            $cookieStore.remove($rootScope.code+'loginSecondTime');
        }
        if(!Tools.prototype.isEmpty(loginSeconds) && 0 < parseInt(loginSeconds)){
            $scope.idenCodeData.isGet = true;
            loginSeconds = parseInt(loginSeconds);
            var cookieTimer = $interval(function(){
                if(0 == loginSeconds){
                    $interval.cancel(cookieTimer);
                    $scope.idenCodeData.isGet = false;
                    $scope.idenCodeData.title = '获取验证码';
                    $cookieStore.remove($rootScope.code+'loginSeconds');
                }else{
                    $scope.idenCodeData.title='再次获取'+loginSeconds + '';
                    loginSeconds--;
                    $cookieStore.put($rootScope.code+'loginSeconds',loginSeconds);
                }
            },1000);
        }

        $scope.checkTelPho = function(type){
            if('1' == type){
                //focus
                $('#telPho')[0].placeholder="";
                $scope.errorData.errorMsg = '';
            }else if('2' == type){
                //blur
                if(Tools.prototype.isEmpty($scope.data.mobileNo)){
                    $('#telPho')[0].placeholder="请输入手机号码";
                }else if(!Tools.prototype.isMobileNo($scope.data.mobileNo)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.phone_format_error;
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                }else{
                    $scope.errorData.errorMsg = '';
                }
            }else if('3' == type){
                $scope.data.mobileNo = $scope.data.mobileNo.replace(/\D/g,'');
                if(!Tools.prototype.isEmpty($scope.data.mobileNo)){
                    if(11 < $scope.data.mobileNo.length){
                        $scope.data.mobileNo = $scope.data.mobileNo.substr(0,11);
                    }
                }
            }
        }

        $scope.checkCode = function(type){
            if('1' == type){
                //focus
                $('#verifyCode')[0].placeholder="";
            }else if('2' == type){
                //blur
                if(Tools.prototype.isEmpty($scope.data.verifyCode)){
                    $('#verifyCode')[0].placeholder="请输入短信验证码";
                }else{
                    $scope.errorData.errorMsg = '';
                }
            }else if('3' == type){
                $scope.data.verifyCode = $scope.data.verifyCode.replace(/\D/g,'');
            }
        }

        $scope.checkImageCode = function(type){
            if('1' == type){
                //focus
                $('#imageCode')[0].placeholder="";
            }else if('2' == type){
                //blur
                if(Tools.prototype.isEmpty($scope.data.imageCode)){
                    $('#imageCode')[0].placeholder="请输入验证字符";
                }else{
                    $scope.errorData.errorMsg = '';
                }
            }else if('3' == type){
                $scope.data.imageCode = $scope.data.imageCode.replace(/\D/g,'');
            }
        }

        $scope.checkForm = function(type){
            if (Tools.prototype.isEmpty($scope.data.mobileNo)) {
                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_phone;
                $scope.errorData.popMsg = $scope.errorData.errorMsg;
                $scope.model.show();
                return false;
            }
            if (!Tools.prototype.isMobileNo($scope.data.mobileNo)) {
                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.phone_format_error;
                $scope.errorData.popMsg = $scope.errorData.errorMsg;
                $scope.model.show();
                return false;
            }
            if('2' == type){
                if(Tools.prototype.isEmpty($scope.data.verifyCode)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_code;
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                    return false;
                }
            }
            if('2' == type && $scope.idenCodeData.getImageCode && Tools.prototype.isEmpty($scope.data.imageCode)){
                $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_image_code;
                $scope.errorData.popMsg = $scope.errorData.errorMsg;
                $scope.model.show();
                return false;
            }
            return true;
        }

        $scope.getIdenCode = function(){
            if(!$scope.checkForm('1')){
                return;
            }
            if(!$scope.idenCodeData.isGet){
                $scope.errorData.errorMsg = '';
                $scope.idenCodeData.isGet = true;
                var seconds = 59;
                var timer = $interval(function(){
                    if(0 == seconds){
                        $interval.cancel(timer);
                        $scope.idenCodeData.isGet = false;
                        $scope.idenCodeData.title = '获取验证码';
                        $cookieStore.remove($rootScope.code+'loginSeconds');
                    }else{
                        $scope.idenCodeData.title='再次获取' + seconds + '';
                        seconds--;
                        $cookieStore.put($rootScope.code+'loginSeconds',seconds);
                    }
                },1000);
                $cookieStore.put($rootScope.code+'loginSecondTime',new Date().getTime());
                GavinService.sendVerifyCode({telPho:$scope.data.mobileNo},function(data){
                    if("success" == data.message){

                    }else if("OverSendingLimit" == data.message){
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.over_sending_limit;
                        $scope.errorData.popMsg = $scope.errorData.errorMsg;
                        $scope.model.show();
                    }
                    else{
                        $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.send_code_error;
                        $scope.errorData.popMsg = $scope.errorData.errorMsg;
                        $scope.model.show();
                    }
                });
            }
        }

        $scope.flushImageCode = function(){
            $scope.idenCodeData.imageCodeUrl = '/member/getImageCode?randomId='+Math.random().toString(36).substr(2);
        }

        $scope.login = function(){
            $scope.errorData.errorMsg = '';
            $scope.errorData.popMsg = '';
            if(!$scope.checkForm('2')){
                return;
            }
            $scope.errorData.errorMsg = '';
            var now = new Date();
            $scope.data.randomId = now.getTime() + Math.random().toString(36).substr(2);


            MemberService.login($scope.data,function(data){
                if('success' == data.message){
                    $scope.data.randomId = data.resultCode;
                    Tools.prototype.saveCookie($rootScope.code+'randomId',null,{path:'/'});
                    Tools.prototype.saveCookie($rootScope.code+'loginMobileNo',null,{path:'/'});
                    Tools.prototype.saveCookie($rootScope.code+'randomId',$scope.data.randomId,{expires:30,path:'/'});
                    Tools.prototype.saveCookie($rootScope.code+'loginMobileNo',$scope.data.mobileNo,{expires:30,path:'/'});
                    $rootScope.loginStatus();
                   /** if(data.data.length > 0){
                        $rootScope.gasCardNosForUser = data.data[0].gasCardNos;
                    }**/
                    if($rootScope.lastUrl && !Tools.prototype.isEmpty($rootScope.lastUrl)){
                        $rootScope.lastForm.memberId = $scope.data.randomId;
                    }
                    if($rootScope.curRouter == 'order-query'){
                        $state.go($rootScope.curRouter,{type:'remote'});
                    }else{
                        $state.go($rootScope.curRouter);
                    }
                }else if('MAX_LIMIT' == data.message){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_image_code;
                    $scope.idenCodeData.getImageCode = true;
                    $scope.data.imageCode = '';
                    $scope.idenCodeData.imageCodeUrl = '/member/getImageCode?randomId='+Math.random().toString(36).substr(2);
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                }else if('IMAGECODE_ERROR' == data.message){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.check_image_code_error;
                    $scope.idenCodeData.imageCodeUrl = '/member/getImageCode?randomId='+Math.random().toString(36).substr(2);
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                }else if('NOT_MAX_LIMIT' == data.message){
                    $scope.idenCodeData.getImageCode = false;
                    $scope.data.imageCode = '';
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.check_code_error;
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                }else{
                    $scope.data.imageCode = '';
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.check_code_error;
                    if($scope.idenCodeData.getImageCode){
                        $scope.idenCodeData.imageCodeUrl = '/member/getImageCode?randomId='+Math.random().toString(36).substr(2);
                    }
                    $scope.errorData.popMsg = $scope.errorData.errorMsg;
                    $scope.model.show();
                }
            });
        }

        $scope.cancel = function(){
            $rootScope.lastUrl = "";
            //$state.go('viprecharge');
            if($rootScope.curRouter == 'order-query'){
                $rootScope.curRouter = 'viprecharge';
            }
            $state.go($rootScope.curRouter);
        }
    }]);


    app.controller('MarketCtrl',['$rootScope','$scope','$state','$stateParams','$ionicModal','MarketService',function($rootScope,$scope,$state,$stateParams,$ionicModal,MarketService){
        if(Tools.prototype.isEmpty($rootScope.userLoginId)){
            $state.go("login");
            return;
        }

        $rootScope.marketInfo.userId = $rootScope.userLoginId;
        $rootScope.marketInfo.getDefaultFlag = false;

        $scope.data = {
            code:$rootScope.code,
            userId:$rootScope.userLoginId,
            category:$stateParams.category,
            isShowBind:false,
            message:'',
            CDKey:'',
            billInfo:'',
            billId:'',
            title:'',
            cash:''
        };

        $scope.cancel = function(type){
            if('1' == type) {
                $state.go($rootScope.menu);
            }else{
                $scope.data.isShowBind = false;
                $scope.data.billInfo = '';
            }
        }

        $scope.initMarketBills = function(){
            if(!Tools.prototype.isEmpty($scope.marketBills)){
                angular.forEach($scope.marketBills,function(item,key){
                    if(!Tools.prototype.isEmpty($rootScope.marketInfo.billId) && item.billId == $rootScope.marketInfo.billId){
                        item.choosed = true;
                    }else{
                        item.choosed = false;
                    }
                    item.desc = '满'+item.faceValue+'元面值使用';
                    if("0" == item.consumerState && '1' == item.state && $scope.data.category.indexOf(item.templateCateId) != -1){
                        if("OCP" == $rootScope.marketInfo.marketPayType){
                            item.desc = '可支付'+item.faceValue+'元及以下面值';
                            if(parseFloat($rootScope.marketInfo.faceValue) <= parseFloat(item.cash)){
                                item.isActive = true;
                            }else{
                                item.isActive = false;
                            }
                        }else if(parseFloat($rootScope.marketInfo.faceValue) >= parseFloat(item.faceValue)){
                            item.isActive = true;
                        }else{
                            item.isActive = false;
                        }
                    }else{
                        item.isActive = false;
                    }
                });
            }else{
                $scope.marketBills = '';
            }
        }

        $scope.getMarketBills = function(){
            MarketService.getMarketBills({code:$rootScope.code,userId:$rootScope.userLoginId},function(data){
                if("success" == data.message){
                    $scope.marketBills = data.data;
                }
                $scope.initMarketBills();
            });
        }

        $scope.getMarketBills();



        $scope.chooseBill = function(billId){
            angular.forEach($scope.marketBills,function(item,key){
                if(billId == item.billId && item.isActive){
                    item.choosed = !item.choosed;
                    if(item.choosed){
                        $scope.data.billId = item.billId;
                        $scope.data.title = '-'+item.cash+'元';
                        $scope.data.cash = item.cash;
                    }else{
                        $scope.data.billId = '';
                        $scope.data.title = '不使用';
                        $scope.data.cash = '';
                    }
                }else{
                    item.choosed = false;
                }
            });
        }

        $scope.getMarketBillByCDKey = function(){
            MarketService.getMarketBillByCDKey({code:$rootScope.code,CDKey:$scope.data.CDKey,userId:$rootScope.userLoginId},function(data){
                if("success" == data.message){
                    $scope.data.billInfo = data.data[0];
                    if("OCP" == $rootScope.marketInfo.marketPayType){
                        $scope.data.billInfo.desc = '可支付'+$scope.data.billInfo.faceValue+'元及以下面值';
                    }else{
                        $scope.data.billInfo.desc = '满'+$scope.data.billInfo.faceValue+'元面值使用';
                    }
                }else if("HasBind" == data.message){
                    $scope.data.billInfo = '';
                    $scope.data.message='抵用券已绑定!';
                }else{
                    $scope.data.billInfo = '';
                    $scope.data.message='未查询到相关抵用券信息，请核对抵用券号!';
                }
                $scope.data.isShowBind = true;
            });
        }

        $scope.bindBill = function(){
            if(Tools.prototype.isEmpty($scope.data.billInfo)){
                $scope.data.billInfo = '';
                $scope.data.isShowBind = false;
                return;
            }
            MarketService.bindMarketBill({billId:$scope.data.billInfo.billId,userId:$rootScope.userLoginId},function(data){
                if("success" == data.message){
                    $scope.getMarketBills();
                    $scope.data.CDKey = '';
                    $scope.data.isShowBind = false;
                }else if("HasBind" == data.message){
                    $scope.data.billInfo = '';
                    $scope.data.message='抵用券已绑定!';
                }else{
                    $scope.data.billInfo = '';
                    $scope.data.message='抱歉，绑定失败，请稍后重试!';
                }
            });

        }

        $scope.confirm = function(){

            if(!Tools.prototype.isEmpty($scope.data.CDKey)){
                $scope.getMarketBillByCDKey();
                return;
            }

            $rootScope.marketInfo.billId = $scope.data.billId;
            $rootScope.marketInfo.title = $scope.data.title;
            $rootScope.marketInfo.cash = $scope.data.cash;
            $state.go($rootScope.menu);
        }

        $ionicModal.fromTemplateUrl('../../../partials/mobile/custom/ccb/common/market-desc-bank.html', {
            scope: $scope,
            focusFirstInput: false
        }).then(function(modal) {
            $scope.model = modal;
        });

        $scope.showRules = function(){
            $scope.model.show();
        }

        $scope.agreeRules = function(){
            $scope.model.hide();
        }

        $scope.clearCDKey = function(){
            if(!Tools.prototype.isEmpty($scope.data.CDKey)){
                $scope.data.CDKey = '';
            }
        }

    }]);
});
