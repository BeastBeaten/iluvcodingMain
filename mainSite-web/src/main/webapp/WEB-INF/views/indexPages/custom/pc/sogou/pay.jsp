<%--
  订单支付页
  @author of938
--%>

<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>手机充值</title>
    <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/css/style.css" />
    <script src="http://pic.ofcard.com/cards/js/angular/jquery.js"></script>
    <script src="http://pic.ofcard.com/cards/js/lib/tools.js"></script>
    <script src="http://pic.ofcard.com/cards/js/angular/qrcode.js"></script>
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
    <script type="text/javascript">

        var tid = '${orderForm.billId}';
        var payForm = {
            code:'sogou',
            orderNo:tid,
            bankCode:'',
            payTypeId:'OLP',
            bankTypeId:1,
            payAmount:'${orderForm.cash}'
        };
        var curPay = '/sogou/getKernelPayUrl?orderNo=${orderForm.billId}';

        var getTotalPay = function(){
            $.get('/sogou/getTotalPay',payForm,function(data){
                if("success" == data.message){
                    if(parseFloat(data.data[0].acctPayAmount) < 0){
                        $("#ratePay").html('?');
                        $("#acctPayAmount").html('?');
                        $("#fail").html('手续费读取失败，请刷新页面或重新选择银行');
                        $("#fail").show();
                    }else{
                        $("#fail").html('');
                        $("#fail").hide();
                        $("#ratePay").html(data.data[0].acctPayAmount);
                        $("#acctPayAmount").html(Math.round((parseFloat(data.data[0].acctPayAmount) + parseFloat(payForm.payAmount))*1000)/1000);
                    }
                }
            });
        }

        var pay = function(){
            $("#shade").show();
            $("#payWindow").show();
        }

        var closePayWindow = function(){
            $("#shade").hide();
            $("#payWindow").hide();
        }

        var init = function(){
            $("#fail").hide();
            $("#shade").hide();
            $("#payWindow").hide();
            payForm.bankCode = $("input[name='bank']:checked")[0].value;
//            getTotalPay();
            $('#bankPay')[0].href = curPay+'&bankCode='+payForm.bankCode;
        }
        $(document).ready(function(){
            init();
            $("input[name='bank']").click(function(){
                payForm.bankCode = $("input[name='bank']:checked")[0].value;
//                getTotalPay();
                $('#bankPay')[0].href = curPay+'&bankCode='+payForm.bankCode;
            });
        });

    </script>

</head>


<body class="body-sogo">

