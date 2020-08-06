exports.up = function(knex) {
    return knex.schema.createTable('late_payment', function(table){
      table.increments('id_late_payment');
      table.integer('id_invoice').notNullable();
      table.double('value_pay').notNullable();
      table.datetime('created_at').defaultTo(knex.fn.now());
      table.foreign('id_invoice').references('id_invoice').inTable('invoice').onDelete('SET NULL');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('late_payment');
  };
  