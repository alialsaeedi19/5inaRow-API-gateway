const rp = require('request-promise');

class GameService {

  constructor(config) {
    this.config = config;

    // the url i will call the game api,s from
    this.url = 'http://localhost:8080'
  }

  polling(gameId, player) {


    var url = this.url + '/gamesState' + '?' + 'gameId=' + gameId + '&' + 'player='  + player;
    const options = {
      method: 'GET',
      uri: url,
      json: true,
      resolveWithFullResponse: true

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
      json: true,
      resolveWithFullResponse: true
    };

    return rp(options);
  }

  update(gameId, player, row, column) {


    var url = this.url + '/processing';
    var options = {
      method: 'PUT',
      uri: url,
      body: {
        gameId: gameId,
        lastPlayer: player,
        row: row,
        column: column
      },
      json: true,
      resolveWithFullResponse: true

    };

    return rp(options);
  }

  delete(gameId) {


    var url = this.url + '/quit' + '?' + 'gameId=' + gameId;
    var options = {
      method: 'DELETE',
      uri: url,
      json: true,
      resolveWithFullResponse: true

    };
    return rp(options);
  }


}


module.exports = GameService;