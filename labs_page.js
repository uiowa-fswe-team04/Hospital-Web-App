// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('sign_out_button').addEventListener('click', function() {
  // redirect to logout path
});

document.getElementById('home_bar').addEventListener('click', function(){
    window.location.replace("/landing_page.html")
});

document.getElementById('patient_bar').addEventListener('click', function(){
  window.location.replace("/patients_page.html")
});

document.getElementById('labs_bar').addEventListener('click', function(){
  window.location.replace("/labs_page.html")
});

document.getElementById('notification_bar').addEventListener('click', function(){
  window.location.replace("/notifications_page.html")
});