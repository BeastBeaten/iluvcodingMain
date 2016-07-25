package com.mainSite.app.web.interceptor;

import com.mainSite.app.web.util.StringUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;
import java.util.List;

/**
 * 通用拦截器
 * @author zhouqing
 */
public class InterceptorController implements HandlerInterceptor{

//	private List<String> excludedUrls;

	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object arg2, Exception arg3)
			throws Exception {
	    
	}

	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {
	    
	}

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object obj) throws Exception {
		request.getSession().setAttribute("base", request.getContextPath());
		response.setCharacterEncoding("UTF-8");
		response.setHeader("content-type","text/html;charset=UTF-8");

		Enumeration<String> paramNames = request.getParameterNames();
		while(paramNames.hasMoreElements()){
			String[] value = request.getParameterValues(paramNames.nextElement());
			for(String temp : value){
				if(temp.toLowerCase().contains("select") || temp.toLowerCase().contains("from") || temp.toLowerCase().contains("where")){
					response.setStatus(403);
					return false;
				}
			}
		}

//		String requestUri = request.getRequestURI();
//
//		for (String url : excludedUrls) {
//			if (requestUri.startsWith(url)) {
//				if(StringUtil.isEmpty(request.getParameter("memberId"))){
//					//用户未登录
//					response.setStatus(403);
//					return false;
//				}else{
//                    User user = UserConfigUtil.getUserConfig(request.getParameter("code"));
//                    if(null != user && "0".equals(user.getAuthConfig().getLoginType())){
//                        Cookie[] cs = request.getCookies();
//                        boolean flag = false;
//                        if(null != cs && 0 < cs.length){
//                            String key = request.getParameter("code") + "RandomIds";
//                            for(int i = 0; i < cs.length; i++){
//                                if(key.equals(cs[i].getName()) && request.getParameter("memberId").equals(cs[i].getValue())){
//                                    flag =  true;
//                                    break;
//                                }
//                            }
//                        }
//
//                        if(!flag){
//                            response.setStatus(403);
//                            return false;
//                        }
//                    }
//
//					BaseService<MarketUserInfo> getCacheUserInfoBaseService = ofmpMarketService.getCacheUserInfo(request.getParameter("memberId"));
//
//					if("success".equals(getCacheUserInfoBaseService.getMessage())){
//						return true;
//					}
//					else{
//						//登录超时
//						response.setStatus(403);
//						return false;
//					}
//				}
//			}
//		}

		return true;

	}

//	public List<String> getExcludedUrls() {
//		return excludedUrls;
//	}
//
//	public void setExcludedUrls(List<String> excludedUrls) {
//		this.excludedUrls = excludedUrls;
//	}

	@SuppressWarnings("unused")
	private boolean isAjax(HttpServletRequest request) {
        return "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
    }
	
}
