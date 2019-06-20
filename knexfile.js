const env = require('./src/env');
const logger = require('./src/logger');

module.exports = {
  client: 'mysql2',
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    typeCast: (field, next) => {
      switch (field.type) {
        case 'BLOB': {
          try {
            return JSON.parse(field.string());
          } catch (err) {
            logger.warn(err);
            return null;
          }
        }
        case 'LONGLONG': {
          if (field.name === 'price' && field.table === 'auctions') {
            return parseInt(field.string(), 10) / 100;
          }
          return field.string();
        }
        case 'TINY': {
          return field.string() === '1';
        }
      }
      return next();
    },
    bigNumberStrings: true,
  },
  pool: {
    min: env.DB_POOL_MIN,
    max: env.DB_POOL_MAX,
  },
  migrations: {
    tableName: 'migrations',
  },
};
