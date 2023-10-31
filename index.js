const db_handler = require('./config/db_handler');
const FUNTIONS = require('./config/functions');
const CRUD = require('./crud/crud');

const DBH = {
  ...db_handler,
  ...FUNTIONS,
  ...CRUD
};

module.exports = DBH;