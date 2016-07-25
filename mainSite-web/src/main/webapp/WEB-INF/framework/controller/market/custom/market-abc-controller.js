/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.marketAbc.marketAbcModule',[]);

    app.controller('actIndex',['$rootScope','$scope','$state','$stateParams','$cookieStore','$interval','dialog','MessageService','GavinService','MemberService','MarketService',function($rootScope,$scope,$state,$stateParams,$cookieStore,$interval,dialog,MessageService,GavinService,MemberService,MarketService){

    }]);

    app.controller('act3Recharge',['$rootScope','$scope','$state','$stateParams','$cookieStore','$interval','dialog','MessageService','GavinService','MemberService','MarketService',function($rootScope,$scope,$state,$stateParams,$cookieStore,$interval,dialog,MessageService,GavinService,MemberService,MarketService){

    }]);

    app.controller('IndexCtrl',['$rootScope','$scope','$state','$stateParams','$cookieStore','$interval','dialog','MessageService','GavinService','MemberService','MarketService',function($rootScope,$scope,$state,$stateParams,$cookieStore,$interval,dialog,MessageService,GavinService,MemberService,MarketService){
        $scope.data = {
            type:$stateParams.type,
            isNotLogin:false,
            isAllow:false,
            isGetPrize:false,
            code:'abc',
            userId:'',
            mobileNo:'',
            verifyCode:''
        };

        $scope.idenCodeData={
            isGet:false,
            title:'发送'
        }

        $scope.errorData = {
            errorMsg:''
        };

        $scope.close = function(type){
            if('1' == type){
                $scope.errorData.errorMsg = '';
            }else{
                $scope.data.isNotLogin = false;
            }
        }

        if('1' == $scope.data.type){
            $scope.data.isNotLogin = true;
        }else if('AOM' == $rootScope.result){
            $scope.errorData.errorMsg = '本次活动名额已满，请下次参与！';
        }

        var loginSeconds = $cookieStore.get('abcSeconds');
        var timerTime = $cookieStore.get('abcTimerTime');
        var nowTime = new Date().getTime();
        if(!Tools.prototype.isEmpty(timerTime) && (nowTime - parseFloat(timerTime))/1000 >= 60){
            loginSeconds = 0;
        }
        if(!Tools.prototype.isEmpty(loginSeconds) && 0 < parseInt(loginSeconds)){
            $scope.idenCodeData.isGet = true;
            loginSeconds = parseInt(loginSeconds);
            var cookieTimer = $interval(function(){
                if(0 == loginSeconds){
                    $interval.cancel(cookieTimer);
                    $scope.idenCodeData.isGet = false;
                    $scope.idenCodeData.title = '发送';
                    $cookieStore.remove('abcSeconds');
                }else{
                    $scope.idenCodeData.title='('+loginSeconds + '秒)';
                    loginSeconds--;
                    $cookieStore.put('abcSeconds',loginSeconds);
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
                    $('#telPho')[0].placeholder="请输入您的手机号码";
                }else if(!Tools.prototype.isMobileNo($scope.data.mobileNo)){
                    dialog.showTip({
                        template:MessageService.errorMsg.commonMsg.phone_format_error
                    });
                }else{
                    $scope.errorData.errorMsg = '';
                }
            }else if('3' == type){
                $scope.data.mobileNo = $scope.data.mobileNo.replace(/\D/g,'');
                if(!Tools.prototype.isEmpty($scope.data.mobileNo)){
                    if(11 < $scope.data.mobileNo.length){
                        $scope.data.mobileNo = $scope.data.mobileNo.substr(0,11);
                    }
                    if(11 == $scope.data.mobileNo.length && Tools.prototype.isMobileNo($scope.data.mobileNo)){
                        MarketService.getPhoneInfo($scope.data.mobileNo,function(data){
                            if("success" == data.message && data.data[0].prvcin.indexOf("江苏") != -1 && data.data[0].cityin.indexOf("南京") != -1){
                                $scope.data.isAllow = true;
                            }else{
                                dialog.showTip({
                                    template:'抱歉,您的手机号不在活动区域内'
                                });
                                $scope.data.isAllow = false;
                            }
                        });
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
                    $('#verifyCode')[0].placeholder="请输入验证码";
                }else{
                    $scope.errorData.errorMsg = '';
                }
            }else if('3' == type){
                $scope.data.verifyCode = $scope.data.verifyCode.replace(/\D/g,'');
                if(!Tools.prototype.isEmpty($scope.data.verifyCode)){
                    if(6 < $scope.data.verifyCode.length){
                        $scope.data.verifyCode = $scope.data.verifyCode.substr(0,6);
                    }
                }
            }
        }

        $scope.checkForm = function(type){
            if (Tools.prototype.isEmpty($scope.data.mobileNo)) {
                dialog.showTip({
                    template:MessageService.errorMsg.commonMsg.no_phone
                });
                return false;
            }
            if (!Tools.prototype.isMobileNo($scope.data.mobileNo)) {
                dialog.showTip({
                    template:MessageService.errorMsg.commonMsg.phone_format_error
                });
                return false;
            }

//            if(!$scope.data.isAllow){
//                dialog.showTip({
//                    template:'抱歉,您的手机号不在活动区域内'
//                });
//                return false;
//            }
            if('2' == type){
                if(Tools.prototype.isEmpty($scope.data.verifyCode)){
                    dialog.showTip({
                        template:MessageService.errorMsg.commonMsg.no_code
                    });
                    return false;
                }
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
                        $scope.idenCodeData.title = '发送';
                        $cookieStore.remove('abcSeconds');
                    }else{
                        $scope.idenCodeData.title='(' + seconds + '秒)';
                        seconds--;
                        $cookieStore.put('abcSeconds',seconds);
                    }
                },1000);
                $cookieStore.put('abcTimerTime',new Date().getTime());
                GavinService.sendVerifyCode({telPho:$scope.data.mobileNo},function(data){
                    if("success" == data.message){

                    }else if("OverSendingLimit" == data.message){
                        dialog.showTip({
                            template:MessageService.errorMsg.commonMsg.over_sending_limit
                        });
                    }
                    else{
                        dialog.showTip({
                            template:MessageService.errorMsg.commonMsg.send_code_error
                        });
                    }
                });
            }
        }

        $scope.login = function(){
            if(!$scope.checkForm('2')){
                return;
            }
            var now = new Date();
            $scope.data.randomId = now.getTime() + Math.random().toString(36).substr(2);
            MemberService.login($scope.data,function(data){
                if('success' == data.message){
                    $scope.data.randomId = data.resultCode;
                    $rootScope.userLoginId = $scope.data.randomId;
                    $rootScope.mobileNo = $scope.data.mobileNo;
                    Tools.prototype.saveCookie('abcrandomId',null,{path:'/'});
                    Tools.prototype.saveCookie('abcloginMobileNo',null,{path:'/'});
                    Tools.prototype.saveCookie('abcrandomId',$scope.data.randomId,{expires:1,path:'/'});
                    Tools.prototype.saveCookie('abcloginMobileNo',$scope.data.mobileNo,{expires:1,path:'/'});
                    $scope.data.isNotLogin = false;
                }else if('MAX_LIMIT' == data.message){
                    dialog.showTip({
                        template:MessageService.errorMsg.commonMsg.over_sending_limit
                    });
                }else{
                    dialog.showTip({
                        template:MessageService.errorMsg.commonMsg.check_code_error
                    });

                }
            });
        }

        var rotateFunc = function(angle){  //awards:奖项，angle:奖项对应的角度
            $('#lotteryBtn').stopRotate();
            $("#lotteryBtn").rotate({
                angle:0,
                duration: 5000,
                animateTo: angle+3600,
                callback:function(){
                    if(!Tools.prototype.isEmpty($rootScope.billInfo)){
                        $state.go('success');
                    }
                }
            });
        };

        var getAngle = function(value){
            switch (value){
                case '5':return 36;
                case '10':return 108;
                case '15':return 180;
                case '25':return 252;
                case '50':return 324;
                default :return 0;
            };
        }

        $scope.getPrize = function(){
            if($scope.data.isGetPrize){
                return;
            }
            $scope.data.isGetPrize = true;

            if('AOM' == $rootScope.result){
                $scope.errorData.errorMsg = '本次活动名额已满，请下次参与！';
                $scope.data.isGetPrize = false;
                return;
            }

            if(Tools.prototype.isEmpty($rootScope.userLoginId) || Tools.prototype.isEmpty($rootScope.mobileNo)){
                $scope.data.isNotLogin = true;
                $scope.data.isGetPrize = false;
                return;
            }
            $scope.data.userId = $rootScope.userLoginId;
            if(Tools.prototype.isEmpty($scope.data.mobileNo) && !Tools.prototype.isEmpty($rootScope.mobileNo)){
                $scope.data.mobileNo = $rootScope.mobileNo;
            }
            MarketService.getPrize($scope.data,function(data){
                if('success' == data.message){
                    $rootScope.billInfo = data.data[0];
                    rotateFunc(getAngle($rootScope.billInfo.cash));
                }else if('HasBill' == data.message){
                    $scope.errorData.errorMsg = '您已参加本次活动，请去查看我的奖品！';
                }else if('NotLogin' == data.message){
                    $scope.data.isNotLogin = true;
                }else if('NoAllow' == data.message){
                    $scope.errorData.errorMsg = '抱歉,您的手机号不在活动区域内';
                }else if('AOM' == data.message){
                    $scope.errorData.errorMsg = '本次活动名额已满，请下次参与！';
                }else if('END' == data.message){
                    $state.go('end');
                }else{
                    $scope.errorData.errorMsg = '亲，服务器压力太大哦，请稍后重试';
                }
                $scope.data.isGetPrize = false;
            });
        }

        $scope.myPrize = function(){
            if(Tools.prototype.isEmpty($rootScope.userLoginId) || Tools.prototype.isEmpty($rootScope.mobileNo)){
                $scope.data.isNotLogin = true;
                return;
            }
            $state.go('prizes');
        }

    }]);


    app.controller('PrizeCtrl',['$rootScope','$scope','$state','$stateParams','MarketService',function($rootScope,$scope,$state,$stateParams,MarketService){
        $scope.data = {
            code:'abc',
            userId:$rootScope.userLoginId
        }

        MarketService.getPrizes($scope.data,function(data){
            if("success" == data.message){
                $scope.prizes = data.data;
            }else{
                $scope.prizes = '';
            }
        });

    }]);

    app.controller('SuccessCtrl',['$rootScope','$scope','$state','$stateParams','dialog','$location','WxService',function($rootScope,$scope,$state,$stateParams,dialog,$location,WxService){
        if(Tools.prototype.isEmpty($rootScope.billInfo)){
            $state.go('index');
            return;
        }
    }]);






});
