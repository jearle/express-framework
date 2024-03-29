if (!process.env.NODE_ENV){
  process.env.NODE_ENV = 'development';
}

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , lib = require('./lib')
  , RedisStore = require('connect-redis')(express)
  , sessionStore = new RedisStore();

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({
    secret: 'express-framework',
    store: sessionStore,
    key: 'cookies.sid'
  }));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

lib.set('app', app);

var model = require('./lib/model');
lib.set('Model', model);
model.connect();

lib.set('controllersDir', path.join(__dirname, './controllers'))
lib.set('modelsDir', path.join(__dirname, './models'))

lib.injectAllModels();
lib.injectAllControllers();

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

