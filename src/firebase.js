import firebase from "firebase/app";

// Import needed firebase modules
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Firebase app config
const firebaseConfig = {
  apiKey: "AIzaSyDVnG2xRGpD0wXbgLeN7amwBi8SPQz9TXk",
  authDomain: "firegram-40b93.firebaseapp.com",
  projectId: "firegram-40b93",
  storageBucket: "firegram-40b93.appspot.com",
  messagingSenderId: "507761883652",
  appId: "1:507761883652:web:b3b05f28d58fc02d45d351",
};

// Init our firebase app
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const auth = firebase.auth();
const storage = firebase.storage();

// export utils/refs
export { db, auth, storage, timestamp };
