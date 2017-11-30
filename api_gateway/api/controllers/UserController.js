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
    router.get(this.basePath + "/logout", this.signOut.bind(this));

    // POST: for Singing in  : provided url + '/api/user/login'
    router.post(this.basePath + "/login", this.signIn.bind(this));


  }

  signOut(req, res) {
    const method = 'UserController.signOut';
    const path = 'GET ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var headers = req.headers

    this.authenticationService.authenticate(headers).then((result) => {

      var userName = result.msg
      this.userService.signOut(userName).then((result) => {
        res.status(200).json({success:true , msg :'user has signed out successfully' })
      }).catch((err) => {
        res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      });
    }).catch((err) => {
      res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      console.log(method + err.statusCode);
    });


  }


  create(req, res) {
    const method = 'UserController.create ';
    const path = 'POST ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var body = req.body;
    const userName = body.username;
    const password = body.password;
    console.log('user name is ' + userName + ' password is ' + password)

    this.userService.create(userName, password).then((result) => {
      res.status(201).json(result)
    }).catch((err) => {
      res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      console.log(err.statusCode)
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
      res.status(200).json(result);
    }).catch((err) => {
      res.status(err.statusCode).json({success: false, msg: err.response.body.msg});
      console.log(method +  err.response.body)
    });
  }
}


module.exports = UserController;