/**
 * Created by Administrator on 2016/3/22.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.giftCard.giftCardModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('giftCardrecharge', {
            url: "/giftCardrecharge",
            templateUrl:'/partials/mobile/standard/giftCard/giftCard-index.html',
            controller:"GiftCardIndexCtrl"
        });

        $stateProvider.state('giftCardlist', {
            url: "/giftCardlist",
            templateUrl:'/partials/mobile/standard/giftCard/giftCard-list.html',
            controller:"GiftCardListCtrl"
        });

        $stateProvider.state('giftCardcharge', {
            url: "/giftCardcharge?giftCardName",
            templateUrl:'/partials/mobile/standard/giftCard/giftCard-recharge.html',
            controller:"GiftCardRechargeCtrl"
        });

        $stateProvider.state('instructions', {
            url: "/instructions",
            templateUrl:'/partials/mobile/standard/giftCard/instructions.html',
            controller:"GiftCardRechargeCtrl"
        });


    }]);
});