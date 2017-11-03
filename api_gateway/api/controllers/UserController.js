const UserService = require('../services/UserService')

class UserController {

  constructor(config, router) {
    this.userService = new UserService(config);
    this.config = config;
    this.basePath = '/user';

    // PUT : for updating user : provided url + '/api/user/123abc'  where 123abc is the id of the user to be updated
    router.put(this.basePath + "/:id", this.update.bind(this));

    //POST: for creating user : provided url + '/api/user/'
    router.post(this.basePath + "/", this.create.bind(this));

    // GET: for getting user : provided url + '/api/user/123abc' where 123abc is the id of the user to get
    router.get(this.basePath + "/:id", this.get.bind(this));

    // POST: for  authentication of the user  : provided url + '/api/user/123abc' where 123abc is the id of the user to be authenticated
    router.post(this.basePath + "/:id", this.authenticate.bind(this));

    // DELETE: for getting user : provided url + '/api/user/123abc' where 123abc is the id of the user to be deleted
    router.delete(this.basePath + "/:id", this.delete.bind(this));

    // POST: for Singing in  : provided url + '/api/user/signIn'
    router.post(this.basePath + "/signIn/:id", this.signIn.bind(this));
  }

  get(req, res) {
    const method = 'UserController.get';
    const path = 'GET ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    res.send("success : " + method)

    // this.userService.get(req.params.id).then((result) => {
    //
    // }).catch((err) => {
    //   res.send(500)
    // });

  }

  create(req, res) {
    const method = 'UserController.create';
    const path = 'POST ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var body = req.body;
    res.send("success : " + method)

    // this.userService.create().then((result) => {
    // console.info("sucess"+ result.message)
    // }).catch((err) => {
    //   console.error("couldn't create" + err.message)
    //
    //   res.send(500)
    // });

  }

  update(req, res) {
    const method = 'UserController.update';
    const path = 'PUT ' + this.basePath + '/';
    console.info(method, 'Access to', path);

    var body = req.body

    console.info(body);

    res.send("success : " + method)

    // this.userService.update(req.params.id , password).then((result) => {
    //
    // }).catch((err) => {
    //   res.send(500)
    // });
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

  authenticate(req, res) {
    const method = 'UserController.authenticate';
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