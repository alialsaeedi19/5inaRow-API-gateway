const rp = require('request-promise');

class GameService {

  constructor(config) {
    this.config = config;

    // the url i will call the game api,s from
    this.url = 'http://localhost:8080/api'
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

  create(player1, player2) {


    var url = this.url + '/create';
    var options = {
      method: 'POST',
      uri: url,
      body: {
        firstPlayer: player1
        ,
        secondPlayer: player2
      },
      json: true
    };

    return rp(options);
  }

  update(id , player , row , column) {


    var url = this.url + '/processing';
    var options = {
      method: 'POST',
      uri: url,
      body: {
        gameid : id,
        player : player,
        row : row,
        column : column
      },
      json: true
    };

    return rp(options);
  }

  delete(id , player) {


    var url = this.url + '/quit';
    var options = {
      method: 'DELETE',
      uri: url,
      body: {
        gameid : id ,
        player : player
      },
      json: true
    };
    return rp(options);
  }


}


module.exports = GameService;