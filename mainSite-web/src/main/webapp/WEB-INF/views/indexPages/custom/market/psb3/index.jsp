
<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title ng-bind = "userData.title"></title>
    <link type="text/css" rel="stylesheet" ng-href="http://pic.ofcard.com/cards/youzheng/css/style.css" />
    <script typt="text/javascript" src="http://pic.ofcard.com/cards/js/angular/jweixin.js"></script>
    <!--<link type="text/css" rel="stylesheet" href="/js/css/ionic.app.css" />-->
    </link>
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

<body>
<div ui-view>

</div>

<input type = "hidden" value = "${user}" id = "user"/>
<input type = "hidden" value = "${result}" id = "result"/>
</body>

<script data-main="/js/psb3App-all.min.js" src="http://pic.ofcard.com/cards/js/angular/requiremin.js"></script>


</html>