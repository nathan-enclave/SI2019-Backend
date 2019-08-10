exports.up = knex =>
  knex.schema.createTable('cash_flows', table => {
    table.increments('id').primary();
    table.integer('month');
    table.integer('year');
    table.integer('cashIn');
    table.integer('cashOut');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTableIfExists('cash_flows');
