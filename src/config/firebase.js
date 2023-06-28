/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3QwjbbqamtbPYYmzm-18yVblwWlSMEkg",
  authDomain: "credit-card-benefits-tracker.firebaseapp.com",
  projectId: "credit-card-benefits-tracker",
  storageBucket: "credit-card-benefits-tracker.appspot.com",
  messagingSenderId: "787918316413",
  appId: "1:787918316413:web:71005b4ca84fd322ed6214",
  measurementId: "G-8H2GK28LFY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
