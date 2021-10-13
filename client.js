import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

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
const firebase = initializeApp(firebaseConfig);
const firebase_auth = getAuth();

// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('sign_in_button').addEventListener('click', function() {
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;
  
  signInWithEmailAndPassword(firebase_auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('[LOG] - SIGNED IN ' + user.email);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('[ERROR] - SIGN IN ERROR ' + error.message);
  });
});

/*
createUserWithEmailAndPassword(firebase_auth, email, password).then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  // ...
}).catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  // ..
});

signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
*/