exports.up = knex =>
  knex.schema.createTable('categories', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTableIfExists('categories');
