// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZpgzec4sRs7ITjba7RSqeNJo0fMDhZLE",
  authDomain: "unsaidproject-demo.firebaseapp.com",
  projectId: "unsaidproject-demo",
  storageBucket: "unsaidproject-demo.appspot.com",
  messagingSenderId: "1099252335494",
  appId: "1:1099252335494:web:c4202841b87f3543cea207",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
