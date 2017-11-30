const rp = require('request-promise');

class AuthenticationService {

  constructor(config) {
    this.config = config;

    //the url for the user management that i will call its api from
    this.url = 'http://localhost:4200/api'
  }

  authenticate(headers) {

    var token = this.getToken(headers);
    token = 'JWT ' + token

    var url = this.url + '/checktoken';
    const options = {
      method: 'GET',
      headers: {
        Authorization: token

      },
      uri: url,
      json: true
    };
    return rp(options);
  }

  getToken (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}


module.exports = AuthenticationService;