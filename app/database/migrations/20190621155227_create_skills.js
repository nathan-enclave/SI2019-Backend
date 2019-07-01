exports.up = knex =>
  knex.schema.createTable('skills', table => {
    table.increments('id').primary();
    table.string('name');
  });

exports.down = knex => knex.schema.dropTableIfExists('skills');
