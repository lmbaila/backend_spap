exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.string('id_user', 12).primary();
    table.integer('id_group').notNullable();
    table.integer('id_person').notNullable();
    table.string('user_name', 30).notNullable();
    table.string('password').notNullable();
    table.enum('state', ['enable','disable', 'delete']).defaultTo('enable').notNullable();
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now()); 
    table.foreign('id_group').references('id_group').inTable('group').onDelete('SET NULL');
    table.foreign('id_person').references('id_person').inTable('person').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
