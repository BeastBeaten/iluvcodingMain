
<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <script typt="text/javascript" src="http://pic.ofcard.com/cards/js/angular/jweixin.js"></script>
  <title ng-bind = "userData.title"></title>
  <link type="text/css" rel="stylesheet" href="http://pic.ofpay.com/cards/jianhang02/css/style.css"/>
  <!--  <link type="text/css" rel="stylesheet" href="/statics/js/css/ionic.app.css" />-->
  <script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "//hm.baidu.com/hm.js?cb85a5cc67b7d915afba666f85e1dd0e";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  </script>
</head>


<body style="background: #f6f6f6;">

<div class="content">
  <div class="list-success">
    <i></i>
    <h1 class="recharge-success">支付成功！</h1>
    <p class="tips">请稍后在我的账单中查询订单状态</p>
  </div>
  <div class="recharge-pay">
    <button class="button button-block button-positive p-spacing" type="button" ng-click="goRecharge()">完成</button>
  </div>
</div>

<input type = "hidden" value = "${code}" id = "code"/>
<input type = "hidden" value = "${menu}" id = "menu"/>
<input type = "hidden" value = '${authconfig}' id = "config"/>
<input type = "hidden" value = "${rechargeAccount}" id = "rechargeAccount"/>
<input type = "hidden" value = "${faceValue}" id = "faceValue"/>
</body>

<script data-main="/js/framework/app/mobile/custom/app-mobile-ccb.js" src="http://pic.ofcard.com/cards/js/angular/requiremin.js"></script>
</html>