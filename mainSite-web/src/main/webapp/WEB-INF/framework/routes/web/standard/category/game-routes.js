/**
 * Created by zhangjinlong on 15-11-15.
 */
'use strict';

define(['angular'], function(angular) {

    var app = angular.module('openwebApp.web.route.game.gameModule', []);

    app.config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('gamerecharge', {
            url: "/gameRecharge",
            templateUrl:'/partials/web/standard/game/game-index.html',
            controller:"GameRechargeCtrl"
        });

        $stateProvider.state('gameList', {
            url: "/buy/game?gameName",
            templateUrl: "/partials/web/standard/game/game-list.html",
            controller: "GameListCtrl"
        });

        $stateProvider.state('gameOrderSearch', {
            url: "/search/game?tid",
            templateUrl: "/partials/web/standard/game/game-search.html",
            controller: "GameSearchCtrl"
        });
    }]);
});