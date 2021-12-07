// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('create_appointment_button').addEventListener('click', function() {
    decodeURIComponent(document.cookie);
    var doctorName = document.getElementById('doctors').value;
    var appointmentTime = document.getElementById('appointmentTime').value;
    var inputNotes = document.getElementById('inputNotes').value;
    var email;
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
    // use this to find user's name
    var patientName = cookie_to_use;
    
    const XML_req_hunt = new XMLHttpRequest();
    // successful data submission
    XML_req_hunt.addEventListener('load', function( event ) {
        alert('Appointment created');
        window.location.href = "/private/patient/patients_page.html"
    });
    // error
    XML_req_hunt.addEventListener(' error', function( event ) {
        alert('Something went wrong');
    });
    // set up POST request
    var host = location.hostname;
    var url = 'http://' + host + '/create_appointment?doctor=' + doctorName + '&time='+appointmentTime+'&notes='+inputNotes+'&patient='+patientName;
    XML_req_hunt.open('GET', url);
    XML_req_hunt.send(null);
});  

function getDoctors() 
{ 
  // makes GET request to populate drop down menu
  var host = location.hostname;
    var url = 'http://' + host + '/get_doctor_users';
  
  // http get request
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          try {
            var result_arr = JSON.parse(xmlHttp.responseText);
            console.log(result_arr);
          } catch (err) {
            // throw an error
           console.log(err);
          }   
          
          select = document.getElementById('doctors');
          for (const pat in result_arr){
            var name = result_arr[pat]['email']
            var opt = document.createElement('option');
            opt.value = name;
            opt.innerHTML = name;
            select.appendChild(opt);
            
          }
  }
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}