// Add link to create account based off current URL
const host = location.hostname;
var createAccountUrl = 'http://' + host + '/public/auth/create_account.html';
document.getElementById("create_account_div").innerHTML = "<a href=\"" + createAccountUrl + "\">No account? Create one here!</a>";

// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('sign_in_button').addEventListener('click', function() {
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;

  let login = new FormData();
  login.append("email", email);
  login.append("password", password);

  const XML_req_login = new XMLHttpRequest();
  // successful data submission
  XML_req_login.addEventListener('load', function( event ) {

    // login successful, store user/pass as cookies for future requests
    document.cookie = "email=" + email + ";path=/";
    document.cookie = "password=" + password + ";path=/";

    // attempt to switch to landing page of appropriate user role
    window.location.replace(XML_req_login.responseText);

  });
  // error
  XML_req_login.addEventListener(' error', function( event ) {
      alert('Something went wrong. Not logged in');
  });
  // set up POST request
  var host = location.hostname;
  var url = 'http://' + host + '/login';
  console.log(url);
  XML_req_login.open('POST', url);
  XML_req_login.send(login);
});