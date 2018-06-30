/**
    파일명: PropTest2.java
    설   명: 
    작성일: 2018. 6. 30.
    작성자: 강 성 훈
*/

package site.corin2.uploadtest;

import org.junit.Test;
import org.springframework.util.ResourceUtils;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.io.File;


public class PropertiesTest {

    public static Properties fetchProperties(){
        Properties properties = new Properties();
        try {
        	// 경로: src/main/resources/properties/파일명.properties
            File file = ResourceUtils.getFile("classpath:properties/firebaseKey.properties");
            InputStream in = new FileInputStream(file);
            properties.load(in);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return properties;
    }
    
    @Test
    public void proTest() {
		System.out.println("권한도메인: " + fetchProperties().getProperty("firebase.authDomain"));
	}
}