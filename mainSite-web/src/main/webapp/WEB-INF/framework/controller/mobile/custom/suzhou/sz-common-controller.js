/**
 * Created by lili on 16/1/13.
 */
'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.common.commonModule',[]);

    app.controller('OrderQueryCtrl',['$rootScope','$scope','$state','$stateParams','OrderService','PayService',
        'MessageService','dialog','pagination','OrderServiceForSZ','MemberServiceForSZ',
        function($rootScope,$scope,$state,$stateParams,OrderService,
                 PayService,MessageService,dialog,pagination,OrderServiceForSZ,MemberServiceForSZ){
       /** if('remote' == $stateParams.type && Tools.prototype.isEmpty($rootScope.userLoginId)){
            $state.go('login');
            return;
        }  **/
           // 调用第三方控件获取用户信息
       //ThirdApp.getMobileNo("getCousterMsg");
       $scope.data = {
           queryType:'remote',
           memberId:$rootScope.userLoginId,
           code:$rootScope.code,
           billState:'success',
           already:'success',
           queryFlag:'1',
           iDisplayStart:0
       };

        $scope.initMonth =function(){
            $scope.dateList = [];
            var date = new Date();
            var date2 = null;
            for(var i = 0; i < 6;i++ ){
                var temp = {};
                date2 = new Date(date.getFullYear(),date.getMonth()+1-i,0);
                temp.year=date2.getFullYear();
                temp.month=date2.getMonth();
                $scope.dateList.push(temp);
            }
            $scope.data.startYear = $scope.dateList[0].year;
            $scope.data.startMonth = parseInt($scope.dateList[0].month);
        }

        $scope.initMonth();


        var pagination = new pagination($scope);

        $scope.dispayLength = 15;

        $scope.pageNo = 1;
        $scope.allOrders = [];
        $scope.totalCount = -1;

        $scope.isRequired = false;

        $scope.isLoading = true;

        $scope.queryMore = function () {
            //pagination.loadMore($scope.allOrders,$scope.allOrders.length);
            if($scope.isLoading){
                if($scope.isRequired) {
                    pagination.loadMore($scope.allOrders,$scope.allOrders.length);
                } else {
                    ///if(Tools.prototype.isEmpty($scope.data.memberId)) {
                       // var userMsg = {PHONE_NUMBER:"15996281799",LOGIN_STATUS:1}//document.getElementById("content").value;
                    //alert(userMsg);
                           // userMsg = JSON.parse(userMsg);
                            // alert("userMsg:"+ userMsg + ",userMsg.PHONE_NUMBER:" + userMsg.PHONE_NUMBER);
                            if (!Tools.prototype.isEmpty($rootScope.phoneNo)) {
                                $scope.marketUserForm = {
                                    mobileNo : $rootScope.phoneNo,
                                    randomId : '',
                                    code: $rootScope.code
                                };
                                MemberServiceForSZ.login($scope.marketUserForm, function(data){
                                    if('success' == data.message){
                                        if(data.data.length > 0){
                                            $rootScope.userLoginId = data.data[0];
                                            Tools.prototype.saveCookie($rootScope.code+'randomId',null,{path:'/'});
                                            Tools.prototype.saveCookie($rootScope.code+'randomId',$rootScope.userLoginId,{expires:30,path:'/'});
                                        }
                                        $scope.data.dateString = JSON.stringify($scope.dateList);
                                        $scope.data.memberId = $rootScope.userLoginId;
                                        OrderServiceForSZ.queryOrders($scope.data,function(data){
                                            // 是否已经请求过了
                                            $scope.isRequired = true;
                                            if(data.message == 'success' && data.data.length > 0){
                                                $scope.allOrders = data.data;
                                                $scope.totalCount = data.data.length;
                                                pagination.loadMore($scope.allOrders,$scope.allOrders.length);
                                            }else{
                                                $scope.isLoading = false;
                                                $scope.totalCount = 0;
                                            }
                                        });
                                    }else{
                                        $scope.isLoading = false;
                                        $scope.totalCount = 0;
                                        $scope.login();
                                    }
                                });
                            }else{
                                $scope.isLoading = false;
                                $scope.totalCount = 0;
                                $scope.login();
                            }
                   // }else{
                   //     $scope.login();
                   // }

                }

                }
        };
        $scope.moreDataCanBeLoaded = function () {
            if ($scope.totalCount == 0) {
                return 2;
            }
            if (pagination.isLoading) {
                return 0;
            }
            if (!pagination.isAllLoad()) {
                return 1;
            }
            if (pagination.isAllLoad()) {
                return -1;
            }

        };

        $scope.formatGameCount = function(gameCount){
            return gameCount.replace(/^\d{3}(?=\d)|\d{4}(?=\d)/g, '$& ');
        }

        $scope.login = function(){//调用侧滑页
            ThirdApp.isLogin();

            //alert("to login");
        }


        }]);

});
