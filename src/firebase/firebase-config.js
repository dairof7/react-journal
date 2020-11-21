
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyB-j7tqVdtPMJe0S3Lk2TlGtY_Hg233aKo",
  authDomain: "react-app-7f1f8.firebaseapp.com",
  databaseURL: "https://react-app-7f1f8.firebaseio.com",
  projectId: "react-app-7f1f8",
  storageBucket: "react-app-7f1f8.appspot.com",
  messagingSenderId: "26967662547",
  appId: "1:26967662547:web:7cc8238d78834ed2389926",
  measurementId: "G-F1G5JRQHHD"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  
  
  export {
      db,
      googleAuthProvider,
      firebase
  }