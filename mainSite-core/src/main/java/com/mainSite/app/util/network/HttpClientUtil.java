package com.mainSite.app.util.network;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 * HttpClient的封装类
 * </p>
 * @author zhouqing
 * @version 1.0
 */
public final class HttpClientUtil {
    private static Logger logger = LoggerFactory.getLogger(HttpClientUtil.class);

    /**
     * 默认的等待数据读取的超时时长，毫秒
     */
    public static final int DEFAULT_READ_TIMEOUT = 5000;

    /**
     * 默认连接超时时间，毫秒
     */
    public static final int DEFAULT_CONNECT_TIMEOUT = 3000;

    private HttpClientUtil() {
    }

    /**
     * HttpClient直接连接GET接口，直接返回数据
     * @param url 接口URL
     * @param queryString NameValuePair参数
     * @param readTimeout 等待数据读取的超时时长，毫秒
     * @param connectTimeout 连接超时时长，毫秒
     * @return 读取的数据
     * @throws Exception 异常
     */
    public static String doGet(String url, String queryString, int readTimeout, int connectTimeout) throws Exception {

        HttpClient httpClient = new DefaultHttpClient();

        httpClient.getParams().setIntParameter("http.socket.timeout", readTimeout );
        httpClient.getParams().setIntParameter("http.connection.timeout", connectTimeout );

        HttpGet getMethod = new HttpGet(url + '?' + queryString);

        getMethod.addHeader("Connection", "close");

        HttpEntity httpEntity = null;

        try {
            HttpResponse response = httpClient.execute(getMethod);

            if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
                logger.error("get失败:{}", response.getStatusLine());
                throw new Exception(response.getStatusLine().toString());
            } else {
                httpEntity = response.getEntity();
                String returnMsg = null;

                if (httpEntity != null) {
                    returnMsg = EntityUtils.toString(httpEntity);
                }
                return returnMsg;
            }
        } finally {
            getMethod.abort();
            EntityUtils.consume(httpEntity);
            httpClient.getConnectionManager().shutdown();
        }
    }
    
    /**
     * HttpClient直接连接GET接口，直接返回数据；采用默认的等待数据读取的超时时长、连接超时时长
     * @param url 接口URL
     * @param queryString NameValuePair参数
     * @return 读取的数据
     * @throws Exception 异常
     */
    public static String doGet(String url, String queryString) throws Exception {
        return doGet(url, queryString, DEFAULT_READ_TIMEOUT, DEFAULT_CONNECT_TIMEOUT);
    }

    /**
     * HttpClient直接连接GET接口，直接返回数据；采用默认的连接超时时长
     * @param url 接口URL
     * @param queryString NameValuePair参数
     * @param readTimeout 等待数据读取的超时时长，毫秒
     * @return 读取的数据
     * @throws Exception 异常
     */
    public static String doGet(String url, String queryString, int readTimeout) throws Exception {
        return doGet(url, queryString, readTimeout, DEFAULT_CONNECT_TIMEOUT);
    }

    /**
     * HttpClient直接连接POST接口，直接返回数据
     * @param url 接口URL
     * @param requestMap NameValuePair参数
     * @param coding 字符编码
     * @param readTimeout 等待数据读取的超时时长，毫秒
     * @param connectTimeout 连接超时时长，毫秒
     * @return  读取的数据
     * @throws Exception 异常
     */
    public static String invokePostHttp(String url, Map<String, String> requestMap, String coding, int readTimeout, int connectTimeout)
            throws Exception {
        String returnMsg = "";
        HttpClient httpClient = new DefaultHttpClient();
        try {
            HttpPost httpPost = new HttpPost(url);
            List<NameValuePair> nvps = new ArrayList<NameValuePair>();

            // 先迭代HashMap
            Iterator<Entry<String, String>> it = requestMap.entrySet().iterator();

            while (it.hasNext()) {
                Entry<String, String> entry = (Entry<String, String>) it.next();
                String key = entry.getKey();
                nvps.add(new BasicNameValuePair(key, entry.getValue()));
            }

            httpClient.getParams().setIntParameter("http.socket.timeout", readTimeout);
            httpClient.getParams().setIntParameter("http.connection.timeout", connectTimeout);
            
            httpPost.setEntity(new UrlEncodedFormEntity(nvps, coding));
            httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded;charset=" + coding);
            httpPost.addHeader("Accept-Language", "zh-cn");

            HttpResponse httpResponse = httpClient.execute(httpPost);
            HttpEntity httpEntity = httpResponse.getEntity();
            if (httpEntity != null) {
                returnMsg = EntityUtils.toString(httpEntity);
                EntityUtils.consume(httpEntity);
            }
            httpPost.abort();
        } finally {
            httpClient.getConnectionManager().shutdown();
        }
        return returnMsg;
    }

    /**
     * HttpClient直接连接POST接口，直接返回数据。采用默认的等待数据读取的超时时长、连接超时时长
     * @param url 接口URL
     * @param requestMap NameValuePair参数
     * @param coding 字符编码
     * @return  读取的数据
     * @throws Exception 异常
     */
    public static String invokePostHttp(String url, Map<String, String> requestMap, String coding) throws Exception {
        return invokePostHttp(url, requestMap, coding, DEFAULT_READ_TIMEOUT, DEFAULT_CONNECT_TIMEOUT);
    }

    /**
     * HttpClient直接连接POST接口，直接返回数据。采用默认的连接超时时长
     * @param url 接口URL
     * @param requestMap NameValuePair参数
     * @param coding 字符编码
     * @param readTimeout 等待数据读取的超时时长，毫秒
     * @return  读取的数据
     * @throws Exception 异常
     */
    public static String invokePostHttp(String url, Map<String, String> requestMap, String coding, int readTimeout) throws Exception {
        return invokePostHttp(url, requestMap, coding, readTimeout, DEFAULT_CONNECT_TIMEOUT);
    }
    
}