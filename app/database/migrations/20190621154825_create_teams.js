exports.up = knex =>
  knex.schema.createTable('teams', table => {
    table.increments('id').primary();
    table.string('name');
    table.integer('projectId');
    table
      .foreign('projectId')
      .references('projects.id')
      .onDelete('CASCADE');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').defaultTo(null);
  });

exports.down = knex => knex.schema.dropTableIfExists('teams');
