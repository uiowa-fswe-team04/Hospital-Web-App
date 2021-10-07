// server.js
// libraries and frameworks
const express = require("express");
const app = express();
const multer = require('multer');
const admin = require('firebase-admin');

// parser for FormData POST
const post_parse = multer();

// listen for requests
const listener = app.listen(process.env.PORT || 80, () => {
  console.log("[LOG] App is listening on port " + listener.address().port);
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.post('/login', post_parse.none(), (req, res) => {
    console.log("[LOG] RECEIVED POST - /login");
    console.log(req.body);
    res.end("Attempting Login...");
});


// firebase admin setup
const serviceAccount = require('./private/fswe-team04-hospitalwebapp-firebase-adminsdk-6315l-8fa13f036a.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();