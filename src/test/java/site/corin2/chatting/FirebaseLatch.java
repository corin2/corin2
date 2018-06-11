package site.corin2.chatting;

/**
    파일명: FirebaseLatch.java
    설   명: 
    작성일: 2018. 6. 12.
    작성자: 강 성 훈
*/

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.CountDownLatch;

public class FirebaseLatch {

    private static final String DATABASE_URL = "https://testcorin2.firebaseio.com/";
    private static FirebaseDatabase firebaseDatabase;
 
    public FirebaseLatch() {
        InputStream serviceAccount = this.getClass().getResourceAsStream("D://testcorin2-firebase-adminsdk.json");

        try {
            FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl(DATABASE_URL)
                .build();
            FirebaseApp.initializeApp(options);
            firebaseDatabase = FirebaseDatabase.getInstance(DATABASE_URL);

        } catch (IOException ioe) {
            System.out.println(ioe.getMessage());
        }
    }

    public void update(Object value) {
        update(value, "user");
    }

    public void update(Object value, String key) {
        try {
            DatabaseReference ref = firebaseDatabase.getReference(key);
            final CountDownLatch latch = new CountDownLatch(1);
            ref.setValue(value, new DatabaseReference.CompletionListener() {
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
    }

    public void close() {
        firebaseDatabase.getApp().delete();
    }
}