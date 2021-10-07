// Firebase stuff
import firebase from 'firebase/app'
// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlURPzkZCiQDw71X4gL2Ja0mkrlwwF_lM",
  authDomain: "fswe-team04-hospitalwebapp.firebaseapp.com",
  projectId: "fswe-team04-hospitalwebapp",
  storageBucket: "fswe-team04-hospitalwebapp.appspot.com",
  messagingSenderId: "230485224893",
  appId: "1:230485224893:web:c3f3a8f35637c78b6036d4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Successfully signed in!");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("[ERROR] Login Error - " + errorMessage);
  });

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Successfully created user!");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("[ERROR] Login Error - " + errorMessage);
  });