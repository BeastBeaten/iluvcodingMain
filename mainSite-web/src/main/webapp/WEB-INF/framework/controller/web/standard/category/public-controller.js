'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.web.controller.public.publicModule',[]);

    app.controller('PublicRechargeCtrl',['$rootScope','$scope','$ionicModal','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','OrderService','PayService','MemberService','MenuService','CommonService',
        function($rootScope,$scope,$ionicModal,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,OrderService,PayService,MemberService,MenuService,CommonService){
            $scope.data = {
                provinceId:'',
                useCityId:'',
                payProjectId:'',
                peUserName:'',
                peAMT:'',
                billButton:'显示账单',
                getBillFlag:false,
                isShowDesc:false,
                orderType:'PUBLICRECHARGE',
                cardId:'',
                code:$rootScope.code,
                perValue:'',
                faceValue:'',
                provinceName:'',
                cityId:'',
                projectTypeId:'',
                cardName:'',
                useCity:'',
                payUnitName:'',
                supItemTplId:'',
                payMentDay:''
            };
            $scope.errorData = {
                errorMsg:''
            };

            $scope.showDesc = function(){
                $scope.data.isShowDesc = !$scope.data.isShowDesc;
            };

            ProductService.getWebProvinceList($scope.data, function(data){
                if("success" == data.message && 0 < data.data.length){
                    $scope.provinceList = data.data;
                }else{
                    $scope.provinceList = '';
                }
            });

            $scope.initData = function(){
                $scope.errorData.errorMsg = '';
                $scope.data.billButton = '显示账单';
                $scope.data.peUserName = '';
                $scope.data.peAMT = '';
            }

            $scope.chooseProvince = function(){
                $scope.cityList = '';
                $scope.payProjectList = '';
                $scope.payUnitList = '';
                $scope.initData();
                if(!Tools.prototype.isEmpty($scope.data.provinceId)){
                    ProductService.getWebCityList($scope.data,function(data){
                        if("success" == data.message && 0 < data.data.length){
                            $scope.cityList = data.data;
                            if(!Tools.prototype.isEmpty($scope.data.useCityId)){
                                $scope.chooseCity();
                            }
                        }else{
                            $scope.cityList = '';
                        }
                    });
                    angular.forEach($scope.provinceList,function(item,key){
                        if($scope.data.provinceId == item.provinceId){
                            $scope.data.provinceName = item.provinceName;
                        }
                    });
                }
            }

            $scope.chooseCity = function(){
                $scope.payProjectList = '';
                $scope.payUnitList = '';
                $scope.initData();
                if(!Tools.prototype.isEmpty($scope.data.cityId)){
                    $scope.data.useCityId=$scope.data.cityId;
                    ProductService.getWebPayProjectList($scope.data,function(data){
                        if("success" == data.message && 0 < data.data.length){
                            $scope.payProjectList = data.data;
                            angular.forEach($scope.payProjectList,function(item,key){
                                item.choosed = false;
                            });
                        }else{
                            $scope.payProjectList = '';
                            $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_stock;
                        }
                    });
                    angular.forEach($scope.cityList,function(item,key){
                        if($scope.data.cityId == item.useCityId){
                            $scope.data.useCity = item.useCity;
                        }
                    });
                }
            }

            $scope.choosePayProject = function(project){
                $scope.payUnitList = '';
                $scope.initData();
                if(!Tools.prototype.isEmpty($scope.data.useCityId) && Tools.prototype.isEmpty($scope.payProjectList)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_stock;
                    return;
                }
                var tempId = Tools.prototype.isEmpty(project) ? $scope.data.payProjectId : project.payProjectId;
                if(Tools.prototype.isEmpty(tempId)){
                    return;
                }
                if (project.payProjectName=='水费') {
                    $scope.data.projectTypeId='c2670';
                } else if (project.payProjectName=='电费') {
                    $scope.data.projectTypeId='c2680';
                } else if (project.payProjectName=='燃气费') {
                    $scope.data.projectTypeId='c2681';
                }
                angular.forEach($scope.payProjectList,function(item,key){
                    if(tempId == item.payProjectId){
                        item.choosed = true;
                        $scope.data.payProjectId=item.payProjectId;
                        ProductService.getWebPayUnitList($scope.data,function(data){
                            if("success" == data.message && 0 < data.data.length){
                                $scope.payUnitList = data.data;
                            }else{
                                $scope.payUnitList = '';
                            }
                        });
                    }else{
                        item.choosed = false;
                    }
                });
            }

            $scope.choosePayUnit = function(){
                $scope.initData();
                if(!Tools.prototype.isEmpty($scope.data.payUnitId)){
                    ProductService.queryWebPublicInfo($scope.data,function(data){
                        if("success" == data.message && 0 < data.data.length){
                            $scope.data.cardId = data.data[0].outProductId;
                            $scope.data.supItemTplId = data.data[0].supItemTplId;
                            $scope.data.cardName=data.data[0].name;
                        }else{
                            $scope.data.cardId = '';
                            $scope.data.boardId = '';
                            $scope.data.supItemTplId = '';
                            $scope.data.cardName = '';
                            $scope.data.payUnitId='';
                            $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_product;
                        }
                    });
                    angular.forEach($scope.payUnitList,function(item,key){
                        if($scope.data.payUnitId == item.payUnitId){
                            $scope.data.payUnitName = item.payUnitName;
                        }
                    });
                }
            }

            $scope.checkPebarCd = function(){
                if(!$rootScope.commonUtils.isEmpty($scope.data.pebarCd)){
                    $scope.errorData.errorMsg = '';
                    $scope.data.billButton = '显示账单';
                }
            }

            $scope.validForm=function(){
                if(Tools.prototype.isEmpty($scope.data.provinceId)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.publicMsg.no_province;
                    return false;
                }
                if(Tools.prototype.isEmpty($scope.data.useCityId)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.publicMsg.no_city;
                    return false;
                }
                if(Tools.prototype.isEmpty($scope.data.payProjectId)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.publicMsg.no_pay_project;
                    return false;
                }
                if(Tools.prototype.isEmpty($scope.data.payUnitId)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.publicMsg.no_pay_unit;
                    return false;
                }
                if(Tools.prototype.isEmpty($scope.data.pebarCd)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.publicMsg.no_pebarCd;
                    return false;
                }
                return true;
            }

            $scope.getBill = function(){
                if($scope.validForm()){
                    $scope.data.getBillFlag = true;
                    if(Tools.prototype.isEmpty($scope.data.cardId)){
                        ProductService.queryWebPublicInfo($scope.data,function(data){
                            if("success" == data.message && 0 < data.data.length){
                                $scope.data.cardId = data.data[0].outProductId;
                                $scope.data.supItemTplId = data.data[0].supItemTplId;
                                $scope.data.cardName=data.data[0].name;
                            }else{
                                $scope.data.cardId = '';
                                $scope.data.boardId = '';
                                $scope.data.supItemTplId = '';
                                $scope.data.cardName = '';
                                $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_product;
                            }
                        });
                    }
                    if(Tools.prototype.isEmpty($scope.data.cardId)){
                        $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_product;
                    } else {
                        ProductService.getWebArrearsInfos($scope.data,function(data){
                            if("success" == data.message&&0<data.data.length){
                                if(2 <= data.data[0].arrearsInfo.split(";").length){
                                    $scope.data.peUserName = data.data[0].arrearsInfo.split(";")[0];
                                    $scope.data.peAMT = data.data[0].arrearsInfo.split(";")[1];
                                    $scope.data.contractNo = data.data[0].arrearsInfo.split(";")[4];
                                    $scope.errorData.errorMsg='';
                                    $scope.data.payMentDay=data.data[0].arrearsInfo.split(";")[2];
                                }else{
                                    $scope.data.peUserName = '';
                                    $scope.data.peAMT = '';
                                    $scope.data.payMentDay='';
                                    $scope.errorData.errorMsg = $rootScope.errorMsg.publicMsg.no_bill;
                                }
                            }else{
                                $scope.data.peUserName = '';
                                $scope.data.peAMT = '';
                                $scope.errorData.errorMsg = $rootScope.errorMsg.publicMsg.no_bill;
                            }
                            $scope.data.billButton = '重新查询';
                            $scope.data.getBillFlag = false;
                        });
                    }
                }
            }

            $scope.submit = function(){
                if(!$scope.validForm()){
                    return false;
                }
                if(Tools.prototype.isEmpty($scope.data.cardId)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.publicMsg.no_stock;
                    return false;
                }
                if(Tools.prototype.isEmpty($scope.data.peAMT)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.publicMsg.no_bill;
                    return false;
                }
                if(0 >= parseFloat($scope.data.peAMT)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.publicMsg.no_owed;
                    return false;
                }
                var saleOrderFrom = {
                    cardId:$scope.data.cardId,
                    boardId:$scope.data.boardId,
                    gameCount:$scope.data.pebarCd,
                    prvcin:$scope.data.provinceId,
                    cityin:$scope.data.useCityId,
                    inPrice:$scope.data.peAMT,
                    cash:$scope.data.peAMT,
                    payUnitId:$scope.data.payUnitId,
                    contractNo:$scope.data.contractNo,
                    cardName:$scope.data.cardName,
                    searchRoute:'publicQuery',
                    code:$scope.data.code,
                    orderType:$scope.data.orderType,
                    cardNum:$scope.data.peAMT,
                    projectTypeId:$scope.data.projectTypeId,
                    useCity:$scope.data.useCity,
                    provinceName:$scope.data.provinceName,
                    payProjectId:$scope.data.payProjectId,
                    payUnitName:$scope.data.payUnitName,
                    supItemTplId:$scope.data.supItemTplId,
                    perValue:'1',
                    billId:'',
                    cardNameTemp:$scope.data.cardName,
                    payModeId:'2',
                    payMentDay:$scope.data.payMentDay
                };
                ProductService.checkCanOrder({cardId:$scope.data.cardId,code:$rootScope.code},function(data){
                    if("success" == data.message){
                        $scope.errorData.errorMsg = '';
                        $scope.data.gameCount=$scope.data.pebarCd;
                        // 生成销售订单
                        OrderService.takeWebSaleOrder(saleOrderFrom,function (data1) {
                            // 下销售单成功
                            if("success" == data1.message && 0 < data1.data.length) {
                                $scope.data.billId = data1.data[0].billId;
                                saleOrderFrom.billId=data1.data[0].billId;
                                // 跳转支付确认页面
                                $state.go("orderpay",{orderForm:Tools.prototype.putParams(saleOrderFrom)});
                            }
                        });
                    }else{
                        $scope.errorData.errorMsg = $rootScope.errorMsg.commonMsg.no_stock;
                    }
                });
            }

        }]);

    app.controller('PublicQueryCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$compile', '$cookieStore', 'MessageService', 'ProductService', 'OrderService', 'PayService', 'MenuService',
        function ($rootScope, $scope, $state, $stateParams, $compile, $cookieStore, MessageService, ProductService, OrderService, PayService, MenuService) {
            $scope.rePay = function(index){
                $state.go('orderpay',{orderForm:Tools.prototype.putParams($scope.rePayFormList[index])});
            };
            $scope.orderForm = {
                tid:$stateParams.tid,
                rechargeAccount:''
            };
            $scope.errorData = {
                errorMsg:''
            };
            $scope.rePayFormList = [];
            if(!Tools.prototype.isEmpty($scope.orderForm.tid)){
                $scope.orderForm.searchFlag = true;
            }else{
                $scope.orderForm.searchFlag = false;
            }
            $scope.search = function(){
                if(!Tools.prototype.isEmpty($scope.errorData.errorMsg)){
                    return false;
                }
                if(Tools.prototype.isEmpty($scope.orderForm.rechargeAccount)){
                    $scope.errorData.errorMsg = $rootScope.errorMsg.searchMsg.no_account;
                }else{
                    $("#dataTable").refreshData();
                    $scope.orderForm.searchFlag = true;
                }
            }
            $scope.reset = function(){
                $scope.orderForm = {
                    tid:'',
                    rechargeAccount:'',
                    searchFlag:false
                };
                $scope.errorData = {
                    errorMsg:''
                };
                $("#dataTable").refreshData();
            }

            $scope.checkAccount = function(){
                if(!Tools.prototype.isEmpty($scope.orderForm.rechargeAccount)){
                    $scope.errorData.errorMsg = '';
                }
            }

            $("#dataTable").dataTables({
                "sDom":'<"top"i>rt<"bottom"lp>',
                "bSort":false,
                "bLengthChange":false,
                "iDisplayLength":5,
                "bProcessing":false,
                "sAjaxSource":"/web/orderList",
                "fnServerData":function(sSource,aoData,fnCallback){
                    if(!Tools.prototype.isEmpty($scope.orderForm.tid) || !Tools.prototype.isEmpty($scope.orderForm.rechargeAccount)){
                        var temp = null;
                        if(!Tools.prototype.isEmpty($scope.orderForm.rechargeAccount)){
                            temp = [{name:"rechargeAccount",value:$scope.orderForm.rechargeAccount},{name:'code',value:$rootScope.code}];
                        }else if(!$rootScope.commonUtils.isEmpty($scope.orderForm.tid) ){
                            temp = [{name:"tid",value:$scope.orderForm.tid},{name:'code',value:$rootScope.code}];
                        }
                        var postData = aoData.concat(temp);
                        $.post(sSource,postData,function(json){
                            fnCallback(json.data);
                        },"json");
                    }else{
                        var returnData = eval('({"iTotalDisplayRecords":0,"iTotalRecords":0,"aaData":[]})');
                        fnCallback(returnData);
                    }
                },
                "aoColumns":[{
                    "mDataProp":"billId"
                },{
                    "mDataProp":"orderTime"
                },{
                    "mDataProp":"cardName"
                },{
                    "mDataProp":"cardNum"
                },{
                    "mDataProp":"gameCount"
                },{
                    "mDataProp":"cash"
                },{
                    "mDataProp":function(aData,type,val){
                        val = '';
                        return val;
                    }
                }],
                "fnRowCallback":function(nRow,aData,iDisplayIndex,iDisplayIndexFull){
                    var tds = $(nRow).find('td');
                    var orderState = '';
                    var orderStateElement;
                    if(0 == iDisplayIndex){
                        $scope.rePayFormList = [];
                    }
                    tds = $(nRow).find('td');
                    if(0 == aData.billStat){
                        $scope.rePayForm = {
                            cardName:aData.cardName,
                            orderTime:aData.orderTime,
                            cash:aData.cash,
                            billId:aData.billId,
                            gameCount:aData.gameCount,
                            battleAccount:aData.battleAccount,
                            telpho:aData.telpho,
                            email:aData.email,
                            cardNum:aData.cardNum,
                            searchRoute:'publicQuery',
                            facePric:aData.facePric
                        };
                        $scope.rePayFormList.push($scope.rePayForm);
                        orderState = '<a href="javascript:void(0)" ng-click = "rePay('+($scope.rePayFormList.length-1)+')">待付款</a>';
                    }else{
                        if(1 == aData.already){
                            orderState = '<span>成功</span>';
                        }else if (0 == aData.already){
                            orderState = '<span>充值中</span>';
                        }else if (9 == aData.already){
                            orderState = '<span>成功退款</span>';
                        }
                        else{
                            orderState = '<span>失败</span>';
                        }
                    }

                    orderStateElement = $compile(orderState)($scope);
                    angular.element(tds[tds.length-1]).append(orderStateElement);

                },
                "oLanguage": {
                    "sLengthMenu": "每页显示 _MENU_ 笔",
                    "sInfo": "当前第 _START_ - _END_ 笔　共计 _TOTAL_ 笔"
                }
            });
        }]);
});
