// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwQ9FOugU1UwIueaUe35bWvSobBfmFQls",
  authDomain: "reactcrud-19609.firebaseapp.com",
  projectId: "reactcrud-19609",
  storageBucket: "reactcrud-19609.firebasestorage.app",
  messagingSenderId: "591293476324",
  appId: "1:591293476324:web:83245bac40ba488f60abf1",
  measurementId: "G-Q6LBP9DS3M"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);