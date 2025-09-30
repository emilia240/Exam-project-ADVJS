// import {onMounted, ref} from 'vue'
//always import from the top

//initialize Firebase ----sth that was copied from firebase console(at one point)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore/* , collection, onSnapshot, addDoc, deleteDoc, doc */ } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWKfDsB11mhhA2GLokfo71eMcBTgUwte4",
  authDomain: "w38-project.firebaseapp.com",
  projectId: "w38-project",
  storageBucket: "w38-project.firebasestorage.app",
  messagingSenderId: "958444691036",
  appId: "1:958444691036:web:0b9aaf7c1bd1f6a9265099"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); //firestore database



export { db }

export const firebaseApp = app