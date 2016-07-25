<%--
  Created by IntelliJ IDEA.
  User: lili
  Date: 14-11-25
  Time: 上午9:04
  To change this template use File | Settings | File Templates.
--%>

<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <meta property="qc:admins" content="251535350261111164116637575721457572145375576776453475565571325301275" />
    <!-- uc强制竖屏 -->
    <meta name="screen-orientation" content="portrait">
    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="portrait">
    <title ng-bind = "userData.title"></title>


    <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/standard/css/${style}" />
    <%--<link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/mobile/css/jquery.mobile-1.4.5.min.css" />--%>
    <script type="text/javascript" name="baidu-tc-cerfication" data-appid="7147985" src="http://apps.bdimg.com/cloudaapi/lightapp.js"></script>

    <script type="text/javascript" src="http://pic.ofcard.com/cards/js/angular/jquery.js"></script>

    <script type="text/javascript" src="http://pic.ofpay.com/cards/js/lib/tools.js"></script>

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


<body style="background: #ededed;">

    <div ui-view>

    </div>

<input type = "hidden" value = '${authconfig}' id = "config"/>
<input type = "hidden" value = "${menu}" id = "menu"/>
<input type = "hidden" value = "${code}" id = "code"/>
<input type = "hidden" value = "${uuid}" id = "uuid"/>
<input type = "hidden" value = "${mallUrl}" id = "mallUrl"/>
<input type = "hidden" value = "${rechargeAccount}" id = "rechargeAccount"/>
<input type = "hidden" value = "${faceValue}" id = "faceValue"/>
<input type = "hidden" value = "${noRouter}" id = "noRouter"/>
<input type = "hidden" value = "${mallUrlOld}" id = "mallUrlOld"/>
<input type = "hidden" value = "${ofLinkId}" id = "ofLinkId"/>
<input type = "hidden" value = "${weChatCode}" id = "weChatCode"/>
</body>

<script data-main="/js/app-mobile-standard.min.js" src="http://pic.ofcard.com/cards/js/angular/requiremin.js"></script>
<script>
     $(document).ready(function () {
        var userCode = document.getElementById("code").value;
        var menu = document.getElementById("menu").value;
        var ua = window.navigator.userAgent.toLowerCase();
        var weChatCode = document.getElementById("weChatCode") ? document.getElementById("weChatCode").value ? document.getElementById("weChatCode").value : '' : '';
        var userLoginId = Tools.prototype.saveCookie(userCode +'randomId');
        var uuid = document.getElementById("uuid").value;
        if(!Tools.prototype.isEmpty(userLoginId)){
            return;
        }
        if(ua.match(/MicroMessenger/i) == 'micromessenger' && weChatCode == '' && Tools.prototype.isEmpty(uuid)){
            var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx50f31ec99b98711c&redirect_uri"
                    +"=http://web.yiqianlian.com/mobile/mobilecommon/"+userCode+"?menu="+menu+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";

            window.location.href = url;
            return;
        }
    });
</script>
</html>