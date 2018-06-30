/**
    파일명: PropertiesUtils.java
    설   명: Properties유틸 클래스
    작성일: 2018. 6. 30.
    작성자: 강 성 훈
*/

package site.corin2.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.springframework.util.ResourceUtils;

public class PropertiesUtils {
    public static Properties fetchProperties(String propertiesFileName) {
        Properties properties = new Properties();
        try {
            File file = ResourceUtils.getFile("classpath:properties/" + propertiesFileName + ".properties");
            InputStream in = new FileInputStream(file);
            properties.load(in);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return properties;
    }
}
