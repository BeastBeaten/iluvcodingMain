package com.mainSite.app.web.action;

import net.rubyeye.xmemcached.MemcachedClient;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Controller基类，放置用到的公共资源
 * 比如数据格式转换公共方法、操作日志记录的方法
 * @author zhouqing
 */
@Scope("request")
public class BaseController {

    protected final transient Logger logger = LoggerFactory.getLogger("inf");

    /**
     * The action execution was successful.
     */
    public static final String SUCCESS = "success";

    /**
     * The action execution was a fail.
     */
    public static final String FAIL = "fail";

    /**
     * The Remote execution was a error
     */
    public static final String ERROR = "error";

    /**
     * Jquery DataTable Data
     *
     * @param totalCount
     * @param dataList
     * @return
     */
    protected Map<String, Object> dataTableJson(int totalCount, List<?> dataList) {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("iTotalDisplayRecords", totalCount);
        data.put("iTotalRecords", totalCount);
        data.put("aaData", dataList == null ? Collections.emptyList() : dataList);
        Map<String, Object> map = new HashMap<String, Object>();
        if (CollectionUtils.isEmpty(dataList)) {
            map.put("result", ERROR);
        } else {
            map.put("result", SUCCESS);
        }
        map.put("data", data);
        return map;
    }

    protected Map<String, Object> dataTableJson(List<?> dataList) {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("aaData", dataList == null ? Collections.emptyList() : dataList);
        Map<String, Object> map = new HashMap<String, Object>();
        if (CollectionUtils.isEmpty(dataList)) {
            map.put("result", ERROR);
        } else {
            map.put("result", SUCCESS);
        }
        map.put("data", data);
        return map;
    }

    protected Map<String, Object> data2json(List<?> data) {
        Map<String, Object> map = new HashMap<String, Object>();
        if (CollectionUtils.isEmpty(data)) {
            map.put("result", ERROR);
        } else {
            map.put("result", SUCCESS);
        }
        map.put("data", data);
        return map;
    }

    protected Map<String, Object> data2json(Object data) {
        Map<String, Object> map = new HashMap<String, Object>();
        if (data == null) {
            map.put("result", ERROR);
        } else {
            map.put("result", SUCCESS);
        }
        map.put("data", data);
        return map;
    }

    /**
     * 返回AJAX失败
     *
     * @param msg 信息
     * @return Map
     */
    protected Map<String, Object> ajaxFail(String msg) {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("result", ERROR);
        jsonMap.put("msg", msg);
        return jsonMap;
    }



    public void setOnlyLoginCookie(String code, String randomId, HttpServletResponse response) {
        StringBuilder builder = new StringBuilder();
        builder.append(code + "RandomIds=" + randomId + "; ");
        builder.append("path=/; ");
        builder.append("HttpOnly; ");
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, 30);
        Date date = cal.getTime();
        Locale locale = Locale.CHINA;
        SimpleDateFormat sdf =
                new SimpleDateFormat("dd-MM-yyyy HH:mm:ss", locale);
        builder.append("Expires=" + sdf.format(date));
        response.setHeader("Set-Cookie", builder.toString());
    }

    public String getOnlyLoginCookie(String code, HttpServletRequest request) {
        String key = code + "RandomIds";
        Cookie[] cs = request.getCookies();
        for (int i = 0; i < cs.length; i++) {
            if (key.equals(cs[i].getName()) && StringUtils.isNotBlank(cs[i].getValue())) {
                return cs[i].getValue();
            }
        }
        return null;
    }

    public boolean checkRandomId(String key, String randomId, HttpServletRequest request) {
        Cookie[] cs = request.getCookies();
        if (null != cs && 0 < cs.length && StringUtils.isNotBlank(randomId)) {
            for (int i = 0; i < cs.length; i++) {
                if (key.equals(cs[i].getName()) && randomId.equals(cs[i].getValue())) {
                    return true;
                }
            }
        }
        return false;
    }


}