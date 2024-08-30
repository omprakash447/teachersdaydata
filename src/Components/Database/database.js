// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4Zm-t9GluUGIx-UFRLFim3mcXUg1SI-k",
    authDomain: "teacherschatdatabse.firebaseapp.com",
    projectId: "teacherschatdatabse",
    storageBucket: "teacherschatdatabse.appspot.com",
    messagingSenderId: "548810991888",
    appId: "1:548810991888:web:6dc90a84a67c4c5f261d95",
    measurementId: "G-LP4J1YK3Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);