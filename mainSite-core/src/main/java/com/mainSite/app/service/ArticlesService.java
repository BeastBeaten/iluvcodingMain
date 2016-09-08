package com.mainSite.app.service;

import com.mainSite.app.domain.mysql.Iluvcoding_Main_Articles;
import java.util.List;

/**
 * Created by zhouqing on 16-9-1.
 */
public interface ArticlesService {

    //根据tab类型获取展示文章列表
    List<Iluvcoding_Main_Articles> getArticlesListByTabType(String tabtype);


    //通过主键获得文章详情
    Iluvcoding_Main_Articles getArticleById(String id);


}
