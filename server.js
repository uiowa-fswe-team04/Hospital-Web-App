const express = require("express");
const mysql = require('mysql');
const app = express();

// connection with DB
const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '123456',
  insecureAuth : true,
  database : 'hospitalapp'
})

db.connect((err) => {
    if(err){
      throw err;
    }
    console.log("Connected to MYSQL")
});

// Create DB
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE hospitalapp';
  db.query(sql, (err, result) =>{
    if(err) throw err;
    console.log("DATABASE CREATED")
    console.log(result);
  });
});

// Create table
app.get('/createposttable', (req, res) => {
  let sql = 'CREATE TABLE post(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("POSTS TABLE created");
  });
});

// Insert post 1
app.get('/addpost1', (req,res) => {
  let post = {title: 'Post 1', body:'this is an example'}
  let sql = "INSERT INTO post SET ?";
  let query = db.query(sql, post, (err, result) =>{
    if (err) throw err;
    console.log(result);
    res.send("Post 1 added")
  });
});

const { auth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'f11613a3daf23e022c1ac3558373637dd76d2228ca0f4183c96999b9f709a9b2',
  baseURL: 'http://localhost:80',
  clientID: 'IHFTd11FGfuo4TqAF6KsEJGQam9SB0xu',
  issuerBaseURL: 'https://dev-gv4ab17m.us.auth0.com'
};
app.use(auth(config)); // auth router attaches /login, /logout, and /callback routes to the baseURL

const { requiresAuth } = require('express-openid-connect');

app.use('/private', requiresAuth());
app.use('/private', express.static(__dirname + "/private"));

// listen for requests
const listener = app.listen(process.env.PORT || 80, () => {
  console.log("[LOG] App is listening on port " + listener.address().port);
});

app.get("/", function (request, response) {
  if (request.oidc.isAuthenticated())
  {
    response.sendFile(__dirname + '/private/landing_page.html');
  }
  else
  {
    response.redirect('/login');
  }
});

app.get('/profile', requiresAuth(), (request, response) => {
  response.send(JSON.stringify(request.oidc.user));
});
