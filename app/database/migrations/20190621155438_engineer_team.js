exports.up = knex =>
  knex.schema.createTable('engineer_team', table => {
    table.increments('id').primary();
    table.integer('engineerId');
    table
      .foreign('engineerId')
      .references('engineers.id')
      .onDelete('CASCADE');
    table.integer('teamId');
    table
      .foreign('teamId')
      .references('teams.id')
      .onDelete('CASCADE');
    table.string('role');
  });

exports.down = knex => knex.schema.dropTableIfExists('engineer_team ');
