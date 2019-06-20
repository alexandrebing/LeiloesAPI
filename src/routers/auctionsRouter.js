const express = require('express');
const auctioController = require('../controllers/auctionController');

const router = express.Router({ mergeParams: true });

router.get('/', auctioController.list);
router.post('/', auctioController.create);
router.get('/:id/bids', auctioController.listBids);
router.post('/:id/bids', auctioController.makeBid);

module.exports = router;
