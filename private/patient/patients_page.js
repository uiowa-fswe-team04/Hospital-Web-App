// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('sign_out_button').addEventListener('click', function() {
  // redirect to logout path
  var host = location.hostname;
  document.cookie = "email=expireme;path=/;expires=Tue, 14 Aug 1945 12:00:00 UTC";
  document.cookie = "password=expireme;path=/;expires=Tue, 14 Aug 1945 12:00:00 UTC";
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

function getAppointments()
{
  // Get user name
  var cookie_to_use = "";
  var cookie_name = "email=";
  var raw_cookie = decodeURIComponent(document.cookie);
  var cookie_arr = raw_cookie.split(";");
  for (var i = 0; i < cookie_arr.length; i++)
    {
      // Checks if begins with space and removes
      if (cookie_arr[i][0] == " ") {
        cookie_arr[i] = cookie_arr[i].substring(1);
      }
      if (cookie_arr[i].substring(0, cookie_name.length) == cookie_name)
      {
        cookie_to_use = cookie_arr[i].substring(cookie_name.length, cookie_arr[i].length);
        break;
      }
    }

  // makes GET request to populate table
  var host = location.hostname;
  var url = 'http://' + host + '/get_appointments_list';
  console.log(url);
  // http get request
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          try {
            var appointment = JSON.parse(xmlHttp.responseText);
            var numPatients = appointment.length;
            var index = 0;
          for (var i = 0; i < numPatients; i++) {
            if (cookie_to_use == appointment[i]["patient"]) {
              var table = document.getElementById("tableData");
              var row = table.insertRow(index+1);
              index = index + 1;
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);

              cell1.innerHTML = appointment[i]["name"];
              cell2.innerHTML = appointment[i]["time"];
              cell3.innerHTML = appointment[i]["notes"];
            }
          }
          } catch (err) {
            // throw an error
           console.log(err);
          }               
  }
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);

}