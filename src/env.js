require('dotenv').config();

module.exports = {
  /* Application */
  SECRET: process.env.SECRET,
  PORT: parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV: process.env.NODE_ENV,
  BODY_LIMIT: process.env.BODY_LIMIT || '500kb',

  /* Database */
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT, 10),
  DB_POOL_MIN: parseInt(process.env.DB_POOL_MIN, 10),
  DB_POOL_MAX: parseInt(process.env.DB_POOL_MAX, 10),
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

