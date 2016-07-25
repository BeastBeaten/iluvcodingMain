/**
 * URLEncodingUtil.java
 */
package com.mainSite.app.util.encoding;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

/**
 * <p>
 * URLCodingUtil
 * </p>
 * @author zhouqing
 * @version 1.0
 */
public final class URLCodingUtil {
    private static Log log = LogFactory.getLog(URLCodingUtil.class);

    private URLCodingUtil() {
    }

    /**
     * URL编码
     * @param str 待编码的字符串
     * @return 采用URLEncoder编码的字符串
     */
    public static String encodingGBKStr(String str) {
        String encodeStr = null;

        if (str != null) {
            try {
                encodeStr = URLEncoder.encode(str, "GBK");
            } catch (UnsupportedEncodingException e) {
                log.error("encodingGBKStr Fail, str=" + str, e);
            }
        }

        return encodeStr;
    }

    /**
     * URL解码
     * @param str 待解码的字符串
     * @return 采用URLEncoder解码的字符串
     */
    public static String decodingGBKStr(String str) {
        String decodeStr = null;

        if (str != null) {
            try {
                decodeStr = URLDecoder.decode(str, "GBK");
            } catch (UnsupportedEncodingException e) {
                log.error("decodingGBKStr Fail, str=" + str, e);
            }
        }

        return decodeStr;
    }
    
    /**
     * URL编码
     * @param str 待编码的字符串,code 指定编码方式
     * @return 采用URLEncoder编码的字符串
     */
    public static String encodingStr(String str,String code) {
        String encodeStr = null;

        if (str != null) {
            try {
                encodeStr = URLEncoder.encode(str, code);
            } catch (UnsupportedEncodingException e) {
                log.error("encodingGBKStr Fail, str=" + str, e);
            }
        }

        return encodeStr;
    }
}
