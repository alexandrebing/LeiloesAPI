const database = require('../database');
const auctionModel = require('../models/auctionModel');
const bidModel = require('../models/bidModel');
const userModel = require('../models/userModel');
const helpers = require('../helpers');

const {
  ResourceNotFoundError,
  InvalidPriceError,
  AuthorizationError,
  AlreadyFinishedAuctionError,
  InsufficientFundsError
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
      console.log(req.body);
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
    let auction = [];
    if (req.user && req.user.isAdmin) {
      auction = await auctionModel.getCatalog();
    } else {
      auction = await auctionModel.getCustomerCatalog();
    }
    res.send(auction.map(formatAuction));
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

      const auctionPrice = helpers.bigIntegerToPrice(auction.price);
      const price = req.body.price;
      if (price <= auctionPrice) {
        throw new InvalidPriceError();
      }

      const balance = helpers.bigIntegerToPrice(req.user.balance);
      if (balance < price) {
        throw new InsufficientFundsError();
      }

      const bigIntegerPrice = helpers.priceToBigInteger(price);

      await Promise.all([
        auctionModel.updateById(auction.id, { price: bigIntegerPrice }).transacting(trx),
        bidModel.create({ auctionId: auction.id, userId: req.user.id, price: bigIntegerPrice }).transacting(trx),
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
