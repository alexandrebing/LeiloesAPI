const database = require('../database');

exports.create = (data) => database
  .table('bids')
  .insert(data);
  
exports.getAllByAuctionId = (auctionId) => database
  .table('bids')
  .where('auctionId', auctionId)
  .orderBy('createdAt', 'desc');
  