const UserService = require('../services/UserService')
const AuthenticationService = require('../services/AuthenticationService')

class UserController {

  constructor(config, router) {
    this.userService = new UserService(config);
    this.authenticationService = new AuthenticationService(config);

    this.config = config;
    this.basePath = '/user';

    //POST: for creating user : provided url + '/api/user/'
    router.post(this.basePath + "/", this.create.bind(this));

    // GET: for signing out the user : provided url + '/api/user/123abc' where 123abc is the id of the user to sign out
    router.get(this.basePath + "/:id", this.signOut.bind(this));

    // POST: for Singing in  : provided url + '/api/user/login'
    router.post(this.basePath + "/login", this.signIn.bind(this));


  }

  signOut(req, res) {
    const method = 'UserController.signOut';
    const path = 'GET ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var token = res.header("token")

    res.send(token + 'success')

    this.authenticationService.authenticate(token).then((result) => {
      var authenticationResponse = result;

      if (authenticationResponse) {
        this.userService.signOut(req.params.id).then((result) => {

        }).catch((err) => {
          res.send(502).json({error: err})
        });
      }

    }).catch((err) => {
      res.send(502).json({error: err});
      console.log(method + err.message);
    });


  }

  create(req, res) {
    const method = 'UserController.create ';
    const path = 'POST ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var body = req.body;
    const userName = body.username;
    const password = body.password;

    this.userService.create(userName, password).then((result) => {
      res.send(result);
      console.log("respond has been sent to front end successfully")
    }).catch((err) => {
      res.send(502).json({error: err});
      console.log(method + err)
    });

  }


  signIn(req, res) {
    const method = 'UserController.login ';
    const path = 'POST ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    const body = req.body

    const userName = body.username;
    const password = body.password;

    this.userService.signIn(userName, password).then((result) => {
      res.send(result);

      console.log("respond has been sent to front end successfully")

    }).catch((err) => {
      res.send(502).json({error: err});
      console.log(method + err.message)
    });
  }
}


module.exports = UserController;