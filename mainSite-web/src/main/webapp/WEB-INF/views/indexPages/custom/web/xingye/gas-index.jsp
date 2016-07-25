<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>加油卡充值</title>
    <link href="http://pic.ofcard.com/cards/standard/css/xy-style.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="http://pic.ofcard.com/cards/js/angular/jquery.js"></script>
    <script type="text/javascript">

        var code='${code}';

        $(function(){

            initProgramer();

            $("#card_no").bind({
                keyup : (function(){
                    $("#errorDiv").hide();
                    var card_no = $(this).val();
                    if(card_no!='' && card_no.length==16 && card_no.substr(0,1)==9){
                        if(!rightGasno(card_no,'2')){
                            errorMsg('加油卡号格式错误');
                            $("#1").val('任意充');
                        }else{
                            getGasUserInfo(card_no,'2');
                            bindCardid('2');
                        }
                    }else if(card_no!='' && card_no.length==19 && card_no.substr(0,6)==100011){
                        if(!rightGasno(card_no,'1')){
                            errorMsg('加油卡号格式错误');
                            $("#1").val('任意充');
                        }else{
                            getGasUserInfo(card_no,'1');
                            bindCardid('1');
                        }
                    }else{
                        styles();
                    }
                })
            });

            $("#1").bind({
                keyup : (function(){
                   var num = $(this).val();
                    if(num!='任意充' && num!=''){
                        $(this).addClass('tagChecked');
                    }else{
                        $(this).removeClass('tagChecked');
                    }
                })
            });

            $("#card_no").blur(function(){
                var card_no = $(this).val();
                if(card_no=='' || card_no==null){
                    $(".cards_name").text('');
                }else if(card_no.length!=16 && card_no.length!=19){
                    errorMsg('加油卡号格式错误');
                }
            })
        })

        function styles(){
            $(".cards_name").text('');
            $("#1").val('任意充');
            $(".tag").removeClass("tagChecked");
            $("#recharge_sum").text('00.00元');
        }

        function bindCardid(gasRechargeType){
            var array = [1,10,100,300,500,1000,5000];
            $.ajax({
                type:'post',
                url:'/product/getGasCardProductInfo',
                data:{'gasRechargeType':gasRechargeType},
                async:false,
                dataType:'json',
                success:function(json){
                    if(json.message == "success"){
                        for(var j=0;j<array.length;j++){
                            $.each(json.data,function(i,obj){
                                if(obj['faceValue']==array[j]){
                                    $("#"+array[j]).attr('title',obj['productCode']);
                                }
                            })
                        }
                    }
                }
            });
        }

        function getGasUserInfo(oilNO,cno){
            $.ajax({
                type:'post',
                url:'/product/getGasInfo',
                data:{'oilNO':oilNO,'cno':cno},
                dataType:'json',
                success:function(json){
                   if(json.message == "success"){
                       $(".cards_name").text(json.data[0].peUserName.split(";")[1]);
                   }
                }
            });
        }

        function getGasSalePrice(obj){

            $("#errorDiv").hide();
            $("#1").val('任意充');

            var card_no = $("#card_no").val();
            if(card_no=='' || card_no==null || !checkNo()){
                styles();
                return;
            }

            var id = $(obj).attr('id');
            var cardid = $(obj).attr('title');
            if(cardid!='' && cardid!=null){
                $(".tag").removeClass("tagChecked");
                $(".tag_input").removeClass("tagChecked");
                $(obj).addClass("tagChecked");
                $("#recharge_sum").css("color","#f34646");
                checkCanOrder(cardid,code,id);
            }else{
                $(".tag").removeClass("tagChecked");
                $("#recharge_sum").text('00.00元');
                errorMsg('该商品暂时缺货');
            }
        }

        function getSalePrice(cardId,code,id){
            $.ajax({
                type:'post',
                url:'/product/getSalePrice',
                data:{'cardId':cardId,'code':code},
                dataType:'json',
                success:function(json){
                    if(json.message == "success"){
                        $("input[name='cardId']").val(cardId);
                        $("input[name='perValue']").val(id);
                        if('1'==id){
                            var num = $("#1").val();
                            if('任意充'==num || num=='' || !isNum(num)){
                                $("#recharge_sum").text('00.00元');
                            }else{
                                $("#recharge_sum").text(json.data[0].salePrice * 1000 * parseInt(num) /1000 +"元");
                            }
                        }else{
                            $("#recharge_sum").text(json.data[0].salePrice+"元");
                        }
                    }
                }
            });
        }

        function checkCanOrder(cardId,code,id){
            $.ajax({
                type:'post',
                url:'/product/checkCanOrder',
                data:{'cardId':cardId,'code':code},
                dataType:'json',
                success:function(json){
                    if(json.message == "success"){
                        getSalePrice(cardId,code,id);
                    }else{
                        errorMsg('该商品暂时缺货');
                    }
                }
            });
        }

        function initProgramer(){

            $("#1").bind({
                keyup : (function(){
                    $("#errorDiv").hide();
                    var cardid = $("#1").attr('title');
                    checkCanOrder(cardid,code,'1');
                })
            });

            $("#qh_icon").click(function(){
                $(this).toggleClass("agree_icon1");
                if($("#qh_icon").hasClass('agree_icon1')){
                    $("span[class='ng-binding']").hide();
                }
            });

            //任意充输入框
            $(".tag_input").focus(function(){
                $(this).css("border-color","#9ebbed");
                $(".tag").removeClass("tagChecked");
                if($(this).val() == "任意充"){
                    $(this).val("");
                }
            })

            $(".tag_input").blur(function(){
                $(this).css("border-color","#f1f1f1");
                if($(".tag_input").val()=="")
                {
                    $(".tag_input").val("任意充");
                }
            })

            $(".tag_input").change(function(){
                $("#recharge_sum").css("color","#f34646");
            });
        }

        function checkNo(){
            var card_no = $("#card_no").val();
            if(card_no!='' && card_no.length==16 && card_no.substr(0,1)==9){
                if(!rightGasno(card_no,'2')){
                    errorMsg('加油卡号格式错误');
                    return false;
                }
            }else if(card_no!='' && card_no.length==19 && card_no.substr(0,6)==100011){
                if(!rightGasno(card_no,'1')){
                    errorMsg('加油卡号格式错误');
                    return false;
                }
            }else if(card_no!=''){
                errorMsg('加油卡号格式错误');
                return false;
            }else{
                errorMsg('请填写加油卡卡号');
                return false;
            }
            return true;
        }

        function errorMsg(msg) {
            $("#errorDiv").show();
            $("#error").text(msg);
        }

        function recharge(){

            if(!checkNo()){
                return;
            }

            var num = $("#1").val();
            if(!$(".tag").hasClass("tagChecked") && num=='任意充'){
                errorMsg('请选择加油卡面值');
                return;
            }

            if(num!='任意充'){
                if(!isNum(num)){
                    errorMsg('加油卡任意充只能填写为整数');
                    return;
                }else if(num>5000){
                    errorMsg('加油卡任意充上限为5000');
                    return;
                }
            }

            if(!$("#qh_icon").hasClass('agree_icon1')){
                $("span[class='ng-binding']").show();
                return;
            }
            send();
        }

        function send(){
            $.ajax({
                type:'post',
                url:'/xingye/recharge',
                data:$('form').serializeArray(),
                dataType:'json',
                success:function(json){
                    if(json.result == "success"){
                        location.href=json.data;
                    }else{
                        errorMsg(json.msg);
                    }
                }
            });
        }

        var isNum = function(num){
            var result = new RegExp("^[1-9]+[0-9]*$").test(num);
            if(result){
                return true;
            }else{
                return false;
            }
        }

        var rightGasno = function(gamecount,type){
            var reg;
            if('1'==type){
                reg = new RegExp("^(100011)\\d{13}$");//中石化
            }else {
                reg = new RegExp("^(9)\\d{15}$");//中石油
            }

            var result = reg.test(gamecount);
            if(result){
                return true;
            }else{
                return false;
            }
        }
    </script>
