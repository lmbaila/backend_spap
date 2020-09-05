exports.up = function(knex) {
  return knex.schema.createTable('employee', function(table){
    table.string('id_employee',12).primary();
    table.string('id_user', 12).notNullable();
    table.string('id_company',12).notNullable();
    table.boolean('state').defaultTo(true);
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());   
    table.foreign('id_user').references('id_user').inTable('users').onDelete('SET NULL'); 
    table.foreign('id_company').references('id_company').inTable('company').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('employee');
};
