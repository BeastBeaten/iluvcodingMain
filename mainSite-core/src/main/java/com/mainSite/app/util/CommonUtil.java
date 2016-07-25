package com.mainSite.app.util;

import com.mainSite.app.util.encoding.WebUtil;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.StringTokenizer;
import java.util.regex.Pattern;

/**
 * </p>
 * @author zhouqing
 * @version 1.0
 */
public class CommonUtil {

	/**
	 * 判断一个对象是否为空
	 * @param object 传入对象
	 * @return
	 */
	public static boolean isNullOrEmpty(Object object){
		if(object == null){
			return true;
		}else if(object instanceof Collection){
			Collection<?> collection = (Collection<?>) object;
			if(collection.size() > 0){
				return false;
			}else{
				return true;
			}
		}else if(object instanceof String){
			String string = (String) object;
			if("".equals(string) || string.length() == 0){
				return true;
			}else{
				return false;
			}
		}
		return true;
	}
	
	/**
     * 判断是否是ip
     * @param str
     * @return
     */
    public static boolean isIP(String str) {
    	if(str == null || "".equals(str.trim())){
    		return false;
    	}else{
    		return Pattern.matches("\\d+\\.\\d+\\.\\d+\\.\\d+", str);
    	}
    }

    /**
     * 获取访问IP
     * @param request {@link javax.servlet.http.HttpServletRequest}
     * @return ip
     */
    public static String getFromIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Real-IP");
        if (!isIP(ip)) {
            ip = request.getHeader("REMOTE-HOST");
        }
        if (!isIP(ip)) {
            ip = request.getHeader("x-forwarded-for");
        }
        if (!isIP(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (!isIP(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (!isIP(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (!isIP(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (!isIP(ip)) {
            ip = request.getRemoteAddr();
        }
        // 多级反向代理
        if (null != ip && !"".equals(ip.trim())) {
            StringTokenizer st = new StringTokenizer(ip, ",");
            if (st.countTokens() > 1) {
                return st.nextToken();
            }
        }
        return ip;
    }
    
    /**
	 * 获取当前时间 yyyyMMddHHmmss
	 * @return String
	 */ 
	public static String getCurrTime() {
		Date now = new Date();
		SimpleDateFormat outFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String s = outFormat.format(now);
		return s;
	}
	
	/**
	 * 获取当前日期 yyyyMMdd
	 * @param date
	 * @return String
	 */
	public static String formatDate(Date date) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		String strDate = formatter.format(date);
		return strDate;
	}
	
	/**
	 * 取出一个指定长度大小的随机正整数.
	 * 
	 * @param length
	 *            int 设定所取出随机数的长度。length小于11
	 * @return int 返回生成的随机数。
	 */
	public static int buildRandom(int length) {
		int num = 1;
		double random = Math.random();
		if (random < 0.1) {
			random = random + 0.1;
		}
		for (int i = 0; i < length; i++) {
			num = num * 10;
		}
		return (int) ((random * num));
	}


}
