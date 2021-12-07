document.getElementById('sign_out_button').addEventListener('click', function() {
  // redirect to logout path
  var host = location.hostname;
  document.location.replace('http://' + host + '/public/auth/login.html');
});

document.getElementById('home_bar').addEventListener('click', function(){
    window.location.replace("landing_page.html")
});

document.getElementById('patient_bar').addEventListener('click', function(){
  window.location.replace("patients_page.html")
});

document.getElementById('labs_bar').addEventListener('click', function(){
  window.location.replace("labs_page.html")
});

document.getElementById('notification_bar').addEventListener('click', function(){
  window.location.replace("notifications_page.html")
});