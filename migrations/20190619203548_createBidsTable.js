
/**
 * @param {import('knex')} knex
 */
exports.up = (knex) => knex.schema.createTable('bids', (table) => {
  table.bigIncrements('id').unsigned();
  table.bigInteger('userId').unsigned().notNullable().references('id').inTable('users');
  table.bigInteger('auctionId').unsigned().notNullable().references('id').inTable('auctions');
  table.bigInteger('price').unsigned().notNullable();
  table.dateTime('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
});

/**
 * @param {import('knex')} knex
 */
exports.down = (knex) => knex.schema.dropTable('bids');
