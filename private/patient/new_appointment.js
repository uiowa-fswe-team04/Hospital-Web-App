// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('create_appointment_button').addEventListener('click', function() {
    var doctorName = document.getElementById('doctor').value;
    var appointmentTime = document.getElementById('appointmentTime').value;
    var inputNotes = document.getElementById('inputNotes').value;
    var patientName = "Bryce"
    
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
          } catch (err) {
            // throw an error
           console.log(err);
          }   
          
          select = document.getElementById('doctors');
          for (const pat in result_arr){
            var name = result_arr[pat]['name']
            var opt = document.createElement('option');
            opt.value = name;
            opt.innerHTML = name;
            select.appendChild(opt);
            
          }
  }
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}