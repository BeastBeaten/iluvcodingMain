/**
 * Created by zhouqing on 15-3-21.
 */
module.exports = function (grunt) {

    // 任务配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        requirejs: {
            appmobilestandard: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"app-mobile-standard.js",
                    optimize: "uglify2",
                    "paths": {
                        "appmobilestandard":"app-mobile-standard"
                    },
                    "include": [
                        "app-mobile-standard"
                    ],
                    "out": "../../deploy/js/app-mobile-standard.min.js"

                }
            },
            appmarketofstandard: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"app-market-of-standard.js",
                    optimize: "uglify2",
                    "paths": {
                        "appmarketofstandard":"app-market-of-standard"
                    },
                    "include": [
                        "app-market-of-standard"
                    ],
                    "out": "../../deploy/js/app-market-of-standard.min.js"

                }
            },
            appmarketabccustom: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"app-market-abc-custom.js",
                    optimize: "uglify2",
                    "paths": {
                        "appmarketofstandard":"app-market-abc-custom"
                    },
                    "include": [
                        "app-market-abc-custom"
                    ],
                    "out": "../../deploy/js/app-market-abc-custom.min.js"

                }
            },
            appsuzhoucustom: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"app-mobile-szbank.js",
                    optimize: "uglify2",
                    "paths": {
                        "appsuzhoucustom":"app-mobile-szbank"
                    },
                    "include": [
                        "app-mobile-szbank"
                    ],
                    "out": "../../deploy/js/app-mobile-szbank.min.js"

                }
            },
            appccbcustom: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"app-mobile-ccb.js",
                    optimize: "uglify2",
                    "paths": {
                        "appccbcustom":"app-mobile-ccb"
                    },
                    "include": [
                        "app-mobile-ccb"
                    ],
                    "out": "../../deploy/js/app-mobile-ccb.min.js"

                }
            },
            appcgbcustom: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"app-mobile-cgb.js",
                    optimize: "uglify2",
                    "paths": {
                        "appcgbcustom":"app-mobile-cgb"
                    },
                    "include": [
                        "app-mobile-cgb"
                    ],
                    "out": "../../deploy/js/app-mobile-cgb.min.js"

                }
            },
            appyichacustom: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"app-mobile-yicha.js",
                    optimize: "uglify2",
                    "paths": {
                        "appyichacustom":"app-mobile-yicha"
                    },
                    "include": [
                        "app-mobile-yicha"
                    ],
                    "out": "../../deploy/js/app-mobile-yicha.min.js"

                }
            },
            app58marketcustom: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"app-market-58-custom.js",
                    optimize: "uglify2",
                    "paths": {
                        "app58marketcustom":"app-market-58-custom"
                    },
                    "include": [
                        "app-market-58-custom"
                    ],
                    "out": "../../deploy/js/app-market-58-custom.min.js"

                }
            },
            appwebstandard: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"app-web-standard.js",
                    optimize: "uglify2",
                    "paths": {
                        "appwebstandard":"app-web-standard"
                    },
                    "include": [
                        "app-web-standard"
                    ],
                    "out": "../../deploy/js/app-web-standard.min.js"

                }
            },
            appwebstandardcate: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"app-web-standard-cate.js",
                    optimize: "uglify2",
                    "paths": {
                        "appwebstandardcate":"app-web-standard-cate"
                    },
                    "include": [
                        "app-web-standard-cate"
                    ],
                    "out": "../../deploy/js/app-web-standard-cate.min.js"

                }
            },
            psbApp: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"psbApp.js",
                    optimize: "uglify2",
                    "paths": {
                        "psbApp":"psbApp"
                    },
                    "include": [
                        "psbApp"
                    ],
                    "out": "../../deploy/js/psbApp-all.min.js"

                }
            },
            psb2App: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"psb2App.js",
                    optimize: "uglify2",
                    "paths": {
                        "psb2App":"psb2App"
                    },
                    "include": [
                        "psb2App"
                    ],
                    "out": "../../deploy/js/psb2App-all.min.js"

                }
            },
            psb3App: {
                "options": {
                    "baseUrl": "./",
                    "mainConfigFile":"psb3App.js",
                    optimize: "uglify2",
                    "paths": {
                        "psb3App":"psb3App"
                    },
                    "include": [
                        "psb3App"
                    ],
                    "out": "../../deploy/js/psb3App-all.min.js"

                }
            }
        }
    });

    // 任务加载
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};