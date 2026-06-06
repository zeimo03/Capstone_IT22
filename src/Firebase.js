import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace these placeholder credentials with your actual Firebase Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyYourActualAPIKeyHere_XYZ",
  authDomain: "santa-rita-sports.firebaseapp.com",
  projectId: "santa-rita-sports",
  storageBucket: "santa-rita-sports.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

// Initialize the Firebase core instance
const app = initializeApp(firebaseConfig);

// Export the cloud database reference hook
export const db = getFirestore(app);