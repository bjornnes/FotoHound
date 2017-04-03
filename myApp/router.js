function setup(app, handlers) {

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Max-Age", "1728000");

    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
  });
  //Studies
  app.get('/data/', handlers.data.data);


}

exports.setup = setup;
