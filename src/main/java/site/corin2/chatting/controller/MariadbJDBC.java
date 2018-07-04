/**
    파일명: MariadbJDBC.java
    설   명: 
    작성일: 2018. 6. 8.
    작성자: 강 성 훈
*/

package site.corin2.chatting.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import site.corin2.chatting.dto.MariaUser;

public class MariadbJDBC {
    private static final String DRIVER = "org.mariadb.jdbc.Driver";
    private static final String URL = "jdbc:mariadb://192.168.0.43:3306/corin2";
    private static final String USER = "corin2";
    private static final String PASSWORD = "1004";
    
	public MariaUser getUser(String id) {
		String userid = null;
		String userprofile = null;
		String username = null;
		String password = null;
		
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		try {
			//드라이버 로딩
			Class.forName(DRIVER);
			
			//연결 객체 생성 (주소값 할당 받기)
			conn = DriverManager.getConnection(URL, USER, PASSWORD);
			
			//명령 객체 생성
			stmt = conn.createStatement();
			
			//실행할 자원 (Query 문장)
			//select empno, ename, job from emp where job = 'CLERK'
			String sql = "select userid, userprofile, username, password from user where userid=" + "'" + id + "'";
			
			//명령 실행
			
			rs = stmt.executeQuery(sql);
			
			//명령 처리
			if(rs.next()) {
				do {
					userid = rs.getString("userid");
					userprofile = rs.getString("userprofile");
					username = rs.getString("username");
					password = rs.getString("password");
				}while(rs.next());
			}else {
				System.out.println("조회된 데이터가 없습니다");
			}
			
		}catch (Exception e) {
			System.out.println(e.getMessage());
		}finally {
			//정상적인 구문
			if(rs != null) try { rs.close(); }catch (Exception e2) {}
			if(stmt != null) try { stmt.close(); }catch (Exception e2) {}
			if(conn != null) try { conn.close(); }catch (Exception e2) {}
		}
		return new MariaUser(userid, userprofile, username, password);
	}
}

