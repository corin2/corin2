/**
    파일명: MariaDBTest.java
    설   명: MariaDB JDBC 연동 테스트
    작성일: 2018. 6. 5.
    작성자: 강 성 훈
*/

package site.corin2.dbtest;

import java.sql.Connection;
import java.sql.DriverManager;
import org.junit.Test;

public class MariaDBTest {
    private static final String DRIVER = "org.mariadb.jdbc.Driver";
    private static final String URL = "jdbc:mariadb://192.168.0.43:3306/corin2";
    private static final String USER = "corin2";
    private static final String PASSWORD = "1004";
    
    @Test
    public void testConnection() throws Exception {
        Class.forName(DRIVER);
        
        try(Connection con =  DriverManager.getConnection(URL, USER,  PASSWORD)) {
            System.out.println("성공");
            System.out.println(con);
        }catch(Exception e) {
            System.out.println("에러발생");
            e.printStackTrace();
        }
    }
}