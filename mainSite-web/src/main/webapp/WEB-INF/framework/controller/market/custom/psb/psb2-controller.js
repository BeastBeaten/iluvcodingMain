/**
 * Created by zhouqing on 16-1-26.
 */

'use strict';

define(['angular'],function(angular){
    var app = angular.module('openwebApp.psb2Controllers',[]);

    app.controller('GiftCheckCtrl',['$cookieStore','dialog','$rootScope','$scope','$state','$stateParams','$interval','$timeout','PSBCommonService',function($cookieStore,dialog,$rootScope,$scope,$state,$stateParams,$interval,$timeout,PSBCommonService){
        $scope.dateTime = {
            days:0,
            hours:0,
            minuts:0,
            seconds:0,
            timeFlag:$stateParams.type

        };

        if('1' == $scope.dateTime.timeFlag){
            $scope.$watch('dateTime',function(newVal,oldVal){

            },true);
            $scope.showTime = function(){
                var now = new Date();
                var time_start = now.getTime(); //设定当前时间
                var time_end =  $rootScope.startTime.getTime(); //设定目标时间
                // 计算时间差
                var time_distance = time_end - time_start;
                if(0 >= time_distance){
                    $scope.dateTime = {
                        days:0,
                        hours:0,
                        minuts:0,
                        seconds:0,
                        timeFlag:'0'
                    };
                    $scope.setMyar();
                    return;
                }
                // 天
                $scope.dateTime.days = Math.floor(time_distance/86400000);
                time_distance -= $scope.dateTime.days * 86400000;
                // 时
                $scope.dateTime.hours = Math.floor(time_distance/3600000);
                time_distance -= $scope.dateTime.hours * 3600000;
                // 分
                $scope.dateTime.minuts = Math.floor(time_distance/60000);
                time_distance -= $scope.dateTime.minuts * 60000;
                // 秒
                $scope.dateTime.seconds = Math.floor(time_distance/1000);

                // 时分秒为单数时、前面加
                if($scope.dateTime.days < 10){
                    $scope.dateTime.days = "0" + $scope.dateTime.days;
                }
                if($scope.dateTime.hours < 10){
                    $scope.dateTime.hours = "0" + $scope.dateTime.hours;
                }
                if($scope.dateTime.minuts < 10){
                    $scope.dateTime.minuts = "0" + $scope.dateTime.minuts;
                }
                if($scope.dateTime.seconds < 10){
                    $scope.dateTime.seconds = "0" + $scope.dateTime.seconds;
                }
                // 设置定时器
                $timeout(function(){
                    $scope.showTime();
                },1000);
            }
            $scope.showTime();

        }

        $scope.data = {
            userId:$rootScope.userId,
            isShowDesc:true,
            randomId:'',
            mobileNo:''
        };
        $scope.idenCodeData={
            isGet:false,
            verifyCode:'',
            title:'获取验证码',
            hasCookie:false,
            btnName:'AE' == $rootScope.result ? '查询兑换卷' : '领取兑换券'
        };

        $scope.errorData = {
            errorMsg:''
        };
        $scope.clearError = function(){
            $scope.errorData.errorMsg = '';
        }

        $scope.showDesc = function(){
            $scope.data.isShowDesc = !$scope.data.isShowDesc;
        }

        if(!$rootScope.commonUtils.isEmpty($rootScope.saveCookie("psb2randomId"))){
            $scope.data.randomId = $rootScope.saveCookie("psb2randomId");
            $scope.data.mobileNo = $rootScope.saveCookie("psb2userPhoneNum");
        }

        $scope.updateMobileNo = function(){
            $scope.data.randomId = '';
            $scope.data.mobileNo = '';
            $rootScope.saveCookie("psb2randomId",null);
            $rootScope.saveCookie("psb2userPhoneNum",null);
        }


        var cookieSeconds = $cookieStore.get('psb2GiftSeconds');
        if(!$rootScope.commonUtils.isEmpty(cookieSeconds) && 0 < parseInt(cookieSeconds)){
            $scope.idenCodeData.isGet = true;
            cookieSeconds = parseInt(cookieSeconds);
            var cookieTimer = $interval(function(){
                if(0 == cookieSeconds){
                    $interval.cancel(cookieTimer);
                    $scope.idenCodeData.isGet = false;
                    $scope.idenCodeData.title = '获取验证码';
                    $cookieStore.remove('psb2GiftSeconds');
                }else{
                    $scope.idenCodeData.title='再次获取('+cookieSeconds + ')';
                    cookieSeconds--;
                    $cookieStore.put('psb2GiftSeconds',cookieSeconds);
                }
            },1000);
        }

        $scope.getIdenCode = function(){
            if ($rootScope.commonUtils.isEmpty($scope.data.mobileNo)) {
                $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_shortMsg_or_email;
                dialog.showTip({
                    template: $scope.errorData.errorMsg
                });
                return false;
            }
            if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test($scope.data.mobileNo)) {
                $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.shortMsg_format_error;
                dialog.showTip({
                    template: $scope.errorData.errorMsg
                });
                return false;
            }
            if(!$scope.idenCodeData.isGet){
                $scope.idenCodeData.isGet = true;
                var seconds = 59;
                var timer = $interval(function(){
                    if(0 == seconds){
                        $interval.cancel(timer);
                        $scope.idenCodeData.isGet = false;
                        $scope.idenCodeData.title = '获取验证码';
                        $cookieStore.remove('psb2GiftSeconds');
                    }else{
                        $scope.idenCodeData.title='再次获取(' + seconds + ')';
                        seconds--;
                        $cookieStore.put('psb2GiftSeconds',seconds);
                    }
                },1000);
                if($scope.errorData.errorMsg == $rootScope.errorMsg.giftCardMsg.send_code_error){
                    $scope.errorData.errorMsg = '';
                }
                $scope.idenCodeData.telPho = $scope.data.mobileNo;
                PSBCommonService.sendVerifyCode($scope.idenCodeData,function(data){
                    if("success" == data.message){

                    }else if("UserLimit" == data.message){
                        $state.go("noallow");
                    }else if("OverSendingLimit" == data.message){
                        $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.send_code_over;
                        dialog.showTip({
                            template: $scope.errorData.errorMsg
                        });
                    }else{
                        $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.send_code_error;
                        dialog.showTip({
                            template: $scope.errorData.errorMsg
                        });
                    }
                });
            }
        }

        $scope.check = function(type){
            $scope.data.isSub = true;
            $scope.data.type = type;
//            if ($rootScope.commonUtils.isEmpty($scope.data.cCardNo)) {
//                $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_cCardNo;
//                dialog.showTip({
//                    template: $scope.errorData.errorMsg
//                });
//                $scope.data.isSub = false;
//                return false;
//            }
            if ($rootScope.commonUtils.isEmpty($scope.data.mobileNo)) {
                $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_shortMsg_or_email;
                dialog.showTip({
                    template: $scope.errorData.errorMsg
                });
                $scope.data.isSub = false;
                return false;
            }
            if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test($scope.data.mobileNo)) {
                $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.shortMsg_format_error;
                dialog.showTip({
                    template: $scope.errorData.errorMsg
                });
                $scope.data.isSub = false;
                return false;
            }

            if ($rootScope.commonUtils.isEmpty($scope.data.randomId) && $rootScope.commonUtils.isEmpty($scope.data.verifyCode)) {
                $scope.errorData.errorMsg = $rootScope.errorMsg.giftCardMsg.no_code_error;
                dialog.showTip({
                    template: $scope.errorData.errorMsg
                });
                $scope.data.isSub = false;
                return false;
            }

            PSBCommonService.checkGift($scope.data,function(data){

                if(!$rootScope.commonUtils.isEmpty(data.resultCode) && '0' != data.resultCode){
                    $rootScope.saveCookie("psb2userPhoneNum",null);
                    $rootScope.saveCookie("psb2userPhoneNum",$scope.data.mobileNo,{expires:15});
                    $rootScope.saveCookie("psb2randomId",null);
                    $rootScope.saveCookie("psb2randomId",data.resultCode,{expires:15});
                    $scope.data.randomId = data.resultCode;
                }

                if('2' == type){
                    if('VerifyCodeError' == data.message){
                        dialog.showTip({
                            template: "验证码验证错误，请重新获取验证码"
                        });
                        $scope.data.isSub = false;
                        return;
                    }
                    if("UserLimit" == data.message){
                        $state.go("noallow");
                        return;
                    }
                    $scope.data.queryBillType = '2';
                    $state.go("showbill",{data:$rootScope.commonUtils.putParams($scope.data)});
                    return;
                }

                if("success" == data.message){
                    $scope.data.queryBillType = '1';
                    $scope.getUserBills('1');
                }else if("HasBill" == data.message || "AE" == data.message){
                    $scope.data.queryBillType = '2';
                    $scope.getUserBills('1');
                }else if("UserLimit" == data.message){
                    $state.go("noallow");
                }else if("ANS" == data.message){
                    $state.go("index");
                }else if("AOM" == data.message){
                    $scope.getUserBills('2');
                }else if('VerifyCodeError' == data.message){
                    dialog.showTip({
                        template: "验证码验证错误，请重新获取验证码"
                    });
                }else if('NotLogin' == data.message){
                    $scope.updateMobileNo();
                }else{
                    dialog.showTip({
                        template: "请求失败，请稍后重试"
                    });
                }
                $scope.data.isSub = false;
            });



        }

        $scope.getUserBills = function(type){
            var now = new Date();
            $scope.data.month = now.getMonth();
            $scope.data.year = now.getFullYear();
            PSBCommonService.queryGiftBill($scope.data,function(data){
                if("success" == data.message){
                    if(1 == data.data.length && '0' == data.data[0].consumerState){
                        $scope.data.marketBillId = data.data[0].billId;
                        $state.go('giftindex',{data:$rootScope.commonUtils.putParams($scope.data)});
                    }else{
                        $state.go("showbill",{data:$rootScope.commonUtils.putParams($scope.data)});
                    }
                }else{
                    if('1' == type){
                        $state.go("showbill",{data:$rootScope.commonUtils.putParams($scope.data)});
                    }else if('2' == type){
                        $state.go("over");
                    }
                }
            });
        }

    }]);

    app.controller('MarketBillCtrl',['dialog','$rootScope','$scope','$state','$stateParams','PSBCommonService',function(dialog,$rootScope,$scope,$state,$stateParams,PSBCommonService){
        $scope.data = $rootScope.commonUtils.getParams($stateParams.data);
        $scope.data.isShowDesc = true;
        $scope.errorData = {
            errorMsg:''
        };
        $scope.clearError = function(){
            $scope.errorData.errorMsg = '';
        }
        $scope.showDesc = function(){
            $scope.data.isShowDesc = !$scope.data.isShowDesc;
        }

        var now = new Date();
        var curDateMonth = now.getMonth();
        var curDateYear = now.getFullYear();
        $scope.dateList = [{id:'001',year:2016,month:0,selected:(0 == curDateMonth?true:false)},{id:'002',year:2016,month:1,selected:(1 == curDateMonth?true:false)},
            {id:'003',year:2016,month:2,selected:(2 == curDateMonth?true:false)},{id:'004',year:2016,month:3,selected:(3 == curDateMonth?true:false)},
            {id:'005',year:2016,month:4,selected:(4 == curDateMonth?true:false)},{id:'006',year:2016,month:5,selected:(5 == curDateMonth?true:false)},
            {id:'007',year:2016,month:6,selected:(6 == curDateMonth?true:false)},{id:'008',year:2016,month:7,selected:(7 == curDateMonth?true:false)}];
        angular.forEach($scope.dateList,function(item,key){
            if(item.selected){
                $scope.data.year = item.year;
                $scope.data.month = item.month;
            }
        });

        $scope.chooseDate = function(id){
            angular.forEach($scope.dateList,function(item,key){
                if(item.id == id){
                    $scope.data.year = item.year;
                    $scope.data.month = item.month;
                    item.selected = true;
                    $scope.getUserBills();
                }else{
                    item.selected = false;
                }
            });
        }

        $scope.getUserBills = function(){
            $scope.marketNUBills = [];
            $scope.marketUBills = [];
            PSBCommonService.queryGiftBill($scope.data,function(data){
                if("success" == data.message){
                    $scope.marketBills = data.data;
                    angular.forEach(data.data,function(item,key){
                        item.cash = (parseInt(item.cash)*10)/11;
                        if('0' == item.consumerState){
                            $scope.marketNUBills.push(item);
                        }else{
                            $scope.marketUBills.push(item);
                        }
                        if('1' == $scope.data.queryBillType ){
                            $scope.marketUBills = '';
                        }
                    });
                }else if('NotLogin' == data.message){
                    $state.go('giftcheck',{type:"0"});
                    return;
                }else{
                    $scope.marketBills = '';
                    $scope.marketUBills = '';
                    $scope.marketNUBills = '';
                }
            });
        }

        $scope.getUserBills();

        $scope.buy = function(bill){
            if('1' == bill.state && '0' == bill.consumerState){
                $scope.data.marketBillId = bill.billId;
                $state.go('giftindex',{data:$rootScope.commonUtils.putParams($scope.data)});
            }else if('1' ==  bill.consumerState){
                $state.go('giftsuccess',{card:$rootScope.commonUtils.putParams({mobileNo:$scope.data.mobileNo,marketBillId:bill.billId ,orderNo:bill.ofLinkId,randomId:$scope.data.randomId})});
            }
        }

        $scope.showDetail = function(billId,orderNo){
            $state.go('giftsuccess',{card:$rootScope.commonUtils.putParams({mobileNo:$scope.data.mobileNo,marketBillId:billId,orderNo:orderNo,randomId:$scope.data.randomId})});
        }
    }]);

    app.controller('GiftCardIndexCtrl',['$cookieStore','dialog','$rootScope','$scope','$state','$stateParams','$interval','PSBCommonService',function($cookieStore,dialog,$rootScope,$scope,$state,$stateParams,$interval,PSBCommonService){
        $scope.data = $rootScope.commonUtils.getParams($stateParams.data);
        $scope.data.isShowDesc = true;
        $scope.data.isSub = false;
        $scope.isGift = false;
        $scope.isPhone = false;
        $scope.errorData = {
            errorMsg:'',
            isSub:false
        };
        $scope.clearError = function(){
            $scope.errorData.errorMsg = '';
        }
        $scope.cardList = PSBCommonService.getGiftCardList;
        PSBCommonService.getGiftBill($scope.data,function(data){
            if("success" == data.message){
                $scope.data.billCash = (parseInt(data.data[0].cash)*10)/11;
                $scope.data.marketBillId = data.data[0].billId;
                $scope.data.memberId = data.data[0].userId;
            }else{
                $scope.data.billCash = '';
                $scope.data.marketBillId = '';
            }
        });

        $scope.showDesc = function(){
            $scope.data.isShowDesc = !$scope.data.isShowDesc;
        }

        $scope.showBill = function(){
            $scope.data.billCash = '';
            $scope.data.marketBillId = '';
            $scope.data.queryBillType = '2';
            $state.go("showbill",{data:$rootScope.commonUtils.putParams($scope.data)});
        }

        $scope.hideConfirm = function(){
            if($scope.isGift){
                $scope.isGift = !$scope.isGift;
            }
            if($scope.isPhone){
                $scope.isPhone = !$scope.isPhone;
            }
        }

        $scope.chooseGift = function(card){
            if($rootScope.commonUtils.isEmpty($scope.data.marketBillId)){
                dialog.showTip({
                    template: "抱歉,您已兑换!"
                });
                return;
            }
            $scope.data.itemId = card.id;
            $scope.data.cardName = card.name;
            $scope.data.productName = card.productName;
            $scope.data.faceValue = $scope.data.billCash;
            $scope.data.card = card;
            if('gift' == card.url){
                if(!$scope.data.isSub){
                    $scope.isGift = true;
                    $scope.isPhone = false;
                }

            }else if('phoneorder' == card.url){
                if(!$scope.errorData.isSub){
                    $scope.isPhone = true;
                    $scope.isGift = false;
                    $scope.data.gameCount = $scope.data.mobileNo;
                }

            }
            PSBCommonService.takeLog({mobileNo:$scope.data.mobileNo,marketBillId:$scope.data.marketBillId},function(data){

            });
        }

        $scope.getGiftCard = function(){
            $scope.data.isSub = true;

            PSBCommonService.takeGiftCardOrder($scope.data,function(data){
                if("success" == data.message){
                    $scope.data.card.mobileNo = $scope.data.mobileNo;
                    $scope.data.card.gameCount = $scope.data.gameCount;
                    $scope.data.card.cCardNo = $scope.data.cCardNo;
                    $scope.data.card.orderNo = data.data[0];
                    $scope.data.card.billCash = $scope.data.billCash;
                    $scope.data.card.randomId=$scope.data.randomId
                    $state.go('giftsuccess',{card:$rootScope.commonUtils.putParams($scope.data.card)});
                }else if("005" == data.message){
                    dialog.showTip({
                        template:$rootScope.errorMsg.giftCardMsg.pay_error
                    });
                }else if("007" == data.message){
                    dialog.showTip({
                        template: "抱歉,您已兑换!"
                    });
                }else if('NotLogin' == data.message){
                    $state.go('giftcheck',{type:"0"});
                    $scope.data.isSub = false;
                    return;
                }else{
                    $scope.errorData.errorMsg = $rootScope.errorMsg.phoneRechargeMsg.no_stock+"("+data.message+")";
                    dialog.showTip({
                        template: $scope.errorData.errorMsg
                    });
                }
                $scope.data.isSub = false;
            });
        }

        $scope.takePhoneOrder = function(obj){
            $scope.errorData.isSub = true;
            if($rootScope.commonUtils.isEmpty($scope.data.gameCount)){
                $scope.errorData.errorMsg = $rootScope.errorMsg.phoneRechargeMsg.no_phone_no;
                dialog.showTip({
                    template: $scope.errorData.errorMsg
                });
                $scope.errorData.isSub = false;
                return false;
            }
            if(!/^1[3|4|5|7|8][0-9]\d{8}$/.test($scope.data.gameCount)){
                $scope.errorData.errorMsg = $rootScope.errorMsg.phoneRechargeMsg.phone_no_format_error;
                dialog.showTip({
                    template: $scope.errorData.errorMsg
                });
                $scope.errorData.isSub = false;
                return false;
            }

            if(/^170\d{8}$/.test($scope.data.gameCount)){
                $scope.errorData.errorMsg = '暂不支持虚拟运营商号段，请使用其它号码充值';
                dialog.showTip({
                    template: $scope.errorData.errorMsg
                });
                $scope.errorData.isSub = false;
                return false;
            }

            PSBCommonService.takePhoneSaleOrder($scope.data,function(data){
                if("success" == data.message){
                    $scope.data.card.mobileNo = $scope.data.mobileNo;
                    $scope.data.card.gameCount = $scope.data.gameCount;
                    $scope.data.card.cCardNo = $scope.data.cCardNo;
                    $scope.data.card.orderNo = data.data[0];
                    $scope.data.card.billCash = $scope.data.billCash;
                    $scope.data.card.randomId = $scope.data.randomId;
                    $state.go('giftsuccess',{card:$rootScope.commonUtils.putParams($scope.data.card)});
                }else if("005" == data.message){
                    dialog.showTip({
                        template:$rootScope.errorMsg.giftCardMsg.pay_error
                    });
                }else if("007" == data.message){
                    dialog.showTip({
                        template: "抱歉,您已兑换!"
                    });
                }else if('NotLogin' == data.message){
                    $state.go('giftcheck',{type:"0"});
                    $scope.errorData.isSub = false;
                    return;
                }else{
                    $scope.errorData.errorMsg = $rootScope.errorMsg.phoneRechargeMsg.no_stock+"("+data.message+")";
                    dialog.showTip({
                        template: $scope.errorData.errorMsg
                    });
                }
                $scope.errorData.isSub = false;
            });

        }

    }]);

    app.controller('GiftSuccessCtrl',['$rootScope','$scope','$state','$stateParams','$location','dialog','PSBCommonService',function($rootScope,$scope,$state,$stateParams,$location,dialog,PSBCommonService){
        $scope.data = $rootScope.commonUtils.getParams($stateParams.card);
        $scope.data.cardNo = '';
        $scope.data.cardPass = '';
        $scope.data.isShare = false;

        $scope.getCard = function(){
            PSBCommonService.queryOrderDetail({orderNo:$scope.data.orderNo,mobileNo:$scope.data.mobileNo,randomId:$scope.data.randomId},function(data){
                if("success" == data.message){
                    if(-1 != data.data[0].cardName.indexOf('卡密') && !$rootScope.commonUtils.isEmpty(data.data[0].cardInfos)){
                        $scope.data.cardNo = data.data[0].cardInfos[0].cardNo;
                        $scope.data.cardPass = data.data[0].cardInfos[0].cardPass;
                    }
                    if($rootScope.commonUtils.isEmpty($scope.data.url)){
                        var i = 0;
                        if(-1 != data.data[0].cardName.indexOf('天猫')){
                            i = 1;
                        }else if(-1 != data.data[0].cardName.indexOf('唯品会')){
                            i = 3;
                        }else if(-1 != data.data[0].cardName.indexOf('1号店')){
                            i = 2;
                        }
                        $scope.data.url = PSBCommonService.getGiftCardList[i].url;
                        $scope.data.name = PSBCommonService.getGiftCardList[i].name;
                        $scope.data.desc = PSBCommonService.getGiftCardList[i].desc;
                        $scope.data.descUrl = PSBCommonService.getGiftCardList[i].descUrl;
                        if(-1 == data.data[0].cardName.indexOf('卡密')){
                            $scope.data.gameCount = data.data[0].gameCount;
                        }
                        PSBCommonService.getGiftBill($scope.data,function(data){
                            if("success" == data.message){
                                $scope.data.billCash = (parseInt(data.data[0].cash)*10)/11;
                            }else{
                                $scope.data.billCash = '';
                            }
                        });
                    }
                }else if('NotLogin' == data.message){
                    $state.go('giftcheck',{type:"0"});
                    return;
                }else{
                    $scope.data.cardNo = '';
                    $scope.data.cardPass = '';
                }
            });
        }

        $scope.getCard();

        $scope.goDetail = function(){
            location.href=$scope.data.descUrl;
        }

        $scope.hideShare = function(){
            $scope.data.isShare = false;
        }

    }]);

});