const express = require("express");
const mysql = require('mysql');
const app = express();
const multer = require('multer');

const req_parse = multer();
const cookie_parse = require("cookie-parser");
app.use(cookie_parse());

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

// listen for requests
const listener = app.listen(process.env.PORT || 80, () => {
  console.log("[LOG] App is listening on port " + listener.address().port);
});

app.post("/login", req_parse.none(), function (request, response) {
  console.log("REQUEST - /login");
  let user_email = request.body['email'];
  let user_password = request.body['password'];

  check_cred(user_email, user_password, function(err, user_role) {
    if (user_role[0] == undefined) { response.end(); return; }
    user_role = user_role[0]["role"];

    if (user_role == "practitioner") {
      console.log("redirecting to doctor page");
      response.end("/private/doctor/landing_page.html");
    } else if (user_role == "admin") {
      console.log("redirecting to admin page");
      response.end("/private/admin/landing_page.html");
    } else if (user_role == "patient") {
      console.log("redirecting to patient page");
      response.end("/private/patient/landing_page.html");
    } else {
      response.end();
    }
  });
});

app.get("/", function (request, response) {
  response.redirect('/public/auth/login.html');
});

app.get("/public/auth/*", function (request, response) {
  response.sendFile(__dirname + request.url);
});

app.get('/private/admin/*', function (request, response) {
  console.log("REQUEST - /private/admin");

  let user_email = request.cookies.email;
  let user_password = request.cookies.password;

  if (user_email == undefined || user_password == undefined) { response.send("ACCESS DENIED"); return; }
  

  check_cred(user_email, user_password, function(err, user_role) {
    if (user_role[0] == undefined) { response.end(); return; }
    user_role = user_role[0]["role"];

    if (user_role == "admin") {
      console.log("sending protected file " + request.url);
      response.sendFile(__dirname + request.url);
    }
    else
    {
      response.send("ACCESS DENIED");
    }
  });
});

app.get('/private/doctor/*', function (request, response) {
  console.log("REQUEST - /private/doctor");

  let user_email = request.cookies.email;
  let user_password = request.cookies.password;

  if (user_email == undefined || user_password == undefined) { response.send("ACCESS DENIED"); return; }

  check_cred(user_email, user_password, function(err, user_role) {
    if (user_role[0] == undefined) { response.end(); return; }
    user_role = user_role[0]["role"];

    if (user_role == "practitioner") {
      console.log("sending protected file " + request.url);
      response.sendFile(__dirname + request.url);
    }
    else
    {
      response.send("ACCESS DENIED");
    }
  });
});

app.get('/private/patient/*', function (request, response, next) {
  console.log("REQUEST - /private/patient");

  let user_email = request.cookies.email;
  let user_password = request.cookies.password;

  if (user_email == undefined || user_password == undefined) { response.send("ACCESS DENIED"); return; }

  console.log(user_email);
  console.log(user_password);

  check_cred(user_email, user_password, function(err, user_role) {
    if (user_role[0] == undefined) { response.end(); return; }
    user_role = user_role[0]["role"];

    if (user_role == "patient") {
      console.log("sending protected file " + request.url);
      response.sendFile(__dirname + request.url);
    }
    else
    {
      response.send("ACCESS DENIED");
    }
  });
});


// Create roles table
app.get('/createuserroletable', (req, res) => {
  let sql = 'CREATE TABLE user_table(id int AUTO_INCREMENT, email VARCHAR(255), role VARCHAR(255), password VARCHAR(255))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("Roles table created!");
  });
});
function add_user_role(user_email, user_role, user_password, name)
{
  let post = {email: user_email, role: user_role, password: user_password, name: name}
  let sql = "INSERT INTO user_table SET ?";
  let query = db.query(sql, post, (err, result) =>{
    if (err) throw err;
    console.log("Role added!");
  });
}
async function get_user_role(user_email, callback)
{
  let sql = "SELECT role FROM user_table WHERE email = ?";
  let post = user_email;
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    callback (null, result);
  });
}
// get all users with specified role
async function get_users(user_role, callback)
{
  let sql = "SELECT email FROM user_table WHERE role = ?";
  let post = user_role;
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    callback (null, result);
  });
}

// get all users names with specified role
async function get_users_names(user_role, callback)
{
  let sql = "SELECT name FROM user_table WHERE role = ?";
  let post = user_role;
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    callback (null, result);
  });
}

