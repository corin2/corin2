/**
    파일명: FirebasePut.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 강 성 훈
*/

package site.corin2.chatting;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.concurrent.CountDownLatch;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import site.corin2.model.User;

public class FirebasePut {
	private static final String SERVICE_ACCOUNT_JSON = "D://testcorin2-firebase-adminsdk.json";
	private static final String DATABASE_URL = "https://testcorin2.firebaseio.com/";
	
	private static DatabaseReference database;
	
	public static void addUsers() {
		DatabaseReference ref = database.child("user");
		ref.child("user02").setValueAsync((new User("gigi@naver.com", "pic", "hihi")));
	}
	
	public static void startListeners() {
		final CountDownLatch latch = new CountDownLatch(1);
		database.addValueEventListener(new ValueEventListener() {
			@Override
			public void onDataChange(DataSnapshot snapshot) {
				Object document = snapshot.getValue();
				System.out.println("받는 문서: " + document);
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
        // Initialize Firebase
        try {
        	// [START initialize]
        	FileInputStream serviceAccount = new FileInputStream(SERVICE_ACCOUNT_JSON);
        	FirebaseOptions options = new FirebaseOptions.Builder()
        		.setCredentials(GoogleCredentials.fromStream(serviceAccount))
        	    .setDatabaseUrl(DATABASE_URL)
        	    .build();
        	FirebaseApp.initializeApp(options);
        	// [END initialize]
        } catch (IOException e) {
        	e.getStackTrace();
        }
        
        // Shared Database reference
        database = FirebaseDatabase.getInstance().getReference();
        
        // Add Users
        addUsers();
        
        // Start listening to the Database
        startListeners();
        
	}
}
