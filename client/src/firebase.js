import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCbpYEKkLD-VCWyf-ht30EyoCBYijPwcpo",
  authDomain: "e-commerce-site-717aa.firebaseapp.com",
  projectId: "e-commerce-site-717aa",
  storageBucket: "e-commerce-site-717aa.appspot.com",
  messagingSenderId: "497123392879",
  appId: "1:497123392879:web:85ffe0d75458d940a97c9a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const google = new GoogleAuthProvider(app);
export { auth, google, db };
