const express = require("express");
const mysql = require('mysql');
const app = express();

// connection with DB
const db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '123456',
  insecureAuth : true,
  database : "hospitalapp"
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

// Authentication and protected routes
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

app.use('/private/admin', function (request, response) {
  if (request.oidc.isAuthenticated())
  {
    get_user_role(request.oidc.user["email"], function(err, user_role) {
      if (user_role.length == 0){
        return next();
      }
      else {
        user_role = user_role[0].role;
      }
  
      if (user_role == "admin") {
        console.log("sending protected file " + request.url);
        response.sendFile(__dirname + "/private/admin" + request.url);
      }
      else
      {
        return next();
      }
    });
  }
  else
  {
    return next();
  }
});

app.use('/private/doctor', function (request, response) {
  if (request.oidc.isAuthenticated())
  {
    get_user_role(request.oidc.user["email"], function(err, user_role) {
      if (user_role.length == 0){
        return next();
      }
      else {
        user_role = user_role[0].role;
      }
  
      if (user_role == "practitioner") {
        console.log("sending protected file " + request.url);
        response.sendFile(__dirname + "/private/doctor" + request.url);
      }
      else
      {
        return next();
      }
    });
  }
  else
  {
    return next();
  }
});

app.use('/private/patient', function (request, response, next) {
  if (request.oidc.isAuthenticated())
  {
    get_user_role(request.oidc.user["email"], function(err, user_role) {
      console.log("user role inside of private-patient is " + user_role);
      if (user_role.length == 0){
        return next();
      }
      else {
        user_role = user_role[0].role;
      }
  
      if (user_role == "patient") {
        console.log("sending protected file " + request.url);
        response.sendFile(__dirname + request.url);
      }
      else
      {
        return next();
      }
    });
  }
  else
  {
    return next();
  }
});

// listen for requests
const listener = app.listen(process.env.PORT || 80, () => {
  console.log("[LOG] App is listening on port " + listener.address().port);
});

app.get("/", function (request, response) {
  console.log(request.oidc.isAuthenticated());
  if (request.oidc.isAuthenticated())
  {

    get_user_role(request.oidc.user["email"], function(err, user_role) {
      console.log(user_role);
      if (user_role.length == 0){
        add_user_role(request.oidc.user["email"], "patient");
        user_role = "patient";
      } else {
        user_role = user_role[0].role;
      }
  
      if (user_role == "practitioner") {
        console.log("redirecting to doctor page");
        response.redirect("/private/doctor/landing_page.html");
      } else if (user_role == "admin") {
        console.log("redirecting to admin page");
        response.redirect("/private/admin/landing_page.html");
      } else if (user_role == "patient") {
        console.log("redirecting to patient page");
        response.redirect("/private/patient/landing_page.html");
      } else {
        response.redirect('/logout');
      }
    });
    
  }
  else
  {
    response.redirect('/login');
  }
});


// Create roles table
app.get('/createuserroletable', (req, res) => {
  let sql = 'CREATE TABLE user_roles(email VARCHAR(255), role VARCHAR(255))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("Roles table created!");
  });
});

function add_user_role(user_email, user_role)
{
  let post = {email: user_email, role: user_role}
  let sql = "INSERT INTO user_roles SET ?";
  let query = db.query(sql, post, (err, result) =>{
    if (err) throw err;
    console.log("Role added!");
  });
}
async function get_user_role(user_email, callback)
{
  let sql = "SELECT role FROM user_roles WHERE email = ?";
  let post = user_email;
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    callback (null, result);
  });
  
}

// Create patients table
app.get('/createpatienttable', (req, res) => {
  let sql = 'CREATE TABLE patients(id int AUTO_INCREMENT, name VARCHAR(255), medication VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("Patients table created!");
  });
});

app.get('/addpatient', (req, res) => {
  let name = "Evan Bradley"
  let medication = "Consitpation Meds"
  let post = {name: name, medication: medication}
  let sql = "INSERT INTO patients SET ?";
  db.query(sql, post, (err, result) =>{
    if (err) throw err;
    console.log("Role added!");
    res.send("Patients added!");
  });
});
