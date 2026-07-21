// Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5okPgG0LaZ9zr-LUPyZGrGcHxs4VKK70",
  authDomain: "maiamma-school-erp.firebaseapp.com",
  projectId: "maiamma-school-erp",
  storageBucket: "maiamma-school-erp.firebasestorage.app",
  messagingSenderId: "692499577063",
  appId: "1:692499577063:web:a92e6d46cad6ddba304a42",
  measurementId: "G-6Q6PQ9E2R2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);

// Export
export { app, auth, db };