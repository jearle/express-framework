var bcrypt = require('bcrypt');

module.exports = function User($model){
  $model.schema = {
    fname: String,
    lname: String,
    
    username: {
      type: String,
      required: true,
      index: { unique: true }
    },
    
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },

    password: {
      type: String,
      required: true
    }
  };

  $model.method.authenticate = function(password, cb){
    bcrypt.compare(password, this.password, function(err, res){
      cb(err, res);
    })
  };

  $model.static.newUser = function(o, cb){
    var User = this;
    bcrypt.genSalt(10, function(err, salt){
      if (err) throw new Error(err);

      bcrypt.hash(o.password, salt, function(err, hash){
        o.salt = salt;
        o.password = hash;
        User.create(o, function(err, user){
          cb(err, user);
        });
      });
    })
  };
};