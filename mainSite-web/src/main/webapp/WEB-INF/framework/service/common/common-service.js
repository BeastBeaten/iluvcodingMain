'use strict';

define(['angular'], function(angular) {

    var commonService = angular.module('openwebApp.service.comm.commonModule', []);

    commonService.factory('MenuService', ['$http',function($http) {
        return {
            phonerecharge:{desc:['1.月初和月末运营商系统繁忙，话费到账时间可能会出现延迟。',
                '2.部分状态特殊的手机号(空号、停机等)造成无法充值，将会进行退款。',
                '3.30元以上面值的部分订单会出现分批到账情况无法参加运营商的活动。']},
            flowrecharge:{desc:['1.月初和月末运营商系统繁忙，话费到账时间可能会出现延迟。',
                '2.部分状态特殊的手机号(空号、停机等)造成无法充值，将会进行退款。',
                '3.30元以上面值的部分订单会出现分批到账情况无法参加运营商的活动。']},
            gasrecharge:{desc:['1.充值成功预计1-15分钟到账；',
                '2.如充错账号，支付资金无法返还；',
                '3.如充值失败，退款将在2-7个工作日内退还到原支付账号；',
                '4.充值成功后，需要到中石油、中石化加油站圈存，圈存完成后，您才可以持卡消费；'
            ]},
            giftCardrecharge:{desc:['1.本站礼品卡均由官方网站购买，如需了解注意事项，请前往相应官网了解清楚后购买。',
                '2.售出卡密为官方卡密，均不退不换，若接收短信错误导致卡密信息泄漏，由客户自行承担。',
                '3.请认真核对接收短信地址，如长时间未接收到卡密信息请联系本站客服。']},
            gamerecharge:{desc:['1.请确保您的游戏信息填写正确，部分游戏账号需填写完整格式，如邮箱形式等。',
                '2.由于您充值账号输入错误但充值成功的，系统不予退款。',
                '3.若长时间充值不到账，请您拨打客服电话；']},
            viprecharge:{desc:['1.请确保您的会员账号信息填写正确，部分会员账号需填写完整格式，如邮箱形式等。',
                '2.由于您充值账号输入错误但充值成功的，系统不予退款。',
                '3.若长时间充值不到账，请您拨打客服电话；']},
            publicrecharge:{desc:[
                '1.充值不到账或退款问题请微信关注欧飞便民生活资讯或拨打客服电话：025-69828599'
            ]},
            web:{
                parentMenu:[{
                    name:'充值中心'
                }
                ],
                rcMenu: [{
                    pathname:'phonerecharge',
                    value:{
                        name:'手机充值',
                        url:'phonerecharge',
                        iconClass:'iconMobile',
                        pic:'pay',
                        title:'让缴费充值更轻松！',
                        descTitle:'服务说明',
                        cateUrl:'/webCate?menu=phonerecharge',
                        desc:['1.月初和月末运营商系统繁忙，话费到账时间可能会出现延迟。',
                            '2.部分状态特殊的手机号(空号、停机等)造成无法充值，将会进行退款。',
                            '3.30元以上面值的部分订单会出现分批到账情况,无法参加运营商的活动。']
                    },
                    webPayList:{}
                },{
                    pathname:'gamerecharge',
                    value:{
                        name:'游戏直充',
                        url:'gamerecharge',
                        iconClass:'iconGame',
                        pic:'pay',
                        title:'让缴费充值更轻松！',
                        descTitle:'服务说明',
                        cateUrl:'/webCate?menu=gamerecharge',
                        desc:['1.请确保您的游戏信息填写正确，部分游戏账号需填写完整格式，如邮箱形式等。',
                            '2.由于您充值账号输入错误但充值成功的，系统不予退款。',
                            '3.	若长时间充值不到账，请您拨打客服电话。']
                    }
                },{
                    pathname:'publicrecharge',
                    value:{
                        name:'生活缴费',
                        url:'publicrecharge',
                        iconClass:'iconLife',
                        pic:'pay',
                        title:'让缴费充值更轻松！',
                        descTitle:'服务说明',
                        cateUrl:'/webCate?menu=publicrecharge',
                        desc:['1.请您确保正确填写账单信息，对于因您提供信息不真实或不完整所造成的损失由您自行承担。',
                            '2.填写账单信息后点击【显示账单】，如果没有出账单会提示，如果查出账单可直接进行缴费。',
                            '3.因您提供的账单逾期或支付资金不足等任何原因导致账单支付不成功的，我司将返回失败信息，因此导致逾期时间增长或任何其他损失的，请自行完全承担。']
                    }
                },{
                    pathname:'gasrecharge',
                    value:{
                        name:'加油卡直充',
                        url:'gasrecharge',
                        iconClass:'icon-oil',
                        pic:'pay',
                        title:'让缴费充值更轻松！',
                        descTitle:'服务说明',
                        cateUrl:'/webCate?menu=gasrecharge',
                        desc:['1.请仔细核对加油卡号并确认，充错卡号无法退款。',
                            '2.固定面值加油卡充值不提供发票，敬请谅解；如需发票，请选择任意充充值方式。',
                            '3.充值成功后，需到加油站进行圈存操作，否则充值金额将无法生效。',
                            '4.普通发票加油卡：充值成功24小时后（部分省市48小时后），您可携带加油卡主卡至发卡地市的任一售卡充值网点补开普通发票。增值税发票加油卡可进行固定面值充值，但无法进行任意充，并不提供发票。']
                    }
                },{
                    pathname:'giftrecharge',
                    value:{
                        servicePhone:'025-69828599',
                        name:'礼品卡',
                        url:'giftrecharge',
                        iconClass:'iconCard',
                        pic:'pay',
                        title:'让缴费充值更轻松！',
                        descTitle:'服务说明',
                        cateUrl:'/webCate?menu=giftrecharge',
                        desc:['1.本站礼品卡均由官方网站购买，如需了解注意事项，请前往相应官网了解清楚后购买。',
                            '2.售出卡密为官方卡密，均不退不换，若接收短信错误导致卡密信息泄漏，由客户自行承担。',
                            '3.请认真核对接收短信地址，如长时间未接收到卡密信息请联系本站客服。']
                    }
                },{
                    pathname:'phoneCardrecharge',
                    value:{
                        servicePhone:'025-69828599',
                        name:'话费卡密',
                        url:'phoneCard',
                        iconClass:'icon-mobile',
                        pic:'pay',
                        title:'让缴费充值更轻松！',
                        descTitle:'服务说明',
                        cateUrl:'/webCate?menu=phoneCard',
                        desc:['1.本服务不存在兼职，刷单等行为，谨慎保管个人信息及充值卡密码，请勿上当受骗，请在卡密有效期内使用！逾期将视 为放弃卡余额。',
                            '2.移动卡充值方式为：拨打13800138000使用18位密码充值卡充值，联通卡充值方式：为拨打10011使用19位密码充值卡充值，电信卡充值方式为：拨打11888，按语音提示操作。',
                            '3.请您看清说明后再行购买，请勿屯卡，即买即用，有问题及时联系客服，不受理除密码错误以外的其他查询，如需查询其他信息请致电当地运营商。']
                    }
                },{
                    pathname:'gameCardrecharge',
                    value:{
                        servicePhone:'025-69828599',
                        name:'游戏卡密',
                        url:'gameCard',
                        iconClass:'icon-game',
                        pic:'pay',
                        title:'让缴费充值更轻松！',
                        descTitle:'服务说明',
                        cateUrl:'/webCate?menu=gameCard',
                        desc:['1.本站不存在兼职，刷单等行为，请勿上当受骗，请在卡密有效期内使用！逾期将视 为放弃卡余额。',
                            '2.本站游戏卡密均由官方网站购买，如需了解注意事项，请前往相应官网了解清楚后购买。',
                            '3.售出卡密为官方卡密，均不退不换，若接收短信手机错误导致卡密信息泄漏，由客户自行承担。',
                            '4.请认真核对接收短信地址，如长时间未接受到卡密信息请联系本站客服。']
                    }
                },{
                    pathname:'tencent',
                    value:{
                        servicePhone:'025-69828599',
                        name:'腾讯游戏直充',
                        url:'tencentrecharge',
                        iconClass:'iconQQ',
                        pic:'pay',
                        title:'让缴费充值更轻松！',
                        descTitle:'服务说明',
                        cateUrl:'/webCate?menu=tencentrecharge',
                        desc:['1.请确保您的游戏信息填写正确，部分游戏账号需填写完整格式，如邮箱形式等。',
                            '2.由于您充值账号输入错误但充值成功的，系统不予退款。',
                            '3.	若长时间充值不到账，请您拨打客服电话。']
                    }
                }
                ],
                perMenu: [
                    {
                        name:'账户信息',
                        url:'userinfo'
                    }
                ]
            }
        }
    }]);

    commonService.factory('dialog', ['$ionicPopup', '$ionicLoading', '$rootScope',function ($ionicPopup, $ionicLoading,$rootScope) {
        //var isMobile = $rootScope.isMobile ? $rootScope.isMobile : false;
        return {
            showTip: function (o) {
                o = angular.extend({
                    template: '<i class="icon ion-loading-c icon-refreshing"></i><br>努力加载中',
                    noBackdrop: true, //是否需要遮罩层
                    delay: false, //是否延时弹出提示框，单位毫秒
                    duration: 2000 //是否自动消失, 单位毫秒
                }, o);
                return $ionicLoading.show(o);
            },

            hideTip: function () {
                $ionicLoading.hide();
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

    // 请求工具类，可实现加载提示
    commonService.factory('RequestUtil', ['$http', '$timeout', '$rootScope', "$state", 'dialog',function ($http, $timeout, $rootScope, $state, dialog) {

        return {
            request:function(url, params, callback,tipContent){
                // 调用提示组件，提示正在加载
                var showTips = false;

                // 提示内容由调用时传入，不同场景提示内容可能会不一样
                if (!Tools.prototype.isEmpty(tipContent)){
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
                        /**if(showTips){
                            dialog.showTip({
                                template: '请求失败'
                            });
                        }**/
                        dialog.hideTip();

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

    commonService.factory('CommonService',['$http', "$timeout", "$state", 'dialog','$rootScope','RequestUtil', function($http, $timeout, $state, dialog, $rootScope,RequestUtil){
        return {
            getFaceValueList:[
                {
                    id:'',
                    value:10,
                    disprice:'10~11',
                    stock:true,
                    choosed:false,
                    productName:''
                },{
                    id:'',
                    value:20,
                    disprice:'20~21',
                    stock:true,
                    choosed:false,
                    productName:''
                },{
                    id:'',
                    value:30,
                    disprice:'30~31',
                    stock:true,
                    choosed:false,
                    productName:''
                },{
                    id:'',
                    value:50,
                    disprice:'49.65~49.9',
                    stock:true,
                    choosed:false,
                    productName:''
                },{
                    id:'',
                    value:100,
                    disprice:'99.3~99.9',
                    stock:true,
                    choosed:true,
                    productName:''
                },{
                    id:'',
                    value:200,
                    disprice:'197~199',
                    stock:true,
                    choosed:false,
                    productName:''
                },{
                    id:'',
                    value:300,
                    disprice:'295~299',
                    stock:true,
                    choosed:false,
                    productName:''
                },{
                    id:'',
                    value:500,
                    disprice:'493~499',
                    stock:true,
                    choosed:false,
                    productName:''
                }

            ],
            getBankList:{
                dCards:[
                    {
                        bankName:'交通银行',
                        bankIcon:'bankcomm',
                        bankCode:'0106',
                        bankTypeId:1,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'中国光大银行',
                        bankIcon:'cebbank',
                        bankCode:'0108',
                        bankTypeId:1,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'广发银行',
                        bankIcon:'gdb',
                        bankCode:'0109',
                        bankTypeId:1,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'中国民生银行',
                        bankIcon:'cmbc',
                        bankCode:'0110',
                        bankTypeId:1,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'兴业银行',
                        bankIcon:'cib',
                        bankCode:'0107',
                        bankTypeId:1,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'中信银行',
                        bankIcon:'ecitic',
                        bankCode:'0111',
                        bankTypeId:1,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'浦发银行',
                        bankIcon:'spdb',
                        bankCode:'0112',
                        bankTypeId:1,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    }
                ],
                cCards:[
                    {
                        bankName:'交通银行',
                        bankIcon:'bankcomm',
                        bankCode:'0206',
                        bankTypeId:2,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'中国光大银行',
                        bankIcon:'cebbank',
                        bankCode:'0208',
                        bankTypeId:2,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'广发银行',
                        bankIcon:'gdb',
                        bankCode:'0209',
                        bankTypeId:2,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'中国民生银行',
                        bankIcon:'cmbc',
                        bankCode:'0210',
                        bankTypeId:2,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'兴业银行',
                        bankIcon:'cib',
                        bankCode:'0207',
                        bankTypeId:2,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'中信银行',
                        bankIcon:'ecitic',
                        bankCode:'0211',
                        bankTypeId:2,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    },{
                        bankName:'浦发银行',
                        bankIcon:'spdb',
                        bankCode:'0212',
                        bankTypeId:2,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    }
                ]
            },
            getBankListForMobile:{

                dCards:[
                    {
                        bankName:'中国银行',
                        bankIcon:'icbc',
                        bankCode:'0803',
                        bankTypeId:1,
                        payTypeId:'OLP',
                        payTypeName:'在线支付',
                        rate:'2'
                    }
                ]
            },
            getHotGameList:[
                {
                    vid:'v2331',
                    name:'Q币直充',
                    logo:'http://pic.ofcard.com/cards/images/game01.jpg',
                    class:'game-01'
                },{
                    vid:'v1188',
                    name:'魔兽世界',
                    logo:'http://pic.ofcard.com/cards/images/game02.jpg',
                    class:'game-02'
                },{
                    vid:'v1343',
                    name:'英雄联盟',
                    logo:'http://pic.ofcard.com/cards/images/game03.jpg',
                    class:'game-03'
                },{
                    vid:'v1317',
                    name:'地下城与勇士',
                    logo:'http://pic.ofcard.com/cards/images/game04.jpg',
                    class:'game-04'
                },{
                    vid:'v1341',
                    name:'穿越火线',
                    logo:'http://pic.ofcard.com/cards/images/game05.jpg',
                    class:'game-05'
                },{
                    vid:'v1462',
                    name:'天龙八部3',
                    logo:'http://pic.ofcard.com/cards/images/game06.jpg',
                    class:'game-06'
                },{
                    vid:'v1393',
                    name:'剑网3',
                    logo:'http://pic.ofcard.com/cards/images/game07.jpg',
                    class:'game-07'
                }

            ],
            getLettersList:[
                {
                    name:"热门",
                    choosed:true
                },
                {
                    name:"A",
                    choosed:false
                },{
                    name:"B",
                    choosed:false
                },{
                    name:"C",
                    choosed:false
                },{
                    name:"D",
                    choosed:false
                },{
                    name:"E",
                    choosed:false
                },{
                    name:"F",
                    choosed:false
                },{
                    name:"G",
                    choosed:false
                },{
                    name:"H",
                    choosed:false
                },{
                    name:"I",
                    choosed:false
                },{
                    name:"J",
                    choosed:false
                },{
                    name:"K",
                    choosed:false
                },{
                    name:"L",
                    choosed:false
                },{
                    name:"M",
                    choosed:false
                },{
                    name:"N",
                    choosed:false
                },{
                    name:"O",
                    choosed:false
                },{
                    name:"P",
                    choosed:false
                },{
                    name:"Q",
                    choosed:false
                },{
                    name:"R",
                    choosed:false
                },{
                    name:"S",
                    choosed:false
                },{
                    name:"T",
                    choosed:false
                },{
                    name:"U",
                    choosed:false
                },{
                    name:"V",
                    choosed:false
                },{
                    name:"W",
                    choosed:false
                },{
                    name:"X",
                    choosed:false
                },{
                    name:"Y",
                    choosed:false
                },{
                    name:"Z",
                    choosed:false
                }
            ],
            getGasCardList:[
                {
                    id:'35212',
                    name:'全国中石化加油卡直充',
                    pic:'http://pic.ofcard.com/cards/images/card20.jpg',
                    wapPic:'oil-cc',
                    url:'gasRecharge'
                }
            ],
            getGiftCardList:[
                {
                    id:'2639602',
                    name:'唯品会礼品卡'
                },{
                    id:'2364419',
                    name:'苏宁礼品卡'
                },{
                    id:'2304155',
                    name:'携程礼品卡'
                },{
                    id:'2264866',
                    name:'亚马逊礼品卡'
                },{
                    id:'2184389',
                    name:'1号店礼品卡'
                },{
                    id:'2185598',
                    name:'国美红券'
                },{
                    id:'2185429',
                    name:'当当礼品卡'
                },{
                    id:'2451724',
                    name:'京东E卡'
                },{
                    id:'3509802',
                    name:'天猫超市卡'
                }
            ],getGiftCardListForB2C:[
                {
                    id:'2639602',
                    name:'唯品会礼品卡'
                },{
                    id:'2364419',
                    name:'苏宁礼品卡'
                },{
                    id:'2304155',
                    name:'携程礼品卡任我游'
                },{
                    id:'2303881',
                    name:'携程礼品卡任我行'
                },{
                    id:'2264866',
                    name:'亚马逊礼品'
                },{
                    id:'2184389',
                    name:'1号店礼品卡'
                },{
                    id:'2185598',
                    name:'国美红券'
                },{
                    id:'2639596',
                    name:'中粮我买卡'
                },{
                    id:'2185429',
                    name:'当当礼品卡'
                },{
                    id:'3509802',
                    name:'天猫超市卡'
                }
            ]
        }
    }]);

    commonService.factory('MessageService',function(){
        return {
            errorMsg: {
                commonMsg:{
                    order_limit:"订单超额",
                    no_face_value: "请选择面值",
                    no_stock:"抱歉，暂时缺货，请重新选择",
                    no_phone:'请输入手机号',
                    phone_format_error:'手机号码格式错误',
                    no_code:'请输入短信验证码',
                    no_image_code:'请输入验证字符',
                    check_image_code_error:'验证字符错误，请重新输入',
                    send_code_error:'获取验证码错误，请稍后重试',
                    over_sending_limit:'操作过于频繁，请稍后再试',
                    check_code_error:'验证码验证错误，请重新获取',
                    pay_error:'抱歉,支付异常,请稍后重试',
                    query_order_error:'抱歉，未查询到相关订单',
                    no_oilNo:'请输入加油卡号',
                    query_gascard_error:'加油卡信息错误',
                    oilNO_format_error:'加油卡号格式错误',
                    cardNum_format_error:"请正确输入购买数量",
                    no_product:'商品维护',
                    no_charge_amount:'请输入充值金额',
                    wrong_charge_amount:'充值金额错误',
                    prompt_agreetment_check:'请阅读并勾选同意加油卡充值协议',
                    no_card_num:'请输入购买数量',
                    card_num_error:'购买数量范围错误,请重新输入',
                    no_battle_account:'请输入通行证账号',
                    battle_account_format_error:"通行证账号格式不正确,请输入邮箱",
                    no_game_account:'请输入游戏账号',
                    no_vip_account:'请输入会员账号',
                    no_game_area:'请输入游戏大区',
                    no_game_service:'请输入游戏服',
                    no_publicNo:'请输入户号',
                    no_publicUnit:'请选择单位',
                    wrong_publicNo:'未查询到账单信息',
                    wrong_cash:'欠费金额有问题'
                },
                changeCardMsg: {
                    no_face_value:"请选择面额",
                    no_card_type: '请选择充值卡类型',
                    no_card_no:"请输入充值卡卡号",
                    no_card_pass:"请输入充值卡卡密",
                    card_no_format_error:'卡号格式错误',
                    card_pass_format_error:'密码格式错误',
                    no_stock: '抱歉!库存不足,请选择其他面额',
                    card_error: '充值卡卡号或卡密错误,请核实',
                    card_used:'此充值卡已兑换,请重输卡号卡密',
                    no_agree:'请接受服务条款',
                    take_order_error_system:'系统异常,请稍后重试或联系客服',
                    take_order_error_card_info:'充值卡信息不存在,请重新输入',
                    take_order_error_card_used:'充值卡已使用,请重新输入',
                    take_order_error:'抱歉,提交失败!请更换卡密或联系客服',
                    query_order_error:'抱歉，未查询到相关订单',
                    query_card_error:'抱歉,提取卡密失败,请重试'
                },
                phoneRechargeMsg:{
                    phone_no_format_error:'号码格式错误',
                    phone_no_support_error:'暂不支持此号码充值',
                    phone_no_error:'未知号码',
                    no_stock:'库存不足,请重新选择面额!',
                    no_phone_no:'请输入充值号码',
                    no_face_value:'请选择面额'
                },
                giftCardMsg: {
                    no_face_value: "请选择面额",
                    no_shortMsg_or_email:"请输入短信接收号码",
                    no_stock: '抱歉!库存不足,请选择其他面额',
                    shortMsg_format_error:"短信号码格式错误",
                    cardNum_format_error:"请正确输入购买数量",
                    send_code_error:'获取验证码错误，请稍后重试',
                    check_code_error:'验证码验证错误，请重新获取',
                    no_code_error:'请填写验证码',
                    query_card_error:'抱歉,提取卡密失败,请重试'
                },
                payMsg:{
                    pay_amount_error:'手续费读取失败，请刷新页面或重新选择银行'
                },
                searchMsg:{
                    no_account:"请输入充值账号"
                },
                gameMsg:{
                    no_face_value:"请选择面值",
                    no_battle_account:"请输 入通行证账号",
                    no_game_count:"请输入游戏账号",
                    no_game_area:"请选择游戏区",
                    no_game_server:"请选择游戏服务器",
                    battle_account_format_error:"通行证账号格式不正确,请输入邮箱",
                    no_game_product:"游戏维护，暂不能充值，请稍后重试。",
                    no_game_product_stock:"库存不足，请选择其他面值。",
                    no_card_num:"请正确输入购买数量",
                    no_choose_card_num:'请选择购买数量'
                },
                publicMsg:{
                    no_province:'请选择所在省',
                    no_city:'请选择所在市',
                    no_pay_project:'请选择缴费项目',
                    no_pay_unit:'请选择缴费单位',
                    no_pebarCd:'请输入户号',
                    no_stock:'抱歉，该地区暂不支持缴费',
                    no_owed:'您未欠费,暂不支持预缴费',
                    no_bill:'抱歉，未查询到账单信息'
                },
                gasMsg:{
                    no_gas_product:'商品维护,请稍后重试',
                    no_face_value: "请选择面额",
                    no_shortMsg_or_email:"请输入短信接收号码",
                    no_stock: '抱歉!库存不足,请选择其他面额',
                    shortMsg_format_error:"短信号码格式错误",
                    cardNum_format_error:"请正确输入购买数量",
                    send_code_error:'获取验证码错误，请稍后重试',
                    check_code_error:'验证码验证错误，请重新获取',
                    no_code_error:'请填写验证码',
                    query_card_error:'抱歉,提取卡密失败,请重试',
                    no_oilNO:'请输入加油卡卡号',
                    oilNO_format_error:'加油卡卡号格式错误',
                    query_gascard_error:'抱歉,未查询到加油卡信息',
                    no_gascard_info:'请查询加油卡信息',
                    tel_format_error:"手机号码格式错误",
                    no_tel:'请输入持卡人手机号',
                    no_gas_name:'请输入持卡人姓名',
                    no_gas_card_num:'请输入购买金额',
                    cal_service_fee_failed:'获取总价错误'
                },
                marketMsg:{
                    no_mobileNo:'请输入手机号',
                    mobileNo_format_error:'抱歉,手机号格式不正确',
                    sys_error:'抱歉,系统繁忙,请稍后重试',
                    has_bill:'抱歉,您已领取红包',
                    mobileNo_error:'抱歉,未知手机号,请重新输入',
                    mobileNo_info_error:'抱歉,手机号受限,请查看说明',
                    no_cdKey:'请输入兑换码',
                    browser_error:'请在微信客户端中分享',
                    error_facevalue:'抱歉，该优惠劵面值低于实际充值面值'
                },
                orderMsg:{
                    phone_no_error:'暂不支持此格式号码充值',
                    no_oil_no:'请输入加油卡卡号',
                    oil_no_format_error:'加油卡卡号格式错误',
                    query_order_error:'抱歉，未查询到相关订单'
                }
            },
            menuDesc:{
                payDesc:[
                    '1.本站所售均为低利润的数字化产品，商品价格未包含银行支付收取的手续费。',
                    '2.手续费由相应提供支付的银行收取，如发生退款，支付手续费不退回。',
                    '3.付款成功之后若订单状态未改变请耐心等待，若长时间未改版请联系客服。'
                ]
            }

        };
    });
});
