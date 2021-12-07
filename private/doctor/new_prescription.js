// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('create_prescription_button').addEventListener('click', function() {
    var patientName = document.getElementById('patients').value;
    var medicationName = document.getElementById('medicationName').value;
    var inputNotes = document.getElementById('inputNotes').value;
    
    const XML_req_hunt = new XMLHttpRequest();
    // successful data submission
    XML_req_hunt.addEventListener('load', function( event ) {
        alert('Prescription created');
        window.location.href = "/private/doctor/patients_page.html"
    });
    // error
    XML_req_hunt.addEventListener(' error', function( event ) {
        alert('Something went wrong');
    });
    // set up POST request
    var host = location.hostname;
    var url = 'http://' + host + '/create_prescription?patient=' + patientName + '&medication='+medicationName+'&notes='+inputNotes;
    XML_req_hunt.open('GET', url);
    XML_req_hunt.send(null);
});  

function getPatients() 
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

  // makes GET request to populate drop down menu
  var host = location.hostname;
  var url = 'http://' + host + '/get_appointments_list';
  
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
        
        console.log(result_arr);

        select = document.getElementById('patients');
        if (result_arr){
          for (const appointment of Object.keys(result_arr)){
            if (result_arr[appointment]["name"] == cookie_to_use)
            {
              var patient_name = result_arr[appointment]['patient']
              var opt = document.createElement('option');
              opt.value = patient_name;
              opt.innerHTML = patient_name;
              select.appendChild(opt);
            }
          };
        }
  }
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}
