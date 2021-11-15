// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('create_account_button').addEventListener('click', function() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPasswordOrig').value;
    var password_confirm = document.getElementById('inputPasswordConfirm').value;
  
    if (password != password_confirm) {
        alert("Passwords must match");
        return;
    }
    
    const XML_req_hunt = new XMLHttpRequest();
    // successful data submission
    XML_req_hunt.addEventListener('load', function( event ) {
        alert('Account created');
        window.location.replace('http://' + host);
    });
    // error
    XML_req_hunt.addEventListener(' error', function( event ) {
        alert('Something went wrong. Account not created');
    });
    // set up POST request
    var host = location.hostname;
    var url = 'http://' + host + '/create_doctor_user?email=' + email;
    XML_req_hunt.open('GET', url);
    XML_req_hunt.send(null);
});  