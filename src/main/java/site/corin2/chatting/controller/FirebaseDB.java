/**
    파일명: FirebaseDB.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 강 성 훈
*/

package site.corin2.chatting.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.concurrent.CountDownLatch;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import site.corin2.chatting.dto.MariaUser;


public class FirebaseDB {
	private static final String SERVICE_ACCOUNT_JSON = "D://corin2-chat-firebase-adminsdk.json";
	private static final String DATABASE_URL = "https://corin2-chat.firebaseio.com/";
	
	private static DatabaseReference database;
	
	// MariaDB에서 회원정보 가져오기
	public static MariaUser getUserFromMaria(String id) {
		MariadbJDBC mariadbJDBC = new MariadbJDBC();
        
        MariaUser mariauser = mariadbJDBC.getUser(id);
        
        if (mariauser.getProfileImg() == null) {
			mariauser.setProfileImg("");
		}
        
        return mariauser;
	}
	
	// Firebase 사용자 생성
	public static String addAuth(MariaUser mariauser) {
		CreateRequest request = new CreateRequest()
				.setEmail(mariauser.getEmail())
				.setEmailVerified(false)
				//.setPhotoUrl(mariauser.getProfileImg())
				.setPassword(mariauser.getPassword())
				.setDisplayName(mariauser.getUserName())
				.setDisabled(false);
		
		UserRecord userRecord;
		try {
			userRecord = FirebaseAuth.getInstance().createUserAsync(request).get();
			return userRecord.getUid();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	// Firebase DB에 데이터 추가
	public static void addUser(String id) {
		DatabaseReference ref = database.child("Users");
		MariaUser mariauser = getUserFromMaria(id);
		String uid = addAuth(mariauser);
		
		if(uid == null) {
			System.out.println("사용자가 정상적으로 생성되지 않았습니다.");
			return;
		}else {
			ref.child(uid).setValueAsync((new MariaUser(mariauser.getEmail(), mariauser.getProfileImg(), mariauser.getUserName())));
		}
	}
	
	// Firebase 리스너
	public static void startListeners() {
		final CountDownLatch latch = new CountDownLatch(1);
		database.addValueEventListener(new ValueEventListener() {
			@Override
			public void onDataChange(DataSnapshot snapshot) {
				//Object document = snapshot.getValue();
				latch.countDown();
			}
			@Override
			public void onCancelled(DatabaseError error) {
				System.out.println("Error: " + error.getMessage());
				latch.countDown();
			}
		});
		try {
			latch.await();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
        // Firebase 초기화
        try {
        	// [초기화 시작]
        	FileInputStream serviceAccount = new FileInputStream(SERVICE_ACCOUNT_JSON);
        	FirebaseOptions options = new FirebaseOptions.Builder()
        		.setCredentials(GoogleCredentials.fromStream(serviceAccount))
        	    .setDatabaseUrl(DATABASE_URL)
        	    .build();
        	FirebaseApp.initializeApp(options);
        	// [초기화 끝]
        } catch (IOException e) {
        	e.getStackTrace();
        }
        
        // Database reference 공유
        database = FirebaseDatabase.getInstance().getReference();
        
        // Add User
        addUser("lean@naver.com");
        
        // Firebase DB의 리스너 시작
        startListeners();
        
	}
}
