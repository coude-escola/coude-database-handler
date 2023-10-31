const INSERT = require('./insert');
const UPDATE = require('./update');
const DELETE = require('./delete');
const SELECT = require('./select');

const CRUD = {...INSERT,...DELETE,...SELECT,...UPDATE};

module.exports = CRUD;