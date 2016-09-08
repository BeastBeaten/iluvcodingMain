package com.mainSite.app.service.impl;

import com.mainSite.app.domain.mysql.Iluvcoding_Main_Articles;
import com.mainSite.app.persistence.mysql.main.ArticleMapper;
import com.mainSite.app.service.ArticlesService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhouqing on 16-9-1.
 */
public class ArticlesServiceImpl implements ArticlesService{

    @Autowired
    private ArticleMapper articleMapper;

    @Override
    public List<Iluvcoding_Main_Articles> getArticlesListByTabType(String tabtype) {

        Map paramMap = new HashMap();
        paramMap.put("tabtype",tabtype);

        return articleMapper.queryArticles(paramMap);

    }

    @Override
    public Iluvcoding_Main_Articles getArticleById(String id) {

        Map paramMap = new HashMap();
        paramMap.put("id",id);

        return articleMapper.queryArticles(paramMap).get(0);

    }
}
