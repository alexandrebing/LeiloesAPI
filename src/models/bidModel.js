const database = require('../database');

exports.create = (data) => database
  .table('bids')
  .insert(data);
  
exports.getAllByAuctionId = (auctionId) => database
  .select('id', 'price', 'createdAt')
  .table('bids')
  .where('auctionId', auctionId)
  .orderBy('createdAt', 'desc');
  