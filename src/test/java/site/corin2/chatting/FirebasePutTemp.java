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

public class FirebasePutTemp {
	
	public static void main(String[] args) {
        // Initialize Firebase
        try {
        	// Fetch the service account key JSON file contents
        	FileInputStream serviceAccount = new FileInputStream("D://testcorin2-firebase-adminsdk.json");

        	FirebaseOptions options = new FirebaseOptions.Builder()
        		.setCredentials(GoogleCredentials.fromStream(serviceAccount))
        	    .setDatabaseUrl("https://testcorin2.firebaseio.com/")
        	    .build();
        	FirebaseApp.initializeApp(options);

        	// The app only has access to public data as defined in the Security Rules
        	DatabaseReference ref = FirebaseDatabase
        	    .getInstance()
        	    .getReference();
        	
        	//final CountDownLatch latch = new CountDownLatch(1);
        	ref.addListenerForSingleValueEvent(new ValueEventListener() {
        	    @Override
        	    public void onDataChange(DataSnapshot dataSnapshot) {
        	        System.out.println("onDataChange: " + dataSnapshot);
        	        //latch.countDown();
        	    }

        	    @Override
        	    public void onCancelled(DatabaseError databaseError) {
        	        System.out.println("onCanceled: " + databaseError);
        	        //latch.countDown();
        	    }
        	});
        	try {
				//latch.await();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        } catch (IOException e) {
            System.out.println("ERROR: invalid service account credentials. See README.");
            System.out.println(e.getMessage());

            System.exit(1);
        }
        
        DatabaseReference refer = FirebaseDatabase.getInstance().getReference("user");
        
        try {
        	DatabaseReference dataRef = refer.child("data");
            final CountDownLatch latch = new CountDownLatch(1);
            dataRef.setValueAsync("I'm writing data", new DatabaseReference.CompletionListener() {
              @Override
              public void onComplete(DatabaseError databaseError, DatabaseReference databaseReference) {
                if (databaseError != null) {
                  System.out.println("Data could not be saved " + databaseError.getMessage());
                  latch.countDown();
                } else {
                  System.out.println("Data saved successfully.");
                  latch.countDown();
                }
              }
            });
			latch.await();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
        
        System.out.println("done");
	}
}
