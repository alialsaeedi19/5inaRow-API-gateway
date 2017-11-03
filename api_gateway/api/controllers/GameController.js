const GameService = require('../services/GameService');

class GameController {

  constructor(config, router) {
    this.gameService = new GameService(config);
    this.config = config;
    this.basePath = '/game'

    //POST: for creating game : provided url + '/api/game/'
    router.post(this.basePath + "/", this.create.bind(this));

    // PUT : for updating the content of the game : provided url + '/api/game/123abc'  where 123abc is the id of the game to be updated
    router.put(this.basePath + "/:id", this.update.bind(this));

    // GET: for getting game : provided url + '/api/game/123abc' where 123abc is the id of the game to get
    router.get(this.basePath + "/:id", this.get.bind(this));

    // DELETE: for getting game : provided url + '/api/game/123abc' where 123abc is the id of the game to be deleted
    router.delete(this.basePath + "/:id", this.delete.bind(this));
  }

  get(req, res) {
    const method = 'GameController.get';
    const path = 'GET ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    res.send("success : " + method)
    // this.gameService.get(req.params.id).then((result) => {
    //
    // }).catch((err) => {
    //   res.send(500)
    // });

  }

  create(req, res) {
    const method = 'GameController.create';
    const path = 'POST ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    res.send("success : " + method)
    // this.gameService.create().then((result) => {
    //
    // }).catch((err) => {
    //
    //   res.send(500)
    // });

  }

  update(req, res) {
    const method = 'GameController.update';
    const path = 'PUT ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    res.send("success : " + method)

    // this.gameService.update(req.params.id).then((result) => {
    //
    // }).catch((err) => {
    //   res.send(500)
    // });
  }

  delete(req, res) {
    const method = 'GameController.delete';
    const path = 'DELETE ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    res.send("success : " + method)

    // this.gameService.delete(req.params.id).then((result) => {
    //
    // }).catch((err) => {
    //   res.send(500)
    // });
  }

}


module.exports = GameController;