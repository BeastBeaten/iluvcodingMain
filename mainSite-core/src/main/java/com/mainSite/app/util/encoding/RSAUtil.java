package com.mainSite.app.util.encoding;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Cipher;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.PKCS8EncodedKeySpec;

/**
 * RSA加密类
 * </p>
 * @author zhouqing
 * @version 1.0
 */
public final class RSAUtil {

    private static Logger log = LoggerFactory.getLogger(RSAUtil.class);

    private RSAUtil() {

    }

    /**
     * RSA加密
     * 
     * @param signStr
     *            加密源串
     * @param pubKey
     *            密钥
     * @return
     */
    public static String sign(String signStr, PublicKey pubKey) {
        try {
            Cipher cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.ENCRYPT_MODE, pubKey);
            byte[] data = signStr.getBytes();
            byte[] bt = cipher.doFinal(data);
            return Base64.encodeBase64String(bt);
        } catch (Exception e) {
            log.error("签名失败!", e);
        }
        return "";
    }

    /**
     * 签名
     * 
     * @param data待签名数据
     * @param privateKey
     *            密钥
     * @return byte[] 数字签名
     * */
    public static byte[] sign(byte[] data, byte[] privateKey) throws Exception {
        // 取得私钥
        PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(privateKey);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        // 生成私钥
        PrivateKey priKey = keyFactory.generatePrivate(pkcs8KeySpec);
        // 实例化Signature
        Signature signature = Signature.getInstance("SHA1withRSA");
        // 初始化Signature
        signature.initSign(priKey);
        // 更新
        signature.update(data);
        return signature.sign();
    }
}