exports.up = knex =>
  knex.schema.createTable('engineer_skill', table => {
    table.increments('id').primary();
    table.integer('engineerId');
    table
      .foreign('engineerId')
      .references('engineers.id')
      .onDelete('CASCADE');
    table.integer('skillId');
    table
      .foreign('skillId')
      .references('skills.id')
      .onDelete('CASCADE');
  });

exports.down = knex => knex.schema.dropTableIfExists('engineer_skill');
