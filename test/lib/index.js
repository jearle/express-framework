var should = require('should')
  , lib = require('../../lib')
  , express = require('express')
  , http = require('http')
  , model = require('../../lib/model');
  // , app = express();

var testModel1 = function TestModel1($model){
  $model.schema = {
    testField1: String,
    testField2: String
  };
  $model.static = {
    staticMethod: function(){return 'test_static';}
  };
  $model.method = {
    methodMethod: function(){return 'test_method'}
  };
};
var testModel2 = function TestModel2($model){
  $model.schema = {
    testField1: String,
    testField2: String
  };
  $model.static = {
    staticMethod: function(){return 'test_static';}
  };
  $model.method = {
    methodMethod: function(){return 'test_method'}
  };
};


describe('lib', function(){

  before(function(){
    // lib.set('app', app);
    lib.set('Model', model);
    lib.injectModel(testModel2);
  });

  afterEach(function(){
    lib.set('app', undefined);
  });
  
  describe('#toSnakeCase()', function(){
    it('should convert JesseEarle to jesse-earle', function(){
      lib.toSnakeCase('JesseEarle').should.equal('jesse-earle');
    });
  });

  describe('#set()', function(){
    it('should set lib.attributes["test"] to "val"', function(){
      lib.set('test', 'val');
      lib.attributes['test'].should.equal('val');
    });
  });

  describe('#get()', function(){
    it('should set lib.attributes["test"] to "val"', function(){
      lib.set('test', 'val');
      lib.get('test').should.equal('val');
    });
  });

  describe('#getFunctionNameFromFunction()', function(){
    it('should get the function name of the named function', function(){
      var myFunc = function FuncName(){};

      lib.getFunctionNameFromFunction(myFunc).should.equal('FuncName');

    });
  });

  describe('#getArgStringsFromFunction()', function(){
    it('should return an array with the correct arg name and length (1 arg)', function(){
      var func = function Func($arg1){};

      lib.getArgStringsFromFunction(func).length.should.equal(1);
      lib.getArgStringsFromFunction(func).should.include('$arg1');
    });

    it('should return an array with the correct arg name and length (2 args)', function(){
      var func = function Func($arg1, $arg2){};

      lib.getArgStringsFromFunction(func).length.should.equal(2);
      lib.getArgStringsFromFunction(func).should.include('$arg1');
      lib.getArgStringsFromFunction(func).should.include('$arg2');
    });
  });

  describe('#getRootUrlFromFunctionName()', function(){
    it('should return "/test-controller"', function(){
      var func = function TestController(){};
      lib.getRootUrlFromFunctionName(func).should.equal('/test-controller');
    });
  });

  describe('#containsModelArg()', function(){

    it('should equal true', function(){
      var args1 = ['$model'];
      lib.containsModelArg(args1).should.equal(true);
    });
    it('should equal false', function(){
      var args2 = ['$random'];
      lib.containsModelArg(args2).should.equal(false);
    });
    
  });

  describe('#containsModelsArg()', function(){
    it('should equal true', function(){
      var args1 = ['$models'];
      lib.containsModelsArg(args1).should.equal(true);
    });
    it('should equal false', function(){
      var args1 = ['$random'];
      lib.containsModelsArg(args1).should.equal(false);
    });
  });

  describe('#containsRouteArg()', function(){

    it('should equal true', function(){
      var args1 = ['$route'];
      lib.containsRouteArg(args1).should.equal(true);
    });
    it('should equal false', function(){
      var args2 = ['$random'];
      lib.containsRouteArg(args2).should.equal(false);
    });
    
  });

  describe('#setAppRoutes()', function(){
    it('should contain a get route of "/" pointing to the same callback', function(done){
      var app = express();
      lib.set('app', app);

      var mockRoutes = {
        get: {
          '/': function(req, res){}
        },
        put: {},
        post: {},
        delete: {}
      };
      lib.setAppRoutes('/base', mockRoutes);
      var server = http.createServer(app).listen(9999, function(){
        app.routes.get[0].path.should.equal('/');
        app.routes.get[0].callbacks[0].should.equal(mockRoutes.get['/']);
        app.routes.get.pop();
        server.close();
        done();
      });
    });

    it('should contain a get route of "/test" pointing to the same callback', function(done){
      var app = express();
      lib.set('app', app);

      var mockRoutes = {
        get: {
          '/': function(req, res){}
        },
        put: {},
        post: {},
        delete: {}
      };
      lib.setAppRoutes('/test', mockRoutes);
      var server = http.createServer(app).listen(9999, function(){
        app.routes.get[0].path.should.equal('/test');
        app.routes.get[0].callbacks[0].should.equal(mockRoutes.get['/']);
        server.close();
        done();
      });
    });
  });

  describe('#injectModel()', function(){ 
    it('should create a model named TestModel on lib.models', function(){
      lib.injectModel(testModel1);
      should.exist(lib.models.TestModel1);
    });

    it('it should be a mongo object', function(){
      new lib.models.TestModel1().should.have.property('_id');
    });
  });

  describe('#injectController', function(){
    var testArgs;

    var testController = function TestController($route, $models){
      $route.get['/'] = function(req, res){};
      testArgs = {
        route: $route,
        models: $models
      };
    };
    
    it('should have a path /test-controller', function(done){
      var app = express();
      lib.set('app', app);
      
      lib.injectController(testController);
      var server = http.createServer(app).listen(9999, function(){
        app.routes.get[0].path.should.equal('/test-controller');

        server.close();
        done();
      });
    });

    it('should have a path /test-controller', function(){
      var app = express();
      lib.set('app', app);
      
      lib.injectController(testController);
      new testArgs.models.TestModel2().should.have.property('_id');
    });

  });
});