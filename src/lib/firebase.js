import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFgFW_Lm7P0D1NiWrdk5fzYNgYJVyiC14",
  authDomain: "photonicslabbookings.firebaseapp.com",
  projectId: "photonicslabbookings",
  storageBucket: "photonicslabbookings.appspot.com",
  messagingSenderId: "987603461267",
  appId: "1:987603461267:web:669909488966071f6b5966"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };