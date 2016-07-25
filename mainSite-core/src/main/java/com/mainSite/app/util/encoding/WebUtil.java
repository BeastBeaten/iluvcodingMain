package com.mainSite.app.util.encoding;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

/**
 * web工具类
 * 时间转换、获取指定长度的随机数等等
 * </p>
 * @author zhouqing
 * @version 1.0
 */
public final class WebUtil {
    /**
     * 8位长度日期时间格式 'yyyyMMdd'
     */
    public static final String DATE_FORMAT_8 = "yyyyMMdd";

    /**
     * 私有构造
     */
    private WebUtil() {

    }

    public static String getDateTimePattern() {
        return "yyyy-MM-dd HH:mm:ss";
    }

    /**
     * 获取日期格式 yyyy-MM-dd HH:mm:ss
     * @param aDate
     * @return
     */
    public static String getDateTime(Date aDate) {
        SimpleDateFormat df = null;
        String returnValue = "";

        if (aDate != null) {
            df = new SimpleDateFormat(getDateTimePattern());
            returnValue = df.format(aDate);
        }

        return (returnValue);
    }

    /**
     * @description 增加、减少日期，以一定格式输出
     * @param date
     *            日期
     * @param i
     *            天数
     */
    public static String dateSet(String date, int i, String format ) {
        Calendar cal = Calendar.getInstance();
        // 年
        int year = Integer.parseInt(date.substring(0, 4));
        cal.set(Calendar.YEAR, year);
        // 月，注意要减1，因为一月对应的是0
        int month = Integer.parseInt(date.substring(5, 7));
        cal.set(Calendar.MONTH, month - 1);
        // 日
        int day = Integer.parseInt(date.substring(8));
        cal.set(Calendar.DAY_OF_MONTH, day);
        // 如果想要得到第二天的日期就加1，如果超过了当月的最大天数，Calendar会自动处理
        cal.add(Calendar.DAY_OF_MONTH, i);
        return new SimpleDateFormat(format).format(cal.getTime());
    }

    /**
     * @description 增加、减少日期，以一定格式输出
     * @param i
     *            天数
     */
    public static String timeSet(int i, String format ) {
        Calendar cal = Calendar.getInstance(); // 当前时间

        cal.add(Calendar.DATE, i); // 当前时间-2

        return new SimpleDateFormat(format).format(cal.getTime());
    }

    /** <日期转字符串>
     * <功能详细描述>
     * @param date 日期
     * @param format 日期格式
     * @return 字符串
     * @see [类、类#方法、类#成员]
     */
    public static String format(Date date, String format) {
        if (null == date) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.format(date);
    }



    /** <获取指定长度的随机数>
     * <功能详细描述>
     * @param bit 位数
     * @return
     * @see [类、类#方法、类#成员]
     */
    public static String getRandomNumber(int bit) {
        Random r = new Random();
        int randNum = r.nextInt(new Double(Math.pow(10, bit)).intValue());
        while (randNum < new Double(Math.pow(10, bit - 1)).intValue())
        {
            randNum = r.nextInt(new Double(Math.pow(10, bit)).intValue());
        }
        return String.valueOf(randNum);
    }

}