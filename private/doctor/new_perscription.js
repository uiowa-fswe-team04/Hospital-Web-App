// Since this script is declared a module, need to add event listener on this end instead of onclick
document.getElementById('create_perscription_button').addEventListener('click', function() {
    var patientName = document.getElementById('inputName').value;
    var medicationName = document.getElementById('medicationName').value;
    var inputNotes = document.getElementById('inputNotes').value;
    
    const XML_req_hunt = new XMLHttpRequest();
    // successful data submission
    XML_req_hunt.addEventListener('load', function( event ) {
        alert('Perscription created');
        window.location.href = "/private/doctor/patients_page.html"
    });
    // error
    XML_req_hunt.addEventListener(' error', function( event ) {
        alert('Something went wrong. Account not created');
    });
    // set up POST request
    var host = location.hostname;
    var url = 'http://' + host + '/create_perscription?patient=' + patientName + '&medication='+medicationName+'&notes='+inputNotes;
    XML_req_hunt.open('GET', url);
    XML_req_hunt.send(null);
});  