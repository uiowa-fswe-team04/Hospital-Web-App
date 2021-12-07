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
    
    const XML_req_hunt = new XMLHttpRequest();
    // successful data submission
    XML_req_hunt.addEventListener('load', function( event ) {
        alert('Account created');
        window.location.replace('http://' + host + '/private/admin/doctor_management/dm_landing.html');
    });
    // error
    XML_req_hunt.addEventListener(' error', function( event ) {
        alert('Something went wrong. Account not created');
    });
    // set up POST request
    var host = location.hostname;
    var url = 'http://' + host + '/create_doctor_user';
    XML_req_hunt.open('POST', url);
    XML_req_hunt.send(login);
});  