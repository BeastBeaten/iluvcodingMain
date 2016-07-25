/**
 * Created by lili on 16/1/12.
 */
'use strict';

define(['angular'], function(angular) {

    var productService = angular.module('openwebApp.service.product.ccb.productModule', []);

    productService.factory('ProductServiceForCCB',[function(){
        return {
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
                    faceValue:1,
                    productName:'',
                    choosed:false,
                    stock:false,
                    isOneFaceValue:true
                }
            ]
        }
    }]);
});