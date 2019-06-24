const logger = require('../logger');
const errors = require('../errors');

module.exports = (err, req, res, next) => {
  if (err instanceof errors.InvalidPriceError) {
    res.status(400).send({ code: 'INVALID_PRICE' });
  } else if (err instanceof errors.AlreadyFinishedAuctionError) {
    res.status(400).send({ code: 'ALREADY_FINISHED_AUCTION' });
  } else if (err instanceof errors.InsufficientFundsError) {
    res.status(400).send({ code: 'INSUFFICIENT_FUNDS' });
  } else if (err instanceof errors.AuthorizationError) {
    res.status(401).send({ code: 'NOT_AUTHORIZED' });
  } else if (err instanceof errors.ResourceNotFoundError) {
    res.status(404).send({ code: 'RESOURCE_NOT_FOUND' });
  } else {
    logger.error(err);
    res.status(500).send({ code: 'UNEXPECTED_ERROR' });
  }
  next();
};
