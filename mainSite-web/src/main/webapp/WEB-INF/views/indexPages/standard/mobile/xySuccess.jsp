
<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <script typt="text/javascript" src="http://pic.ofcard.com/cards/js/angular/jweixin.js"></script>
  <title ng-bind = "userData.title"></title>
  <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/standard/css/${style}" />
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

<div class="content">
  <div class="list-success">
    <i></i>
    <h1 class="recharge-success">支付成功！</h1>
    <p class="tips">请稍后在我的账单中查询订单状态</p>
    <p class="tips mt30"><a href="${mallUrl}">返回商城</a></p>

  </div>
  <div class="recharge-pay">
    <button class="button button-block button-positive p-spacing" type="button" ng-click="goRecharge()">完成</button>
  </div>
</div>

<input type = "hidden" value = "${code}" id = "code"/>
<input type = "hidden" value = "${menu}" id = "menu"/>
<input type = "hidden" value = '${authconfig}' id = "config"/>
<input type = "hidden" value = "${mallUrl}" id = "mallUrl"/>
</body>

<script data-main="/js/app-mobile-standard.min.js" src="http://pic.ofcard.com/cards/js/angular/requiremin.js"></script>
</html>