
/**
 * @param {import('knex')} knex
 */
exports.up = (knex) => knex.schema.createTable('auctions', (table) => {
  table.bigIncrements('id').unsigned();
  table.string('title').notNullable();
  table.bigInteger('price').unsigned().notNullable();
  table.dateTime('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
});

/**
 * @param {import('knex')} knex
 */
exports.down = (knex) => knex.schema.dropTable('auctions');
