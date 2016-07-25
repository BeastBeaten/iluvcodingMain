/**
 * Created by lili on 16/1/12.
 */
'use strict';

define(['angular'], function(angular) {

    var productService = angular.module('openwebApp.service.product.suzhou.productModule', []);

    productService.factory('ProductServiceForSZ',[function(){
        return {
            getPhoneFaceValueList:[
               {
                    id:'',
                    value:'30',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:'售价29.94元',
                    hasDiscount:false
                },{
                    id:'',
                    value:'50',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:'售价49.9元',
                    hasDiscount:false
                },{
                    id:'',
                    value:'100',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:'售价99.8元',
                    hasDiscount:false
                },{
                    id:'',
                    value:'200',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:'售价199.6元',
                    hasDiscount:false
                },{
                    id:'',
                    value:'300',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:'售价299.4元',
                    hasDiscount:false
                },{
                    id:'',
                    value:'500',
                    stock:false,
                    choosed:false,
                    boardId:'',
                    price:'售价499元',
                    hasDiscount:false
                }

            ]
        }
    }]);
});