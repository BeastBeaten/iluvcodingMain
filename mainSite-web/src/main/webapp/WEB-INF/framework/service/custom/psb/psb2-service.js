/**
 * Created by zhouqing on 16-1-26.
 */

'use strict';

define(['angular'
], function(angular) {


    var app = angular.module('openwebApp.psb2Service', []);

    app.factory('PSBCommonService',['$http','RequestUtil',function($http,RequestUtil){
        var getRandomId = function(){
            return Math.random().toString(36).substr(2);
        }
        return {
            getGiftCardList: [{
                id:'',
                name:'话费直充',
                icon:'gift-2264865',
                pic:'http://pic.ofcard.com/cards/youzheng/img/gift-bcard012.png',
                url:'phoneorder',
                desc:'话费充值实时到账，月初和月末运营商系统繁忙，话费到账时间可能会出现延迟',
                descUrl:'http://www.ofcard.com/showinfo/1301.html'
            },{
                id:'3171492',
                name:'天猫点券卡',
                productName:'天猫卡',
                icon:'gift-3171492',
                pic:'http://pic.ofcard.com/cards/youzheng/img/gift-bcard011.png',
                url:'gift',
                desc:'天猫点券是一种积分营销工具，可在天猫购物抵扣，100点抵扣1元钱，在提交订单前选择使用天猫点券，输入点数即可。',
                descUrl:'http://jingyan.baidu.com/m/article/d169e186a1c221436611d838.html'
            },{
                id:'2184389',
                name:'1号店礼品卡',
                productName:'1号店礼品卡',
                icon:'gift-2184389',
                pic:'http://pic.ofcard.com/cards/youzheng/img/gift-bcard005.png',
                url:'gift',
                desc:'由1号店发行，可购买1号店网站（www.yhd.com）自营(入驻商家、虚拟商品等除外)的商品。',
                descUrl:'http://jingyan.baidu.com/m/article/6d704a13ffdf1c28db51ca89.html'
            },{
                id:'2639602',
                name:'唯品会唯品卡',
                productName:'唯品会礼品卡',
                icon:'gift-2639602',
                pic:'http://pic.ofcard.com/cards/youzheng/img/gift-bcard001.png',
                url:'gift',
                desc:'唯品卡是唯品会为回馈广大会员而推出的专属购物卡，在唯品会官网(vip.com)购买产品时使用，在唯品会官网特卖会频道、唯品团频道下单均可使用。',
                descUrl:'http://jingyan.baidu.com/m/article/9f63fb91c71085c8410f0e7e.html'
            }],
            sendVerifyCode:function(orderForm,callback){
                return RequestUtil.request('/psb2/sendVerifyCode', orderForm, callback, '');
            },
            check:function(psbForm,callback){
                return RequestUtil.request('/psb2/check?randomId='+getRandomId(), psbForm, callback,'');
            },
            checkGift:function(psbForm,callback){
                return RequestUtil.request('/psb2/giftCheck', psbForm, callback,'正在提交');
            },
            takePhoneSaleOrder:function(SaleOrderForm,callback){
                return RequestUtil.request('/psb2/takePhoneOrder', SaleOrderForm, callback, '正在提交');
                //$http.get("/phonerecharge/takeSaleOrder",{params:SaleOrderForm}).success(callback);
            },
            takeGiftCardOrder:function(giftOrderForm,callback){
                return RequestUtil.request('/psb2/takeGiftOrder', giftOrderForm, callback, '正在提交');
                //$http.get('/gift/takeOrder?randomId='+getRandomId(),{params:giftOrderForm}).success(callback);
            },
            queryGiftBill:function(psbForm,callback){
                return RequestUtil.request('/psb2/getGiftBills', psbForm, callback, '');
            },
            getGiftBill:function(psbForm,callback){
                return RequestUtil.request('/psb2/getGiftBillById', psbForm, callback, '');
            },
            queryOrderDetail:function(orderForm,callback){
                return RequestUtil.request('/psb2/queryOrderDetail',orderForm, callback, '正在提交');
                //$http.get("/phonerecharge/getPhoneInfo",{params:{phoneNo:phoneNo}}).success(callback);
            },
            takeLog:function(psbForm,callback){
                //userForm.randomId = getRandomId();
                $http.get('/psb2/log',{params:psbForm}).success(callback);
            },
            getWxConfig:function(url,callback){
                $http.get('/market/getWxConfig',{params:{"url":url}}).success(callback);
            }
        }

    }]);

    app.factory('MessageService',function(){
        return {
            errorMsg:{
                giftCardMsg: {
                    no_cCardNo:'请输入您的邮储信用卡号后四位',
                    no_shortMsg_or_email:"请输入手机号码",
                    no_stock: '该商品已被抢空，请选择其他商品或稍后再试',
                    shortMsg_format_error:"手机号码格式错误",
                    send_code_error:'获取验证码错误，请稍后重试',
                    send_code_over:'操作太频繁，歇会再来吧',
                    check_code_error:'验证码验证错误，请重新获取',
                    no_code_error:'请输入验证码',
                    no_card:'请选择礼品卡',
                    pay_error:'抱歉,支付异常,请稍后重试'
                },
                phoneRechargeMsg:{
                    phone_no_format_error:'号码格式错误',
                    phone_no_error:'未知号码',
                    no_stock:'该商品已被抢空，请选择其他商品或稍后再试',
                    no_phone_no:'请输入充值号码',
                    no_face_value:'请选择面额'
                }
            }
        }
    });

    // 请求工具类，可实现加载提示
    app.factory('RequestUtil', ['$http', '$timeout', '$rootScope', "$state", 'dialog',function ($http, $timeout, $rootScope, $state, dialog) {

        return {
            request:function(url, params, callback,tipContent){
                // 调用提示组件，提示正在加载
                var showTips = false;

                // 提示内容由调用时传入，不同场景提示内容可能会不一样
                if (!$rootScope.commonUtils.isEmpty(tipContent)){
                    showTips = true;
                }
                if (showTips){
                    dialog.showTip({
                        template: tipContent,
                        duration: false
                    });
                }

                return $http.get(url, {params: params})
                    .success(function (data) {
                        if(showTips){
                            dialog.hideTip();
                        }
                        callback.call(this, data);
                    }).error(function () {
                        if(showTips){
                            dialog.showTip({
                                template: '请求失败'
                            });
                        }

                    }).finally(function () {
                        if (showTips) {
                            $timeout(function () {
                                dialog.hideTip();
                            }, 6000);
                        };
                    });
            }
        };
    }]);

    app.factory('dialog', ['$ionicPopup', '$ionicLoading', '$rootScope',function ($ionicPopup, $ionicLoading,$rootScope) {
        //var isMobile = $rootScope.isMobile ? $rootScope.isMobile : false;
        return {
            showTip: function (o) {

                if($rootScope.isMobile){
                    o = angular.extend({
                        template: '<i class="icon ion-loading-c icon-refreshing"></i><br>努力加载中',
                        noBackdrop: true, //是否需要遮罩层
                        delay: false, //是否延时弹出提示框，单位毫秒
                        duration: 2000 //是否自动消失, 单位毫秒
                    }, o);
                    return $ionicLoading.show(o);
                }
            },

            hideTip: function () {
                if ($rootScope.isMobile){
                    $ionicLoading.hide();
                }
            },

            confirm: function (o) {
                o = angular.extend({
                    title: '',
                    content: '',
                    cancelText: '确定',
                    okText: '取消',
                    cancelType: 'button-positive',
                    okType: 'button-default'}, o);
                return $ionicPopup.confirm(o);
            }
        };
    }]);

});
