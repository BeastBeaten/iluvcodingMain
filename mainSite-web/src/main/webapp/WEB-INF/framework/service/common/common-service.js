'use strict';

define(['angular'], function(angular) {

    var commonService = angular.module('mainSite.service.comm.commonModule', []);

    commonService.factory('MenuService', ['$http',function($http) {

        return {
            menu:[
                {id:'coding',sref:'.coding',name:'开发'},
                {id:'living',sref:'.living',name:'生活'},
                {id:'gaming',sref:'.gaming',name:'游戏'}
            ],
            menu_coding:['语言','架构','开源','文化'],
            menu_living:['旅行','摄影','音乐','邪恶搞笑'],
            menu_gaming:['游讯','攻略','资源共享']
        }


    }]);
});

