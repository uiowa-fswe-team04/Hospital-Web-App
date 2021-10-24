const express = require("express");
const app = express();

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
