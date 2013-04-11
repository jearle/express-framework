var path = require('path')
  , fs = require('fs')
  , Routes = require('./routes')
  , Filters = require('./filters');

module.exports = {
  filters: {
    route: function(arg){
      return arg.match(/^\$route$/)
    }
  },
  controllersDir: path.join(__dirname, '../controllers'),
  modelsDir: path.join(__dirname, '../models'),

  toSnakeCase: function(s){
    s = s.replace(/([A-Z]|\s)/g, function($1){
      return "-"+$1.toLowerCase();
    });
    if (s[0] === '-'){
      s = s.substring(1, s.length);
    }
    return s
  },

  set: function(key, value){
    this[key] = value;
  },
  get: function(key){
    return this[key];
  },
  getArgStringsFromFunction: function(func){
    var funcString = func.toString();
    var matches = funcString.match(/function+(.*)\((.*)\)/);
    var arguments = matches[matches.length - 1].replace(/\s*/g, '').split(',');
    return arguments;
  },
  containsRouteArg: function(args){
    // console.log(this.filters.route());
    return args.filter(Filters.route).length > 0 ? true : false;
  },
  getNewRoutes: function(){
    return Routes.new();
  },
  setAppRoutes: function(root, routes){
    var self = this;
    Routes.methods.forEach(function(method){
      Object.keys(routes[method]).forEach(function(route){
        var callback = routes[method][route];
        if (root !== '/base'){
          route = path.join(root, route);
        }
        //TODO: Use regex
        if (route.length > 1){
          if (route.substring(route.length - 1, route.length) === '/'){
            route = route.substring(0, route.length - 1);
          }
        }
        self.get('app')[method](route, callback);
      });
    });
  },
  injectController: function(root, controller){
    var args = this.getArgStringsFromFunction(controller)
      , controllerArgs = []
      , routes;
    
    if (this.containsRouteArg(args)){
      routes = this.getNewRoutes();
      controllerArgs.push(routes);
    }

    controller.apply(null, controllerArgs);
    
    if(routes){
      this.setAppRoutes(root, routes);
    }
  },
  injectAllControllers: function(){
    var self = this;
    fs.readdir(this.controllersDir, function(err, files){
      files.filter(function(file){
        return file.match(/(.*)\.js$/);
      }).forEach(function(file){
        var root = '/' + self.toSnakeCase(file.substring(0, file.length - 3));
        var controller = require(path.join(self.controllersDir, file));
        self.injectController(root, controller);
      });
    });
  }
};