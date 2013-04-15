var should = require('should')
  , lib = require('../lib')
  , express = require('express')
  , http = require('http')
  , app = express();

describe('lib', function(){
  
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
      var server = http.createServer(lib.get('app')).listen(9999, function(){
        lib.get('app').routes.get[0].path.should.equal('/');
        lib.get('app').routes.get[0].callbacks[0].should.equal(mockRoutes.get['/']);
        lib.get('app').routes.get.pop();
        server.close();
        done();
      });
    });

    it('should contain a get route of "/test" pointing to the same callback', function(done){
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
      var server = http.createServer(lib.get('app')).listen(9999, function(){
        lib.get('app').routes.get[0].path.should.equal('/test');
        lib.get('app').routes.get[0].callbacks[0].should.equal(mockRoutes.get['/']);
        server.close();
        done();
      });
    });
  });

  describe('#injectModel()', function(){
    var $model = {schema:{}, static:{}, method:{}};
    var testModel = function TestModel($model){
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

    it('should create a model named TestModel on lib.models', function(){
      lib.injectModel(testModel);
      should.exist(lib.models.TestModel);
    });

    it('it should be a mongo object', function(){
      new lib.models.TestModel().should.have.property('_id');
    });
  });
});