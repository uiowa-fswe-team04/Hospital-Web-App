let trash_can = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"#BD472A\" class=\"bi bi-trash float-end\" viewBox=\"0 0 16 16\" onclick=\"delete_doctor(this.parentNode)\"><style>svg{cursor:pointer;}</style><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/><path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg>"
document.addEventListener("DOMContentLoaded", function() {
    populate_doctors();

    document.getElementById('sign_out_button').addEventListener('click', function() {
      // redirect to logout path
      var host = location.hostname;
      var logout_route = 'http://' + host + '/logout';
      document.location.replace(logout_route);
    });
    
    document.getElementById('home_bar').addEventListener('click', function(){
      window.location.href =("/private/admin/landing_page.html")
    });
    
    document.getElementById('doctor_bar').addEventListener('click', function(){
      window.location.href =("/private/admin/doctor_management/dm_landing.html")
    });
});

function populate_doctors() {
    // clear previous cards
    document.getElementById('doctor_cards').innerHTML = "";
  
    // makes GET requests to populate drop down menus
    var host = location.hostname;
    var url = 'http://' + host + '/get_doctor_users';
    // http get request
    var xmlHttpMarker = new XMLHttpRequest();
    xmlHttpMarker.onreadystatechange = function() {
        if (xmlHttpMarker.readyState == 4 && xmlHttpMarker.status == 200)
            try {
              var result_arr = JSON.parse(xmlHttpMarker.responseText);

              console.log(result_arr);
  
              if (result_arr){
                for (const doctor of Object.keys(result_arr)){
                  // Add tile to HTML
                  var container = document.createElement("div");
                  container.className = "card shadow-lg m-3 p-3 rounded";
                  container.id = "doctor_card";
                  container.style.cssText = "width: 24rem;";
                  container.innerHTML = "<div class=\"m-1\">" + trash_can + "<p id=\"doctor_email\">" + result_arr[doctor]["email"] + "</p></div>";
                  document.getElementById('doctor_cards').appendChild(container);
                };
              }
            } catch (err) {
              // throw an error
            }
    }
    xmlHttpMarker.open("GET", url, true);
    xmlHttpMarker.send(null);
  }

  function delete_doctor(parent_element) {
    var host = location.hostname;
    var doctor_email = parent_element.querySelector("#doctor_email").innerHTML;
    var url = 'http://' + host + '/del_doctor_users?email=' + doctor_email;
  
    const XML_req = new XMLHttpRequest();
    // successful data submission
    XML_req.addEventListener('load', function( event ) {
      alert(doctor_email + ' deleted');
    });
    // error
    XML_req.addEventListener(' error', function( event ) {
      alert('Something went wrong.');
    });
    // set up request
    XML_req.open('GET', url);
    // Send
    XML_req.send(null);
  
    populate_doctors();
  }