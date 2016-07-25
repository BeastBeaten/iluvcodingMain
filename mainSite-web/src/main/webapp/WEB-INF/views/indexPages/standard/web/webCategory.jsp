<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title ng-bind = "userData.title"></title>
    <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/css/style.css" />
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
<div ng-class = "{top:true}" ng-show="''!= userData.topImg || '' != userData.topClass">
    <div ng-class="{container:true}">
        <a ng-class="{logo:true}" ng-href="{{userData.topUrl}}" target="_blank"><img ng-src="{{userData.topImg}}"></a>
    </div>
</div>

<div ng-class="{head:true}" ng-show="''!=userData.title && ''==userData.topLogo">
    <div ng-class="{container:true}">
        <h1 class="h1"><span ng-bind = "userData.title"></span></h1>
        <ul ng-class="{nav:true,clearfix:true}">
            <li class="current" ng-repeat ="menu in parentMenu" ng-click = "chooseParentMenu(menu.name)"><a href="#"><span ng-bind = "menu.name"></span></a></li>
        </ul>
    </div>
</div>

<div ng-class="{head:true}" class="{{userData.personClass[0]}}" ng-show="''!=userData.topLogo">
    <div ng-class="{container:true}">
        <h1 class="{{userData.topLogoClass}}">
            <a ng-repeat="item in userData.topLogo" ng-href="{{item.src}}" ng-class="item.className">

            </a>
        </h1>
        <ul ng-class="{nav:true,clearfix:true}" class="{{userData.personClass[1]}}">
            <li class="current" ng-repeat ="menu in parentMenu" ng-click = "chooseParentMenu(menu.name)"><a href="#"><span ng-bind = "menu.name"></span></a></li>
        </ul>
    </div>
</div>

<div ng-class="{main:true}" class="{{userData.personClass[2]}}" ng-show="0 < childMenu.length">
    <div ng-class="{container:true,clearfix:true}">
        <div ng-class="{menu:true}" class="{{userData.personClass[3]}}">
            <ul>
                <li ng-repeat ="item in childMenu" ng-class="{'cur':item.choosed}" ng-click ="chooseChildMenu(item.name)">
                    <a ui-sref="{{item.url}}"><i class="menuIcon {{userData.personClass[4]}} {{item.iconClass}}"></i><span ng-bind = "item.name"></span></a>
                </li>
            </ul>
        </div>
        <div ng-class="{cont:true}" ui-view>

        </div>
    </div>
    <input type = "hidden" value = "${user}" id = "user"/>
    <input type = "hidden" value = "${uuid}" id = "uuid"/>
    <input type = "hidden" value = "${userLoginId}" id = "userLoginId"/>
</div>

<div ng-class = "{intro:true}" ng-show="null != currentFrameMenu.pic && 'A1159141' != userId">
    <ul ng-class="{clearfix:true}">
        <li>
            <div>
                <p class="{{currentFrameMenu.pic}}"><span ng-bind="currentFrameMenu.title"></span></p>
            </div>
        </li>
        <li ng-class="{introBg:true}">
            <dl ng-class="{introBg2:true}">
                <dt><span ng-bind="currentFrameMenu.descTitle"></span></dt>
                <dd ng-repeat = "item in currentFrameMenu.desc"><span ng-bind="item"></span></dd>
            </dl>
        </li>
        <li style="background: none;" ng-show="'vip' != userData.topClassTemp && ''==userData.footerClass">
            <phoneserver></phoneserver>
        </li>
        <li style="background: none;" ng-show="'vip' == userData.topClassTemp">
            <qqserver></qqserver>
        </li>
        <li style="background: none;" ng-show="'vip' != userData.topClassTemp && '189' == userData.footerClass">
            <dxphoneserver></dxphoneserver>
        </li>
        <li style="background: none;" ng-show="'vip' != userData.topClassTemp && 'ycs' == userData.footerClass">
            <ycsphoneserver></ycsphoneserver>
        </li>
        <li style="background: none;" ng-show="'vip' != userData.topClassTemp && 'yxt' == userData.footerClass">
            <yxtphoneserver></yxtphoneserver>
        </li>
        <li style="background: none;" ng-show="'vip' != userData.topClassTemp && 'ZHYF' == userData.footerClass">
            <zhyfphoneserver></zhyfphoneserver>
        </li>
        <li style="background: none;" ng-show="'vip' != userData.topClassTemp && 'jb' == userData.footerClass">
            <jbserver></jbserver>
        </li>
    </ul>

</div>

<div ng-class = "{footer:true}" ng-show="'0' != userData.footer && ('' == userData.footerClass || 'jb' == userData.footerClass)">
    <footer></footer>
</div>
<div ng-class = "{footer:true}" ng-show="'0' != userData.footer && '189' == userData.footerClass">
    <dxfooter></dxfooter>
</div>
<div ng-class = "{footer:true}" ng-show="'0' != userData.footer && 'ycs' == userData.footerClass">
    <ycsfooter></ycsfooter>
</div>
<div ng-class = "{footer:true}" ng-show="'0' != userData.footer && 'yxt' == userData.footerClass">
    <yxtfooter></yxtfooter>
</div>
<div ng-class = "{footer:true}" ng-show="'0' != userData.footer && 'ZHYF' == userData.footerClass">
    <zhyffooter></zhyffooter>
</div>


<input type = "hidden" value = '${authconfig}' id = "config"/>
<input type = "hidden" value = "${menu}" id = "menu"/>
<input type = "hidden" value = "${code}" id = "code"/>
<input type = "hidden" value = "${uuid}" id = "tempUuid"/>
<input type = "hidden" value = "${rechargeAccount}" id = "rechargeAccount"/>
<input type = "hidden" value = "${faceValue}" id = "faceValue"/>
<input type = "hidden" value = "${noRouter}" id = "noRouter"/>
<input type = "hidden" value = "${ofLinkId}" id = "ofLinkId"/>

</body>
<script data-main="/js/app-web-standard.min.js" src="http://pic.ofcard.com/cards/js/angular/requiremin.js"></script>
</html>
