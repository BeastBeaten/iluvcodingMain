/**
 * Created by zhangjinlong on 15-11-13.
 */
var Tools;
(function(){
    Tools = function(){

    };
    Tools.prototype = {
        'isEmpty':function(obj){
            if(undefined == obj || null == obj || '' == obj || 'null' == obj){
                return true;
            }
            return false;
        },
        'putParams':function(data){
            return encodeURIComponent(JSON.stringify(data));
        },
        'getParams':function(data){
            return JSON.parse(decodeURIComponent(data));
        },
        'isMobileNo':function(mobileNo){
            if(/^1[3|4|5|7|8][0-9]\d{8}$/.test(mobileNo)){
                return true;
            }
            return false;
        },
        'is170MobileNo':function(mobileNo){
            if(/^170\d{8}$/.test(mobileNo)){
               return true;
            }
            return false;
        },
        'isZSHCardNo':function(cardNo){
            if(/^(100011)\d{13}$/.test(cardNo)){
                return true;
            }
            return false;
        },
        'isZSYCardNo':function(cardNo){
            if(/^(9)\d{15}$/.test(cardNo)){
                return true;
            }
            return false;
        },
        'isAndroid':function(){
            if (/android/i.test(navigator.userAgent)){
                return true;
            }
            return false;
        },
        'isIos':function(){
            if (/ipad|iphone/i.test(navigator.userAgent)){
                return true;
            }
            return false;
        },
        'saveCookie':function(name, value, options) {
            if (typeof value != 'undefined') { // name and value given, set cookie
                options = options || {};
                if (value === null) {
                    value = '';
                    options.expires = -1;
                }
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                }
                var path = options.path ? '; path=' + options.path : '';
                var domain = options.domain ? '; domain=' + options.domain : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            } else { // only name given, get cookie
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
        }
    };
})();