<%--
  Created by IntelliJ IDEA.
  User: lili
  Date: 16/3/29
  Time: 上午10:57
  To change this template use File | Settings | File Templates.
--%>
<%@page import="java.net.URLDecoder" %>
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
    <script type="text/javascript" src="/js/ccb-mobile.js"></script>
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
    <%
        String param = request.getQueryString();
        if(null != param && !"".equals(param)){
            param = URLDecoder.decode(param);
        }
    %>
    <script type="text/javascript">
        var orderForm = "<%=param%>";
        var curroute = '${curroute}';
        var randomId = jQuery.cookie("randomId");
        var gameCount = '${gameCount}';
        var faceValue = '${faceValue}';
        $(document).ready(function () {

            $("#image").hide();
           /** $("#dialog").hide();
            $("#orderError").html('');
            $("#orderDialog").hide();**/
//            if(!isEmpty(randomId)){
//                window.location.href = "/ccbCustom/mobilecommon?gameCount=" + gameCount;
//            }

            // getFaceValue("1");
        });
    </script>
</head>
<body style="background: #ededed;">
<div class="bar bar-positive bar-header bar-positive-01">
    <!--bar-cont定义top-->
    <button class="button button-p" onclick="cancelLogin(curroute,gameCount)">取消</button>
    <h1 class="title">快速登录</h1>
</div>
    <div class="content content-02 content-position body-white">
        <ul class="recharge-p-list recharge-p-list01 mt0">
            <li class="list">
                <input class="item item-grey recharge-input-i clearfix" name="mobileNo" id="mobileNo" type="tel" onfocus="checkMobileNo('1')" onkeyup="checkMobileNo('2')"
                       onblur="checkMobileNo('3')"
                       placeholder="请输入手机号码"/>
                <i></i>
                <a class="item-note item-note-btn" id="getCodeBtn" onclick="getIdenCode(this)">获取验证码</a>

            </li>
            <li class="list">
                <input class="item item-grey recharge-input-i clearfix" name="verifyCode" id="verifyCode" type="tel"
                       onkeyup="checkCode(this)" placeholder="请输入短信验证码"/>
                <i></i>
            </li>
            <li class="list" id="image">
                <input class="item item-grey recharge-input-i clearfix" id = "imageCode" onchange="checkImageCode('3')" onfocus="checkImageCode('1')" onblur="checkImageCode('2')" placeholder="请输入验证字符">
                <i class="icon-img"></i>
                <div class="list-right" onclick="flushImageCode()">
                    <img class="verifi-img" id="imagePic" src="">
                </div>
            </li>
            <!--
            <li class="list">
                <input class="item item-grey recharge-input-i clearfix" placeholder="请输入验证字符">
                <i class="icon-img"></i>

                <div class="list-right">
                    <img class="verifi-img" src="http://pic.ofpay.com/cards/standard/img/verification.png"/>

                </div>
            </li>  -->
        </ul>
        <div class="recharge-pay">
            <button class="button button-block button-positive mt20" onclick="login(this)"><span>完成</span></button>
        </div>
        <!-- <div class="list-auto list-entry">
             <div class="line">
                 <p class="col-average"></p>

                 <p class="col-average"></p>
             </div>
             <p class="p-line red">第三方登录</p>
             <img src="../img/QQ.png"/>

             <p>QQ</p>

         </div>   -->

    </div>

    <input type="hidden" value="ccb" name="code" id="code"/>
    <input type="hidden" value="" name="randomId" id="randomId"/>

<div class="modal-backdrop" id="dialog" style="display:none">
    <div class="modal-custom">
        <div class="modal-body">
            <p class="tip"><i></i><span id="error"></span></p>
        </div>
        <div class="modal-footer">
            <div class="row row-no-padding">
                <div class="col">
                    <button class="button button-block button-fail" onclick="cancel(gameCount)">确定</button>
                </div>
                <!--
                <div class="col">
                    <button class="button button-block button-sucess" ng-click="cancle()">重新获取</button>
                </div>   -->
            </div>
        </div>
    </div>
</div>
<div class="modal-backdrop" id="orderDialog" style="display:none">
    <div class="modal-custom">
        <div class="modal-body">
            <p class="tip"><i></i><span id="orderError"></span></p>
        </div>
        <div class="modal-footer">
            <div class="row row-no-padding">
                <div class="col">
                    <button class="button button-block button-fail" onclick="goBackRecharge()">确定</button>
                </div>
                <!--
                <div class="col">
                    <button class="button button-block button-sucess" ng-click="cancle()">重新获取</button>
                </div>   -->
            </div>
        </div>
    </div>
</div>

</body>

</html>
