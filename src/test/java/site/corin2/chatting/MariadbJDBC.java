/**
    파일명: MariadbJDBC.java
    설   명: 
    작성일: 2018. 6. 8.
    작성자: 강 성 훈
*/

package site.corin2.chatting;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Scanner;

public class MariadbJDBC {
    private static final String DRIVER = "org.mariadb.jdbc.Driver";
    private static final String URL = "jdbc:mariadb://192.168.0.43:3306/corin2";
    private static final String USER = "corin2";
    private static final String PASSWORD = "1004";
    public static String userid;
    public static String username;
    public static String password;
    
	public static void getUser(String userid) {
		/*
		Class.forName("com.mysql.jdbc.Driver"); //new memory 드라이버 로드
		System.out.println("오라클 드라이버 메모리 로딩");
		//jdbc:mysql://localhost:3306/kostadb?characterEncoding=utf8&verifyServerCertificate=false&useSSL=true
		Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/kostadb?useSSL=true","kosta","1004");
		System.out.println(conn.isClosed());
		*/
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		try {
			//2. 드라이버 로딩
			Class.forName(DRIVER);
			
			//3. 연결 객체 생성 (주소값 할당 받기)
			conn = DriverManager.getConnection(URL, USER, PASSWORD);
			
			//4. 명령 객체 생성
			stmt = conn.createStatement();
			
			//4.1 실행할 자원 (Query 문장)
			//select empno, ename, job from emp where job = 'CLERK'
			String sql = "select userid, username, password from user where userid=" + userid;
			
			//5. 명령 실행
			//DQL: 실행하는 함수 달라요 > stmt.executeQuery(sql) > return ResultSet 객체의 주소
			//DML: 실행하는 함수 달라요 > stmt.executeUpdate(sql) > 결과 집합 (x) 출력 데이터(x)
			//executeUpdate() 함수가 return하는 자원은 반영된 행의 개수: 성공....실패....로직에 사용됨
			//delete from emp where deptno = 30 >> 5건 지워지면 return 5 (삭제된 행의 개수)
			
			rs = stmt.executeQuery(sql);
			
			//6. 명령 처리
			//DQL: 1. 결과가 없는 경우 (where empno = 5555)
			//	   2. 결과가 1건인 경우(PK, UNIQUE) 조건 조회 >> where empno = 7788
			//	   3. 결과가 여러개의 row >> select * from emp where deptno = 10
			
			/*
			while(rs.next()) {
				System.out.println(rs.getInt("empno") + "," +
								   rs.getString("ename") + "," +
						           rs.getString("job"));
			}
			
			1. 간단하다 (단순)
			2. 결과 집합이 없는 경우에 대한 처리가 안되요
			*/
			
			/*
			if(rs.next()) {
				System.out.println(rs.getInt("empno") + "," +
								   rs.getString("ename") + "," +
						           rs.getString("job"));
			}else {
				System.out.println("조회된 데이터가 없습니다");
			}
			
			1. Multi Row READ가 안된다
			2. 결과 집합이 없는 경우에 대한 처리가 가능하다
			*/
			
			//위 두 개 장점 (공식같은 로직)
			//1. 결과 집합이 없는 경우 처리, 2. Single row, 3. Multi row 가능
			if(rs.next()) {
				do {
					userid = rs.getString("userid");
					username = rs.getString("username");
					password = rs.getString("password");
					System.out.println(userid + "," +
							   username + "," +
					           password);
					
					/*System.out.println(rs.getString("userid") + "," +
									   rs.getString("username") + "," +
							           rs.getString("password"));*/
				}while(rs.next());
			}else {
				System.out.println("조회된 데이터가 없습니다");
			}
			
		}catch (Exception e) {
			System.out.println(e.getMessage());
		}finally {
			/*
			try {
				//자원해제
				rs.close();
				stmt.close();
				conn.close(); //반드시 끊어야한다.
			}catch (Exception e2) {
				e2.printStackTrace();
			}
			*/
			
			//정상적인 구문
			if(rs != null) try { rs.close(); }catch (Exception e2) {}
			if(stmt != null) try { stmt.close(); }catch (Exception e2) {}
			if(conn != null) try { conn.close(); }catch (Exception e2) {}
		}
	}
}

