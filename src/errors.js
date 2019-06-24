class ResourceNotFoundError extends Error { }
class InvalidPriceError extends Error { }
class AuthorizationError extends Error { }
class AlreadyFinishedAuctionError extends Error {}
class InsufficientFundsError extends Error {}

module.exports = {
  ResourceNotFoundError,
  InvalidPriceError,
  AuthorizationError,
  AlreadyFinishedAuctionError,
  InsufficientFundsError,
};
