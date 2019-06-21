const jwt = require('jsonwebtoken');
const { SECRET } = require('../env');
const userModel = require('../models/userModel');
const { AuthorizationError } = require('../errors');
const helpers = require('../helpers');

/**
 * @typedef JWTPayload
 * @property {String} userId
 * @property {Boolean} isAdmin
 */

exports.createToken = async (req, res, next) => {
  try {
    const user = await userModel.getByCredentials({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      throw new AuthorizationError();
    }
    /** @type {JWTPayload} */
    const payload = {
      userId: user.id,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, SECRET);
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

exports.getTokenInfo = async (req, res, next) => {
  try {
    res.send({
      username: req.user.username,
      balance: helpers.bigIntegerToPrice(req.user.balance),
      isAdmin: req.user.isAdmin,
      createdAt: req.user.createdAt,
    });
  } catch (err) {
    next(err);
  }
};
