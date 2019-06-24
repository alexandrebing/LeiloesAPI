const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const env = require('./env');
const logger = require('./logger');
const auctionsRouter = require('./routers/auctionsRouter');
const authRouter = require('./routers/authRouter');
const errHandler = require('./middlewares/errHandler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({
  limit: '100kb',
}));

app.use('/auth', authRouter);
app.use('/auctions', auctionsRouter);

app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.use(errHandler);

app.listen(env.PORT, () => {
  logger.info(`HTTP server listening on port ${env.PORT}!`)
});
