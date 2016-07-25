
<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <script typt="text/javascript" src="http://pic.ofcard.com/cards/js/angular/jweixin.js"></script>
  <title ng-bind = "userData.title"></title>
  <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/bank-of-Suzhou/css/style.css" />
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

<body style="background: #f5f5f5;">
<div class="content content-01 content-position">
  <div class="cont-sorry">
    <div class="sorry-img">
      <img src="http://pic.ofpay.com/cards/bank-of-Suzhou/img/sorry.png" alt="报错"/>
    </div>
    <p>Oh no! 貌似一不小心迷路了!</p>
    <button class="button button-block button-pay" onclick="window.location.reload();">刷&nbsp;&nbsp;新</button>
  </div>
</div>

</body>

</html>