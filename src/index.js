const express = require('express');
const bodyParser = require('body-parser');
const env = require('./env');
const logger = require('./logger');
const auctionsRouter = require('./routers/auctionsRouter');
const errHandler = require('./middlewares/errHandler');

const app = express();
app.use(bodyParser.json({
  limit: '100kb',
}));

app.use('/auctions', auctionsRouter);

app.use('*', (req, res) => {
  res.sendStatus(404);
});
app.use(errHandler);
app.listen(env.PORT, () => {
  logger.info(`HTTP server listening on port ${env.PORT}!`)
});
