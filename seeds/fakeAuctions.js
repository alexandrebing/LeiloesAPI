const faker = require('faker');
const randomNumber = require('random-number');

/**
 * @param {import('knex')} knex
 */
exports.seed = async knex => {
  const rows = [];
  const users = await knex('users').select('id');
  for (let i = 0; i < 5; i++) {
    const randomIndex = randomNumber({
      integer: true,
      min: 0,
      max: users.length - 1,
    });
    const randomUser = users[randomIndex];
    rows.push({ 
      title: faker.commerce.product(), 
      price: faker.finance.amount(1000, 99999),
      creatorId: randomUser.id,
    });
  }
  await knex('auctions').insert(rows);
};
