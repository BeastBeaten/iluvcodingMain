/**
 * Created by lili on 16/1/15.
 */
'use strict';

define(['angular'], function(angular) {

    var orderService = angular.module('openwebApp.service.order.suzhou.orderModule', []);

    orderService.factory('OrderServiceForSZ',['$http', "$state",'$rootScope','RequestUtil', function($http, $state, $rootScope,RequestUtil){
        var getRandomId = function(){
            return Math.random().toString(36).substr(2);
        }
        return {
            queryOrders:function(QueryForm,callback){
                return RequestUtil.request('/szcustom/queryOrderInfo?randomId='+getRandomId(), QueryForm, callback);
            },
            flush:function(flag,callback){
                return RequestUtil.request('/szcustom/flush', flag, callback, '');
            },
            takeSaleOrderAndPay:function(SaleOrderForm,callback){
                return RequestUtil.request('/szcustom/takeSaleOrderAndPay?randomId='+getRandomId(), SaleOrderForm, callback);
            }
        }
    }]);


    orderService.factory('pagination',['$ionicLoading', 'OrderServiceForSZ', 'dialog', function ($ionicLoading, OrderServiceForSZ, dialog) {
        var paination = function (scope, pageNo, pageSize) {
            this.scope = scope;
            this.pageNo = pageNo || 0;
            this.pageSize = pageSize || 15;
            this.totalCount = -1;
            this.isLoading = false;
            this.param = {};
            this.scope.itemslist = scope.itemslist || [];
            this.currentItemLength = 0;
        };
        paination.prototype = {
            loadMore: function (allorders, ordersCount) {
                var self = this;
                if (this.canBeLoad()) {
                    var timeout = 500;
                    //dialog.showTip();
                    self.totalCount = ordersCount;
                    self.isLoading = true;
                    var start = new Date().getTime();

                    if(self.totalCount == 0){
                        self.isLoading = false;
                        return;
                    }else{
                        self.totalCount = ordersCount;
                        self.pageNo++;

                        OrderServiceForSZ.flush('1',function(data){
                            var end = new Date().getTime();
                            setTimeout(function () {
                                self.scope.itemslist = allorders.slice(0,self.pageNo * self.pageSize);
                                this.currentItemLength = self.scope.itemslist.length;

                            }, (end - start) > timeout ? 0 : timeout);
                        }).finally(function () {
                            var end = new Date().getTime();
                            setTimeout(function () {
                                self.scope.$broadcast('scroll.infiniteScrollComplete');
                                // self.loadComplete();
                                //dialog.hideTip();
                                self.isLoading = false;
                            }, (end - start) > timeout ? 0 : timeout);

                        });



                    }
                }
                else {
                    self.scope.$broadcast('scroll.infiniteScrollComplete');
                }
            },

            canBeLoad: function () {
                if (this.isLoading) {  //正在加载, 不能再次加载, 等待
                    return false;
                }
                else {
                    return this.isAllLoad();
                }
            },

            isAllLoad: function () {
                //var pageNo = this.pageNo + 1;
                //var start = pageNo * this.pageSize;	//数量 + 1
                var r = (this.scope.itemslist.length < this.totalCount || this.totalCount == -1 || this.totalCount == 0);
                if (!r) {
                    this.scope.$broadcast('pagination.loadAllComplete', this);
                }
                return r;
            },

            loadComplete: function () {
                this.scope.$broadcast('pagination.loadComplete', this);
                this.isAllLoad(); //检测是否全部加载完
            }
        };
        return paination
    }])

});