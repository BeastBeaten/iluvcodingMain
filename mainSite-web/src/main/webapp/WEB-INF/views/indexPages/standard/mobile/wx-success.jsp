<%--
    微信扫码支付成功回调页面
--%>

<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <!--  <title ng-bind = "userData.title"></title> -->
    <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/css/style.css" />
    <!--  <link type="text/css" rel="stylesheet" href="/statics/js/css/ionic.app.css" />-->
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?e0dc5e338b7e77e2bbab0f902b823ee6";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
</head>


<body style="background: #f6f6f6;">
<ion-content class="content padding">
    <div>
        <h1 class="recharge-success">
            <i class="icon ion-checkmark-circled"></i>支付成功
            <br/>
            <small>
                请稍后前往订单查询查看充值状态
            </small>
        </h1>
    </div>
</ion-content>
</body>
</html>