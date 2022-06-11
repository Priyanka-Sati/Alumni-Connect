
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8r1ohK53USzZ99v6BvOOT0FMbpURPWz0",
  authDomain: "alumini-connect-bdece.firebaseapp.com",
  projectId: "alumini-connect-bdece",
  storageBucket: "alumini-connect-bdece.appspot.com",
  messagingSenderId: "409949553720",
  appId: "1:409949553720:web:5765081a3a269a397f92cd"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export {auth};
const firestore = firebase.firestore();
export const storage = firebase.storage();


export const database = {
    users: firestore.collection("users"),
    posts: firestore.collection("posts")
}

