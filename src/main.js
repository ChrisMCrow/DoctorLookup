import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// const Promise = require('es6-promise').Promise;

$(document).ready(function() {
  $("form#doctorLookup").submit(function(event) {
    let doctorName = $("input#doctorName").val();
    let query = $("input#query").val();

    $.ajax({
      url: `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${API_KEY}&location=or-portland&query=${query}&name=${doctorName}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $("results-table").empty();

        let body = JSON.parse(response);
        for (let i = 0; i < body.data.length; i++) {
          let firstName = body.data[i].profile.first_name;
          let lastName = body.data[i].profile.last_name;
          let address =
            `${body.data[i].practices[0].visit_address.street}
            ${body.data[i].practices[0].visit_address.street2}
            ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state} ${body.data[i].practices[0].visit_address.zip}`;
          let phone = body.data[i].practices[0].phones.number;
          let newPatients = body.data[i].practices[0].accepts_new_patients;
          let doctor = new Doctor(firstName, lastName, address, phone, newPatients);

          $('#results-table').append(
            `<tr>
              <td>${doctor.firstName}</td>
              <td>${doctor.lastName}</td>
              <td>${doctor.address}</td>
              <td>${doctor.phone}</td>
              <td>${doctor.newPatients}</td>
            </tr>`
          );
        }
      },
      error: function() {
        $('#errors').text("There was an error processing your request. Please try again.");
      }
    });
  })
});
