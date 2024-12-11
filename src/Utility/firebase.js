// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
// auth
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAfifPAnrKuTk5I7XayrTE9E1kcgpnE3Zg",
authDomain: "clone-d909e.firebaseapp.com",
projectId: "clone-d909e",
storageBucket: "clone-d909e.firebasestorage.app",
messagingSenderId: "286032909573",
appId: "1:286032909573:web:3de2d9fb793a7a3eed136c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const db=app.firestore()
