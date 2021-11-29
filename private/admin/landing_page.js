// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('sign_out_button').addEventListener('click', function() {
  // redirect to logout path
  var host = location.hostname;
  document.location.replace('http://' + host + '/public/auth/login.html');
});

document.getElementById('home_bar').addEventListener('click', function(){
  window.location.href =("/private/admin/landing_page.html")
});

document.getElementById('doctor_bar').addEventListener('click', function(){
  window.location.href =("/private/admin/doctor_management/dm_landing.html")
});