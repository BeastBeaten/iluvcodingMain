<%--
  订单确认页
  @author of938
--%>

<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>手机充值</title>
    <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/css/style.css" />
    <script src="http://pic.ofcard.com/cards/js/angular/jquery.js"></script>
    <script src="http://pic.ofpay.com/cards/js/lib/tools.js"></script>
    <script type="text/javascript" name="baidu-tc-cerfication" data-appid="7147985" src="http://apps.bdimg.com/cloudaapi/lightapp.js"></script>
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?e0dc5e338b7e77e2bbab0f902b823ee6";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
    <script type="text/javascript">
        var mobileNo = '${orderForm.gameCount}';
        var orderType='${orderForm.orderType}';
        var cardNum='${orderForm.cardNum}';
        var cardType='${orderForm.cardType}';
        var cardId='${orderForm.cardId}';
        var gameCount='${orderForm.gameCount}';
        var perValue='${orderForm.perValue}';
        var flowValue='${orderForm.flowValue}';
        var flag = true;
        var sendCodeFlag = false;
        var verifyCode = '';
        var timer;

        var checkAccount = function(obj){
            obj.value = obj.value.replace(/\D/g,'');
            $("#errorMsg").html('');
            if(!Tools.prototype.isEmpty(obj.value) && 11 < obj.value.length){
                obj.value = obj.value.substr(0,11);
            }
            if(11 == obj.value.length && !Tools.prototype.isMobileNo(obj.value)){
                $("#errorMsg").html('号码格式错误');
            }
        }

        var checkCode = function(obj){
            obj.value = obj.value.replace(/\D/g,'');
            if(!Tools.prototype.isEmpty(obj.value) && 6 < obj.value.length){
                obj.value = obj.value.substr(0,6);
            }
            $("#errorMsg").html('');
        }

        var getIdenCode = function(obj){
            $("#getCodeBtn").attr("disabled","disabled");
            mobileNo = $("#mobileNo").val();
            if(Tools.prototype.isEmpty(mobileNo)){
                $("#errorMsg").html('请输入手机号码');
                $("#getCodeBtn").removeAttr("disabled");
                return false;
            }
            if(!Tools.prototype.isMobileNo(mobileNo)){
                $("#errorMsg").html('号码格式错误');
                $("#getCodeBtn").removeAttr("disabled");
                return false;
            }
            if(!sendCodeFlag){
                $("#getCodeBtn").addClass("btnDisabled");
                sendCodeFlag = true;
                var seconds = 59;
                var timer = setInterval(function(){
                    if(0 == seconds){
                        clearInterval(timer);
                        sendCodeFlag = false;
                        $("#getCodeBtn").html('获取');
                        $("#getCodeBtn").removeAttr("disabled");
                        $("#getCodeBtn").removeClass("btnDisabled");
                        Tools.prototype.saveCookie("seconds",null);
                    }else{
                        $("#getCodeBtn").html('再次获取' + seconds + '');
                        seconds--;
                        Tools.prototype.saveCookie("seconds",seconds,{expires:0.00069});
                    }
                },1000);
                $.get('/gavin/sendVerifyCode',{telPho:mobileNo},function(data){
                    if('success' == data.message){

                    }else if("OverSendingLimit" == data.message){
                        $("#errorMsg").html('操作过于频繁，请稍后再试');
                    }else{
                        $("#errorMsg").html('获取验证码错误，请稍后重试');
                    }
                });
            }

        }

        var checkIdenCode = function(obj){
            verifyCode = $("#verifyCode").val();
            mobileNo = $("#mobileNo").val();
            if(Tools.prototype.isEmpty(mobileNo)){
                $("#errorMsg").html('请输入手机号码');
                return false;
            }
            if(!Tools.prototype.isMobileNo(mobileNo)){
                $("#errorMsg").html('号码格式错误');
                return false;
            }
            if(Tools.prototype.isEmpty(verifyCode)){
                $("#errorMsg").html('请输入验证码');
                return false;
            }
            $("#errorMsg").html('');
            $.get('/gavin/checkVerifyCode',{telPho:mobileNo,verifyCode:verifyCode},function(data){
                if('success' == data.message){
                    $("#login1").hide();
                    $("#login2").hide();
                    $("#login3").hide();
                    $("#cookieMobileNo").html(mobileNo);
                    $("#login4").show();
                }else{
                    $("#errorMsg").html('验证码验证错误，请重新获取');
                }
            });
        }

        var goPay = function(){
            if(!flag){
                mobileNo = $("#mobileNo").val();
                verifyCode = $("#verifyCode").val();
            }
            if(Tools.prototype.isEmpty(mobileNo)){
                $("#errorMsg").html('请输入手机号码');
            }else if(!flag && Tools.prototype.isEmpty(verifyCode)){
                $("#errorMsg").html('请输入验证码');
            }else if(Tools.prototype.isEmpty($("#goPay")[0].href)){
                $("#errorMsg").html('请验证手机');
            }else{
                $("#errorMsg").html('');
            }
            $.get('/sogou/takeOrder',{code:'sogou',platform:'PC',orderType:orderType,cardNum:cardNum,cardType:cardType,cardId:cardId,gameCount:gameCount,perValue:perValue,memberId:mobileNo,flowValue:flowValue},function(data){
                if('error' == data){
                    $("#errorMsg").html('抱歉，暂时缺货，请重新选择');
                }else{
                    window.location.href='/sogou/pay?tid='+data;
                }
            });
        }

        var updatePhoneNum = function(){
            mobileNo = '';
            flag = false;
            init();
        }

        var init = function(){
            $("#errorMsg").html('');
            if(Tools.prototype.isEmpty(mobileNo)){
                $("#login1").show();
                $("#login2").show();
                $("#login3").show();
                $("#cookieMobileNo").html('');
                $("#login4").hide();
            }else{
                $("#login1").hide();
                $("#login2").hide();
                $("#login3").hide();
                $("#cookieMobileNo").html(mobileNo);
                $("#login4").show();
            }
            if(!Tools.prototype.isEmpty(mobileNo)){
                flag = true;
            }else{
                flag = false;
                var seconds = Tools.prototype.saveCookie("seconds");
                if(!Tools.prototype.isEmpty(seconds) && 0 < parseInt(seconds)){
                    $("#getCodeBtn").attr("disabled","disabled");
                    $("#getCodeBtn").addClass("btnDisabled");
                    timer = setInterval(function(){
                        if(0 == seconds){
                            clearInterval(timer);
                            sendCodeFlag = false;
                            $("#getCodeBtn").html('获取');
                            $("#getCodeBtn").removeAttr("disabled");
                            $("#getCodeBtn").removeClass("btnDisabled");
                            Tools.prototype.saveCookie("seconds",null);
                        }else{
                            $("#getCodeBtn").html('再次获取' + seconds + '');
                            seconds--;
                            Tools.prototype.saveCookie("seconds",seconds,{expires:0.00069});
                        }
                    },1000);
                }
            }
        }


        $(document).ready(function(){
            init();
        });

    </script>

