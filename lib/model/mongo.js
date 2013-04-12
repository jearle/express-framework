var mongoose = require('mongoose')
  , dbConfig = require('../../config/db')
  , timestamp = require('./plugins/mongo/timestamp')
  , host
  , db;

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

mongoose.connect(host, db);

module.exports = function Mongo($model){
  var schema = mongoose.Schema($model.schema);

  schema.methods = $model.method;
  schema.statics = $model.static;

  schema.plugin(timestamp);

  return mongoose.model($model.name, schema);
};