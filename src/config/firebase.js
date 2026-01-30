import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASTdqg4OXabI4XXd2wn30zzJSD7EJctUc",
  authDomain: "fresh-rush-b7ab2.firebaseapp.com",
  projectId: "fresh-rush-b7ab2",
  storageBucket: "fresh-rush-b7ab2.firebasestorage.app",
  messagingSenderId: "1040345373160",
  appId: "1:1040345373160:web:c85b5dfc65f9e0d7a7ec5d",
  measurementId: "G-5DWY2HX2S8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
