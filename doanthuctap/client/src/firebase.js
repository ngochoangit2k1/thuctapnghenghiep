// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB7rqEfy_m1K8bWgpOpsB4Zc6cVxrVjHkI",
  authDomain: "video-79ba3.firebaseapp.com",
  projectId: "video-79ba3",
  storageBucket: "video-79ba3.appspot.com",
  messagingSenderId: "877526005480",
  appId: "1:877526005480:web:702c548d4bc4628f3a7b5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const provider = new GoogleAuthProvider();

export default app;