</head>
<body>
<div class="header clearfix">
    <div class="xy_logo fl"></div>
    <div class="xy_user fr">
        <%--<a class="user_icon" href="#"></a>--%>
        <%--<a class="user_id" href="#"></a>--%>
    </div>
</div>
<div class="div_745 relative">
    <div class="gradient">
        <form>
            <input type="hidden" name="cardId"/>
            <input type="hidden" name="perValue"/>
            <input type="hidden" name="bankCode" value="ZDY_CIB_PC"/>
            <div class="mb_01 listbox">
                <span class="label" >加油卡：</span>
                <input type="text" class="standard_input" autocomplete="off" maxlength="19" name="gameCount" id="card_no" placeholder="请输入加油卡" />
                <span class="cards_name"></span>
            </div>
            <div class="mb_02 listbox">
                <span class="label">充值面额：</span>
                <div class="recharge_de">
                    <a class="tag" href="#" id="10" onclick="getGasSalePrice(this)">10元</a>
                    <a class="tag" href="#" id="100" onclick="getGasSalePrice(this)">100元</a>
                    <a class="tag" href="#" id="300" onclick="getGasSalePrice(this)">300元</a>
                    <a class="tag" href="#" id="500" onclick="getGasSalePrice(this)">500元</a>
                    <a class="tag" href="#" id="1000" onclick="getGasSalePrice(this)">1000元</a>
                    <a class="tag tagDisabled" href="#" id="5000" onclick="getGasSalePrice(this)">5000元</a>
                    <input type="text" class="tag_input" id="1" name="cardNum" value="任意充"/>
                </div>
            </div>
            <div class="mb_01 listbox" style="display: none;margin-bottom: 10px" id="errorDiv">
                <span class="label" style="line-height: 34px;">提示：</span>
                <span style="color: #f34646;line-height: 2.5" id="error"></span>
            </div>
            <div class="mb_01 listbox">
                <span class="label" style="line-height: 34px;">售价：</span>
                <span id="recharge_sum">00.00元</span>
            </div>
            <div class="agree" style="margin-top: -20px;">
                <i class="agree_icon" id="qh_icon"></i>
                <span>同意<font><a href="/xingye/skipToProtocol">《加油卡充值协议》</a></font></span></br></br>
                <span class="ng-binding" style="display: none;color: #ff8700;margin-left: 25px;">请阅读并勾选同意加油卡充值协议</span>
            </div>

            <div class="mb_10 listbox">
                <span class="recharge_btn" onclick="recharge()">立即充值</span>
            </div>
            <a class="search_history" href="/xingye/findHistory">查看充值历史>></a>
        </form>
    </div>
</div>
<div class="bottom">
    <ul class="clearfix">
        <li><i class="dz_icon1"></i>闪电到帐</li>
        <li><i class="dz_icon2"></i>不到帐全额退款</li>
    </ul>
</div>
</body>
</html>
