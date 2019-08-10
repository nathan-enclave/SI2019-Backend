exports.up = knex =>
  knex.schema.createTable('managers', table => {
    table.increments('id').primary();
    table.integer('engineerId');
    table.string('username', 191).unique();
    table.string('password');
    table.integer('roleId').defaultTo(2);
    table
      .foreign('roleId')
      .references('roles.id')
      .onDelete('CASCADE');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.integer('verify').defaultTo(null);
  });

exports.down = knex => knex.schema.dropTableIfExists('managers');
