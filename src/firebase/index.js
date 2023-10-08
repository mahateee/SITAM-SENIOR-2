// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore, Timestamp } from "firebase/firestore"; // Import Timestamp from firestore
import { doc, deleteDoc } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo5gV2aafabtZU4DwhPkMjGyXCYfbVwg4",
  authDomain: "asset-app-4763b.firebaseapp.com",
  projectId: "asset-app-4763b",
  storageBucket: "asset-app-4763b.appspot.com",
  messagingSenderId: "795480642588",
  appId: "1:795480642588:web:bb7b0881b17e7c28c77bd9",
  measurementId: "G-V3106N9WRX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
export {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
  auth,
  firestore,
  Timestamp, // Include Timestamp in the exports
};
