const database = require('../database');
const auctionModel = require('../models/auctionModel');
const bidModel = require('../models/bidModel');
const { ResourceNotFoundError, InvalidPriceError } = require('../errors');

const bigIntegerToPrice = value => parseInt(value) / 100;
const priceToBigInteger = value => value.toFixed(2).replace('.', '');

const formatAuction = (auction) => ({
  ...auction,
  price: bigIntegerToPrice(auction.price),
});

const formatBid = (bid) => ({
  ...bid,
  price: bigIntegerToPrice(bid.price),
});


exports.create = async (req, res, next) => {
  try {
    const auction = await database.transaction(async (trx) => {
      const auctionId = await auctionModel.create({
        ...req.body,
        price: priceToBigInteger(req.body.price),
      }).transacting(trx);
      return await auctionModel.getById(auctionId).transacting(trx);
    });
    res.send(formatAuction(auction));
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const auctions = await auctionModel.getAll();
    res.send(auctions.map(formatAuction));
  } catch (err) {
    next(err);
  }
};

exports.listBids = async (req, res, next) => {
  try {
    const bids = await bidModel.getAllByAuctionId(req.params.id);
    res.send(bids.map(formatBid));
  } catch (err) {
    next(err);
  }
};

exports.makeBid = async (req, res, next) => {
  try {
    await database.transaction(async trx => {
      const auction = await auctionModel
        .getById(req.params.id)
        .transacting(trx)
        .forUpdate();

      if (!auction) {
        throw new ResourceNotFoundError();
      }
      
      const price = priceToBigInteger(req.body.price);
      if (price <= auction.price) {
        throw new InvalidPriceError();
      }

      await Promise.all([
        auctionModel.updateById(auction.id, { price }).transacting(trx),
        bidModel.create({ auctionId: auction.id, price }).transacting(trx),
      ]);
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
