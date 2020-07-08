exports.up = function(knex) {
  return knex.schema.createTable('contract_custumer', function(table){
    table.increments('id_contract_custumer').primary();
    table.string('contract_code',12).notNullable();
    table.string('id_custumer').notNullable();
    table.double('account_balance').notNullable();
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
    table.foreign('id_custumer').references('id_custumer').inTable('custumer').onDelete('SET NULL'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('contract_custumer');
};
