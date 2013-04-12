var constants = require('../constants');

module.exports = {

  type: constants.db.MONGODB,

  development: {
    host: 'localhost',
    db: 'dev-express-framework'
  },
  test: {

  },
  production: {

  }
}