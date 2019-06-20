const database = require('../database');
const auctionModel = require('../models/auctionModel');
const bidModel = require('../models/bidModel');
const { ResourceNotFoundError, InvalidPriceError } = require('../errors');

exports.create = async (req, res, next) => {
  try {
    const auction = await database.transaction(async (trx) => {
      const auctionId = await auctionModel.create(req.body).transacting(trx);
      return await auctionModel.getById(auctionId).transacting(trx);
    });
    res.send(auction);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const auctions = await auctionModel.getAll();
    res.send(auctions);
  } catch (err) {
    next(err);
  }
};

exports.listBids = async (req, res, next) => {
  try {
    const bids = await bidModel.getAllByAuctionId(req.params.id);
    res.send(bids);
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

      const { price } = req.body;
      if (price <= auction.price) {
        throw new InvalidPriceError();
      }

      await Promise.all([
        auctionModel.updateById({ price }).transacting(trx),
        bidModel.create({ auctionId: auction.id, price }),
      ]);
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
