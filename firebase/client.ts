// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_H5ddEhlPa0vXfjVu_JHtgwKwk4-LKNo",
  authDomain: "prepwise-f0989.firebaseapp.com",
  projectId: "prepwise-f0989",
  storageBucket: "prepwise-f0989.firebasestorage.app",
  messagingSenderId: "651275647742",
  appId: "1:651275647742:web:d3a0d7cf0891289059c3af",
  measurementId: "G-FM4VSEMPJC",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
