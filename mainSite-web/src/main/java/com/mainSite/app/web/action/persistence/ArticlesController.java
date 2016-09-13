package com.mainSite.app.web.action.persistence;

import com.alibaba.fastjson.JSON;
import com.mainSite.app.domain.mysql.Iluvcoding_Main_Articles;
import com.mainSite.app.service.ArticlesService;
import com.mainSite.app.web.action.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
*
* 文章表数据操作静态化
* @author zhouqing
*/
@Controller
@RequestMapping("/articles")
public class ArticlesController  extends BaseController {

    @Autowired
    private ArticlesService articlesService;

    /**
     * 根据文章类型查询文章列表
     * @return
     */
    @RequestMapping(value = "query/bytab/{tabType}",method = {RequestMethod.GET,RequestMethod.POST})
    public String getArticlesByTabType(@PathVariable String tabType,Model model, HttpServletRequest request,HttpServletResponse response){

        List<Iluvcoding_Main_Articles> articlesList = articlesService.getArticlesListByTabType(tabType);


        String s = String.valueOf(JSON.toJSON(articlesList));

        model.addAttribute("content",s);


        return "web/test";

    }




}
