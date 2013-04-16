var dbConfig = require('../../config/db')
  , constants = require('../../constants')
  , exports
  , mongoose
  , host
  , db;

if (dbConfig.type === constants.db.MONGODB){
  exports = require('./mongo');
  mongoose = require('mongoose');

  if (process.env.NODE_ENV === 'development'){

    if (!dbConfig.development.host || !dbConfig.development.db){
      throw new Error(
        'You must specify both a host and a db in your config file: ./config/db.js\n' +
        'host: ' + dbConfig.development.host + '\n' +
        '  db: ' + dbConfig.development.db + '\n'
        );
    }

    host = dbConfig.development.host;
    db = dbConfig.development.db;
  }

  exports.connect = function(){
    mongoose.connect(host, db);
  };

}

exports.get$model = function(){
  return {
    name: '',
    method: {},
    static: {}
  };
};

module.exports = exports;