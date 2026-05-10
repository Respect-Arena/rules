import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWDUT2SgTejBEzt7rhQ-sHHyjI3GxSgb8",
  authDomain: "respect-arena.firebaseapp.com",
  projectId: "respect-arena",
  storageBucket: "respect-arena.firebasestorage.app",
  messagingSenderId: "449264603063",
  appId: "1:449264603063:web:2413a02ed4939cffd8a232",
  measurementId: "G-NX8TD2V63N"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
