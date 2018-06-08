/**
    파일명: FirebaseDB.java
    설   명: Firebase 데이터베이스 관리
    작성일: 2018. 6. 7.
    작성자: 강 성 훈
*/

package site.corin2.chatting;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.database.*;

import site.corin2.model.User;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import java.io.FileInputStream;

/**
 * Firebase Database quickstart sample for the Java Admin SDK.
 * See: https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app
 */
public class FirebaseDB {
	// MariaDB JDBC 설정
    private static final String DRIVER = "org.mariadb.jdbc.Driver";
    private static final String URL = "jdbc:mariadb://192.168.0.43:3306/corin2";
    private static final String USER = "corin2";
    private static final String PASSWORD = "1004";
    
    // Users 설정
    public static String userid;
    public static String username;
    public static String password;
	
    // Firebase Admin SDK 설정
    private static final String DATABASE_URL = "https://corin2-chat.firebaseio.com/";

    private static FirebaseDatabase database;
    private static DatabaseReference ref;

    public static void main(String[] args) {
        // Initialize Firebase
        try {
            // [START initialize]
        	// Fetch the service account key JSON file contents
            FileInputStream serviceAccount = new FileInputStream("D://corin2-chat-firebase-adminsdk.json");
            System.out.println("first pass.");
            
            // Initialize the app with a service account, granting admin privileges
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl(DATABASE_URL)
                    .build();
            System.out.println("second pass.");
            FirebaseApp.initializeApp(options);
            System.out.println("third pass.");
            
            // As an admin, the app has access to read and write all data, regardless of Security Rules
            ref = FirebaseDatabase.getInstance()
            		.getReference("restricted_access/secret_document");
            ref.addListenerForSingleValueEvent(new ValueEventListener() {
				@Override
				public void onDataChange(DataSnapshot dataSnapshot) {			
					Object document = dataSnapshot.getValue();
					System.out.println("받는 문서: " + document);
				}
				
				@Override
				public void onCancelled(DatabaseError error) {
				}
            });
            
            // [END initialize]
        } catch (IOException e) {
            System.out.println("ERROR: invalid service account credentials. See README.");
            System.out.println(e.getMessage());

            System.exit(1);
        }

        // Shared Database reference
        database = FirebaseDatabase.getInstance();
        
        // DatabaseReference Setting
        DatabaseReference ref = database.getReference();
        
        //사용자 등록
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		CreateRequest request = null;
		
		try {
			//2. 드라이버 로딩
			Class.forName(DRIVER);
			
			//3. 연결 객체 생성 (주소값 할당 받기)
			conn = DriverManager.getConnection(URL, USER, PASSWORD);
			
			//4. 명령 객체 생성
			stmt = conn.createStatement();
			
			//4.1 실행할 자원 (Query 문장)
			String email = "'lean@naver.com'";
			String sql = "select userid, username, password from user where userid=" + email;
			
			//5. 명령 실행
			rs = stmt.executeQuery(sql);
			
			//6. 명령 처리
			if(rs.next()) {
				do {
					userid = rs.getString("userid");
					username = rs.getString("username");
					password = rs.getString("password");
					System.out.println(userid + "," +
							   username + "," +
					           password);
			        request = new CreateRequest()
			        	    .setEmail(userid)
			        	    .setEmailVerified(false)
			        	    .setPassword(password)
			        	    .setDisplayName(username)
			        	    .setDisabled(false);
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

    	UserRecord userRecord;
		try {
			userRecord = FirebaseAuth.getInstance().createUserAsync(request).get();
			System.out.println("Successfully created new user: " + userRecord.getUid());
			
			// Data 추가
			DatabaseReference usersRef = ref.child("Users");

			Map<String, User> users = new HashMap<>();
			//new User(email, profileImg, userName);
			users.put(userRecord.getUid(), new User(userRecord.getEmail(), userRecord.getPhotoUrl(), userRecord.getDisplayName()));

			usersRef.setValueAsync(users);
			System.out.println("Done!");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}


