<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title ng-bind = "userData.title"></title>
    <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/css/style.css" />
    <style type="text/css">
        .cont {
            float: right;
            width: 860px;
            padding: 10px 0 90px 15px;
            background-color: #f4f4f4;
            border-left: 0px solid;
        }
        .nav-mycard {
            background-color: #b00;
            border-bottom: 4px solid #aa0000;
        }
    </style>
    <script type="text/javascript">
        if('Microsoft Internet Explorer' == navigator.appName){
            var version = navigator.appVersion.split(';')[1];
            var versionNum = parseInt(version.substr(version.length-3,1));
            if(9 > versionNum){
                location.href="http://mp.web.ofpay.com/common-server/common-fail.html";
            }
        }
    </script>
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

<body class="{{userData.topClass}}">
<div class="div-958">
    <div ng-class="{container:true,clearfix:true, w800:true}" class="{{userData.personClass[0]}}">
        <div ng-class="{cont:true,bl0:true}" ui-view class="{{userData.personClass[1]}}">

        </div>
    </div>
</div>


<input type = "hidden" value = '${authconfig}' id = "config"/>
<input type = "hidden" value = "${menu}" id = "menu"/>
<input type = "hidden" value = "${code}" id = "code"/>
<input type = "hidden" value = "${uuid}" id = "uuid"/>
<input type = "hidden" value = "${rechargeAccount}" id = "rechargeAccount"/>
<input type = "hidden" value = "${faceValue}" id = "faceValue"/>
<input type = "hidden" value = "${noRouter}" id = "noRouter"/>
<input type = "hidden" value = "${ofLinkId}" id = "ofLinkId"/>

</body>
<script data-main="/js/app-web-standard-cate.min.js" src="http://pic.ofcard.com/cards/js/angular/requiremin.js"></script>
</html>