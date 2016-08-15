/**
 * 
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('mainSite.web.route.common.commonModule', []);

    app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

        $urlRouterProvider.when("", "/preview");

        $stateProvider
            .state("preview", {
                url: "/preview",
                templateUrl:'/partials/web/previewTab.html',
                controller:"PreviewCtrl"
            })
            .state("preview.coding", {
                url:"/coding",
                templateUrl:'/partials/web/previewNav.html',
                controller:"PreviewCtrl"
            })
            .state("preview.living", {
                url:"/living",
                templateUrl:'/partials/web/previewNav.html',
                controller:"PreviewCtrl"
            })
            .state("preview.gaming", {
                url:"/gaming",
                templateUrl:'/partials/web/previewNav.html',
                controller:"PreviewCtrl"
            });

    }]);
});