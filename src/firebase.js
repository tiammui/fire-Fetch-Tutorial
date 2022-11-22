// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, addDoc, setDoc, getDocs, updateDoc } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjn5AYWA1eGLRTY6HYZiVtFlmJ7vZOQHA",
  authDomain: "fire-fetch-tutorial.firebaseapp.com",
  projectId: "fire-fetch-tutorial",
  storageBucket: "fire-fetch-tutorial.appspot.com",
  messagingSenderId: "638755010431",
  appId: "1:638755010431:web:80f0b5a4a5af8ba5e64c4a",
  measurementId: "G-9T1EK4Z40K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

function aaa(){
  
  // Add a new document in collection "cities"
  await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });

  const cityRef = doc(db, 'cities', 'BJ');
  setDoc(cityRef, { capital: true }, { merge: true });
}
