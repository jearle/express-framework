var mongoose = require('mongoose')
  , should = require('should')
  , Mongo = require('../../lib/model/mongo')
  , userModel = require('../../models/user')
  , User
  , getTestFields = function(){
    return {
      username: 'testUser',
      email: 'earle.jesse@gmail.com',
      password: 'testPassword'
    };
  };

describe('User', function(){

  before(function(){
    var $model = {
      name: 'User',
      method: {},
      static: {}
    };
    var user = userModel($model);
    User = Mongo($model);
    mongoose.connect('localhost', 'dev-express-framework-test-user');
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(err){
      mongoose.connection.db.close();
      done();
    });
  });

  describe('#newUser()', function(){
    it('should create a new user.', function(done){
      User.newUser(getTestFields(), function(err, doc){
        if (err) throw new Error(err);
        var _id = doc._id;
        User.findOne({_id: _id}, function(err, doc){
          if (err) throw new Error(err);
          doc._id.toString().should.equal(_id.toString());

          doc.remove();
          done();
        });
      });
    });

    it('should not have a password equal to the plain text "testPassword"', function(done){
      User.newUser(getTestFields(), function(err, doc){
        if (err) throw new Error(err);
        doc.password.should.not.equal(getTestFields().password);
        doc.remove();
        done();
      });
    });
  });

  describe('#authenticate()', function(){
    it('should authenticate with "testPassword"', function(done){
      User.newUser(getTestFields(), function(err, doc){
        if (err) throw new Error(err);
        doc.authenticate(getTestFields().password, function(err, res){
          res.should.be.true
          doc.remove();
          done();
        });
      });
    });
  });

});