package com.mainSite.app.web.util;

import java.util.regex.Pattern;

/**
 * <p>
 * 字符串工具类
 * </p>
 * @author zhouqing
 * @version 1.0
 * @since 1.0
 */
public class StringUtil {

    /**
     * 函数功能： 判断入参是否有是否为null or ""
     * @param str
     * @return boolean
     */
    public static boolean isEmpty(String... str)
    {
        for (int i = 0; i < str.length; i++) {
            if ((str[i] == null) || "".equals(str[i]) || "undefined".equals(str[i])){
                return true;
            }
            else{
                continue;
            }
        }
        return false;
    }

    /**
     * 函数功能:串是否是abcABC123这些指定字符构成
     * @param src
     * @return
     * @return boolean
     * @throws
     */
    public static boolean isABCabc123(String src)
    {
        if (src.isEmpty())
        {
            return false;
        }
        Pattern pattern = Pattern.compile("^[A-Za-z0-9]+$");
        return pattern.matcher(src).matches();
    }

}
