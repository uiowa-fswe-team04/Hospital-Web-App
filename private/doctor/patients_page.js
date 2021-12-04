// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('sign_out_button').addEventListener('click', function() {
  // redirect to logout path
  var host = location.hostname;
  var logout_route = 'http://' + host + '/logout';
  document.location.replace(logout_route);
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

function getPatients()
{
  // makes GET request to populate table
  var host = location.hostname;
  var url = 'http://' + host + '/get_prescription_list';
  console.log(url);
  // http get request
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          try {
            var patients = JSON.parse(xmlHttp.responseText);

            var numPatients = patients.length;
          for (var i = 0; i < numPatients; i++) {
            var table = document.getElementById("tableData");
            var row = table.insertRow(i+1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.innerHTML = patients[i]["name"];
            cell2.innerHTML = patients[i]["medication"];
            cell3.innerHTML = patients[i]["notes"];

            var button = document.createElement('button');
            button.innerHTML = 'Delete';
            button.myParam = patients[i]["id"]
            button.className = "button3"
            button.addEventListener("click", removePrescription);
            cell4.appendChild(button);
          }
          } catch (err) {
            // throw an error
           console.log(err);
          }               
  }
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);

}

function newPrescription()
{
  window.location.replace("new_prescription.html")
}

function removePrescription(evt) {
  var id_delete = evt.currentTarget.myParam

  const XML_req_hunt = new XMLHttpRequest();
  // successful data submission
  XML_req_hunt.addEventListener('load', function( event ) {
      alert('Prescription deleted');
      window.location.href = "/private/doctor/patients_page.html"
  });
  // error
  XML_req_hunt.addEventListener(' error', function( event ) {
      alert('Something went wrong');
  });
  // set up POST request
  var host = location.hostname;
  var url = 'http://' + host + '/delete_prescription?id=' + id_delete;
  XML_req_hunt.open('GET', url);
  XML_req_hunt.send(null);
}