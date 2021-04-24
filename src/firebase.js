import firebase from "firebase"

import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

var firebaseConfig = {
  apiKey: "AIzaSyBMIPL-TtGj1iIqOZKnsmLDk8l-Mw7QwZU",
  authDomain: "hm-plasma.firebaseapp.com",
  databaseURL: "https://hm-plasma-default-rtdb.firebaseio.com",
  projectId: "hm-plasma",
  storageBucket: "hm-plasma.appspot.com",
  messagingSenderId: "403082248775",
  appId: "1:403082248775:web:8f31386d65b5c9c8a4e762"
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const functions = firebase.functions();
  
  export {firebase};
  export default fireDb.database().ref();



 