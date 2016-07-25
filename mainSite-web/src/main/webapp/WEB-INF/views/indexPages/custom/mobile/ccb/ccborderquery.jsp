<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
        var gameCount = '${gameCount}';
        $(document).ready(function () {
            $('#dialog').hide();
            $('#error').html('');
            var date = new Date();
            for (var i = 0; i < 6; i++) {
                var tempDate = new Date(date.getFullYear(), (date.getMonth() + 1 - i));

                var year = tempDate.getFullYear();
                var month = tempDate.getMonth();

                if (month == 0) {
                    year = year - 1;
                    month = 12;
                }
                var value = year + ";" + (month - 1);

                if ($('#startYear').val() == year && $('#startMonth').val() == (month - 1)) {
                    $('#dateTime').append("<option selected value='" + value + "'>" + year + "年" + month + "月</option>");
                } else {
                    $('#dateTime').append("<option value='" + value + "'>" + year + "年" + month + "月</option>");
                }

            }

            $('#dateTime').change(function () {
                var value = $(this).find("option:selected").val();
                $('#startYear').val(value.split(";")[0]);
                $('#startMonth').val(value.split(";")[1]);
                queryOrder();
            });

            $('#tab1').click(function () {
                $("#tabFlag").val(1);
                queryOrder();
            });
            $('#tab2').click(function () {
                $("#tabFlag").val(2);
                queryOrder();
            });
            $('#tab3').click(function () {
                $("#tabFlag").val(3);
                queryOrder();
            });

            function queryOrder() {
                var randomId = jQuery.cookie("randomId");
                if (isEmpty(randomId)) {
                    randomId = "";
                }
                $("#memberId").val(randomId);
                $('#orderQueryForm').submit();
            }

        });

        function goPay(billId) {
            $("button").prop('disabled', true);
            var terminalType;
            if (/android/i.test(navigator.userAgent)) {
                terminalType = 'Android';
            } else if (/ipad|iphone/i.test(navigator.userAgent)) {
                terminalType = 'iPhone';
            }
            var randomId = jQuery.cookie("randomId");
            if (isEmpty(randomId)) {
                randomId = "";
            }

            $.post("/ccbCustom/goPay", {terminalType:terminalType,billId:billId,randomId:randomId}, function(result) {
                if (result.message == "success" && result.data.length > 0) {
                    window.location.href = result.data[0];
                }
                else {
                    $("#error").html('支付失败！');
                    $("#dialog").show();
                    $("button").prop('disabled', false);
                }
            });
        }

        function goBackRecharge(){
            window.location.href="/ccbCustom/mobilecommon?gameCount="+gameCount;
        }

    </script>
</head>


<body style="background: #ededed;overflow:scroll">

<div class="bar bar-header bar-positive">
    <button class="button button-icon icon ion-ios7-arrow-back" onclick="goBackRecharge()"></button>
    <h1 class="title">加油卡</h1>
</div>
<div class="tabs-striped tabs-top tabs-order">
    <div class="tabs">
        <a class="tab-item <c:if test="${tabFlag eq 1}"> active </c:if>" id="tab1">
            <span>已完成</span>
        </a>
        <a class="tab-item <c:if test="${tabFlag eq 2}"> active </c:if>" id="tab2">
            <span>待支付</span>
        </a>
        <a class="tab-item <c:if test="${tabFlag eq 3}"> active </c:if>" id="tab3">
            <span>撤销</span>
        </a>
    </div>
</div>
<div class="content content-01 content-position content-position-02">

        <form id="orderQueryForm" action="/ccbCustom/orderQuery" method="post">
            <input type="hidden" id="startYear" name="startYear" value="${startYear}"/>
            <input type="hidden" id="startMonth" name="startMonth" value="${startMonth}"/>
            <input type="hidden" value="ccb" name="code" id="code"/>
            <input type="hidden" value="" name="memberId" id="memberId"/>
            <input type="hidden" value="${tabFlag}" name="tabFlag" id="tabFlag"/>
            <div class="list list-account list-border">
                <label class="item item-select item-icon-right">
                    账单月份
                    <select class="select-orig" id="dateTime">
                    </select>
                    <a class="ion-right">
                        <i class="icon ion-ios7-arrow-down"></i>
                    </a>
                </label>
            </div>
        </form>
        <c:if test="${orderInfos.totalCount == 0}">
            <div class="coupons">
                <div class="coupons-item">
                    <div class="body-top">
                        <div class="body-bg"><i></i></div>
                        <!--<h2>50<span>元</span></h2>-->
                        <p class="tip-sorry">抱歉，暂未查到相关订单</p>
                    </div>
                </div>
            </div>
        </c:if>
        <c:if test="${orderInfos.totalCount > 0}">
            <div class="coupons-notice coupons-notice-top coupons-notice1">
                <p>优惠券支付失败的订单，请30分钟后重新下单！</p>
            </div>
            <c:forEach var="order" items="${orderInfos.data}">
                <div class="coupons">
                    <div class="coupons-item">
                        <div class="body-top">
                            <div class="body-bg"><i></i></div>
                            <dl>
                                <dd>
                                    <h2>${order.facePric}<span>元</span></h2>
                                    <p>${order.cardName}</p>
                                </dd>
                                <dt>
                                <p class="ng-binding">${order.gameCount}</p>
                                <p class="ng-binding">${order.billId}</p>
                                <p class="ng-binding">购买数量: ${order.cardNum}</p>
                                <p class="ng-binding">${order.orderTime}</p>
                                </dt>
                            </dl>

                        </div>
                        <div class="body-bottom body-bottom-ed">
                            <p>应付：<span>${order.cash}元</span></p>
                            <c:if test="${tabFlag eq 1}">
                                <button class="activ-btn activ-btn-ed02" style="bottom: 10px">支付成功</button>
                            </c:if>
                            <c:if test="${tabFlag eq 2}">
                                <button class="activ-btn activ-btn-ed01" style="bottom: 10px" onclick="goPay('${order.billId}')">去支付</button>
                            </c:if>
                            <c:if test="${tabFlag eq 3}">
                                <p class="p-grey">退款将在3-7个工作日内返还到原账户</p>
                                <button class="activ-btn" style="bottom: 10px">撤销</button>
                            </c:if>
                        </div>
                    </div>
                </div>
            </c:forEach>
            <!--<div class="coupons-notice" id="pullUp">
                <p>加载更多</p>
            </div>  -->

        </c:if>
    <div class="coupons-notice coupons-notice-ing">
        <a class="tip-service" href="http://kefu.easemob.com/webim/im.html?tenantId=12358"><i></i>在线客服</a>
    </div>


</div>

<div class="modal-backdrop" id="dialog">
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

</body>
</html>