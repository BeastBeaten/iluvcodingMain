/**
 * Created by zhouqing on 15-3-21.
 */
module.exports = function (grunt) {

    // 任务配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        requirejs: {
            appWebIndex: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"app-web-index.js",
                    optimize: "uglify2",
                    "paths": {
                        "appWebIndex":"app-web-index"
                    },
                    "include": [
                        "app-web-index"
                    ],
                    "out": "../../deploy/js/app-web-index.min.js"

                }
            }
        }
    });

    // 任务加载
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};