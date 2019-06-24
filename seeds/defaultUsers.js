const faker = require('faker');

/**
 * @param {import('knex')} knex
 */
exports.seed = async knex => {
  try {
    await knex.table('users').insert([
      {
        username: 'admin',
        password: '123456',
        isAdmin: true,
        balance: 0,
      },
      {
        username: 'user1',
        password: '123456',
        balance: 100000,
      },
      {
        username: 'user2',
        password: '123456',
        balance: 50000
      }
    ])
  } catch (err) {
    if (!err.sqlMessage || !err.sqlMessage.includes('Duplicate entry')) {
      throw err;
    }
  }
};
