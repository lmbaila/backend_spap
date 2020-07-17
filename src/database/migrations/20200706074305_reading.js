exports.up = function(knex) {
  return knex.schema.createTable('reading', function(table){
    table.string('id_reading',12).primary();
    table.integer('id_contract_custumer').notNullable();
    table.integer('id_monthly_management').notNullable();
    table.string('id_employee').notNullable();
    table.integer('initial_reading');
    table.integer('final_reading');
    table.string('obs');
    table.double('balance_value');
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());   
    table.foreign('id_monthly_management').references('id_monthly_management').inTable('monthly_management').onDelete('SET NULL');
    table.foreign('id_employee').references('id_employee').inTable('employee').onDelete('SET NULL');
    table.foreign('id_contract_custumer').references('id_contract_custumer').inTable('contract_custumer').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reading');
};
