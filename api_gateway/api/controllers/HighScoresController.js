const HighScoresService = require('../services/HighScoreService');
const AuthenticationService = require('../services/AuthenticationService')


class HighScoresController {

  constructor(config, router) {

    this.highScoresService = new HighScoresService(config);
    this.authenticationService = new AuthenticationService(config);
    this.config = config;
    this.basePath = '/highScores'

    router.get(this.basePath + "/", this.get.bind(this));


  }

  get(req, res) {
    const method = 'HighScoresController.get';
    const path = 'GET ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var headers = req.headers
    if (!headers) res.send(502)
    else {
      this.authenticationService.authenticate(headers).then((result) => {

        this.highScoresService.get().then((result) => {
          res.status(200).json({success: true, msg: result.body})
        }).catch((err) => {
          if(!err.statusCode) {
            res.status(502).json({success: false, msg: 'The highScore service is not running'});
          }
          else {
            res.status(err.statusCode).json(err.error);
          }
        });
      }).catch((err) => {
        if(!err.statusCode) {
          res.status(502).json({success: false, msg: 'The highScore service is not running'});
        }
        else {
          res.status(err.statusCode).json(err.error);
        }
      });
    }
  }

}


module.exports = HighScoresController;