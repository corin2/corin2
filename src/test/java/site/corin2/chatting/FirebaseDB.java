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

import site.corin2.model.Post;
import site.corin2.model.User;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.io.FileInputStream;

/**
 * Firebase Database quickstart sample for the Java Admin SDK.
 * See: https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app
 */
public class FirebaseDB {
    private static final String DATABASE_URL = "https://corin2-chat.firebaseio.com/";

    private static FirebaseDatabase database;

    public static void main(String[] args) {
        // Initialize Firebase
        try {
            // [START initialize]
            FileInputStream serviceAccount = new FileInputStream("D://corin2-chat-firebase-adminsdk.json");
            System.out.println("first pass.");
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl(DATABASE_URL)
                    .build();
            System.out.println("second pass.");
            FirebaseApp.initializeApp(options);
            System.out.println("third pass.");
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
        DatabaseReference usersRef = ref.child("users");
        
        /*
		public String email;
		public String profileImg;
		public String userName;
         */
        
        // Insert User
        /*Map<String, User> users = new HashMap<>();
        users.put(key, value)*/
        
        CreateRequest request = new CreateRequest()
        	    .setEmail("user@naver.com")
        	    .setEmailVerified(false)
        	    .setPassword("123456")
        	    .setDisplayName("John Doe")
        	    .setDisabled(false);

    	UserRecord userRecord;
		try {
			userRecord = FirebaseAuth.getInstance().createUserAsync(request).get();
			System.out.println("Successfully created new user: " + userRecord.getUid());        
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		
    }
}