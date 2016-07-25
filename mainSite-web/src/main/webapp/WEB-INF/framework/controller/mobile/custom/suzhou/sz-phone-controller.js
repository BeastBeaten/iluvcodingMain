/**
 * Created by lili on 16/1/11.
 */
'use strict';
define(['angular'],function(angular){

    var app  = angular.module('openwebApp.controller.phone.phoneModule',[]);

    app.controller('PhoneRechargeCtrl',['$rootScope','$ionicModal','$scope','$state','$stateParams','$compile','$cookieStore','MessageService','ProductService','PayService','MenuService','ProductServiceForSZ','OrderServiceForSZ','MemberServiceForSZ',
        function($rootScope,$ionicModal,$scope,$state,$stateParams,$compile,$cookieStore,MessageService,ProductService,PayService,MenuService,ProductServiceForSZ,OrderServiceForSZ,MemberServiceForSZ) {
            var copyright = $compile(angular.element('<'+$rootScope.userData.copyright+'></'+$rootScope.userData.copyright+'>'))($scope);
            $("#copyright").html(copyright);
            $rootScope.menu = 'phonerecharge';
            $rootScope.curRouter = $rootScope.menu;
            $rootScope.rechargeDesc =  MenuService.phonerecharge.desc;
            //var phoneNo = $stateParams.phoneNo;

            // 调用第三方控件获取用户信息
            //ThirdApp.getMobileNo("getCousterMsg");
            $scope.data={
                gameCount:$rootScope.phoneNo,
                phoneName:'',
                cash:'',
                cityin:'',
                mobileType:'',
                hasCookie:false,
                showCookie:false,
                cookieData:''
            }

            //提示蒙层
            $ionicModal.fromTemplateUrl('../../../partials/mobile/custom/suzhou/prompt.html', {
                scope: $scope,
                focusFirstInput: false
            }).then(function(modal) {
                $scope.model = modal;
            });

            $scope.cancle = function(){
                $scope.model.hide();
                //$scope.clearFaceValue();
                //$scope.data.isFirstInit = true;

            }

            $scope.payList = $rootScope.userData.payList;

            $scope.orderForm = {
                orderType:'PHONERECHARGE',
                cardNum:'1',
                cardType:0,
                cardId:'',
                memberId:$rootScope.userLoginId,
                platform:'Mobile',
                code:$rootScope.code
            }

            $scope.errorData = {
                phoneNoError:'',
                errorMsg:''
            }

            $scope.cookieNos = [];
//        Tools.prototype.saveCookie("phoneNoes","18918133410;15996281799",{expires:30});
            $scope.cookieNos = Tools.prototype.saveCookie("phoneNos");
            if(Tools.prototype.isEmpty($scope.cookieNos)){
                $scope.data.hasCookie = false;
                $scope.phoneNoes = '';
            }else{
                $scope.data.hasCookie = true;
                $scope.phoneNoes = JSON.parse('['+ $scope.cookieNos + ']');
                //$scope.phoneNoes = cookieNoes.split(";");
            }

            $scope.showCookie = function(){
                $scope.data.showCookie = !$scope.data.showCookie;
            }

            $scope.clearCookie = function(){
                Tools.prototype.saveCookie("phoneNos",null);
                $scope.phoneNoes = '';
                $scope.data.hasCookie = false;
                $scope.data.showCookie = false;
            }

            $scope.deleteOneInCookie = function(phoneNo){
                phoneNo = phoneNo.replace(/^\d{3}(?=\d)|\d{4}(?=\d)/g, '$& ');
                if(!Tools.prototype.isEmpty($scope.phoneNoes)){
                    //$scope.phoneNoes.remove(phoneNo);
                    var index = -1;
                    for(var i=0;i<$scope.phoneNoes.length;i++){
                        if(phoneNo == $scope.phoneNoes[i].phoneNo){
                           index = i;
                        }
                    }
                    if(index > -1){
                        $scope.phoneNoes.splice(index,1);
                        if($scope.phoneNoes.length > 0){
                            $scope.cookieNos = '';
                            for(var i = 0; i< $scope.phoneNoes.length; i++){
                                var temp = {phoneNo:$scope.phoneNoes[i].phoneNo, phoneName:$scope.phoneNoes[i].phoneName};
                                if(i == $scope.phoneNoes.length - 1){
                                    $scope.cookieNos += JSON.stringify(temp);
                                }else{
                                    $scope.cookieNos += JSON.stringify(temp) + ",";
                                }
                            }
                            Tools.prototype.saveCookie("phoneNos",null);
                            $rootScope.saveCookies("phoneNos", $scope.cookieNos);
                            $('#gameCount').focus();
                        }

                    }
                }
            }

            $scope.clearError = function(type){
                if('1' == type){
                    //focus
                    $('#gameCount')[0].placeholder="";
                    $scope.data.showCookie = true;
                }else if('2' == type){
                    //blur
                    /**if(Tools.prototype.isEmpty($scope.data.gameCount)){
                        $('#gameCount')[0].placeholder="请输入或选择手机号码";
                    }else if(!Tools.prototype.isMobileNo($scope.data.gameCount.replace(/\s/g, '')) || Tools.prototype.is170MobileNo($scope.data.gameCount.replace(/\s/g, ''))){
                        $scope.errorData.phoneNoError="号码有误，请重新输入";
                        $('#gameCount').focus();
                    }**/
                    $scope.data.showCookie = false;
                   // $scope.checkPhoneNo(1);
                }else if('3' == type){
                    //clear phoneno
                    $scope.data.gameCount = '';
                    $scope.data.showCookie = false;
                    $scope.errorData.phoneNoError='';
                    $scope.errorData.errorMsg = '';
                    $scope.data.mobileType = '';
                    $scope.data.cityin = '';
                    $scope.clearFaceValue();
                }else if('4' == type){
                    //clear msg
                    $scope.errorData.phoneNoError='';
                    $scope.errorData.errorMsg = '';
                }
            }

            $scope.clearFaceValue = function(){
                $scope.orderForm.cardId = '';
                $scope.orderForm.perValue = '';
                angular.forEach($scope.faceList,function(item,key){
                    item.id = '';
                    item.choosed = false;
                    item.stock = false;
                    item.price = '';
                });
            }

            $scope.checkPhoneNo = function(type){
                //$scope.data.gameCount = $scope.data.gameCount.replace(/\D/g,'');
                $scope.clearError('4');
               // if($scope.data.gameCount.length < 13){
                if(/android/i.test(navigator.userAgent)){

                    if($scope.data.gameCount.length >= 11){
                        $scope.data.gameCount = $scope.data.gameCount.substr(0,11);
                    }
                }else{
                    if(!Tools.prototype.isEmpty($scope.data.gameCount)){
                        $scope.data.gameCount = $scope.data.gameCount.replace(/^\d{3}(?=\d)|\d{4}(?=\d)/g, '$& ');
                    }

                    //}
                    if($scope.data.gameCount.length >= 13){
                        $scope.data.gameCount = $scope.data.gameCount.substr(0,13);
                    }
                }

                //if(Tools.prototype.isEmpty($scope.data.gameCount.replace(/\s/g, ''))){
                  //  $scope.data.showCookie = false;
                    //return;
                //}else if(!Tools.prototype.isEmpty($scope.data.gameCount) && '1' == type){
                    $scope.data.showCookie = true;
                //}
                if(11 == $scope.data.gameCount.replace(/\s/g, '').length){
                    $scope.data.showCookie = false;
                    if(Tools.prototype.isMobileNo($scope.data.gameCount.replace(/\s/g, '')) && !Tools.prototype.is170MobileNo($scope.data.gameCount.replace(/\s/g, ''))){
                        if('1' == type){
                            $('#gameCount').blur();
                        }
                        $cookieStore.remove("PhoneRechargeNo");
                        $cookieStore.put("PhoneRechargeNo",$scope.data.gameCount);
                        ProductService.getPhoneInfo($scope.data.gameCount.replace(/\s/g, ''),function(data){
                            if("success" == data.message){
                                if(data.data[0].prvcin == data.data[0].cityin){
                                    $scope.data.cityin = data.data[0].prvcin;
                                }else{
                                    $scope.data.cityin = data.data[0].prvcin+' '+data.data[0].cityin;
                                }
                                $scope.data.cityin += data.data[0].mobileType;

                               // alert('#phoneName:' + $("#phoneName")[0].innerText);
                               // alert($scope.data.cityin);
                                if($("#phoneName")[0].innerText != ''){
                                    $scope.data.phoneName = $("#phoneName")[0].innerText != '';
                                    $scope.data.cityin = '';
                                }
                                $scope.data.mobileType = data.data[0].mobileType;
                                $cookieStore.remove("PhoneRechargeInfo");
                                $cookieStore.put("PhoneRechargeInfo",$scope.data.cityin);
                                $cookieStore.remove("PhoneTypeInfo");
                                $cookieStore.put("PhoneTypeInfo",$scope.data.mobileType);
                                angular.forEach($scope.faceList,function(item,key){
                                    ProductService.getPhoneProduct({code:$rootScope.code,mobileType:$scope.data.mobileType,provinceName:data.data[0].prvcin,faceValue:item.value,phoneNo:$scope.data.gameCount.replace(/\s/g, '')},function(data){
                                        if('success' == data.message){
                                            item.id = data.data[0].id;
                                            item.price = "售价" + data.data[0].salePrice + "元";
                                            item.stock = true;
                                            if(item.value == 100 && $rootScope.isPrivilegeUser == '1' && $rootScope.hasMarketBill == '0'){
                                                item.hasDiscount = true;
                                                item.price = "售价88元";
                                            }
                                        }else{
                                            item.id = '';
                                            item.stock = false;
                                        }
                                        item.choosed = false;
//                                    if(key == $scope.faceList.length - 1){
//                                        $scope.getProductDetail();
//                                    }
                                    })
                                });

//                            ProductService.getPhoneFaceValue({'provinceName':data.data[0].prvcin,'cityName':data.data[0].cityin,'mobileType':data.data[0].mobileType,code:$rootScope.code},function(data){
//                                if("success" == data.message && 0 < data.data.length){
//                                    angular.forEaey){ch(data.data,function(item,k
//                                        angular.forEach($scope.faceList,function(temp,key){
//                                            if(item.parValue == temp.value){
//                                                temp.id = item.id;
//                                            }
//                                        });
//
//                                    });
//                                    $scope.getProductDetail();
//                                }
//                            });
                            }else{
                                $scope.data.mobileType = '';
                                $scope.data.cityin = '';
                                $scope.errorData.phoneNoError="";
                            }
                        })
                    }else{
                        $scope.data.mobileType = '';
                        $scope.data.cityin = '';
                        $scope.errorData.phoneNoError="号码有误，请重新输入";
                    }

                }else{
                    if(!Tools.prototype.isEmpty($scope.data.mobileType) || !Tools.prototype.isEmpty($scope.data.cityin) || !Tools.prototype.isEmpty($("#phoneName")[0].innerText)){
                        $scope.data.cityin='';
                        $scope.data.mobileType = '';
                        $("#phoneName")[0].innerText = '';
                    }
                    $scope.errorData.phoneNoError='';
                   // $scope.clearFaceValue();
                }
            }

            $scope.faceList = ProductServiceForSZ.getPhoneFaceValueList;

           /** if(!Tools.prototype.isEmpty(phoneNo)){
                $scope.data.gameCount = phoneNo;
                $scope.checkPhoneNo('2');
            }else{
                var PhoneRechargeNo = $cookieStore.get("PhoneRechargeNo");
                if(!Tools.prototype.isEmpty(PhoneRechargeNo)){
                    $scope.data.gameCount = PhoneRechargeNo;
                }

                var PhoneRechargeInfo = $cookieStore.get("PhoneRechargeInfo");
                var PhoneTypeInfo = $cookieStore.get("PhoneTypeInfo");
                if(!Tools.prototype.isEmpty(PhoneRechargeInfo)){
                    $scope.data.cityin = PhoneRechargeInfo;
                    $scope.data.mobileType  = PhoneTypeInfo;
                    angular.forEach($scope.faceList,function(item,key){
                        if(item.choosed && !Tools.prototype.isEmpty(item.price)){
                            $scope.data.cash = item.price;
                        }
                    });
                    if(Tools.prototype.isEmpty($scope.data.cash)){
                        $scope.checkPhoneNo('2');
                    }
                }else{
                    $scope.data.cash = '';
                   // $scope.clearFaceValue();
                }
            }  **/

            $scope.choosePhoneNo = function(phoneInfo){
                $scope.data.gameCount = phoneInfo.phoneNo;
                $scope.data.phoneName = phoneInfo.phoneName;
                $scope.data.showCookie = false;
                $scope.checkPhoneNo('2');
            }

            $scope.chooseValue = function($event,id){
                $event.target.disabled = true;
                $scope.data.showCookie = false;

                if(Tools.prototype.isEmpty($scope.data.mobileType)){
                    $event.target.disabled = false;
                    return;
                }

                if(Tools.prototype.isEmpty(id)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_stock;
                    $scope.data.cash = '';
                    $event.target.disabled = false;
                    return;
                }
                angular.forEach($scope.faceList,function(item,key){
                    if(item.id == id){
                        if(item.stock){
                            item.choosed = true;
                            $scope.orderForm.cardId = item.id;
                            $scope.orderForm.perValue = item.value;
                            $scope.data.cash = item.price;
                        }else{
                            item.choosed = false;
                            $scope.orderForm.cardId = '';
                            $scope.orderForm.perValue = '';
                            $scope.data.cash = '';
                        }
//                    $scope.orderForm.boardId = item.boardId;
                    }else{
                        item.choosed = false;
                    }
                });
                $scope.clearError('4');
                $scope.takeOrder($event);
            }

            $scope.isSubmit = false;

            $scope.takeOrder = function($event){

                if(window.navigator.onLine!=true){
                    $event.target.disabled = false;
                    $scope.isSubmit = false;
                    $scope.model.show();
                    return;
                }

                // 调用第三方控件获取用户信息
                //ThirdApp.getMobileNo("getCousterMsg");
               // alert($scope.data.gameCount);
                if($scope.isSubmit){
                    return;
                }
                $event.target.disabled = true;
                $scope.isSubmit = true;
                $scope.data.showCookie = false;

                if(Tools.prototype.isEmpty($scope.data.gameCount)){
                    $scope.errorData.phoneNoError="号码有误，请重新输入";
                    $event.target.disabled = false;
                    $scope.isSubmit=false;
                    return;
                }
                if(!Tools.prototype.isMobileNo($scope.data.gameCount.replace(/\s/g, '')) || Tools.prototype.is170MobileNo($scope.data.gameCount.replace(/\s/g, ''))){
                    $scope.errorData.phoneNoError="号码有误，请重新输入";
                    $event.target.disabled = false;
                    $scope.isSubmit =false;
                    return;
                }
                if(Tools.prototype.isEmpty($scope.orderForm.cardId)){
                    $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.no_face_value;
                    $event.target.disabled = false;
                    $scope.isSubmit=false;
                    return;
                }
                $scope.orderForm.gameCount = $scope.data.gameCount.replace(/\s/g, '');
                $scope.orderForm.loginType = "2";
                var bank = $scope.payList[0];
                $scope.orderForm.bankCode = bank.bankCode;
                $scope.orderForm.returnUrl = 'http://web.yiqianlian.com/szcustom/success/'+$rootScope.code+'/'+$rootScope.menu;

                // 临时解决获取用户信息问题
               // $("#content")[0].value = {PHONE_NUMBER:"15996281799",LOGIN_STATUS:1};
               // var userMsg = {PHONE_NUMBER:"15996281799",LOGIN_STATUS:1};//$('#content')[0].value;
                //alert(userMsg);
               // $scope.bindRechargeNo();
                // 多调用一次 防止接口响应延迟导致获取不到用户信息
                //if(!Tools.prototype.isEmpty(userMsg)){
               //     ThirdApp.getMobileNo("getCousterMsg");
               // }
              //  userMsg = $('#content')[0].value;
               // if(!Tools.prototype.isEmpty(userMsg) && userMsg != "undefined" ){
                    //userMsg = JSON.parse(userMsg);
                    //alert("userMsg:"+ userMsg + ",userMsg.PHONE_NUMBER:" + userMsg.PHONE_NUMBER);
                   /** if(!Tools.prototype.isEmpty($scope.data.gameCount)){
                        // 缓存用户信息，缓存失败则不允许下单

                        $scope.marketUserForm = {
                            mobileNo : $rootScope.phoneNo,
                            randomId : '',
                            code: $rootScope.code
                        };**/

                        //alert(" $scope.marketUserForm.mobileNo:" + $scope.marketUserForm.mobileNo);
                       // MemberServiceForSZ.login($scope.marketUserForm, function(data){
                           // if('success' == data.message){
                              //  if(data.data.length > 0) {
                                    //$rootScope.userLoginId = data.data[0];
                                    Tools.prototype.saveCookie($rootScope.code + 'randomId', null, {path: '/'});
                                    Tools.prototype.saveCookie($rootScope.code + 'randomId', $rootScope.userLoginId, {
                                        expires: 30,
                                        path: '/'
                                    });
                                    $scope.orderForm.memberId = $rootScope.userLoginId;
                                    if($rootScope.hasMarketBill == "0" && $rootScope.isPrivilegeUser == "1"){
                                        $scope.orderForm.hasDiscount = true;
                                    }
                                    OrderServiceForSZ.takeSaleOrderAndPay($scope.orderForm, function (data) {
                                        if ('success' == data.message) {
                                            //$rootScope.saveCookies('phoneNoes',$scope.data.gameCount);
                                            $scope.bindRechargeNo();
                                            location.href = data.data[0];
                                        } else {
                                            $scope.errorData.errorMsg = MessageService.errorMsg.commonMsg.pay_error;
                                             $event.target.disabled = false;
                                            $scope.isSubmit = false;
                                        }
                                    });
                              //  }
                            //}else{
                            //    $scope.login($event);
                           // }
                        //});
                   // }else{
                 //       $scope.login($event);
                   // }



                //}else{
               //     $scope.login($event);
               // }


            }
            $scope.checkHistoryNoList = function(currentNo){
                // $scope.cookieNos = Tools.prototype.saveCookie("gasCardNos");
                if ($scope.phoneNoes && $scope.phoneNoes.length > 0){
                    // $scope.gasCardNos = $scope.cookieNos.split(";");
                    for (var i = 0; i< $scope.phoneNoes.length; i++){
                        if ($scope.phoneNoes[i].phoneNo == currentNo){
                            return false;
                        }
                    }

                }
                if ($scope.phoneNoes && $scope.phoneNoes.length >= 10){
                    $scope.phoneNoes.splice(9,$scope.phoneNoes.length);

                    $scope.cookieNos = "";

                    for(var i = 0; i< $scope.phoneNoes.length; i++){
                        var temp = {phoneNo:$scope.phoneNoes[i].phoneNo, phoneName:$scope.phoneNoes[i].phoneName};
                        if(i == 3){
                            $scope.cookieNos += JSON.stringify(temp);
                        }else{
                            $scope.cookieNos += JSON.stringify(temp) + ",";
                        }
                    }

                }
                return true;

            }

            $scope.bindRechargeNo = function(){
                if ($scope.checkHistoryNoList($scope.data.gameCount)) {
                    var phoneName = document.getElementById("phoneName").innerText;
                    if(Tools.prototype.isEmpty(phoneName)){
                        phoneName = $scope.data.cityin;
                    }
                    var addPhoneInfo = {phoneNo:$scope.data.gameCount, phoneName:phoneName};
                    //addGasCardNoInfo = eval(addGasCardNoInfo);
                    if (Tools.prototype.isEmpty($scope.phoneNoes) || $scope.phoneNoes.length == 0) {
                        $scope.cookieNos = JSON.stringify(addPhoneInfo);
                    } else {
                        //$scope.cookieNos += ";" + $scope.data.gasCardNo;

                        //$scope.gasCardNos.push(addGasCardNoInfo);
                        $scope.cookieNos = JSON.stringify(addPhoneInfo) + ',' + $scope.cookieNos;

                    }
                    Tools.prototype.saveCookie("phoneNos", $scope.cookieNos, {expires: 30});
                }

            }

            $scope.txl = function(){//获取通讯录
             ThirdApp.getContact("setTongXunText");
               // $('#gameCount')[0].value = '13905182709';
                //$('#phoneName')[0].innerText = 'test';
             //   $('#gameCount').change();
               //ThirdApp.getMobileNo("getCousterMsg");

               // setTongXunText('15996281799,test');

            }

            $scope.login = function($event){//调用侧滑页
                $scope.isSubmit = false;
                $event.target.disabled = false;
                $scope.cleanChoosed();
                ThirdApp.isLogin();
                //alert("to login");
            }

            // 获取登陆号码
          /**  var userMsg = $('#content')[0].value;
            //alert(userMsg);
            if(!Tools.prototype.isEmpty(userMsg) && userMsg != "undefined" ) {
                userMsg = JSON.parse(userMsg);
                 //alert("userMsg:"+ userMsg + ",userMsg.PHONE_NUMBER:" + userMsg.PHONE_NUMBER);
                if (!Tools.prototype.isEmpty(userMsg.PHONE_NUMBER) && 1 == userMsg.LOGIN_STATUS) {
                    $scope.data.gameCount = userMsg.PHONE_NUMBER;
                    $('#gameCount')[0].value = userMsg.PHONE_NUMBER;
                    //$('#gameCount').change();
                    $scope.checkPhoneNo(1);
                }
            }   **/

            $scope.cleanChoosed = function(){
                angular.forEach($scope.faceList,function(item,key){
                    item.choosed = false;
                });
            }

            if(!Tools.prototype.isEmpty($scope.data.gameCount)){
                $scope.checkPhoneNo(1);
            }


            /**if($rootScope.promptSaleEnd == "true"){
                $("#errorprompt").show();
            }**/

        }]);
});
