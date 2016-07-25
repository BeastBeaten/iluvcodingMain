<%--
  Created by IntelliJ IDEA.
  User: lili
  Date: 15-3-30
  Time: 上午10:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="http://www.007ka.cn/oempages/ccb_new/CSS/NNK.css" rel="stylesheet" type="text/css" />
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
<form name = "orderForm" type="post" action="${base}/confirmOrder" id="billOrderForm">

    <input type = "hidden" name="userCode" value = "${user}" id = "userId"/>
    <input type = "hidden" name="billId" value = "0" id = "billId"/>
    <input type = "hidden" name="cardNum" value = "0" id = "cardNum"/>
    <input type = "hidden" name="cardName" value = "0" id = "cardName"/>
    <input type = "hidden" name="cash" value = "0" id = "cash"/>


    <div class="div_745 relative">
        <div class="block_border mb_10">
            <div class="top_left"><div class="top_right"></div></div>
            <div class="body_left">
                <div class="body_right">
                    <div class="div_border_d9 ">
                        <div class="pd_10">
                            <div class="gradient">
                                <form >
                                    <div class="mb_10 listbox">
                                        <span class="label" >充值号码：</span>
                                        <input type="text" class="standard_input" name="gameCount" value = "${cellPhone}" id = "cellPhone" onblur="checkInput(this);"/>
                                        <span style="margin-left:5px; line-height: 22px; color: #999999"><span id="phoneinfo"></span></span>
                                    </div>
                                    <span id="mob_info" class="span_line">&nbsp;&nbsp;</span>
                                    <div class="mb_10 listbox">
                                        <span class="label">可选面额：</span>
                                        <div style="padding-left: 120px;" id="facevalue">
                                            <a id="10" class="tag" href="javascript:;">10元</a>
                                            <a id="20" class="tag" href="javascript:;">20元</a>
                                            <a id="30" class="tag" href="javascript:;">30元</a>
                                            <a id="50" class="tag" href="javascript:;">50元</a>
                                            <a id="100" class="tag" href="javascript:;">100元</a>
                                            <a id="200" class="tag" href="javascript:;">200元</a>
                                            <a id="300" class="tag" href="javascript:;">300元</a>
                                            <a id="500" class="tag" href="javascript:;">500元</a>
                                        </div>

                                    </div>
                                    <div class="mb_10 listbox">
                                        <span class="label" style="line-height: 34px;">支付金额：</span>
                                        <span class="red" style="line-height: 34px;font-size:16px;" id="amount"><font color="#df2729" style="font-size: 24px; padding: 0 5px;"><b id="b1"></b></font>元</span>
                                    </div>
                                    <span id="line4" class="span_line">&nbsp;&nbsp;</span>

                                    <div class="bline"></div>
                                    <div  class="mb_10 listbox" style="padding-bottom: 20px;">
                                        <span class="label">&nbsp;</span>
                                        <input class="button_86_29" id="submit" type="submit" value="立即充值"/>
                                        <span class="fail" id="failtip"></span>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom_left"><div class="bottom_right"></div></div>
        </div>
    </div>

</form>

<!-- footer -->

<div class="div_745 relative">
    <div class="block_border mb_10">
        <div class="top_left">
            <div class="top_right">
            </div>
        </div>
        <div class="body_left">
            <div class="body_right">
                <div class="div_border_d9 step">
                    <div>
                        <div class="div_border_d9  step" style="">
                            <div class="pd_10">
                                <div style=" line-height:20px; font-size:12px; font-family:宋体; text-align: left">
                                    <span class="red" style="font-size: 14px;">温馨提示</span><br />
                                    1.月初和月末运营商系统繁忙，话费到账时间可能会出现延迟。<br/>
                                    2.部分状态特殊的手机号(空号、停机等)造成无法充值，将会进行退款。<br/>
                                    3.30元以上面值的部分订单会出现分批到账情况,无法参加运营商的活动。<br/>
                                    4.如有任何疑问请致电咨询，服务电话：400-111-7666<br/>
                                    <span class="red">◆在线客服</span>
                                    <a target="_blank" href="http://chat.ofcard.com/live800/chatClient/chatbox.jsp?companyID=253&configID=25&enterurl=http%3A%2F%2Fshop%2Eofpay%2Ecom%2F&timestamp=1378879280389" >
                                        <img style="vertical-align:top; float:left; margin:0px; padding:0;" border="0" src="http://pic.ofcard.com/cards/jianhang/img/btn-service.png" alt="点击这里给我发消息" title="点击这里给我发消息" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom_left">
            <div class="bottom_right">
            </div>
        </div>
    </div>
</div>

<input type = "hidden" value = "${menu}" id = "menu"/>
<input type = "hidden" value = "${price}" id = "price"/>
<input type = "hidden" value = "${encString}" id = "encString"/>
<input type = "hidden" value = "${sid}" id = "sid"/>

