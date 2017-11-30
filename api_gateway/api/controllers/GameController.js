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

    // PUT : for updating the content of the game : provided url + '/api/game/123abc'  where 123abc is the id of the game to be updated
    router.put(this.basePath + "/:id", this.update.bind(this));

    // GET: for getting game : provided url + '/api/game/123abc' where 123abc is the id of the game to signOut
    router.get(this.basePath + "/:id", this.get.bind(this));

    // DELETE: for quiting game : provided url + '/api/game/123abc' where 123abc is the id of the game to be deleted
    router.delete(this.basePath + "/:id", this.delete.bind(this));
  }

  get(req, res) {
    const method = 'GameController.get';
    const path = 'GET ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    res.send("success : " + method)

    // this.gameService.signOut(req.params.id).then((result) => {
    //
    // }).catch((err) => {
    //   res.send(500)
    // });

  }

  create(req, res) {
    const method = 'GameController.create';
    const path = 'POST ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var headers = req.headers

    this.authenticationService.authenticate(headers).then((result) => {
      var userName = result.msg

      this.userService.searchForPlayers(userName).then((result) => {
        res.send(result)
        var player1 = result.player1
        var player2 = result.player2

        // this.gameService.create(player1, player2).then((result) => {
        //   res.status(201).json({success: true, gameId: result.Game_id});
        // }).catch((err) => {
        //   res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
        //   console.log(method + err);
        // });


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
    var gameid = req.params.id;
    var row = body.row
    var column = body.column

    this.authenticationService.authenticate(headers).then((result) => {
      var userName = result.msg
      res.send(result)

      // this.gameService.update(req.params.id, userName, row, column).then((result) => {
      //   res.status(200).json({success: true, msg: 'player has moved'})
      // }).catch((err) => {
      //   res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      //   console.log(method + err);
      // });

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
    var gameid = req.params.id;

    this.authenticationService.authenticate(headers).then((result) => {
      var userName = result.msg
      res.send(result)

      // this.gameService.delete(gameid, userName).then((result) => {
      //   res.status(200).json({success: true, highScore: result.highScore})
      // }).catch((err) => {
      //   res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      // });


    }).catch((err) => {
      res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      console.log(method + err);
    });
  }

}


module
  .exports = GameController;