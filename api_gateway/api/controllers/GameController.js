const GameService = require('../services/GameService');
const AuthenticationService = require('../services/AuthenticationService')
const UserService = require('../services/UserService')

class GameController {

  constructor(config, router) {
    this.gameService = new GameService(config);
    this.userService = new UserService(config);
    this.authenticationService = new AuthenticationService(config);

    this.config = config;

    this.basePath = '/game'

    //POST: for creating game : provided url + '/api/game/'
    router.post(this.basePath + "/", this.create.bind(this));

    // PUT : for updating the content of the game : provided url + '/api/game/123abc'  where 123abc is the gameId of the game to be updated
    router.put(this.basePath + "/update", this.update.bind(this));

    router.get(this.basePath + "/polling/:gameId", this.get.bind(this));

    // DELETE: for quiting game : provided url + '/api/game/123abc' where 123abc is the gameId of the game to be deleted
    router.delete(this.basePath + "/:gameId", this.delete.bind(this));
  }

  get(req, res) {
    const method = 'GameController.get';
    const path = 'GET ' + this.basePath + '/';
    console.info(method, 'Access to', path);
    var headers = req.headers
    var gameId = body.gameId;

    this.authenticationService.authenticate(headers).then((result) => {
      var userName = result.msg

      this.gameService.polling(gameId, userName).then((result) => {
        res.status(200).json({success: true, msg: result})

      }).catch((err) => {
        res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      });

    }).catch((err) => {

      res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      console.log(method + err);
    });
  }

  create(req, res) {
    const method = 'GameController.create';
    const path = 'POST ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var headers = req.headers

    this.authenticationService.authenticate(headers).then((result) => {
      var userName = result.msg

      this.userService.searchForPlayers(userName).then((result) => {
        var player1 = result.player1
        var player2 = result.player2

        this.gameService.create(player1, player2).then((result) => {
          res.status(201).json({success: true, gameId: result.game_id});
        }).catch((err) => {
          res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
          console.log(method + err);
        });


      }).catch((err) => {

        res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
        console.log(method + err);
      });


    }).catch((err) => {
      res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      console.log(method + err.statusCode);
    });


  }

  update(req, res) {
    const method = 'GameController.update';
    const path = 'PUT ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var headers = req.headers
    var body = req.body;
    var gameId = body.gameId;
    var row = body.row
    var column = body.column

    this.authenticationService.authenticate(headers).then((result) => {
      var userName = result.msg

      this.gameService.update(req.params.gameId, userName, row, column).then((result) => {
        if (result.statusCode == 205) {
          this.gameService.delete(gameId).then((result) => {

            this.userService.changeStatus(result.first_player, result.second_player, 'nothing').then((result) => {
              res.status(205).json({success: true, winner: userName})
            }).catch((err) => {
              res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
            });

          }).catch((err) => {
            res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
          });
        }
        else {
          res.status(200).send({success: true, msg: 'player has moved'})
        }
      }).catch((err) => {
        res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
        console.log(method + err);
      });

    }).catch((err) => {
      res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      console.log(method + err);
    });


  }

  delete(req, res) {
    const method = 'GameController.delete';
    const path = 'DELETE ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var headers = req.headers
    var gameId = req.body.gameId;

    this.authenticationService.authenticate(headers).then((result) => {
      var userName = result.msg
      res.send(result)

      this.gameService.delete(gameId).then((result) => {
        var firstPlayer = result.first_player
        var secondPlayer = result.second_player

        this.userService.changeStatus(firstPlayer, secondPlayer, 'nothing').then((result) => {

          res.status(200).json({success: true, msg: 'game has finished'})
        }).catch((err) => {
          res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
        });

      }).catch((err) => {
        res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      });


    }).catch((err) => {
      res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      console.log(method + err);
    });
  }

}


module
  .exports = GameController;