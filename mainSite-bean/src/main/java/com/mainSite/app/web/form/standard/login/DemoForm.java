package com.mainSite.app.web.form.standard.login;

import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;

/**
 * demo
 * <p>
 * @author zhouqing
 * @version 1.0
 */
public class DemoForm implements Serializable{

    private static final long serialVersionUID = -6529288529241931473L;

    /**
     * 类目
     */
    private String menu;

    /**
     * C端用户登录标识
     */
    private String randomId;

    /**
     * C端用户uuid
     */
    private String uuid;

    /**
     * 签名
     */
    private String sign;

    /**
     * 首次访问是否带路由
     */
    private String noRouter;

    /**
     * 充值账号
     */
    private String rechargeAccount;

    /**
     * 充值面值
     */
    private String faceValue;

    /**
     * 外部订单号
     */
    private String ofLinkId;

    public String getMenu() {
        return menu;
    }

    public void setMenu(String menu) {
        this.menu = menu;
    }

    public String getRandomId() {
        return randomId;
    }

    public void setRandomId(String randomId) {
        if(StringUtils.isNotBlank(randomId) && 100 > randomId.length()){
            this.randomId = randomId.replaceAll(" ","").replaceAll("%","");
        }else{
            this.randomId = null;
        }
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public String getNoRouter() {
        return noRouter;
    }

    public void setNoRouter(String noRouter) {
        this.noRouter = noRouter;
    }

    public String getRechargeAccount() {
        return rechargeAccount;
    }

    public void setRechargeAccount(String rechargeAccount) {
        this.rechargeAccount = rechargeAccount;
    }

    public String getFaceValue() {
        return faceValue;
    }

    public void setFaceValue(String faceValue) {
        this.faceValue = faceValue;
    }

    public String getOfLinkId() {
        return ofLinkId;
    }

    public void setOfLinkId(String ofLinkId) {
        if(StringUtils.isNotBlank(ofLinkId) && 50 > ofLinkId.length()){
            this.ofLinkId = ofLinkId.replaceAll(" ","").replaceAll("%","").replaceAll("=","");
        }else{
            this.ofLinkId = null;
        }
    }
}
