/**
    파일명: FirebasePut.java
    설   명: 
    작성일: 2018. 6. 11.
    작성자: 강 성 훈
*/

package site.corin2.ws;

import java.io.FileInputStream;
import java.io.IOException;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class FirebasePut {
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
        	final DatabaseReference ref = FirebaseDatabase
        	    .getInstance()
        	    .getReference();
        	ref.addListenerForSingleValueEvent(new ValueEventListener() {
        	    @Override
        	    public void onDataChange(DataSnapshot dataSnapshot) {
        	        Object document = dataSnapshot.getValue();
        	        System.out.println(document);
        	    }

				@Override
				public void onCancelled(DatabaseError error) {
					System.out.println("에러");
				}
        	});
        } catch (IOException e) {
            System.out.println("ERROR: invalid service account credentials. See README.");
            System.out.println(e.getMessage());

            System.exit(1);
        }
        
        DatabaseReference refer = FirebaseDatabase.getInstance().getReference();
        
        DatabaseReference dataRef = refer.child("data");
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
        
        System.out.println("done");
	}
}
