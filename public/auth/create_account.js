// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('create_account_button').addEventListener('click', function() {
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPasswordOrig').value;
  var password_confirm = document.getElementById('inputPasswordConfirm').value;
  var name = document.getElementById('inputName').value;

  if (password != password_confirm) {
      alert("Passwords must match");
      return;
  }

  let login = new FormData();
  login.append("email", email);
  login.append("password", password);
  login.append("name", name);
  
  const XML_req_create = new XMLHttpRequest();
  // successful data submission
  XML_req_create.addEventListener('load', function( event ) {
    // login successful, store user/pass as cookies for future requests
    document.cookie = "email=" + email + ";path=/";
    document.cookie = "password=" + password + ";path=/";

    // attempt to switch to landing page of appropriate user role
    window.location.replace(XML_req_create.responseText);
  });
  // error
  XML_req_create.addEventListener(' error', function( event ) {
      alert('Something went wrong. Account not created');
  });
  // set up POST request
  var host = location.hostname;
  var url = 'http://' + host + '/create_patient_user';
  XML_req_create.open('POST', url);
  XML_req_create.send(login);
});
