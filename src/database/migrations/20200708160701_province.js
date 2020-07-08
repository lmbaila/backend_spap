exports.up = function(knex) {
    return knex.schema.createTable('province', function(table){
      table.string('province_code', 10).primary();
      table.string('province_name', 30).unique().notNullable();
      table.enum('access', ['denied', 'accepted']).defaultTo('accepted');
      table.datetime('created_at').defaultTo(knex.fn.now());
      table.datetime('updated_at').defaultTo(knex.fn.now()); 
      
    });
  };
  
  exports.down = function(knex) {
   return knex.schema.dropTable('province');
  }; 
  