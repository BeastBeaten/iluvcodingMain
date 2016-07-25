<%--
  Created by IntelliJ IDEA.
  User: lili
  Date: 14-11-25
  Time: 上午9:04
  To change this template use File | Settings | File Templates.
--%>

<%@ page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <meta property="qc:admins" content="251535350261111164116637575721457572145375576776453475565571325301275"/>
    <!-- uc强制竖屏 -->
    <meta name="screen-orientation" content="portrait">
    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="portrait">
    <title></title>
    <base href="/">

    <link type="text/css" rel="stylesheet" href="http://pic.ofpay.com/cards/jianhang02/css/style.css"/>
    <script type="text/javascript" name="baidu-tc-cerfication" data-appid="7147985"
            src="http://apps.bdimg.com/cloudaapi/lightapp.js"></script>
    <script type="text/javascript" src="http://pic.ofcard.com/cards/js/angular/jquery.js"></script>
    <script type="text/javascript" src="http://pic.ofpay.com/cards/js/jquery-cookie.js"></script>
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
        var curroute = '${curroute}';
        var gameCount = '${gameCount}';
        var faceValue = '${faceValue}';
        var productNum = '${productNum}';
        var randomId = jQuery.cookie("randomId");
        var mobileNo = jQuery.cookie("mobileNo");
        var marketBillId='',usedCash,gasRechargeType;

        var isEmpty = function (obj) {
            if (null == obj || '' == obj || undefined == obj || 'null' == obj) {
                return true;
            }
            return false;
        }

        var cancel = function(type){
            if('1' == type){
                window.location.href="/ccbCustom/mobilecommon?gameCount="+gameCount+"&faceValue="+faceValue+'&productNum='+productNum;
            }else if('2' == type){
                $("#dialog").hide();
            }
        }

        var showRules = function(){
            window.location.href = '/ccbCustom/toMarketDesc?gameCount='+ gameCount +"&faceValue="+faceValue+'&randomId='+randomId+'&productNum='+productNum;
        }

        var chooseBill = function(obj,billCash,billId,flag){
            if(!flag){
                return;
            }
            if(!isEmpty(usedCash) && usedCash.indexOf(billCash) != -1){
                $("#error").html('抱歉，当前充值账号已使用过该面值优惠券，请选择其它优惠券！');
                $("#dialog").show();
                return;
            }
            $('label[name="marketBill"]').removeClass('checked');
            $(obj).addClass('checked');
            marketBillId = billId;
        }

        var confirm = function(){
            window.location.href="/ccbCustom/mobilecommon?gameCount="+gameCount+"&faceValue="+faceValue+"&marketBillId="+marketBillId+'&productNum='+productNum;
        }

        var getMarketBill = function(){
            $.get("/ccbCustom/queryBill",{code:'ccb',userId:randomId,rechargeAccount:gameCount},function(data){
                if("success" == data.message){
                    $("#noMarketBills").hide();
                    $("#marketBills").show();
                    usedCash = data.resultCode;
                    for(var i = 0; i < data.data.length;i++){
                        var labelClass = 'item item-radio padding0';
                        if(isEmpty(faceValue)){
                            labelClass += ' disabled';
                        }else{
                            if(1 == gasRechargeType){
                                if("1" == data.data[i].state && "0" == data.data[i].consumerState && "5" == data.data[i].templateCateId && parseFloat(faceValue) == parseFloat(data.data[i].faceValue)){
                                    labelClass += '';
                                }else if("1" == data.data[i].state && "0" == data.data[i].consumerState && "5" == data.data[i].templateCateId && ("10" == data.data[i].cash || "20" == data.data[i].cash) && "1" != faceValue){
                                    labelClass += '';
                                }else{
                                    labelClass += ' disabled';
                                }
                            }else if(2 == gasRechargeType){
                                if("1" == data.data[i].state && "0" == data.data[i].consumerState && "5" == data.data[i].templateCateId && ("10" == data.data[i].cash || "20" == data.data[i].cash) && !isEmpty(productNum) && 100 <= parseInt(productNum)){
                                    labelClass += '';
                                }else{
                                    labelClass += ' disabled';
                                }
                            }
                        }
                        var flag = labelClass.indexOf("disabled") == -1 ?  true : false;
                        var marketLabel  = '<label name="marketBill" class="'+labelClass+'" onclick=chooseBill(this,"'+data.data[i].cash+'","'+data.data[i].billId+'",'+flag+')>' +
                                '<div class="item-content padding">' +
                                '<p class="red-en-money" style="line-height: 72px;"><span>￥</span><b>'+data.data[i].cash+'</b></p>';

                        if("10" == data.data[i].cash){
                            marketLabel += '<p>仅限非任意充'+data.data[i].templateCateName+'使用<br>江苏用户专享优惠券<br>不可叠加使用<br><span>有效期：'+data.data[i].endTime.substring(0,10)+'</span>';
                        }else if("20" == data.data[i].cash){
                            marketLabel += '<p>仅限非任意充'+data.data[i].templateCateName+'使用<br>宁波用户专享优惠券<br>不可叠加使用<br><span>有效期：'+data.data[i].endTime.substring(0,10)+'</span>';
                        }else{
                            marketLabel += '<p>仅限'+data.data[i].faceValue+'元'+data.data[i].templateCateName+'使用<br>新版界面体验优惠券<br>不可叠加使用<br><span>有效期：'+data.data[i].endTime.substring(0,10)+'</span>';
                        }

                        if("1" == data.data[i].consumerState){
                            marketLabel += '<i class="inactive"></i></p></div>';
                        }else if("3" == data.data[i].consumerState){
                            marketLabel += '<i class="locking"></i></p></div>';
                        }else{
                            marketLabel += '</p></div>';
                        }

                        marketLabel += '<i class="radio"></i></label>';

                        $("#marketBills").append(marketLabel);
                    }
                }else{
                    $("#marketBills").hide();
                    $("#noMarketBills").show();
                }
            });
        }

        $(document).ready(function () {
            $("#noMarketBills").hide();
            $("#marketBills").hide();
            if(isEmpty(randomId) || isEmpty(gameCount)){
                cancel();
            }
            if(gameCount.slice(0,1) == '1'){
                gasRechargeType = 1;
            }else{
                gasRechargeType = 2;
            }
            getMarketBill();
        });

    </script>
</head>


<body style="background: #ededed;overflow:scroll">

<div class="bar bar-header bar-positive bar-positive-01">
    <button class="button button-p" onclick="cancel('1')">取消</button>
    <h1 class="title">优惠券查询</h1>
</div>
<div class="content content-01 content-position">
    <div class="list list-pay">

        <div class="rule-gift">
            <a onclick="showRules()"><i></i>优惠券说明</a>
        </div>

        <label class="item item-radio padding0" id = "noMarketBills">
            <div class="item-content padding">
                <span>未查询到相关优惠券信息</span>
            </div>
        </label>

        <div id = "marketBills">

        </div>

    </div>

    <div class="recharge-pay">
        <button class="button button-block button-positive button-spacing" type="button" onclick="confirm()">确定</button>
    </div>

</div>

<div class="modal-backdrop" id="dialog" style="display:none">
    <div class="modal-custom">
        <div class="modal-body">
            <p class="tip"><i></i><span id="error"></span></p>
        </div>
        <div class="modal-footer">
            <div class="row row-no-padding">
                <div class="col">
                    <button class="button button-block button-fail" onclick="cancel('2')">确定</button>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>