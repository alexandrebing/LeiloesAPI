const faker = require('faker');

/**
 * @param {import('knex')} knex
 */
exports.seed = knex => {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push({ title: faker.commerce.product(), price: faker.finance.amount(10000, 9999999) });
  }
  return knex('auctions').insert(rows);
};
