// For Firebase JS SDK v7.20.0 and later, measurementId is optionalx

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB9I0-vxTJa1FJWo4eYQOPoIr5WU4Mzt_c",
  authDomain: "waapp-clonee.firebaseapp.com",
  projectId: "waapp-clonee",
  storageBucket: "waapp-clonee.appspot.com",
  messagingSenderId: "101537417230",
  appId: "1:101537417230:web:29c637005275bc52ab545f",
  measurementId: "G-Z81NVY8J0L"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
export const app = initializeApp(firebaseConfig);