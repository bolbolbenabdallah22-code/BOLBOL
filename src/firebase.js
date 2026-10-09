
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsrRP17nFs5ku22yC-LN2QRuTt25QZ0LA",
  authDomain: "bolbol-67eea.firebaseapp.com",
  projectId: "bolbol-67eea",
  storageBucket: "bolbol-67eea.firebasestorage.app",
  messagingSenderId: "428307718363",
  appId: "1:428307718363:web:0ccd55b8199e34b544acfe",
  measurementId: "G-7M8CRVS02Z"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