</body>
<script type="text/javascript" src="http://pic.ofcard.com/jslib/jquery/jquery-1.10.2.min.js" >
</script>
<script>

    var phoneInfo = new Object();
    var userId = $.trim($("#userId").val());
    var faceValueList = new Object();
    var orderForm;
    var cellPhone = $.trim($("#cellPhone").val());

    // 订单信息
    var billOrderForm;
    $(function(){

        // 加载页面时，cellPhone不为空，获取号码归属信息
        if (cellPhone !=null && cellPhone != ''){
            getPhoneInfo(cellPhone);
        }

        var price = $.trim($("#price").val());
        if(price != null && price != ''){
            var a = document.getElementById(price);
            $("#"+price).addClass("tagChecked");
        }
        var currentFacevalue=$("#facevalue  .tagChecked");
        $("#facevalue a").click(function(){
            currentFacevalue.removeClass("tagChecked");
            $(this).addClass("tagChecked");
            currentFacevalue = $(this);
            $("#price").val(currentFacevalue.attr("id"));
            checkCanOrder($.trim($("#price").val()));
        });

        $("#submit").click(function(){
            if(!validPhoneNo($.trim($("#cellPhone").val()))){
                alert("请输入正确的手机号码");
                return;
            }
            createOrder();
        });

    });

    function getPhoneInfo(cellPhone){
        $.ajax({
            url:"${base}/phonerecharge/getPhoneInfo",
            data:'phoneNo='+cellPhone,
            type:'post',
            dataType:'json',
            async:true,
            success:function(ajaxData){

                if (ajaxData.data.length == 0){
                    alert("获取归属地失败");
                    return;
                }else{
                    phoneInfo.prvcin = ajaxData.data[0].prvcin;
                    phoneInfo.cityin = ajaxData.data[0].cityin;
                    phoneInfo.mobileType = ajaxData.data[0].mobileType;
                    getPhoneFaceValue(cellPhone);
                   $("#phoneinfo").html(ajaxData.data[0].prvcin+ajaxData.data[0].cityin + "&nbsp;&nbsp;" +ajaxData.data[0].mobileType);
                }
            },
            error:function(){
                alert("获取归属地失败");
                return;
            }
        });
    }

    function getPhoneFaceValue(cellPhone){
        $.ajax({
            url:"${base}/phonerecharge/faceValue",
            data:[{name:'prvcin',value:phoneInfo.prvcin}, {name:'mobileType',value:phoneInfo.mobileType},{name:'cityin',value:phoneInfo.cityin}],
            type:'post',
            dataType:'json',
            async:true,
            success:function(ajaxData){

                if (ajaxData.data.length == 0){
                    alert("获取充值面值失败");
                    return;
                }else{
                    faceValueList = ajaxData.data;
                    // 选择面值不为空时，检查是否能下单，并获取优惠价
                    var price = $.trim($("#price").val());
                    if(price != null && price != ''){

                        checkCanOrder(parseInt(price));
                    }
                }
            },
            error:function(){
                alert("获取充值面值失败");
                return;
            }
        });
    }


    function checkCanOrder(facevalue){
        // 根据选择面值获取商品信息
        if (faceValueList.length == 0){
            alert("该商品库存不足");
            setStock(facevalue);
            return;
        }
        for(var i=0; i < faceValueList.length;i++){
            if(faceValueList[i].parValue == facevalue){
                orderForm = faceValueList[i];
            }
        }
        if(orderForm == null){
            alert("该商品库存不足");
            setStock(facevalue);
            return;
        }
        $.ajax({
            url:"${base}/common/canOrder",
            data:{cardId:orderForm.id, userId:userId},
            type:'post',
            dataType:'json',
            async:false,
            success:function(ajaxData){

                if (ajaxData.data.length == 0){
                    alert("该商品库存不足");
                    setStock(facevalue);
                    return;
                }else{
                    // 获取优惠价
                    orderForm.userId = userId;
                    orderForm.boardId = ajaxData.data[0].boardId;

                    $("#boardId").val(ajaxData.data[0].boardId);
                    $("#cardId").val(orderForm.id);
                    $("#amount").html(ajaxData.data[0].inPrice);
                }
            },
            error:function(){
                alert("该商品库存不足");
                setStock(facevalue);
                return;
            }
        });
    }

    // 下单请求
    function createOrder(){
        $.ajax({
            url:"${base}/phonerecharge/takeSaleOrder",
            data:[{name:'userCode',value:userId}, {name:'cardId',value:orderForm.id},{name:'gameCount',value:$.trim($("#cellPhone").val())},{name:'boardId',value:orderForm.boardId}],
            type:'post',
            dataType:'json',
            async:false,
            success:function(ajaxData){

                if (ajaxData.data.length == 0){
                    alert("下单失败");
                    return;
                }else{
                    billOrderForm = ajaxData.data[0];
                    $("#billId").val(billOrderForm.billId);
                    $("#cardName").val(billOrderForm.cardName);
                    $("#cardNum").val(billOrderForm.cardNum);
                    $("#cash").val(billOrderForm.cash);
                    $("#billOrderForm").submit;
                }
            },
            error:function(){
                alert("下单失败");
                return;
            }
        });
    }

    // 库存不足时，设置面值为不可选
    function setStock(facevalue){
        var a = $("#"+facevalue);
        if(a){
            a.addClass('tagDisabled');
        }
    }

    function checkInput(obj){
       // if(e.keyCode == 37 || e.keyCode ==39){
       //     return;
       // }
       // obj.value = obj.value.replace(/\D/g,'');
        //$("#cellPhone").val(value);

       // if (obj.value == ""){
       //     return;
       // }
       // if (obj.value && obj.value.length != 11){
       //     alert("请输入正确的手机号码");
       //     return;
      //  }
      //  if(obj.value && obj.value.length > 11){
       //     obj.value = obj.value.substr(0,11);
            //$("#cellPhone").val(value);
       // }
        //if (obj.value.length == 11 && !(/^1[3|4|5|8|7][0-9]\d{8}$/.test(obj.value))){
       //     alert("请输入正确的手机号码");
       //     return;
       // }
        if (!validPhoneNo(obj.value)){
            alert("请输入正确的手机号码");
            return;
        }
        $("#cellPhone").val(obj.value);
        getPhoneInfo(obj.value);
    }

    function validPhoneNo(phoneNo){
        if (!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(phoneNo))){
            return false;
        }
        return true;
    }
</script>
</html>