import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCxsizuFp60zv9wSxuNNCq-PiiIuXWs7rs",
    authDomain: "book-santa-app-61552.firebaseapp.com",
    projectId: "book-santa-app-61552",
    storageBucket: "book-santa-app-61552.appspot.com",
    messagingSenderId: "125165951581",
    appId: "1:125165951581:web:af1f68e7262695bd410bb4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();