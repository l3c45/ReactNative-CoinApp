import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {

  apiKey: "AIzaSyAMY-gOgiPn5YtnlRO0DkD5zjyi0tifwh0",

  authDomain: "react-native-c23eb.firebaseapp.com",

  projectId: "react-native-c23eb",

  storageBucket: "react-native-c23eb.appspot.com",

  messagingSenderId: "346874723095",

  appId: "1:346874723095:web:e9e4641a78bbd92dc19552"

};


// initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);













