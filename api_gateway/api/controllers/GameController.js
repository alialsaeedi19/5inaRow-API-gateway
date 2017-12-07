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

    // PUT : for updating The content of The game : provided url + '/api/game/123abc'  where 123abc is The gameId of The game to be updated
    router.put(this.basePath + "/update", this.update.bind(this));

    router.get(this.basePath + "/poll/:gameId", this.polling.bind(this));

    // DELETE: for quiting game : provided url + '/api/game/123abc' where 123abc is The gameId of The game to be deleted
    router.delete(this.basePath + "/:gameId", this.delete.bind(this));
  }

  polling(req, res) {
    const method = 'GameController.polling';
    const path = 'GET ' + this.basePath + '/';
    console.info(method, 'Access to', path);
    var headers = req.headers
    var gameId = req.params.gameId;

    this.authenticationService.authenticate(headers).then((result) => {
      var userName = result.body.msg

      this.gameService.polling(gameId, userName).then((result) => {
        var status = result.statusCode
        var gameResult = result

        if (status == 205) {
          this.gameService.delete(gameId).then((result) => {

            this.userService.changeStatus(result.body.first_player, result.body.second_player, 'nothing').then((result) => {

              res.status(status).json(gameResult.body)
            }).catch((err) => {
              res.status(err.statusCode).json({success: false, msg: err.error});
            });

          }).catch((err) => {
            if (!err.statusCode) {
              res.status(502).json({success: false, msg: 'The game engine service is not running'});
            }
            else {
              res.status(err.statusCode).json(err.error);
            }
          });
        }
        else {
          res.status(status).json(gameResult.body)
        }

      }).catch((err) => {
        if (!err.statusCode) {
          res.status(502).json({success: false, msg: 'The game engine service is not running'});
        }
        else {
          res.status(err.statusCode).json(err.error);
        }
      });

    }).catch((err) => {
      if (!err.statusCode) {
        res.status(502).json({success: false, msg: 'The game engine service is not running'});
      }
      else {
        res.status(err.statusCode).json(err.error);
      }
    });
  }

  create(req, res) {
    const method = 'GameController.create';
    const path = 'POST ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var headers = req.headers

    this.authenticationService.authenticate(headers).then((result) => {
      var userName = result.body.msg

      this.userService.searchForPlayers(userName).then((result) => {
        var player1 = result.body.player1
        var player2 = result.body.player2

        this.gameService.create(player1, player2).then((result) => {
          res.status(result.statusCode).json({success: true, gameId: result.body.game_id});
        }).catch((err) => {
          if (!err.statusCode) {
            res.status(502).json({success: false, msg: 'The game engine service is not running'});
          }
          else {
            res.status(err.statusCode).json(err.error);
          }
        });


      }).catch((err) => {

        if (!err.statusCode) {
          res.status(502).json({success: false, msg: 'The game engine service is not running'});
        }
        else {
          res.status(err.statusCode).json(err.error);
        }
      });


    }).catch((err) => {
      if (!err.statusCode) {
        res.status(502).json({success: false, msg: 'The game engine service is not running'});
      }
      else {
        res.status(err.statusCode).json(err.error);
      }
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
      var userName = result.body.msg

      this.gameService.update(gameId, userName, row, column).then((result) => {
        var status = result.statusCode;
        var gameResults = result.body
        if (status == 205) {
          this.gameService.delete(gameId).then((result) => {
            this.userService.changeStatus(result.body.first_player, result.body.second_player, 'nothing').then((result) => {
              res.status(result.statusCode).json(gameResults)
            }).catch((err) => {
              if (!err.statusCode) {
                res.status(502).json({success: false, msg: 'The game engine service is not running'});
              }
              else {
                res.status(err.statusCode).json(err.error);
              }
            });

          }).catch((err) => {
            if (!err.statusCode) {
              res.status(502).json({success: false, msg: 'The game engine service is not running'});
            }
            else {
              res.status(err.statusCode).json(err.error);
            }
          });
        }
        else {
          res.status(status).send(gameResults)
        }
      }).catch((err) => {
        if (!err.statusCode) {
          res.status(502).json({success: false, msg: 'The game engine service is not running'});
        }
        else {
          res.status(err.statusCode).json(err.error);
        }
      });

    }).catch((err) => {
      if (!err.statusCode) {
        res.status(502).json({success: false, msg: 'The game engine service is not running'});
      }
      else {
        res.status(err.statusCode).json(err.error);
      }
    });


  }

  delete(req, res) {
    const method = 'GameController.delete';
    const path = 'DELETE ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var headers = req.headers
    var gameId = req.params.gameId;

    this.authenticationService.authenticate(headers).then((result) => {
      var userName = result.body.msg

      this.gameService.delete(gameId).then((result) => {
        var gameResult = result
        var status = result.statusCode
        var firstPlayer = result.body.first_player
        var secondPlayer = result.body.second_player

        this.userService.changeStatus(firstPlayer, secondPlayer, 'nothing').then((result) => {

          res.status(status).json(gameResult.body)
        }).catch((err) => {
          if (!err.statusCode) {
            res.status(502).json({success: false, msg: 'The game engine service is not running'});
          }
          else {
            res.status(err.statusCode).json(err.error);
          }
        });

      }).catch((err) => {
        if (!err.statusCode) {
          res.status(502).json({success: false, msg: 'The game engine service is not running'});
        }
        else {
          res.status(err.statusCode).json(err.error);
        }
      });


    }).catch((err) => {

      if (!err.statusCode) {
        res.status(502).json({success: false, msg: 'The game engine service is not running'});
      }
      else if (err.statusCode == 401) {
        res.status(489).json({success: false, msg: 'invalid token'});
      }
      else {
        res.status(err.statusCode).json({success: false, msg: err.response.body.message});
      }
    });
  }

}


module
  .exports = GameController;