
/**
 * @param {import('knex')} knex
 */
exports.up = (knex) => knex.schema.createTable('auctions', (table) => {
  table.bigIncrements('id').unsigned();
  table.bigInteger('creatorId').unsigned().notNullable().references('id').inTable('users');
  table.bigInteger('winnerId').unsigned().references('id').inTable('users');
  table.string('title').notNullable();
  table.bigInteger('price').unsigned().notNullable();
  table.enum('status', ['PENDING', 'FINISHED']).notNullable().defaultTo('PENDING');
  table.dateTime('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
});

/**
 * @param {import('knex')} knex
 */
exports.down = (knex) => knex.schema.dropTable('auctions');
