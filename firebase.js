// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBP5y0u1PbzVLDXKtexd2lGk9bgC517q4",
  authDomain: "marketmmo.firebaseapp.com",
  projectId: "marketmmo",
  storageBucket: "marketmmo.appspot.com",
  messagingSenderId: "629017495464",
  appId: "1:629017495464:web:7340e3a3ea142791987f9d",
  measurementId: "G-052H1MZZJL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