<div class="cont bl0 cont-sogo">
    <div class="title clearfix">
        <a class="fr" href="/sogou/order">订单中心</a>
        <h2>订单提交成功，请您尽快付款！订单号：${orderForm.billId}</h2>
    </div>
    <div class="content">
        <form class="">
            <div class="orderIntro clearfix">
                <ul class="fr">
                    <li>商品价格</li>
                    <li class="gap"></li>
                    <li style="width:55px;">&nbsp;</li>
                    <li class="gap"></li>
                    <li>&nbsp;</li>
                    <li class="fb">${orderForm.cash}</li>
                    <li class="gap fb">&nbsp;</li>
                    <li class="orange fb" style="width:55px;"></li>
                    <li class="gap fb">&nbsp;</li>
                    <li class="orange fb"></li>

                </ul>
                <ul class="fl">
                    <li>商品名称：${orderForm.cardName}</li>
                    <li>收款方：江苏欧飞电子商务有限公司</li>
                </ul>
            </div>

            <ul class="bankTab clearfix">
                <li class="current"><a href="javascript:void(0)">在线支付</a></li>
            </ul>

            <div class="block" id="ylPay">
                <div class="bankList show">
                    <ul class="clearfix">
                        <li><input type="radio" name="bank" id="alipay" value="ZDY_ALIPAY_PC" checked><label title="支付宝" class="bank-icon alipay" for="alipay"></label></li>
                        <li><input type="radio" name="bank" id="icbc" value="ZDY_UP_PC"><label title="中国工商银行" class="bank-icon icbc" for="icbc"></label></li>
                        <li><input type="radio" name="bank" id="abchina" value="ZDY_UP_PC"><label title="中国农业银行" class="bank-icon abchina" for="abchina"></label></li>
                        <li><input type="radio" name="bank" id="cbchina" value="ZDY_UP_PC"><label title="中国银行" class="bank-icon cmbchina" for="cbchina"></label></li>
                        <li><input type="radio" name="bank" id="ccb" value="ZDY_UP_PC"><label title="中国建设银行" class="bank-icon ccb" for="ccb"></label></li>
                        <li><input type="radio" name="bank" id="bankcomm" value="ZDY_UP_PC"><label title="交通银行" class="bank-icon bankcomm" for="bankcomm"></label></li>
                        <li><input type="radio" name="bank" id="psb" value="ZDY_UP_PC"><label title="中国邮政储蓄银行" class="bank-icon psb" for="psb"></label></li>
                        <li><input type="radio" name="bank" id="ecitic" value="ZDY_UP_PC"><label title="中信银行" class="bank-icon ecitic" for="ecitic"></label></li>
                        <li><input type="radio" name="bank" id="cmbc" value="ZDY_UP_PC"><label title="中国民生银行" class="bank-icon cmbc" for="cmbc"></label></li>
                        <li><input type="radio" name="bank" id="cib" value="ZDY_UP_PC"><label title="兴业银行" class="bank-icon cib" for="cib"></label></li>
                        <li><input type="radio" name="bank" id="cmbchina" value="ZDY_UP_PC"><label title="招商银行" class="bank-icon cmbchina" for="cmbchina"></label></li>
                        <li><input type="radio" name="bank" id="spdb" value="ZDY_UP_PC"><label title="浦发银行" class="bank-icon spdb" for="spdb"></label></li>
                        <li><input type="radio" name="bank" id="gdb" value="ZDY_UP_PC"><label title="广发银行" class="bank-icon gdb" for="gdb"></label></li>
                        <li><input type="radio" name="bank" id="hxb" value="ZDY_UP_PC"><label title="华夏银行" class="bank-icon hxb" for="hxb"></label></li>
                        <li><input type="radio" name="bank" id="shb" value="ZDY_UP_PC"><label title="上海银行" class="bank-icon shb" for="shb"></label></li>
                        <li><input type="radio" name="bank" id="srcb" value="ZDY_UP_PC"><label title="上海农商银行" class="bank-icon srcb" for="srcb"></label></li>
                        <li><input type="radio" name="bank" id="pingan" value="ZDY_UP_PC"><label title="平安银行" class="bank-icon pingan" for="pingan"></label></li>
                        <li><input type="radio" name="bank" id="chinaBankLarge" value="ZDY_UP_PC"><label title="中国银行大额" class="bank-icon chinaBankLarge" for="chinaBankLarge"></label></li>
                        <li><input type="radio" name="bank" id="bjb" value="ZDY_UP_PC"><label title="北京银行" class="bank-icon bjb" for="bjb"></label></li>
                        <li><input type="radio" name="bank" id="abb" value="ZDY_UP_PC"><label title="北京农商银行" class="bank-icon abb" for="abb"></label></li>
                    </ul>
                    <a href="/sogou/getKernelPayUrl?orderNo=${orderForm.billId}&bankCode=ZDY_UP_PC" target="_blank" onclick="pay()">查看更多&gt;&gt;&gt;</a>
                </div>

            </div>

            <!-- 提交表单报错，按钮置灰调用btnDisabled,报错信息<span class="fail">XXXXXXX</span> -->
            <a id = "bankPay" class="btn btn-sogo" target="_blank" href="" onclick="pay()">去支付</a>
            <span class="fail" id = "fail"></span>
        </form>
    </div>

    <div class = "shade" id = "shade">

    </div>
    <div class = "window payWindow" id = "payWindow">
        <a class="close" onclick = "closePayWindow()"></a>
        <h2>登录网上银行付款</h2>
        <h1><span class="red">！</span>请在新开网银页面完成付款后选择</h1>
        <div class="tc">
            <a class="btn" href="/sogou/order">付款成功</a>
            <a class="btn btnDisabled ml20" href="/sogou/order">付款失败</a>
        </div>

    </div>

    <div class = "intro w800 intro-sogo" >
        <ul class="clearfix service-sogo">
            <li class="introBg">
                <dl>
                    <dt><span>让缴费充值更轻松！</span></dt>
                    <dd><span>1.月初和月末运营商系统繁忙，话费到账时间可能会出现延迟。</span></dd>
                    <dd><span>2.部分状态特殊的手机号(空号、停机等)造成无法充值，将会进行退款。</span></dd>
                    <dd><span>3.30元以上面值的部分订单会出现分批到账情况,无法参加运营商的活动。</span></dd>
                </dl>
            </li>
            <li>
                <div class="tel"><p>客服电话</p><h1><span>025-69828599</span></h1><br></div>
                <div style="margin-left: 5px;margin-top: -36px;">本服务由江苏欧飞电子商务有限公司提供</div>
            </li>
        </ul>
    </div>
</div>
</body>

</html>