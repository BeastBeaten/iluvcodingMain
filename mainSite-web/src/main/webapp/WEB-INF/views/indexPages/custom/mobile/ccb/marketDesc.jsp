<%--
  Created by IntelliJ IDEA.
  User: lili
  Date: 14-11-25
  Time: 上午9:04
  To change this template use File | Settings | File Templates.
--%>

<%@ page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <meta property="qc:admins" content="251535350261111164116637575721457572145375576776453475565571325301275"/>
    <!-- uc强制竖屏 -->
    <meta name="screen-orientation" content="portrait">
    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="portrait">
    <title></title>
    <base href="/">

    <link type="text/css" rel="stylesheet" href="http://pic.ofpay.com/cards/jianhang02/css/style.css"/>
    <script type="text/javascript" name="baidu-tc-cerfication" data-appid="7147985"
            src="http://apps.bdimg.com/cloudaapi/lightapp.js"></script>
    <script type="text/javascript" src="http://pic.ofcard.com/cards/js/angular/jquery.js"></script>
    <script type="text/javascript" src="http://pic.ofpay.com/cards/js/jquery-cookie.js"></script>
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
        var gameCount = '${gameCount}';
        var faceValue = '${faceValue}';
        var randomId = jQuery.cookie("randomId");
        var mobileNo = jQuery.cookie("mobileNo");

        var agreeRules = function(){
            window.location.href="/ccbCustom/toMarket?gameCount="+gameCount+'&faceValue='+faceValue+'&randomId='+randomId;
        }

    </script>
</head>


<body style="background: #ededed;overflow:scroll">

<div class="content body-white">
    <div class="article">
        <h1>代金券说明</h1>

        <h2>一、代金券有哪些类型</h2>
        <p>代金券是系统对外发行和认可的活动优惠，类型包括现金抵用券、立减优惠，满减优惠，代金券具体使用条件可在代金券说明中查看。
        </p>
        <h2>二、如何获得代金券</h2>
        <p>1、系统可根据客户使用情况，赠送给满足条件的客户一定类型的代金券，如“充值就送”“登录就送”等活动。<br>
            2、系统可根据不同地区的客户赠送代金券，如“指定江苏南京客户可获得下单立减10元的代金券”。<br>
            3、系统会不定期发布线上活动，请保持关注并积极参与赢取代金券优惠，如“春节享好礼，抽奖送不停”。<br>
            4、不同地区不定期会有线下活动，活动方可提供提供兑换码，通过代金券页面输入兑换码，领取代金券，如“办理业务送话费”。<br>
            以上举例为方便客户理解，活动方式和参与条件以发布的活动说明为准。</p>

        <h2>三、 代金券的使用条件</h2>
        <p>欧飞不承担责任，包括但不限于：<br>
            1、代金券仅限领取时的账号使用，不可提现，买卖，兑换，转赠他人。<br>
            2、仅限支付时使用，每个订单只能使用一张代金券，不能叠加使用，且不找零。<br>
            3、使用代金券的下单账号和领取的下单账号需保持一致，且在代金券有效期内使用。<br>
            4、使用中优惠券为已有订单使用该优惠券但没有支付的状态，优惠券将于下单后半小时返回到原账户。

        </p></div>
    <div class="padding">
        <button class="button button-stable" type="button" onclick="agreeRules()">确定</button>
    </div>

</div>



</body>
</html>