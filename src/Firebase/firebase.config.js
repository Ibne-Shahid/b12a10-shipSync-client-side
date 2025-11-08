// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgMKF41GyAo-EIfQvkCj9R6UCtVUfG9BA",
  authDomain: "ship-sync-6bf61.firebaseapp.com",
  projectId: "ship-sync-6bf61",
  storageBucket: "ship-sync-6bf61.firebasestorage.app",
  messagingSenderId: "687625147991",
  appId: "1:687625147991:web:9477ac8ac7f97491997512",
  measurementId: "G-2ZE7N1F74R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;