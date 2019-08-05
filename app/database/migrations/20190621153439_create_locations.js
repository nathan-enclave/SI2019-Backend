exports.up = knex =>
  knex.schema.createTable('locations', table => {
    table.increments('id').primary();
    table.string('city');
    table.string('country');
    table.float('longitude');
    table.float('latitude');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').defaultTo(null);
  });

exports.down = knex => knex.schema.dropTableIfExists('locations');
