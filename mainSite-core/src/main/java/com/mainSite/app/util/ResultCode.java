/**
 * ResultCode.java
 */
package com.mainSite.app.util;

/**
 * <p>
 * 结果码定义
 * </p>
 * @author zhouqing
 * @version 1.0
 */
public final class ResultCode implements java.io.Serializable {

    private ResultCode() {
    }

    /**
     *
     */
    private static final long serialVersionUID = 573396042153232906L;

    /**
     * 成功
     */
    public static final String SUCCESS = "000000";

    /**
     * 未知错误
     */
    public static final String UNKNOWN_ERROR = "010000";

    /**
     * 数据库操作异常.
     */
    public static final String DATABASE_ERROR = "010001";

    /**
     * 参数验证失败
     */
    public static final String CHECK_PARAM_FAIL = "020000";

    /**
     * 兑换卡卡号或卡密为空
     */
    public static final String PARAM_CANNOT_BE_EMPTY = "020001";

    /**
     卡号特殊逻辑不符合
      */
    public static final String CARDNO_SPECIALLOGIC_NOTMATCH = "020002";

    /**
     密码特殊逻辑不符合
      */
    public static final String CARDPASS_SPECIALLOGIC_NOTMATCH = "020003";

    /**
     * 卡号长度不合法
     */
    public static final String  CARDNO_LENGTH_WRONG = "020004";

    /**
     * 卡号长度不合法
     */
    public static final String  CARDPASS_LENGTH_WRONG = "020005";

    /**
     * 不支持该种类型的卡
     */
    public static final String NOT_SUPPORT_THIS_CARD = "020006";

    /**
     * 数据已存在
     */
    public static final String DATA_EXISTS = "030000";

    /**
     * 数据不存在
     */
    public static final String DATA_NOT_EXISTS = "030001";

    /**
     * 卡号卡密不能再提交，可能是密码错误等原因
     */
    public static  final  String CARD_CANNOT_USE = "030202";

    /**
     * 订单生成失败
     */
    public static final String ORDER_CREATE_FAIL = "030301";

    /**
     * 账户余额不足
     */
    public static final String AMOUNT_LACK = "030302";

    /**
     * 支付失败.
     */
    public static final String PAY_FAIL = "030401";

    /**
     * 获取支付宝paytoken失败
     */
    public static final String GET_PAYTOKEN_FAILED = "030405";

    /**
     * 提卡失败.
     */
    public static final String SENDCARD_FAIL = "030402";

    /**
     * 库存不足
     */
    public static final String CARDBASE_NOT_ENOUGH = "030403";

    /**
     * 商品暂不可用
     */
    public static final String WRONG_PRODUCT = "030200";

    /**
     * 查询商品面值失败
     */
    public static final String WRONG_PRODUCT_PARVALUE = "030201";

    /**
     * 查询兑换卡详细失败（根据销售单号没有查询到兑换卡信息）
     */
    public static final String NO_CARD_DETAIL = "030501";

    /**
     * 无商户信息
     */
    public static final String NO_SALEUSER_INFO = "040001";
    /**
     * 调用dubbo接口返回的错误码不是成功时定义的失败
     */
    public static final String OVERALL_FAIL = "030400";

    /**
     * 发送验证码失败
     */
    public static final String SEND_VERIFYCODE_FAILED = "040001";

    /**
     * 校验验证码失败
     */
    public static final String CHECK_VERIFYCODE_FAILED = "040002";

    /**
     * 获取流量商品失败
     */
    public static final String GET_FLOW_PRODUCT_FAILED = "030205";

    public static final String OVER_MAX_LIMIT = "010004";

    /**
     * 发送验证码超限
     */
    public static final String OVER_SENDING_LIMIT = "040006";

}
