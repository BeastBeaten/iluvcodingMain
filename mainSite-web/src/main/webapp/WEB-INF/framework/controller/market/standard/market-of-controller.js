/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.market.marketModule',[]);

    app.controller('IndexCtrl',['$rootScope','$scope','$state','$stateParams','dialog','$cookieStore','$interval','MessageService','GavinService','MemberService','MarketService',function($rootScope,$scope,$state,$stateParams,dialog,$cookieStore,$interval,MessageService,GavinService,MemberService,MarketService){
        $scope.prizes = MarketService.getPrizes;

        $("#lottery td,#lottery tr,#lottery a").css({"height":$(window).width()*85/320+"px"});
        $("#lottery a").css({"width":$("#lottery td").width()+"px"});
        $("#lottery td,#lottery tr,#lottery a").css({"width":$(window).width()*85/320+"px"});
        $("#lottery a").css({"height":$("#lottery td").width()+"px"});


        var lottery={
            index:0,	//当前转动到哪个位置
            count:0,	//总共有多少个位置
            timer:0,	//setTimeout的ID，用clearTimeout清除
            speed:200,	//初始转动速度
            times:0,	//转动次数
            cycle:70,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize:-1,	//中奖位置
            init:function(id){
                if ($("#"+id).find(".lottery-unit").length>0) {
                    this.obj = $("#"+id);
                    this.count = $("#"+id).find(".lottery-unit").length;
//                    $("#"+id).find(".lottery-unit-"+this.index).addClass("active");
                };
            },
            roll:function(){
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                $(lottery).find(".lottery-unit-"+index).removeClass("active");
                index += 1;
                if (index>count-1) {
                    index = 0;
                };
                $(lottery).find(".lottery-unit-"+index).addClass("active");
                this.index=index;
                return false;
            },
            stop:function(index){
                this.prize=index;
                return false;
            },
            removeActive:function(){
                $(this.obj).find(".lottery-unit-"+this.index).removeClass("active");
            }
        };

        function roll(){
            lottery.times += 1;
            lottery.roll();

            if (lottery.times > lottery.cycle+30 && lottery.prize==lottery.index) {
                clearTimeout(lottery.timer);
//                lottery.prize=-1;
                lottery.times=0;
                click=false;
                $state.go('success');
                return;
            }else{
                if (lottery.times<lottery.cycle) {
                    lottery.speed -= 10;
                }else if(lottery.times >= lottery.cycle+60){
                    getPrizeFlag = true;
                    clearTimeout(lottery.timer);
                    clearTimeout(getPrizeOrderTimer);
                    lottery.prize=-1;
                    lottery.times=0;
                    lottery.removeActive();
                    click=false;
                    dialog.showTip({
                        template:'亲，服务器压力太大哦，请稍后重试'
                    });
                    return;
                }else if(lottery.times > lottery.cycle+25){
                    if(!getPrizeFlag && -1 == lottery.prize){
                        getPrizeFlag = true;
                        getPrizeOrderTimer = setTimeout(function(){
                            MarketService.getPrizeOrder({userToken:$rootScope.userLoginId,mobileNo:$scope.data.mobileNo},function(data){
                                if("success" == data.message){
                                    for(var i = 0;i<$scope.prizes.length;i++){
                                        if($scope.prizes[i].id == data.data[0].productId){
                                            lottery.prize=$scope.prizes[i].index;
                                            getPrizeFlag = true;
                                            break;
                                        }
                                    }
                                }
                                getPrizeFlag = false;
                            });
                        },3000);
                    }
                    if (lottery.times > lottery.cycle+20 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
                        lottery.speed += 110;
                    }else{
                        lottery.speed += 20;
                    }
                }
                if (lottery.speed<50) {
                    lottery.speed=50;
                }
                lottery.timer = setTimeout(roll,lottery.speed);
            }
            return false;
        }

        var click=false;

        var getPrizeFlag = false;

        var getPrizeOrderTimer;

        lottery.init('lottery');
        $scope.getPrize = function(){
            if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                $scope.data.isNotLogin = true;
                return;
            }
            $scope.data.isNotLogin = false;
            if (click) {
                return false;
            }else{
                lottery.speed=200;
                click=true;
                getPrizeFlag = false;
                MarketService.getPrize({userId:$rootScope.code,userToken:$rootScope.userLoginId,mobileNo:$scope.data.mobileNo},function(data){
                    if("success" == data.message){
                        roll();
                    }else if("LIMIT" == data.message){
                        dialog.showTip({
                            template:"亲，赶紧去充值获取抽奖资格吧"
                        });
                        click=false;
                    }else if("HAS" == data.message){
                        dialog.showTip({
                            template:"亲，您已领取过奖品，去查看我的奖品吧~"
                        });
                        click=false;
                    }else if("END" == data.message){
                        $rootScope.result = "END";
                        click = true;
                    }else if("NOTLOGIN" == data.message){
                        $rootScope.userLoginId = '';
                        $rootScope.mobileNo = '';
                        $scope.data.mobileNo = '';
                        $scope.data.isNotLogin = true;
                        click = false;
                    }else{
                        dialog.showTip({
                            template:'亲，服务器压力太大哦，请稍后重试'
                        });
                        click=false;
                    }
                });
                return false;
            }
        }

        $scope.goRecharge = function(){
            if("hw" == $rootScope.code){
                window.location.href="http://mp.web.ofpay.com/vmall?user=QTExMTE5NjE=&menu=phonerecharge#/phonerecharge";
            }
        }

        $scope.data = {
            isNotLogin:false,
            mobileNo:Tools.prototype.saveCookie('prizeNo'),
            goRouter:'',
            verifyCode:'',
            code:$rootScope.code
        }

        $scope.prize = function(){
            if(Tools.prototype.isEmpty($rootScope.userLoginId)){
                $scope.data.isNotLogin = true;
                $scope.data.goRouter = 'prize';
                return;
            }

            $state.go('prize');
        }

        $scope.idenCodeData={
            isGet:false,
            title:'发送',
            getImageCode:false,
            imageCodeUrl:''
        }
        $scope.errorData = {
            errorMsg:''
        }
        var loginSeconds = $cookieStore.get('prizeSeconds');
        var timerTime = $cookieStore.get('timerTime');
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
                    $cookieStore.remove('prizeSeconds');
                }else{
                    $scope.idenCodeData.title='('+loginSeconds + '秒)';
                    loginSeconds--;
                    $cookieStore.put('prizeSeconds',loginSeconds);
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
                        $cookieStore.remove('prizeSeconds');
                    }else{
                        $scope.idenCodeData.title='(' + seconds + '秒)';
                        seconds--;
                        $cookieStore.put('prizeSeconds',seconds);
                    }
                },1000);
                $cookieStore.put('timerTime',new Date().getTime());
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
                    $rootScope.userLoginId = $scope.data.randomId;
                    $rootScope.mobileNo = $scope.data.mobileNo;
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

        $scope.cancel = function(){
            $scope.data.isNotLogin = false;
        }



    }]);


    app.controller('PrizeCtrl',['$rootScope','$scope','$state','$stateParams','MarketService',function($rootScope,$scope,$state,$stateParams,MarketService){
        if(Tools.prototype.isEmpty($rootScope.userLoginId)){
            $state.go('index-of');
            return;
        }
        $scope.data = {
            userToken:$rootScope.userLoginId,
            mobileNo:$rootScope.mobileNo
        };
        $scope.orderList = '';
        $scope.prize ='';
        MarketService.getPrizeOrder($scope.data,function(data){
            if("success" == data.message){
                $scope.orderList = data.data;
                angular.forEach($scope.orderList,function(item,key){
                    if('0' == item.productType){
                        item.pic = 'http://pic.ofcard.com/cards/standard/img/lottery-gift-liuliang.png';
                    }else{
                        item.pic = 'http://pic.ofcard.com/cards/standard/img/win-gift.png';
                    }
                });
                $scope.prize = $scope.orderList[0];
            }else{
                $scope.orderList = '';
                $scope.prize ='';
            }
        });

        $scope.goRecharge = function(){
            if("hw" == $rootScope.code){
                window.location.href="http://mp.web.ofpay.com/vmall?user=QTExMTE5NjE=&menu=phonerecharge#/phonerecharge";
            }
        }


    }]);






});
