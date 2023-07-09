import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';




const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID
 };



 const firebase = initializeApp(firebaseConfig);
 const auth = getAuth(firebase);
 const firestore = getFirestore(firebase);


 if (process.env.NODE_ENV === 'development') {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
  }
  
 //connectFirestoreEmulator(firestore, '127.0.0.1', 8080);

 //connectAuthEmulator(auth, "http://127.0.0.1:9099");
 


 export {
    firebase, firestore, auth
 };