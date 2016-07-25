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


    <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/bank-of-Suzhou/css/style.css" />
    <%--<link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/mobile/css/jquery.mobile-1.4.5.min.css" />--%>
    <script type="text/javascript" name="baidu-tc-cerfication" data-appid="7147985" src="http://apps.bdimg.com/cloudaapi/lightapp.js"></script>
    <script type="text/javascript" src="http://pic.ofcard.com/jslib/jquery/jquery-1.10.2.min.js" ></script>
    <script type="text/javascript" src="http://pic.ofcard.com/cards/js/custom/thirdPay.min.js" ></script>
    <script>

        /**$(document).ready(function() {
            $("#errorprompt").hide();
        });**/

        var _hmt = _hmt || [];

        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?cb85a5cc67b7d915afba666f85e1dd0e";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
         function setTongXunText (str){//通讯录回调
             if (ThirdApp.os == 'android'){
                 $('#gameCount')[0].value = str.number;
                 $('#phoneName')[0].innerText = str.name;
             }else if (ThirdApp.os == 'iphone'){
                 //alert(str);
                 if(str.split(',').length > 1){
                     $('#gameCount')[0].value = str.split(",")[0];
                     $('#phoneName')[0].innerText = str.split(",")[1];
                 }else{
                     $('#gameCount')[0].value = str;
                 }


             }

             if($('#cityin')[0]){
                 $('#cityin')[0].value = '';
             }

             $('#gameCount').change();
        }

       // ThirdApp.setTitleInfo("全国手机充值","goBack()");
        //设置返回的事件的回调函数，进行跳转
        function goBack(){
            window.history.back(-1);
        }

        function getCousterInfo(){
            ThirdApp.getMobileNo("getCousterMsg");
        }
        function getCousterMsg(str){
           // alert('getCousterMsg:' + str);
            $('#content')[0].value = ThirdApp.toJsonStr(str);
        }

    </script>

</head>


<body style="background: #ededed;">

    <div ui-view>

    </div>

    <!--
    <div class="modal-backdrop active" id="errorprompt">
        <div class="modal-custom">
            <div class="modal-body">
                <ul>
                    <li>88元充100话费名额已用完</li>
                </ul>
                <button class="button button-full" onclick="confirm()">我知道了</button>
            </div>
        </div>

    </div>   -->

<input type = "hidden" value = '${authconfig}' id = "config"/>
<input type = "hidden" value = "${menu}" id = "menu"/>
<input type = "hidden" value = "${code}" id = "code"/>
<input type = "hidden" value = "${uuid}" id = "uuid"/>
<input type ="hidden" value = "" id = "content"/>
<input type ="hidden" value = "${phoneNo}" id = "phoneNo"/>
<input type ="hidden" value = "${isPrivilegeUser}" id = "isPrivilegeUser"/>
<input type ="hidden" value = "${hasMarketBill}" id = "hasMarketBill"/>
    <input type ="hidden" value = "${randomId}" id = "randomId"/>
    <input type ="hidden" value = "${promptSaleEnd}" id = "promptSaleEnd"/>
</body>

<script data-main="/js/app-mobile-szbank.min.js" src="http://pic.ofcard.com/cards/js/angular/requiremin.js"></script>
<!--<script type="text/javascript">
    function confirm(){
        $("#errorprompt").hide();
    }
</script>-->
</html>