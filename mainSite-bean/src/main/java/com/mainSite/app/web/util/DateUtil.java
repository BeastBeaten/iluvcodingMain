package com.mainSite.app.web.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * <p>
 * 时间工具通用类
 * </p>
 * @author zhouqing
 * @version 1.0
 * @since 1.0
 */
public class DateUtil
{

    public static final String TIME_STAMP = "yyyyMMddHHmmss";

    //获取时间字符串
    public static String getTimeStamp(){
        return new SimpleDateFormat(TIME_STAMP).format(new Date());
    }


    /**
     * 函数功能:将Date 日期类型转为yyyy-MM-dd格式的String类型
     * @param date date
     * @param formatPattern formatPattern
     * @return String formatPattern 如："yyyy-MM-dd"
     */
    public static String getDateString(Date date, String formatPattern)
    {
        if (date == null)
        {
            return "";
        }

        if ((formatPattern == null) || formatPattern.equals(""))
        {
            formatPattern = "yyyy-MM-dd";
        }
        SimpleDateFormat sdft = new SimpleDateFormat();
        sdft.applyPattern(formatPattern);

        return sdft.format(date);
    }

    /**
     * 功能: 将插入的字符串按格式转换成对应的日期对象
     *
     * @param str 字符串
     * @param pattern 格式
     * @return Date
     */
    public static Date stringToDate(String str, String pattern)
    {
        Date dateTime = null;
        try
        {
            if (str != null && !str.equals(""))
            {
                SimpleDateFormat formater = new SimpleDateFormat(pattern);
                dateTime = formater.parse(str);
            }
        }
        catch (Exception ex)
        {
        }
        return dateTime;
    }
}
