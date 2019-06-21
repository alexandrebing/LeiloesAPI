class ResourceNotFoundError extends Error { }
class InvalidPriceError extends Error { }
class AuthorizationError extends Error { }
class AlreadyFinishedAuctionError extends Error {}

module.exports = {
  ResourceNotFoundError,
  InvalidPriceError,
  AuthorizationError,
  AlreadyFinishedAuctionError
};
