import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBz36MjSaFloLpijp_BtSvPyh426KrA3n0",
  authDomain: "e-commerece-c1336.firebaseapp.com",
  projectId: "e-commerece-c1336",
  storageBucket: "e-commerece-c1336.appspot.com",
  messagingSenderId: "799081049159",
  appId: "1:799081049159:web:88db686fb74f176bf95562",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const google = new GoogleAuthProvider(app);
export { auth, google, db };
