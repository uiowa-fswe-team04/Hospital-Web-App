document.getElementById('sign_out_button').addEventListener('click', function() {
  // redirect to logout path
  var host = location.hostname;
  document.cookie = "email=expireme;path=/;expires=Tue, 14 Aug 1945 12:00:00 UTC";
  document.cookie = "password=expireme;path=/;expires=Tue, 14 Aug 1945 12:00:00 UTC";
  document.location.replace('http://' + host + '/public/auth/login.html');
});

document.getElementById('home_bar').addEventListener('click', function(){
  window.location.href =("/private/patient/landing_page.html")
});

document.getElementById('patient_bar').addEventListener('click', function(){
  window.location.href =("/private/patient/patients_page.html")
});

document.getElementById('labs_bar').addEventListener('click', function(){
  window.location.href =("/private/patient/labs_page.html")
});

document.getElementById('notification_bar').addEventListener('click', function(){
  window.location.href =("/private/patient/notifications_page.html")
});