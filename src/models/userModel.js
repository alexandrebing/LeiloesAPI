const database = require('../database');

exports.getByCredentials = ({ username, password }) => database
  .table('users')
  .where('username', username)
  .where('password', password)
  .first();

exports.getById = (id) => database
  .table('users')
  .where('id', id)
  .first();

exports.incrementBalance = (id, amount) => database
  .table('users')
  .where('id', id)
  .increment('balance', amount);

exports.decrementBalance = (id, amount) => database
  .table('users')
  .where('id', id)
  .decrement('balance', amount);
