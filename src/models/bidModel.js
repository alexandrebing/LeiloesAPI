const database = require('../database');

exports.create = (data) => database
  .table('bids')
  .insert(data);
  
exports.getAllByAuctionId = (auctionId) => database
  .select(
    'bids.id',
    'users.username as user',
    'bids.price',
    'bids.createdAt'
  )
  .table('bids')
  .innerJoin('users', 'users.id', 'bids.userId')
  .where('auctionId', auctionId)
  .orderBy('createdAt', 'desc');

exports.getWinnerByAuctionId = (auctionId) => database
  .table('bids')
  .where('auctionId', auctionId)
  .orderBy('createdAt', 'desc')
  .first();
