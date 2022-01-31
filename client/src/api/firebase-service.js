import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDr8rKCKipuhCbNCDYnmnzoYitXGPcmaAw",
  authDomain: "token-booking-app.firebaseapp.com",
  projectId: "token-booking-app",
  storageBucket: "token-booking-app.appspot.com",
  messagingSenderId: "113399655530",
  appId: "1:113399655530:web:80fa3949c4278f1566ee13",
  measurementId: "G-9CQQKLPFDR"
};

const app = initializeApp(firebaseConfig)
export const signUpWithEmailAndPassword = firebaseAuth.createUserWithEmailAndPassword;
export const signInWithEmailAndPassword = firebaseAuth.signInWithEmailAndPassword;
export const onAuthStateChanged = firebaseAuth.onAuthStateChanged;
export const signout = firebaseAuth.signOut;
export const auth = firebaseAuth.getAuth(app);