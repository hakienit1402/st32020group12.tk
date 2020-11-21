import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyB7GMfk8vITupi9haEZLC2YpEpSOcXEKVI",
    authDomain: "st2020group12.firebaseapp.com",
    databaseURL: "https://st2020group12.firebaseio.com",
    projectId: "st2020group12",
    storageBucket: "st2020group12.appspot.com",
    messagingSenderId: "616943129389",
    appId: "1:616943129389:web:f5ade1ac28ef54e012b9a4",
    measurementId: "G-42V6Y397ED"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
export default firebase;