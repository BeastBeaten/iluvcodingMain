<%--
  搜狗话费首页
  @author of938
--%>

<%@ page  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html5 PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>手机充值</title>
    <link type="text/css" rel="stylesheet" href="http://pic.ofcard.com/cards/css/style.css" />
    <script type="text/javascript" src="http://pic.ofcard.com/themes/common/jquery-1.8.2.min.js"></script>
    <script src="http://pic.ofcard.com/cards/js/angular/jquery.js"></script>
    <script src="http://pic.ofcard.com/cards/js/lib/tools.js"></script>
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
        var perValue = '${pervalue}';
        var phoneno = '${phoneno}';
        var tab = '${tab}';
        var rePhoneNo = '';
        var mobileType = '';
        var provinceName = '';
        //流量面值
        var flowValue = '';
        var orderForm = {
            cardId:'',
            cardName:'',
            salePrice:'',
            perValue:'',
            flowValue:''
        }

        var getPhoneInfo = function(phoneNo,type){
            phoneno = phoneNo;
            $.get('/product/getPhoneInfo', {phoneNo:phoneNo},function(data){
                if("success" == data.message){
                    $('#phoneNoError').html('');
                    $('#phoneNoError').hide();
                    $("#errorMsg").html('');
                    if(data.data[0].prvcin == data.data[0].cityin){
                        $("#gameArea").html(data.data[0].prvcin+'&nbsp;&nbsp;'+data.data[0].mobileType);
                    }else{
                        $("#gameArea").html(data.data[0].prvcin+''+data.data[0].cityin+'&nbsp;&nbsp;'+data.data[0].mobileType);
                    }
                    mobileType = data.data[0].mobileType;
                    $("#mobileType").val(data.data[0].mobileType);
                    provinceName = data.data[0].prvcin;
                    if('1' == type){
                        if(!Tools.prototype.isEmpty(perValue)){
                            checkPerValue(perValue);
                        }else{
                            if(tab == 'flow'){
                                checkPerValuell('30','500M');
                            }else{
                                checkPerValue('100');
                            }
                        }
                    }else{
                        checkPerValue('1');
                        checkPerValuell('1');
                    }

                    var tagText = $(".tagChecked_01").text();
                    if(tagText == "流量充值"){
                        if(mobileType.indexOf("移动") != -1){
                            $("#teldiv").hide();
                            $("#lldiv_yd").show();
                            $("#lldiv_lt").hide();
                            $("#lldiv_dx").hide();
                        }else if(mobileType.indexOf("联通") != -1){
                            $("#teldiv").hide();
                            $("#lldiv_yd").hide();
                            $("#lldiv_lt").show();
                            $("#lldiv_dx").hide();
                        }else if(mobileType.indexOf("电信") != -1){
                            $("#teldiv").hide();
                            $("#lldiv_yd").hide();
                            $("#lldiv_lt").hide();
                            $("#lldiv_dx").show();
                        }
                    }else{
                        $("#teldiv").show();
                        $("#lldiv_yd").hide();
                        $("#lldiv_lt").hide();
                        $("#lldiv_dx").hide();
                    }
                }else{
                    mobileType = '';
                    provinceName = '';
                    checkPerValue('1');
                    checkPerValuell('1');
                    $("#mobileType").val('');
                }
            });
        }

        var checkPerValue = function(pervalue){
            if(phoneno == ""){
                $('#phoneNoError').html('请输入手机号');
                $('#phoneNoError').show();
                return false;
            }
            var perValueList = $("a[name='perValue']");
            var flag = false;
            var curPerValue = pervalue+'元';
            for(var i = 0; i < perValueList.length; i++){
                if(curPerValue == $(perValueList[i]).html()){
                    $(perValueList[i]).addClass('tagChecked');
                    flag = true;
                }else{
                    $(perValueList[i]).removeClass('tagChecked');
                }
            }
            if(flag){
                perValue = pervalue;
                $.get('/product/getPhoneProduct',{code:'sogou',mobileType:mobileType,provinceName:provinceName,faceValue:pervalue,phoneNo:phoneno},function(data){
                    if('success' == data.message){
                        $("#errorMsg").html('');
                        orderForm.cardId = data.data[0].id;
                        orderForm.salePrice = data.data[0].salePrice;
                        orderForm.perValue = pervalue;
                        orderForm.cardName = data.data[0].productName;
                        $("#salePrice").html(data.data[0].salePrice);
                    }else{
                        orderForm.cardId = '';
                        orderForm.salePrice = '';
                        orderForm.cardName = '';
                        orderForm.perValue = '';
                        $("#salePrice").html('');
                        $("#errorMsg").html('抱歉，暂时缺货，请重新选择');
                    }
                });
            }else{
                perValue = '';
                orderForm.cardId = '';
                orderForm.salePrice = '';
                orderForm.cardName = '';
                $("#salePrice").html('');
            }
        }

        var checkPerValuell = function(pervalue,flowValue){
            if(phoneno == ""){
                $('#phoneNoError').html('请输入手机号');
                $('#phoneNoError').show();
                return false;
            }
            var perValueList = $("a[name='perValue_llyd']");
            var tagText = $(".tagChecked_01").text();
            if(tagText == "流量充值"){
                var mobileType = $("#mobileType").val();
                if(mobileType.indexOf("联通") != -1){
                    perValueList = $("a[name='perValue_lllt']");
                }else if(mobileType.indexOf("电信") != -1){
                    perValueList = $("a[name='perValue_lldx']");
                }
            }
            var flag = false;
            for(var i = 0; i < perValueList.length; i++){
                if(flowValue == $(perValueList[i]).html()){
                    $(perValueList[i]).addClass('tagChecked');
                    flag = true;
                }else{
                    $(perValueList[i]).removeClass('tagChecked');
                }
            }
            if(flag){
                perValue = pervalue;
                $.get('/product/getFlowSalePrice',{gameCount:phoneno,flowValue:flowValue,perValue:pervalue,code:'sogou'},function (data){
                    if ("success" == data.message && 0 < data.data.length) {
                        $("#errorMsg").html('');
                        orderForm.cardId = data.data[0].id;
                        orderForm.salePrice = data.data[0].salePrice;
                        orderForm.perValue = pervalue;
                        orderForm.flowValue = flowValue;
                        orderForm.cardName = data.data[0].productName;
                        $("#salePrice").html(data.data[0].salePrice);
                    }else{
                        orderForm.cardId = '';
                        orderForm.salePrice = '';
                        orderForm.cardName = '';
                        orderForm.perValue = '';
                        orderForm.flowValue = '';
                        $("#salePrice").html('');
                        $("#errorMsg").html('抱歉，暂时缺货，请重新选择');
                    }
                });
            }else{
                perValue = '';
                orderForm.cardId = '';
                orderForm.salePrice = '';
                orderForm.cardName = '';
                $("#salePrice").html('');
            }
        }

        var init = function(){
            if(!Tools.prototype.isEmpty(phoneno)){
                $("#phoneNo").val(phoneno);
                getPhoneInfo(phoneno,'1');
                var temp = phoneno.split('');
                for(var i = 0 ;i < temp.length;i++){
                    if(3 == i || 6 == i){
                        rePhoneNo += ' ';
                    }
                    rePhoneNo += temp[i];
                    $('#rePhoneNo').html('');
                    $('#rePhoneNo').html(rePhoneNo);
                }
            }else{
                $('#phoneNoError').html('');
                $('#phoneNoError').hide();
            }
        }

        var validateForm = function(){
            if(Tools.prototype.isEmpty(phoneno)){
                $('#phoneNoError').html('请输入手机号');
                $('#phoneNoError').show();
                return false;
            }

            if(!Tools.prototype.isMobileNo(phoneno) || Tools.prototype.is170MobileNo(phoneno)){
                $('#phoneNoError').html('暂不支持此号码充值');
                $('#phoneNoError').show();
                return false;
            }

            $('#phoneNoError').html('');

            if(Tools.prototype.isEmpty(perValue)){
                $("#errorMsg").html('请选择面值');
                return false;
            }

            if(Tools.prototype.isEmpty(orderForm.cardId)){
                $("#errorMsg").html('抱歉，暂时缺货，请重新选择');
                return false;
            }
            $("#errorMsg").html('');
            return true;

        }

        $(document).ready(function(){
            //sogou请求
            if(tab == 'flow'){
                $("#orderType").val('FLOWRECHARGE');
                $(".tag_01").removeClass("tagChecked_01");
                $("#flow").addClass("tagChecked_01");
                $("#teldiv").hide();
                $("#lldiv_yd").show();
                $("#lldiv_lt").hide();
                $("#lldiv_dx").hide();
            }

            $('#phoneNo').bind('input propertychange', function(even) {
                if(even.propertyName != 'value'){
                    var phoneNo = $('#phoneNo').val();
                    phoneno = $('#phoneNo').val();
                    if(phoneNo != '' && phoneNo != null){
                        if(!Tools.prototype.isMobileNo(phoneNo) || Tools.prototype.is170MobileNo(phoneNo)){
                            $('#phoneNoError').html('暂不支持此号码充值');
                            $('#phoneNoError').show();
                        }

                        var phone = phoneNo.replace(/\D/g,'');
                        $('#phoneNoError').html('');
                        $('#phoneNoError').hide();
                        if(!Tools.prototype.isEmpty(phone) && 11 < phone.length){
                            phone = phone.substr(0,11);
                        }
                        rePhoneNo = '';
                        mobileType = '';
                        provinceName = '';
                        orderForm.cardId = '';
                        $("#gameArea").html('');
                        $("#salePrice").html('');
                        if(!Tools.prototype.isEmpty(phone)){
                            var temp = phone.split('');
                            for(var i = 0 ;i < temp.length;i++){
                                if(3 == i || 6 == i){
                                    rePhoneNo += ' ';
                                }
                                rePhoneNo += temp[i];
                                $('#rePhoneNo').html('');
                                $('#rePhoneNo').html(rePhoneNo);
                            }
                        }else{
                            rePhoneNo = '';
                            $('#rePhoneNo').html('');
                        }

                        if(11 == phoneNo.length && Tools.prototype.isMobileNo(phoneNo) && !Tools.prototype.is170MobileNo(phoneNo)){
                            getPhoneInfo(phoneNo,'0');
                        }
                    }else{
                        //清空所有相关值
                        orderForm.cardId = '';
                        orderForm.salePrice = '';
                        orderForm.cardName = '';
                        orderForm.perValue = '';
                        orderForm.flowValue = '';
                        perValue = '';
                        phoneno = '';
                        $('#phoneNo').val('');
                        $("#gameArea").html('');
                        $("#salePrice").html('');
                        $('#rePhoneNo').html('');
                        $('#phoneNoError').html('');
                        $('#phoneNoError').hide();
                        $('#phoneNo')[0].placeholder="";
                        //清掉选中的面值
                        var perValueList = $("a[name='perValue']");
                        for(var i = 0; i < perValueList.length; i++){
                            $(perValueList[i]).removeClass('tagChecked');
                        }
                        var perValueListllyd = $("a[name='perValue_llyd']");
                        for(var i = 0; i < perValueListllyd.length; i++){
                            $(perValueListllyd[i]).removeClass('tagChecked');
                        }
                        var perValueListlldx = $("a[name='perValue_lldx']");
                        for(var i = 0; i < perValueListlldx.length; i++){
                            $(perValueListlldx[i]).removeClass('tagChecked');
                        }
                        var perValueListlllt = $("a[name='perValue_lllt']");
                        for(var i = 0; i < perValueListlllt.length; i++){
                            $(perValueListlllt[i]).removeClass('tagChecked');
                        }
                    }
                }
            });



            $(".tag_01").click(function(){

                $(".tag_01").removeClass("tagChecked_01");
                $(this).addClass("tagChecked_01");

                var tagText = $(".tagChecked_01").text();
                if(tagText == "流量充值"){
                    $("#salePrice").html('');
                    $("#lldetail").show();
                    $("#orderType").val('FLOWRECHARGE');
                    var greydark =$(".grey-dark").text();
                    if(greydark.indexOf("移动") != -1){
                        $("#teldiv").hide();
                        $("#lldiv_yd").show();
                        $("#lldiv_lt").hide();
                        $("#lldiv_dx").hide();
                    }else if(greydark.indexOf("联通") != -1){
                        $("#teldiv").hide();
                        $("#lldiv_yd").hide();
                        $("#lldiv_lt").show();
                        $("#lldiv_dx").hide();
                    }else if(greydark.indexOf("电信") != -1){
                        $("#teldiv").hide();
                        $("#lldiv_yd").hide();
                        $("#lldiv_lt").hide();
                        $("#lldiv_dx").show();
                    }else{
                        $("#teldiv").hide();
                        $("#lldiv_yd").show();
                        $("#lldiv_lt").hide();
                        $("#lldiv_dx").hide();
                    }
                    //清掉选中的面值
                    var perValueList = $("a[name='perValue']");
                    for(var i = 0; i < perValueList.length; i++){
                        $(perValueList[i]).removeClass('tagChecked');
                    }
                }else{
                    $("#salePrice").html('');
                    $("#lldetail").hide();
                    $("#orderType").val('PHONERECHARGE');
                    $("#teldiv").show();
                    $("#lldiv_yd").hide();
                    $("#lldiv_lt").hide();
                    $("#lldiv_dx").hide();
                    //清掉选中的面值
                    var perValueListllyd = $("a[name='perValue_llyd']");
                    for(var i = 0; i < perValueListllyd.length; i++){
                        $(perValueListllyd[i]).removeClass('tagChecked');
                    }
                    var perValueListlldx = $("a[name='perValue_lldx']");
                    for(var i = 0; i < perValueListlldx.length; i++){
                        $(perValueListlldx[i]).removeClass('tagChecked');
                    }
                    var perValueListlllt = $("a[name='perValue_lllt']");
                    for(var i = 0; i < perValueListlllt.length; i++){
                        $(perValueListlllt[i]).removeClass('tagChecked');
                    }
                }

                //清空相关值
                $("#errorMsg").html('');
                $('#phoneNoError').html('');
                $('#phoneNoError').hide();
                perValue = '';
                orderForm.cardId = '';
                orderForm.salePrice = '';
                orderForm.cardName = '';
                orderForm.perValue = '';
                orderForm.flowValue = '';

            });

            init();

            $("#takeOrder").click(function(){
                $("#takeOrder").attr("disabled","disabled");
                if(validateForm()){
                    $("#cardId").val(orderForm.cardId);
                    $("#cardName").val(orderForm.cardName);
                    $("#cash").val(orderForm.salePrice);
                    $("#perValue").val(orderForm.perValue);
                    $("#flowValue").val(orderForm.flowValue);
                    $("#orderForm")[0].action = "/sogou/confirm";
                    $("#orderForm").submit();
                }else{
                    $("#takeOrder").removeAttr("disabled");
                }
            });
        });

    </script>

