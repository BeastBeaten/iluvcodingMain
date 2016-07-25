package com.mainSite.app.util.properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * </p>
 * @author zhouqing
 * @version 1.0
 */
public class ReadFileUtil {

    private static Logger logger = LoggerFactory.getLogger(ReadFileUtil.class);

    public String ReadFile(String Path){
        FileInputStream fileInputStream = null;
        BufferedReader reader = null;
        String laststr = "";
        try{
            fileInputStream = new FileInputStream(Path);
            InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream, "UTF-8");
            reader = new BufferedReader(inputStreamReader);
            String tempString = null;
            while((tempString = reader.readLine()) != null){
                laststr += tempString;
            }
        }catch(IOException e){
            logger.error("文件操作异常："+e.getMessage());
        }finally{
            if(reader != null){
                try {
                    reader.close();
                } catch (IOException e) {
                    logger.error("文件操作异常："+e.getMessage());
                }
            }
            if(null != fileInputStream){
                try {
                    fileInputStream.close();
                } catch (IOException e) {
                    logger.error("文件操作异常："+e.getMessage());
                }
            }

        }
        return laststr;
    }

}
