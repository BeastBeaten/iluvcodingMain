/**
 * Created by zhangjinlong on 15-11-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.route.game.gameModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('gamerecharge', {
            url: "/gamerecharge",
            templateUrl:'/partials/mobile/standard/game/game-index.html',
            controller:"GameIndexCtrl"
        });

        $stateProvider.state('gamelist', {
            url: "/gamelist",
            templateUrl:'/partials/mobile/standard/game/game-list.html',
            controller:"GameListCtrl"
        });

        $stateProvider.state('gamecharge', {
            url: "/gamecharge?gamename",
            templateUrl:'/partials/mobile/standard/game/game-recharge.html',
            controller:"GameRechargeCtrl"
        });

    }]);
});