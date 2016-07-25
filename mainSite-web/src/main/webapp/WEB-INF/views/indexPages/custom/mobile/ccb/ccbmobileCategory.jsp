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
    <script type="text/javascript">
        /**
         $.ajaxSetup({
            async : false
        });  **/

        var gameCount = '${gameCount}';
        var faceValue = '${faceValue}';
        var productNum = '${productNum}';
        var marketFaceValue = faceValue;
        var marketBillId = isEmpty(gameCount) ? '' : '${marketBillId}';
        var randomId = jQuery.cookie("randomId");
        var mobileNo = jQuery.cookie("mobileNo");
        var isFirst = jQuery.cookie("isFirst");
        var isEmpty = function (obj) {
            if (null == obj || '' == obj || undefined == obj || 'null' == obj) {
                return true;
            }
            return false;
        }
        if (isEmpty(gameCount) && !isEmpty(jQuery.cookie("gameCount"))) {
            gameCount = jQuery.cookie("gameCount");
        }


        var faceValueList = [{
            productCode: '',
            faceValue: 100,
            productName: '100元',
            choosed: false,
            stock: false,
            isOneFaceValue: false,
            price: '',
            productNum:100

        }, {
            productCode: '',
            faceValue: 200,
            productName: '200元',
            choosed: false,
            stock: false,
            isOneFaceValue: false,
            price: '',
            productNum:200
        }, {

            productCode: '',
            faceValue: 500,
            productName: '500元',
            choosed: false,
            stock: false,
            isOneFaceValue: false,
            price: '',
            productNum:500
        }, {

            productCode: '',
            faceValue: 1,
            productName: '任意充',
            choosed: false,
            stock: false,
            isOneFaceValue: true,
            price: '',
            productNum:0
        }];


        $(document).ready(function () {
            $('#clearIcon').hide();
            /**$("#dialog").hide();
            $('#clearIcon').hide();
            $("#gasCardName").hide();
            $("#orderError").html('');
            $("#orderDialog").hide();**/

            if(isEmpty(isFirst)){
                $("#navCont").show();
                $("#bar").hide();
                $("#gasForm").hide();
            }else{
                $("#navCont").hide();
                $("#bar").show();
                $("#gasForm").show();
            }

            if(!isEmpty(randomId) && !isEmpty(mobileNo)){
                $('#logout').html("退出登录")
                $('#logout').show();
                $('#toLogin').hide();
                $("#marketTitle").html("不使用");
            }else{
                marketBillId = '';
                $("#marketBillId").val("");
                $('#logout').hide();
                $('#toLogin').show();
                $("#marketTitle").html("登录享优惠");
            }

            if(!isEmpty(gameCount)){
                $("#gameCount").val(gameCount);
                checkOilCardNo ("1");
            }
            $("#takeOrder").click(function () {

                if (validateForm()) {
                    takeOrder();
                }
            });

            $("#hideNav").click(function(){
                $("#navCont").hide();
                $("#bar").show();
                $("#gasForm").show();
                jQuery.cookie("isFirst","no",{expires:30});
            });

            $("#closeNav").click(function(){
                $("#navCont").hide();
                $("#bar").show();
                $("#gasForm").show();
                jQuery.cookie("isFirst","no",{expires:30});
            });
            // getFaceValue("1");
        });

    </script>
</head>


<body style="background: #ededed;overflow:scroll">

<div class="nav-cont" id = "navCont">
    <div class="nav-close" id="closeNav">X</div>
    <div class="nav-cont-main">
        <img src="http://pic.ofcard.com/cards/jianhang02/img/nav-button.png" rel="建行">
    </div>
    <div class="nav-cont-btn" id="hideNav">
        <p><a></a></p>
    </div>
</div>

<div class="bar bar-header bar-positive" id="bar">
   <!-- <button class="button button-icon icon ion-ios7-arrow-back"></button>  -->
    <h1 class="title">加油卡</h1>
</div>
<form id="gasForm">
    <div class="content content-01 content-position">
        <!--<div class="content content-01">-->
        <!--没有返回标题，用上面注释的代码-->
        <div class="list">
            <div class="item recharge-input">
                <input id="gameCount" onkeyup="checkOilCardNo('1')" name="gameCount" onfocus="setPlace('1',this)" oninput="checkOilCardNo('1')"
                       onblur="checkOilCardNo('2')" type="tel" placeholder="请输入加油卡号">

                <p id="gasCardName" class="region"></p>
                <i id="clearIcon" class="icon-close-01 icon-close" onclick="clearError('3')"></i>
            </div>
        </div>
        <div class="recharge-p-list">
            <ul class="row row-wrap clearfix" id="faceValues">
                <li name="faceValue" class="col-33" id="50">
                    <a>100元</a>
                </li>
                <li name="faceValue" class="col-33" id="100">
                    <a>200元</a>
                </li>
                <li name="faceValue" class="col-33" id="500">
                    <a>500元</a>
                </li>
                <li name="faceValue" class="col-33" id="1">
                    <a>任意充</a>
                </li>

            </ul>
        </div>


        <div class="list list-inset mt0">
            <div class="item  recharge-input-normal item-icon-right fs-small" onclick = "toMarket()">
                优惠券红包：
                <a href="javascript:toMarket();" class="ion-right">
                    <span id="marketTitle" style="color: #be0000;"></span>
                    <i class="icon ion-ios7-arrow-right" style="color: #be0000;"></i>
                </a>
            </div>
        </div>

        <div class="recharge-pay pt0">
            <a class="service" href="/ccbCustom/serviceDesc?target=serviceDesc"><i></i>服务说明</a>
            <button class="button button-block button-positive" type="button" id="takeOrder">立即支付：<span id="total"
                                                                                                       class="sum"></span>
            </button>
        </div>
        <div class="copyright">
            <p class="link">
                <a  id="toLogin" onclick="toLogin()"><i></i>快速登录</a>

                <a  id="logout" onclick="logout()"><i></i>退出登录</a>
                ｜
                <a id="queryOrder" onclick="queryOrder()"><i class="icon-order"></i>订单查询</a>
                ｜
                <a href="/ccbCustom/serviceDesc?target=rechargeDesc"><i></i>充值说明</a>
            </p>
        </div>
    </div>

    <input type="hidden" value='${authconfig}' id="config"/>
    <input type="hidden" value="${menu}" id="menu"/>
    <input type="hidden" value="ccb" name="code" id="code"/>
    <input type="hidden" value="${uuid}" id="uuid"/>
    <input type="hidden" name="marketBillId" id="marketBillId" value="${marketBillId}"/>
    <input type="hidden" name="cardId" id="cardId"/>
    <input type="hidden" name="cardNum" id="cardNum"/>
    <input type="hidden" name="perValue" id="perValue"/>
    <input type="hidden" name="zsyValue" id="zsyValue"/>
    <input type="hidden" name="orderType" id="orderType" value="GASRECHARGE"/>
    <input type="hidden" name="memberId" id="memberId" value=""/>
    <input type="hidden" name="terminalType" id="terminalType" value=""/>
</form>
<div class="modal-backdrop" id="dialog" style="display:none">
    <div class="modal-custom">
        <div class="modal-body">
            <p class="tip"><i></i><span id="error"></span></p>
        </div>
        <div class="modal-footer">
            <div class="row row-no-padding">
                <div class="col">
                    <button class="button button-block button-fail" onclick="cancel()">确定</button>
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