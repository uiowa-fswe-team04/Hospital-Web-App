// Add link to create account based off current URL
const host = location.hostname;
var createAccountUrl = 'http://' + host + '/public/auth/create_account.html';
document.getElementById("create_account_div").innerHTML = "<a href=\"" + createAccountUrl + "\">No account? Create one here!</a>";

// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('sign_in_button').addEventListener('click', function() {
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;
  
  const XML_req_hunt = new XMLHttpRequest();
  // successful data submission
  XML_req_hunt.addEventListener('load', function( event ) {
      alert('Logged in');
  });
  // error
  XML_req_hunt.addEventListener(' error', function( event ) {
      alert('Something went wrong. Not logged in');
  });
  // set up POST request
  var host = location.hostname;
  var url = 'http://' + host + '/';
  XML_req_hunt.open('POST', url);
  XML_req_hunt.send(login);
});