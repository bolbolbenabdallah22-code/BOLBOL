
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAADBmWaACcgLKueVWMcSw9mOK8ln6VhZI",
  authDomain: "bolbol-9eeb0.firebaseapp.com",
  projectId: "bolbol-9eeb0",
  storageBucket: "bolbol-9eeb0.firebasestorage.app",
  messagingSenderId: "140377528797",
  appId: "1:140377528797:web:e7d6257acd2868980e3e34",
  measurementId: "G-7TYE7NW5EC"
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
