const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors');
const userModel = require('../models/userModel');

/**
 * @typedef JWTPayload
 * @property {String} userId
 * @property {Boolean} isAdmin
 */

module.exports = async (req, res, next) => {
  try {
    const result = jwt.decode(req.headers.authorization, {
      json: true,
      complete: true,
    });

    if (!result || !result['payload']) {
      throw new AuthorizationError();
    }

    /** @type {JWTPayload} */
    const payload = result['payload'];

    const user = await userModel.getById(payload.userId);
    const info = { user };
    
    Object.assign(req, info);

    next();
  } catch (err) {
    next(err);
  }
};

