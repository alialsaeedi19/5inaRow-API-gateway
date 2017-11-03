const rp = require('request-promise');

class GameService{

  constructor(config) {
    this.config = config;

    // the url i will call the game api,s from
    this.url = ''
  }

  get(id) {


    var url = this.url + '/' + id;
    const options = {
      method: 'GET',
      uri: url,
      json: true
    };
    return rp(options);
  }

  create() {


    var url = this.url + '/';
    var options = {
      method: 'POST',
      uri: url,
      body: {

      },
      json: true
    };

    return rp(options);
  }

  update(id) {


    var url = this.url + '/' + id;
    var options = {
      method: 'POST',
      uri: url,
      body: {
        // some: 'payload'
      },
      json: true
    };

  }

  delete(id) {


    var url = this.url + '/' + id;
    var options = {
      method: 'DELETE',
      uri: url,
      body: {
        // some: 'payload'
        id : '{id}'
      },
      json: true
    };

  }
}


module.exports = GameService;