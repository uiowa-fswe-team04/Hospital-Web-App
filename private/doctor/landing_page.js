document.getElementById('sign_out_button').addEventListener('click', function() {
  // redirect to logout path
  var host = location.hostname;
  document.location.replace('http://' + host + '/public/auth/login.html');
});

document.getElementById('home_bar').addEventListener('click', function(){
    window.location.href = "/private/doctor/landing_page.html"
});

document.getElementById('patient_bar').addEventListener('click', function(){
  window.location.href = "/private/doctor/patients_page.html"
});

document.getElementById('labs_bar').addEventListener('click', function(){
  window.location.href = "/private/doctor/labs_page.html"
});

document.getElementById('notification_bar').addEventListener('click', function(){
  window.location.href = "/private/doctor/notifications_page.html"
});