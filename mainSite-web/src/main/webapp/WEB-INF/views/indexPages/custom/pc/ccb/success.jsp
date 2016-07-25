<%--
  Created by IntelliJ IDEA.
  User: lili
  Date: 15-3-31
  Time: 下午2:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>充值成功</title>
    <link href="http://www.007ka.cn/oempages/ccb_new/CSS/NNK.css" rel="stylesheet" type="text/css" />
    <link href="http://pic.ofpay.com/cards/jianhang/jianhang-pc/style.css" rel="stylesheet" type="text/css" />

    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?e0dc5e338b7e77e2bbab0f902b823ee6";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
    <style type="text/css">
        table.table-code{
            position: absolute;
            top: 50px;
            left: 22px;
            color:rgb(223, 39, 41);
        }
        table.table-code img{
            width:117px;
        }
        table.table-code td{
            display: inline-block;
            color:rgb(223, 39, 41);
            font-size:12px;
            margin-top: -15px;
        }
    </style>

</head>

<body>
<div class="div_745 div_717 relative">
    <div class="block_border mb_10">
        <div class="top_left bg-none"><div class="top_right"></div></div>
        <div class="body_left bg-none">
            <div class="body_right bg-none">
                <div class="div_border_d9 step">
                    <div class="pd_10">
                        <div class="gradient gradient-none">
                            <div class="title title-success"><i></i>支付成功！</div>
                            <div class="aline"></div>
                            <div class="mb_20 ">

                                <table  border="0" cellspacing="0" cellpadding="0" width="100%"  >
                                    <tr>
                                        <td width="100%" align="left" valign="bottom" style="font-size: 30px; font-weight: bold;padding-bottom: 20px;">支付成功！</td>
                                    </tr>
                                    <tr>
                                        <td height="25" align="left"  valign="bottom">预计1到15分钟到账，如有问题，请拨打客服电话400-111-7666</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="bline"></div>
                            <div class="pd_bo">
                                <a class="button_86_29 button_blue button_blue-auto"
                                   href="javascirpt:void(0)" onclick="CloseWin();">
                                    关闭</a>

                               <!-- <span class="button_86_29 color_hover step_next"
                                      onclick="window.location.href='/ccbIndex?menu='+document.getElementById('menu').value+'&user='+document.getElementById('user').value+'&sid='+document.getElementById('sid').value+'&encString='+document.getElementById('encString').value">回到首页</span>
                           --> </div>
                            <div class="line_gray"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom_left"><div class="bottom_right"></div></div>
    </div>
</div>
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
<input type = "hidden" value = "${encString}" id = "encString"/>
<input type = "hidden" value = "${sid}" id = "sid"/>
</body>
<script type="text/javascript" src="http://pic.ofcard.com/jslib/jquery/jquery-1.10.2.min.js" >
</script>
<script>
    function CloseWin()
    {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
            window.location.replace("about:blank");
        } else {
            window.opener = null;
            window.open(" ", "_self");
            window.close();
        }
    }
</script>
</html>