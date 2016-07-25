package com.mainSite.app.interfaceCenter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author zhouqing
 * @version 1.0
 */
public class BaseService<T extends Serializable> implements Serializable{


    private static final long serialVersionUID = 9200604436874458044L;

    private String resultCode = "0";

    private String message = "noData";

    private int totalCount = 0;

    private List<T> data = new ArrayList<T>();



    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }
}
