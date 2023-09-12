// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export { app, db, getFirestore, collection, addDoc, getDocs, doc, deleteDoc };
