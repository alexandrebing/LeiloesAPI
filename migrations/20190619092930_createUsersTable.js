
/**
 * @param {import('knex')} knex
 */
exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.bigIncrements('id').unsigned();
  table.string('username').unique().notNullable();
  table.string('password').notNullable();
  table.bigInteger('balance').unsigned().notNullable();
  table.boolean('isAdmin').defaultTo(false).notNullable();
  table.dateTime('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
});

/**
 * @param {import('knex')} knex
 */
exports.down = (knex) => knex.schema.dropTable('users');
