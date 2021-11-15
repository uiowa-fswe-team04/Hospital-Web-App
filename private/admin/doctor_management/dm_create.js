// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('create_account_button').addEventListener('click', function() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPasswordOrig').value;
    var password_confirm = document.getElementById('inputPasswordConfirm').value;
  
    if (password != password_confirm) {
        alert("Passwords must match");
        return;
    }
    
    //
});  