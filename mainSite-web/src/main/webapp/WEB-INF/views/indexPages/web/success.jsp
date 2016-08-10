
<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <script typt="text/javascript" src="http://pic.ofcard.com/cards/js/angular/jweixin.js"></script>
    <title>未知请求</title>
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


</body>
</html>