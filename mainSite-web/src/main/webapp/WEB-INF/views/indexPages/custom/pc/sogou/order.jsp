<%--
  订单查询页
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
    <script src="http://pic.ofcard.com/cards/js/angular/jquery-dataTables-init.js"></script>
    <script src="http://pic.ofcard.com/cards/js/angular/jquery-dataTables-min.js"></script>
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

        var tid = '${tid}';
        var rechargeAccount = '';

        var checkAccount = function(obj){
            obj.value = obj.value.replace(/\D/g,'');
            $("#errorMsg").html('');
            $("#errorMsg").hide();
            rechargeAccount = '';
            if(!Tools.prototype.isEmpty(obj.value) && 11 < obj.value.length){
                obj.value = obj.value.substr(0,11);
            }
            if(11 == obj.value.length && !Tools.prototype.isMobileNo(obj.value)){
                $("#errorMsg").html('号码格式错误');
                $("#errorMsg").show();
            }else{
                rechargeAccount = obj.value;
            }
        }

        var search = function(){
            var account = $("#account").val();
            $("#errorMsg").html('');
            if(Tools.prototype.isEmpty(account)){
                $("#errorMsg").html('请输入充值账号');
                $("#errorMsg").show();
                return false;
            }
            if(!Tools.prototype.isMobileNo(account)){
                $("#errorMsg").html('号码格式错误');
                $("#errorMsg").show();
                return false;
            }
            $("#errorMsg").hide();
            rechargeAccount = account;
            $("#dataTable").refreshData();
            return true;
        }

        var reset = function(){
            $("#account").val('');
            $("#errorMsg").html('');
            $("#errorMsg").hide();
            $("#dataTable").refreshData();
        }

        var rePay = function(billId){
//            window.location.href="/sogou/pay?tid="+billId;
            var url = 'http://web.yiqianlian.com/pay/getPayUrl?orderNo='+billId+'&code=sogou&bankCode=0406&returnUrl=http://web.yiqianlian.com/sogou/order?tid='+billId;
//            window.location.href=url;
        }

        $(document).ready(function(){
            $("#errorMsg").hide();
            $("#dataTable").dataTables({
                "sDom":'<"top"i>rt<"bottom"lp>',
                "bSort":false,
                "bLengthChange":false,
                "iDisplayLength":5,
                "bProcessing":false,
                "sAjaxSource":"/sogou/orderList",
                "fnServerData":function(sSource,aoData,fnCallback){
                    if(!Tools.prototype.isEmpty(tid) || !Tools.prototype.isEmpty(rechargeAccount)){
                        var temp = null;
                        if(!Tools.prototype.isEmpty(rechargeAccount)){
                            temp = [{name:'code',value:'sogou'},{name:"rechargeAccount",value:rechargeAccount}];
                        }else if(!Tools.prototype.isEmpty(tid)){
                            temp = [{name:'code',value:'sogou'},{name:"tid",value:tid}];
                        }
                        var postData = aoData.concat(temp);
                        $.post(sSource,postData,function(json){
                            fnCallback(json.data);
                        },"json");
                    }else{
                        var returnData = eval('({"iTotalDisplayRecords":0,"iTotalRecords":0,"aaData":[]})');
                        fnCallback(returnData);
                    }
                },
                "aoColumns":[{
                    "mDataProp":"billId"
                },{
                    "mDataProp":"orderTime"
                },{
                    "mDataProp":"cardName"
                },{
                    "mDataProp":"cardNum"
                },{
                    "mDataProp":"gameCount"
                },{
                    "mDataProp":"cash"
                },{
                    "mDataProp":function(aData,type,val){
                        val = '';
                        if(null != aData.billStat){
                            switch(aData.billStat){
                                case 1:if(1 == aData.already){
                                    val +="成功";
                                }else if(0 == aData.already){
                                    val +="充值中";
                                }else{
                                    val +="失败";
                                };break;
                                case 0:if(0 == aData.already){
                                    val+='<a target="_blank" href="'+'/sogou/getKernelPayUrl?orderNo='+aData.billId+'">待付款</a>';
                                }else{
                                    val +='';
                                };break;
                                default :val +="失败";break;
                            }
                        }
                        return val;
                    }
                }],
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 笔",
                    "sInfo": "当前第 _START_ - _END_ 笔　共计 _TOTAL_ 笔"
                }
            });
        });
    </script>

</head>


<body class="body-sogo">
    <div class="cont bl0 cont-sogo">
        <div class="title clearfix">
            <a class="fr" href="/sogou/phone?menu=phonerecharge">充值中心</a>
            <h2>充值记录查询</h2>
        </div>
        <div class="content">
            <!--<br/><span style="color:red;">*银联支付网关暂时出现故障，支付状态更新延时，所有支付成功订单将于10号到账</span>-->
            <!--div class="subTitle">唯品会卡</div-->
            <form class="orderForm">
                <ul>
                    <li><span class="label">查询方式：</span>
                        <a class="tag tagChecked" href="javascript:void(0)">充值账号查询</a>
                    </li>
                    <li class="tip clearfix">
                        <span class="label">手机号：</span>
                        <input class="inputTxt placeholder" name = "account" id = "account" placeholder="充值账号" type="text" onkeyup="checkAccount(this)" style="width:284px;">
                        <div class="error" id="errorMsg" style="right:230px;"></div>
                    </li>
                    <li>
                        <span class="label">&nbsp;</span>
                        <input class="btn btn-sogo" value="查询" type="button" onclick = "search()">
                        <input class="btn btn-sogo" value="重置" type="button" onclick = "reset()">
                    </li>
                </ul>
            </form>

            <div class="orderResults">
                <div class="subTitle">查询结果</div>
                <table id="dataTable">
                    <thead>
                    <tr>
                        <th>订单号</th>
                        <th width="68">订单时间</th>
                        <th>商品信息</th>
                        <th>购买数量</th>
                        <th>充值账号</th>
                        <th>订单金额*</th>
                        <th width="64">订单状态</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <div>*订单金额不包含手续费，具体金额以实际支付金额为准。</div>
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