// compare user/password
async function check_cred(email, password, callback)
{
  let sql = "SELECT role FROM user_table WHERE password = \"" + password + "\" AND email = \"" + email + "\"";
  db.query(sql, (err, result) => {
    if (err) throw err;
    callback (null, result);
  });
}

// Create patient in db
app.post('/create_patient_user', req_parse.none(), (req, res) => {
  let user_email = req.body['email'];
  let user_password = req.body['password'];
  let name = req.body['name']
  add_user_role(user_email, "patient", user_password, name);
  res.end("/private/patient/landing_page.html");
});

// Create doctor in db
app.get('/create_doctor_user', (req, res) => {
  let user_email = req.query.email;
  let user_password = req.query.password;
  console.log(req.query.email);
  add_user_role(user_email, "doctor", user_password);
  res.send(200);
});
// Get all doctor accounts in db
app.get('/get_doctor_users', (req, res) => {
  get_users("doctor", function(err, user_emails) {
    console.log(user_emails);
    res.send(user_emails);
  });
});

// Get all patient accounts in db
app.get('/request_patients', (req, res) => {
  get_users_names("patient", function(err, user_names) {
    console.log(user_names);
    res.send(user_names);
  });
});

// Delete specified doctor account in db
app.get('/del_doctor_users', (req, res) => {
  let user_email = req.query.email;
  let sql = "DELETE FROM user_table WHERE email = ?";
  let post = user_email;
  db.query(sql, post, (err) => {
    if (err) throw err;
    res.send(200)
  });
});


// Create prescriptions table
app.get('/createpatienttable', (req, res) => {
  let sql = 'CREATE TABLE prescriptions(id int AUTO_INCREMENT, name VARCHAR(255), medication VARCHAR(255), notes VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("prescriptions table created!");
  });
});

app.get('/addprescription', (req, res) => {
  let name = "Bryce"
  let medication = "Advil"
  let notes = "He has tummy ache"
  let post = {name: name, medication: medication, notes: notes}
  let sql = "INSERT INTO prescriptions SET ?";
  db.query(sql, post, (err, result) =>{
    if (err) throw err;
    res.send("prescriptions added!");
  });
});

app.get('/get_prescription_list', (req, res) => {
  let sql = "SELECT * FROM prescriptions";
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.get('/get_prescription_list_patient', (req, res) => {
  let patient = req.query.patient;
  let sql = "SELECT * FROM prescriptions WHERE name = ?";
  let post = patient;
  db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Create perscription in db
app.get('/create_prescription', (req, res) => {
  let patient = req.query.patient;
  let medication = req.query.medication;
  let notes = req.query.notes;
  console.log(req.query.patient);
  add_prescription(patient, medication, notes);
  res.send(200);
});

app.get('/delete_prescription', (req, res) => {
  let id = req.query.id;
  console.log(req.query.id);
  remove_prescription(id);
  res.send(200);
});

function add_prescription(patient, medication, notes)
{
  let post = {name: patient, medication: medication, notes: notes}
  let sql = "INSERT INTO prescriptions SET ?";
  let query = db.query(sql, post, (err, result) =>{
    if (err) throw err;
    console.log("Prescription added!");
  });
}

function remove_prescription(id)
{
  let sql = "DELETE FROM prescriptions WHERE id = ?";
  let post = id;
  db.query(sql, post, (err) => {
    if (err) throw err;
  });
}

// Create appointment table
app.get('/createappointmenttable', (req, res) => {
  let sql = 'CREATE TABLE appointments(id int AUTO_INCREMENT, name VARCHAR(255), time VARCHAR(255), notes VARCHAR(255), patient VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send("prescriptions table created!");
  });
});

app.get('/get_appointments_list', (req, res) => {
  let sql = "SELECT * FROM appointments";
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  });
});

// Create appointment in db
app.get('/create_appointment', (req, res) => {
  let name = req.query.name;
  let time = req.query.time;
  let notes = req.query.notes;
  let patient = req.query.patient;
  console.log(req.query.patient);
  add_prescription(name, time, notes, patient);
  res.send(200);
});

function add_appointment(doctor, time, notes, patient)
{
  let post = {name: doctor, time: time, notes: notes, patient: patient}
  let sql = "INSERT INTO appointment SET ?";
  let query = db.query(sql, post, (err, result) =>{
    if (err) throw err;
    console.log("Appointment added!");
  });
}
