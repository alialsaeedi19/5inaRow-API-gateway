const rp = require('request-promise');

class AuthenticationService {

  constructor(config) {
    this.config = config;

    //the url for the user management that i will call its api from
    this.url = ''
  }
  authenticate(token) {

    var url = this.url + '/' + id;
    const options = {
      method: 'GET',
      headers: {
        'token': token
      },
      uri: url,
      json: true
    };
    return rp(options);
  }

}


module.exports = AuthenticationService;