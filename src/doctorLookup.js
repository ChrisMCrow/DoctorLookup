const Promise = require('es6-promise').Promise;

export class Search {
  lookup(name, query) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.API_KEY}&location=or-portland&query=${query}&name=${name}`;
      request.onload = function() {
        if(this.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}


export class Doctor {
  constructor(firstName, lastName, address, phone, newPatients) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phone = phone;
    this.newPatients = newPatients;
  }
}
