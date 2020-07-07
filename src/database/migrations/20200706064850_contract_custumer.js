exports.up = function(knex) {
  return knex.schema.createTable('contract_custumer', function(table){
    table.string('id_contract_custumer',12).primary();
    table.string('id_custumer').notNullable();
    table.double('account_balance').notNullable();
    table.integer('nr_counter');
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
    table.foreign('id_custumer').references('id_custumer').inTable('custumer').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('contract_custumer');
};