</head>


<body class="body-sogo">

<div class="cont bl0 cont-sogo">
    <div class="title clearfix">
        <a class="fr" href="/sogou/order">订单中心</a>
        <h2>快速、安全、自动充值、闪电到帐</h2>
    </div>
    <div class="content">
        <form class="orderForm orderDetail" name = "orderForm" id = "orderForm" method="post">
            <input type="hidden" id = "cardId" name="cardId"/>
            <input type="hidden" id = "cardName" name="cardName"/>
            <input type="hidden" id = "cash" name="cash"/>
            <input type="hidden" id = "perValue" name="perValue"/>
            <input type="hidden" id = "flowValue" name="flowValue"/>
            <input type="hidden" id = "orderType" name="orderType" value="PHONERECHARGE"/>
            <input type="hidden" id = "cardNum" name="cardNum" value="1"/>
            <input type="hidden" id = "cardType" name="cardType" value="0"/>
            <input type="hidden" id = "mobileType" name="mobileType" value=""/>
            <ul class="formList">
                <!-- 输入内容报错样式如下,li上增加tip样式名，同时增加样式为error的div块级元素 -->
                <li class="tip clearfix">
                    <span class="label">手机号码：</span>
                    <input class="inputTxt num placeholder" name="gameCount" id="phoneNo" placeholder="请输入手机号码" type="text" style="width:344px;padding-right:0px;">
                    <div class="error" id="phoneNoError"></div>
                </li>
                <li class="phoneInfo">
                    <span class="label">&nbsp;</span>
                    <span class="grey-dark">
                        <em class="orange" id="rePhoneNo"></em>
                    </span>
                    <span class="grey-dark" id = "gameArea">

                    </span>
                </li>
                <li class="pb1">
                    <span class="label">充值类型：</span><a class="tag_01 tagChecked_01" href="javascript:void(0)">话费充值</a><a class="tag_01" id="flow" href="javascript:void(0)">流量充值</a>
                </li>

                <li class="pb0">
                    <span class="label">可选面额：</span>
                    <div id="teldiv">
                        <p>
                            <a name="perValue" class="tag" href="javascript:void(0)" onclick = "checkPerValue('10')">10元</a>
                            <a name="perValue" class="tag" href="javascript:void(0)" onclick = "checkPerValue('20')">20元</a>
                            <a name="perValue" class="tag" href="javascript:void(0)" onclick = "checkPerValue('30')">30元</a>
                            <a name="perValue" class="tag" href="javascript:void(0)" onclick = "checkPerValue('50')">50元</a>
                            <a name="perValue" class="tag mt10 ml95" href="javascript:void(0)" class = "" onclick = "checkPerValue('100')">100元</a>
                            <a name="perValue" class="tag mt10" href="javascript:void(0)" onclick = "checkPerValue('200')">200元</a>
                            <a name="perValue" class="tag mt10" href="javascript:void(0)" onclick = "checkPerValue('300')">300元</a>
                            <a name="perValue" class="tag mt10" href="javascript:void(0)" onclick = "checkPerValue('500')">500元</a>
                        </p>
                    </div>
                    <div id="lldiv_yd" style="display: none">
                        <p>
                            <a name="perValue_llyd" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('3','10M')">10M</a>
                            <a name="perValue_llyd" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('5','30M')">30M</a>
                            <a name="perValue_llyd" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('10','70M')">70M</a>
                            <a name="perValue_llyd" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('20','150M')">150M</a>
                            <a name="perValue_llyd" class="tag mt10 ml95" href="javascript:void(0)" class = "" onclick = "checkPerValuell('30','500M')">500M</a>
                            <a name="perValue_llyd" class="tag mt10" href="javascript:void(0)" onclick = "checkPerValuell('50','1G')">1G</a>
                            <a name="perValue_llyd" class="tag mt10" href="javascript:void(0)" onclick = "checkPerValuell('70','2G')">2G</a>
                            <a name="perValue_llyd" class="tag mt10" href="javascript:void(0)" onclick = "checkPerValuell('100','3G')">3G</a>
                        </p>
                    </div>
                    <div id="lldiv_lt" style="display: none">
                        <p>
                            <a name="perValue_lllt" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('3','20M')">20M</a>
                            <a name="perValue_lllt" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('6','50M')">50M</a>
                            <a name="perValue_lllt" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('10','100M')">100M</a>
                            <a name="perValue_lllt" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('15','200M')">200M</a>
                            <a name="perValue_lllt" class="tag mt10 ml95" href="javascript:void(0)"  onclick = "checkPerValuell('30','500M')">500M</a>
                            <a name="perValue_lllt" class="tag mt10" href="javascript:void(0)" onclick = "checkPerValuell('100','1G')">1G</a>
                        </p>
                    </div>
                    <div id="lldiv_dx" style="display: none">
                        <p>
                            <a name="perValue_lldx" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('1','5M')">5M</a>
                            <a name="perValue_lldx" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('2','10M')">10M</a>
                            <a name="perValue_lldx" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('5','30M')">30M</a>
                            <a name="perValue_lldx" class="tag" href="javascript:void(0)" onclick = "checkPerValuell('7','50M')">50M</a>
                            <a name="perValue_lldx" class="tag mt10 ml95" href="javascript:void(0)" onclick = "checkPerValuell('10','100M')">100M</a>
                            <a name="perValue_lldx" class="tag mt10" href="javascript:void(0)" onclick = "checkPerValuell('15','200M')">200M</a>
                            <a name="perValue_lldx" class="tag mt10" href="javascript:void(0)" onclick = "checkPerValuell('30','500M')">500M</a>
                            <a name="perValue_lldx" class="tag mt10" href="javascript:void(0)" onclick = "checkPerValuell('50','1G')">1G</a>
                        </p>
                    </div>
                </li>
                <li class="pb2" id="lldetail" style="display: none">
                    <p>*全国流量 当日生效 当月有效</p>
                </li>

                <li class="clearfix">
                    <span class="label">售价：</span><em class="orange" style="font-size: 24px;" id = "salePrice"></em> 元
                </li>
                <!--li style="display: none;"><span class="label">&nbsp;</span><input class="btn" value="立即充值" type="submit"></li-->
                <!-- 提交表单报错，按钮置灰调用btnDisabled,报错信息><span class="fail">库存不足，兑换失败！</span> -->
                <li><span class="label">&nbsp;</span>
                    <input class="btn btn-sogo" value="立即充值" type="button" id = "takeOrder">
                    <span class="fail" id = "errorMsg"></span>
                </li>
            </ul>
        </form>
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