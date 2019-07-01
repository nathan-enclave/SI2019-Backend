exports.up = knex =>
  knex.schema.createTable('engineers', table => {
    table.increments('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('englishName');
    table.string('phoneNumber');
    table.string('address');
    table.string('email', 191).unique();
    table.string('skype', 191).unique();
    table.integer('expYear');
    table.integer('dayOffRemain').defaultTo(12);
    table.integer('status');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').defaultTo(null);
  });

exports.down = knex => knex.schema.dropTableIfExists('engineers');
