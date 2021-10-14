import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";

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


firebase_auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    console.log('[LOG] - SIGNED IN AS ' + user.email);
    console.log('[LOG] - REDIRECTING TO LANDING PAGE');
    var host = location.hostname;
    var url = 'http://' + host + '/landing_page.html';
    window.location.replace(url);
  }
});


// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('forgot_password_button').addEventListener('click', function() {
  var email = document.getElementById('inputEmail').value;
  
  sendPasswordResetEmail(firebase_auth, email)
  .then(() => {
    // Password reset email sent!
    alert("Password reset email sent");
    var host = location.hostname;
    var url = 'http://' + host + '/index.html';
    window.location.replace(url);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Firebase error, no reset email sent");
  });
});
