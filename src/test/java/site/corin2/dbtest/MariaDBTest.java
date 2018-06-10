package site.corin2.dbtest;

import java.sql.Connection;
import java.sql.DriverManager;
import org.junit.Test;

public class MariaDBTest {
    private static final String DRIVER = "org.mariadb.jdbc.Driver";
    private static final String URL = "jdbc:mariadb://127.0.0.1:3306/corin2";
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