</head>


<body class="body-sogo">

<div class="cont bl0 cont-sogo">
    <div class="title clearfix">
        <a class="fr" href="/sogou/order">订单中心</a>
        <h2>订单确认</h2>
    </div>
    <div class="content">
        <form class="">
            <h2 class="order-h2">订单信息</h2>
            <div class="orderIntro orderIntro-01 clearfix">
                <ul class="fl">
                    <li >充值账号：${orderForm.gameCount}</li>
                </ul>
                <ul class="">
                    <li>商品名称：${orderForm.cardName}</li>
                    <li>订单金额：<span class="orange">${orderForm.cash}元</span></li>
                </ul>
            </div>


            <h2 class="order-h2">您用于收货或查单的手机号</h2>
            <div class="orderIntro orderIntro-02 clearfix">
                <ul class="orderList">
                    <li id="login1">
                        <span class="label">手机号码</span>
                        <input class="inputTxt num  placeholder" id="mobileNo" placeholder="请输入手机号码" type="text" onkeyup="checkAccount(this)">
                    </li>
                    <li id="login2">
                        <span class="label">验证码</span>
                        <input class="inputTxt input-65p placeholder" type="text" id = "verifyCode" onkeyup="checkCode(this)">
                        <a class="btn btnVerify btn-sogo" id="getCodeBtn" onclick="getIdenCode()">获取</a>
                    </li>
                    <li id="login3">
                        <span class="label">&nbsp;</span>
                        <input class="btn btn-sogo" value="验证" type="button" onclick="checkIdenCode()">
                    </li>
                    <li id="login4">
                        <span class="label">手机号码</span>
                        <em class="orange" id = "cookieMobileNo"></em>
                        <a  class="btn btnVerify btn-sogo" onclick="updatePhoneNum()">修改号码</a>
                    </li>
                </ul>
            </div>


            <p class="priceAll"></p>
            <%--<input class="btn btn-sogo" value="确认并支付" type="button" id="takeOrder">--%>
            <a id = "goPay" class="btn btn-sogo" href="javascript:goPay();">确认订单</a>
            <span class="fail" id="errorMsg"></span>
        </form>
    </div>

    <div class = "intro w800 intro-sogo" >
        <ul class="clearfix service-sogo">
            <li class="introBg">
                <dl>
                    <dt><span>让缴费充值更轻松！</span></dt>
                    <dd><span>1.月初和月末运营商系统繁忙，话费到账时间可能会出现延迟。</span></dd>
                    <dd><span>2.部分状态特殊的手机号(空号、停机等)造成无法充值，将会进行退款。</span></dd>
                    <dd><span>3.30元以上面值的部分订单会出现分批到账情况,无法参加运营商的活动。</span></dd>
                </dl>
            </li>
            <li>
                <div class="tel"><p>客服电话</p><h1><span>025-69828599</span></h1><br></div>
                <div style="margin-left: 5px;margin-top: -36px;">本服务由江苏欧飞电子商务有限公司提供</div>
            </li>
        </ul>
    </div>
</div>
</body>

</html>