const database = require('../database');
const auctionModel = require('../models/auctionModel');
const bidModel = require('../models/bidModel');
const userModel = require('../models/userModel');
const helpers = require('../helpers');

const { 
  ResourceNotFoundError, 
  InvalidPriceError,
   AuthorizationError, 
   AlreadyFinishedAuctionError 
} = require('../errors');

const formatAuction = (auction) => ({
  ...auction,
  price: helpers.bigIntegerToPrice(auction.price),
});

const formatBid = (bid) => ({
  ...bid,
  price: helpers.bigIntegerToPrice(bid.price),
});

exports.create = async (req, res, next) => {
  try {
    const auction = await database.transaction(async (trx) => {
      const auctionId = await auctionModel.create({
        ...req.body,
        creatorId: req.user.id,
        price: helpers.priceToBigInteger(req.body.price),
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
    const auctions = await auctionModel.getCatalog();
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

      if (req.user.id === auction.creatorId) {
        throw new AuthorizationError();
      }

      const price = priceToBigInteger(req.body.price);
      if (price <= auction.price) {
        throw new InvalidPriceError();
      }

      await Promise.all([
        auctionModel.updateById(auction.id, { price }).transacting(trx),
        bidModel.create({ auctionId: auction.id, userId: req.user.id, price }).transacting(trx),
      ]);
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.finish = async (req, res, next) => {
  try {
    await database.transaction(async trx => {
      const auction = await auctionModel
        .getById(req.params.id)
        .transacting(trx)
        .forUpdate();

      if (!auction) {
        throw new ResourceNotFoundError();
      }

      if (req.user.id !== auction.creatorId) {
        throw new AuthorizationError();
      }

      if (auction.status === 'FINISHED') {
        throw new AlreadyFinishedAuctionError();
      }

      const bidWinner = await bidModel
        .getWinnerByAuctionId(auction.id)
        .transacting(trx);

      if (bidWinner) {
        await Promise.all([
          userModel.decrementBalance(bidWinner.userId, bidWinner.price).transacting(trx),
          userModel.incrementBalance(req.user.id, bidWinner.price).transacting(trx),
        ]);
      }

      await auctionModel.updateById(auction.id, {
        status: 'FINISHED',
        winnerId: bidWinner && bidWinner.userId,
      }).transacting(trx);
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
