exports.up = function(knex) {
    return knex.schema.createTable('address_contract', function(table){
      table.increments('address_contract').primary();
      table.integer('id_contract_custumer').notNullable();
      table.string('province_code', 10).notNullable();
      table.string('address_name', 150).notNullable();
      table.integer('latitude');
      table.integer('longitude');
      table.integer('place_nr');
      table.integer('block_nr'); // nr. quarteirao 
      table.foreign('province_code').references('province_code').inTable('province').onDelete('SET NULL'); 
      table.foreign('id_contract_custumer').references('id_contract_custumer').inTable('contract_custumer').onDelete('SET NULL');
    });
  };
  
  exports.down = function(knex) {
   return knex.schema.dropTable('address_contract');
  };