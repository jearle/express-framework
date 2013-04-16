var mongoose = require('mongoose')
  , should = require('should')
  , Mongo = require('../../../lib/model/mongo')
  , $model
  , MongoTest;



describe('Mongo', function(){

  before(function(){
    mongoose.connect('localhost', 'dev-express-framework-test-mongo');
    $model = {
      schema: {
        testField: String
      },
      method: {
        testMethod: function(){return 'testMethod'}
      },
      static: {
        testStatic: function(){return 'testStatic'}
      },
      name: 'MongoTest'
    };

    MongoTest = new Mongo($model);
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(err){
      mongoose.connection.db.close();
      done();
    });
  });

  it('should be a mongo object', function(){
    new MongoTest().should.have.property('_id');
  });

  it('should save to the database', function(done){
    MongoTest.create({testField: 'test'}, function(err, doc){
      if (err) throw new Error(err);
      doc.should.have.property('_id');
      doc.remove();
      done();
    });
  });

  it('should have an instance method testMethod() that returns "testMethod"', function(done){
    MongoTest.create({testField: 'test'}, function(err, doc){
      if (err) throw new Error(err);
      doc.testMethod().should.equal('testMethod');
      doc.remove();
      done();
    });
  });

  it('should have a static method testStatic() that return "testStatic"', function(){
    MongoTest.testStatic().should.equal('testStatic');
  });
});