<%--
  Created by IntelliJ IDEA.
  User: zhoulijun
  Date: 26/7/19
  Time: 下午15:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <meta property="qc:admins" content="251535350261111164116637575721457572145375576776453475565571325301275" />
    <title></title>

    <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/standard/css/${style}" />

    <link rel="stylesheet" href="http://pic.ofcard.com/cards/standard/css/unslider.css" />
    <link rel="stylesheet" href="http://pic.ofcard.com/cards/standard/css/unslider-dots.css" />
    <script type="text/javascript" src="http://pic.ofcard.com/cards/js/angular/jquery-1.8.2.min.js"></script>
    <script src="http://pic.ofcard.com/cards/js/angular/jquery.event.move.js"></script>
    <script src="http://pic.ofcard.com/cards/js/angular/jquery.event.swipe.js"></script>
    <script type="text/javascript" src="http://pic.ofcard.com/cards/js/angular/unslider-min.js"></script>

    <script type="text/javascript" name="baidu-tc-cerfication" data-appid="7147985" src="http://apps.bdimg.com/cloudaapi/lightapp.js"></script>
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


<body style="background: #f6f6f6;overflow:scroll;">
<div class="content" style="top:0px;">
    <div class="slider">
        <ul class="slider-slides">
            <li class="slider-slide slider-slide-image"><img src="http://pic.ofcard.com/cards/standard/img/banner_ny1.jpg"></li>
            <li class="slider-slide slider-slide-image"><img src="http://pic.ofcard.com/cards/standard/img/banner_ny2.jpg"></li>

        </ul>
    </div>

    <div class="cate-nav clearfix">
        <a href="/mobile/mobilecommon/abc?menu=flowrecharge#/flowrecharge"><i class="icon icon-nav-101"></i>流量充值<span class="hot_ico"></span></a>
        <a href="/mobile/mobilecommon/abc?menu=phonerecharge#/phonerecharge"><i class="icon icon-nav-116"></i>话费充值</a>
        <a href="/mobile/mobilecommon/abc?menu=gasrecharge#/gasrecharge"><i class="icon icon-nav-110"></i>加油卡</a>
        <a href="/mobile/mobilecommon/abc?menu=gamerecharge#/gamecharge?gamename=Q%E5%B8%81%E7%9B%B4%E5%85%85"><i class="icon icon-nav-107"></i>Q币直充</a>
        <a href="/mobile/mobilecommon/abc?menu=gamerecharge#/gamerecharge"><i class="icon icon-nav-117"></i>游戏直充</a>
        <a href="/mobile/mobilecommon/abc?menu=giftCardrecharge#/giftCardrecharge"><i class="icon icon-nav-102"></i>礼品卡</a>
        <a href="/mobile/mobilecommon/abc?menu=viprecharge#/viprecharge"><i class="icon icon-nav-118"></i>会员充值</a>
        <a href="/mobile/mobilecommon/abc?menu=publicrecharge#/publicrecharge"><i class="icon icon-nav-105"></i>水电煤</a>
        <a><i class="icon icon-nav-109"></i>敬请期待</a>
    </div>

</div>
<script>
    $('.slider').unslider({
        autoplay: true,
        arrows: false
    });

</script>

</body>
</html>
