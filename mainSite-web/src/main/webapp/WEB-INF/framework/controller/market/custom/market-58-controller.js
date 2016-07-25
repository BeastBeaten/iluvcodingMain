/**
 * Created by lili on 16/6/20.
 */

'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.market58.market58Module',[]);

    app.controller('IndexCtrl',['$rootScope','$scope','$state','$stateParams','$cookieStore','$interval','dialog','MarketServiceFor58','$ionicModal',
        function($rootScope,$scope,$state,$stateParams,$cookieStore,$interval,dialog,MarketServiceFor58,$ionicModal){

            $scope.marketBillForm = {
                userId:$rootScope.userLoginId,
                batchId:'',
                baseValue:'',
                code:'58',
                memberId:$rootScope.userLoginId,
                category:''
            };

            $scope.marketBills = $rootScope.initMarketBills;
            $scope.isSetAlreadyGet = false;

            $scope.msg = {
                errorMsg:''
            };

            $ionicModal.fromTemplateUrl('../../../partials/market/custom/58/prompt.html', {
                scope: $scope,
                focusFirstInput: false
            }).then(function(modal) {
                $scope.model = modal;
            });

            // 获取优惠券余量
            MarketServiceFor58.getMarketBatchInfo(function(data){
                if("success" == data.message){
                    angular.forEach(data.data,function(item,key){
                        angular.forEach($scope.marketBills,function(item2,key){
                            if(item.baseValue == item2.baseValue){
                                item2.leftNum = parseInt(item.leftMoney) / parseInt(item.baseValue);
                            }
                        });
                    });
                }
            })

            $scope.addMarketBill = function(marketInfo){
                $rootScope.curRouter = 'marketIndex';
                $scope.marketBillForm.baseValue = marketInfo.baseValue;
                $scope.marketBillForm.userId = $scope.marketBillForm.memberId;
                $scope.marketBillForm.category = marketInfo.category;
                MarketServiceFor58.addMarketBillFor58($scope.marketBillForm,function(data){
                    if("success" == data.message){
                        // 跳转58流量购买页面
                        if(marketInfo.category == '3A'){
                            location.href = 'http://web.yiqianlian.com/mobile/mobilecommon/58?menu=flowrecharge#/flowrecharge';
                        }else if (marketInfo.category == '5'){
                            location.href = 'http://web.yiqianlian.com/mobile/mobilecommon/58?menu=gasrecharge#/gasrecharge';
                        }

                    }else if ("hasbill" == data.message){
                        $scope.msg.errorMsg = '您已抢过该券，券抢多了会变胖哦';
                        $scope.isSetAlreadyGet = true;
                        $scope.model.show();
                    }else{
                        $scope.msg.errorMsg = '没有抢到';
                        $scope.model.show();
                    }
                })
            }

            $scope.confirm = function(){
                if($scope.isSetAlreadyGet){
                    angular.forEach($scope.marketBills,function(item,key){
                        if(item.baseValue == $scope.marketBillForm.baseValue){
                            item.alreadyGet = true;
                        }
                    });
                }
                $scope.model.hide();
            }

            $scope.getMarketBill = function(){
                $state.go("marketbills");
            }

            if(!Tools.prototype.isEmpty($rootScope.lastUrl)){
                $scope.marketBillForm = $rootScope.lastForm;
                $rootScope.lastUrl = '';
                $scope.addMarketBill($scope.marketBillForm);
            }

            $scope.getMarkBillsByUser = function(){
                if(!Tools.prototype.isEmpty($scope.marketBillForm.memberId)){
                    MarketServiceFor58.getMarketBillsByUser($scope.marketBillForm.memberId, function(data){
                       if("success" == data.message) {
                           angular.forEach(data.data,function(item,key){
                               angular.forEach($scope.marketBills,function(item2,key){
                                   if(item.cash == item2.baseValue){
                                       item2.alreadyGet = true;
                                   }
                               });
                           });
                       }
                    });
                }
            }
            // 查询用户已领取的优惠券
            $scope.getMarkBillsByUser();


        }]);

    app.controller('MarketBillCtrl',['$rootScope','$scope','$state','$stateParams','$cookieStore','$interval','dialog','MarketServiceFor58','$ionicModal',
        function($rootScope,$scope,$state,$stateParams,$cookieStore,$interval,dialog,MarketServiceFor58,$ionicModal){

            $scope.memberId = $rootScope.userLoginId;

            $scope.initMarketBills = function(){
                if(!Tools.prototype.isEmpty($scope.marketBills)){
                    angular.forEach($scope.marketBills,function(item,key){
                        if(!Tools.prototype.isEmpty($rootScope.marketInfo.billId) && item.billId == $rootScope.marketInfo.billId){
                            item.choosed = true;
                        }else{
                            item.choosed = false;
                        }
                        if(item.cash == '10'){
                            item.desc = '限1G移动流量使用';
                        }else if (item.cash == '5'){
                            item.desc = '限500M移动流量使用';
                        }else if (item.cash == '4'){
                            item.desc = '限150M移动流量使用';
                        }else if (item.cash == '3'){
                            item.desc = '限500面值使用';
                        }
                        if("0" == item.consumerState && '1' == item.state){
                            item.isActive = true;
                        }else{
                            item.isActive = false;
                        }

                    });
                }else{
                    $scope.marketBills = '';
                }
            }

            $scope.getMarketBills = function(){
                $rootScope.curRouter = 'marketbills';
                MarketServiceFor58.getMarketBillsByUser($scope.memberId,function(data){
                    if("success" == data.message){
                        $scope.marketBills = data.data;
                    }
                    $scope.initMarketBills();
                });
                $rootScope.lastForm = '';
                $rootScope.lastUrl = '';

            }
            $scope.cancel = function(){
                $state.go("marketIndex");
            }

            $ionicModal.fromTemplateUrl('../../../partials/mobile/standard/common/market-desc-standard.html', {
                scope: $scope,
                focusFirstInput: false
            }).then(function(modal) {
                $scope.model = modal;
            });

            $scope.showRules = function(){
                $scope.model.show();
            }

            $scope.agreeRules = function(){
                $scope.model.hide();
            }

             $scope.getMarketBills();



        }]);
});