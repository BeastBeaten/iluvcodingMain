<%--
  Created by IntelliJ IDEA.
  User: lili
  Date: 15-6-1
  Time: 上午10:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="http://www.007ka.cn/oempages/ccb_new/CSS/NNK.css" rel="stylesheet" type="text/css" />
    <link href="http://pic.ofpay.com/cards/jianhang/jianhang-pc/style.css" rel="stylesheet" type="text/css" />

    <style>
        .tag {
            display: inline-block;
            padding: 3px 10px;
            margin-right: 15px;
            margin-bottom: 20px;
            height: 18px;
            min-width: 78px;
            color: #333;
            line-height: 18px;
            text-align: center;
            background-color: #fff;
            border: 1px solid #c7c7c7;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            -ms-border-radius: 2px;
            -o-border-radius: 2px;
            border-radius: 2px;
        }
        a.tag:hover { color: #333;text-decoration: none; border: 1px solid #6eaeeb;}
        .tagChecked{
            border: 1px solid #6eaeeb;
        }
        .tagDisabled{
            cursor: auto;
            color: #9e9e9e;
            background-color: #f9f9f9;
        }
    </style>
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
<!-- <body onLoad="change_span_value();"> -->
<form name = "orderForm">

    <div class="div_745 div_717 relative">
        <div class="block_border mb_10">
            <div class="top_left bg-none"><div class="top_right bg-none"></div></div>
            <div class="body_left bg-none">
                <div class="body_right">
                    <div class="div_border_d9">
                        <div class="pd_10">
                            <div class="gradient gradient-none">
                               <!-- <div class="title">确认充值信息</div>
                                <div class="aline"></div>
                                <div class="mb_20 ">
                                    <p class="title title-error">${errormessage}</p>
                                </div>
                                <div class="bline"></div>
                                <div class="listbox" style="padding-bottom: 20px;padding-top:20px;">
                                    <!--<a class="button_86_29 color_hover step_next">确定</a>
                                    <!--<span class="button_86_29 color_hover step_next" onclick="/common/getPayUrrl?orderNo={{data.orderNo}}&userId={{data.userId}}&bankCode={{data.bankCode}}" ng-click="pay()">确定</span>-->
                                    <!--<span class="label">&nbsp;</span>
                                    <span class="button_86_29 button_blue" onclick="window.history.back()">返回</span>

                                   <!-- <a class="button_86_29 color_hover step_next" onclick="window.history.back()">上一步</a>  -->
                               <!-- </div>   -->

                                <form >
                                    <p class="title title-error"><i></i>异常原因：运营商维护中，请稍后再试</p>
                                    <div class="bline"></div>
                                    <div  class="listbox" style="padding-bottom: 20px;padding-top:20px;">
                                        <span class="label">&nbsp;</span>
                                        <span class="button_86_29 button_blue" onclick="window.history.back()">返回</span>
                                    </div>
                                </form>

                                <!-- <div class="line_gray"></div>  -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom_left bg-none"><div class="bottom_right"></div></div>
        </div>
    </div>


</form>

<!-- footer -->

<div class="div_745 div_717 relative">
    <div class="block_border mb_10">
        <div class="top_left bg-none">
            <div class="top_right">
            </div>
        </div>
        <div class="body_left bg-none">
            <div class="body_right">
                <div class="div_border_d9 step">
                    <div>
                        <div class="div_border_d9 step" style="">
                            <div class="pd_10">
                                <div style=" line-height:20px; font-size:12px; font-family:宋体; text-align: left">
                                    <span class="red tips">温馨提示</span>
                                    <ul class="tips-cont">

                                        <li><span>•</span> 月初和月末运营商系统繁忙，话费到账时间可能会出现延迟。</li>
                                        <li><span>•</span>部分状态特殊的手机号(空号、停机等)造成无法充值，将会进行退款。</li>
                                        <li><span>•</span>30元以上面值的部分订单会出现分批到账情况,无法参加运营商的活动。</li>
                                        <li><span>•</span>如有任何疑问请致电咨询，服务电话：400-111-7666<br/>
                                    <span class="red">◆在线客服</span>
                                    <li><a target="_blank" href="http://kefu.easemob.com/webim/im.html?tenantId=12358" >
                                        <img style="vertical-align:top; float:left; margin:0px; padding:0;" border="0" src="http://pic.ofcard.com/cards/jianhang/img/btn-service.png" alt="点击这里给我发消息" title="点击这里给我发消息" /></a>
                                    </li>
                                  </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom_left bg-none">
            <div class="bottom_right">
            </div>
        </div>
    </div>
</div>

<input type = "hidden" value = "${user}" id = "user"/>
<input type = "hidden" value = "${menu}" id = "menu"/>
<input type = "hidden" value = "${cellPhone}" id = "cellPhone"/>
<input type = "hidden" value = "${price}" id = "price"/>
<input type = "hidden" value = "${encString}" id = "encString"/>
<input type = "hidden" value = "${sid}" id = "sid"/>
</body>
<script type="text/javascript" src="http://pic.ofcard.com/jslib/jquery/jquery-1.10.2.min.js" >
</script>
