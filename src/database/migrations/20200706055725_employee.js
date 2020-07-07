exports.up = function(knex) {
  return knex.schema.createTable('employee', function(table){
    table.string('id_employee',12).primary();
    table.string('id_user').notNullable();
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());   
    table.foreign('id_user').references('id_user').inTable('users').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('employee');
};
