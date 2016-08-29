package com.mainSite.app.web.action.entry.pc;

import com.mainSite.app.web.action.BaseController;
import net.sf.json.JSONObject;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Map;

/**
 *
 * PC端标准版入口Controller
 * @author zhouqing
 */
@Controller
@RequestMapping("/web")
public class WebCommonController extends BaseController{


    /**
     * PC端首页入口
     * @return
     */
    @RequestMapping(value = "preview",method = {RequestMethod.GET,RequestMethod.POST})
    public String webIndex(Model model, HttpServletRequest request,HttpServletResponse response){

            return "web/preview";

    }

    /**
     * 文章详情
     * @return
     */
    @RequestMapping(value = "detail",method = {RequestMethod.GET,RequestMethod.POST})
    public String webDetail(Model model, HttpServletRequest request,HttpServletResponse response){

        return "web/detail";

    }



}
