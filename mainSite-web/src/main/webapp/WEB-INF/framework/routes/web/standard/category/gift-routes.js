/**
 * Created by Administrator on 2016/3/22.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.web.route.giftCard.giftCardModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('giftrecharge', {
            url: "/giftrecharge",
            templateUrl:'/partials/web/standard/giftCard/webgiftcard-index.html',
            controller:"GiftCardHomeCtrl"
        });

        $stateProvider.state('giftOrder', {
            url: "/gift?name",
            templateUrl: "/partials/web/standard/giftCard/webgiftcard-order.html",
            controller: "GiftCardOrderCtrl"
        });

        $stateProvider.state('giftOrderSearch', {
            url: "/search/gift?tid",
            templateUrl: "/partials/web/standard/giftCard/webgiftcard-search.html",
            controller: "GiftCardSearchCtrl"
        });

    }]);
});