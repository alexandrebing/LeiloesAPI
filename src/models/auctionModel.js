const database = require('../database');

exports.getAll = () => database
  .table('auctions')
  .orderBy('title', 'asc');

exports.getById = (id) => database
  .table('auctions')
  .where('id', id)
  .first();
  
exports.updateById = (id, data) => database
  .table('auctions')
  .where('id', id)
  .update(data);

exports.create = (data) => database
  .table('autction')
  .insert(data);