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
    // makes GET request to populate drop down menu
  var host = location.hostname;
  var url = 'http://' + host + '/request_patients';
  
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
          
          select = document.getElementById('patients');
          for (const pat in result_arr){
            var name = result_arr[pat]['email']
            var opt = document.createElement('option');
            opt.value = name;
            opt.innerHTML = name;
            select.appendChild(opt);
            
            //var container = document.createElement("div");
            //container.innerHTML = html_options;
            //document.getElementById('hunt_list').appendChild(container);
            //huntList.push(result_arr[hunt]);
          }
  }
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}
