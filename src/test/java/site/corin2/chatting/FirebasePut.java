/**
    파일명: FirebasePut.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 강 성 훈
*/

package site.corin2.chatting;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import site.corin2.model.Member;

public class FirebasePut {
	public static void main(String[] args) {
        // Initialize Firebase
        try {
        	// Fetch the service account key JSON file contents
        	FileInputStream serviceAccount = new FileInputStream("D://testcorin2-firebase-adminsdk.json");

        	FirebaseOptions options = new FirebaseOptions.Builder()
        	    //.setCredential(FirebaseCredentials.fromCertificate(serviceAccount))
        		.setCredentials(GoogleCredentials.fromStream(serviceAccount))
        	    .setDatabaseUrl("https://testcorin2.firebaseio.com/")
        	    .setDatabaseAuthVariableOverride(null)
        	    .build();
        	FirebaseApp.initializeApp(options);

        	// The app only has access to public data as defined in the Security Rules
        	DatabaseReference ref = FirebaseDatabase
        	    .getInstance()
        	    .getReference("/public_resource");
        	ref.addListenerForSingleValueEvent(new ValueEventListener() {
        	    @Override
        	    public void onDataChange(DataSnapshot dataSnapshot) {
        	        String res = (String) dataSnapshot.getValue();
        	        System.out.println(res);
        	    }

				@Override
				public void onCancelled(DatabaseError error) {
					// TODO Auto-generated method stub
					
				}
        	});
        	
        	final FirebaseDatabase database = FirebaseDatabase.getInstance();
        	DatabaseReference refer = database.getReference("server/saving-data/fireblog");
        	
        	DatabaseReference usersRef = refer.child("users");
        	
        	Map<String, Member> members = new HashMap<>();
        	members.put("alanisawesome", new Member("June 23, 1912", "Alan Turing", "aaa"));
        	members.put("gracehop", new Member("December 9, 1906", "Grace Hopper", "bbb"));
        	
        	usersRef.setValueAsync(members);
        	
        	usersRef.child("dfdf").setValueAsync(new Member("June 23, 1912", "Alan Turing", "ccc"));
        	
        	System.out.println("done");
        	
        	DatabaseReference dataRef = ref.child("data");
        	dataRef.setValueAsync("I'm writing data", new DatabaseReference.CompletionListener() {
        	  @Override
        	  public void onComplete(DatabaseError databaseError, DatabaseReference databaseReference) {
        	    if (databaseError != null) {
        	      System.out.println("Data could not be saved " + databaseError.getMessage());
        	    } else {
        	      System.out.println("Data saved successfully.");
        	    }
        	  }
        	});
        	
        	
        	/*
        	// Fetch the service account key JSON file contents
        	FileInputStream serviceAccount = new FileInputStream("D://testcorin2-firebase-adminsdk.json");
        	System.out.println("1 pass.");

        	// Initialize the app with a custom auth variable, limiting the server's access
        	Map<String, Object> auth = new HashMap<String, Object>();
        	auth.put("uid", "my-service-worker");

        	FirebaseOptions options = new FirebaseOptions.Builder()
        	    .setCredential(FirebaseCredentials.fromCertificate(serviceAccount))
        	    .setDatabaseUrl("https://corin2-chat.firebaseio.com/")
        	    .setDatabaseAuthVariableOverride(auth)
        	    .build();
        	System.out.println("2 pass.");
        	FirebaseApp.initializeApp(options);
        	System.out.println("3 pass.");

        	// The app only has access as defined in the Security Rules
        	DatabaseReference ref = FirebaseDatabase
        	    .getInstance()
        	    .getReference("/some_resource");
        	ref.addListenerForSingleValueEvent(new ValueEventListener() {
        	    @Override
        	    public void onDataChange(DataSnapshot dataSnapshot) {
        	        String res = (String) dataSnapshot.getValue();
        	        System.out.println(res);
        	    }

				@Override
				public void onCancelled(DatabaseError error) {
				}
        	});
        	
        	final FirebaseDatabase database = FirebaseDatabase.getInstance();
        	//DatabaseReference refer = database.getReference("server/saving-data/fireblog");
        	DatabaseReference refer = database.getReference("/some_resource");
        	
        	DatabaseReference usersRef = refer.child("users");
        	
        	Map<String, Member> members = new HashMap<>();
        	members.put("alanisawesome", new Member("June 23, 1912", "Alan Turing", "aaa"));
        	members.put("gracehop", new Member("December 9, 1906", "Grace Hopper", "bbb"));
        	
        	usersRef.setValueAsync(members);
        	System.out.println("done");
        	*/
            /*// [START initialize]
        	// Fetch the service account key JSON file contents
            FileInputStream serviceAccount = new FileInputStream("D://corin2-chat-firebase-adminsdk.json");
            System.out.println("first pass.");
            
            // Initialize the app with a service account, granting admin privileges
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://corin2-chat.firebaseio.com/")
                    .build();
            System.out.println("second pass.");
            FirebaseApp.initializeApp(options);
            System.out.println("third pass.");
            
            // As an admin, the app has access to read and write all data, regardless of Security Rules
            
            DatabaseReference ref = FirebaseDatabase.getInstance()
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
            */
            // [END initialize]
        } catch (IOException e) {
            System.out.println("ERROR: invalid service account credentials. See README.");
            System.out.println(e.getMessage());

            System.exit(1);
        }
	}
}
