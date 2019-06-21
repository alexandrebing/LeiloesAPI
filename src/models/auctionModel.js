const database = require('../database');

exports.getCatalog = () => database
  .select(
    'auctions.id',
    'creator.username as creator',
    'winner.username as winner',
    'auctions.title',
    'auctions.price',
    'auctions.status',
    'auctions.createdAt'
  )
  .table('auctions')
  .innerJoin('users as creator', 'creator.id', 'auctions.creatorId')
  .leftJoin('users as winner', 'winner.id', 'auctions.winnerId')
  .where('status', 'PENDING')
  .orderBy('title', 'asc')
  .orderBy('price', 'asc');

exports.getById = (id) => database
  .table('auctions')
  .where('id', id)
  .first();
  
exports.updateById = (id, data) => database
  .table('auctions')
  .where('id', id)
  .update(data);

exports.create = (data) => database
  .table('auctions')
  .insert(data);