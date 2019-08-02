exports.up = knex =>
  knex.schema.createTable('projects', table => {
    table.increments('id').primary();
    table.string('name');
    table.integer('categoryId');
    table.foreign('categoryId').references('categories.id');
    table.string('technology');
    table.text('description');
    table.integer('locationId');
    table
      .foreign('locationId')
      .references('locations.id')
      .onDelete('CASCADE');
    table.date('start');
    table.date('end');
    table.bigInteger('earning').defaultTo(40000000);
    table.float('earningPerMonth').defaultTo(5000000);
    table.string('status');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').defaultTo(null);
  });

exports.down = knex => knex.schema.dropTableIfExists('projects');
