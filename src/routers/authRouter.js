const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
router.get('/', authMiddleware, authController.getTokenInfo);
router.post('/', authController.createToken);

module.exports = router;
