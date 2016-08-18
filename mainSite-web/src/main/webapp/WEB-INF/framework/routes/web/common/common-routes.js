/**
 * 
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('mainSite.web.route.common.commonModule', []);

    app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

        $urlRouterProvider.when("", "/preview/coding")
        $urlRouterProvider.when("/preview", "/preview/coding");

        $stateProvider
            .state("preview", {
                url: "/preview",
                templateUrl:'/partials/web/previewTab.html',
                controller:"PreviewCtrl"
            })
            .state("preview.type", {
                url:"/:type",
                templateUrl:'/partials/web/previewNav.html',
                controller:"PreviewCtrl"
            });
    }]);
});