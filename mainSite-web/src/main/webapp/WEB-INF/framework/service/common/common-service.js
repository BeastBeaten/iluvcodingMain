'use strict';

define(['angular'], function(angular) {

    var commonService = angular.module('mainSite.service.comm.commonModule', []);

    commonService.factory('MenuService', ['$http',function($http) {

        return {
            menu:[
                {id:'coding',name:'开发'},
                {id:'living',name:'生活'},
                {id:'gaming',name:'游戏'}
            ],
            menu_coding:[
                {id:'langue',name:'语言'},
                {id:'frame',name:'架构'},
                {id:'source',name:'开源'},
                {id:'culture',name:'文化'}],
            menu_living:[
                {id:'travle',name:'旅行'},
                {id:'photo',name:'摄影'},
                {id:'music',name:'音乐'},
                {id:'funny',name:'邪恶搞笑'}],
            menu_gaming:[
                {id:'game',name:'游讯'},
                {id:'strategy',name:'攻略'},
                {id:'resource',name:'资源共享'}],
            files: [
                {type:'langue',content: [
                    {id: '1', title: '语言语言语言语言语言语言语言语言'},
                    {id: '2', title: '语言语言语言语言语言语言语言语言'},
                    {id: '3', title: '语言语言语言语言语言语言语言语言'},
                    {id: '4', title: '语言语言语言语言语言语言语言语言'},
                    {id: '5', title: '语言语言语言语言语言语言语言语言'}
                ]},
                {type:'frame',content: [
                    {id: '1', title: '架构架构架构架构架构架构架构架构'},
                    {id: '2', title: '架构架构架构架构架构架构架构架构'},
                    {id: '3', title: '架构架构架构架构架构架构架构架构'},
                    {id: '4', title: '架构架构架构架构架构架构架构架构'},
                    {id: '5', title: '架构架构架构架构架构架构架构架构'}
                ]},
                {type:'source',content: [
                    {id: '1', title: '开源开源开源开源开源开源开源开源'},
                    {id: '2', title: '开源开源开源开源开源开源开源开源'},
                    {id: '3', title: '开源开源开源开源开源开源开源开源'},
                    {id: '4', title: '开源开源开源开源开源开源开源开源'},
                    {id: '5', title: '开源开源开源开源开源开源开源开源'}
                ]},
                {type:'culture',content: [
                    {id: '1', title: '文化文化文化文化文化文化文化文化文化'},
                    {id: '2', title: '文化文化文化文化文化文化文化文化文化'},
                    {id: '3', title: '文化文化文化文化文化文化文化文化文化'},
                    {id: '4', title: '文化文化文化文化文化文化文化文化文化'},
                    {id: '5', title: '文化文化文化文化文化文化文化文化文化'}
                ]},
                {type:'travle',content: [
                    {id: '1', title: '旅行旅行旅行旅行旅行旅行旅行旅行旅行旅行旅行'},
                    {id: '2', title: '旅行旅行旅行旅行旅行旅行旅行旅行旅行旅行旅行'},
                    {id: '3', title: '旅行旅行旅行旅行旅行旅行旅行旅行旅行旅行旅行旅行'},
                    {id: '4', title: '旅行旅行旅行旅行旅行旅行旅行旅行旅行旅行'},
                    {id: '5', title: '旅行旅行旅行旅行旅行旅行'}
                ]},
                {type:'photo',content: [
                    {id: '1', title: '摄影摄影摄影摄影摄影摄影摄影摄影摄影'},
                    {id: '2', title: '摄影摄影摄影摄影摄影摄影摄影摄影摄影摄影'},
                    {id: '3', title: '摄影摄影摄影摄影摄影摄影摄影摄影摄影'},
                    {id: '4', title: '摄影摄影摄影摄影摄影摄影摄影摄影摄影摄影'},
                    {id: '5', title: '摄影摄影摄影摄影摄影摄影摄影'}
                ]},
                {type:'music',content: [
                    {id: '1', title: '音乐音乐音乐音乐音乐音乐音乐音乐'},
                    {id: '2', title: '音乐音乐音乐音乐音乐音乐音乐音乐'},
                    {id: '3', title: '音乐音乐音乐音乐音乐音乐音乐音乐音乐音乐'},
                    {id: '4', title: '音乐音乐音乐音乐音乐音乐音乐音乐音乐'},
                    {id: '5', title: '音乐音乐音乐音乐音乐音乐音乐音乐'}
                ]},
                {type:'funny',content: [
                    {id: '1', title: '搞笑搞笑搞笑搞笑搞笑搞笑搞笑搞笑搞笑搞笑'},
                    {id: '2', title: '搞笑搞笑搞笑搞笑搞笑搞笑'},
                    {id: '3', title: '搞笑搞笑搞笑搞笑搞笑搞笑搞笑搞笑'},
                    {id: '4', title: '搞笑搞笑搞笑搞笑搞笑搞笑搞笑搞笑'},
                    {id: '5', title: '搞笑搞笑搞笑搞笑搞笑搞笑搞笑搞笑'}
                ]},
                {type:'game',content: [
                    {id: '1', title: '游戏游戏游戏游戏游戏游戏游戏游戏游戏'},
                    {id: '2', title: '游戏游戏游戏游戏游戏游戏游戏游戏'},
                    {id: '3', title: '游戏游戏游戏游戏游戏游戏游戏游戏'},
                    {id: '4', title: '游戏游戏游戏游戏游戏游戏游戏游戏游戏游戏'},
                    {id: '5', title: '游戏游戏游戏游戏游戏游戏游戏游戏游戏游戏游戏'}
                ]},
                {type:'strategy',content: [
                    {id: '1', title: 'c测试文章测试文章测试文章测试文章1'},
                    {id: '2', title: 'l测试文章测试文章测试文章测试文章2'},
                    {id: '3', title: 'l测试文章测试文章测试文章测试文章3'},
                    {id: '4', title: 'l测试文章测试文章测试文章测试文章4'},
                    {id: '5', title: 'l测试文章测试文章测试文章测试文章5'}
                ]},
                {type:'resource',content: [
                    {id: '1', title: '资源资源资源资源资源资源资源资源'},
                    {id: '2', title: '资源资源资源资源资源资源资源资源资源资源资源'},
                    {id: '3', title: '资源资源资源资源资源资源资源资源资源资源'},
                    {id: '4', title: '资源资源资源资源资源资源资源资源资源资源'},
                    {id: '5', title: '资源资源资源资源资源资源资源资源资源资源资源'}
                ]}
            ]


        }


    }]);
});

