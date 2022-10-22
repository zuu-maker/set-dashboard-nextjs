// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFFBaDSI42FOjXuU06s1NgHWztpUv8gLQ",
  authDomain: "set-edu-83e30.firebaseapp.com",
  projectId: "set-edu-83e30",
  storageBucket: "set-edu-83e30.appspot.com",
  messagingSenderId: "154282519195",
  appId: "1:154282519195:web:ff9057b6cacaa93c29b43e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//authenticationn
const auth = getAuth(app);

export { auth };
