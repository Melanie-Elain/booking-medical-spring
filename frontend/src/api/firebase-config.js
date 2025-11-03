// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 👈 thêm dòng này

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPziYJbB4U6HSKBDmqgNL9asyrWu1gXJM",
  authDomain: "booking-medical-spring.firebaseapp.com",
  projectId: "booking-medical-spring",
  storageBucket: "booking-medical-spring.firebasestorage.app",
  messagingSenderId: "9582458053",
  appId: "1:9582458053:web:bb3d0451f0346638a6ecac",
  measurementId: "G-LJGR0VP2VY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 👈 thêm dòng này để export auth
