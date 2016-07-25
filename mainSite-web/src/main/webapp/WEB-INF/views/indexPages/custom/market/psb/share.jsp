
<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title></title>
    <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/youzheng/css/style.css" />
    </link>
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

<body>

<div class="content activ-tip-bg active-refreshLife">
    <div class="activ-n activ-n02">
        <!--<img src="../img/activity-theme-refreshLife.jpg" alt="刷新生活理所应当">-->
    </div>
    <form action="">
        <ul class="activ-form activ-form02">
            <div class="logo-activity logo-activity01">
                <img src="http://pic.ofpay.com/cards/youzheng/img/gift.png">
                <p>我在邮储领到了<span>${share}元</span>礼券</p>
            </div>
            <button class="activ-btn activ-btn-19" onclick="show()" type="button">我也要领奖</button>
        </ul>

    </form>

</div>

</body>

<script>
    function show(){
        location.href = "http://mp.weixin.qq.com/s?__biz=MzA3NzA1MTcwMQ==&mid=401150164&idx=1&sn=c4c783708f580aa8352a79b6f1fbd2df#rd";
    }
</script>

</html>