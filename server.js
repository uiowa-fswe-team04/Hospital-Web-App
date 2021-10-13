const express = require("express");
const app = express();
const multer = require('multer');
const admin = require('firebase-admin');
const firebase = require('firebase/app');
//const firebase_auth = require('firebase/auth');

// parser for FormData POST
const post_parse = multer();

app.use(express.static("./"));

// firebase admin setup
const serviceAccount = require('./private/fswe-team04-hospitalwebapp-firebase-adminsdk-6315l-8fa13f036a.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const auth_admin = admin.auth();

// firebase setup
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

// export firebase
module.exports.firebase = firebase;

// listen for requests
const listener = app.listen(process.env.PORT || 80, () => {
  console.log("[LOG] App is listening on port " + listener.address().port);
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.post('/login', post_parse.none(), (req, res) => {
    console.log("[LOG] RECEIVED POST - /login");
    res.send("Attempting Login...");
});


/*
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
*/