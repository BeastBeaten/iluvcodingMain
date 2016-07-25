/**
 * Created by zhangjinlong on 14-11-11.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.web.directive.common.commonModule',[]);

    app.directive('footer',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div><p><span>友情链接：</span>' +
            '<a href="http://www.ofpay.com" target="_blank">欧飞网</a>' +
            '<a href="http://www.ofcard.com" target="_blank">欧飞数卡</a></p>' +
            '<p>Copyright 2005-2014 江苏欧飞电子商务有限公司 all rights reserved.</p>' +
            '<p>苏ICP备B1-20110001</p></div>',
            replace:true
        }
    }]);

    app.directive('qqserver',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div><div ng-class="{tel:true}" style="background: url("'+'");padding-left: 0px;padding-top: 15px;width:240px;">' +
            '<br/>客服QQ:<a class="service-icon" href="http://wpa.qq.com/msgrd?v=3&amp;uin=2355927717&amp;site=qq&amp;menu=yes" target="_blank">' +
            '<img border="0" src="http://wpa.qq.com/pa?p=2:2355927717:51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a><br/></div><br/>' +
            '<div style="margin-left: 5px;margin-top: -36px;"' +
            '本服务由江苏欧飞电子商务有限公司提供</div></div>',
            replace:true
        }
    }]);

    app.directive('phoneserver',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div"><div ng-class="{tel:true}"><p>客服电话</p><h1><span ng-bind="servicePhone"></span></h1><br></div>' +
            '<div style="margin-left: 5px;margin-top: -36px;">本服务由江苏欧飞电子商务有限公司提供</div></div>',
            replace:true
        }
    }]);
    app.directive('btnBack', ['$ionicNavBarDelegate', '$rootScope','$ionicGesture', function ($ionicNavBarDelegate,$rootScope, $ionicGesture) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $ionicGesture.on('tap', function () {
                    //window.history.go(-2);
                    if($rootScope.hasHomePage){
                        window.location.href ='/mobile?user='+document.getElementById('user').value;
                    }
                    else{
                        window.location.href ='/mobilecommon?menu=phone&user='+document.getElementById('user').value;
                    }
                    // location.href=document.referrer;
                }, element);
            }
        }
    }]);

    app.directive('notice',[function(){
        return {
            restrict:'E',
            template:' <p ng-class="{post:true}">公告：</p>',
            replace:true
        }
    }]);


    app.directive('copyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<p class="copyright">客服电话 ： <a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br/><a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice">意见反馈</a></p>',
            replace:true
        }
    }]);

    app.directive('copyrightforwx',['$rootScope',function($rootScope){

        return {
            restrict:'E',
            template:'<div>'+
            '<div class="feedback"><a href="">生活服务频道全新上线，期待您的反馈<i></i></a></div><p class="copyright">@中国银行江苏分行</p>'+
            '</div>',
            replace:true
        }

    }]);

    app.directive('itemforwx',['$rootScope',function($rootScope){

        return {
            restrict:'E',
            template:'<div class="cate-nav clearfix">'+
            '<a href="http://wallet.95516.net/upweixin/client/html/bill/seckilllist.html"><i class="icon icon-nav-105"></i>优惠券</a>'+
            '<a href="http://www.11185.com.cn/zhms/mobileobcMainPage4.html?actCode=2014boc"><i class="icon icon-nav-111"></i>商品秒杀</a>'+
            '<a href="http://boc.greattalentsoft.com/wechatShare/"><i class="icon icon-nav-112"></i>抽奖互动</a>'+
            '<a ng-repeat="item in childMenu" href="{{item.location}}&user={{userId}}">'+
            '<i class="{{item.pic}}"></i>'+
            '<span ng-bind="item.name"></span></a>'+
            '<a onclick="alert("正在建设")"><i class="icon icon-nav-109"></i>敬请期待</a>'+
            '</div>',
            replace:true
        }
    }]);

    app.directive('bannerformobile',['$rootScope',function($rootScope){

        return {
            restrict:'E',
            template:'<ul class="slider-pager slider-pager-post">'+
            '<li class="slider-pager-page" ng-class="{active:banner.choosed}" ng-repeat="banner in bannerList"></li>'+
            '</ul>',
            replace:true
        }
    }]);

    app.directive('feedbackformobile',['$rootScope',function($rootScope){

        return {
            restrict:'E',
            template:'<a class="item-note" href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice">问题反馈</a>',
            replace:true
        }
    }]);

    app.directive('dxfooter',[function(){
        return {
            restrict:'E',
            template:'<div><p>Copyright  ©2009 中国电信集团公司all rights reserved.</p>' +
            '<p>ICP证号京ICP备 09031924</p></div>',
            replace:true
        }
    }]);

    app.directive('dxphoneserver',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div><div ng-class="{tel:true}"><p>客服电话</p><h1><span ng-bind="servicePhone"></span></h1><br></div></div>',
            replace:true
        }
    }]);

    // 成功页面客服电话
    app.directive('phoneservice',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<span ng-bind="servicePhone"></span>',
            replace:true
        }
    }]);

    app.directive('ycsfooter',[function(){
        return {
            restrict:'E',
            template:'<div><p>Copyright  ©2015 ZZYCS.COM 郑州云盛科技有限公司 版权所有</p>' +
            '<p>豫ICP备14005578号-1</p></div>',
            replace:true
        }
    }]);

    app.directive('ycsphoneserver',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div><div ng-class="{tel:true}"><p>客服电话</p><h1><span ng-bind="servicePhone"></span></h1><br></div></div>',
            replace:true
        }
    }]);

    app.directive('ycscopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<p class="copyright">客服电话 ： <a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br/>' +
            '<a href="http://www.zzycs.com" style="text-decoration: underline;">返回云超市</a> | ' +
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice"> 意见反馈</a></p>',
            replace:true
        }
    }]);

    app.directive('hwcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright">' +
            '<div class="hr">' +
            '<a href="http://m.vmall.com" class="logo hw-logo">' +
            '<img src="http://pic.ofcard.com/cards/mobile/img/hw-logo.png" alt=""></a>' +
            '<a href="" class="logo ofcard-logo"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo.png" alt=""></a>' +
            '</div>' +
            '<p>本站所售商品由欧飞数卡提供<br>客服电话 ：<a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br>' +
            '<a href="http://m.vmall.com" style="text-decoration: underline;">返回Vmall</a> | ' +
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice"> 意见反馈</a></p></div>',
            replace:true
        }
    }]);

    app.directive('gocopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright">' +
            '<div class="hr">' +
            '<a href="" class="logo go-logo">' +
            '<img src="http://pic.ofcard.com/cards/mobile/img/go-logo.png" alt=""></a>' +
            '<a href="" class="logo ofcard-logo"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo.png" alt=""></a>' +
            '</div>' +
            '<p>本站所售商品由欧飞数卡销售<br>客服电话 ：<a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br>' +
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice"> 意见反馈</a></p></div>',
            replace:true
        }
    }]);

    app.directive('jxnhcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright">' +
            '<div class="hr">' +
            '<a href="" class="logo jx-nh-logo">' +
            '<img src="http://pic.ofcard.com/cards/mobile/img/jx-nh-logo.jpg" alt=""></a>' +
            '<a href="" class="logo ofcard-logo"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo.png" alt=""></a>' +
            '</div>' +
            '<p>本站所售商品由欧飞数卡销售<br>客服电话 ：<a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br>' +
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice"> 意见反馈</a></p></div>',
            replace:true
        }
    }]);

    // 银讯通PC端底部定制
    app.directive('yxtphoneserver',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div><div ng-class="{tel:true}"><p>客服电话</p><h1><span ng-bind="servicePhone"></span></h1><br></div>',
            replace:true
        }
    }]);

    app.directive('yxtfooter',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'',
            replace:true
        }
    }]);

    // 银讯通手机端客服号码定制
    app.directive('yxtcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<p class="copyright">客服电话 ： <a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br/><a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice">意见反馈</a></p>',
            replace:true
        }
    }]);

    app.directive('eccopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright">' +
            '<div class="hr">' +
            '<a href="" class="logo calendar-logo">' +
            '<img src="http://pic.ofcard.com/cards/mobile/img/calendar-logo.png" alt=""></a>' +
            '<a href="" class="logo ofcard-logo"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo.png" alt=""></a>' +
            '</div>' +
            '<p>本站所售商品由欧飞数卡提供<br>客服电话 ：<a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br>' +
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice"> 意见反馈</a></p></div>',
            replace:true
        }
    }]);

    app.directive('zhyfphoneserver',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div><div ng-class="{tel:true}"><p>客服电话</p><h1><span ng-bind="servicePhone"></span></h1><br></div></div>',
            replace:true
        }
    }]);

    app.directive('zhyffooter',[function(){
        return {
            restrict:'E',
            template:'<div><p>中汇易付股份有限公司 － 集线下收单、便民支付、移动支付、互联网支付的综合金融平台</p>' +
            '<p>Copyright©  WWW.EPAY-CN.COM  All Rights Reserved.' +
            '鲁ICP备15008334号</p></div>',
            replace:true
        }
    }]);

    app.directive('beecopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright">' +
            '<div class="hr">' +
            '<a href="" class="logo bee-logo">' +
            '<img src="http://pic.ofcard.com/cards/mobile/img/bee-logo.png" alt=""></a>' +
            '<a href="" class="logo ofcard-logo"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo.png" alt=""></a>' +
            '</div>' +
            '<p>本站所售商品由欧飞数卡提供<br>客服电话 ：<a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br>' +
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice"> 意见反馈</a></p></div>',
            replace:true
        }
    }]);

    app.directive('nfbankcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright">' +
            '<div class="hr">' +
            '<a href="" class="logo 94bank-logo">' +
            '<img src="http://pic.ofcard.com/cards/mobile/img/94bank-logo.png" alt=""></a>' +
            '<a href="" class="logo ofcard-logo"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo.png" alt=""></a>' +
            '</div>' +
            '<p>本站所售商品由欧飞数卡提供<br>客服电话 ：<a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br>' +
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice"> 意见反馈</a></p></div>',
            replace:true
        }
    }]);

    app.directive('aishuacopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright">' +
            '<div class="hr">' +
            '<a href="" class="logo wotongbao-logo">' +
            '<img src="http://pic.ofcard.com/cards/mobile/img/wotongbao-logo.png" alt=""></a>' +
            '<a href="" class="logo ofcard-logo"><img src="http://pic.ofcard.com/cards/mobile/img/ofcard-logo.png" alt=""></a>' +
            '</div>' +
            '<p>本站所售商品由欧飞数卡提供<br>客服电话 ：<a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br>' +
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice"> 意见反馈</a></p></div>',
            replace:true
        }
    }]);

    app.directive('boccopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<p class="copyright">本服务由江苏欧飞电子商务有限公司提供，<br>支持全国三网手机话费充值，方便快捷，3到5分钟快速到账<br>'+
            '如有疑问请联系客服：<a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br>'+
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice">意见反馈</a></p>',
            replace:true
        }
    }]);

    app.directive('jbserver',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div"><div ng-class="{tel:true}"><p>客服电话</p><h1><span ng-bind="servicePhone"></span></h1><br></div>' +
            '<div style="margin-left: 5px;margin-top: -36px;">本服务由嘉兴三三讯通信息科技有限公司提供</div></div>',
            replace:true
        }
    }]);

    app.directive('jbcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<p class="copyright">本服务由嘉兴三三讯通信息科技有限公司提供<br>'+
            '如有疑问请联系客服：<a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br>'+
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice">意见反馈</a></p>',
            replace:true
        }
    }]);

    app.directive('jftcopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright">' +
            '<p>本站所售商品由欧飞数卡提供<br>客服电话 ：<a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br>' +
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice"> 意见反馈</a></p></div>',
            replace:true
        }
    }]);

    app.directive('zhifucopyright',['$rootScope',function($rootScope){
        return {
            restrict:'E',
            template:'<div class="copyright">' +
            '<div class="hr">' +
            '<a href="" class="logo calendar-logo">' +
            '<img src="http://pic.ofpay.com/cards/mobile/img/z.jpg" alt=""></a>' +

            '</div>' +
            '<p>本站所售商品由欧飞数卡提供<br>客服电话 ：<a href="tel:{{servicePhone}}" calss=""><span ng-bind="servicePhone"></span></a><br>' +
            '<a href="http://opencs.ofpay.com/mobile?userId={{userId}}#/advice"> 意见反馈</a></p></div>',
            replace:true
        }
    }]);
});

