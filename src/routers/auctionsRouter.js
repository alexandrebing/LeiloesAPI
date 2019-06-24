const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const auctionController = require('../controllers/auctionController');

const router = express.Router({ mergeParams: true });
router.get('/', auctionController.list);
router.post('/', authMiddleware, auctionController.create);
router.get('/:id/bids', auctionController.listBids);
router.post('/:id/bids', authMiddleware, auctionController.makeBid);
router.patch('/:id/finish', authMiddleware, auctionController.finish);

module.exports = router;
