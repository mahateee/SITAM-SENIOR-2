// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getDoc, updateDoc , getDocs} from "firebase/firestore";
import { getFunctions  } from "firebase/functions";
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
const functions = getFunctions(app);
const firestore = getFirestore(app);
export {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDoc,getDocs,
  doc,
  deleteDoc,
  updateDoc,
  auth,
  firestore,
  Timestamp, // Include Timestamp in the exports
};

const accountsRef = db.firestore().collection("accounts");

// Function to generate AI response (replace this with your actual implementation)
const AIgenerateResponse = async (input) => {
  // Your AI generation logic goes here
  // Example: Replace this with the actual code to generate AI response
  return `AI-generated response for: ${input}`;
};

// Set up a listener to receive real-time updates for all documents in the "accounts" collection
accountsRef.onSnapshot(async (snapshot) => {
  snapshot.forEach(async (doc) => {
    // Access the document data
    const accountData = doc.data();

    // Assuming you have a field named "prompt" in your document
    const prompt = accountData.prompt;

    // Generate AI response based on the prompt
    const aiResponse = await AIgenerateResponse(prompt);

    // Update the document with the AI-generated response
    await doc.ref.update({ aiResponse });

    // Log the AI-generated response
    console.log(`AI-generated Response: ${aiResponse}`);
  });
});
// const collectionName = '';

// // Function to delete all documents inside the collection
// async function deleteAllDocumentsInCollection() {
//   try {
//     const collectionRef = collection(db, collectionName);

//     // Get all documents in the collection
//     const snapshot = await getDocs(collectionRef);

//     // Delete each document
//     snapshot.forEach((document) => {
//       // Delete the document
//       deleteDoc(doc(db, collectionName, document.id));
//     });

//     console.log(`All documents inside the "${collectionName}" collection have been deleted.`);
//   } catch (error) {
//     console.error('Error deleting documents:', error);
//   }
// }

// // Call the function to delete documents
// deleteAllDocumentsInCollection();
