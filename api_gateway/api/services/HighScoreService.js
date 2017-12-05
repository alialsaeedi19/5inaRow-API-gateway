const rp = require('request-promise');

class HighScoreService {

  constructor(config) {
    this.config = config;

    //the url for the user management that i will call its api from
    this.url = 'http://localhost:3002'
  }

  get() {

    var url = this.url + '/5inarow/getall'

    const options = {
      method: 'GET',
      uri: url,
      json: true,
      resolveWithFullResponse: true

    };
    return rp(options);
  }
}


module.exports = HighScoreService;