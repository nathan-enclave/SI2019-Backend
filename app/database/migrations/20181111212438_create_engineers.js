exports.up = knex =>
  knex.schema.createTable('engineers', table => {
    table.increments('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('englishName');
    table.string('phoneNumber');
    table.string('address');
    table.string('email', 191).unique();
    table.date('birthday').notNullable();
    table.string('skype', 191).unique();
    table.integer('expYear');
    table.integer('dayOffRemain').defaultTo(12);
    table.integer('status');
    table.string('avatar').defaultTo('http://s3.amazonaws.com/37assets/svn/765-default-avatar.png');
    table.integer('salary');
    table.date('dateIn');
    table.date('dateOut').defaultTo(null);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').defaultTo(null);
  });

exports.down = knex => knex.schema.dropTableIfExists('engineers');
