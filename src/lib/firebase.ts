
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTVxlfs2y4kHprfa2lkbd0oXaNt5hWsUU",
  authDomain: "bloomieapp-81f8c.firebaseapp.com",
  projectId: "bloomieapp-81f8c",
  storageBucket: "bloomieapp-81f8c.firebasestorage.app",
  messagingSenderId: "799307777427",
  appId: "1:799307777427:web:dc336c77416be008ab1466",
  measurementId: "G-738VJQGHE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics conditionally
const initializeAnalytics = async () => {
  const analyticsSupported = await isSupported();
  if (analyticsSupported) {
    return getAnalytics(app);
  }
  return null;
};

// Initialize analytics in the background
initializeAnalytics();

export { auth, db };
