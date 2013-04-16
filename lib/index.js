var path = require('path')
  , fs = require('fs')
  , Routes = require('./routes')
  , Filters = require('./filters');
  // , Model = require('./model');

module.exports = {
  controllersDir: path.join(__dirname, '../controllers'),
  modelsDir: path.join(__dirname, '../models'),

  models: {},

  attributes: {},

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
    this.attributes[key] = value;
  },
  get: function(key){
    return this.attributes[key];
  },
  getFunctionNameFromFunction: function(func){
    var matches = func.toString().match(/function+(.*)\(/);
    var name = matches[1].replace(/\s*/g, '');
    return name;
  },
  getArgStringsFromFunction: function(func){
    var funcString = func.toString();
    var matches = funcString.match(/function+(.*)\((.*)\)/);
    var arguments = matches[matches.length - 1].replace(/\s*/g, '').split(',');
    return arguments;
  },
  containsModelArg: function(args){
    return args.filter(Filters.model).length > 0 ? true : false;
  },
  containsRouteArg: function(args){
    return args.filter(Filters.route).length > 0 ? true : false;
  },
  getNewRoutes: function(){
    return Routes.new();
  },
  setAppRoutes: function(root, routes){
    debugger;
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
  injectModel: function(model){
    var args = this.getArgStringsFromFunction(model)
      , modelName = this.getFunctionNameFromFunction(model)
      , modelArgs = []
      , $model = {
          name: modelName,
          method: {},
          static: {}
        };
    
    if (!this.containsModelArg(args)){
      throw new Error(
        "Your model must have the parameter $model.\n" + 
        "\t\tExample: \n" +
        "\t\t\tmodules.exports = function MyModel($model){ .. } \n");
    }

    modelArgs.push($model);

    model.apply(null, modelArgs);
    this.models[modelName] = this.get('Model')($model);
  },
  injectAllModels: function(){
    var self = this;
    fs.readdir(this.modelsDir, function(err, files){
      files.filter(function(file){
        return file.match(/(.*)\.js$/);
      }).forEach(function(file){
        var modelFilePath = path.join(self.modelsDir, file);
        var model = require(modelFilePath);
        self.injectModel(model);
      });
    })
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