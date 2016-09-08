package com.mainSite.app.persistence.mysql.main;

import com.mainSite.app.domain.mysql.Iluvcoding_Main_Articles;
import java.util.List;
import java.util.Map;

public interface ArticleMapper {

    /**
     * 根据条件查询文章信息
     *
     * @return List<Iluvcoding_Main_Articles>
     */
    List<Iluvcoding_Main_Articles> queryArticles(Map<String, Object> conditions);

}
