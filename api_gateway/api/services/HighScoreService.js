const rp = require('request-promise');

class HighScoreService {

  constructor(config) {
    this.config = config;

    //the url for the user management that i will call its api from
    this.url = ''
  }

  get() {

    var url = this.url + '/'

    const options = {
      method: 'GET',
      uri: url,
      json: true
    };
    return rp(options);
  }
}


module.exports = HighScoreService;