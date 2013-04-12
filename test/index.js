var should = require('should')
  , lib = require('../lib');

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

  describe('getArgStringsFromFunction', function(){
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
});