var dbConfig = require('../../config/db')
  , constants = require('../../constants')
  , exports;

if (dbConfig.type === constants.db.MONGODB){
  exports = require('./mongo');
}

exports.get$model = function(){
  return {
    name: '',
    method: {},
    static: {}
  };
};

module.exports = exports;