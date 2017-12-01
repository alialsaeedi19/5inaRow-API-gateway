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

    this.authenticationService.authenticate(headers).then((result) => {

      this.highScoresService.get().then((result) => {
        res.status(200).json({success: true, msg: result})
      }).catch((err) => {
        res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      });
    }).catch((err) => {
      res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      console.log(method + err.statusCode);
    });
  }


}


module.exports = HighScoresController;