const rp = require('request-promise');

class UserService {

  constructor(config) {
    this.config = config;

    //the url for the user management that i will call its api from
    this.url = 'http://localhost:4200/api'
  }

  signOut(userName) {

    var url = this.url + '/logout' + '/' + userName
    const options = {
      method: 'GET',
      uri: url,
      json: true,
      resolveWithFullResponse: true
    };
    return rp(options);
  }

  create(userName, password) {

    var url = this.url + '/signup';
    var options = {
      method: 'POST',
      uri: url,
      body: {
        'name': userName,
        'password': password
      },
      json: true,
      resolveWithFullResponse: true

    };

    return rp(options);
  }

  update(id, password) {

    var url = this.url + '/' + id;
    var options = {
      method: 'POST',
      uri: url,
      body: {
        // here the information to be updated ( password)
        password: '{password}'
      },
      json: true,
      resolveWithFullResponse: true

    };
    return rp(options);
  }

  delete(id) {


    var url = this.url + '/' + id;
    var options = {
      method: 'DELETE',
      uri: url,
      body: {},
      json: true,
      resolveWithFullResponse: true

    };
    return rp(options);

  }

  signIn(userName, password) {

    var url = this.url + '/login';

    var options = {
      method: 'POST',
      uri: url,
      body: {
        // the information to the user
        'name': userName,
        'password': password
      },
      json: true,
      resolveWithFullResponse: true

    };
    return rp(options);

  }

  searchForPlayers(firstPlayer) {
    var url = this.url + '/search';

    var options = {
      method: 'POST',
      uri: url,
      body: {
        firstPlayer: firstPlayer
      },
      json: true,
      resolveWithFullResponse: true

    };
    return rp(options)
  }

  changeStatus(firstPlayer ,secondPlayer, status) {
    var url = this.url + '/changestatus';

    var options = {
      method: 'POST',
      uri: url,
      body: {
        firstPlayer: firstPlayer,
        secondPlayer : secondPlayer,
        status : status
      },
      json: true,
      resolveWithFullResponse: true

    };
    return rp(options)
  }
}


module.exports = UserService;