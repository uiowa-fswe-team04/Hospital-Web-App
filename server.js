// server.js
// libraries and frameworks
const express = require("express");
const app = express();
const fs = require('fs');
const admin = require('firebase-admin');

// listen for requests
const listener = app.listen(process.env.PORT || 80, () => {
  console.log("[LOG] App is listening on port " + listener.address().port);
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    console.log("[LOG] RECEIVED POST - /login");
    console.log(req.body);
    res.end("Attempting Login...");
});


// Firebase stuff
import { initializeApp } from "firebase/app";
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
const app = initializeApp(firebaseConfig);

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
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

  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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