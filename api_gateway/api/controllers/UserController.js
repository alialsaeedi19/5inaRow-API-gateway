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

    // DELETE: for deleting user : provided url + '/api/user/123abc' where 123abc is the id of the user to be deleted
    router.delete(this.basePath + "/:id", this.delete.bind(this));

    // POST: for Singing in  : provided url + '/api/user/signIn'
    router.post(this.basePath + "/signIn/:id", this.signIn.bind(this));


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
          res.send(500)
        });
      }

    }).catch((err) => {
      res.send(500)
      console.log(method + err);
    });


  }

  create(req, res) {
    const method = 'UserController.create';
    const path = 'POST ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var body = req.body;

    this.userService.create().then((result) => {
      console.info("success" + result.message)
    }).catch((err) => {
      res.send(500);
      console.log(method + err);
    });

  }


  delete(req, res) {
    const method = 'UserController.delete';
    const path = 'DELETE ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    res.send("success : " + method)

    //   this.userService.delete(req.params.id).then((result) => {
    //
    //   }).catch((err) => {
    //     res.send(500)
    //   });
    // }
  }

  signIn(req, res) {
    const method = 'UserController.signIn';
    const path = 'POST ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var body = req.body

    res.send("success : " + method)

    //   this.userService.singIn(req.params.id).then((result) => {
    //
    //   }).catch((err) => {
    //     res.send(500)
    //   });
    // }
  }

}

module.exports = UserController;