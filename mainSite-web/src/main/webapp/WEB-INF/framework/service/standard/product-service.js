/**
 * Created with IntelliJ IDEA.
 * User: Win7
 * Date: 15-11-4
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */
'use strict';

define(['angular'], function(angular) {

    var productService = angular.module('openwebApp.service.product.productModule', []);

    productService.factory('ProductService',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
        return {
            getFaceValue:function(id,callback){
                return RequestUtil.request('/product/faceValueList', {"itemClassId":id}, callback, '正在查询');
            },
            getPhoneFaceValue:function(PhoneForm,callback){
                return RequestUtil.request('/product/getPhoneFaceValue',PhoneForm, callback, '正在查询');
            },
            getPhoneProduct:function(PhoneForm,callback){
                return RequestUtil.request('/product/getPhoneProduct',PhoneForm, callback, '正在查询');
            },
            getWebPhoneProduct:function(PhoneForm,callback){
                return RequestUtil.request('/product/getPhoneProduct',PhoneForm, callback, '');
            },
            checkCanOrder:function(productForm,callback){
                return RequestUtil.request('/product/checkCanOrder', productForm, callback, '');
            },
            getSalePrice:function(productForm,callback){
                return RequestUtil.request('/product/getSalePrice', productForm, callback, '');
            },
            getGameList:function(callback){
                return RequestUtil.request('/product/getGameList', null, callback, '正在查询');
            },
            getWebGameList:function(callback){
                return RequestUtil.request('/product/getGameList', null, callback, '');
            },
            getGameInfo:function(gameForm,callback){
                return RequestUtil.request('/product/getGameInfo', gameForm, callback, '正在查询');
            },
            getVipList:function(callback){
                return RequestUtil.request('/product/getVipList', null, callback, '正在查询');
            },
            getWebGameInfo:function(gameForm,callback){
                return RequestUtil.request('/product/getGameInfo', gameForm, callback, '');
            },
            getVipInfo:function(gameForm,callback){
                return RequestUtil.request('/product/getVipInfo', gameForm, callback, '正在查询');
            },
            getVipCardStock:function(giftCardForm,callback){
                return RequestUtil.request('/product/getVipCardStock', giftCardForm, callback, '');
            },
            getGameArea:function(gameForm,callback){
                return RequestUtil.request('/product/getGameAreas', gameForm, callback, '');
            },
            getGameServer:function(gameForm,callback){
                return RequestUtil.request('/product/getGameServices', gameForm, callback, '');
            },
            getGiftCardList:function(callback){
                return RequestUtil.request('/product/getGiftCardList', null, callback, '正在查询');
            },
            getGiftCardInfo:function(giftCardForm,callback){
                return RequestUtil.request('/product/getGiftCardInfo', giftCardForm, callback, '');
            },
            getGiftCardStock:function(giftCardForm,callback){
                return RequestUtil.request('/product/getGiftCardStock', giftCardForm, callback, '');
            },
            getProvinceList:function(cityForm,callback){
                return RequestUtil.request('/product/queryProvinceList', null, callback, '正在查询');
            },
            getCityList:function(cityForm,callback){
                return RequestUtil.request('/product/queryCityList', cityForm, callback, '正在查询');
            },
            getWebProvinceList:function(cityForm,callback){
                return RequestUtil.request('/product/queryProvinceList', null, callback, '');
            },
            getWebCityList:function(cityForm,callback){
                return RequestUtil.request('/product/queryCityList', cityForm, callback, '');
            },
            getPayProjectList:function(publicPayForm,callback){
                return RequestUtil.request('/product/queryPayProjectList', publicPayForm, callback, '正在查询');
            },
            getWebPayProjectList:function(publicPayForm,callback){
                return RequestUtil.request('/product/queryPayProjectList', publicPayForm, callback, '');
            },
            getPayUnitList:function(publicPayForm,callback){
                return RequestUtil.request('/product/queryPayUnitList', publicPayForm, callback, '正在查询');
            },
            getWebPayUnitList:function(publicPayForm,callback){
                return RequestUtil.request('/product/queryPayUnitList', publicPayForm, callback, '');
            },
            getArrearsInfos:function(publicPayForm,callback){
                return RequestUtil.request('/product/queryArrearsInfos', publicPayForm, callback, '正在查询');
            },
            getWebArrearsInfos:function(publicPayForm,callback){
                return RequestUtil.request('/product/queryArrearsInfos', publicPayForm, callback, '');
            },
            getPhoneInfo:function(phoneNo,callback){
                return RequestUtil.request('/product/getPhoneInfo', {phoneNo:phoneNo}, callback, '');
            },
            calServiceFee:function(saleAmount,opt,expression,callback){
                return RequestUtil.request('/product/calServiceFee', {"saleAmount":saleAmount, "opt":opt,"expression":expression}, callback, '');
            },
            getGasCardInfo:function(GasCardForm,callback){
                return RequestUtil.request('/product/getGasInfo', GasCardForm, callback, '正在查询');
            },
            getWebGasCardInfo:function(GasCardForm,callback){
                return RequestUtil.request('/product/getGasInfo', GasCardForm, callback, '');
            },
            getFlowSalePrice:function(flowProductForm,callback){
                return RequestUtil.request('/product/getFlowSalePrice', flowProductForm, callback, '');
            },
            getGasCardProductInfo:function(gasRechargeType,callback){
                return RequestUtil.request('/product/getGasCardProductInfo', {"gasRechargeType":gasRechargeType}, callback, '');
            },
            getPublicCity:function(publicPayForm,callback){
                return RequestUtil.request('/product/getPublicCity', publicPayForm, callback, '正在查询');
            },
            getPublicArea:function(publicPayForm,callback){
                return RequestUtil.request('/product/getPublicArea', publicPayForm, callback, '正在查询');
            },
            queryPublicInfo:function(publicPayForm,callback){
                return RequestUtil.request('/product/queryPublicInfo', publicPayForm, callback, '正在查询');
            },
            queryWebPublicInfo:function(publicPayForm,callback){
                return RequestUtil.request('/product/queryPublicPayProduct', publicPayForm, callback, '');
            },
            queryAreaByIp:function(callback){
                return RequestUtil.request('/product/queryAreaByIp', null, callback, '正在查询');
            },
            getPhoneFaceValueList:[
                {
                    id:'',
                    value:'10',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'30',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'50',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'100',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'200',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'500',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                }

            ],
            getABCPhoneFaceValueList:[
                {
                    id:'',
                    value:'10',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'20',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'30',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'50',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'100',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'200',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                }

            ],
            getPSBCPhoneFaceValueList:[
                {
                    id:'',
                    value:'10',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'20',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'50',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'100',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'200',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                },{
                    id:'',
                    value:'500',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                }

            ],
            getYCPSBCPhoneFaceValueList:[
                {
                    id:'',
                    value:'5',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:''
                }
            ],
            getFlowFaceValue:[   // 获取默认流量面值规格
                {
                    id:'',
                    flowValue:'10M',
                    stock:false,
                    choosed:false
                },{
                    id:'',
                    flowValue:'20M',
                    stock:false,
                    choosed:false
                },{
                    id:'',
                    flowValue:'50M',
                    stock:false,
                    choosed:false
                },{
                    id:'',
                    flowValue:'100M',
                    stock:false,
                    choosed:false
                },{
                    id:'',
                    flowValue:'200M',
                    stock:false,
                    choosed:false
                },{
                    id:'',
                    flowValue:'500M',
                    stock:false,
                    choosed:false
                }
            ],
            getFaceValueForCM:[   // 获取移动流量面值规格
                {
                    id:'',
                    perValue:3,
                    flowValue:'10M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:5,
                    flowValue:'30M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:10,
                    flowValue:'70M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:20,
                    flowValue:'150M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:30,
                    flowValue:'500M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:50,
                    flowValue:'1G',
                    stock:false,
                    choosed:false,
                    price:''
                }
            ],
            getFaceValueForCU:[   // 获取联通流量面值规格
                {
                    id:'',
                    perValue:3,
                    flowValue:'20M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:6,
                    flowValue:'50M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:10,
                    flowValue:'100M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:15,
                    flowValue:'200M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:30,
                    flowValue:'500M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:100,
                    flowValue:'1G',
                    stock:false,
                    choosed:false,
                    price:''
                }
            ],
            getFaceValueForCT:[   // 获取电信流量面值规格
                {
                    id:'',
                    perValue:2,
                    flowValue:'10M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:5,
                    flowValue:'30M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:7,
                    flowValue:'50M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:10,
                    flowValue:'100M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:30,
                    flowValue:'500M',
                    stock:false,
                    choosed:false,
                    price:''
                },{
                    id:'',
                    perValue:50,
                    flowValue:'1G',
                    stock:false,
                    choosed:false,
                    price:''
                }
            ],
            getFaceValueForGasRecharge:[   // 获取中石化面值规格
                {
                    productCode:'',
                    faceValue:100,
                    productName:'100元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false

                },{
                    productCode:'',
                    faceValue:200,
                    productName:'200元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false
                },{

                    productCode:'',
                    faceValue:500,
                    productName:'500元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false
                },{

                    productCode:'',
                    faceValue:1000,
                    productName:'1000元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false
                },{

                    productCode:'',
                    faceValue:5000,
                    productName:'5000元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false
                },{

                    productCode:'',
                    faceValue:1,
                    productName:'',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:true
                }
            ],
            getFaceValueForWebGasRecharge:[   // 获取加油卡面值规格:非任意充
                {
                    productCode:'',
                    faceValue:50,
                    productName:'50元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false,
                    vName:'50元',
                    price:'',
                    salePrice:'',
                    purNum:''

                },{
                    productCode:'',
                    faceValue:100,
                    productName:'100元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false,
                    vName:'100元',
                    price:'',
                    salePrice:'',
                    purNum:''
                },{

                    productCode:'',
                    faceValue:500,
                    productName:'500元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false,
                    vName:'500元',
                    price:'',
                    salePrice:'',
                    purNum:''
                },{

                    productCode:'',
                    faceValue:1000,
                    productName:'1000元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false,
                    vName:'1000元',
                    price:'',
                    salePrice:'',
                    purNum:''
                },{

                    productCode:'',
                    faceValue:5000,
                    productName:'5000元',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:false,
                    vName:'5000元',
                    price:'',
                    salePrice:'',
                    purNum:''
                }
            ],
            getFaceValueForWebOneGasRecharge:[   // 获取加油卡面值规格:任意充
                {
                    productCode:'',
                    faceValue:1,
                    productName:'',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:true,
                    vName:'任意充',
                    price:'',
                    salePrice:'',
                    purNum:''
                }
            ],
            chargeGameInfo:{

            },
            chargeGiftCardInfo:{

            },
            chargeVipInfo:{

            },
            getLettersList:[
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
            ]
        }
    }]);
});

