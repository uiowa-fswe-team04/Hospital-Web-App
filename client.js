import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

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

// Add link to create account based off current URL
const host = location.hostname;
var createAccountUrl = 'http://' + host + '/create_account.html';
document.getElementById("create_account_div").innerHTML = "<a href=\"" + createAccountUrl + "\">No account? Create one here!</a>";
var forgotPasswordUrl = 'http://' + host + '/forgot_password.html';
document.getElementById("forgot_password_div").innerHTML = "<a href=\"" + forgotPasswordUrl + "\">Forgot password?</a>";

firebase_auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    console.log('[LOG] - SIGNED IN AS ' + user.email);
    console.log('[LOG] - REDIRECTING TO LANDING PAGE');
    var url = 'http://' + host + '/landing_page.html';
    window.location.replace(url);
  }
});


// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('sign_in_button').addEventListener('click', function() {
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;
  
  signInWithEmailAndPassword(firebase_auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('[LOG] - SIGN IN SUCCESSFUL');
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == "auth/wrong-password"){
      alert("Incorrect email and/or password");
    }
    console.log('[ERROR] - SIGN IN ERROR ' + errorMessage);
  });
});