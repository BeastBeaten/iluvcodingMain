<%@ page language="java" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>加油卡充值历史记录</title>
    <link href="http://pic.ofcard.com/cards/standard/css/xy-style.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="http://pic.ofcard.com/cards/js/angular/jquery.js"></script>
    <script type="text/javascript">

        var pageCount = '${total}';

        $(function(){

            //生成分页按钮
            if(pageCount>5){
                $("#error").hide();
                page_icon(1,5,0);
            }else{
                if(pageCount!=0){
                    page_icon(1,pageCount,0);
                    $("#error").hide();
                }else {
                    $("#error").show();
                    $("#pageGro").hide();
                }
            }

            //点击上一页触发
            $("#pageGro .pageUp").click(function(){
                if(pageCount > 5){
                    var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
                    if(!pageNum){
                        $("#page1").addClass("on");
                        return;
                    }
                    $("#pageGro li").removeClass("on");
                    $("#page"+(pageNum-1)).addClass("on");
                    pageUp(pageNum,pageCount);
                }else{
                    var index = $("#pageGro ul li.on").index();//获取当前页
                    if(index > 0){
                        $("#pageGro li").removeClass("on");//清除所有选中
                        $("#pageGro ul li").eq(index-1).addClass("on");//选中上一页
                        findHistoryList(index-1);
                    }
                }
            });

            //点击下一页触发
            $("#pageGro .pageDown").click(function(){
                if(pageCount > 5){
                    var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
                    if(!pageNum){
                        return;
                    }
                    $("#pageGro li").removeClass("on");
                    var s = parseInt(pageNum) + 1;
                    $("#page"+s).addClass("on");
                    pageDown(pageNum,pageCount);
                }else{
                    var index = $("#pageGro ul li.on").index();//获取当前页
                    if(index+1 < pageCount){
                        $("#pageGro li").removeClass("on");//清除所有选中
                        $("#pageGro ul li").eq(index+1).addClass("on");//选中上一页
                        findHistoryList(index+1);
                    }
                }
            });
        });

        function isOneDayOrder(orderTime){
            var now_time = new Date().getTime();
            var order_time = new Date(orderTime).getTime();
            if(now_time-order_time>24 * 60 * 60 * 1000){
                return false;
            }
            return true;
        }

        function findHistoryList(eq){
            $("#lists").empty();
            $.ajax({
                type:'post',
                url:'/xingye/findHistorys',
                data:{'start':eq},
                async:false,
                dataType:'json',
                success:function(json){
                    if(json.message == "success"){
                        $.each(json.data,function(i,obj){
                            var status = getStatus(obj['already'],obj['billStat']);
                            var s;
                            if(status==1){
                                s = '支付成功';
                            }else if(status==0){
                                s= '待充值';
                            }else if(status==9){
                                s = '交易关闭'
                            }else{
                                s= '等待支付';
                            }

                            $("#lists").append("<li><div class='history_title'><span>订单号 : <em>"+obj['billId']+"</em>" +
                                    "</span><span class='recharge_time'>"+obj['orderTime']+"</span><div class='history_detail clearfix'>" +
                                    "<div class='recharge_type fl'>"+obj['cardName']+"</div>" +
                                    "<div class='recharge_no fl'>加油卡号 ： <span>"+obj['gameCount']+"</span></div><div class='recharge_price fl'>" +
                                    "<div class='single blue_01'><span>"+obj['facePric']+"</span>元</div>" +
                                    "<span class='single'>(单价)</span></div><div class='recharge_sum fl'>" +
                                    "<div class='single'>¥"+obj['cash']+"</div></div>" +
                                    "<div class='recharge_operation fl'><a id='"+i+"' href='#' class='blue_01'>"+s+"</a></div></div></li>");


                            $("#"+i).removeAttr('href');
                            $("#"+i).css('color','grey');

                            if(s=='等待支付' && isOneDayOrder(obj['orderTime'])){
                                $("#"+i).attr('href','/xingye/skipToPay?orderNo='+obj['billId']+'&bankCode=ZDY_CIB_PC');
                                $("#"+i).css('color','#3c76d9');
                            }
                        });
                    }
                }
            });
        }

        //点击跳转页面
        function pageGroup(pageNum,pageCount){
            switch(pageNum){
                case 1:
                    page_icon(1,5,0);
                    break;
                case 2:
                    page_icon(1,5,1);
                    break;
                case pageCount-1:
                    page_icon(pageCount-4,pageCount,3);
                    break;
                case pageCount:
                    page_icon(pageCount-4,pageCount,4);
                    break;
                default:
                    page_icon(pageNum-2,pageNum+2,2);
                    break;
            }
        }

        //根据当前选中页生成页面点击按钮
        function page_icon(page,count,eq){
            var ul_html = "";
            for(var i=page; i<=count; i++){
                ul_html += '<li id="page'+i+'" onclick="search('+i+')">'+i+'</li>';
            }
            $("#pageGro ul").html(ul_html);

            //实现分页查询
            if(eq==0){
                $("#page1").addClass("on");
            }
            findHistoryList(eq);
            $("#page"+(eq+1)).addClass("on");

        }

        //上一页
        function pageUp(pageNum,pageCount){
            switch(pageNum){
                case 1:
                    break;
                case 2:
                    page_icon(1,5,0);
                    break;
                case pageCount-1:
                    page_icon(pageCount-4,pageCount,pageNum-1);
                    break;
                case pageCount:
                    page_icon(pageCount-4,pageCount,pageNum-1);
                    break;
                default:
                    page_icon(pageNum-2,pageNum+2,pageNum-1);
                    break;
            }
        }

        //下一页
        function pageDown(pageNum,pageCount){
            switch(pageNum){
                case 1:
                    page_icon(1,5,pageNum);
                    break;
                case 2:
                    page_icon(1,5,pageNum);
                    break;
                case pageCount-1:
                    page_icon(pageCount-4,pageCount,pageNum);
                    break;
                case pageCount:
                    break;
                default:
                    page_icon(pageNum-2,pageNum+2,pageNum);
                    break;
            }
        }

        //获取订单状态
        function getStatus(already,billstate){
            var result;
            if(1==billstate && 1==already){
                result = 1;
            }else if(0==already && 1==billstate){
                result = 0;
            }else if(9==already){
                result = 9;
            }else if(0==already && 0==billstate){
                result = -1;
            }
            return result;
        }

        function search(page){
            findHistoryList(page-1);
            $("#pageGro ul li").removeClass("on");
            $("#page"+page).addClass("on");
        }

    </script>
</head>
<body>
<p id="error" style="display: none;color: #797979;margin: 90px 100px 200px 400px;font-size: 18px;">抱歉，暂未查到相关订单</p>
<ul class="history_con" id="lists"></ul>
<div id="pageGro" class="cb">
    <div class="pageUp"></div>
    <div class="pageList">
        <ul></ul>
    </div>
    <div class="pageDown"></div>
</div>
</div>
</body>
</html>
