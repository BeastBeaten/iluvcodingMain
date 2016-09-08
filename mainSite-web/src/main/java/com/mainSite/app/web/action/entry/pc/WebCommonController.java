package com.mainSite.app.web.action.entry.pc;

import com.mainSite.app.service.ArticlesService;
import com.mainSite.app.web.action.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 *
 * PC端标准版入口Controller
 * @author zhouqing
 */
@Controller
@RequestMapping("/web")
public class WebCommonController extends BaseController{

    @Autowired
    private ArticlesService articlesService;

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


    /**
     * 测试连接
     * @return
     */
    @RequestMapping(value = "test",method = {RequestMethod.GET,RequestMethod.POST})
    public String test(Model model, HttpServletRequest request,HttpServletResponse response){

        String content = articlesService.getArticleById("Atc2016082910000008").getContent();

        model.addAttribute("content",content);

        return "web/test";

    }



}
