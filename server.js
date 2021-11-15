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

// listen for requests
const listener = app.listen(process.env.PORT || 80, () => {
  console.log("[LOG] App is listening on port " + listener.address().port);
});

app.get("/", function (request, response) {
  console.log("REQUEST - /");
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

app.get('/private/admin/*', function (request, response) {
  console.log("REQUEST - /private/admin");
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
        response.sendFile(__dirname + request.url);
      }
      else
      {
        response.send("ACCESS DENIED");
      }
    });
  }
  else
  {
    response.send("ACCESS DENIED");
  }
});

app.get('/private/doctor/*', function (request, response) {
  console.log("REQUEST - /private/doctor");
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
        response.sendFile(__dirname + request.url);
      }
      else
      {
        response.send("ACCESS DENIED");
      }
    });
  }
  else
  {
    response.send("ACCESS DENIED");
  }
});

app.get('/private/patient/*', function (request, response, next) {
  console.log("REQUEST - /private/patient");
  if (request.oidc.isAuthenticated())
  {
    get_user_role(request.oidc.user["email"], function(err, user_role) {
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
        response.send("ACCESS DENIED");
      }
    });
  }
  else
  {
    response.send("ACCESS DENIED");
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
// get all users with specified role
async function get_users(user_role, callback)
{
  let sql = "SELECT email FROM user_roles WHERE role = ?";
  let post = user_role;
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    callback (null, result);
  });
}


// Create doctor in db
app.get('/create_doctor_user', (req, res) => {
  let user_email = req.query.email;
  let user_password = req.query.password;
  console.log(req.query.email);
  add_user_role(user_email, "doctor");
  res.send(200);
});
// Get all doctor accounts in db
app.get('/get_doctor_users', (req, res) => {
  get_users("doctor", function(err, user_emails) {
    console.log(user_emails);
    res.send(user_emails);
  });
});
// Delete specified doctor account in db
app.get('/del_doctor_users', (req, res) => {
  let user_email = req.query.email;
  let sql = "DELETE FROM user_roles WHERE email = ?";
  let post = user_email;
  db.query(sql, post, (err) => {
    if (err) throw err;
    res.send("200")
  });
});


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
