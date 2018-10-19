import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Doctor, Search } from './doctorLookup.js';

$(document).ready(function() {
  $("form#doctorLookup").submit(function(event) {
    event.preventDefault();
    let doctorName = $("input#doctorName").val();
    let query = $("input#query").val();

    let newSearch = new Search();
    let promise = newSearch.lookup(doctorName, query);

    promise.then(function(response) {
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
    }, function(error) {
      $('#errors').text(`There was an error processing your request. Please try again. ${error}`);
    });
  });
});
