// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sefio-10c1e.firebaseapp.com",
  projectId: "sefio-10c1e",
  storageBucket: "sefio-10c1e.appspot.com",
  messagingSenderId: "416705430260",
  appId: "1:416705430260:web:6c22ca3942801a412394a1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);