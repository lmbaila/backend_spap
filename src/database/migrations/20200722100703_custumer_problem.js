exports.up = function(knex) {
    return knex.schema.createTable('custumer_problem', function(table){
      table.increments('id_custumer_problem')
      table.string('id_employee').notNullable();
      table.string('id_contract_custumer').notNullable();
      table.string('description');
      table.enum('state_problem',['resolved', 'not resolved']).defaultTo('not resolved');    
      table.datetime('created_at').defaultTo(knex.fn.now());
      table.datetime('updated_at').defaultTo(knex.fn.now());   
      table.foreign('id_employee').references('id_employee').inTable('employee').onDelete('SET NULL');
      table.foreign('id_contract_custumer').references('id_contract_custumer').inTable('contract_custumer').onDelete('SET NULL');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('custumer_problem');
  };
  